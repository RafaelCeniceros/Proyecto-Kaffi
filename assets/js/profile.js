// Obtener botones y contenedores
const productsButton = document.getElementById('option-products-button');
const ordersButton = document.getElementById('option-orders-button');
const commentsButton = document.getElementById('option-comments-button');

const productsButtonLateralMenu = document.getElementById('option-products-button-lg');
const ordersButtonLateralMenu = document.getElementById('option-orders-button-lg');
const commentsButtonLateralMenu = document.getElementById('option-comments-button-lg');

const productsContainer = document.getElementById('container-products');
const ordersContainer = document.getElementById('container-orders');
const commentsContainer = document.getElementById('container-comments');

// Mostrar por defecto el contenedor de productos
productsContainer.style.display = 'flex';
ordersContainer.style.display = 'none';
commentsContainer.style.display = 'none';

// Función para ocultar todos los contenedores
function hideAllContainers() {
    productsContainer.style.display = 'none';
    ordersContainer.style.display = 'none';
    commentsContainer.style.display = 'none';
}

// Agregar eventos de clic a los botones
productsButton.addEventListener('click', () => {
    hideAllContainers();
    productsContainer.style.display = 'flex';
});

ordersButton.addEventListener('click', () => {
    hideAllContainers();
    ordersContainer.style.display = 'flex';
});

commentsButton.addEventListener('click', () =>{
    hideAllContainers();
    commentsContainer.style.display = 'flex';
});

// Agregar eventos de clic a los botones del menu lateral
productsButtonLateralMenu.addEventListener('click', () => {
    hideAllContainers();
    productsContainer.style.display = 'flex';
});

ordersButtonLateralMenu.addEventListener('click', () => {
    hideAllContainers();
    ordersContainer.style.display = 'flex';
});

commentsButtonLateralMenu.addEventListener('click', () =>{
    hideAllContainers();
    commentsContainer.style.display = 'flex';
});



/* -------------------- Codigo obtencion de productos API  ------------------- */
function fetchProduct() {
    // Obtener el ID del producto
    var productId = document.getElementById('product-ID').value;
    var productsURL = "../../productos-menu.json";

    // Hacer una solicitud a la API con el ID del producto
    fetch(productsURL)
        .then(response => response.json())
        .then(menu => {
            for (const categoria in menu) {
                const productosDeCategoria = menu[categoria];

                // Buscar el producto por su ID dentro de la categoría
                const productoEncontrado = productosDeCategoria.find(producto => producto.id === parseInt(productId));

                if (productoEncontrado) {
                    // Aquí puedes hacer algo con el producto encontrado
                    console.log("Categoría:", categoria);
                    console.log("Producto encontrado:", productoEncontrado);
                    // También puedes actualizar tu formulario con la información del producto
                    actualizarFormulario(productoEncontrado);
                }
            }
        })
        .catch(error => console.error('Error fetching product:', error));
}

function actualizarFormulario(producto) {
    // Aquí puedes actualizar los campos del formulario con la información del producto
    document.getElementById('product-name').value = producto.nombre;
    document.getElementById('product-category').value = producto.categoria;
    document.getElementById('product-price').value = producto.precio;
    document.getElementById('product-description').value = producto.descripcion;
    // Puedes hacer lo mismo con otros campos del formulario
    // ...

    // Además, puedes cambiar la imagen del producto si está disponible
    if (producto.imagen) {
        document.getElementById('product-img').src = producto.imagen;
    }
}
