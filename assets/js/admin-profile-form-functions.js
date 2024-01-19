
const url = 'https://kaffi-ecommerce.onrender.com/api/v1/products';

async function getProducts(url) {
    const localStorageTimeLimit_s = 1; // Tiempo de vida límite del localStorage en segundos
    const localStorageKey = "ProductsData";

    // Verificar si hay datos en el Local Storage y si han pasado más de 60 segundos
    const storedData = JSON.parse(localStorage.getItem(localStorageKey));

    if (storedData && (Date.now() - storedData.timestamp) / 1000 < localStorageTimeLimit_s) {
        // Leer desde el Local Storage si está dentro del límite de tiempo
        //console.log("Recuperando datos desde el Local Storage");
        //console.log(`Tiempo transcurrido: ${(Date.now() - storedData.timestamp) / 1000} segundos`);
        return storedData.data;
    }

    try {
        // Realizar solicitud GET con async/await
        const response = await fetch(url);

        if (response.status === 200) {
            console.log("Estado de la solicitud: OK");

            // Convertir la respuesta a JSON con async/await
            const products = await response.json();

            // Guardar en el Local Storage con la marca de tiempo
            const timestamp = Date.now();
            const dataToStore = { data: products, timestamp: timestamp };
            localStorage.setItem(localStorageKey, JSON.stringify(dataToStore));
            //console.table(dataToStore); // Mostrar datos almacenados en la consola
            return products;
        } else {
            throw new Error(`Error in fetch. Status: ${response.status}`);
        }
    } catch (error) {
        console.log("Error in the request:", error);
        // Manejar el error o registrar información adicional si es necesario
        throw error; // Propagar el error para que pueda ser manejado por la función que llama a getProducts
    }
}

/* Funcion para mostrar el producto con el nombre */
async function showProductFromLocalStorageWithName(productName) {
    const objectProductsJS = await getProducts(url);
    //console.log(objectProductsJS);
     await actualizarListaDesplegable();

    const productFinded = await findProductNameInLocalStorage(productName, objectProductsJS);

    // Verificar si se encontró el producto antes de actualizar el formulario
    if (productFinded !== null) {
        //console.log(productFinded);
        updateForm(productFinded);
    } else {
        console.error('El producto con el ID especificado no fue encontrado.');
        // Puedes manejar este caso según tus necesidades
    }
}

/* Funcion para encontrar el producto con el nombre */
function findProductNameInLocalStorage(productName, objectProductsJS) {
    const productoEncontrado = objectProductsJS.find(product => product.name.toLowerCase() === productName.toLowerCase());

    return productoEncontrado || null;
}

/* Funcion para mostrar el producto con el ID */
async function showProductFromLocalStorageWithID(productId) {
    const objectProductsJS = await getProducts(url);
    await actualizarListaDesplegable();

    const productFinded = await findProductIDInLocalStorage(productId, objectProductsJS);

    // Verificar si se encontró el producto antes de actualizar el formulario
    if (productFinded !== null) {
        //console.log(productFinded);
        updateForm(productFinded);
    } else {
        console.error('El producto con el ID especificado no fue encontrado.');
        // Puedes manejar este caso según tus necesidades
    }
}

/* Funcion para encontrar el producto con el ID */
function findProductIDInLocalStorage(productId, objectProductsJS) {
    const productoEncontrado = objectProductsJS.find(product => parseInt(product.id) === parseInt(productId));

    return productoEncontrado || null;
}


async function getCategoryName(categoryId) {
    try {
        const productsCategories = await getProductsCategories();

        // Buscar la categoría con el categoryId proporcionado
        const foundCategory = productsCategories.find(category => category.id === categoryId);

        if (foundCategory) {
            return foundCategory.name; // Devolver el nombre de la categoría encontrada
        } else {
            console.error(`No se encontró la categoría con el ID: ${categoryId}`);
            return null; // O puedes devolver un valor predeterminado o lanzar una excepción según tus necesidades
        }
    } catch (error) {
        console.error("Error al obtener las categorías:", error.message);
        return null; // Manejar el error según tus necesidades
    }
}

async function updateForm(product) {
    // Aquí puedes actualizar los campos del formulario con la información del producto

    const categoryName = await getCategoryName(product.category.id);
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-category').value = categoryName;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-ID').value = product.id;
    document.getElementById('product-category-selector').value=categoryName;
    // Cambiar la imagen del producto si está disponible
    if (product.image) {
        document.getElementById('product-img').src = product.image;
    }
    else{
        document.getElementById('product-img').src ="../images/imagen desconocida producto.png";
    }
}

/* Obtener un array con los IDs de los productos ordenados */
async function getSortedProductIDs() {
    try {
        const products = await getProducts(url);

        // Verificar si hay datos de productos
        if (!products || !Array.isArray(products) || products.length === 0) {
            console.error('No hay datos de productos.');
            return [];
        }

        // Obtener los IDs de los productos y ordenarlos por ID de manera ascendente
        const sortedProductIDs = products
            .map(product => product.id)
            .sort((a, b) => a - b);
        //console.log(sortedProductIDs);
        return sortedProductIDs;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return [];
    }
}


/* Obtener un objeto con los IDs siguientes y previos */
async function getAdjacentProductIDs(targetID) {
    const sortedIDs = await getSortedProductIDs();

    const index = sortedIDs.indexOf(targetID);

    if (index === -1) {
        console.error(`El ID ${targetID} no fue encontrado.`);
        return { previousID: null, nextID: null };
    }

    const previousID = index > 0 ? sortedIDs[index - 1] : (await getSortedProductIDs())[0];
    const nextID = index < sortedIDs.length - 1 ? sortedIDs[index + 1] : await getSortedProductIDs()[(await getSortedProductIDs())-1];

    return { previousID, nextID };
}
const searchButton = document.getElementById("search-button");
const nameOfItemInLocalStorage = "ProductsData";

searchButton.addEventListener('click', async event => {
    event.preventDefault();
    const searchProductInput = document.getElementById("search-product-input");
    const productSearched = searchProductInput.value;
    const isNumber = /^\d+$/.test(productSearched);

    if(isNumber){
        await showProductFromLocalStorageWithID(parseInt(productSearched));
        searchProductInput.value="";
    }
    else{
        await showProductFromLocalStorageWithName(productSearched);
        searchProductInput.value="";
    }
});

/* Buscar siguiente producto */
const nextProductButton = document.getElementById('next-product-button');
nextProductButton.addEventListener('click', async event => {
    event.preventDefault();
    const actualID = parseInt(document.getElementById('product-ID').value);
    const productIDs = await getAdjacentProductIDs(actualID);
    showProductFromLocalStorageWithID(productIDs.nextID);
});

/* Buscar producto anterior */
const previousProductButton = document.getElementById('previous-product-button');
previousProductButton.addEventListener('click',async event => {
    event.preventDefault();
    const actualID = parseInt(document.getElementById('product-ID').value);
    const productIDs = await getAdjacentProductIDs(actualID);
    showProductFromLocalStorageWithID(productIDs.previousID);
});


async function getProductsCategories(){
    const localStorageTimeLimit_s = 60; // Tiempo de vida límite del localStorage en segundos
    const localStorageKey = "CategoriesData";

    // Verificar si hay datos en el Local Storage y si han pasado más de 60 segundos
    const storedData = JSON.parse(localStorage.getItem(localStorageKey));

    if (storedData && (Date.now() - storedData.timestamp) / 1000 < localStorageTimeLimit_s) {
        // Leer desde el Local Storage si está dentro del límite de tiempo
        //console.log("Recuperando datos desde el Local Storage");
        //console.log(`Tiempo transcurrido: ${(Date.now() - storedData.timestamp) / 1000} segundos`);
        return storedData.data;
    }

    try {
        // Realizar solicitud GET con async/await
		const url = 'https://kaffi-ecommerce.onrender.com/api/v1/categories';
        const response = await fetch(url);

        if (response.status === 200) {
            console.log("Estado de la solicitud: OK");

            // Convertir la respuesta a JSON con async/await
            const categories = await response.json();

            // Guardar en el Local Storage con la marca de tiempo
            const timestamp = Date.now();
            const dataToStore = { data: categories, timestamp: timestamp };
            localStorage.setItem(localStorageKey, JSON.stringify(dataToStore));
            //console.table(dataToStore); // Mostrar datos almacenados en la consola
            return categories;
        } else {
            throw new Error(`Error in fetch. Status: ${response.status}`);
        }
    } catch (error) {
        console.log("Error in the request:", error);
        // Manejar el error o registrar información adicional si es necesario
        throw error; // Propagar el error para que pueda ser manejado por la función que llama a getProducts
    }
}


// Función para actualizar la lista desplegable con las categorías disponibles
async function actualizarListaDesplegable() {
    const productCategorySelect = document.getElementById('product-category-selector');
    
    const productsCategories = await getProductsCategories();
    // Limpiar las opciones actuales
    productCategorySelect.innerHTML = '';

    // Verificar si productsInfo es un array antes de usar map
    if (!Array.isArray(productsCategories)) {
        console.error('No es un array productsInfo.');
        return;
    }

    // Obtener todas las categorías únicas
    const categoriasUnicas = [...new Set(productsCategories.map(categories => categories.name))];
    //console.log(categoriasUnicas);
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
// Obtener referencia al botón de guardar
const saveProductButton = document.getElementById('save-product-button');
// Obtener referencia al botón de eliminar
const deleteProductButton = document.getElementById('delete-product-button');
// Obtener referencia al selector de categorias
const productCategorySelect = document.getElementById('product-category-selector');
// Obetner referncia al input de categorias
const productCategoryInput = document.getElementById('product-category');

productCategorySelect.style.display = 'none';
saveProductButton.style.display = 'none';
deleteProductButton.style.display = 'none';
productCategoryInput.style.display = 'flex';

function disableAndHideElements(isNewProduct=false){
    // Itera sobre todos los elementos de entrada y cambia su estado de deshabilitado según el estado actual
    changableElements.forEach(function (input) {
        input.disabled = !input.disabled;
    });

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
saveProductButton.addEventListener('click', async event => {
    // Obtener referencias a los inputs del formulario
    const productIdInput = document.getElementById('product-ID');
    const productNameInput = document.getElementById('product-name');
    const productPriceInput = document.getElementById('product-price');
    const productDescriptionInput = document.getElementById('product-description');
    const productCategorySelect = document.getElementById('product-category-selector');
    event.preventDefault();
    // Obtener la información actual del localStorage
    const storedProducts = await getProducts(url);

    // Obtener el ID del producto
    const productId = productIdInput.value;

    // Obtener la categoría seleccionada
    const selectedCategory = productCategorySelect.value;

    // Actualizar el valor del input con la categoría seleccionada
    productCategoryInput.value = selectedCategory;

    // Buscar el producto en la información almacenada localmente
    const productoEncontrado = storedProducts.find(producto => producto.id === parseInt(productId));

    if (productoEncontrado) {

        const ProductToPut ={
            name: productNameInput.value,
            price: parseFloat(productPriceInput.value),
            description: productDescriptionInput.value,
            category: {id:productoEncontrado.category.id},
            image:productoEncontrado.image
        }
        //console.log("PUT PRODUCT",ProductToPut );
        // Desactivar y ocultar elementos
        console.log(ProductToPut);
        disableAndHideElements();
        await updateProduct(ProductToPut,productId );

    } else {

        const categoriesProducts = await getProductsCategories();
        // Buscar la categoría en la lista de categorías
        const selectedCategoryId = (categoriesProducts.find(category => category.name === selectedCategory) || {}).id;

        // Verificar si se encontró la categoría y obtener su ID
        if (selectedCategoryId !== undefined) {
            console.log(`El ID de la categoría "${selectedCategory}" es: ${selectedCategoryId}`);
        } else {
            console.log(`La categoría "${selectedCategory}" no fue encontrada.`);
        }

        // Si no se encuentra el producto, crear uno nuevo y agregarlo a la categoría
        const ProductToPost = {
            id: null,
            name: productNameInput.value,
            category: {id:selectedCategoryId},
            price: parseFloat(productPriceInput.value),
            description: productDescriptionInput.value,
            image : "../images/imagen desconocida producto.png"
        };
        //console.log("POST NEW PRODUCT", ProductToPost);
            // Desactivar y ocultar elementos
        disableAndHideElements();
        //console.log(ProductToPost);
        await sendProduct(ProductToPost);
    }

    // Guardar la información actualizada en el localStorage
   // localStorage.setItem(nameOfItemInLocalStorage, JSON.stringify(storedProducts));



});

// Obtener referencia al botón de nuevo producto
const newProductButton = document.getElementById('new-product-button');
// Evento de clic para el botón de nuevo producto
newProductButton.addEventListener('click', async event => {
    event.preventDefault();

    // Encontrar el último ID
    const listOfIds = (await getSortedProductIDs());
    let lastId = listOfIds[(listOfIds.length)-1];
    // Incrementar el último ID para obtener uno nuevo
    //console.log(lastId);
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
deleteProductButton.addEventListener('click', async event => {
    event.preventDefault();

    // Obtener el ID del producto a eliminar
    const productIdToDelete = document.getElementById('product-ID').value;

    await deleteProduct(productIdToDelete);

    // Desactivar y ocultar elementos
    disableAndHideElements();
    if(productIdToDelete == 1){
        await showProductFromLocalStorageWithID(parseInt(productIdToDelete)+1);
    }
    else{
        await showProductFromLocalStorageWithID(parseInt(productIdToDelete)-1);
    }
});


const FirstProductID = (await getSortedProductIDs())[0];
await showProductFromLocalStorageWithID(FirstProductID);



async function updateProduct(ProductToPut,productId){
    try {
        const apiUrl = "https://kaffi-ecommerce.onrender.com/api/v1/products/"+productId;

        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
                // Puedes agregar más encabezados según sea necesario
            },
            body: JSON.stringify(ProductToPut)
        });

        if (!response.ok) {
            throw new Error(`Error al realizar la solicitud. Código de estado: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Respuesta del servidor:", responseData);
        alert("Producto actualizado");
        setTimeout(function() {
            location.reload();
        }, 1000);
        // Limpiar el campo de entrada después de enviar el comentario
    } catch (error) {
        console.error("Error:", error.message);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje al usuario
    }
}

async function sendProduct(ProductToPost){
    try {
        const apiUrl = "https://kaffi-ecommerce.onrender.com/api/v1/products";

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                // Puedes agregar más encabezados según sea necesario
            },
            body: JSON.stringify(ProductToPost)
        });

        if (!response.ok) {
            throw new Error(`Error al realizar la solicitud. Código de estado: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Respuesta del servidor:", responseData);
        alert("Producto nuevo guardado");
        setTimeout(function() {
            location.reload();
        }, 1000);
        // Limpiar el campo de entrada después de enviar el comentario
    } catch (error) {
        console.error("Error:", error.message);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje al usuario
    }
}

async function deleteProduct(productIdToDelete){
    try {
        const apiUrl = "https://kaffi-ecommerce.onrender.com/api/v1/products/"+productIdToDelete;

        const response = await fetch(apiUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
                // Puedes agregar más encabezados según sea necesario
            },
            //body: JSON.stringify(ProductToPost)
        });

        if (!response.ok) {
            throw new Error(`Error al realizar la solicitud. Código de estado: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Respuesta del servidor:", responseData);
        alert("Producto eliminado");
        // Limpiar el campo de entrada después de enviar el comentario
    } catch (error) {
        console.error("Error:", error.message);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje al usuario
    }

}