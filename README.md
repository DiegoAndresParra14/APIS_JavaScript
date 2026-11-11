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

Abre `http://localhost:5500` y entra a la carpeta del catálogo que quieras consultar. Cada catálogo solicita tu propio **API Read Access Token de TMDB**. Se usa como Bearer en peticiones HTTPS y vive solo en memoria; al recargar debes introducirlo otra vez. No pegues credenciales en archivos versionados.

## Alcance y siguientes pasos

Este proyecto es un **cliente de una API externa**; no implementa un backend propio. Un siguiente paso es incorporar un servicio backend para centralizar las consultas y gestionar las credenciales fuera del navegador. Un token introducido en el navegador sigue siendo accesible desde ese navegador; esta demo no pretende custodiar secretos de servidor.

[Ver mis proyectos backend](https://github.com/DiegoAndresParra14)



## Archivos y estados de la interfaz

- index.html: acceso a películas y series.
- catalog.js: cliente compartido, creación de tarjetas y control de peticiones.
- Cada carpeta conserva sus estilos y un pequeño punto de entrada.

El cliente desactiva paginación mientras carga, respeta el límite de [500 páginas de TMDB](https://developer.themoviedb.org/docs/errors), conserva la página anterior si falla una petición y muestra errores HTTP, de red y respuestas inválidas. Los títulos se asignan como texto y los carteles ausentes no generan URLs con null.

## Verificar

Ejecuta `node --test tests/catalog.test.cjs`. Cubre resultados, títulos no interpretados como HTML, paginación, respuestas vacías, errores de autenticación y fallos de red mediante respuestas simuladas. La conexión real requiere una credencial válida y no forma parte de estas pruebas.

## Credenciales anteriores

Se retiraron las credenciales incrustadas de los scripts actuales. Siguen pudiendo aparecer en el historial Git: revócalas y genera otras desde tu cuenta de TMDB antes de reutilizar este proyecto. No se reescribió el historial.
