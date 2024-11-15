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

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    let currentIndex = 0;

    // Botones de control
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Función para mostrar la imagen actual
    function updateCarousel() {
        // Desplazar el carrusel a la posición correspondiente
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Función para ir a la imagen anterior
    prevBtn.addEventListener('click', () => {
        if (currentIndex === 0) {
            currentIndex = totalItems - 1; // Si estamos en la primera imagen, ir a la última
        } else {
            currentIndex--;
        }
        updateCarousel();
    });

    // Función para ir a la imagen siguiente
    nextBtn.addEventListener('click', () => {
        if (currentIndex === totalItems - 1) {
            currentIndex = 0; // Si estamos en la última imagen, ir a la primera
        } else {
            currentIndex++;
        }
        updateCarousel();
    });

    // Inicializar el carrusel
    updateCarousel();
});

// Autoplay del carrusel (opcional)
setInterval(() => {
    nextBtn.click(); // Simula un clic en el botón "siguiente"
}, 15000); // Cada 15 segundos

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

// Función para mostrar u ocultar el panel de filtros
function toggleFilter() {
    const filterPanel = document.getElementById('filters');
    if (filterPanel.style.display === 'none' || filterPanel.style.display === '') {
        filterPanel.style.display = 'block'; // Muestra el panel de filtros
    } else {
        filterPanel.style.display = 'none'; // Oculta el panel de filtros
    }
}

// Muestra u oculta la barra de filtros
function toggleFilter() {
    const filterBar = document.getElementById('filters');
    if (filterBar.style.left === '0px') {
        filterBar.style.left = '-300px';  // Oculta
    } else {
        filterBar.style.left = '0';  // Muestra
    }
}

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

    // Muestra u oculta los productos basados en el filtro
    updateProductList(filteredProducts);
}

// Actualiza la visibilidad de los productos en la página (no los elimina)
function updateProductList(filteredProducts) {
    const products = document.querySelectorAll('.product');

    // Muestra todos los productos
    products.forEach(product => {
        product.style.display = 'none';  // Ocultamos todos los productos inicialmente
    });

    // Muestra solo los productos que cumplen con el filtro
    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            product.style.display = 'block';  // Mostramos solo los productos filtrados
        });
    } else {
        // Si no hay productos que coincidan con los filtros, muestra un mensaje
        const noProductsMessage = document.createElement('div');
        noProductsMessage.textContent = 'No se encontraron productos que coincidan con los filtros seleccionados.';
        document.getElementById('product-list').appendChild(noProductsMessage);
    }
}

// Inicializa la lista de productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');
    updateProductList(Array.from(products));  // Muestra todos los productos inicialmente
});

// Asigna los eventos de cambio a los filtros
document.getElementById('brand').addEventListener('change', applyFilters);
document.getElementById('price-min').addEventListener('input', applyFilters);
document.getElementById('price-max').addEventListener('input', applyFilters);
document.getElementById('sort').addEventListener('change', applyFilters);

// Configurar EmailJS con tu user ID
(function() {
    emailjs.init("Gz686p0bvQMAWeV95");  // Reemplaza con tu User ID de EmailJS
})();

// Agregar un event listener para enviar el formulario
document.querySelector(".form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevenir el comportamiento por defecto del formulario (no recargar la página)

    const name = document.getElementById("name").value;  // Obtener el valor del campo "name"
    const email = document.getElementById("email").value;  // Obtener el valor del campo "email"
    const message = document.getElementById("message").value;  // Obtener el valor del campo "message"

    // Usar EmailJS para enviar el correo con la información
    emailjs.send("your_service_id", "your_template_id", {
        name: name,
        email: email,
        message: message
    })
    
    .then(function(response) {
        // Si el mensaje fue enviado con éxito
        console.log("SUCCESS", response);

        // Mostrar mensaje de éxito
        const formContainer = document.querySelector(".form-container");
        formContainer.innerHTML = `
            <div class="success-message">
                <h3>¡Mensaje Enviado Exitosamente!</h3>
                <p>Te responderemos pronto. Gracias por contactarnos.</p>
            </div>
        `;
    }, function(error) {
        // Si hubo un error al enviar el mensaje
        console.log("FAILED", error);

        // Mostrar mensaje de error
        const formContainer = document.querySelector(".form-container");
        formContainer.innerHTML = `
            <div class="error-message">
                <h3>Hubo un problema al enviar tu mensaje. Intenta nuevamente más tarde.</h3>
            </div>
        `;
    });
});
