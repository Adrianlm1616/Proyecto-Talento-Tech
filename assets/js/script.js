// Función para abrir y cerrar el carrito
function toggleCart() {
    const cart = document.getElementById('cart');
    // Alterna la visibilidad del carrito cambiando entre "block" (visible) y "none" (oculto)
    cart.style.display = (cart.style.display === "block") ? "none" : "block";
}

// Función para agregar productos al carrito
function addToCart(id, name, price) {
    // Obtener la cantidad seleccionada del producto desde un campo de entrada
    const quantity = parseInt(document.getElementById(`quantity-${id}`).value);
    const product = {
        id,        // ID del producto
        name,      // Nombre del producto
        price,     // Precio del producto
        quantity  // Cantidad seleccionada
    };

    // Obtener el carrito desde localStorage o un array vacío si no existe
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificar si el producto ya existe en el carrito
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        // Si el producto ya existe, aumentamos la cantidad
        existingProduct.quantity += quantity;
    } else {
        // Si no está en el carrito, agregamos el nuevo producto
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

    // Obtener el contenedor donde se mostrarán los productos del carrito
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

    // Actualizar el contador de productos en el carrito
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

// --- Carrusel de imágenes: Funcionalidad para mostrar y navegar entre imágenes ---
let imagenIndex = 0;  // Índice de la imagen actual en el carrusel
const imagenes = document.querySelectorAll('.carrusel-images img');  // Seleccionar todas las imágenes del carrusel
const indicadores = document.querySelectorAll('.indicadores span');  // Seleccionar los indicadores
const totalImagenes = imagenes.length;  // Total de imágenes en el carrusel

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

// Cambiar automáticamente las imágenes del carrusel cada 15 segundos
setInterval(siguienteImagen, 15000);  // Cambiar cada 15 segundos

// --- Funciones para manejar el inicio de sesión y la barra lateral ---
const openBtn = document.getElementById('openBtn');  // Botón para abrir la barra lateral
const closeBtn = document.getElementById('closeBtn');  // Botón para cerrar la barra lateral
const sidebar = document.getElementById('loginSidebar');  // Barra lateral de inicio de sesión
const loginForm = document.getElementById('loginForm');  // Formulario de inicio de sesión
const usernameInput = document.getElementById('username');  // Campo de texto para el nombre de usuario
const passwordInput = document.getElementById('password');  // Campo de texto para la contraseña
const welcomeMessage = document.getElementById('welcomeMessage');  // Contenedor del mensaje de bienvenida

// Usuario y contraseña correctos
const correctUsername = 'cainetech';
const correctPassword = 'talentotech1';

// Función para abrir la barra lateral de inicio de sesión
function openLoginSidebar() {
    sidebar.classList.add('open'); // Añadimos la clase 'open' para abrir la barra lateral
}

// Función para cerrar la barra lateral
function closeLoginSidebar() {
    sidebar.classList.remove('open'); // Quitamos la clase 'open' para cerrar la barra lateral
}

// Asociamos las funciones al icono de usuario y el botón de cierre
openBtn.addEventListener("click", openLoginSidebar); // Evento para abrir la barra lateral
closeBtn.addEventListener("click", closeLoginSidebar); // Evento para cerrar la barra lateral

// Función para manejar el evento de inicio de sesión
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevenir el envío tradicional del formulario

    // Obtener los valores ingresados por el usuario
    const username = usernameInput.value.trim();  // Eliminar espacios en blanco
    const password = passwordInput.value.trim();

    // Verificar si las credenciales son correctas
    if (username === correctUsername && password === correctPassword) {
        // Si las credenciales son correctas, cerrar la barra lateral y mostrar el mensaje de bienvenida
        sidebar.classList.remove('open');  // Eliminar la clase 'open' para cerrar la barra lateral
        welcomeMessage.style.display = 'block';  // Mostrar el mensaje de bienvenida
    } else {
        // Si las credenciales son incorrectas, mostrar un mensaje de alerta
        alert('Usuario o contraseña incorrectos');  // Mostrar un mensaje de error
    }
});
