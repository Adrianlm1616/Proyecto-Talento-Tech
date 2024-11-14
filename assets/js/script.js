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

// Función para abrir y cerrar la barra lateral de login
function toggleLoginSidebar() {
    const loginSidebar = document.getElementById('loginSidebar');
    // Verificamos el estado de la barra lateral y la alternamos entre "block" y "none"
    if (loginSidebar.style.display === "none" || loginSidebar.style.display === "") {
        loginSidebar.style.display = "block";
    } else {
        loginSidebar.style.display = "none";
    }
}

// Función para el login
function loginUser(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de forma tradicional

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Verificar las credenciales
    if (username === 'caine' && password === '12345') {
        // Credenciales correctas
        document.getElementById('loginForm').style.display = 'none'; // Ocultar formulario
        document.getElementById('welcomeMessage').style.display = 'block'; // Mostrar mensaje de bienvenida
        document.getElementById('usernameDisplay').textContent = username; // Mostrar nombre de usuario
        document.getElementById('errorMessage').style.display = 'none'; // Ocultar mensaje de error
    } else {
        // Credenciales incorrectas
        document.getElementById('errorMessage').style.display = 'block'; // Mostrar error
    }
}

// Función para cerrar sesión
function logout() {
    // Restablecer el formulario
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('welcomeMessage').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('errorMessage').style.display = 'none';
}

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    updateCartCount();
});

document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el contador de visitas ya existe en localStorage
    let visitCount = localStorage.getItem('visitCount');

    // Si no existe, inicializamos el contador en 1, si existe, lo incrementamos
    if (visitCount === null) {
        visitCount = 1; // Si es la primera vez que alguien visita la página
    } else {
        visitCount = parseInt(visitCount) + 1; // Incrementar el contador de visitas
    }

    // Guardar el contador actualizado en localStorage
    localStorage.setItem('visitCount', visitCount);

    // Mostrar el contador de visitas en el pie de página
    const visitCounterElement = document.getElementById('visit-counter');
    visitCounterElement.textContent = `${visitCount} personas han visitado esta página`;
});

// Muestra u oculta la barra de filtros
function toggleFilter() {
    const filterBar = document.getElementById('filters');
    if (filterBar.style.left === '0px') {
        filterBar.style.left = '-300px';  // Oculta
    } else {
        filterBar.style.left = '0';  // Muestra
    }
}

// Aplica los filtros seleccionados
function applyFilters() {
    const brand = document.getElementById('brand').value;
    const priceMin = parseInt(document.getElementById('price-min').value);
    const priceMax = parseInt(document.getElementById('price-max').value);
    const sort = document.getElementById('sort').value;

    // Obtén todos los productos
    const products = document.querySelectorAll('.product');

    // Filtra los productos en función de los criterios seleccionados
    let filteredProducts = Array.from(products).filter(product => {
        const productBrand = product.getAttribute('data-brand');
        const productPrice = parseInt(product.getAttribute('data-price'));

        // Filtra por marca
        const isBrandValid = brand === 'all' || productBrand === brand;

        // Filtra por precio
        const isPriceValid = productPrice >= priceMin && productPrice <= priceMax;

        return isBrandValid && isPriceValid;
    });

    // Ordena los productos si se selecciona ordenar por precio
    if (sort === 'asc') {
        filteredProducts.sort((a, b) => {
            return parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price'));
        });
    } else if (sort === 'desc') {
        filteredProducts.sort((a, b) => {
            return parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price'));
        });
    }

    // Muestra los productos filtrados
    updateProductList(filteredProducts);
}

// Actualiza la lista de productos en la página
function updateProductList(filteredProducts) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';  // Limpia la lista de productos

    // Agrega los productos filtrados al contenedor
    filteredProducts.forEach(product => {
        productList.appendChild(product);
    });

    // Si no hay productos que mostrar, muestra un mensaje
    if (filteredProducts.length === 0) {
        const noProductsMessage = document.createElement('div');
        noProductsMessage.textContent = 'No se encontraron productos que coincidan con los filtros seleccionados.';
        productList.appendChild(noProductsMessage);
    }
}

// Inicializa la lista de productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');
    updateProductList(products);  // Muestra todos los productos inicialmente
});
