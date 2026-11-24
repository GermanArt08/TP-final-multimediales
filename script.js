(() => {
  const canvas = document.querySelector('#growth');
  const ctx = canvas.getContext('2d');
  const card = document.querySelector('#phenomenon');
  const image = document.querySelector('#phenomenonImage');
  const phenomenonTitle = document.querySelector('#phenomenonTitle');
  const phenomenonText = document.querySelector('#phenomenonText');
  const scaleLabel = document.querySelector('#phenomenonScale');
  const imageIndex = document.querySelector('#imageIndex');
  const memoryLabel = document.querySelector('#memoryLabel');
  const memoryCount = document.querySelector('#memoryCount');
  const hintText = document.querySelector('#hintText');
  const scaleNote = document.querySelector('#scaleNote');
  const hint = document.querySelector('#interactionHint');
  const savedKey = 'casualidades-topologias-v1';
  const motifs = [
    { name: 'La gota', family: 'AGUA', image: 'img/gota.png', alt: 'Gota de agua ramificándose', text: 'Una corriente encuentra una salida. Del azar aparece una dirección; de esa dirección, otras.', scale: 'AGUA · CERCA' },
    { name: 'La raíz', family: 'TIERRA', image: 'img/ombu.jpg', alt: 'Raíces de un ombú', text: 'A oscuras, una raíz tantea el terreno. Crecer también es buscar sin saber dónde termina el camino.', scale: 'TIERRA · BAJO LA SUPERFICIE' },
    { name: 'El río', family: 'AGUA', image: 'img/rio_parana.jpg', alt: 'Un curso de agua visto desde arriba', text: 'El agua rodea lo que encuentra. Con el tiempo, cada desvío se vuelve cauce y memoria.', scale: 'PAISAJE · DISTANCIA' },
    { name: 'La hoja', family: 'VEGETAL', image: 'img/hoja1.jpg', alt: 'Detalle de las nervaduras de una hoja', text: 'Una vena principal se reparte en venas menores: el dibujo de la vida llevando agua hacia la luz.', scale: 'VEGETAL · DETALLE' },
    { name: 'La DLA', family: 'MATERIA', image: '', alt: '', text: 'Partículas que vagan al azar quedan pegadas al tocar un agregado. Poco a poco, el azar dibuja una forma.', scale: 'DLA · PARTÍCULAS' },
    { name: 'El coral', family: 'MAR', image: '', alt: '', text: 'Una colonia vive como muchas. Cada organismo suma un pequeño borde a una arquitectura compartida.', scale: 'MAR · COLONIA' },
    { name: 'El rayo', family: 'CIELO', image: '', alt: '', text: 'La descarga encuentra el paso de menor resistencia. El cielo escribe, en un instante, una ruta ramificada.', scale: 'CIELO · INSTANTE' },
    { name: 'El helecho', family: 'VEGETAL', image: 'img/hoja2.jpg', alt: 'Detalle vegetal con forma de helecho', text: 'Un patrón se repite a otra escala. En el helecho, cada parte contiene el gesto de la forma entera.', scale: 'VEGETAL · REPETICIÓN' },
    { name: 'La ágata dendrítica', family: 'MINERAL', image: '', alt: '', text: 'Dentro de la piedra, inclusiones minerales parecen ramas detenidas. Un paisaje aparece donde no hubo semilla.', scale: 'MINERAL · TIEMPO LENTO' }
  ];
  const colors = ['174,218,194', '183,174,137', '136,184,191', '169,212,145', '207,193,153', '192,135,140', '215,178,139', '160,206,134', '194,173,137'];

  let width = 0, height = 0, dpr = 1;
  let nodes = [], tips = [], echo = null;
  let active = false, pointerDown = false, pointer = { x: .5, y: .5 }, lastPointer = null;
  let lastGrowth = 0, lastSave = 0, lastMove = 0, inactivityStarted = 0, turns = 0, zoom = 0;
  let lastMotif = -1;
  const pointerType = { fine: matchMedia('(pointer:fine)').matches };
  const rand = (min, max) => min + Math.random() * (max - min);
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  function readMemories() {
    try {
      const list = JSON.parse(localStorage.getItem(savedKey) || '[]');
      return Array.isArray(list) ? list.filter(item => Array.isArray(item.nodes)) : [];
    } catch { return []; }
  }
  function updateMemoryCount() {
    const total = readMemories().length;
    memoryCount.textContent = `${total} ${total === 1 ? 'eco en este navegador' : 'ecos en este navegador'}`;
    memoryLabel.textContent = echo ? 'UN ECO TE PRECEDE' : 'UN PUNTO EN POTENCIA';
  }
  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width); height = Math.max(1, rect.height);
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!nodes.length) reset(false);
  }
  function origin() { return { x: width * .54, y: height * .57 }; }
  function reset(keepTrace = true) {
    if (keepTrace && nodes.length > 1) saveTopology();
    const point = origin();
    nodes = [{ x: point.x, y: point.y, parent: -1, born: performance.now(), depth: 0, energy: 1 }];
    tips = [0]; active = false; pointerDown = false; inactivityStarted = 0;
    memoryLabel.textContent = echo ? 'UN ECO TE PRECEDE' : 'UN PUNTO EN POTENCIA';
    hint.classList.remove('is-hidden');
  }
  function saveTopology() {
    if (nodes.length < 8) return;
    // Keep the earliest part of the tree so every saved parent index remains valid.
    const snapshot = nodes.slice(0, 650).map(n => ({ x: n.x / width, y: n.y / height, parent: n.parent, depth: n.depth }));
    try {
      const list = readMemories();
      list.push({ at: Date.now(), nodes: snapshot });
      localStorage.setItem(savedKey, JSON.stringify(list.slice(-16)));
      updateMemoryCount();
    } catch { /* La obra sigue funcionando si el navegador no permite guardar. */ }
  }
  function installEcho() {
    const list = readMemories();
    if (list.length) echo = list[Math.floor(Math.random() * list.length)];
    updateMemoryCount();
  }
  function chooseMotif(force = false, fixedIndex = -1) {
    if (!force && motifs.length < 2) return;
    let index = fixedIndex >= 0 ? fixedIndex % motifs.length : Math.floor(Math.random() * motifs.length);
    if (index === lastMotif) index = (index + 1 + Math.floor(Math.random() * (motifs.length - 1))) % motifs.length;
    lastMotif = index;
    const m = motifs[index];
    card.classList.add('is-changing');
    window.setTimeout(() => {
      phenomenonTitle.textContent = m.name;
      phenomenonText.textContent = m.text;
      scaleLabel.textContent = m.scale;
      scaleNote.textContent = `ESCALA ${String(index + 1).padStart(2, '0')} · ${m.name.toLocaleUpperCase('es')}`;
      imageIndex.textContent = `${String(index + 1).padStart(2, '0')} / ${String(motifs.length).padStart(2, '0')}`;
      if (m.image) { image.src = m.image; image.alt = m.alt; image.closest('.phenomenon-image-wrap').style.visibility = 'visible'; }
      else { image.removeAttribute('src'); image.alt = ''; image.closest('.phenomenon-image-wrap').style.visibility = 'hidden'; }
      card.classList.remove('is-changing');
    }, 160);
  }
  function stepMotif(direction) {
    chooseMotif(true, (lastMotif + (direction >= 0 ? 1 : -1) + motifs.length) % motifs.length);
  }
  function setActive(on) {
    active = on;
    document.querySelector('.live-state').classList.toggle('is-growing', on);
    if (on) { inactivityStarted = 0; hint.classList.add('is-hidden'); memoryLabel.textContent = 'UNA NUEVA RAMA APARECE'; }
    else if (nodes.length > 1 && !inactivityStarted) { inactivityStarted = performance.now(); }
  }
  function addNode(now) {
    if (!tips.length || nodes.length > 1500) return;
    const x = pointer.x * width, y = pointer.y * height;
    let best = tips[0], bestDist = Infinity;
    for (const i of tips) {
      const n = nodes[i], d = (n.x - x) ** 2 + (n.y - y) ** 2;
      if (d < bestDist) { bestDist = d; best = i; }
    }
    const from = nodes[best];
    let angle = Math.atan2(y - from.y, x - from.x);
    if (bestDist < 18000) angle = angle * .68 + Math.atan2(from.y - origin().y, from.x - origin().x) * .32;
    else angle = Math.atan2(from.y - origin().y, from.x - origin().x) + rand(-.48, .48);
    angle += rand(-.4, .4);
    const speed = pointerDown ? 1.25 : 1;
    const length = rand(7, 17) * speed * (pointerType.fine ? 1 : 1.25);
    const child = { x: from.x + Math.cos(angle) * length, y: from.y + Math.sin(angle) * length, parent: best, born: now, depth: from.depth + 1, energy: 1 };
    if (child.x < 8 || child.x > width - 8 || child.y < 8 || child.y > height - 8) { tips.splice(tips.indexOf(best), 1); return; }
    nodes.push(child); const ci = nodes.length - 1;
    const ix = tips.indexOf(best); if (ix >= 0) tips.splice(ix, 1);
    tips.push(ci);
    if (Math.random() < (pointerDown ? .29 : .2) && tips.length < 260) {
      const a = angle + rand(-1.12, 1.12), fork = { x: from.x + Math.cos(a) * length * .82, y: from.y + Math.sin(a) * length * .82, parent: best, born: now, depth: from.depth + 1, energy: .78 };
      nodes.push(fork); tips.push(nodes.length - 1);
    }
    if (Math.random() < .012) chooseMotif();
  }
  function drawBranchSet(list, alpha, old = false) {
    if (!list) return;
    ctx.lineCap = 'round';
    for (let i = 1; i < list.length; i++) {
      const n = list[i], p = list[n.parent]; if (!p) continue;
      const x1 = old ? p.x * width : p.x, y1 = old ? p.y * height : p.y;
      const x2 = old ? n.x * width : n.x, y2 = old ? n.y * height : n.y;
      const age = performance.now() - (n.born || 0);
      const life = old ? 1 : clamp(1 - Math.max(0, age - 10000) / 15000, .06, 1);
      const a = alpha * life * (old ? .55 : 1);
      const depth = n.depth || 1, line = Math.max(.55, 2.0 - depth * .026);
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      ctx.strokeStyle = old ? `rgba(156,193,156,${a})` : `rgba(${depth % 4 ? colors[Math.max(0, lastMotif)] : '219,178,133'},${a})`;
      ctx.setLineDash(!old && lastMotif === 4 ? [1.4, 1.8] : []);
      ctx.lineWidth = old ? .7 : (lastMotif === 5 ? line * 1.28 : line); ctx.shadowBlur = old ? 0 : 5; ctx.shadowColor = 'rgba(177,226,181,.32)'; ctx.stroke();
    }
    ctx.shadowBlur = 0;
  }
  function draw(now) {
    ctx.clearRect(0, 0, width, height);
    if (echo && echo.nodes.length > 1) drawBranchSet(echo.nodes, .24, true);
    const point = origin();
    // La luz del origen queda como una pregunta cuando todas las ramas se han ido.
    const glow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 39);
    glow.addColorStop(0, 'rgba(219,226,184,.20)'); glow.addColorStop(.12, 'rgba(196,220,185,.075)'); glow.addColorStop(1, 'rgba(196,220,185,0)');
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(point.x, point.y, 39, 0, Math.PI * 2); ctx.fill();
    drawBranchSet(nodes, 1);
    ctx.beginPath(); ctx.arc(point.x, point.y, 1.6, 0, Math.PI * 2); ctx.fillStyle = '#edf1d7'; ctx.fill();

    if (active && now - lastGrowth > (pointerDown ? 43 : 74)) { addNode(now); lastGrowth = now; }
    if (active && now - lastMove > 850) setActive(false);
    if (inactivityStarted && now - inactivityStarted > 19000) {
      saveTopology(); reset(false); inactivityStarted = 0;
      memoryLabel.textContent = 'EL PUNTO CONSERVA UNA HUELLA';
      window.setTimeout(() => { if (!active) memoryLabel.textContent = echo ? 'UN ECO TE PRECEDE' : 'UN PUNTO EN POTENCIA'; }, 3000);
    }
    if (now - lastSave > 12000 && nodes.length > 15) { saveTopology(); lastSave = now; }
    // Las ramas delgadas se desvanecen mientras las primeras conservan por más tiempo la huella.
    if (nodes.length > 1) {
      const retained = nodes.filter((n, i) => i === 0 || now - n.born < (n.depth < 3 ? 30000 : 24000));
      if (retained.length < nodes.length) {
        const kept = new Set(retained); const remap = new Map(); const next = [];
        retained.forEach((n, i) => { remap.set(nodes.indexOf(n), i); next.push({ ...n, parent: n.parent < 0 ? -1 : (remap.get(n.parent) ?? 0) }); });
        nodes = next; tips = tips.map(i => remap.get(i)).filter(i => i !== undefined);
      }
    }
    requestAnimationFrame(draw);
  }
  function pointFromEvent(e) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    pointer.y = clamp((e.clientY - rect.top) / rect.height, 0, 1);
    lastMove = performance.now();
    if (lastPointer) {
      const dx = e.clientX - lastPointer.x, dy = e.clientY - lastPointer.y;
      turns += dx * .006 + dy * .003;
      if (Math.abs(turns) > 2.8) { stepMotif(turns); turns = 0; }
    }
    lastPointer = { x: e.clientX, y: e.clientY };
    setActive(true);
  }
  canvas.addEventListener('pointermove', e => pointFromEvent(e));
  canvas.addEventListener('pointerdown', e => { pointerDown = true; canvas.setPointerCapture?.(e.pointerId); pointFromEvent(e); });
  canvas.addEventListener('pointerup', () => { pointerDown = false; });
  canvas.addEventListener('pointercancel', () => { pointerDown = false; });
  canvas.addEventListener('pointerleave', () => { if (!pointerDown) { lastPointer = null; setActive(false); } });
  canvas.addEventListener('wheel', e => {
    e.preventDefault(); zoom += Math.sign(e.deltaY);
    if (Math.abs(zoom) >= 2) { stepMotif(zoom); zoom = 0; }
  }, { passive: false });
  document.querySelector('#returnButton').addEventListener('click', () => { saveTopology(); reset(); chooseMotif(true); });
  window.addEventListener('resize', resize);
  installEcho();
  // Elegí un referente al azar para que el mismo inicio nunca se repita del todo.
  const initial = Math.floor(Math.random() * motifs.length);
  lastMotif = (initial - 1 + motifs.length) % motifs.length;
  chooseMotif();
  hintText.textContent = pointerType.fine ? 'Deslizá el cursor y soplá una dirección' : 'Deslizá el dedo y abrí un camino';
  resize();
  requestAnimationFrame(draw);
})();
