// ==========================================
// LÓGICA DE ANALIZAR PODER
// ==========================================
function analizarPoder() {
  const displayPoder = document.getElementById('scouterPower');
  const status = document.getElementById('scouterStatus');

  if (!displayPoder || !status) return;

  status.innerText = '¡BUSCANDO KI...!';
  status.style.color = '#ffcc00';

  let contador = 0;

  const intervalo = setInterval(() => {
    const valorRandom = Math.floor(Math.random() * 8000) + 1000;
    displayPoder.innerText = valorRandom;
    contador++;

    if (contador > 15) {
      clearInterval(intervalo);
      const poderFinal = Math.floor(Math.random() * 5000) + 9001;
      displayPoder.innerText = poderFinal;
      status.innerText = '¡NIVEL CRÍTICO DETECTADO!';
      status.style.color = '#ff3300';
    }
  }, 80);
}

function mostrarSeccion(id) {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const footer = document.getElementById('contacto');

  sections.forEach((section) => {
    const isVisible = section.id === id;
    section.classList.toggle('section-hidden', !isVisible);
    section.classList.toggle('seccion-activa', isVisible);
  });

  if (footer) {
    footer.classList.toggle('section-hidden', id !== 'contacto');
  }

  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach((button) => {
    const active = button.getAttribute('onclick') && button.getAttribute('onclick').includes(`'${id}'`);
    button.classList.toggle('active', active);
  });

  const btnNav = document.querySelector('.btn-nav');
  if (btnNav) {
    btnNav.classList.toggle('active', id === 'contacto');
  }
}

function abrirCapsulaDirecto() {
  mostrarSeccion('capsula-section');
  toggleCapsula(true);
  const capsule = document.getElementById('capsulaNave');
  if (capsule) {
    capsule.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function toggleCapsula(forzarEstado) {
  const capsule = document.getElementById('capsulaNave');
  if (!capsule) return;

  const isOpen = typeof forzarEstado === 'boolean'
    ? forzarEstado
    : !capsule.classList.contains('capsula-abierta');

  capsule.classList.toggle('capsula-abierta', isOpen);
}

function verDetalle(texto) {
  const caja = document.getElementById('caja-detalle');
  const detalle = document.getElementById('texto-detalle');
  if (!caja || !detalle) return;

  detalle.textContent = texto;
  caja.classList.remove('oculto');
}

function cerrarDetalle() {
  const caja = document.getElementById('caja-detalle');
  if (caja) caja.classList.add('oculto');
}

// ==========================================
// LÓGICA DE LA CALCULADORA CÁPSULA CORP
// ==========================================
function appendCalc(value) {
  const display = document.getElementById('calcDisplay');
  if (!display) return;

  if (display.value === '0' && value !== '.') {
    display.value = value;
  } else {
    display.value += value;
  }
}

function clearCalc() {
  const display = document.getElementById('calcDisplay');
  if (display) display.value = '0';
}

function deleteLast() {
  const display = document.getElementById('calcDisplay');
  if (!display) return;
  display.value = display.value.slice(0, -1);
  if (display.value === '') display.value = '0';
}

function calculateResult() {
  const display = document.getElementById('calcDisplay');
  if (!display) return;
  try {
    display.value = Function(`"use strict"; return (${display.value})`)();
  } catch (error) {
    display.value = 'ERROR';
    setTimeout(() => { clearCalc(); }, 1500);
  }
}

// ==========================================
// SINTETIZADOR DE SONIDO DE CARGA DE KI
// ==========================================
function reproducirSonidoKi() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 1.2);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.3);
  } catch (e) {
    console.log('Audio no soportado');
  }
}

// ==========================================
// LÓGICA DE TRANSFORMACIÓN SUPER SAIYAN
// ==========================================
function transformarSuperSaiyan(event) {
  if (event) event.preventDefault();

  reproducirSonidoKi();

  const body = document.body;
  const btn = document.getElementById('btnTransform');

  body.classList.toggle('modo-saiyan');

  if (btn) {
    if (body.classList.contains('modo-saiyan')) {
      btn.innerHTML = '⚡ MODO NORMAL (DESACTIVAR) ⚡';
      btn.style.background = 'linear-gradient(45deg, #00e5ff, #00ff66)';
    } else {
      btn.innerHTML = '⚡ ¡TRANSFORMAR EN SUPER SAIYAN! ⚡';
      btn.style.background = 'linear-gradient(45deg, #ffcc00, #ff8c00)';
    }
  }
}

// ==========================================
// LÓGICA DEL LABORATORIO Y ENSAMBLAJE
// ==========================================
function verificarFormulaRadar() {
  const comp1 = document.getElementById('comp1')?.checked;
  const comp2 = document.getElementById('comp2')?.checked;
  const comp3 = document.getElementById('comp3')?.checked;

  const radarVisual = document.getElementById('radarVisual');
  const radarDot = document.getElementById('radarDot');
  const radarStatusTextLab = document.getElementById('radarStatusTextLab');

  if (comp1 && comp2 && comp3) {
    radarVisual.className = 'radar-box radar-completo';
    if (radarDot) radarDot.style.display = 'block';
    if (radarStatusTextLab) {
      radarStatusTextLab.innerHTML = '✨ ¡RADAR DEL DRAGÓN ENSAMBLADO Y OPERATIVO!';
      radarStatusTextLab.style.color = '#ffcc00';
    }
  } else {
    radarVisual.className = 'radar-box radar-incompleto';
    if (radarDot) radarDot.style.display = 'none';
    if (radarStatusTextLab) {
      radarStatusTextLab.innerHTML = '⚠️ Estado: Faltan componentes';
      radarStatusTextLab.style.color = '#888';
    }
  }
}

// ==========================================
// RADAR DEL DRAGÓN: SONIDO Y ESCÁNER EN VIVO
// ==========================================
let radarActivo = false;
let animIdRadar = null;
let anguloEscaneo = 0;

function sonarBipRadar() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  } catch (e) {
    console.log('Audio no soportado');
  }
}

function toggleRadarDragon(event) {
  if (event) event.preventDefault();

  sonarBipRadar();

  const statusText = document.getElementById('radarStatusText');
  radarActivo = !radarActivo;

  if (radarActivo) {
    if (statusText) {
      statusText.innerHTML = '🟢 RASTREANDO ESFERAS DEL DRAGÓN...';
      statusText.style.color = '#00ff66';
    }
    if (!animIdRadar) animarEscaneoRadar();
  } else {
    if (statusText) {
      statusText.innerHTML = '🔴 RADAR APAGADO (Presiona el botón superior)';
      statusText.style.color = '#ff3300';
    }
    if (animIdRadar) {
      cancelAnimationFrame(animIdRadar);
      animIdRadar = null;
    }
    limpiarRadar();
  }
}

function limpiarRadar() {
  const canvas = document.getElementById('dragonRadarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#020a02';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animarEscaneoRadar() {
  const canvas = document.getElementById('dragonRadarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const r = w / 2;

  const esferas = [
    { x: cx + 40, y: cy - 45 },
    { x: cx - 55, y: cy + 30 },
    { x: cx + 65, y: cy + 40 },
    { x: cx - 30, y: cy - 65 },
    { x: cx + 20, y: cy + 75 },
    { x: cx - 75, y: cy - 20 },
    { x: cx, y: cy - 10 }
  ];

  function draw() {
    ctx.fillStyle = '#001a08';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(0, 255, 102, 0.25)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 25) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 25) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(0, 255, 102, 0.4)';
    ctx.lineWidth = 2;
    [r * 0.35, r * 0.7, r * 0.95].forEach(radius => {
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke();
    });

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(anguloEscaneo);

    const grad = ctx.createConicGradient(0, 0, 0);
    grad.addColorStop(0, 'rgba(0, 255, 102, 0.5)');
    grad.addColorStop(0.18, 'rgba(0, 255, 102, 0.05)');
    grad.addColorStop(1, 'rgba(0, 255, 102, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, r, 0, Math.PI * 0.4);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#00ff66';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(r, 0); ctx.stroke();
    ctx.restore();

    const time = Date.now() * 0.006;
    esferas.forEach((e) => {
      const alpha = Math.abs(Math.sin(time + e.x));
      ctx.fillStyle = `rgba(255, 204, 0, ${0.3 + alpha * 0.7})`;
      ctx.shadowColor = '#ffcc00';
      ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.arc(e.x, e.y, 6, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    });

    anguloEscaneo += 0.035;
    animIdRadar = requestAnimationFrame(draw);
  }

  draw();
}

window.addEventListener('DOMContentLoaded', limpiarRadar);

// ==========================================
// SALUDO DE VOZ AL INGRESAR A LA PÁGINA
// ==========================================
let bienvenidaSonada = false;

function decirBienvenida() {
  if (bienvenidaSonada) return;
  if (!('speechSynthesis' in window)) return;

  const voces = window.speechSynthesis.getVoices();
  const mensaje = new SpeechSynthesisUtterance('¡Bienvenido de nuevo!');

  const vozEspanol = voces.find(v => v.lang.startsWith('es'));
  if (vozEspanol) {
    mensaje.voice = vozEspanol;
  }

  mensaje.lang = 'es-ES';
  mensaje.rate = 0.9;
  mensaje.pitch = 1.0;

  mensaje.onend = () => { bienvenidaSonada = true; };
  mensaje.onerror = () => { bienvenidaSonada = true; };

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(mensaje);
  bienvenidaSonada = true;
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

const activarVozAlClic = () => {
  decirBienvenida();
  window.removeEventListener('click', activarVozAlClic);
  window.removeEventListener('touchstart', activarVozAlClic);
};

window.addEventListener('click', activarVozAlClic, { once: true });
window.addEventListener('touchstart', activarVozAlClic, { once: true });

// ==========================================
// ANIMACIÓN DE SHENLONG VOLANDO POR LA PÁGINA
// ==========================================
function iniciarAnimacionShenlong() {
  const canvas = document.getElementById('shenlongCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function ajustarTamano() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  ajustarTamano();
  window.addEventListener('resize', ajustarTamano);

  const numSegmentos = 35;
  const tamSegmento = 12;
  const segmentos = [];

  let posX = window.innerWidth / 2;
  let posY = window.innerHeight / 2;
  let angulo = 0;
  let tiempo = 0;

  for (let i = 0; i < numSegmentos; i++) {
    segmentos.push({ x: posX, y: posY });
  }

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tiempo += 0.02;

    angulo += Math.sin(tiempo * 0.8) * 0.03;
    const velocidad = 3.5;

    posX += Math.cos(angulo) * velocidad + Math.sin(tiempo * 0.5) * 1.5;
    posY += Math.sin(angulo) * velocidad + Math.cos(tiempo * 0.7) * 1.5;

    const margen = 100;
    if (posX < -margen) posX = canvas.width + margen;
    if (posX > canvas.width + margen) posX = -margen;
    if (posY < -margen) posY = canvas.height + margen;
    if (posY > canvas.height + margen) posY = -margen;

    segmentos[0] = { x: posX, y: posY };
    for (let i = 1; i < numSegmentos; i++) {
      const prev = segmentos[i - 1];
      const curr = segmentos[i];
      const dx = prev.x - curr.x;
      const dy = prev.y - curr.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 0) {
        curr.x = prev.x - (dx / dist) * tamSegmento;
        curr.y = prev.y - (dy / dist) * tamSegmento;
      }
    }

    ctx.save();
    ctx.shadowColor = '#00ff66';
    ctx.shadowBlur = 15;

    for (let i = numSegmentos - 1; i >= 0; i--) {
      const seg = segmentos[i];
      const radio = (1 - i / numSegmentos) * 14 + 4;

      ctx.beginPath();
      ctx.arc(seg.x, seg.y, radio, 0, Math.PI * 2);

      const grad = ctx.createRadialGradient(seg.x, seg.y, 2, seg.x, seg.y, radio);
      grad.addColorStop(0, '#00ff66');
      grad.addColorStop(0.6, '#008833');
      grad.addColorStop(1, '#003311');

      ctx.fillStyle = grad;
      ctx.fill();
    }

    const cabeza = segmentos[0];
    const cuello = segmentos[1];
    const dirAngulo = Math.atan2(cabeza.y - cuello.y, cabeza.x - cuello.x);

    ctx.save();
    ctx.translate(cabeza.x, cabeza.y);
    ctx.rotate(dirAngulo);

    ctx.fillStyle = '#ff0000';
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.arc(6, -6, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(6, 6, 3, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-2, -8); ctx.lineTo(-12, -18); ctx.lineTo(-18, -14);
    ctx.moveTo(-2, 8); ctx.lineTo(-12, 18); ctx.lineTo(-18, 14);
    ctx.stroke();

    const bigoteOnda = Math.sin(tiempo * 5) * 5;
    ctx.strokeStyle = '#00ff66';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, -4); ctx.quadraticCurveTo(25, -15 + bigoteOnda, 40, -10);
    ctx.moveTo(10, 4); ctx.quadraticCurveTo(25, 15 - bigoteOnda, 40, 10);
    ctx.stroke();

    ctx.restore();
    ctx.restore();

    requestAnimationFrame(animar);
  }

  animar();
}

window.addEventListener('DOMContentLoaded', iniciarAnimacionShenlong);

// ==========================================
// MODELO 3D INTERACTIVO SUPER SAIYAN (THREE.JS)
// ==========================================
function crearModelo3DSaiyan() {
  const container = document.getElementById('canvas-3d-container');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 1.2, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0x00e5ff, 1.2);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  const saiyanGroup = new THREE.Group();

  const saiyanMaterial = new THREE.MeshPhongMaterial({
    color: 0x00ff88,
    wireframe: true,
    emissive: 0x004422,
    shininess: 100
  });

  const headGeo = new THREE.SphereGeometry(0.35, 16, 16);
  const head = new THREE.Mesh(headGeo, saiyanMaterial);
  head.position.y = 1.2;
  saiyanGroup.add(head);

  const hairMaterial = new THREE.MeshPhongMaterial({
    color: 0xffcc00,
    wireframe: true,
    emissive: 0x665500
  });

  const spikePositions = [
    [0, 1.7, 0, 0, 0, 0],
    [-0.25, 1.6, 0, 0, 0, 0.4],
    [0.25, 1.6, 0, 0, 0, -0.4],
    [-0.35, 1.4, 0.1, 0, 0, 0.7],
    [0.35, 1.4, 0.1, 0, 0, -0.7],
    [0, 1.5, -0.2, -0.4, 0, 0]
  ];

  spikePositions.forEach(pos => {
    const spikeGeo = new THREE.ConeGeometry(0.12, 0.6, 8);
    const spike = new THREE.Mesh(spikeGeo, hairMaterial);
    spike.position.set(pos[0], pos[1], pos[2]);
    spike.rotation.set(pos[3], pos[4], pos[5]);
    saiyanGroup.add(spike);
  });

  const torsoGeo = new THREE.CylinderGeometry(0.4, 0.25, 0.8, 12);
  const torso = new THREE.Mesh(torsoGeo, saiyanMaterial);
  torso.position.y = 0.5;
  saiyanGroup.add(torso);

  const limbGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.7, 8);

  const armL = new THREE.Mesh(limbGeo, saiyanMaterial);
  armL.position.set(-0.5, 0.5, 0);
  armL.rotation.z = 0.3;
  saiyanGroup.add(armL);

  const armR = new THREE.Mesh(limbGeo, saiyanMaterial);
  armR.position.set(0.5, 0.5, 0);
  armR.rotation.z = -0.3;
  saiyanGroup.add(armR);

  const legL = new THREE.Mesh(limbGeo, saiyanMaterial);
  legL.position.set(-0.2, -0.2, 0);
  saiyanGroup.add(legL);

  const legR = new THREE.Mesh(limbGeo, saiyanMaterial);
  legR.position.set(0.2, -0.2, 0);
  saiyanGroup.add(legR);

  const auraGeo = new THREE.TorusGeometry(1.2, 0.02, 16, 50);
  const auraMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true });
  const auraRing = new THREE.Mesh(auraGeo, auraMat);
  auraRing.rotation.x = Math.PI / 2;
  saiyanGroup.add(auraRing);

  scene.add(saiyanGroup);

  function animate() {
    requestAnimationFrame(animate);
    saiyanGroup.rotation.y += 0.015;
    auraRing.rotation.z -= 0.03;
    renderer.render(scene, camera);
  }

  animate();
}

window.addEventListener('DOMContentLoaded', crearModelo3DSaiyan);

// ==========================================
// CHATBOT INTELIGENTE CAPSULE CORP (AVANZADO)
// ==========================================
const CHATBOT_API_URL = '';

const perfilMiguel = {
  nombre: 'Miguel Paspuel',
  titulo: 'Estudiante de Ciberseguridad @ TESA',
  institucion: 'Tecnológico San Antonio (TESA)',
  especialidad: 'Seguridad Informática y Protección de Datos',
  habilidades: [
    'HTML5', 'CSS3', 'JavaScript', 'Pentesting', 'Análisis de redes',
    'Seguridad informática', 'Protección de datos', 'GitHub Pages', 'Front-end interactivo'
  ],
  proyectos: [
    'Portafolio web con temática Dragon Ball',
    'Proyecto GitHub Pages',
    'Simulador 3D',
    'Radar del Dragón',
    'Calculadora Capsule Corp',
    'Diseño web interactivo'
  ],
  contacto: 'Puedes contactarme por la sección de contacto o redes sociales del portafolio.'
};

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function obtenerRespuestaLocal(textoOriginal) {
  const texto = normalizarTexto(textoOriginal);

  const reglas = [
    { test: /hola|buenas|buenos|saludos|hey|hi|buen dia|buenas tardes|buenas noches/, respuesta: '¡Saludos! Soy la IA de Capsule Corp y estoy aquí para ayudarte a conocer mejor a Miguel Paspuel y su portafolio.' },
    { test: /quien es|quién es|quien eres|quién eres|miguel|paspuel|sobre ti/, respuesta: `${perfilMiguel.nombre} es ${perfilMiguel.titulo}. Se enfoca en ${perfilMiguel.especialidad} y trabaja con tecnologías web y seguridad digital.` },
    { test: /tesa|carrera|universidad|estudia|estudiante|ciberseguridad/, respuesta: `Miguel estudia ${perfilMiguel.especialidad} en ${perfilMiguel.institucion}. Su enfoque principal es la seguridad informática, análisis de vulnerabilidades y protección de datos.` },
    { test: /habilidades|skills|que sabes|que dominas|tecnologias|tecnología|que sabes hacer/, respuesta: `Miguel domina: ${perfilMiguel.habilidades.join(', ')}. Además, tiene interés en proyectos web interactivos con diseño moderno y experiencia visual.` },
    { test: /proyectos|trabajos|portafolio|misiones|github/, respuesta: `Entre sus proyectos destacan: ${perfilMiguel.proyectos.join(', ')}. También tiene un portafolio desarrollado con GitHub Pages y una estética inspirada en Dragon Ball.` },
    { test: /dragon ball|goku|saiyan|ki|super saiyan|esferas del dragon|esferas del dragón/, respuesta: '¡Perfecto! Miguel tiene una identidad visual inspirada en Dragon Ball, con energía, estética de combate y un estilo tecnológico tipo Capsule Corp. Su portafolio combina seguridad y diseño con un toque saiyan.' },
    { test: /contacto|correo|email|redes|mensaje/, respuesta: 'Puedes contactar a Miguel a través de la sección de contacto del portafolio. También es posible enviar mensaje por redes sociales o canales disponibles en la página.' },
    { test: /ayuda|comandos|menu|info|qué puedes hacer|que puedes hacer/, respuesta: 'Puedo ayudarte con estas preguntas: quién es Miguel, qué estudia, qué habilidades tiene, qué proyectos desarrolla, cómo contactarlo o qué hace este portafolio.' },
    { test: /html|css|javascript|frontend|web|desarrollo/, respuesta: 'Miguel trabaja con HTML5, CSS3 y JavaScript para crear interfaces interactivas. También explora visualización, animaciones y experiencia de usuario en proyectos web.' },
    { test: /redes|network|analisis|análisis|pentesting|seguridad/, respuesta: 'Su interés en redes y seguridad incluye pentesting, análisis de vulnerabilidades, protección de sistemas y fortalecimiento de entornos digitales.' },
    { test: /gracias|thank you|mil gracias/, respuesta: '¡Con gusto! Estoy aquí para ayudarte a conocer mejor el portafolio de Miguel.' },
    { test: /portafolio|sitio|pagina|página/, respuesta: 'Este portafolio es una mezcla entre diseño web moderno, animaciones y temática de Dragon Ball, con una identidad tecnológica inspirada en Capsule Corp.' },
    { test: /seguridad|vulnerabilidad|analisis|análisis/, respuesta: 'La seguridad informática se centra en proteger datos, sistemas y redes ante amenazas, vulnerabilidades y accesos no autorizados. Miguel se interesa por ese enfoque profesional.' }
  ];

  for (const regla of reglas) {
    if (regla.test.test(texto)) {
      return regla.respuesta;
    }
  }

  if (texto.includes('como') || texto.includes('cómo')) {
    return 'Puedes preguntarme por Miguel, TESA, ciberseguridad, habilidades, proyectos o contacto. También puedo explicarte qué hace este sitio web.';
  }

  return 'No tengo esa información exacta, pero puedo hablarte sobre Miguel, TESA, ciberseguridad, proyectos y tecnologías web. Prueba preguntando: “¿Quién es Miguel?”, “¿Qué estudia?” o “¿Qué habilidades tiene?”';
}

async function pedirRespuestaChatbot(mensaje) {
  if (!CHATBOT_API_URL) {
    return obtenerRespuestaLocal(mensaje);
  }

  try {
    const respuesta = await fetch(CHATBOT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: mensaje })
    });

    if (!respuesta.ok) {
      throw new Error('Respuesta no válida del backend');
    }

    const data = await respuesta.json();
    if (data && data.reply) {
      return data.reply;
    }

    throw new Error('No se encontró respuesta');
  } catch (error) {
    return obtenerRespuestaLocal(mensaje);
  }
}

function mostrarIndicadorEscribiendo() {
  const body = document.getElementById('chatbot-messages');
  if (!body) return;

  const indicador = document.createElement('div');
  indicador.className = 'message bot-message typing';
  indicador.id = 'typing-indicator';
  indicador.innerHTML = '<span>.</span><span>.</span><span>.</span>';
  body.appendChild(indicador);
  body.scrollTop = body.scrollHeight;
}

function quitarIndicadorEscribiendo() {
  const indicador = document.getElementById('typing-indicator');
  if (indicador) indicador.remove();
}

function toggleChatbot() {
  const container = document.getElementById('chatbot-container');
  if (container) container.classList.toggle('chatbot-oculto');
}

function detectarEnter(e) {
  if (e.key === 'Enter') enviarMensajeChatbot();
}

async function enviarMensajeChatbot() {
  const input = document.getElementById('chatbot-input');
  if (!input) return;

  const texto = input.value.trim();
  if (!texto) return;

  agregarMensaje(texto, 'user-message');
  input.value = '';
  mostrarIndicadorEscribiendo();

  try {
    const respuesta = await pedirRespuestaChatbot(texto);
    agregarMensaje(respuesta, 'bot-message');
  } catch (error) {
    agregarMensaje('Hubo un problema con el asistente IA. Intenta de nuevo.', 'bot-message');
  } finally {
    quitarIndicadorEscribiendo();
  }
}

function agregarMensaje(texto, clase) {
  const body = document.getElementById('chatbot-messages');
  if (!body) return;

  const msg = document.createElement('div');
  msg.className = `message ${clase}`;
  msg.textContent = texto;
  body.appendChild(msg);
  body.scrollTop = body.scrollHeight;
}

window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('chatbot-input');
  if (input) {
    input.placeholder = 'Escribe tu pregunta o “ayuda”...';
  }

  const chatBody = document.getElementById('chatbot-messages');
  if (chatBody && !chatBody.querySelector('.message')) {
    const saludo = document.createElement('div');
    saludo.className = 'message bot-message';
    saludo.textContent = '¡Hola! Soy la IA de Capsule Corp. ¿Qué deseas saber sobre Miguel Paspuel y su perfil de Ciberseguridad?';
    chatBody.appendChild(saludo);
  }
});
// ==========================================
// MOTOR DE PELEA 1 VS 1 CON DIBUJO ANIME
// ==========================================
const personajesDB = {
  Goku: {
    nombre: 'Goku SSJ',
    peloColor: '#ffea00', // Dorado Super Saiyan
    trajeColor: '#ff5500', // Gi Naranja
    pielColor: '#ffdbac',
    kiColor: '#00e5ff'
  },
  Vegeta: {
    nombre: 'Vegeta',
    peloColor: '#ffea00',
    trajeColor: '#0022cc', // Traje Azul Saiyan
    pielColor: '#ffdbac',
    kiColor: '#ffcc00'
  },
  Piccolo: {
    nombre: 'Piccolo',
    peloColor: '#004411', // Turbante o cabeza Namek
    trajeColor: '#660099', // Traje Morado
    pielColor: '#00cc44', // Piel Verde Namek
    kiColor: '#ff3300'
  }
};

let guerreroP1 = 'Goku';
let guerreroP2 = 'Vegeta';
let juegoCorriendo = false;
let loopJuego = null;

// Estados de los combatientes
const jugador1 = { x: 90, y: 190, ancho: 45, alto: 75, vy: 0, saltando: false, hp: 100, kiRáfagas: [] };
const jugador2 = { x: 500, y: 190, ancho: 45, alto: 75, vy: 0, saltando: false, hp: 100, kiRáfagas: [] };

function seleccionarGuerrero(nombre) {
  guerreroP1 = nombre;
  document.getElementById('nombre-p1').innerText = personajesDB[nombre].nombre;

  // Selección automática de rival distinto
  const opciones = Object.keys(personajesDB).filter(p => p !== nombre);
  guerreroP2 = opciones[Math.floor(Math.random() * opciones.length)];
  document.getElementById('nombre-p2').innerText = personajesDB[guerreroP2].nombre + ' (IA)';

  renderizarEscenarioPrevio();
}

// Escuchador de Controles en tiempo real
const teclasPulsadas = {};
window.addEventListener('keydown', (e) => {
  teclasPulsadas[e.key.toLowerCase()] = true;
  if (e.code === 'Space' && juegoCorriendo) {
    lanzarAtaqueKi(jugador1, 1);
  }
});

window.addEventListener('keyup', (e) => {
  teclasPulsadas[e.key.toLowerCase()] = false;
});

function lanzarAtaqueKi(p, direccion) {
  const colorKi = direccion === 1 ? personajesDB[guerreroP1].kiColor : personajesDB[guerreroP2].kiColor;
  p.kiRáfagas.push({
    x: direccion === 1 ? p.x + p.ancho : p.x - 10,
    y: p.y + 25,
    vx: direccion === 1 ? 9 : -9,
    color: colorKi
  });
}

function iniciarPelea() {
  jugador1.hp = 100;
  jugador2.hp = 100;
  jugador1.x = 90;
  jugador1.y = 190;
  jugador2.x = 500;
  jugador2.y = 190;
  jugador1.kiRáfagas = [];
  jugador2.kiRáfagas = [];

  actualizarVidaInterfaz();
  juegoCorriendo = true;

  if (loopJuego) cancelAnimationFrame(loopJuego);
  actualizarJuego();
}

function actualizarVidaInterfaz() {
  document.getElementById('hp-p1').style.width = Math.max(0, jugador1.hp) + '%';
  document.getElementById('hp-p2').style.width = Math.max(0, jugador2.hp) + '%';
}

function actualizarJuego() {
  if (!juegoCorriendo) return;

  const canvas = document.getElementById('gameCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // 1. MOVIMIENTO JUGADOR 1 (HUMANO)
  if (teclasPulsadas['a'] && jugador1.x > 15) jugador1.x -= 4.5;
  if (teclasPulsadas['d'] && jugador1.x < canvas.width - 60) jugador1.x += 4.5;
  if (teclasPulsadas['w'] && !jugador1.saltando) {
    jugador1.vy = -13;
    jugador1.saltando = true;
  }

  jugador1.y += jugador1.vy;
  jugador1.vy += 0.65; // Gravedad
  if (jugador1.y >= 190) { jugador1.y = 190; jugador1.saltando = false; }

  // 2. IA DEL RIVAL (JUGADOR 2)
  if (Math.random() < 0.025) lanzarAtaqueKi(jugador2, -1);
  if (jugador2.x > jugador1.x + 130) jugador2.x -= 1.8;
  if (jugador2.x < jugador1.x + 90) jugador2.x += 1.8;

  // 3. DIBUJAR FONDO ESTILO ANIME (Planeta Namek / Campo de Batalla)
  dibujarFondoAnime(ctx, canvas.width, canvas.height);

  // 4. DIBUJAR PERSONAJES ANIME
  dibujarPersonajeAnime(ctx, jugador1, personajesDB[guerreroP1], true);
  dibujarPersonajeAnime(ctx, jugador2, personajesDB[guerreroP2], false);

  // 5. PROCESAR PROYECTILES KI
  procesarAtaquesKi(ctx, jugador1, jugador2, 1);
  procesarAtaquesKi(ctx, jugador2, jugador1, -1);

  // 6. DETECTAR GANADOR
  if (jugador1.hp <= 0 || jugador2.hp <= 0) {
    juegoCorriendo = false;
    ctx.fillStyle = '#ffcc00';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 10;
    const textoResultado = jugador1.hp > 0 ? "¡VICTORIA ÉPICA DEL JUGADOR 1! 🏆" : "¡HAS SIDO DERROTADO! 💥";
    ctx.fillText(textoResultado, canvas.width / 2, 140);
    return;
  }

  loopJuego = requestAnimationFrame(actualizarJuego);
}

// Dibujo vectorial del fondo de combate (Cielo Anime + Montañas + Plataforma de Roca)
function dibujarFondoAnime(ctx, width, height) {
  // Cielo con degradado
  const gradCielo = ctx.createLinearGradient(0, 0, 0, height);
  gradCielo.addColorStop(0, '#0a192f');
  gradCielo.addColorStop(0.6, '#1e3a8a');
  gradCielo.addColorStop(1, '#3b82f6');
  ctx.fillStyle = gradCielo;
  ctx.fillRect(0, 0, width, height);

  // Montañas de fondo
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(0, 220); ctx.lineTo(120, 130); ctx.lineTo(250, 220);
  ctx.moveTo(200, 220); ctx.lineTo(380, 110); ctx.lineTo(520, 220);
  ctx.moveTo(450, 220); ctx.lineTo(580, 140); ctx.lineTo(width, 220);
  ctx.fill();

  // Suelo de combate (Ring de roca)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 265, width, 55);

  ctx.strokeStyle = '#00e5ff';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(0, 265); ctx.lineTo(width, 265); ctx.stroke();
}

// Dibuja la silueta animada del guerrero con Aura de Ki
function dibujarPersonajeAnime(ctx, p, datos, esJugador1) {
  ctx.save();

  // Aura de Ki brillante
  ctx.shadowColor = datos.kiColor;
  ctx.shadowBlur = 15;

  // Cuerpo (Traje)
  ctx.fillStyle = datos.trajeColor;
  ctx.fillRect(p.x, p.y + 20, p.ancho, p.alto - 20);

  // Cabeza (Piel)
  ctx.fillStyle = datos.pielColor;
  ctx.beginPath();
  ctx.arc(p.x + p.ancho / 2, p.y + 12, 14, 0, Math.PI * 2);
  ctx.fill();

  // Cabello Saiyan Puntiagudo
  ctx.fillStyle = datos.peloColor;
  ctx.beginPath();
  const cx = p.x + p.ancho / 2;
  const cy = p.y + 5;
  ctx.moveTo(cx - 15, cy + 5);
  ctx.lineTo(cx - 10, cy - 15);
  ctx.lineTo(cx, cy - 22);
  ctx.lineTo(cx + 10, cy - 15);
  ctx.lineTo(cx + 15, cy + 5);
  ctx.fill();

  // Ojos del guerrero
  ctx.fillStyle = '#000';
  const ojoX = esJugador1 ? p.x + p.ancho - 15 : p.x + 10;
  ctx.fillRect(ojoX, p.y + 10, 4, 4);

  ctx.restore();
}

function procesarAtaquesKi(ctx, atacante, defensor, direccion) {
  atacante.kiRáfagas.forEach((r, idx) => {
    r.x += r.vx;

    // Bola de energía de Ki con destello
    ctx.save();
    ctx.shadowColor = r.color;
    ctx.shadowBlur = 15;
    ctx.fillStyle = r.color;
    ctx.beginPath();
    ctx.arc(r.x, r.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Impacto de Ki sobre el enemigo
    if (r.x >= defensor.x && r.x <= defensor.x + defensor.ancho &&
        r.y >= defensor.y && r.y <= defensor.y + defensor.alto) {
      defensor.hp -= 12;
      atacante.kiRáfagas.splice(idx, 1);
      actualizarVidaInterfaz();
    }
  });
}

function renderizarEscenarioPrevio() {
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  dibujarFondoAnime(ctx, canvas.width, canvas.height);
  dibujarPersonajeAnime(ctx, jugador1, personajesDB[guerreroP1], true);
  dibujarPersonajeAnime(ctx, jugador2, personajesDB[guerreroP2], false);
}

window.addEventListener('DOMContentLoaded', () => {
  seleccionarGuerrero('Goku');
});
// ==========================================
// FONDO INTERACTIVO Y ESFERAS DEL DRAGÓN
// ==========================================
let esferasRecolectadas = 0;

function crearEsferasInteractivas() {
  const posiciones = [
    { top: '12%', left: '8%' },
    { top: '25%', left: '85%' },
    { top: '45%', left: '5%' },
    { top: '60%', left: '90%' },
    { top: '75%', left: '12%' },
    { top: '85%', left: '82%' },
    { top: '35%', left: '48%' }
  ];

  posiciones.forEach((pos, index) => {
    const esfera = document.createElement('div');
    esfera.className = 'esfera-db-interactiva';
    esfera.style.top = pos.top;
    esfera.style.left = pos.left;
    esfera.title = `Esfera del Dragón N° ${index + 1} - ¡Haz clic para recolectar!`;

    // Evento interactivo al hacer clic en las imágenes de las esferas
    esfera.addEventListener('click', () => {
      sonarBipRadar();
      esferasRecolectadas++;
      esfera.style.transform = 'scale(2) rotate(360deg)';
      esfera.style.opacity = '0';
      esfera.style.transition = 'all 0.5s ease';

      setTimeout(() => esfera.remove(), 500);

      if (esferasRecolectadas === 7) {
        setTimeout(() => {
          alert('✨ ¡HAS REUNIDO LAS 7 ESFERAS DEL DRAGÓN! ¡SHENLONG CUMPLIRÁ TU DESEO!');
          transformarSuperSaiyan();
        }, 600);
      }
    });

    document.body.appendChild(esfera);
  });
}

// Crear la Nube Voladora interactiva
function crearNubeVoladora() {
  const nube = document.createElement('div');
  nube.id = 'nube-voladora-img';
  nube.title = '¡La Nube Voladora de Goku! Haz clic sobre ella.';
  
  nube.addEventListener('click', () => {
    reproducirSonidoKi();
    alert('☁️ ¡Súbete a la Nube Voladora! Tu Ki ha aumentado.');
  });

  document.body.appendChild(nube);
}

// Botón para alternar el Fondo Alegre
function alternarFondoAlegre() {
  document.body.classList.toggle('fondo-alegre');
}

// Inicializar elementos alegres al cargar
window.addEventListener('DOMContentLoaded', () => {
  crearEsferasInteractivas();
  crearNubeVoladora();
});
