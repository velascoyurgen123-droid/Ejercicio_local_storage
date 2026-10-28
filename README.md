# Nexo Académico

## Plataforma web de gestión académica

Nexo Académico es una aplicación web frontend que simula una plataforma escolar para administrar usuarios, instructores, aprendices, competencias y rutas formativas.

> **Estado:** prototipo funcional frontend con datos ficticios.

## Objetivo

El proyecto centraliza información académica y representa distintos perfiles institucionales mediante una interfaz moderna. También sirve como base para una futura conexión con un backend y una base de datos real.

## Funcionalidades

- Inicio de sesión simulado por perfiles.
- Dashboard personalizado con estadísticas y accesos rápidos.
- Gestión de usuarios, instructores y aprendices.
- Registro de competencias y vinculaciones.
- Gestión de rutas formativas y fichas.
- Estados, cupos y progreso de fichas.
- Búsqueda y filtro de rutas formativas.
- Centro de notificaciones por perfil.
- Calendario académico con eventos demo.
- Temas claro y oscuro.
- Color visual personalizado para cada perfil.
- Datos demo persistentes en el navegador.
- Diseño adaptable para dispositivos móviles.

## Perfiles de prueba

Todos los perfiles utilizan la contraseña:

```text
123456
```

| Usuario | Perfil | Permisos principales |
|---|---|---|
| `admin` | Administrador | Gestión general del sistema |
| `coordinador` | Coordinador | Gestión académica |
| `instructor` | Instructor | Consulta de información académica |
| `estudiante` | Aprendiz | Consulta de rutas y progreso |

También se pueden seleccionar los perfiles desde los botones de acceso inicial.

## Módulos

### Dashboard

Muestra estadísticas de aprendices, instructores, competencias y fichas, además de accesos rápidos y actividad reciente.

### Usuarios

Permite crear, editar, activar y desactivar usuarios, además de asignarles un perfil.

### Instructores

Administra información personal, cargo, teléfono, correo, disponibilidad y competencias asignadas.

### Aprendices

Registra documento, nombre, correo, ficha asociada y estado del aprendiz.

### Competencias

Administra competencias técnicas o transversales y su duración en horas.

### Rutas formativas

Permite consultar fichas, programas, jornadas, instructor líder, estado, cupos y progreso. Incluye búsqueda y filtro.

### Notificaciones y calendario

Presenta avisos adaptados al perfil activo y eventos académicos como inicios de ficha, evaluaciones, reuniones y entregas.

## Tecnologías

- HTML5.
- CSS3.
- JavaScript vanilla.
- DOM API.
- `localStorage`.
- `sessionStorage`.
- Font Awesome.
- Google Fonts.

No requiere frameworks ni instalación de dependencias.

## Estructura del proyecto

```text
Nexo Académico/
├── index.html
├── README.md
├── DDL.sql
├── Guia_PasoAPaso_SAPFPI.docx
├── Taller_SAPFPI_Descripcion.docx
├── assets/
│   └── campus-bg.png
├── css/
│   └── style.css
└── js/
    └── js.js
```

### Archivos principales

- `index.html`: estructura de login, dashboard y módulos.
- `css/style.css`: estilos, temas, colores por perfil y diseño responsive.
- `js/js.js`: lógica, datos demo, autenticación simulada y almacenamiento.
- `DDL.sql`: modelo SQL de referencia para una futura base de datos.

## Instalación y ejecución

### Abrir directamente

Abrir `index.html` en un navegador moderno.

### Usar Visual Studio Code

1. Abrir la carpeta del proyecto.
2. Instalar la extensión **Live Server**.
3. Hacer clic derecho sobre `index.html`.
4. Seleccionar **Open with Live Server**.

## Almacenamiento

| Tecnología | Uso |
|---|---|
| `localStorage` | Usuarios, instructores, aprendices, competencias y fichas |
| `sessionStorage` | Sesión activa y perfil seleccionado |
| `localStorage` | Preferencia del tema visual |

Los datos no se envían a ningún servidor.

### Reiniciar datos demo

Desde las herramientas del navegador (`F12`), entrar a **Application / Almacenamiento**, seleccionar **Local Storage**, eliminar los datos del sitio y recargar la página.

## Flujo de uso

1. Abrir la plataforma.
2. Seleccionar un perfil o ingresar credenciales.
3. Acceder al dashboard personalizado.
4. Navegar por los módulos disponibles.
5. Crear o modificar registros según el permiso del perfil.
6. Cerrar sesión cuando sea necesario.

## Modelo SQL de referencia

`DDL.sql` contiene tablas relacionadas con cargos, instructores, ambientes, usuarios, competencias, programas, fichas, eventos y planeaciones pedagógicas.

Actualmente el SQL no está conectado a la interfaz. Sirve como referencia para una futura implementación con PostgreSQL u otro motor relacional.

## Limitaciones

Este proyecto es una simulación frontend:

- Las contraseñas no tienen seguridad real.
- Los permisos se controlan desde JavaScript.
- Los datos solo existen en el navegador actual.
- No hay servidor ni base de datos conectada.
- No existe recuperación de contraseña.
- No debe utilizarse con información personal real.

## Próximas mejoras

- Backend con API REST.
- Base de datos PostgreSQL.
- Autenticación segura con sesiones o JWT.
- Contraseñas cifradas en servidor.
- Reportes exportables.
- Historial de cambios.
- Validaciones avanzadas.
- Pruebas automatizadas.

## Propósito

Proyecto desarrollado con fines educativos y demostrativos para representar una plataforma de gestión académica utilizando tecnologías frontend.
