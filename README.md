# Movie & TV Shows · Consumo de APIs

Cliente web educativo para consultar películas y series mediante la API de TMDB. Forma parte de mi aprendizaje de HTTP y de la integración entre clientes y servicios, dentro de mi formación orientada al **desarrollo backend**.

## Tecnologías

HTML, CSS y JavaScript sin frameworks.

## Estructura

- `Tv Shows/`: página, estilos y lógica del catálogo de series.
- `famousMovies/`: página, estilos y lógica del catálogo de películas.

## Qué se practica

- Peticiones HTTP con `fetch` y programación asíncrona.
- Lectura de respuestas JSON.
- Paginación y presentación de resultados.
- Integración de una API externa con una interfaz web.

## Ejecución local

Sirve la raíz del repositorio con Live Server o un servidor estático. Por ejemplo, con Python:

```sh
python -m http.server 5500
```

Abre `http://localhost:5500` y entra a la carpeta del catálogo que quieras consultar. El acceso a TMDB depende de su disponibilidad y de una configuración de acceso válida.

## Alcance y siguientes pasos

Este proyecto es un **cliente de una API externa**; no implementa un backend propio. Un siguiente paso es incorporar un servicio backend para centralizar las consultas y gestionar las credenciales fuera del navegador. Las credenciales incluidas en código cliente son visibles para sus visitantes.

[Ver mis proyectos backend](https://github.com/DiegoAndresParra14)
