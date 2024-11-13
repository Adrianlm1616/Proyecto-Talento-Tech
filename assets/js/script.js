// Función para abrir y cerrar el carrito
function toggleCart() {
    const cart = document.getElementById('cart');
    // Alterna la visibilidad del carrito, cambiando entre "block" y "none"
    cart.style.display = (cart.style.display === "block") ? "none" : "block";
}

// Función para agregar productos al carrito
function addToCart(id, name, price) {
    // Obtener la cantidad del producto desde un campo de entrada
    const quantity = parseInt(document.getElementById(`quantity-${id}`).value);
    const product = {
        id,        // ID del producto
        name,      // Nombre del producto
        price,     // Precio del producto
        quantity  // Cantidad seleccionada
    };

    // Obtener el carrito desde localStorage o un array vacío si no hay carrito guardado
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Buscar si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        // Si el producto ya está, sumar la cantidad seleccionada
        existingProduct.quantity += quantity;
    } else {
        // Si no está, agregar el nuevo producto al carrito
        cart.push(product);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar la vista del carrito y el contador de productos
    updateCart();
    updateCartCount();
}

// Función para actualizar la vista del carrito
function updateCart() {
    // Cargar el carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Obtener el contenedor de los elementos del carrito
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Limpiar cualquier contenido previo

    let total = 0;  // Variable para calcular el total del carrito
    cart.forEach(item => {
        // Crear un elemento <li> para cada producto en el carrito
        const itemElement = document.createElement('li');
        itemElement.textContent = `${item.name} - ${item.quantity} x $${item.price.toLocaleString()}`;
        cartItemsContainer.appendChild(itemElement);

        // Sumar al total del carrito
        total += item.price * item.quantity;
    });

    // Actualizar el total del carrito en la interfaz
    const cartTotal = document.getElementById('cart-total');
    cartTotal.textContent = `Total: $${total.toLocaleString()}`;
}

// Función para actualizar el contador de productos en el carrito
function updateCartCount() {
    // Cargar el carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Calcular la cantidad total de productos en el carrito
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Actualizar el contador del carrito en la interfaz
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = totalItems;
}

// Función para vaciar el carrito
function emptyCart() {
    // Eliminar el carrito de localStorage
    localStorage.removeItem('cart');

    // Actualizar la vista del carrito y el contador
    updateCart();
    updateCartCount();
}

// Función para inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Cargar y mostrar el carrito al cargar la página
    updateCart();
    updateCartCount();
});

// Carrusel de imágenes: Funcionalidad para mostrar y navegar entre imágenes
let imagenIndex = 0;
const imagenes = document.querySelectorAll('.carrusel-images img');
const indicadores = document.querySelectorAll('.indicadores span');
const totalImagenes = imagenes.length;

// Función para mostrar una imagen específica del carrusel
function mostrarImagen(index) {
    imagenIndex = index;
    actualizarCarrusel();
}

// Función para actualizar el carrusel (mostrar la imagen actual y actualizar indicadores)
function actualizarCarrusel() {
    // Asegurarse de que el índice esté dentro del rango de imágenes
    if (imagenIndex < 0) imagenIndex = totalImagenes - 1;
    if (imagenIndex >= totalImagenes) imagenIndex = 0;

    // Ocultar todas las imágenes
    imagenes.forEach(img => img.classList.remove('active'));
    // Mostrar la imagen correspondiente
    imagenes[imagenIndex].classList.add('active');

    // Actualizar los indicadores
    indicadores.forEach(indicator => indicator.classList.remove('active'));
    indicadores[imagenIndex].classList.add('active');
}

// Función para ir a la siguiente imagen del carrusel
function siguienteImagen() {
    imagenIndex++;
    actualizarCarrusel();
}

// Función para ir a la imagen anterior del carrusel
function anteriorImagen() {
    imagenIndex--;
    actualizarCarrusel();
}

// Agregar eventos a los controles del carrusel
document.querySelector('.carousel-control-prev').addEventListener('click', anteriorImagen);
document.querySelector('.carousel-control-next').addEventListener('click', siguienteImagen);

// Establecer los indicadores del carrusel
indicadores.forEach((indicator, index) => {
    indicator.addEventListener('click', () => mostrarImagen(index));
});

// Iniciar el carrusel con la primera imagen visible
actualizarCarrusel();

// ** Función para activar el cambio automático de imágenes del carrusel (si se desea)**
setInterval(siguienteImagen, 15000);  // Cambiar cada 15 segundos (ajustable)
