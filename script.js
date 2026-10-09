function analizarPoder() {
  const displayPoder = document.getElementById('scouterPower');
  const status = document.getElementById('scouterStatus');
  
  if (!displayPoder || !status) return;

  status.innerText = "¡BUSCANDO KI...!";
  status.style.color = "#ffcc00";

  let contador = 0;
  
  const intervalo = setInterval(() => {
    let valorRandom = Math.floor(Math.random() * 8000) + 1000;
    displayPoder.innerText = valorRandom;
    contador++;

    if (contador > 15) {
      clearInterval(intervalo);
      const poderFinal = Math.floor(Math.random() * 5000) + 9001;
      displayPoder.innerText = poderFinal;
      status.innerText = "¡NIVEL CRÍTICO DETECTADO!";
      status.style.color = "#ff3300";
    }
  }, 80);
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
    display.value = eval(display.value);
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
    console.log("Audio no soportado");
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

  if (body.classList.contains('modo-saiyan')) {
    btn.innerHTML = "⚡ MODO NORMAL (DESACTIVAR) ⚡";
    btn.style.background = "linear-gradient(45deg, #00e5ff, #00ff66)";
  } else {
    btn.innerHTML = "⚡ ¡TRANSFORMAR EN SUPER SAIYAN! ⚡";
    btn.style.background = "linear-gradient(45deg, #ffcc00, #ff8c00)";
  }
}
// ==========================================
// LÓGICA DEL LABORATORIO Y ENSAMBLAJE
// ==========================================
function verificarFormulaRadar() {
  const comp1 = document.getElementById('comp1').checked;
  const comp2 = document.getElementById('comp2').checked;
  const comp3 = document.getElementById('comp3').checked;

  const radarVisual = document.getElementById('radarVisual');
  const radarDot = document.getElementById('radarDot');
  const radarStatusText = document.getElementById('radarStatusText');

  if (comp1 && comp2 && comp3) {
    // Cuando los 3 componentes están activos
    radarVisual.className = "radar-box radar-completo";
    radarDot.style.display = "block";
    radarStatusText.innerHTML = "✨ ¡RADAR DEL DRAGÓN ENSAMBLADO Y OPERATIVO!";
    radarStatusText.style.color = "#ffcc00";
  } else {
    // Cuando falta algún componente
    radarVisual.className = "radar-box radar-incompleto";
    radarDot.style.display = "none";
    radarStatusText.innerHTML = "⚠️ Estado: Faltan componentes";
    radarStatusText.style.color = "#888";
  }
}
// ==========================================
// RADAR DEL DRAGÓN: SONIDO Y ESCÁNER EN VIVO
// ==========================================
let radarActivo = false;
let animIdRadar = null;
let anguloEscaneo = 0;

// Efecto de sonido del Bip del Radar
function sonarBipRadar() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine'; // Tono puro y agudo tipo radar
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  } catch (e) {
    console.log("Audio no soportado");
  }
}

function toggleRadarDragon(event) {
  if (event) event.preventDefault();
  
  // Emite el sonido al pulsar el botón
  sonarBipRadar();

  const statusText = document.getElementById('radarStatusText');
  radarActivo = !radarActivo;

  if (radarActivo) {
    statusText.innerHTML = "🟢 RASTREANDO ESFERAS DEL DRAGÓN...";
    statusText.style.color = "#00ff66";
    if (!animIdRadar) animarEscaneoRadar();
  } else {
    statusText.innerHTML = "🔴 RADAR APAGADO (Presiona el botón superior)";
    statusText.style.color = "#ff3300";
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

  // Coordenadas relativas de las 7 Esferas
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
    // Fondo oscuro de cuadrícula
    ctx.fillStyle = '#001a08';
    ctx.fillRect(0, 0, w, h);

    // Retícula verde
    ctx.strokeStyle = 'rgba(0, 255, 102, 0.25)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 25) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 25) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Círculos concéntricos
    ctx.strokeStyle = 'rgba(0, 255, 102, 0.4)';
    ctx.lineWidth = 2;
    [r * 0.35, r * 0.7, r * 0.95].forEach(radius => {
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke();
    });

    // Haz de barrido giratorio
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

    // Dibujar los 7 puntos parpadeantes (Esferas)
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

  // Obtener las voces disponibles en el sistema/navegador
  const voces = window.speechSynthesis.getVoices();
  const mensaje = new SpeechSynthesisUtterance('¡Bienvenido de nuevo!');

  // Buscar una voz en español
  const vozEspanol = voces.find(v => v.lang.startsWith('es'));
  if (vozEspanol) {
    mensaje.voice = vozEspanol;
  }

  mensaje.lang = 'es-ES';
  mensaje.rate = 0.9;  // Velocidad ligeramente moderada para que se entienda claro
  mensaje.pitch = 1.0; // Tono natural

  mensaje.onend = () => { bienvenidaSonada = true; };
  mensaje.onerror = () => { bienvenidaSonada = true; };

  window.speechSynthesis.cancel(); // Limpia peticiones atascadas
  window.speechSynthesis.speak(mensaje);
  bienvenidaSonada = true;
}

// Cargar voces si el navegador las tiene pendientes
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

// Disparar en la primera interacción (clic o toque en la pantalla)
const activarVozAlClic = () => {
  decirBienvenida();
  window.removeEventListener('click', activarVozAlClic);
  window.removeEventListener('touchstart', activarVozAlClic);
};
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

  // Configuración del dragón
  const numSegmentos = 35;
  const tamSegmento = 12;
  const segmentos = [];

  // Posición inicial en la pantalla
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

    // Movimiento ondulante de la cabeza por la pantalla
    angulo += Math.sin(tiempo * 0.8) * 0.03;
    const velocidad = 3.5;

    posX += Math.cos(angulo) * velocidad + Math.sin(tiempo * 0.5) * 1.5;
    posY += Math.sin(angulo) * velocidad + Math.cos(tiempo * 0.7) * 1.5;

    // Rebotar en los bordes suavemente
    const margen = 100;
    if (posX < -margen) posX = canvas.width + margen;
    if (posX > canvas.width + margen) posX = -margen;
    if (posY < -margen) posY = canvas.height + margen;
    if (posY > canvas.height + margen) posY = -margen;

    // Actualizar cuerpo (cada segmento sigue al anterior)
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

    // 1. Dibujar el Aura de Ki alrededor de Shenlong
    ctx.save();
    ctx.shadowColor = '#00ff66';
    ctx.shadowBlur = 15;

    // 2. Dibujar el Cuerpo de Shenlong
    for (let i = numSegmentos - 1; i >= 0; i--) {
      const seg = segmentos[i];
      const radio = (1 - i / numSegmentos) * 14 + 4; // Se estrecha hacia la cola

      ctx.beginPath();
      ctx.arc(seg.x, seg.y, radio, 0, Math.PI * 2);

      // Degradado verde esmeralda místico
      const grad = ctx.createRadialGradient(seg.x, seg.y, 2, seg.x, seg.y, radio);
      grad.addColorStop(0, '#00ff66');
      grad.addColorStop(0.6, '#008833');
      grad.addColorStop(1, '#003311');

      ctx.fillStyle = grad;
      ctx.fill();
    }

    // 3. Dibujar la Cabeza, Ojos y Bigotes de Shenlong
    const cabeza = segmentos[0];
    const cuello = segmentos[1];
    const dirAngulo = Math.atan2(cabeza.y - cuello.y, cabeza.x - cuello.x);

    ctx.save();
    ctx.translate(cabeza.x, cabeza.y);
    ctx.rotate(dirAngulo);

    // Ojos rojos brillantes
    ctx.fillStyle = '#ff0000';
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.arc(6, -6, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(6, 6, 3, 0, Math.PI * 2); ctx.fill();

    // Cuernos dorados
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-2, -8); ctx.lineTo(-12, -18); ctx.lineTo(-18, -14);
    ctx.moveTo(-2, 8); ctx.lineTo(-12, 18); ctx.lineTo(-18, 14);
    ctx.stroke();

    // Bigotes flotantes de dragón
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

// Activar la animación al cargar la página
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

  // Iluminación
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0x00e5ff, 1.2);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  // Grupo principal del personaje
  const saiyanGroup = new THREE.Group();

  // Material holográfico verde / neón estilo scouter
  const saiyanMaterial = new THREE.MeshPhongMaterial({
    color: 0x00ff88,
    wireframe: true,
    emissive: 0x004422,
    shininess: 100
  });

  // Cabeza
  const headGeo = new THREE.SphereGeometry(0.35, 16, 16);
  const head = new THREE.Mesh(headGeo, saiyanMaterial);
  head.position.y = 1.2;
  saiyanGroup.add(head);

  // Cabello Puntiagudo Saiyan
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

  // Torso
  const torsoGeo = new THREE.CylinderGeometry(0.4, 0.25, 0.8, 12);
  const torso = new THREE.Mesh(torsoGeo, saiyanMaterial);
  torso.position.y = 0.5;
  saiyanGroup.add(torso);

  // Extremidades (Brazos y Piernas)
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

  // Aura de Ki giratoria alrededor del personaje
  const auraGeo = new THREE.TorusGeometry(1.2, 0.02, 16, 50);
  const auraMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true });
  const auraRing = new THREE.Mesh(auraGeo, auraMat);
  auraRing.rotation.x = Math.PI / 2;
  saiyanGroup.add(auraRing);

  scene.add(saiyanGroup);

  // Animación continua de rotación
  function animate() {
    requestAnimationFrame(animate);
    saiyanGroup.rotation.y += 0.015; // Hace girar al personaje en su propio eje
    auraRing.rotation.z -= 0.03;
    renderer.render(scene, camera);
  }

  animate();
}

window.addEventListener('DOMContentLoaded', crearModelo3DSaiyan);
// ==========================================
// LÓGICA DEL CHATBOT INTERACTIVO
// ==========================================
function toggleChatbot() {
  const container = document.getElementById('chatbot-container');
  container.classList.toggle('chatbot-oculto');
}

function detectarEnter(e) {
  if (e.key === 'Enter') enviarMensajeChatbot();
}

function enviarMensajeChatbot() {
  const input = document.getElementById('chatbot-input');
  const texto = input.value.trim().toLowerCase();
  if (!texto) return;

  // Agregar mensaje del usuario
  agregarMensaje(input.value, 'user-message');
  input.value = '';

  // Generar respuesta de la IA
  setTimeout(() => {
    let respuesta = "No comprendo esa consulta. Escribe 'ayuda' para ver qué puedo hacer.";

    if (texto.includes('hola') || texto.includes('buenas')) {
      respuesta = "¡Hola! Soy la IA de Capsule Corp. ¿En qué te puedo colaborar sobre Miguel Paspuel?";
    } else if (texto.includes('quien es') || texto.includes('miguel') || texto.includes('nombre')) {
      respuesta = "Miguel Paspuel es un estudiante de Ciberseguridad en el TESA apasionado por la seguridad informática y el desarrollo web.";
    } else if (texto.includes('tesa') || texto.includes('estudios') || texto.includes('carrera')) {
      respuesta = "Miguel cursa la carrera de Ciberseguridad en el Tecnológico San Antonio (TESA).";
    } else if (texto.includes('habilidades') || texto.includes('skills') || texto.includes('que sabe')) {
      respuesta = "Habilidades principales: HTML5, CSS3, JavaScript, Pentesting, Redes y Protección de Datos.";
    } else if (texto.includes('ki') || texto.includes('poder') || texto.includes('saiyan')) {
      respuesta = "¡El nivel de Ki de Miguel supera los 9000! Usa el botón Super Saiyan en la parte superior para activarlo.";
    } else if (texto.includes('ayuda') || texto.includes('comandos')) {
      respuesta = "Puedes preguntarme sobre: 'Miguel', 'TESA', 'Habilidades', 'Ki' o 'Contacto'.";
    } else if (texto.includes('contacto') || texto.includes('correo') || texto.includes('email')) {
      respuesta = "Puedes contactar a Miguel a través de sus redes o la sección de contacto al final de esta página.";
    }

    agregarMensaje(respuesta, 'bot-message');
  }, 400);
}

function agregarMensaje(texto, clase) {
  const body = document.getElementById('chatbot-messages');
  const msg = document.createElement('div');
  msg.className = `message ${clase}`;
  msg.innerText = texto;
  body.appendChild(msg);
  body.scrollTop = body.scrollHeight;
}
