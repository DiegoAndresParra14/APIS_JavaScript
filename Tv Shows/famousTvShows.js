const contenedor = document.getElementById('contenedor');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
let pagina = 1;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2MxZTFmODE4NDI2MjQ1YWIzMWM0ZTA4YWY1ODIyNiIsIm5iZiI6MTc3NTY5OTU4Mi45NDgsInN1YiI6IjY5ZDcwNjdlNjk3YjQ0ZDIxOGQ3NzEzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w21EoFyLKCbhvqAG8t_wyrHh9Eeq04PaoeQq-kuf2Wo"
  }
};

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        contenedor.classList.add("salida"); 

        setTimeout(() => {
            pagina--;
            contenedor.innerHTML = ''; 
            TvShows(); 

            contenedor.classList.remove("salida"); 
        }, 300); 
    }
});

btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        contenedor.classList.add("salida"); 

        setTimeout(() => {
            pagina += 1;
            contenedor.innerHTML = ''; 
            TvShows(); 

            contenedor.classList.remove("salida"); 
        }, 300); 
    }
});

const TvShows = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/tv/popular?language=es-MX&page=${pagina}`, options);

        if (respuesta.ok) {

            const data = await respuesta.json();
            console.log(data.results);
            data.results.forEach((e, i) => {
            contenedor.insertAdjacentHTML(
                "beforeend",
                `
                <div class="show" style="animation-delay: ${i * 0.1}s">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500${e.poster_path}">
                    <h2 class="titulo">${e.name}</h2>
                </div>
                `
            );
        });
        } else{
            contenedor.innerHTML = `<span class="error show">Ocurrio un error en el servidor!!</span>`
        }
    } catch (error) {
        throw new Error(`Ocurrio un error ${error}`);
    }
}
TvShows()