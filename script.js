// ==========================================
// CHATBOT INTERACTIVO CAPSULE CORP (INTELIGENTE LOCAL)
// ==========================================

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

function obtenerRespuestaInteligente(textoOriginal) {
  const texto = normalizarTexto(textoOriginal);

  const respuestas = {
    saludo: [
      'hola', 'buenas', 'buenos', 'saludos', 'hey', 'hi', 'buen dia', 'buenas tardes', 'buenas noches'
    ],
    identidad: ['quien es', 'quién es', 'quien eres', 'quién eres', 'miguel', 'paspuel', 'sobre ti'],
    estudio: ['tesa', 'carrera', 'universidad', 'estudia', 'estudiante', 'ciberseguridad'],
    habilidades: ['habilidades', 'skills', 'que sabes', 'que dominas', 'tecnologias', 'tecnología', 'que sabes hacer'],
    proyectos: ['proyectos', 'trabajos', 'portafolio', 'misiones', 'github'],
    dragonball: ['dragon ball', 'goku', 'saiyan', 'ki', 'super saiyan', 'esferas del dragón'],
    contacto: ['contacto', 'correo', 'email', 'redes', 'mensaje'],
    ayuda: ['ayuda', 'comandos', 'menu', 'info', 'qué puedes hacer', 'que puedes hacer'],
    agradecimiento: ['gracias', 'thank you', 'mil gracias'],
    tecnologia: ['html', 'css', 'javascript', 'frontend', 'web', 'desarrollo'],
    redes: ['redes', 'network', 'analisis', 'análisis', 'pentesting', 'seguridad']
  };

  const coincide = (lista) => lista.some(palabra => texto.includes(palabra));

  if (coincide(respuestas.saludo)) {
    return '¡Saludos! Soy la IA de Capsule Corp y estoy aquí para ayudarte a conocer mejor a Miguel Paspuel y su portafolio.';
  }

  if (coincide(respuestas.identidad)) {
    return `${perfilMiguel.nombre} es ${perfilMiguel.titulo}. Se enfoca en ${perfilMiguel.especialidad} y trabaja con tecnologías web y seguridad digital.';
  }

  if (coincide(respuestas.estudio)) {
    return `Miguel estudia ${perfilMiguel.especialidad} en ${perfilMiguel.institucion}. Su enfoque principal es la seguridad informática, análisis de vulnerabilidades y protección de datos.`;
  }

  if (coincide(respuestas.habilidades)) {
    return `Miguel domina: ${perfilMiguel.habilidades.join(', ')}. Además, tiene interés en proyectos web interactivos con diseño moderno y experiencia visual.`;
  }

  if (coincide(respuestas.proyectos)) {
    return `Entre sus proyectos destacan: ${perfilMiguel.proyectos.join(', ')}. También tiene un portafolio desarrollado con GitHub Pages y una estética inspirada en Dragon Ball.`;
  }

  if (coincide(respuestas.dragonball)) {
    return '¡Perfecto! Miguel tiene una fuerte identidad visual inspirada en Dragon Ball, con enfoque en energía, estética de combate y un estilo tecnológico tipo Capsule Corp. Su portafolio combina seguridad y diseño con un toque saiyan.';
  }

  if (coincide(respuestas.contacto)) {
    return `Puedes contactar a Miguel a través de la sección de contacto del portafolio. También es posible enviar mensaje por redes sociales o canales disponibles en la página.`;
  }

  if (coincide(respuestas.ayuda)) {
    return 'Puedo ayudarte con estas preguntas: quién es Miguel, qué estudia, qué habilidades tiene, qué proyectos desarrolla, cómo contactarlo o qué hace este portafolio.';
  }

  if (coincide(respuestas.tecnologia)) {
    return 'Miguel trabaja con HTML5, CSS3 y JavaScript para crear interfaces interactivas. También explora visualización, animaciones y experiencia de usuario en proyectos web.';
  }

  if (coincide(respuestas.redes)) {
    return 'Su interés en redes y seguridad incluye pentesting, análisis de vulnerabilidades, protección de sistemas y fortalecimiento de entornos digitales.';
  }

  if (coincide(respuestas.agradecimiento)) {
    return '¡Con gusto! Estoy aquí para ayudarte a conocer mejor el portafolio de Miguel.';
  }

  if (texto.includes('como') || texto.includes('cómo')) {
    return 'Puedes preguntarme por Miguel, TESA, ciberseguridad, habilidades, proyectos o contacto. También puedo explicarte qué hace este sitio web.';
  }

  if (texto.includes('portafolio') || texto.includes('sitio') || texto.includes('pagina') || texto.includes('página')) {
    return 'Este portafolio es una mezcla entre diseño web moderno, animaciones y temática de Dragon Ball, con una identidad tecnológica inspirada en Capsule Corp.';
  }

  if (texto.includes('seguridad') || texto.includes('vulnerabilidad') || texto.includes('analisis') || texto.includes('análisis')) {
    return 'La seguridad informática se centra en proteger datos, sistemas y redes ante amenazas, vulnerabilidades y accesos no autorizados. Miguel se interesa por ese enfoque profesional.';
  }

  const palabrasClave = texto.split(' ').filter(p => p.length > 3);
  if (palabrasClave.length > 0) {
    return `Puedo ayudarte con información sobre ${perfilMiguel.nombre}, ${perfilMiguel.institucion}, ciberseguridad, proyectos y tecnologías web. ¿Quieres saber algo concreto?`;
  }

  return 'No tengo esa información exacta, pero puedo hablarte sobre Miguel, TESA, ciberseguridad, proyectos y tecnologías web. Prueba preguntando: “¿Quién es Miguel?”, “¿Qué estudia?”, o “¿Qué habilidades tiene?”';
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

function mostrarIndicadorEscribiendo() {
  const body = document.getElementById('chatbot-messages');
  if (!body) return;

  const indicador = document.createElement('div');
  indicador.className = 'message bot-message typing';
  indicador.innerHTML = '<span>.</span><span>.</span><span>.</span>';
  indicador.id = 'typing-indicator';
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

function enviarMensajeChatbot() {
  const input = document.getElementById('chatbot-input');
  if (!input) return;

  const texto = input.value.trim();
  if (!texto) return;

  agregarMensaje(texto, 'user-message');
  input.value = '';

  mostrarIndicadorEscribiendo();

  setTimeout(() => {
    quitarIndicadorEscribiendo();
    const respuesta = obtenerRespuestaInteligente(texto);
    agregarMensaje(respuesta, 'bot-message');
  }, 500);
}

// ==========================================
// Chatbot compatibility with existing HTML buttons
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('chatbot-input');
  if (input) {
    input.placeholder = 'Escribe tu pregunta o escribe “ayuda”...';
  }
});
