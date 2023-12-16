import saveProductsInLocalStorage from "./saveProductsInLocalStorage.js";
const url = '../../productos-menu.json';

await saveProductsInLocalStorage(url);

const searchButton = document.getElementById("search-button");
const nameOfItemInLocalStorage = "fileJsonToLocalStorage";

searchButton.addEventListener('click', event => {
    event.preventDefault();
    const searchProductInput = document.getElementById("search-product-input");
    const productSearched = searchProductInput.value;
    const isNumber = /^\d+$/.test(productSearched);

    if(isNumber){
        showProductFromLocalStorageWithID(parseInt(productSearched));
    }
    else{
        showProductFromLocalStorageWithName(productSearched);
    }
})


/* Funcion para mostrar el producto con el nombre */
function showProductFromLocalStorageWithName(productName) {

    const productsInLocalStorageJSON = localStorage.getItem(nameOfItemInLocalStorage);
    const objectProductsJS = JSON.parse(productsInLocalStorageJSON);

    console.log(objectProductsJS);
    actualizarListaDesplegable(objectProductsJS);
    const productFinded = findProductNameInLocalStorage(productName, objectProductsJS);
    updateForm(productFinded);
}

/* Funcion para encontrar el producto con el nombre */
function findProductNameInLocalStorage(productName, objectProductsJS) {
    for (const categoria in objectProductsJS) {
        const productosDeCategoria = objectProductsJS[categoria];
        const productoEncontrado = productosDeCategoria.find(product => product.name.toLowerCase() === productName.toLowerCase());

        if (productoEncontrado) {
            return productoEncontrado;
        }
    }
    return null;
}

/* Funcion para mostrar el producto con el ID */
function showProductFromLocalStorageWithID(productId) {

    const productsInLocalStorageJSON = localStorage.getItem(nameOfItemInLocalStorage);
    const objectProductsJS = JSON.parse(productsInLocalStorageJSON);

    console.log(objectProductsJS);
    actualizarListaDesplegable(objectProductsJS);
    const productFinded = findProductIDInLocalStorage(productId, objectProductsJS);
    updateForm(productFinded);
}

/* Funcion para encontrar el producto con el ID */
function findProductIDInLocalStorage(productId, objectProductsJS) {
    for (const categoria in objectProductsJS) {
        const productosDeCategoria = objectProductsJS[categoria];
        const productoEncontrado = productosDeCategoria.find(product => product.id === parseInt(productId));

        if (productoEncontrado) {
            return productoEncontrado;
        }
    }
    return null;
}

function updateForm(product) {
    // Aquí puedes actualizar los campos del formulario con la información del producto
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-ID').value = product.id;
    document.getElementById('product-category-selector').value=product.category;
    // Cambiar la imagen del producto si está disponible
    if (product.image) {
        document.getElementById('product-img').src = product.image;
    }
    else{
        document.getElementById('product-img').src ="../images/imagen desconocida producto.png";
    }
}

/* Obtener un array con los IDs de los productos ordenados */
function getSortedProductIDs() {
    const productsInLocalStorageJSON = localStorage.getItem(nameOfItemInLocalStorage);
    const objectProductsJS = JSON.parse(productsInLocalStorageJSON);

    if (!objectProductsJS) {
        console.error('No hay datos en el almacenamiento local.');
        return [];
    }

    // Obtener todos los productos de todas las categorías en un solo arreglo
    const allProducts = Object.values(objectProductsJS).reduce((accumulator, category) => {
        return accumulator.concat(category);
    }, []);

    // Ordenar los productos por ID de manera ascendente
    const sortedProductIDs = allProducts.map(product => product.id).sort((a, b) => a - b);

    return sortedProductIDs;
}
/* Obtener un objeto con los IDs siguientes y previos */
function getAdjacentProductIDs(targetID) {
    const sortedIDs = getSortedProductIDs();

    const index = sortedIDs.indexOf(targetID);

    if (index === -1) {
        console.error(`El ID ${targetID} no fue encontrado.`);
        return { previousID: null, nextID: null };
    }

    const previousID = index > 0 ? sortedIDs[index - 1] : getSortedProductIDs()[0];
    const nextID = index < sortedIDs.length - 1 ? sortedIDs[index + 1] : getSortedProductIDs()[getSortedProductIDs()-1];

    return { previousID, nextID };
}


/* Buscar siguiente producto */
const nextProductButton = document.getElementById('next-product-button');
nextProductButton.addEventListener('click', event => {
    event.preventDefault();
    const actualID = parseInt(document.getElementById('product-ID').value);
    const productIDs = getAdjacentProductIDs(actualID);
    showProductFromLocalStorageWithID(productIDs.nextID);
});

/* Buscar producto anterior */
const previousProductButton = document.getElementById('previous-product-button');
previousProductButton.addEventListener('click', event => {
    event.preventDefault();
    const actualID = parseInt(document.getElementById('product-ID').value);
    const productIDs = getAdjacentProductIDs(actualID);
    showProductFromLocalStorageWithID(productIDs.previousID);
});

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

// Agrega un evento al botón de edición para manejar el cambio de estado de los elementos de entrada
const editButton = document.getElementById('edit-product-button');
editButton.addEventListener('click', event => {
    // Previene el comportamiento predeterminado del botón (enviar el formulario)
    event.preventDefault();
    disableAndHideElements();

});

const changableElements = document.querySelectorAll('.changable');
// Obtener referencia al botón de cambiar imagen
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

function disableAndHideElements(isNewProduct=false){
    // Itera sobre todos los elementos de entrada y cambia su estado de deshabilitado según el estado actual
    changableElements.forEach(function (input) {
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

    if(isNewProduct){
        const productCategorySelect = document.getElementById('product-category-selector');
        productCategorySelect.disabled = !productCategorySelect.disabled;
    }
}


// Evento de clic para el botón de guardar
saveProductButton.addEventListener('click', event => {
    // Obtener referencias a los inputs del formulario
    const productIdInput = document.getElementById('product-ID');
    const productNameInput = document.getElementById('product-name');
    const productPriceInput = document.getElementById('product-price');
    const productDescriptionInput = document.getElementById('product-description');
    const productCategorySelect = document.getElementById('product-category-selector');
    event.preventDefault();
    // Obtener la información actual del localStorage
    const storedProducts = JSON.parse(localStorage.getItem(nameOfItemInLocalStorage));

    // Obtener el ID del producto
    const productId = productIdInput.value;

    // Obtener la categoría seleccionada
    const selectedCategory = productCategorySelect.value;

    // Actualizar el valor del input con la categoría seleccionada
    productCategoryInput.value = selectedCategory;

    // Buscar el producto en la información almacenada localmente
    const productosDeCategoria = storedProducts[selectedCategory];
    const productoEncontrado = productosDeCategoria.find(producto => producto.id === parseInt(productId));

    if (productoEncontrado) {
        // Actualizar la información del producto con los valores de los inputs
        productoEncontrado.name = productNameInput.value;
        productoEncontrado.price = parseFloat(productPriceInput.value);
        productoEncontrado.description = productDescriptionInput.value;
        productoEncontrado.category = productCategoryInput.value;
    } else {
        // Si no se encuentra el producto, crear uno nuevo y agregarlo a la categoría
        const nuevoProducto = {
            id: parseInt(productId),
            name: productNameInput.value,
            category: productCategoryInput.value,
            price: parseFloat(productPriceInput.value),
            description: productDescriptionInput.value,
            image : "../images/imagen desconocida producto.png"
        };

        productosDeCategoria.push(nuevoProducto);
    }

    // Guardar la información actualizada en el localStorage
    localStorage.setItem(nameOfItemInLocalStorage, JSON.stringify(storedProducts));

    // Desactivar y ocultar elementos
    disableAndHideElements();

});

// Obtener referencia al botón de nuevo producto
const newProductButton = document.getElementById('new-product-button');
// Evento de clic para el botón de nuevo producto
newProductButton.addEventListener('click', event => {
    event.preventDefault();

    const storedProducts = JSON.parse(localStorage.getItem(nameOfItemInLocalStorage));

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
    const isNewProduct = true;
    disableAndHideElements(isNewProduct);
});


// Evento de clic para el botón de eliminar
deleteProductButton.addEventListener('click', event => {
    event.preventDefault();

    // Obtener el ID del producto a eliminar
    const productIdToDelete = document.getElementById('product-ID').value;

    // Obtener la información actual del localStorage
    const storedProducts = JSON.parse(localStorage.getItem(nameOfItemInLocalStorage));

    // Iterar sobre las categorías en el localStorage
    for (const categoria in storedProducts) {
        const productosDeCategoria = storedProducts[categoria];

        // Filtrar los productos para excluir el producto a eliminar
        const productosFiltrados = productosDeCategoria.filter(producto => producto.id !== parseInt(productIdToDelete));

        // Actualizar los productos de la categoría en el localStorage
        storedProducts[categoria] = productosFiltrados;
    }

    // Guardar la información actualizada en el localStorage
    localStorage.setItem(nameOfItemInLocalStorage, JSON.stringify(storedProducts));

    // Desactivar y ocultar elementos
    disableAndHideElements();
    if(productIdToDelete == 1){
        showProductFromLocalStorageWithID(productIdToDelete+1);
    }
    else{
        showProductFromLocalStorageWithID(productIdToDelete-1);
    }
});

// Obtener referencia al botón de cambiar imagen por su ID
const changeImgButton = document.getElementById('change-img-button');
// Agregar un evento de clic al botón
changeImgButton.addEventListener('click', event => {
    event.preventDefault();
    // Obtener el elemento del archivo por su ID
    const inputArchivo = document.getElementById('fileUpload');

    // Verificar si se seleccionó al menos un archivo
    if (inputArchivo.files.length > 0) {
        // Obtener la ubicación del primer archivo seleccionado
        const ubicacionArchivo = inputArchivo.files[0].name;

        // Imprimir la ubicación en la consola (puedes hacer lo que desees con la ubicación)
        console.log('Ubicación del archivo seleccionado:', ubicacionArchivo);

        // O almacenar la ubicación en una variable
        var ubicacionEnVariable = ubicacionArchivo;
        console.log('Ubicación almacenada en variable:', ubicacionEnVariable);
    } else {
        console.log('Ningún archivo seleccionado');
    }

});

showProductFromLocalStorageWithID(getSortedProductIDs()[getSortedProductIDs().length-1]);