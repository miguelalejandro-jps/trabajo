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
