/* Cliente compartido. El token vive únicamente en memoria durante esta página. */
window.startCatalog = function (type, titleKey, cardClass) {
  const container = document.getElementById('contenedor');
  const previous = document.getElementById('btnAnterior');
  const next = document.getElementById('btnSiguiente');
  const form = document.getElementById('apiConfig');
  const tokenInput = document.getElementById('apiToken');
  const status = document.getElementById('estado');
  const submit = form.querySelector('button');
  let page = 1, totalPages = 1, busy = false, token = '';
  function controls() {
    previous.disabled = busy || !token || page <= 1;
    next.disabled = busy || !token || page >= totalPages;
    submit.disabled = busy;
  }
  async function load(targetPage) {
    if (busy || !token) return;
    busy = true;
    controls();
    status.textContent = 'Cargando…';
    try {
      const response = await fetch('https://api.themoviedb.org/3/' + type + '/popular?language=es-MX&page=' + targetPage,
        {headers: {accept: 'application/json', Authorization: 'Bearer ' + token}});
      if (!response.ok) {
        throw new Error(response.status === 401 ? 'Token inválido. Revisa tu token de lectura de TMDB.' : 'No se pudo cargar el catálogo (HTTP ' + response.status + ').');
      }
      const data = await response.json();
      if (!Array.isArray(data.results)) throw new Error('La API devolvió un catálogo inválido.');
      const fragment = document.createDocumentFragment();
      data.results.forEach(item => {
        const card = document.createElement('div');
        card.className = cardClass;
        if (typeof item.poster_path === 'string' && item.poster_path.startsWith('/')) {
          const image = document.createElement('img');
          image.className = 'poster';
          image.src = 'https://image.tmdb.org/t/p/w500' + item.poster_path;
          image.alt = item[titleKey] || 'Cartel';
          image.loading = 'lazy';
          card.append(image);
        }
        const title = document.createElement('h2');
        title.className = 'titulo';
        title.textContent = item[titleKey] || 'Sin título';
        card.append(title);
        fragment.append(card);
      });
      container.replaceChildren(fragment);
      page = targetPage;
      totalPages = Math.min(500, Math.max(1, Number(data.total_pages) || 1));
      status.textContent = data.results.length ? 'Página ' + page + ' de ' + totalPages : 'No hay resultados.';
    } catch (error) {
      status.textContent = error instanceof TypeError ? 'No se pudo conectar. Revisa tu conexión e inténtalo de nuevo.' : error.message;
    } finally {
      busy = false;
      controls();
    }
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (busy) return;
    token = tokenInput.value.trim();
    if (!token) { status.textContent = 'Introduce un token de lectura de TMDB.'; controls(); return; }
    tokenInput.value = '';
    load(1);
  });
  previous.addEventListener('click', () => { if (page > 1) load(page - 1); });
  next.addEventListener('click', () => { if (page < totalPages) load(page + 1); });
  controls();
};
