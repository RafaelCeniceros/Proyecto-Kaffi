
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
    
    // Cambiar la imagen del producto si está disponible
    if (product.image) {
        document.getElementById('product-img').src = product.image;
    }
    else{
        document.getElementById('product-img').src ="../images/imagen desconocida producto.png";
    }
}

/* showProductFromLocalStorageWithID(1); */

/* showProductFromLocalStorageWithName("Capuccino"); */