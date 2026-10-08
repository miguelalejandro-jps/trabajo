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
