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
