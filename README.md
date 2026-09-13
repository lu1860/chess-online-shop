# Chess Online Shop - Tienda Online de ajedrez

## Descripción del proyecto

Chess online shop es una tienda de comercio electrónico dedicada a la venta de productos de ajedrez. El sitio está dirigido a jugadores de todos los niveles, desde principiantes hasta avanzados, que buscan adquirir tableros, piezas, relojes de ajedrez (de gran calidad) y libros de estudio.

El problema que resuelve es la necesidad de una plataforma especializada donde los aficionados del ajedrez puedan encontrar productos de gran calidad en un solo lugar, con información detallada y la posibilidad de realizar pedidos de forma sencilla.


## Link al sitio en vercel

https://chess-online-shop.vercel.app/

## Capturas de la página

### Vista de Escritorio

![Vista de Escritorio](img/captura-escritorio.png)

### Vista Móvil

![Vista Móvil](img/captura-movil.png)

## Decisiones técnicas

### ¿Dónde usaste Flexbox y dónde Grid, y por qué en cada caso?

**Flexbox** lo utilicé en el menú de navegación (`nav`) y en los botones de categorías. Estas secciones requerían alinear los elementos en una sola dimensión (horizontal o vertical) y manejar el espaciado flexible entre elementos. 

**Grid** lo utilicé en el catálogo de productos (`.catalogo-grid`). Grid es la mejor opción en este caso porque necesitaba crear una cuadrícula bidimensional (con filas y columnas) que se adapte automáticamente al ancho disponible. 

### ¿Qué hace tu JavaScript, explicado sin copiar el código? ¿Cómo funciona tu validación?

El JavaScript tiene tres interacciones principales:

1. **Menú Hamburguesa:** Controla la apertura y cierre del menú de navegación en dispositivos móviles. Detecta los clics en el botón, en los enlaces del menú, y la tecla Escape para cerrarlo. También está al tanto de los cambios en el tamaño de pantalla para reiniciar el estado cuando se pasa a escritorio.

2. **Filtrado de categorías:** Los botones de categoría (los de tablero, piezas, etc.) filtran las tarjetas del catálogo mostrando solo los productos que corresponden a la categoría seleccionada

3. **Validación del formulario:** Antes de enviar el pedido, el JavaScript verifica que los campos requeridos estén completos, que el email tenga un formato válido y que la cantidad de los productos sea por lo menos 1. Si hay errores, se muestran mensajes específicos debajo del campo perjudicado. Solo permite el envío cuando todos los campos pasan la validación.
