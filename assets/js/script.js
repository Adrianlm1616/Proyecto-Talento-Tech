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

// Simulando los productos (estos pueden provenir de una base de datos en un caso real)
const products = [
    { id: 1, name: 'Nike Bailleli', brand: 'Nike', price: 195000, image: '/Proyecto-Talento-Tech/assets/img/TIENDA/IMAGEN 1 TIENDA.png' },
    { id: 2, name: 'Puma Park Beige', brand: 'Puma', price: 455000, image: '/Proyecto-Talento-Tech/assets/img/TIENDA/IMAGEN 2 TIENDA.png' },
    { id: 3, name: 'Adidas Tenis Samba', brand: 'Adidas', price: 590000, image: '/Proyecto-Talento-Tech/assets/img/TIENDA/IMAGEN 3 TIENDA.png' },
    { id: 4, name: 'Tenis Dame 9 Low', brand: 'Puma', price: 250000, image: '/Proyecto-Talento-Tech/assets/img/TIENDA/Tenis_Dame_9_Low_Blanco_IG6603_04_standard (1)-Photoroom.png' },
    { id: 5, name: 'Running Nike Renew Ride 3', brand: 'Nike', price: 290000, image: '/Proyecto-Talento-Tech/assets/img/TIENDA/zapatos nike 1-Photoroom.png' },
    { id: 6, name: 'Tenis de Running Supernova Rise adidas', brand: 'Adidas', price: 495000, image: '/Proyecto-Talento-Tech/assets/img/TIENDA/zapatos adida 1-Photoroom.png' },
    { id: 7, name: 'Nike Downshifter 13', brand: 'Nike', price: 305000, image: '/Proyecto-Talento-Tech/assets/img/TIENDA/zapatos nike 2-Photoroom.png' },
    { id: 8, name: 'New Balance Edición especial Fresh Foam 574', brand: 'New Balance', price: 235000, image: '/Proyecto-Talento-Tech/assets/img/TIENDA/zapatos new balance 1.png' },
    { id: 9, name: 'New Balance 442 v2 Pro FG', brand: 'New Balance', price: 395000, image: '/Proyecto-Talento-Tech/assets/img/TIENDA/zapatos new balance 2-Photoroom.png' },
];

// Función para aplicar los filtros seleccionados por el usuario
function applyFilters() {
    // Obtener los valores seleccionados por el usuario para marca y rango de precio
    const brandFilter = document.getElementById('brand').value;
    const priceMin = parseInt(document.getElementById('price-min').value) || 0; // Si no hay valor, se asigna 0
    const priceMax = parseInt(document.getElementById('price-max').value) || 1000000; // Si no hay valor, se asigna 1000000 (un precio muy alto para no limitar los productos)
    const sortOption = document.getElementById('sort').value; // Obtener la opción seleccionada para orden

    // Filtrar los productos basados en la marca y el precio
    let filteredProducts = products.filter(product => {
        // Comprobar si el producto coincide con la marca seleccionada (si "Todas las marcas" es seleccionado, pasa la validación)
        const isBrandMatch = (brandFilter === 'all' || product.brand === brandFilter);
        // Comprobar si el producto está dentro del rango de precio seleccionado
        const isPriceMatch = (product.price >= priceMin && product.price <= priceMax);
        // Devolver true si ambos filtros coinciden
        return isBrandMatch && isPriceMatch;
    });

    // Ordenar los productos según la opción de precio seleccionada (ascendente o descendente)
    if (sortOption === 'asc') {
        filteredProducts.sort((a, b) => a.price - b.price); // Orden ascendente (menor a mayor precio)
    } else if (sortOption === 'desc') {
        filteredProducts.sort((a, b) => b.price - a.price); // Orden descendente (mayor a menor precio)
    }

    // Mostrar los productos filtrados y ordenados
    displayProducts(filteredProducts);
}

// Función para mostrar los productos filtrados en el contenedor
function displayProducts(productsToDisplay) {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = '';  // Limpiar los productos actuales del contenedor antes de agregar los nuevos productos

    // Iterar sobre los productos filtrados y agregar cada uno al HTML
    productsToDisplay.forEach(product => {
        // Crear un nuevo div para el producto
        const productDiv = document.createElement('div');
        productDiv.classList.add('product'); // Asignar la clase "product" para estilo
        productDiv.setAttribute('data-id', product.id);  // Agregar atributo data-id para referencia
        productDiv.setAttribute('data-name', product.name); // Agregar atributo data-name para referencia
        productDiv.setAttribute('data-price', product.price); // Agregar atributo data-price para referencia
        productDiv.setAttribute('data-brand', product.brand); // Agregar atributo data-brand para referencia
        
        // Incluir el contenido HTML dentro del div del producto
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" height="300" width="300">
            <div class="product-details">
                <h3>${product.name}</h3>
                <div class="price">$${product.price.toLocaleString()}</div>
                <input type="number" id="quantity-${product.id}" value="1" min="1">
                <button class="buy-button" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Comprar Ahora</button>
            </div>
        `;
        
        // Añadir el producto al contenedor de productos
        productList.appendChild(productDiv);
    });
}

// Obtener los elementos del DOM para interacción
const openBtn = document.getElementById('openBtn'); // Botón para abrir la barra lateral
const closeBtn = document.getElementById('closeBtn'); // Botón para cerrar la barra lateral
const sidebar = document.getElementById('loginSidebar'); // Barra lateral de inicio de sesión
const loginForm = document.getElementById('loginForm'); // Formulario de inicio de sesión
const usernameInput = document.getElementById('username'); // Campo de texto para el nombre de usuario
const passwordInput = document.getElementById('password'); // Campo de texto para la contraseña
const welcomeMessage = document.getElementById('welcomeMessage'); // Contenedor para el mensaje de bienvenida

// Usuario y contraseña correctos (ficticios en este caso)
const correctUsername = 'cainetech';
const correctPassword = 'talentotech1';

// Función para abrir la barra lateral al hacer clic en "Iniciar Sesión"
openBtn.addEventListener('click', () => {
    sidebar.style.width = '300px'; // Expandir la barra lateral a un ancho de 300px
});

// Función para cerrar la barra lateral al hacer clic en "Cerrar"
closeBtn.addEventListener('click', () => {
    sidebar.style.width = '0'; // Colapsar la barra lateral (ancho 0)
});

// Función para manejar el evento de envío del formulario
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir el envío tradicional del formulario (evita la recarga de la página)

    // Obtener los valores ingresados por el usuario
    const username = usernameInput.value.trim(); // Eliminar espacios adicionales
    const password = passwordInput.value.trim();

    // Verificar si el nombre de usuario y la contraseña son correctos
    if (username === correctUsername && password === correctPassword) {
        // Si las credenciales son correctas, ocultar la barra lateral y mostrar el mensaje de bienvenida
        sidebar.style.width = '0'; // Cerrar la barra lateral
        welcomeMessage.style.display = 'block'; // Mostrar el mensaje de bienvenida
    } else {
        // Si las credenciales son incorrectas, mostrar un mensaje de error
        alert('Usuario o contraseña incorrectos'); // Alerta de error
    }
});
// Inicialmente, mostramos todos los productos sin ningún filtro aplicado
displayProducts(products);

// Función para abrir la barra lateral
document.getElementById('openBtn').addEventListener('click', function() {
    document.getElementById('loginSidebar').style.width = '300px'; // Abrir la barra lateral
});

// Función para cerrar la barra lateral
document.getElementById('closeBtn').addEventListener('click', function() {
    document.getElementById('loginSidebar').style.width = '0'; // Colapsar la barra lateral
});

// Manejo de inicio de sesión
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío tradicional del formulario

    // Obtener los valores de los campos de usuario y contraseña
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Verificar las credenciales
    if (username === 'cainetech' && password === 'talentotech1') {
        // Si las credenciales son correctas
        document.getElementById('loginSidebar').style.width = '0'; // Cerrar la barra lateral
        document.getElementById('welcomeMessage').style.display = 'block'; // Mostrar el mensaje de bienvenida
    } else {
        // Si las credenciales son incorrectas
        alert('Usuario o contraseña incorrectos');
    }
});