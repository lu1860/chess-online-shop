const productos = [
    {
        id: 'tablero-madera',
        nombre: 'Tablero de Ajedrez de Madera',
        categoria: 'tableros',
        descripcion: 'Tablero de ajedrez de madera de muy alta calidad, con casillas de 55 mm y acabado encerado.',
        precio: 150000,
        imagen: 'img/tablero-madera.jpg',
        alt: 'Tablero de ajedrez de madera'
    },
    {
        id: 'piezas-staunton',
        nombre: 'Piezas Staunton',
        categoria: 'piezas',
        descripcion: 'Juego de piezas torneadas en modelo Staunton con acabado mate y base afelpada.',
        precio: 65000,
        imagen: 'img/piezas-staunton.jpg',
        alt: 'Piezas de ajedrez Staunton torneadas'
    },
    {
        id: 'piezas-madera',
        nombre: 'Piezas Madera Artesanal',
        categoria: 'piezas',
        descripcion: 'Piezas talladas a mano en madera de ébano y boj. Diseño clásico Staunton.',
        precio: 120000,
        imagen: 'img/piezas-madera.jpg',
        alt: 'Piezas de ajedrez de madera talladas a mano'
    },
    {
        id: 'reloj-digital',
        nombre: 'Reloj Digital DGT',
        categoria: 'relojes',
        descripcion: 'Reloj digital profesional con display LCD, modos de juego y alerta sonora. Aprobado por la FIDE.',
        precio: 200000,
        imagen: 'img/reloj-digital.jpg',
        alt: 'Reloj de ajedrez digital con display LCD'
    },
    {
        id: 'reloj-analogico',
        nombre: 'Reloj Analógico Clásico',
        categoria: 'relojes',
        descripcion: 'Reloj mecánico tradicional con diseño vintage. Mecanismo de precisión y tapa protectora.',
        precio: 100000,
        imagen: 'img/reloj-analogico.jpg',
        alt: 'Reloj de ajedrez analógico clásico'
    },
    {
        id: 'libro-aperturas',
        nombre: 'Aperturas Modernas',
        categoria: 'libros',
        descripcion: 'Guía completa de aperturas contemporáneas con análisis de Grandes Maestros. Nivel intermedio-avanzado.',
        precio: 39990,
        imagen: 'img/libro-aperturas.jpg',
        alt: 'Libro de ajedrez sobre aperturas modernas'
    },
    {
        id: 'libro-estrategia',
        nombre: 'Estrategia y Táctica',
        categoria: 'libros',
        descripcion: 'Manual de estrategia posicional y combinaciones tácticas. Ejercicios prácticos incluidos.',
        precio: 55990,
        imagen: 'img/libro-estrategia.jpg',
        alt: 'Libro de estrategia y táctica de ajedrez'
    }
];

/* Cantidad máxima por pedido: la usa la validación y el atributo max del campo */
const CANTIDAD_MAXIMA = 20;

/* Formatea 150000 como "$150.000" (separador de miles colombiano) */
function formatearPrecio(valor) {
    return '$' + valor.toLocaleString('es-CO');
}

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
    // Click en el botón hamburguesa: abre o cierra el menú
    menuToggle.addEventListener('click', alternarMenu);

    // Click en un enlace del menú: se cierra al navegar a la sección
    navLinks.addEventListener('click', (evento) => {
        if (evento.target.closest('a')) {
            cerrarMenu();
        }
    });

    // Click fuera del menú: se cierra
    document.addEventListener('click', (evento) => {
        if (menuEstaAbierto() && !nav.contains(evento.target)) {
            cerrarMenu();
        }
    });

    // Tecla Escape: se cierra y el foco vuelve al botón
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && menuEstaAbierto()) {
            cerrarMenu();
            menuToggle.focus();
        }
    });

    // Si la pantalla pasa a tamaño escritorio, se reinicia el estado
    const consultaEscritorio = window.matchMedia(ANCHO_ESCRITORIO);
    consultaEscritorio.addEventListener('change', (evento) => {
        if (evento.matches) {
            cerrarMenu();
        }
    });
}
const catalogoGrid = document.getElementById('catalogo-grid');
const catalogoVacio = document.getElementById('catalogo-vacio');
const botonesCategoria = document.querySelectorAll('.btn-categoria');

/* Construye la tarjeta de un producto a partir de su objeto */
function crearTarjeta(producto) {
    const articulo = document.createElement('article');
    articulo.className = 'producto-card';
    articulo.dataset.categoria = producto.categoria;

    articulo.innerHTML = `
        <div class="producto-imagen">
            <img src="${producto.imagen}" alt="${producto.alt}" loading="lazy" width="400" height="300">
        </div>
        <div class="producto-info">
            <h3>${producto.nombre}</h3>
            <p class="producto-descripcion">${producto.descripcion}</p>
            <p class="producto-precio">${formatearPrecio(producto.precio)}</p>
            <button type="button" class="btn-agregar" data-producto="${producto.id}">Agregar al pedido</button>
        </div>
    `;

    return articulo;
}

/* Pinta en pantalla la lista de productos que reciba */
function renderizarCatalogo(lista) {
    if (!catalogoGrid) {
        return;
    }

    catalogoGrid.innerHTML = '';

    lista.forEach((producto) => {
        catalogoGrid.appendChild(crearTarjeta(producto));
    });

    // Mensaje de "sin resultados" en vez de dejar la sección en blanco
    if (catalogoVacio) {
        catalogoVacio.hidden = lista.length > 0;
    }
}

/* Llena el <select> del formulario con los mismos productos del catálogo,
   para que el pedido y el catálogo nunca queden desincronizados */
function llenarSelectProductos() {
    const select = document.getElementById('producto');

    if (!select) {
        return;
    }

    productos.forEach((producto) => {
        const opcion = document.createElement('option');
        opcion.value = producto.id;
        opcion.textContent = producto.nombre + ' - ' + formatearPrecio(producto.precio);
        select.appendChild(opcion);
    });
}
function filtrarPorCategoria(categoria) {
    if (categoria === 'todos') {
        renderizarCatalogo(productos);
        return;
    }

    const filtrados = productos.filter((producto) => producto.categoria === categoria);
    renderizarCatalogo(filtrados);
}

/* Marca visualmente cuál botón de categoría está activo */
function marcarBotonActivo(botonActivo) {
    botonesCategoria.forEach((boton) => {
        const esActivo = boton === botonActivo;
        boton.classList.toggle('activo', esActivo);
        boton.setAttribute('aria-pressed', esActivo ? 'true' : 'false');
    });
}

botonesCategoria.forEach((boton) => {
    boton.addEventListener('click', () => {
        marcarBotonActivo(boton);
        filtrarPorCategoria(boton.dataset.categoria);
    });
});


/* ------------------------------------------------------------
   5. AGREGAR AL PEDIDO
   Delegación de eventos: un solo listener en la grilla atiende a
   todas las tarjetas, incluso las que se vuelven a crear al filtrar.
   ------------------------------------------------------------ */
if (catalogoGrid) {
    catalogoGrid.addEventListener('click', (evento) => {
        const boton = evento.target.closest('.btn-agregar');

        if (!boton) {
            return;
        }

        const select = document.getElementById('producto');

        if (select) {
            select.value = boton.dataset.producto;
            limpiarError(select);
        }

        // Confirmación visual breve en el propio botón
        boton.classList.add('agregado');
        boton.textContent = 'Agregado';

        setTimeout(() => {
            boton.classList.remove('agregado');
            boton.textContent = 'Agregar al pedido';
        }, 1500);

        // Lleva al usuario al formulario con el producto ya seleccionado
        const seccionPedido = document.getElementById('pedido');

        if (seccionPedido) {
            seccionPedido.scrollIntoView({ behavior: 'smooth' });
        }
    });
}


/* ------------------------------------------------------------
   6. VALIDACIÓN DEL FORMULARIO
   El formulario tiene novalidate, así que toda la validación se
   hace aquí y los errores se muestran junto a cada campo.
   ------------------------------------------------------------ */
const formPedido = document.getElementById('form-pedido');
const mensajeExito = document.getElementById('mensaje-exito');

const LONGITUD_MINIMA_NOMBRE = 3;
const PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

/* Muestra el mensaje debajo del campo y lo marca en rojo */
function mostrarError(campo, mensaje) {
    const contenedorError = document.getElementById('error-' + campo.id);

    campo.classList.add('input-error');
    campo.setAttribute('aria-invalid', 'true');

    if (contenedorError) {
        contenedorError.textContent = mensaje;
    }
}

/* Quita el error de un campo */
function limpiarError(campo) {
    const contenedorError = document.getElementById('error-' + campo.id);

    campo.classList.remove('input-error');
    campo.removeAttribute('aria-invalid');

    if (contenedorError) {
        contenedorError.textContent = '';
    }
}

/* Cada función devuelve el mensaje de error, o cadena vacía si el campo es válido */
function validarNombre(campo) {
    const valor = campo.value.trim();

    if (valor === '') {
        return 'El nombre es obligatorio.';
    }

    if (valor.length < LONGITUD_MINIMA_NOMBRE) {
        return 'El nombre debe tener al menos ' + LONGITUD_MINIMA_NOMBRE + ' caracteres.';
    }

    return '';
}

function validarEmail(campo) {
    const valor = campo.value.trim();

    if (valor === '') {
        return 'El correo electrónico es obligatorio.';
    }

    if (!PATRON_EMAIL.test(valor)) {
        return 'Escribe un correo válido, por ejemplo: nombre@correo.com';
    }

    return '';
}

function validarProducto(campo) {
    if (campo.value === '') {
        return 'Selecciona el producto que quieres pedir.';
    }

    return '';
}

function validarCantidad(campo) {
    const valor = campo.value.trim();

    if (valor === '') {
        return 'La cantidad es obligatoria.';
    }

    const numero = Number(valor);

    if (!Number.isInteger(numero)) {
        return 'La cantidad debe ser un número entero.';
    }

    if (numero < 1) {
        return 'La cantidad mínima es 1.';
    }

    if (numero > CANTIDAD_MAXIMA) {
        return 'La cantidad máxima por pedido es ' + CANTIDAD_MAXIMA + '.';
    }

    return '';
}

/* Relaciona el id de cada campo con la función que lo valida */
const validaciones = {
    nombre: validarNombre,
    email: validarEmail,
    producto: validarProducto,
    cantidad: validarCantidad
};

/* Valida un campo y pinta o limpia su error. Devuelve true si es válido. */
function validarCampo(campo) {
    const validar = validaciones[campo.id];

    if (!validar) {
        return true;
    }

    const mensaje = validar(campo);

    if (mensaje === '') {
        limpiarError(campo);
        return true;
    }

    mostrarError(campo, mensaje);
    return false;
}

if (formPedido) {
    // Validación al salir de cada campo, para no esperar hasta el envío
    Object.keys(validaciones).forEach((id) => {
        const campo = document.getElementById(id);

        if (!campo) {
            return;
        }

        campo.addEventListener('blur', () => validarCampo(campo));

        // Mientras corrige, el error desaparece apenas el valor pasa a ser válido
        const eventoCorreccion = campo.tagName === 'SELECT' ? 'change' : 'input';

        campo.addEventListener(eventoCorreccion, () => {
            if (campo.classList.contains('input-error')) {
                validarCampo(campo);
            }
        });
    });

    formPedido.addEventListener('submit', (evento) => {
        evento.preventDefault();

        if (mensajeExito) {
            mensajeExito.textContent = '';
            mensajeExito.hidden = true;
        }

        let primerCampoConError = null;

        // Se validan todos los campos para mostrar todos los errores a la vez
        Object.keys(validaciones).forEach((id) => {
            const campo = document.getElementById(id);

            if (!campo) {
                return;
            }

            const esValido = validarCampo(campo);

            if (!esValido && primerCampoConError === null) {
                primerCampoConError = campo;
            }
        });

        // Si hay errores no se envía nada y el foco va al primer campo con problema
        if (primerCampoConError !== null) {
            primerCampoConError.focus();
            return;
        }

        // Todo válido: se simula el envío del pedido
        const nombre = document.getElementById('nombre').value.trim();
        const idProducto = document.getElementById('producto').value;
        const cantidad = Number(document.getElementById('cantidad').value);
        const producto = productos.find((item) => item.id === idProducto);
        const total = producto.precio * cantidad;

        if (mensajeExito) {
            mensajeExito.textContent =
                'Gracias, ' + nombre + '. Registramos tu pedido de ' + cantidad + ' x ' +
                producto.nombre + '. Total: ' + formatearPrecio(total) +
                '. Te escribiremos al correo para confirmar el envío.';
            mensajeExito.hidden = false;
        }

        formPedido.reset();

        Object.keys(validaciones).forEach((id) => {
            const campo = document.getElementById(id);

            if (campo) {
                limpiarError(campo);
            }
        });
    });
}
renderizarCatalogo(productos);
llenarSelectProductos();

if (botonesCategoria.length > 0) {
    marcarBotonActivo(botonesCategoria[0]);
}