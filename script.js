(() => {
  const stage = document.querySelector('#mapStage');
  const world = document.querySelector('#mapWorld');
  const nodeLayer = document.querySelector('#mapNodes');
  const connections = document.querySelector('#connections');
  const liveState = document.querySelector('#liveState');
  const memoryLabel = document.querySelector('#memoryLabel');
  const interactionHint = document.querySelector('#interactionHint');
  const hintText = document.querySelector('#hintText');
  const mapCount = document.querySelector('#mapCount');
  const zoomLabel = document.querySelector('#zoomLabel');
  const storageKey = 'casualidades-mapa-v2';
  const topics = [
    { title: 'La gota', category: 'AGUA · CERCA', image: 'img/gota.png', alt: 'Una gota de agua', text: 'Una corriente encuentra una salida. Del azar aparece una dirección; de esa dirección, otras.', color: '#9bcdb5' },

    { title: 'Los árboles', category: 'ÁRBOL · RAÍCES', image: 'img/arbol.jpg', alt: 'Un árbol y su ramaje', text: 'Una copa y unas raíces se despliegan en sentidos contrarios; ambas exploran el espacio.', color: '#b3b38c' },
    { title: 'Los árboles', category: 'ÁRBOL · RAÍCES', image: 'img/arbol2.jpeg', alt: 'Un árbol y su ramaje', text: 'El tronco se divide en brazos que tantean el aire hasta encontrar un claro.', color: '#b3b38c' },
    { title: 'Los árboles', category: 'ÁRBOL · RAÍCES', image: 'img/arbol3.jpg', alt: 'Un árbol y su ramaje', text: 'Cada rama vuelve a repetir el gesto del tronco, en una escala más pequeña.', color: '#b3b38c' },
    { title: 'Los árboles', category: 'ÁRBOL · RAÍCES', image: 'img/arbol4.jpeg', alt: 'Un árbol y su ramaje', text: 'La copa convierte la búsqueda de luz en un dibujo que se abre hacia el cielo.', color: '#b3b38c' },
    { title: 'Los árboles', category: 'ÁRBOL · RAÍCES', image: 'img/arbol5.jpg', alt: 'Un árbol y su ramaje', text: 'Un mismo impulso se separa, se aleja y vuelve a multiplicarse.', color: '#b3b38c' },
    { title: 'Los árboles', category: 'ÁRBOL · RAÍCES', image: 'img/arbol6.jpg', alt: 'Un árbol y su ramaje', text: 'Las ramas guardan el registro de cómo el árbol ocupó su espacio.', color: '#b3b38c' },
    { title: 'Los árboles', category: 'ÁRBOL · RAÍCES', image: 'img/arbol7.jpg', alt: 'Un árbol y su ramaje', text: '¿Se parece a un río porque ambos aprendieron a rodear obstáculos?', color: '#b3b38c' },
    { title: 'Los árboles', category: 'ÁRBOL · RAÍCES', image: 'img/arbol8.jpg', alt: 'Un árbol y su ramaje', text: 'Debajo de la copa, las raíces repiten en silencio su mapa invertido.', color: '#b3b38c' },

    { title: 'La raíz', category: 'TIERRA · BAJO LA SUPERFICIE', image: 'img/raices2.jpg', alt: 'Raíces de un ombú', text: 'A oscuras, una raíz tantea el terreno. Crecer también es buscar sin saber dónde termina el camino.', color: '#c1a880' },
    { title: 'La raíz', category: 'TIERRA · BAJO LA SUPERFICIE', image: 'img/raices.jpg', alt: 'Raíces de un ombú', text: 'Sin ver el destino, las raíces se abren paso y encuentran otras rutas bajo tierra.', color: '#c1a880' },

    { title: 'El río', category: 'PAISAJE · DISTANCIA', image: 'img/rio_parana.jpg', alt: 'Un curso de agua visto desde arriba', text: 'El agua rodea lo que encuentra. Con el tiempo, cada desvío se vuelve cauce y memoria.', color: '#89b8bf' },
    { title: 'El río', category: 'PAISAJE · DISTANCIA', image: 'img/rio2.jpg', alt: 'Un curso de agua visto desde arriba', text: 'El cauce se divide, se reúne y continúa cambiando con el terreno.', color: '#89b8bf' },
    { title: 'El río', category: 'PAISAJE · DISTANCIA', image: 'img/rio3.jpg', alt: 'Un curso de agua visto desde arriba', text: 'Desde lejos, el agua dibuja sobre la tierra las huellas de su recorrido.', color: '#89b8bf' },

    { title: 'La hoja', category: 'VEGETAL · DETALLE', image: 'img/hoja1.jpg', alt: 'Nervaduras de una hoja', text: 'Una vena principal se reparte en venas menores: el dibujo de la vida llevando agua hacia la luz.', color: '#a9cc91' },
    { title: 'La hoja', category: 'VEGETAL · DETALLE', image: 'img/hoja5.jpg', alt: 'Nervaduras de una hoja', text: 'Una red delicada distribuye el agua hasta los bordes más pequeños.', color: '#a9cc91' },
    { title: 'La hoja', category: 'VEGETAL · DETALLE', image: 'img/hoja6.jpg', alt: 'Nervaduras de una hoja', text: 'El patrón se bifurca para sostener una superficie entera con líneas mínimas.', color: '#a9cc91' },
    { title: 'La hoja', category: 'VEGETAL · DETALLE', image: 'img/hoja7.jpg', alt: 'Nervaduras de una hoja', text: 'Una vena principal se vuelve muchas: una cartografía viva hecha de flujo.', color: '#a9cc91' },
    { title: 'La hoja', category: 'VEGETAL · DETALLE', image: 'img/hoja8.jpg', alt: 'Nervaduras de una hoja', text: 'Al mirar de cerca, cada ramita parece repetir la forma de la hoja completa.', color: '#a9cc91' },
    { title: 'La hoja', category: 'VEGETAL · DETALLE', image: 'img/hoja9.jpg', alt: 'Nervaduras de una hoja', text: '¿Es un dibujo, o el rastro visible de algo que está circulando?', color: '#a9cc91' },

    { title: 'La DLA', category: 'MATERIA · PARTÍCULAS', image: 'img/DLA.png', alt: '', text: 'Partículas que vagan al azar quedan pegadas al tocar un agregado. Poco a poco, el azar dibuja una forma.', color: '#d0bd91' },
    { title: 'La DLA', category: 'MATERIA · PARTÍCULAS', image: 'img/DLA2.png', alt: '', text: 'Un agregado crece cuando nuevas partículas quedan atrapadas en su borde.', color: '#d0bd91' },
    { title: 'La DLA', category: 'MATERIA · PARTÍCULAS', image: 'img/DLA3.png', alt: '', text: 'Cada encuentro es azaroso; la forma final parece seguir una regla.', color: '#d0bd91' },

    { title: 'El coral', category: 'MAR · COLONIA', image: 'img/coral.jpg', alt: '', text: 'Una colonia vive como muchas. Cada organismo suma un pequeño borde a una arquitectura compartida.', color: '#c7888d' },
    { title: 'El coral', category: 'MAR · COLONIA', image: 'img/coral2.jpg', alt: '', text: 'Muchos organismos diminutos dejan una huella común sobre el arrecife.', color: '#c7888d' },
    { title: 'El coral', category: 'MAR · COLONIA', image: 'img/coral3.jpg', alt: '', text: 'La colonia construye lentamente una figura que ningún individuo dibuja solo.', color: '#c7888d' },
    { title: 'El coral', category: 'MAR · COLONIA', image: 'img/coral4.jpg', alt: '', text: 'Bajo el agua, la vida ramificada ofrece refugio a otras formas de vida.', color: '#c7888d' },

    { title: 'El rayo', category: 'CIELO · INSTANTE', image: 'img/rayo.jpg', alt: 'Rayo', text: 'La descarga encuentra el paso de menor resistencia. El cielo escribe, en un instante, una ruta ramificada.', color: '#d7ad82' },
    { title: 'El rayo', category: 'CIELO · INSTANTE', image: 'img/rayo2.jpg', alt: 'Rayo', text: 'La descarga se abre en caminos breves antes de encontrar tierra.', color: '#d7ad82' },
    { title: 'El rayo', category: 'CIELO · INSTANTE', image: 'img/rayo3.jpg', alt: 'Rayo', text: 'Por una fracción de segundo, la tormenta hace visible su red.', color: '#d7ad82' },

    { title: 'La ágata dendrítica', category: 'MINERAL · TIEMPO LENTO', image: 'img/agata.jpg', alt: '', text: 'Dentro de la piedra, inclusiones minerales parecen ramas detenidas. Un paisaje aparece donde no hubo semilla.', color: '#c2a889' },
    { title: 'La ágata dendrítica', category: 'MINERAL · TIEMPO LENTO', image: 'img/agata2.jpg', alt: '', text: 'La piedra guarda un paisaje mineral que recuerda a las ramas de un árbol.', color: '#c2a889' },
    { title: 'La ágata dendrítica', category: 'MINERAL · TIEMPO LENTO', image: 'img/agata3.jpg', alt: '', text: 'Sin crecer ni moverse, las inclusiones parecen conservar el gesto de una bifurcación.', color: '#c2a889' },

    { title: 'La vena de la hoja', category: 'VEGETAL · FLUJO', image: 'img/hoja3.jpg', alt: 'Detalle de una hoja y sus nervaduras', text: 'Las nervaduras distribuyen agua y sostén. El dibujo hace visible un sistema de conexiones.', color: '#a3c99a' },
    { title: 'La vena de la hoja', category: 'VEGETAL · FLUJO', image: 'img/hoja2.jpg', alt: 'Detalle de una hoja y sus nervaduras', text: 'Las líneas se ramifican para que el agua alcance cada parte de la hoja.', color: '#a3c99a' },
    { title: 'La vena de la hoja', category: 'VEGETAL · FLUJO', image: 'img/hoja4.jpg', alt: 'Detalle de una hoja y sus nervaduras', text: 'Una red de caminos sostiene el tejido y acompaña su crecimiento.', color: '#a3c99a' },

  ];
  const colors = topics.map(topic => topic.color);

  let nodes = [];
  let scale = 1, panX = 0, panY = 0;
  let active = false, pinchMode = false, spaceDown = false, panMode = false;
  let activePointer = null, seedPoint = null, latestPoint = null, branchStep = 0;
  let nextGrowth = 0, lastSave = 0, lastPointerClient = null;
  let pinchStart = null, panStart = null;
  const pointers = new Map();
  let nextId = 1;
  const rand = (min, max) => min + Math.random() * (max - min);
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const finePointer = matchMedia('(pointer:fine)').matches;

  function stageSize() {
    const rect = stage.getBoundingClientRect();
    return { rect, width: rect.width, height: rect.height };
  }
  function worldPoint(clientX, clientY) {
    const { rect } = stageSize();
    return { x: (clientX - rect.left - panX) / scale, y: (clientY - rect.top - panY) / scale };
  }
  function updateTransform() {
    world.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
    zoomLabel.textContent = `${Math.round(scale * 100)}%`;
  }
  function updateCounts() {
    const total = nodes.length;
    const archived = nodes.reduce((count, node) => count + (node.archived ? 1 : 0), 0);
    mapCount.textContent = `${total} ${total === 1 ? 'fragmento' : 'fragmentos'} · ${archived} ${archived === 1 ? 'eco' : 'ecos'}`;
  }
  function setActive(value) {
    active = value;
    liveState.classList.toggle('is-growing', active);
    if (active) {
      memoryLabel.textContent = 'EL MAPA SIGUE CRECIENDO';
      interactionHint.classList.add('is-hidden');
    } else if (nodes.length) {
      memoryLabel.textContent = 'EL MAPA QUEDA EN PAUSA';
      if (nodes.length < 2) interactionHint.classList.remove('is-hidden');
    }
  }
  function getMemories() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      return Array.isArray(stored) ? stored : [];
    } catch { return []; }
  }
  function saveMap() {
    if (!nodes.length) return;
    const tail = nodes.slice(-450);
    const keptIds = new Set(tail.map(node => node.id));
    const saved = tail.map(node => ({
      id: node.id,
      topic: node.topic,
      type: node.type,
      x: node.x,
      y: node.y,
      parent: keptIds.has(node.parent) ? node.parent : null,
      archived: true
    }));
    try { localStorage.setItem(storageKey, JSON.stringify(saved)); }
    catch { /* La obra sigue funcionando si el navegador no permite guardar. */ }
    lastSave = performance.now();
  }
  function addLoadedNode(item) {
    if (!Number.isFinite(item.x) || !Number.isFinite(item.y) || !Number.isInteger(item.topic) || !topics[item.topic]) return;
    const id = Number.isInteger(item.id) ? item.id : nextId;
    const node = { ...item, id, type: item.type === 'image' ? 'image' : 'text', archived: true };
    nextId = Math.max(nextId, id + 1);
    nodes.push(node);
    renderNode(node, false);
  }
  function restoreMap() {
    getMemories().forEach(addLoadedNode);
    updateConnections(); updateCounts();
    if (nodes.length) memoryLabel.textContent = 'UN ECO TE PRECEDE';
  }
  function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }
  function renderNode(node, animate = true) {
    const topic = topics[node.topic];
    const card = makeElement('article', `map-node ${node.type === 'image' ? 'image-node' : 'text-node'}${node.archived ? ' archive' : ''}`);
    card.style.left = `${node.x}px`; card.style.top = `${node.y}px`; card.style.setProperty('--node-color', colors[node.topic]);
    card.dataset.nodeId = node.id;
    if (!animate) card.style.animation = 'none';
    if (node.type === 'image' && topic.image) {
      const img = document.createElement('img'); img.src = topic.image; img.alt = topic.alt; img.draggable = false;
      img.addEventListener('error', () => { card.replaceChildren(makeTextContent(topic)); card.classList.remove('image-node'); card.classList.add('text-node'); }, { once: true });
      card.append(img);
      const cap = makeElement('div', 'node-cap'); cap.append(makeElement('p', 'node-kicker', topic.category), makeElement('h2', 'node-title', topic.title));
      card.append(cap);
    } else card.append(makeTextContent(topic));
    nodeLayer.append(card);
    node.element = card;
  }
  function makeTextContent(topic) {
    const content = makeElement('div', 'node-text');
    content.append(makeElement('p', 'node-kicker', topic.category), makeElement('h2', 'node-title', topic.title), makeElement('p', 'node-description', topic.text), makeElement('p', 'node-meta', 'UNA FORMA · OTRA ESCALA'));
    return content;
  }
  function nodeById(id) { return nodes.find(node => node.id === id); }
  function updateConnections() {
    const { width, height } = stageSize();
    connections.setAttribute('viewBox', `0 0 ${width} ${height}`);
    connections.replaceChildren();
    for (const node of nodes) {
      const parent = node.parent === null ? null : nodeById(node.parent);
      if (!parent) continue;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const dx = node.x - parent.x, dy = node.y - parent.y;
      const curve = `M ${parent.x} ${parent.y} C ${parent.x + dx * .42} ${parent.y + dy * .08}, ${parent.x + dx * .58} ${parent.y + dy * .92}, ${node.x} ${node.y}`;
      path.setAttribute('d', curve); path.setAttribute('class', `connection${node.archived ? ' archive-connection' : ''}`);
      connections.append(path);
    }
  }
  function nearestParent(x, y, maxDistance = Infinity) {
    let nearest = null, distance = maxDistance;
    for (const node of nodes) {
      const d = Math.hypot(node.x - x, node.y - y);
      if (d < distance) { nearest = node; distance = d; }
    }
    return nearest;
  }
  function createCard(point) {
    const topicIndex = Math.floor(Math.random() * topics.length);
    const topic = topics[topicIndex];
    const makeImage = Boolean(topic.image) && Math.random() < .58;
    const angleToCursor = seedPoint && latestPoint ? Math.atan2(latestPoint.y - seedPoint.y, latestPoint.x - seedPoint.x) : rand(0, Math.PI * 2);
    const angle = angleToCursor + (branchStep % 2 ? 1 : -1) * rand(.22, .98) + rand(-.28, .28);
    const distance = branchStep === 0 ? 0 : rand(48, 102) + Math.min(branchStep, 8) * 10;
    const x = point.x + Math.cos(angle) * distance;
    const y = point.y + Math.sin(angle) * distance;
    const parent = nearestParent(x, y);
    const node = { id: nextId++, topic: topicIndex, type: makeImage ? 'image' : 'text', x, y, parent: parent ? parent.id : null, archived: false };
    nodes.push(node); renderNode(node);
    updateConnections(); updateCounts();
    branchStep++;
    if (nodes.length === 1) interactionHint.classList.add('is-hidden');
  }
  function beginGrowth(e) {
    if (e.button !== undefined && e.button !== 0) return;
    if (e.pointerType === 'touch') {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size >= 2) {
        setActive(false); pinchMode = true;
        const points = [...pointers.values()];
        const mid = { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 };
        pinchStart = { distance: Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y), scale, world: worldPoint(mid.x, mid.y) };
        return;
      }
    }
    if (spaceDown || e.button === 1) {
      panMode = true; panStart = { x: e.clientX, y: e.clientY, panX, panY };
      return;
    }
    activePointer = e.pointerId; stage.setPointerCapture?.(e.pointerId);
    latestPoint = worldPoint(e.clientX, e.clientY); seedPoint = { ...latestPoint }; branchStep = 0;
    setActive(true); createCard(latestPoint); nextGrowth = performance.now() + 440;
  }
  function movePointer(e) {
    if (e.pointerType === 'touch' && pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinchMode && pointers.size >= 2 && pinchStart) {
      const points = [...pointers.values()];
      const mid = { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 };
      const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      applyZoom(pinchStart.scale * distance / Math.max(1, pinchStart.distance), mid, pinchStart.world);
      return;
    }
    if (panMode && panStart) {
      panX = panStart.panX + e.clientX - panStart.x; panY = panStart.panY + e.clientY - panStart.y; updateTransform(); return;
    }
    if (e.pointerId !== activePointer) return;
    latestPoint = worldPoint(e.clientX, e.clientY);
    lastPointerClient = { x: e.clientX, y: e.clientY };
  }
  function endPointer(e) {
    if (e.pointerType === 'touch') pointers.delete(e.pointerId);
    if (activePointer === e.pointerId) { activePointer = null; setActive(false); saveMap(); }
    if (panMode) { panMode = false; panStart = null; }
    if (pinchMode && pointers.size === 0) { pinchMode = false; pinchStart = null; }
  }
  function applyZoom(nextScale, screenPoint, anchorWorld) {
    const { rect } = stageSize();
    const localX = screenPoint.x - rect.left, localY = screenPoint.y - rect.top;
    scale = clamp(nextScale, .35, 2.8);
    panX = localX - anchorWorld.x * scale; panY = localY - anchorWorld.y * scale;
    updateTransform();
  }
  function zoomAt(nextScale, x, y) { applyZoom(nextScale, { x, y }, worldPoint(x, y)); }
  function fitMap() {
    if (!nodes.length) { scale = 1; panX = 0; panY = 0; updateTransform(); return; }
    const { width, height } = stageSize();
    const minX = Math.min(...nodes.map(n => n.x - (n.type === 'image' ? 105 : 100)));
    const maxX = Math.max(...nodes.map(n => n.x + 105));
    const minY = Math.min(...nodes.map(n => n.y - 100));
    const maxY = Math.max(...nodes.map(n => n.y + 100));
    const contentWidth = Math.max(220, maxX - minX), contentHeight = Math.max(180, maxY - minY);
    scale = clamp(Math.min((width - 100) / contentWidth, (height - 180) / contentHeight), .35, 1.5);
    panX = (width - contentWidth * scale) / 2 - minX * scale;
    panY = (height - contentHeight * scale) / 2 - minY * scale;
    updateTransform();
  }
  function archiveCurrentMap() {
    setActive(false); activePointer = null;
    for (const node of nodes) { node.archived = true; node.element?.classList.add('archive'); }
    updateConnections(); saveMap(); updateCounts();
    memoryLabel.textContent = nodes.length ? 'EL MAPA ANTERIOR QUEDA COMO ECO' : 'UN MAPA EN POTENCIA';
    interactionHint.classList.remove('is-hidden');
  }
  function animationFrame(now) {
    if (active && now >= nextGrowth) {
      if (latestPoint) createCard(latestPoint);
      const moved = lastPointerClient ? Math.hypot(latestPoint.x - seedPoint.x, latestPoint.y - seedPoint.y) : 0;
      nextGrowth = now + clamp(510 - moved * 1.4, 260, 510);
    }
    if (nodes.length && now - lastSave > 7000) saveMap();
    requestAnimationFrame(animationFrame);
  }

  stage.addEventListener('pointerdown', beginGrowth);
  stage.addEventListener('pointermove', movePointer);
  stage.addEventListener('pointerup', endPointer);
  stage.addEventListener('pointercancel', endPointer);
  stage.addEventListener('lostpointercapture', endPointer);
  stage.addEventListener('wheel', e => {
    e.preventDefault();
    zoomAt(scale * (e.deltaY < 0 ? 1.12 : .89), e.clientX, e.clientY);
  }, { passive: false });
  document.addEventListener('keydown', e => { if (e.code === 'Space' && !e.repeat) { spaceDown = true; e.preventDefault(); } });
  document.addEventListener('keyup', e => { if (e.code === 'Space') spaceDown = false; });
  document.querySelector('#zoomIn').addEventListener('click', () => { const { width, height } = stageSize(); zoomAt(scale * 1.2, width / 2, height / 2); });
  document.querySelector('#zoomOut').addEventListener('click', () => { const { width, height } = stageSize(); zoomAt(scale / 1.2, width / 2, height / 2); });
  document.querySelector('#fitMap').addEventListener('click', fitMap);
  document.querySelector('#restart').addEventListener('click', archiveCurrentMap);
  window.addEventListener('resize', () => { updateConnections(); });

  hintText.textContent = finePointer ? 'Posicioná el mouse y mantené el click para sumar imágenes y palabras · rueda para zoom · espacio + arrastre para moverte' : 'Mantené el dedo en un punto para sumar imágenes y palabras · pellizcá para ver de cerca';
  restoreMap();
  updateTransform();
  requestAnimationFrame(animationFrame);
})();
