
function toggleCart() {
    const cart = document.getElementById('cart');

    cart.style.display = (cart.style.display === "block") ? "none" : "block";
}

let cart = [];

function addToCart(id, name, price) {
    const quantity = parseInt(document.getElementById(`quantity-${id}`).value);
    const product = {
        id,
        name,
        price,
        quantity
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];


    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push(product);
    }


    localStorage.setItem('cart', JSON.stringify(cart));

    updateCart();
    updateCartCount();
}


function updateCart() {

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('li');
        itemElement.textContent = `${item.name} - ${item.quantity} x $${item.price.toLocaleString()}`;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    const cartTotal = document.getElementById('cart-total');
    cartTotal.textContent = `Total: $${total.toLocaleString()}`;
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = totalItems;
}

function emptyCart() {
    localStorage.removeItem('cart');
    updateCart();
    updateCartCount();
}

document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    updateCartCount();
});

let imagenIndex = 0;
    const imagenes = document.querySelectorAll('.carrusel-images img');
    const indicadores = document.querySelectorAll('.indicadores span');
    const totalImagenes = imagenes.length;

    function mostrarImagen(index) {
        imagenIndex = index;
        actualizarCarrusel();
    }

    function actualizarCarrusel() {
        // Mueve el carrusel a la imagen correspondiente
        document.querySelector('.carrusel-images').style.transform = `translateX(-${imagenIndex * 50}%)`;

        // Actualiza los indicadores
        indicadores.forEach((indicador, idx) => {
            if (idx === imagenIndex) {
                indicador.classList.add('activo');
            } else {
                indicador.classList.remove('activo');
            }
        });
    }

    // Función para navegar a la siguiente imagen
    function siguienteImagen() {
        imagenIndex = (imagenIndex + 1) % totalImagenes;
        actualizarCarrusel();
    }

    // Función para navegar a la imagen anterior
    function imagenAnterior() {
        imagenIndex = (imagenIndex - 1 + totalImagenes) % totalImagenes;
        actualizarCarrusel();
    }

    // Evento de los botones de navegación
    document.querySelector('.next').addEventListener('click', siguienteImagen);
    document.querySelector('.prev').addEventListener('click', imagenAnterior);

    // Cambiar la imagen cada 3 segundos automáticamente
    setInterval(siguienteImagen, 10000);