const productsURL = "../../productos-menu.json";

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

/* Deshabilitar/Habilitar inputs */
// Obtén una referencia al botón de edición y a todos los elementos de entrada del formulario
const editButton = document.getElementById('edit-product-button');
const inputElements = document.querySelectorAll('#product-form input, #product-form textarea');
const changeImagesButtons = document.getElementById('change-img-container');
// Obtener referencia al botón de guardar
const saveProductButton = document.getElementById('save-product-button');
// Obtener referencia al botón de eliminar
const deleteProductButton = document.getElementById('delete-product-button');
// Obtener referencia al selector de categorias
const productCategorySelect = document.getElementById('product-category-selector');
// Obetner referncia al input de categorias
const productCategoryInput = document.getElementById('product-category');

productCategorySelect.style.display = 'none';
changeImagesButtons.style.display = 'none';
saveProductButton.style.display = 'none';
deleteProductButton.style.display = 'none';
productCategoryInput.style.display = 'flex';

// Agrega un evento al botón de edición para manejar el cambio de estado de los elementos de entrada
editButton.addEventListener('click', function (event) {
    // Previene el comportamiento predeterminado del botón (enviar el formulario)
    event.preventDefault();
    disableAndHideElements();
});





function disableAndHideElements(){
        // Itera sobre todos los elementos de entrada y cambia su estado de deshabilitado según el estado actual
        inputElements.forEach(function (input) {
            input.disabled = !input.disabled;
        });
        if (changeImagesButtons.style.display == 'none') {
            changeImagesButtons.style.display = 'flex';
        } else {
            changeImagesButtons.style.display = 'none';
        }
    
        if (saveProductButton.style.display == 'none') {
            saveProductButton.style.display = 'flex';
        } else {
            saveProductButton.style.display = 'none';
        }
    
        if (deleteProductButton.style.display == 'none') {
            deleteProductButton.style.display = 'flex';
        } else {
            deleteProductButton.style.display = 'none';
        }

        if (productCategorySelect.style.display == 'none') {
            productCategorySelect.style.display = 'flex';
        } else {
            productCategorySelect.style.display = 'none';
        }

        if (productCategoryInput.style.display == 'none') {
            productCategoryInput.style.display = 'flex';
        } else {
            productCategoryInput.style.display = 'none';
        }
}

/* Buscar Producto con ID */
const searchProductButton = document.getElementById('search-product-button');
searchProductButton.addEventListener('click', event => {
    event.preventDefault();
    const productId = document.getElementById('product-ID').value;

    if (!productId) {
        console.error('Ingrese un ID de producto válido.');
        return;
    }

    fetchProduct(productId);
});

/* Buscar siguiente producto */
const nextProductButton = document.getElementById('next-product-button');
nextProductButton.addEventListener('click', event => {
    event.preventDefault();
    const productId = parseInt(document.getElementById('product-ID').value) + 1;
    fetchProduct(productId);
});

/* Buscar producto anterior */
const previousProductButton = document.getElementById('previous-product-button');
previousProductButton.addEventListener('click', event => {
    event.preventDefault();
    const productId = parseInt(document.getElementById('product-ID').value) - 1;
    if(productId != 0){
        fetchProduct(productId);
    }
    else{
        fetchProduct(1);
    }
});

/* Al cargar la página se mostrará el producto con ID 1 */
fetchProduct(1);
/* -------------------- Codigo obtencion de productos API  ------------------- */
// Función para obtener la información del producto (desde JSON o localStorage)
function fetchProduct(productId) {
    const storedProducts = JSON.parse(localStorage.getItem('productosMenu'));

    if (storedProducts) {
        const productoEncontrado = findProductInLocalStorage(productId, storedProducts);

        if (productoEncontrado) {
            console.log("Producto encontrado en localStorage:", productoEncontrado);
            actualizarFormulario(productoEncontrado);
            actualizarListaDesplegable(storedProducts);
            return;
        }
    }

    fetch(productsURL)
        .then(response => response.json())
        .then(menu => {
            const productoEncontrado = findProductInLocalStorage(productId, menu);

            if (productoEncontrado) {
                console.log("Producto encontrado en JSON:", productoEncontrado);
                actualizarFormulario(productoEncontrado);
                actualizarListaDesplegable(menu);

                // Almacena en localStorage solo si no había información previa
                if (!storedProducts) {
                    localStorage.setItem('productosMenu', JSON.stringify(menu));
                }
            } else {
                console.error("Producto no encontrado.");
            }
        })
        .catch(error => console.error('Error fetching product:', error));
}

// Función para buscar un producto en la información (ya sea JSON o localStorage)
function findProductInLocalStorage(productId, productsInfo) {
    for (const categoria in productsInfo) {
        const productosDeCategoria = productsInfo[categoria];
        const productoEncontrado = productosDeCategoria.find(producto => producto.id === parseInt(productId));

        if (productoEncontrado) {
            return productoEncontrado;
        }
    }
    return null;
}


function actualizarFormulario(producto) {
    // Aquí puedes actualizar los campos del formulario con la información del producto
    document.getElementById('product-name').value = producto.nombre;
    document.getElementById('product-category').value = producto.categoria;
    document.getElementById('product-price').value = producto.precio;
    document.getElementById('product-description').value = producto.descripcion;
    document.getElementById('product-ID').value = producto.id;
    
    // Cambiar la imagen del producto si está disponible
    if (producto.imagen) {
        document.getElementById('product-img').src = producto.imagen;
    }
    else{
        document.getElementById('product-img').src ="../images/imagen desconocida producto.png";
    }
}

// Función para actualizar la lista desplegable con las categorías disponibles
function actualizarListaDesplegable(productsInfo) {
    const productCategorySelect = document.getElementById('product-category-selector');
    
    // Limpiar las opciones actuales
    productCategorySelect.innerHTML = '';

    // Obtener todas las categorías únicas
    const categoriasUnicas = [...new Set(Object.keys(productsInfo))];

    // Llenar la lista desplegable con las categorías
    categoriasUnicas.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        productCategorySelect.appendChild(option);
    });
}

/* Actualizar JSON  */

// Obtener referencias a los inputs del formulario
const productIdInput = document.getElementById('product-ID');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productDescriptionInput = document.getElementById('product-description');


// Evento de clic para el botón de guardar
saveProductButton.addEventListener('click', event => {
    event.preventDefault();
    // Obtener la información actual del localStorage
    const storedProducts = JSON.parse(localStorage.getItem('productosMenu')) || {};

    // Obtener el ID del producto
    const productId = productIdInput.value;

    // Obtener la categoría seleccionada
    const selectedCategory = productCategorySelect.value;

    // Verificar si la categoría existe en el localStorage
    if (!storedProducts[selectedCategory]) {
        // Si no existe, crear un array vacío para esa categoría
        storedProducts[selectedCategory] = [];
    }

    // Buscar el producto en la información almacenada localmente
    const productosDeCategoria = storedProducts[selectedCategory];
    const productoEncontrado = productosDeCategoria.find(producto => producto.id === parseInt(productId));

    if (productoEncontrado) {
        // Actualizar la información del producto con los valores de los inputs
        productoEncontrado.nombre = productNameInput.value;
        productoEncontrado.precio = parseFloat(productPriceInput.value);
        productoEncontrado.descripcion = productDescriptionInput.value;
    } else {
        // Si no se encuentra el producto, crear uno nuevo y agregarlo a la categoría
        const nuevoProducto = {
            id: parseInt(productId),
            nombre: productNameInput.value,
            categoria: selectedCategory,
            precio: parseFloat(productPriceInput.value),
            descripcion: productDescriptionInput.value,
        };

        productosDeCategoria.push(nuevoProducto);
    }

    // Guardar la información actualizada en el localStorage
    localStorage.setItem('productosMenu', JSON.stringify(storedProducts));

    // Desactivar y ocultar elementos
    disableAndHideElements();

    // Volver a cargar el producto actualizado
    fetchProduct(productId);
});

// Obtener referencia al botón de nuevo producto
const newProductButton = document.getElementById('new-product-button');


// Evento de clic para el botón de nuevo producto
newProductButton.addEventListener('click', event => {
    event.preventDefault();
    // Obtener la información actual del localStorage
    const storedProducts = JSON.parse(localStorage.getItem('productosMenu')) || {};

    // Encontrar el último ID
    let lastId = 0;
    for (const categoria in storedProducts) {
        const productosDeCategoria = storedProducts[categoria];
        for (const producto of productosDeCategoria) {
            if (producto.id > lastId) {
                lastId = producto.id;
            }
        }
    }

    // Incrementar el último ID para obtener uno nuevo
    const newProductId = lastId + 1;

    // Establecer el nuevo ID como el valor del product-ID input
    document.getElementById('product-ID').value = newProductId;

    // También puedes limpiar los demás campos del formulario si es necesario
    document.getElementById('product-name').value = '';
    document.getElementById('product-category').value = '';



    document.getElementById('product-price').value = '';
    document.getElementById('product-description').value = '';
    document.getElementById('product-img').src = "../images/imagen desconocida producto.png";
    disableAndHideElements();
});

// Evento de clic para el botón de eliminar
deleteProductButton.addEventListener('click', event => {
    event.preventDefault();

    // Obtener el ID del producto a eliminar
    const productIdToDelete = productIdInput.value;

    // Obtener la información actual del localStorage
    const storedProducts = JSON.parse(localStorage.getItem('productosMenu')) || {};

    // Iterar sobre las categorías en el localStorage
    for (const categoria in storedProducts) {
        const productosDeCategoria = storedProducts[categoria];

        // Filtrar los productos para excluir el producto a eliminar
        const productosFiltrados = productosDeCategoria.filter(producto => producto.id !== parseInt(productIdToDelete));

        // Actualizar los productos de la categoría en el localStorage
        storedProducts[categoria] = productosFiltrados;
    }

    // Guardar la información actualizada en el localStorage
    localStorage.setItem('productosMenu', JSON.stringify(storedProducts));

    // Desactivar y ocultar elementos
    disableAndHideElements();
    fetchProduct(productIdToDelete-1);
});