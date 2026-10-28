// -------------------- ACCESO SIMULADO --------------------
const loginScreen = document.getElementById('loginScreen');
const appContainer = document.querySelector('.app-container');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const themeToggle = document.getElementById('themeToggle');
const loginThemeToggle = document.getElementById('loginThemeToggle');
const notificationBtn = document.getElementById('notificationBtn');
const notificationPanel = document.getElementById('notificationPanel');
if (document.getElementById('loginUser')) document.getElementById('loginUser').value = '';
if (document.getElementById('loginPassword')) document.getElementById('loginPassword').value = '';
const demoPassword = '123456';
const perfiles = {
  coordinador: { nombre: 'María Rodríguez', rol: 'Coordinación', permisos: 'gestion' },
  instructor: { nombre: 'Carlos Mendoza', rol: 'Instructor', permisos: 'consulta' },
  estudiante: { nombre: 'Laura Gómez', rol: 'Estudiante', permisos: 'estudiante' },
  admin: { nombre: 'Administrador del sistema', rol: 'Administración', permisos: 'gestion' }
};
if (localStorage.getItem('nexoTema') !== 'claro') document.body.classList.add('dark-mode');
if (document.body.classList.contains('dark-mode') && themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
if (document.body.classList.contains('dark-mode') && loginThemeToggle) loginThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
function cambiarTema() {
  document.body.classList.toggle('dark-mode');
  const oscuro = document.body.classList.contains('dark-mode');
  localStorage.setItem('nexoTema', oscuro ? 'oscuro' : 'claro');
  const icon = `<i class="fas fa-${oscuro ? 'sun' : 'moon'}"></i>`;
  if (themeToggle) themeToggle.innerHTML = icon;
  if (loginThemeToggle) loginThemeToggle.innerHTML = icon;
}
themeToggle?.addEventListener('click', cambiarTema);
loginThemeToggle?.addEventListener('click', cambiarTema);
let usuarios = [
  { usuario: 'admin', nombre: 'Administrador del sistema', perfil: 'admin', activo: true },
  { usuario: 'coordinador', nombre: 'María Rodríguez', perfil: 'coordinador', activo: true },
  { usuario: 'instructor', nombre: 'Carlos Mendoza', perfil: 'instructor', activo: true },
  { usuario: 'estudiante', nombre: 'Laura Gómez', perfil: 'estudiante', activo: true }
];
let aprendices = [];
const eventosDemo = [
  { dia: 3, titulo: 'Inicio de ficha 2700003', tipo: 'class' },
  { dia: 8, titulo: 'Reunión de instructores', tipo: 'meeting' },
  { dia: 14, titulo: 'Evaluación de competencias', tipo: 'exam' },
  { dia: 21, titulo: 'Entrega de evidencias', tipo: 'class' },
  { dia: 28, titulo: 'Cierre de actividades', tipo: 'meeting' }
];

document.querySelectorAll('.profile-choice').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('loginUser').value = button.dataset.user;
    document.getElementById('loginPassword').value = demoPassword;
    document.getElementById('loginForm').requestSubmit();
  });
});

function aplicarPerfil(perfil) {
  document.getElementById('sessionName').textContent = perfil.nombre;
  document.getElementById('sessionRole').textContent = perfil.rol;
  document.getElementById('sessionWelcome').textContent = `Sesión activa · ${perfil.rol}`;
  const perfilActivo = Object.keys(perfiles).find(usuario => perfiles[usuario] === perfil);
  document.body.classList.remove('theme-admin', 'theme-instructor', 'theme-estudiante', 'theme-coordinador');
  document.body.classList.add(`theme-${perfilActivo}`);
  renderDashboard();
  renderNotificaciones(perfilActivo);
  if (perfil.permisos !== 'gestion') document.querySelectorAll('.btn-primary, .icon-btn, #btnAsignar').forEach(el => el.classList.add('role-restricted'));
  if (perfil.permisos === 'estudiante') {
    ['instructores', 'competencias', 'asignaciones'].forEach(tab => document.querySelector(`[data-tab="${tab}"]`)?.classList.add('role-restricted'));
    document.querySelector('[data-tab="fichas"]')?.click();
  }
}

function renderNotificaciones(perfil) {
  const list = document.getElementById('notificationList');
  const count = document.getElementById('notificationCount');
  if (!list || !count) return;
  const mensajes = {
    admin: [['fa-user-plus', 'Usuarios demo disponibles', 'Revisa la gestión de usuarios.'], ['fa-database', 'Datos locales activos', 'La información se guarda en este navegador.']],
    coordinador: [['fa-folder-open', '12 rutas formativas activas', 'Hay fichas disponibles para seguimiento.'], ['fa-user-graduate', 'Aprendices registrados', `${aprendices.length} aprendices en el sistema.`]],
    instructor: [['fa-chalkboard-user', 'Espacio académico actualizado', 'Consulta tus competencias y fichas.'], ['fa-award', 'Competencias asignadas', 'Revisa tus competencias vinculadas.']],
    estudiante: [['fa-route', 'Ruta de aprendizaje disponible', 'Consulta el avance de tu formación.'], ['fa-calendar', 'Revisa tus fechas', 'Verifica el inicio y cierre de tu ficha.']]
  };
  const items = mensajes[perfil] || mensajes.admin;
  count.textContent = items.length;
  list.innerHTML = items.map(item => `<div class="notification-item"><i class="fas ${item[0]}"></i><span>${item[1]}<small>${item[2]}</small></span></div>`).join('');
}

notificationBtn?.addEventListener('click', () => notificationPanel?.classList.toggle('open'));

function mostrarAplicacion() {
  loginScreen.style.display = 'none';
  appContainer.classList.remove('is-locked');
}

const perfilGuardado = sessionStorage.getItem('nexoPerfil');
if (sessionStorage.getItem('nexoSesion') === 'activa' && perfilGuardado) { mostrarAplicacion(); aplicarPerfil(perfiles[perfilGuardado]); }

loginForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const password = document.getElementById('loginPassword').value;
  const usuarioEncontrado = usuarios.find(item => item.usuario === user && item.activo);
  if (usuarioEncontrado && password === demoPassword) {
    sessionStorage.setItem('nexoSesion', 'activa');
    sessionStorage.setItem('nexoPerfil', user);
    loginError.textContent = '';
    mostrarAplicacion();
    aplicarPerfil(perfiles[user] || { nombre: usuarioEncontrado.nombre, rol: usuarioEncontrado.perfil, permisos: 'consulta' });
  } else {
    loginError.textContent = 'Usuario o contraseña incorrectos.';
  }
});

document.getElementById('logoutBtn')?.addEventListener('click', () => {
  sessionStorage.clear();
  window.location.reload();
});

// -------------------- DATA MOCK (estructura conforme a DDL) --------------------

// Definición de los cargos disponibles en el sistema
const cargos = [
  { id_cargo: 1, nom_cargo: "Instructor" },
  { id_cargo: 2, nom_cargo: "Coordinador" },
  { id_cargo: 3, nom_cargo: "Líder de Área" }
];

// Definición de los programas disponibles para las fichas
let programas = [
  { id_programa_titul: 101, nom_programa_titul: "Técnico en Software", tip_programa_titul: "Tn" },
  { id_programa_titul: 102, nom_programa_titul: "Tecnólogo en Redes", tip_programa_titul: "To" },
  { id_programa_titul: 103, nom_programa_titul: "Tecnólogo en Análisis y Desarrollo de Software", tip_programa_titul: "To" }
];

// Definición de los ambientes físicos para las fichas
let ambientes = [
  { id_ambiente: 1, nom_ambiente: "Lab TI 101" },
  { id_ambiente: 2, nom_ambiente: "Aula Empresarial" },
  { id_ambiente: 3, nom_ambiente: "Centro de Simulación" }
];

// Tablas principales
let instructores = [];
let competencias = [];
let instructorCompetencias = [];
let fichasTituladas = [];

// -------------------- FUNCIONES DE PERSISTENCIA (con cifrado) --------------------
const SECRET_KEY = "sapfpi_secure_key_2026";

function encriptar(texto) {
  const textoCodificado = unescape(encodeURIComponent(texto));
  let encriptado = '';
  for (let i = 0; i < textoCodificado.length; i++) {
    encriptado += String.fromCharCode(textoCodificado.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length));
  }
  return btoa(encriptado);
}

function desencriptar(textoBase64) {
  const texto = atob(textoBase64);
  let desencriptado = '';
  for (let i = 0; i < texto.length; i++) {
    desencriptado += String.fromCharCode(texto.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length));
  }
  return decodeURIComponent(escape(desencriptado));
}

function guardarDatos() {
  const data = {
    instructores,
    competencias,
    instructorCompetencias,
    fichasTituladas,
    programas,
    ambientes
    ,usuarios, aprendices
  };
  const jsonStr = JSON.stringify(data);
  const dataCifrada = encriptar(jsonStr);
  localStorage.setItem("sapfpiDB", dataCifrada);
  mostrarInformacionAlmacenamiento('guardados');
}

// Muestra en la consola la información almacenada para facilitar la revisión
// del funcionamiento de localStorage durante la demostración del proyecto.
function mostrarInformacionAlmacenamiento(accion = 'cargados') {
  const registro = localStorage.getItem('sapfpiDB');
  const datosTema = localStorage.getItem('nexoTema');

  console.group(`[localStorage] Datos ${accion}`);
  console.info('Clave principal:', 'sapfpiDB');
  console.info('Existe información:', Boolean(registro));
  console.info('Tamaño almacenado:', registro ? `${registro.length} caracteres` : '0 caracteres');
  console.info('Tema guardado:', datosTema || 'claro');
  console.table({
    usuarios: usuarios.length,
    instructores: instructores.length,
    aprendices: aprendices.length,
    competencias: competencias.length,
    asignaciones: instructorCompetencias.length,
    fichas: fichasTituladas.length,
    programas: programas.length,
    ambientes: ambientes.length
  });
  console.info('Nota: sapfpiDB está cifrado antes de guardarse en el navegador.');
  console.groupEnd();
}

function cargarDatosIniciales() {
  const stored = localStorage.getItem("sapfpiDB");
  if (stored) {
    try {
      let decryptedStr = stored;
      try {
        // Intentar descifrar los datos
        decryptedStr = desencriptar(stored);
      } catch (e) {
        console.warn("Los datos no están cifrados o la clave es incorrecta, se intentará leer como texto plano.");
      }

      const parsed = JSON.parse(decryptedStr);
      instructores = parsed.instructores || [];
      competencias = parsed.competencias || [];
      instructorCompetencias = parsed.instructorCompetencias || [];
      fichasTituladas = parsed.fichasTituladas || [];
      programas = parsed.programas || programas;
      ambientes = parsed.ambientes || ambientes;
      usuarios = parsed.usuarios || usuarios;
      aprendices = parsed.aprendices || aprendices;
      if (!parsed.aprendices) {
        aprendices = Array.from({ length: 24 }, (_, index) => ({ documento: `100${String(1000000 + index * 17391).slice(0, 7)}`, nombre: `Aprendiz Demo ${index + 1}`, correo: `aprendiz${index + 1}@aprendiz.edu.co`, ficha: 2700001 + (index % 12), activo: true }));
      }
      // Si solo existe la primera semilla pequeña, regenerar el conjunto demo ampliado.
      if (instructores.length <= 3 && competencias.length <= 3 && fichasTituladas.length <= 2) {
        localStorage.removeItem("sapfpiDB");
        window.location.reload();
        return;
      }
      mostrarInformacionAlmacenamiento('cargados');
      return;
    } catch (e) {
      console.error("Error al parsear localStorage", e);
      localStorage.removeItem("sapfpiDB");
    }
  }

  // Datos semilla por defecto
  instructores = [
    { id_instruc: 1001, nom_instruc: "Ana", apelli_instruc: "García", tele_instruc: "3001234567", correo_instruc: "ana.garcia@sena.edu", id_cargo: 1, ind_planta: true, ind_lider_ficha: true, ind_estado: true, ind_disponib: true },
    { id_instruc: 1002, nom_instruc: "Carlos", apelli_instruc: "Mendoza", tele_instruc: "3109876543", correo_instruc: "carlos.m@sena.edu", id_cargo: 1, ind_planta: false, ind_lider_ficha: false, ind_estado: true, ind_disponib: true },
    { id_instruc: 1003, nom_instruc: "Laura", apelli_instruc: "Rojas", tele_instruc: "3204567890", correo_instruc: "laura.rojas@sena.edu", id_cargo: 1, ind_planta: true, ind_lider_ficha: true, ind_estado: true, ind_disponib: true }
  ];
  competencias = [
    { id_competen: 101, nom_competen: "Programación Básica", ind_tipo_competen: "Tn", val_duracion_competen: 48 },
    { id_competen: 102, nom_competen: "Bases de Datos", ind_tipo_competen: "Tn", val_duracion_competen: 40 },
    { id_competen: 103, nom_competen: "Ética y Valores", ind_tipo_competen: "Tr", val_duracion_competen: 16 }
  ];
  instructorCompetencias = [
    { id_instruc: 1001, id_competen: 101 },
    { id_instruc: 1002, id_competen: 102 },
    { id_instruc: 1001, id_competen: 103 }
  ];
  fichasTituladas = [
    { id_ficha: 2700001, id_programa_titul: 101, ind_jornada: "M", id_instruc_lider: 1001, id_ambiente: 1, fec_ini: "2025-02-10", fec_fin: "2025-11-30", ind_modalidad: "P", fec_ini_etapa_produc: "2025-09-01", ind_etapa_produc: false },
    { id_ficha: 2700002, id_programa_titul: 102, ind_jornada: "T", id_instruc_lider: 1003, id_ambiente: 2, fec_ini: "2025-03-01", fec_fin: "2025-12-15", ind_modalidad: "P", fec_ini_etapa_produc: "2025-10-01", ind_etapa_produc: false }
  ];
  const aprendicesNombres = ['Juan Pérez', 'Sofía Martínez', 'Mateo Rodríguez', 'Valentina Gómez', 'Samuel Torres', 'Isabella Rojas', 'Nicolás Castro', 'Mariana Vargas', 'Tomás Herrera', 'Gabriela Moreno', 'Daniel López', 'Sara Ramírez', 'Alejandro Ruiz', 'Laura Quintero', 'David Salazar', 'Manuela Cárdenas', 'Sebastián Medina', 'Paula Navarro', 'Andrés León', 'Camila Ortega', 'Miguel Duarte', 'Daniela Arias', 'Julián Pardo', 'Ana Beltrán'];
  aprendices = aprendicesNombres.map((nombre, index) => ({
    documento: `100${String(1000000 + index * 17391).slice(0, 7)}`,
    nombre, correo: `${nombre.toLowerCase().replace(/ /g, '.')}@aprendiz.edu.co`,
    ficha: 2700001 + (index % 12), activo: index % 7 !== 0
  }));

  // Datos semilla adicionales para probar la plataforma con volumen realista.
  const nombres = ['Sofía', 'Miguel', 'Valentina', 'Andrés', 'Camila', 'Julián', 'Daniela', 'Sebastián', 'Mariana', 'Nicolás', 'Paula', 'Mateo'];
  const apellidos = ['Torres', 'Ramírez', 'Vargas', 'Castro', 'Moreno', 'Pérez', 'Navarro', 'Hernández', 'Quintero', 'Gómez', 'Rincón', 'Salazar'];
  nombres.forEach((nombre, index) => {
    const id = 1004 + index;
    instructores.push({
      id_instruc: id, nom_instruc: nombre, apelli_instruc: apellidos[index],
      tele_instruc: `31${String(10000000 + index * 137291).slice(0, 8)}`,
      correo_instruc: `${nombre.toLowerCase()}.${apellidos[index].toLowerCase()}@nexo.edu.co`,
      id_cargo: index % 5 === 0 ? 2 : 1, ind_planta: index % 3 !== 0,
      ind_lider_ficha: index % 2 === 0, ind_estado: true, ind_disponib: true
    });
  });

  const competenciasDemo = ['Desarrollo web', 'Seguridad informática', 'Comunicación efectiva', 'Sistemas operativos', 'Diseño de interfaces', 'Gestión de proyectos', 'Matemáticas aplicadas', 'Inglés técnico', 'Redes LAN', 'Soporte técnico', 'Análisis de datos', 'Emprendimiento'];
  competenciasDemo.forEach((nombre, index) => competencias.push({
    id_competen: 104 + index, nom_competen: nombre,
    ind_tipo_competen: index % 3 === 0 ? 'Tr' : 'Tn', val_duracion_competen: 16 + (index % 5) * 8
  }));

  for (let index = 0; index < 12; index++) {
    instructorCompetencias.push({ id_instruc: 1004 + index, id_competen: 104 + (index % 12) });
  }

  for (let index = 0; index < 10; index++) {
    fichasTituladas.push({
      id_ficha: 2700003 + index, id_programa_titul: 101 + (index % 3),
      ind_jornada: ['M', 'T', 'N'][index % 3], id_instruc_lider: 1001 + (index % 10),
      id_ambiente: 1 + (index % 3), fec_ini: `2026-0${(index % 8) + 1}-10`,
      fec_fin: `2026- ${(index % 3) + 10}-20`.replace(' ', ''), ind_modalidad: 'P',
      fec_ini_etapa_produc: `2026-0${(index % 8) + 1}-10`, ind_etapa_produc: false
    });
  }
  guardarDatos();
}

// -------------------- FUNCIÓN PARA ESCAPAR HTML (XSS) --------------------
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function (m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function (c) {
    return c; // Deja los emojis como están
  });
}

// -------------------- RENDER PRINCIPAL --------------------
function renderAll() {
  renderDashboard();
  renderInstructores();
  renderCompetencias();
  renderAsignaciones();
  renderFichas();
  actualizarSelectsAsignacion();
  renderUsuarios();
  renderAprendices();
  renderCalendario();
}

function renderCalendario() {
  const grid = document.getElementById('calendarGrid');
  if (!grid) return;
  const nombres = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  grid.innerHTML = nombres.map(d => `<div class="calendar-day"><strong>${d}</strong></div>`).join('');
  for (let dia = 1; dia <= 31; dia++) {
    const event = eventosDemo.find(item => item.dia === dia);
    grid.innerHTML += `<div class="calendar-day"><strong>${dia}</strong>${event ? `<span class="calendar-event ${event.tipo}">${event.titulo}</span>` : ''}</div>`;
  }
}

function renderDashboard() {
  const values = { statAprendices: aprendices.length, statInstructores: instructores.length, statCompetencias: competencias.length, statFichas: fichasTituladas.length };
  Object.entries(values).forEach(([id, value]) => { const element = document.getElementById(id); if (element) element.textContent = value; });
  const perfilActivo = sessionStorage.getItem('nexoPerfil');
  const mensajes = {
    admin: ['CENTRO DE ADMINISTRACIÓN', 'Panel de administración', 'Control general de usuarios, datos y módulos académicos.'],
    coordinador: ['GESTIÓN ACADÉMICA', 'Panel de coordinación', 'Supervisa fichas, aprendices, instructores y competencias.'],
    instructor: ['ESPACIO DEL INSTRUCTOR', 'Mi espacio académico', 'Consulta tus fichas, competencias y aprendices asignados.'],
    estudiante: ['ESPACIO DEL APRENDIZ', 'Mi ruta de aprendizaje', 'Consulta tus fichas, progreso y competencias formativas.']
  };
  const mensaje = mensajes[perfilActivo] || mensajes.admin;
  const kicker = document.getElementById('dashboardKicker');
  const title = document.getElementById('dashboardTitle');
  const subtitle = document.getElementById('dashboardSubtitle');
  if (kicker) kicker.textContent = mensaje[0];
  if (title) title.textContent = mensaje[1];
  if (subtitle) subtitle.textContent = mensaje[2];
  document.querySelectorAll('[data-go]').forEach(button => button.onclick = () => document.querySelector(`[data-tab="${button.dataset.go}"]`)?.click());
}

function renderAprendices() {
  const tbody = document.getElementById('aprendicesTbody');
  if (!tbody) return;
  tbody.innerHTML = aprendices.map((a, index) => `<tr><td>${escapeHTML(a.documento)}</td><td>${escapeHTML(a.nombre)}</td><td>${escapeHTML(a.correo)}</td><td>${a.ficha || 'Sin ficha'}</td><td><span class="badge">${a.activo ? 'Activo' : 'Inactivo'}</span></td><td class="action-group"><button class="icon-btn edit" data-aprendiz="${index}"><i class="fas fa-edit"></i></button><button class="icon-btn delete" data-aprendiz="${index}"><i class="fas fa-power-off"></i></button></td></tr>`).join('');
  tbody.querySelectorAll('.edit').forEach(button => button.onclick = () => editarAprendiz(Number(button.dataset.aprendiz)));
  tbody.querySelectorAll('.delete').forEach(button => button.onclick = () => { aprendices[Number(button.dataset.aprendiz)].activo = !aprendices[Number(button.dataset.aprendiz)].activo; guardarDatos(); renderAprendices(); });
}

function editarAprendiz(index = null) {
  const actual = index === null ? {} : aprendices[index];
  const documento = prompt('Número de documento:', actual.documento || ''); if (!documento) return;
  const nombre = prompt('Nombre completo:', actual.nombre || ''); if (!nombre) return;
  const correo = prompt('Correo electrónico:', actual.correo || ''); if (!correo) return;
  const ficha = prompt('Número de ficha:', actual.ficha || '');
  const registro = { documento, nombre, correo, ficha, activo: actual.activo ?? true };
  if (index === null) aprendices.push(registro); else aprendices[index] = registro;
  guardarDatos(); renderAprendices(); renderDashboard();
}

function renderUsuarios() {
  const tbody = document.getElementById('usuariosTbody');
  if (!tbody) return;
  tbody.innerHTML = usuarios.map((u, index) => `<tr><td>${escapeHTML(u.usuario)}</td><td>${escapeHTML(u.nombre)}</td><td>${escapeHTML(u.perfil)}</td><td><span class="badge">${u.activo ? 'Activo' : 'Inactivo'}</span></td><td class="action-group"><button class="icon-btn edit" data-user-index="${index}"><i class="fas fa-edit"></i></button><button class="icon-btn delete" data-user-index="${index}"><i class="fas fa-power-off"></i></button></td></tr>`).join('');
  tbody.querySelectorAll('.edit').forEach(btn => btn.onclick = () => editarUsuario(Number(btn.dataset.userIndex)));
  tbody.querySelectorAll('.delete').forEach(btn => btn.onclick = () => { usuarios[Number(btn.dataset.userIndex)].activo = !usuarios[Number(btn.dataset.userIndex)].activo; guardarDatos(); renderUsuarios(); });
}

function editarUsuario(index = null) {
  const actual = index === null ? {} : usuarios[index];
  const usuario = prompt('Nombre de usuario:', actual.usuario || '');
  if (!usuario) return;
  const nombre = prompt('Nombre completo:', actual.nombre || '');
  if (!nombre) return;
  const perfil = prompt('Perfil (admin, coordinador, instructor o estudiante):', actual.perfil || 'instructor');
  if (!['admin', 'coordinador', 'instructor', 'estudiante'].includes(perfil)) return alert('Perfil no válido.');
  const registro = { usuario: usuario.toLowerCase().replace(/\s/g, ''), nombre, perfil, activo: actual.activo ?? true };
  if (index === null) usuarios.push(registro); else usuarios[index] = registro;
  guardarDatos(); renderUsuarios();
}

function getCargoNombre(id_cargo) {
  const c = cargos.find(c => c.id_cargo === id_cargo);
  return c ? c.nom_cargo : "Instructor";
}

// -------------------- INSTRUCTORES --------------------
function renderInstructores() {
  const tbody = document.getElementById('instructoresTbody');
  tbody.innerHTML = '';
  instructores.forEach(inst => {
    const row = tbody.insertRow();
    row.insertCell(0).innerText = inst.id_instruc;
    row.insertCell(1).innerText = `${inst.nom_instruc} ${inst.apelli_instruc}`;
    row.insertCell(2).innerText = inst.tele_instruc;
    row.insertCell(3).innerText = inst.correo_instruc;
    row.insertCell(4).innerText = getCargoNombre(inst.id_cargo);
    row.insertCell(5).innerHTML = inst.ind_planta ? '<span class="badge">Planta</span>' : '<span class="badge">Contrato</span>';
    row.insertCell(6).innerHTML = inst.ind_lider_ficha ? '<i class="fas fa-check-circle" style="color:green"></i>' : '<i class="fas fa-times-circle" style="color:gray"></i>';
    const accel = row.insertCell(7);
    accel.className = "action-group";
    accel.innerHTML = `<button class="icon-btn edit" data-id="${inst.id_instruc}" data-type="instructor"><i class="fas fa-edit"></i></button>
                       <button class="icon-btn delete" data-id="${inst.id_instruc}" data-type="instructor"><i class="fas fa-trash-alt"></i></button>`;
  });

  document.querySelectorAll('#instructoresTbody .icon-btn.edit').forEach(btn => {
    btn.removeEventListener('click', handleEditInstructor);
    btn.addEventListener('click', handleEditInstructor);
  });
  document.querySelectorAll('#instructoresTbody .icon-btn.delete').forEach(btn => {
    btn.removeEventListener('click', handleDeleteInstructor);
    btn.addEventListener('click', handleDeleteInstructor);
  });
}

function handleEditInstructor(e) {
  const id = parseInt(e.currentTarget.getAttribute('data-id'));
  const instructor = instructores.find(i => i.id_instruc === id);
  if (instructor) abrirModalInstructor(instructor);
}

function handleDeleteInstructor(e) {
  const id = parseInt(e.currentTarget.getAttribute('data-id'));
  if (confirm("Eliminar instructor también removerá asignaciones y lo dejará como líder de fichas (null).")) {
    instructores = instructores.filter(i => i.id_instruc !== id);
    instructorCompetencias = instructorCompetencias.filter(asig => asig.id_instruc !== id);
    fichasTituladas = fichasTituladas.map(f => f.id_instruc_lider === id ? { ...f, id_instruc_lider: null } : f);
    guardarDatos();
    renderAll();
  }
}

// Modal de instructor (con escape HTML)
function abrirModalInstructor(instructor = null) {
  const isEdit = instructor !== null;
  const modalDiv = document.createElement('div');
  modalDiv.className = 'modal-overlay';
  // Escapamos los valores para evitar XSS
  const idValue = isEdit ? instructor.id_instruc : '';
  const nomValue = isEdit ? escapeHTML(instructor.nom_instruc) : '';
  const apeValue = isEdit ? escapeHTML(instructor.apelli_instruc) : '';
  const telValue = isEdit ? escapeHTML(String(instructor.tele_instruc)) : '';
  const correoValue = isEdit ? escapeHTML(instructor.correo_instruc) : '';
  const checkedPlanta = isEdit && instructor.ind_planta ? 'checked' : '';
  const checkedLider = isEdit && instructor.ind_lider_ficha ? 'checked' : '';

  modalDiv.innerHTML = `
    <div class="modal-card">
      <h3>${isEdit ? 'Editar Instructor' : 'Nuevo Instructor'}</h3>
      <div class="form-group"><label>ID Instructor</label><input id="modalIdInst" type="number" value="${idValue}" ${isEdit ? 'readonly' : ''}></div>
      <div class="form-group"><label>Nombres</label><input id="modalNom" value="${nomValue}"></div>
      <div class="form-group"><label>Apellidos</label><input id="modalApe" value="${apeValue}"></div>
      <div class="form-group"><label>Teléfono</label><input id="modalTel" value="${telValue}"></div>
      <div class="form-group"><label>Correo</label><input id="modalCorreo" type="email" value="${correoValue}"></div>
      <div class="form-group"><label>Cargo</label><select id="modalCargo"><option value="">Seleccionar</option>${cargos.map(c => `<option value="${c.id_cargo}" ${isEdit && instructor.id_cargo == c.id_cargo ? 'selected' : ''}>${c.nom_cargo}</option>`).join('')}</select></div>
      <div class="form-group"><label><input type="checkbox" id="modalPlanta" ${checkedPlanta}> Instructor de planta</label></div>
      <div class="form-group"><label><input type="checkbox" id="modalLider" ${checkedLider}> Líder de ficha</label></div>
      <div class="flex-buttons"><button class="btn-secondary" id="modalCancel">Cancelar</button><button class="btn-primary" id="modalSave">Guardar</button></div>
    </div>
  `;
  document.body.appendChild(modalDiv);
  const cancelBtn = modalDiv.querySelector('#modalCancel');
  const saveBtn = modalDiv.querySelector('#modalSave');
  cancelBtn.onclick = () => modalDiv.remove();

  saveBtn.onclick = () => {
    const id = parseInt(modalDiv.querySelector('#modalIdInst').value);
    let nom = modalDiv.querySelector('#modalNom').value.trim();
    let ape = modalDiv.querySelector('#modalApe').value.trim();
    let tel = modalDiv.querySelector('#modalTel').value.trim();
    let correo = modalDiv.querySelector('#modalCorreo').value.trim();
    const idCargo = parseInt(modalDiv.querySelector('#modalCargo').value);
    const planta = modalDiv.querySelector('#modalPlanta').checked;
    const liderFicha = modalDiv.querySelector('#modalLider').checked;

    // Validaciones
    if (!nom || !ape || !correo || !id) { alert("Complete campos obligatorios (ID, nombres, apellidos, correo)."); return; }
    if (!/^\d+$/.test(tel)) { alert("Teléfono debe contener solo números."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) { alert("Correo electrónico no válido."); return; }
    if (id <= 0) { alert("ID debe ser un número positivo."); return; }
    if (!isEdit && instructores.some(i => i.id_instruc === id)) { alert("ID instructor ya existe."); return; }

    const nuevoInstructor = {
      id_instruc: id, nom_instruc: nom, apelli_instruc: ape, tele_instruc: tel,
      correo_instruc: correo, id_cargo: idCargo,
      ind_planta: planta, ind_lider_ficha: liderFicha, ind_estado: true, ind_disponib: true
    };
    if (isEdit) {
      const index = instructores.findIndex(i => i.id_instruc === id);
      if (index !== -1) instructores[index] = { ...nuevoInstructor };
    } else {
      instructores.push(nuevoInstructor);
    }
    guardarDatos();
    renderAll();
    modalDiv.remove();
  };
}

// -------------------- COMPETENCIAS --------------------
function renderCompetencias() {
  const tbody = document.getElementById('competenciasTbody');
  tbody.innerHTML = '';
  competencias.forEach(c => {
    const row = tbody.insertRow();
    row.insertCell(0).innerText = c.id_competen;
    row.insertCell(1).innerText = c.nom_competen;
    row.insertCell(2).innerHTML = c.ind_tipo_competen === 'Tn' ? 'Técnica' : 'Transversal';
    row.insertCell(3).innerText = c.val_duracion_competen;
    const accel = row.insertCell(4);
    accel.innerHTML = `<button class="icon-btn edit" data-id="${c.id_competen}" data-type="competen"><i class="fas fa-edit"></i></button>
                       <button class="icon-btn delete" data-id="${c.id_competen}" data-type="competen"><i class="fas fa-trash-alt"></i></button>`;
  });

  document.querySelectorAll('#competenciasTbody .icon-btn.edit').forEach(btn =>
    btn.addEventListener('click', e => {
      const id = parseInt(btn.dataset.id);
      const comp = competencias.find(c => c.id_competen === id);
      if (comp) abrirModalCompetencia(comp);
    })
  );
  document.querySelectorAll('#competenciasTbody .icon-btn.delete').forEach(btn =>
    btn.addEventListener('click', e => {
      if (confirm("Eliminar competencia? Se borran asignaciones asociadas")) {
        const id = parseInt(btn.dataset.id);
        competencias = competencias.filter(c => c.id_competen !== id);
        instructorCompetencias = instructorCompetencias.filter(a => a.id_competen !== id);
        guardarDatos();
        renderAll();
      }
    })
  );
}

function abrirModalCompetencia(comp = null) {
  const isEdit = !!comp;
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  const idValue = isEdit ? comp.id_competen : '';
  const nomValue = isEdit ? escapeHTML(comp.nom_competen) : '';
  const durValue = isEdit ? comp.val_duracion_competen : '';

  modal.innerHTML = `
    <div class="modal-card"><h3>${isEdit ? 'Editar Competencia' : 'Nueva Competencia'}</h3>
    <div class="form-group"><label>ID</label><input id="compId" type="number" value="${idValue}" ${isEdit ? 'readonly' : ''}></div>
    <div class="form-group"><label>Nombre</label><input id="compNom" value="${nomValue}"></div>
    <div class="form-group"><label>Tipo</label>
      <select id="compTipo">
        <option value="">Seleccionar</option>
        <option value="Tn" ${isEdit && comp.ind_tipo_competen == 'Tn' ? 'selected' : ''}>Técnica (Tn)</option>
        <option value="Tr" ${isEdit && comp.ind_tipo_competen == 'Tr' ? 'selected' : ''}>Transversal (Tr)</option>
      </select>
    </div>
    <div class="form-group"><label>Duración (hrs)</label><input id="compDur" type="number" value="${durValue}"></div>
    <div class="flex-buttons"><button class="btn-secondary" id="cancelComp">Cancelar</button><button class="btn-primary" id="saveComp">Guardar</button></div>
    </div>`;
  document.body.appendChild(modal);
  modal.querySelector('#cancelComp').onclick = () => modal.remove();

  modal.querySelector('#saveComp').onclick = () => {
    const id = parseInt(modal.querySelector('#compId').value);
    const nom = modal.querySelector('#compNom').value.trim();
    const tipo = modal.querySelector('#compTipo').value;
    const dur = parseInt(modal.querySelector('#compDur').value);
    if (!nom || isNaN(id) || isNaN(dur) || id <= 0 || dur <= 0) {
      alert("Datos inválidos (ID y duración deben ser números positivos).");
      return;
    }
    if (!isEdit && competencias.some(c => c.id_competen === id)) {
      alert("ID competencia ya registrada.");
      return;
    }
    const nueva = { id_competen: id, nom_competen: nom, ind_tipo_competen: tipo, val_duracion_competen: dur };
    if (isEdit) {
      const idx = competencias.findIndex(c => c.id_competen === id);
      if (idx !== -1) competencias[idx] = nueva;
    } else {
      competencias.push(nueva);
    }
    guardarDatos();
    renderAll();
    modal.remove();
  };
}

// -------------------- ASIGNACIONES --------------------
function actualizarSelectsAsignacion() {
  const selectInst = document.getElementById('asignInstrucSelect');
  const selectComp = document.getElementById('asignCompetSelect');
  if (selectInst) selectInst.innerHTML = `<option value="">Seleccionar</option>${instructores.map(i => `<option value="${i.id_instruc}">${escapeHTML(i.nom_instruc)} ${escapeHTML(i.apelli_instruc)}</option>`).join('')}`;
  if (selectComp) selectComp.innerHTML = `<option value="">Seleccionar</option>${competencias.map(c => `<option value="${c.id_competen}">${escapeHTML(c.nom_competen)}</option>`).join('')}`;
}

function renderAsignaciones() {
  const tbody = document.getElementById('asignacionesTbody');
  tbody.innerHTML = '';
  instructorCompetencias.forEach(asig => {
    const instructor = instructores.find(i => i.id_instruc === asig.id_instruc);
    const competencia = competencias.find(c => c.id_competen === asig.id_competen);
    if (!instructor || !competencia) return;
    const row = tbody.insertRow();
    row.insertCell(0).innerText = `${instructor.nom_instruc} ${instructor.apelli_instruc}`;
    row.insertCell(1).innerText = competencia.nom_competen;
    const accel = row.insertCell(2);
    accel.innerHTML = `<button class="icon-btn delete" data-idinst="${asig.id_instruc}" data-idcomp="${asig.id_competen}"><i class="fas fa-trash-alt"></i></button>`;
  });

  document.querySelectorAll('#asignacionesTbody .icon-btn.delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idInst = parseInt(btn.dataset.idinst);
      const idComp = parseInt(btn.dataset.idcomp);
      instructorCompetencias = instructorCompetencias.filter(a => !(a.id_instruc === idInst && a.id_competen === idComp));
      guardarDatos();
      renderAll();  // Solo una llamada, ya que renderAll incluye renderAsignaciones
    });
  });
}

document.getElementById('btnAsignar')?.addEventListener('click', () => {
  const selectInst = document.getElementById('asignInstrucSelect');
  const selectComp = document.getElementById('asignCompetSelect');
  const idInst = parseInt(selectInst.value);
  const idComp = parseInt(selectComp.value);
  if (!idInst || !idComp) return alert("Seleccione ambos campos");
  if (instructorCompetencias.some(a => a.id_instruc === idInst && a.id_competen === idComp))
    return alert("Ya existe esa asignación");
  instructorCompetencias.push({ id_instruc: idInst, id_competen: idComp });
  guardarDatos();
  renderAsignaciones();
  selectInst.value = '';
  selectComp.value = '';
});

// -------------------- FICHAS --------------------
function renderFichas() {
  const tbody = document.getElementById('fichasTbody');
  tbody.innerHTML = '';
  const query = (document.getElementById('fichaSearch')?.value || '').toLowerCase();
  const statusFilter = document.getElementById('fichaStatusFilter')?.value || '';
  fichasTituladas.forEach((f, fichaIndex) => {
    const programa = programas.find(p => p.id_programa_titul === f.id_programa_titul);
    const instructorLider = instructores.find(i => i.id_instruc === f.id_instruc_lider);
    const ambiente = ambientes.find(a => a.id_ambiente === f.id_ambiente);
    const estado = f.estado || (fichaIndex % 5 === 0 ? 'Próxima' : fichaIndex % 7 === 0 ? 'Finalizada' : 'Activa');
    const inscritos = aprendices.filter(a => a.ficha === f.id_ficha).length;
    const cupo = f.cupo || 30;
    const progreso = f.progreso || (estado === 'Finalizada' ? 100 : estado === 'Próxima' ? 0 : 35 + (fichaIndex * 7) % 55);
    const searchable = `${f.id_ficha} ${programa?.nom_programa_titul || ''} ${instructorLider?.nom_instruc || ''} ${instructorLider?.apelli_instruc || ''}`.toLowerCase();
    if ((query && !searchable.includes(query)) || (statusFilter && estado !== statusFilter)) return;
    const row = tbody.insertRow();
    row.insertCell(0).innerText = f.id_ficha;
    row.insertCell(1).innerText = programa ? programa.nom_programa_titul : "N/A";
    row.insertCell(2).innerText = f.ind_jornada === 'M' ? 'Mañana' : (f.ind_jornada === 'T' ? 'Tarde' : 'Noche');
    row.insertCell(3).innerText = instructorLider ? `${instructorLider.nom_instruc} ${instructorLider.apelli_instruc}` : 'Sin líder';
    row.insertCell(4).innerHTML = `<span class="badge">${estado}</span>`;
    row.insertCell(5).innerText = `${inscritos}/${cupo}`;
    row.insertCell(6).innerHTML = `<span class="progress-track"><span class="progress-bar" style="width:${progreso}%"></span></span>${progreso}%`;
    const accel = row.insertCell(7);
    accel.innerHTML = `<button class="icon-btn edit" data-idf="${f.id_ficha}"><i class="fas fa-edit"></i></button>
                       <button class="icon-btn delete" data-idf="${f.id_ficha}"><i class="fas fa-trash-alt"></i></button>`;
  });

  document.querySelectorAll('#fichasTbody .icon-btn.delete').forEach(btn =>
    btn.addEventListener('click', (e) => {
      const idf = parseInt(btn.dataset.idf);
      fichasTituladas = fichasTituladas.filter(f => f.id_ficha !== idf);
      guardarDatos();
      renderFichas();  // No es necesario renderAll completo, pero no daña
    })
  );
  document.querySelectorAll('#fichasTbody .icon-btn.edit').forEach(btn =>
    btn.addEventListener('click', (e) => {
      const idf = parseInt(btn.dataset.idf);
      const ficha = fichasTituladas.find(f => f.id_ficha === idf);
      if (ficha) abrirModalFicha(ficha);
    })
  );
}

function abrirModalFicha(ficha = null) {
  const isEdit = !!ficha;
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  const idValue = isEdit ? ficha.id_ficha : '';
  const iniValue = isEdit ? ficha.fec_ini : '';
  const finValue = isEdit ? ficha.fec_fin : '';

  modal.innerHTML = `<div class="modal-card"><h3>${isEdit ? 'Editar Ficha' : 'Nueva Ficha'}</h3>
    <div class="form-group"><label>ID Ficha</label><input id="fichaId" type="number" value="${idValue}" ${isEdit ? 'readonly' : ''}></div>
    <div class="form-group"><label>Programa</label>
      <select id="fichaPrograma">
        <option value="">Seleccionar</option>
        ${programas.map(p => `<option value="${p.id_programa_titul}" ${isEdit && ficha.id_programa_titul === p.id_programa_titul ? 'selected' : ''}>${escapeHTML(p.nom_programa_titul)}</option>`).join('')}
      </select>
    </div>
    <div class="form-group"><label>Jornada</label>
      <select id="fichaJornada">
        <option value="">Seleccionar</option>
        <option ${isEdit && ficha.ind_jornada == 'M' ? 'selected' : ''} value="M">Mañana</option>
        <option ${isEdit && ficha.ind_jornada == 'T' ? 'selected' : ''} value="T">Tarde</option>
        <option ${isEdit && ficha.ind_jornada == 'N' ? 'selected' : ''} value="N">Noche</option>
      </select>
    </div>
    <div class="form-group"><label>Instructor Líder</label>
      <select id="fichaLider">
        <option value="">Seleccionar</option>
        ${instructores.map(i => `<option value="${i.id_instruc}" ${isEdit && ficha.id_instruc_lider === i.id_instruc ? 'selected' : ''}>${escapeHTML(i.nom_instruc)} ${escapeHTML(i.apelli_instruc)}</option>`)}
        <option value="">Sin líder</option>
      </select>
    </div>
    <div class="form-group"><label>Ambiente</label>
      <select id="fichaAmbiente">
        <option value="">Seleccionar</option>
        ${ambientes.map(a => `<option value="${a.id_ambiente}" ${isEdit && ficha.id_ambiente === a.id_ambiente ? 'selected' : ''}>${escapeHTML(a.nom_ambiente)}</option>`).join('')}
      </select>
    </div>
    <div class="form-group"><label>Fecha Inicio</label><input type="date" id="fichaIni" value="${iniValue}"></div>
    <div class="form-group"><label>Fecha Fin</label><input type="date" id="fichaFin" value="${finValue}"></div>
    <div class="flex-buttons"><button class="btn-secondary" id="cancelFicha">Cancelar</button><button class="btn-primary" id="saveFicha">Guardar</button></div>
    </div>`;
  document.body.appendChild(modal);
  modal.querySelector('#cancelFicha').onclick = () => modal.remove();

  modal.querySelector('#saveFicha').onclick = () => {
    const id = parseInt(modal.querySelector('#fichaId').value);
    const prog = parseInt(modal.querySelector('#fichaPrograma').value);
    const jornada = modal.querySelector('#fichaJornada').value;
    const lider = modal.querySelector('#fichaLider').value ? parseInt(modal.querySelector('#fichaLider').value) : null;
    const amb = parseInt(modal.querySelector('#fichaAmbiente').value);
    const fecIni = modal.querySelector('#fichaIni').value;
    const fecFin = modal.querySelector('#fichaFin').value;

    if (!id || !fecIni || !fecFin || id <= 0) {
      alert("Complete datos obligatorios (ID positivo, fechas).");
      return;
    }
    if (new Date(fecIni) > new Date(fecFin)) {
      alert("La fecha de inicio debe ser anterior a la fecha de fin.");
      return;
    }
    if (!isEdit && fichasTituladas.some(f => f.id_ficha === id)) {
      alert("ID ficha ya existe.");
      return;
    }

    const obj = {
      id_ficha: id,
      id_programa_titul: prog,
      ind_jornada: jornada,
      id_instruc_lider: lider,
      id_ambiente: amb,
      fec_ini: fecIni,
      fec_fin: fecFin,
      ind_modalidad: "P",
      fec_ini_etapa_produc: fecIni,
      ind_etapa_produc: false
    };
    if (isEdit) {
      const idx = fichasTituladas.findIndex(f => f.id_ficha === id);
      if (idx !== -1) fichasTituladas[idx] = obj;
    } else {
      fichasTituladas.push(obj);
    }
    guardarDatos();
    renderFichas();
    modal.remove();
  };
}

// -------------------- TABS Y NAVEGACIÓN --------------------
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  document.getElementById('btnAddInstructor').onclick = () => abrirModalInstructor(null);
  document.getElementById('btnAddCompetencia').onclick = () => abrirModalCompetencia(null);
  document.getElementById('btnAddFicha').onclick = () => abrirModalFicha(null);
  document.getElementById('btnAddUsuario').onclick = () => editarUsuario();
  document.getElementById('btnAddAprendiz').onclick = () => editarAprendiz();
  document.getElementById('fichaSearch').oninput = renderFichas;
  document.getElementById('fichaStatusFilter').onchange = renderFichas;
}

// -------------------- INICIALIZACIÓN --------------------
cargarDatosIniciales();
renderAll();
initTabs();
actualizarSelectsAsignacion();
