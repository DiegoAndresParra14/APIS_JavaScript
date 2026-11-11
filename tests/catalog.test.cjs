const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
class Element {
  constructor(){this.children=[];this.handlers={};this.value='';this.textContent='';this.disabled=false;}
  append(child){this.children.push(child);}
  replaceChildren(child){this.children=child.children;}
  querySelector(){return this.button ||= new Element();}
  addEventListener(name,fn){this.handlers[name]=fn;}
}
function setup(fetch){
  const elements=Object.fromEntries(['contenedor','btnAnterior','btnSiguiente','apiConfig','apiToken','estado'].map(id=>[id,new Element()]));
  const context={window:{},document:{getElementById:id=>elements[id],createElement:()=>new Element(),createDocumentFragment:()=>new Element()},fetch,TypeError};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../catalog.js'),'utf8'),context);
  context.window.startCatalog('movie','title','pelicula');
  return elements;
}
const flush=()=>new Promise(resolve=>setImmediate(resolve));
function submit(e){e.apiToken.value='test-token';e.apiConfig.handlers.submit({preventDefault(){}});}
test('renders titles as text, omits missing posters and obeys server pagination',async()=>{
  let calls=[];
  const e=setup(async url=>{calls.push(url);return {ok:true,json:async()=>({results:[{title:'<img onerror=alert(1)>',poster_path:null}],total_pages:2})};});
  assert.equal(e.btnSiguiente.disabled,true);
  submit(e);assert.equal(e.btnSiguiente.disabled,true);
  await flush();
  assert.equal(e.contenedor.children[0].children.length,1);
  assert.equal(e.contenedor.children[0].children[0].textContent,'<img onerror=alert(1)>');
  assert.equal(e.apiToken.value,'');
  assert.equal(e.btnAnterior.disabled,true);
  e.btnSiguiente.handlers.click();e.btnSiguiente.handlers.click();
  await flush();
  assert.equal(calls.length,2);
  assert.match(calls[1],/page=2$/);
  assert.equal(e.btnSiguiente.disabled,true);
  assert.equal(e.btnAnterior.disabled,false);
});
test('retains prior results and page after an HTTP error',async()=>{
 let calls=0;const e=setup(async()=>++calls===1?{ok:true,json:async()=>({results:[{title:'Original'}],total_pages:3})}:{ok:false,status:401});
 submit(e);await flush();e.btnSiguiente.handlers.click();await flush();
 assert.match(e.estado.textContent,/Token inválido/);
 assert.equal(e.contenedor.children[0].children[0].textContent,'Original');
 assert.equal(e.btnAnterior.disabled,true);
 assert.equal(e.btnSiguiente.disabled,false);
});
test('reports a network failure without rejecting the event handler',async()=>{
 const e=setup(async()=>{throw new TypeError('offline');});submit(e);await flush();
 assert.match(e.estado.textContent,/conectar/);
 assert.equal(e.apiConfig.querySelector().disabled,false);
});
test('handles empty and malformed API responses',async()=>{
 for(const data of [{results:[],total_pages:0},{message:'invalid'}]){
  const e=setup(async()=>({ok:true,json:async()=>data}));submit(e);await flush();
  assert.match(e.estado.textContent,/No hay resultados|catálogo inválido/);
  assert.equal(e.btnSiguiente.disabled,true);
 }
});
