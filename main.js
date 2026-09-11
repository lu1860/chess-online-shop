
const ANCHO_ESCRITORIO = '(min-width: 1025px)';

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const nav = document.querySelector('header nav');

function menuEstaAbierto() {
    return navLinks.classList.contains('abierto');
}

function abrirMenu() {
    navLinks.classList.add('abierto');
    menuToggle.classList.add('abierto');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Cerrar menú');
}

function cerrarMenu() {
    navLinks.classList.remove('abierto');
    menuToggle.classList.remove('abierto');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
}

function alternarMenu() {
    if (menuEstaAbierto()) {
        cerrarMenu();
    } else {
        abrirMenu();
    }
}

if (menuToggle && navLinks && nav) {
    // 1. Click en el botón hamburguesa: abre o cierra el menú
    menuToggle.addEventListener('click', alternarMenu);

    // 2. Click en un enlace del menú: se cierra al navegar a la sección
    navLinks.addEventListener('click', (evento) => {
        if (evento.target.closest('a')) {
            cerrarMenu();
        }
    });

    // 3. Click fuera del menú: se cierra
    document.addEventListener('click', (evento) => {
        if (menuEstaAbierto() && !nav.contains(evento.target)) {
            cerrarMenu();
        }
    });

    // 4. Tecla Escape: se cierra y el foco vuelve al botón
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && menuEstaAbierto()) {
            cerrarMenu();
            menuToggle.focus();
        }
    });

    // 5. Si la pantalla pasa a tamaño escritorio, se reinicia el estado
    const consultaEscritorio = window.matchMedia(ANCHO_ESCRITORIO);
    consultaEscritorio.addEventListener('change', (evento) => {
        if (evento.matches) {
            cerrarMenu();
        }
    });
}
