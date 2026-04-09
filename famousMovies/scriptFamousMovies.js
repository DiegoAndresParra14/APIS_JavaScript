const contenedor = document.getElementById('contenedor');
const btnAnterior = document.getElementById('btnAnterior');
const bntSiguiente = document.getElementById('btnSiguiente');
let pagina = 1

bntSiguiente.addEventListener('click', () =>{

    if (pagina < 1000){
        pagina += 1;
        contenedor.innerHTML = '';
        cargarPelis();
    } 
})

btnAnterior.addEventListener('click', () =>{

    if (pagina > 1){
        pagina -= 1;
        contenedor.innerHTML = '';
        cargarPelis();
    } 
})

const cargarPelis = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=5cc1e1f818426245ab31c4e08af58226&language=es-MX&page=${pagina}`);

        const data = await respuesta.json();
        console.log(data)

        if(!respuesta.ok){
            throw new Error("Ocurrio un error al momento de la respuesta del servidor");
        } else if (respuesta.status === 404){
            console.error('pelicula no encontrada')
        } else if (respuesta.status === 401){
            console.error('Llave mal puesta')
        } else if (respuesta.status === 200){

            data.results.forEach(e => {
                 contenedor.insertAdjacentHTML(
                    "beforeend",
                    `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${e.poster_path}"></img>
                       <h1 class="titulo">${e.title}</h1>
                       <span>Population: ${e.popularity}</span>
                    </div>
                    `
                 );
            });



        }

        

    } catch (error) {
        console.error(error)
    }
}
cargarPelis();