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

window.addEventListener('click', activarVozAlClic);
window.addEventListener('touchstart', activarVozAlClic);
// ==========================================
// ARCHIVOS C++ DE CAPSULE CORP / TESA
// ==========================================
const archivosCpp = {
  escaneo: `<span class="cpp-comment">// ============================================</span>
<span class="cpp-comment">// CAPSULE CORP - SISTEMA DE RASTREO DE KI</span>
<span class="cpp-comment">// Desarrollado por: Miguel Paspuel (TESA)</span>
<span class="cpp-comment">// ============================================</span>
<span class="cpp-include">#include &lt;iostream&gt;</span>
<span class="cpp-include">#include &lt;string&gt;</span>

<span class="cpp-keyword">using namespace</span> std;

<span class="cpp-keyword">int</span> <span class="cpp-func">main</span>() {
    <span class="cpp-keyword">int</span> nivelKi = <span class="cpp-number">9001</span>;
    string guerrero = <span class="cpp-string">"Miguel Paspuel"</span>;

    cout &lt;&lt; <span class="cpp-string">"🔍 Escaneando objetivo: "</span> &lt;&lt; guerrero &lt;&lt; endl;
    
    <span class="cpp-keyword">if</span> (nivelKi &gt; <span class="cpp-number">9000</span>) {
        cout &lt;&lt; <span class="cpp-string">"⚡ ¡ALERTA! ¡EL NIVEL DE KI ES MAS DE 9000!"</span> &lt;&lt; endl;
        cout &lt;&lt; <span class="cpp-string">"🛡️ Estado TESA: Ciberseguridad Activa."</span> &lt;&lt; endl;
    } <span class="cpp-keyword">else</span> {
        cout &lt;&lt; <span class="cpp-string">"🟢 Nivel de poder normal."</span> &lt;&lt; endl;
    }

    <span class="cpp-keyword">return</span> <span class="cpp-number">0</span>;
}`,

  firewall: `<span class="cpp-comment">// ============================================</span>
<span class="cpp-comment">// CAPSULE CORP - FIREWALL DE DEFENSA CIBERNÉTICA</span>
<span class="cpp-comment">// Especialista: Miguel Paspuel @ TESA</span>
<span class="cpp-comment">// ============================================</span>
<span class="cpp-include">#include &lt;iostream&gt;</span>

<span class="cpp-keyword">using namespace</span> std;

<span class="cpp-keyword">void</span> <span class="cpp-func">bloquearAtaque</span>(string ipOrigen) {
    cout &lt;&lt; <span class="cpp-string">"🛡️ [FIREWALL TESA] Intrusión detectada desde: "</span> &lt;&lt; ipOrigen &lt;&lt; endl;
    cout &lt;&lt; <span class="cpp-string">"⚡ Desplegando Escudo de Ki... IP Bloqueada."</span> &lt;&lt; endl;
}

<span class="cpp-keyword">int</span> <span class="cpp-func">main</span>() {
    bool amenazaDetectada = <span class="cpp-keyword">true</span>;
    
    <span class="cpp-keyword">if</span> (amenazaDetectada) {
        <span class="cpp-func">bloquearAtaque</span>(<span class="cpp-string">"192.168.1.666"</span>);
    }
    
    cout &lt;&lt; <span class="cpp-string">"✅ Servidores de Capsule Corp 100% Seguros."</span> &lt;&lt; endl;
    <span class="cpp-keyword">return</span> <span class="cpp-number">0</span>;
}`
};

function cambiarArchivoCpp(nombre) {
  const display = document.getElementById('cppCodeDisplay');
  const tabs = document.querySelectorAll('.tab-btn');

  tabs.forEach(tab => tab.classList.remove('active'));

  if (nombre === 'escaneo') {
    display.innerHTML = archivosCpp.escaneo;
    tabs[0].classList.add('active');
  } else if (nombre === 'firewall') {
    display.innerHTML = archivosCpp.firewall;
    tabs[1].classList.add('active');
  }
}

// Cargar el archivo por defecto al iniciar
window.addEventListener('DOMContentLoaded', () => {
  cambiarArchivoCpp('escaneo');
});
