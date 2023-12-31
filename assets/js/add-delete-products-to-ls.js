/* En este archvio encontrarás todas las funciones para agregar, borrar y actualizar la cantidad de productos que lleva el 
 cliente.

 El el script menu-api-fetch solo se utilizan addProductsToShoppingCart, deleteProductsOfShoppingCart 
 y showQuantityOfItems

 En el script de shpping-cart se utilizan todas las funciones.
 
*/

/**
 *  Agrega al objeto shoppingCartlocalStorage (en nuestro caso, 
 *  siempre es "listOfProducts") el id del producto y su cantidad {id:cantidad},
 *  incrementando la cantidad en uno cada vez que se pulsa el botón de + del producto seleccionado.
 * 
 *  Además, actuliza el DOM del producto en la página del carrito.
 * @param {Object} element 
 * @param {Object} shoppingCartlocalStorage 
 */
export async function addProductsToShoppingCart(element, shoppingCartlocalStorage) {
    // variable que obtiene la referencia del boton + creado por MenuCard.kaffiCard()
    let buttonAdd = document.getElementById(`btn-add-product-${element.id}`);
    // evento asociado al click en el boton de +.
    buttonAdd.addEventListener("click", function (event) {
        event.preventDefault();
        // Si no hay un item llamado listOfProducts en el local storage
        // declara una variable llamada quantity y la iguala a 0
        // Incrementa en una unidad a quantity cada vez que se pulsa y guarda en el local
        // storage el objeto productsToBuy
        // muestra el total de items que se registra en el producto
        if (localStorage.getItem("listOfProducts") == null) {
            let quantity = 0;
            quantity += 1;
            shoppingCartlocalStorage[element.id] = quantity;
            localStorage.setItem("listOfProducts", JSON.stringify(shoppingCartlocalStorage));
            showQuantityOfItems();
            // en caso de que si exista un item llamado listOfProducts en el local storage
            // obtiene ese objeto JSON, lo transforma a un objeto de JS y lo almacena 
            // en una variable llamda listOfProductsJS
            // declara la variable quantity como el número que está asociado 
            // al id igual a element.id (el producto que se cliqueo)
            // se le suma uno a quantity
            // y vuelve a establecer en el localStorage el objeto listOfProductsJS actualizado
            // con el nombre de listOfProducts
        } else {
            const listOfProductsJSON = localStorage.getItem("listOfProducts");
            const listOfProductsJS = JSON.parse(listOfProductsJSON);
            let quantity = listOfProductsJS[element.id];
            // ACTUALIZACION 29-dic: PERMITE QUE SI YA EXISTE EL ITEM ListOfProducts 
            // EN EL LOCAL STORAGE, ENTONCES 
            // AL PULSAR EL BOTON DE + DE UN PRODUCTO QUE NO ESTABA EN EL
            // LOCAL STORAGE QUE SE PULSABA NO SUME UNO A NULL O UNDEFINED , EVITANDO ASI ERRORES
            if (quantity == undefined || quantity == null) {
                quantity = 1;
            } else {
                quantity += 1;
            }
            listOfProductsJS[element.id] = quantity;
            localStorage.setItem("listOfProducts", JSON.stringify(listOfProductsJS));
            showQuantityOfItems();
        }
        // Si estando en el carrito, se pulsa el boton + del producto (se incrementó en uno el quantity
        // del producto en listOfProducts por el código anterior)
        // entonces, con la función arrayOfProductsWithQuantityInShoppingCart, generamos un nuevo arreglo 
        // que contiene objetos con las propiedades de los 
        // productos y en cada uno,
        // una propiedad adicional llamada quantity, proveniente del numero asociado al
        // la propiedad con el mismo id del producto en el listOfProducts. 
        //  por ejemplo [{name: cafe americano,..., quantity: 5}, {name: panini italiano,...,quantity:1}]
        // y con dicho arreglo, usando la funcion updateQuantityAndSubtotalInnerHtml,
        // actualiza el HTML de las tarjetas del shopping cart 
        if (document.getElementById(`span-with-product-quantity-${element.id}`) != null) {
            const arrayOfProductObjectsToBuyWithQuantity = arrayOfProductsWithQuantityInShoppingCart("listOfProducts", "fileJsonToLocalStorage");
            updateQuantityAndSubtotalInnerHtml(arrayOfProductObjectsToBuyWithQuantity, element);
        }
    });
}

/**
 *  Agrega al objeto shoppingCartlocalStorage (en nuestro caso, 
 *  siempre es "listOfProducts") el id del producto y su cantidad {id:cantidad},
 *  restando la cantidad en uno cada vez que se pulsa el botón de - del producto seleccionado.
 * 
 *  Además, actuliza el DOM del producto en la página del carrito.
 * @param {Object} element 
 * @param {Object} shoppingCartlocalStorage 
 */
export async function deleteProductsOfShoppingCart(element) {
    // variable que obtiene la referencia del boton - creado por MenuCard.kaffiCard()
    let buttonDel = document.getElementById(`btn-del-product-${element.id}`);
    // evento asociado al click en el boton de -
    buttonDel.addEventListener("click", function (event) {
        event.preventDefault();
        // Si no hay un item llamado listOfProducts en el local storage o es un objeto vacío
        if (localStorage.getItem("listOfProducts") == null || JSON.parse(localStorage.getItem("listOfProducts")) == {}) {
            showQuantityOfItems();
            // en caso de que si exista un item llamado listOfProducts en el local storage
            // obtiene ese objeto JSON, lo transforma a un objeto de JS y lo almacena 
            // en una variable llamda listOfProductsJS.
            // Declara la variable quantity como el número que está asociado 
            // al id igual a element.id (el producto que se cliqueo)
            // se le resta uno a quantity en caso de que la cantidad sea mayor a 0
            // y vuelve a establecer en el localStorage el objeto listOfProductsJS actualizado
            // con el nombre de listOfProducts
        } else {
            const listOfProductsJSON = localStorage.getItem("listOfProducts");
            const listOfProductsJS = JSON.parse(listOfProductsJSON);
            let quantity = listOfProductsJS[element.id];
            // si se cliqea - sobre un producto que no esta en listOfProducts del local Storage, no hacer nada
            if (quantity == undefined || quantity == null) {
            } else {  // de lo contrario, si la cantidad es mayor a cero, restar uno, si no, establecer en //cero, qunantity 
                quantity > 0 ? quantity -= 1 : quantity = 0;
                listOfProductsJS[element.id] = quantity;

                // si la cantidad del producto que se cliqueo es igual a cero,
                // borrar el producto con el mismo id en el local storage listOfProducts
                // Pero si uno esta en la pagina del carrito, eliminar la tarjeta de la página
                if (quantity == 0) {
                    if (document.getElementById(`card-of-element-${element.id}`) != null) {
                        const cardOfProductToDelete = document.getElementById(`card-of-element-${element.id}`);
                        cardOfProductToDelete.style.display = 'none';
                        delete listOfProductsJS[element.id];
                        // CODIGO PARA MOSTRAR QUE EL CARRITO ESTA VACÍO SI DESPUES DE PULSAR EL 
                        // BOTON DE - YA NO QUEDÓ NINGÚN ID CON CANTIDAD
                        if (Object.keys(listOfProductsJS).length == 0) {
                            console.log("carrito vacio");
                        }
                    } else {
                        delete listOfProductsJS[element.id];
                    }
                }

                localStorage.setItem("listOfProducts", JSON.stringify(listOfProductsJS));

                showQuantityOfItems();
            }
        }
        // Si estando en el carrito, se pulsa el boton - del producto (se decrementó en uno el quantity
        // del producto en listOfProducts por el código anterior)
        // entonces, con la función arrayOfProductsWithQuantityInShoppingCart, generamos un nuevo arreglo 
        // que contiene objetos con las propiedades de los 
        // productos y en cada uno,
        // una propiedad adicional llamada quantity, proveniente del numero asociado al
        // la propiedad con el mismo id del producto en el listOfProducts. 
        //  por ejemplo [{name: cafe americano,..., quantity: 5}, {name: panini italiano,...,quantity:1}]
        // y con dicho arreglo, usando la funcion updateQuantityAndSubtotalInnerHtml,
        // actualiza el HTML de las tarjetas del shopping cart 
        if (document.getElementById(`span-with-product-quantity-${element.id}`) != null) {
            console.log("entre aqui");
            const arrayOfProductObjectsToBuyWithQuantity = arrayOfProductsWithQuantityInShoppingCart("listOfProducts", "fileJsonToLocalStorage");
            updateQuantityAndSubtotalInnerHtml(arrayOfProductObjectsToBuyWithQuantity, element);

        }
    });
}

/**
 * Establece en cero la cantidad asociada al producto con el mismo id de listOfProducts, por ejemplo {3:0}.
 * Borra de listOfProducts el elemento y elimina la tarjeta del producto en la página del shopping cart
 * @param {Object} element 
 */
export function deleteAllItemsOfProductClickedFromShoppingCart(element) {
    // variable que obtiene la referencia del boton Eliminar creado por showShoppingCard()
    let buttonClearOut = document.getElementById(`delete-all-products-id-${element.id}`);
    buttonClearOut.addEventListener("click", function (event) {
        event.preventDefault();
        // Obtiene el item llamado listOfProducts en el local storage
        // obtiene ese objeto JSON, lo transforma a un objeto de JS y lo almacena 
        // en una variable llamda listOfProductsJS
        const listOfProductsJSON = localStorage.getItem("listOfProducts");
        const listOfProductsJS = JSON.parse(listOfProductsJSON);
        // al ser quantity igual a cero, borra toda la propiedad del objeto y su valor asociado de
        // lisOfProducts
        delete listOfProductsJS[element.id];
        // CODIGO PARA MOSTRAR QUE EL CARRITO ESTA VACÍO SI DESPUES DE PULSAR EL 
        // BOTON DE ELIMINAR YA NO QUEDÓ NINGÚN ID CON CANTIDAD
        if (Object.keys(listOfProductsJS).length == 0) {
            console.log("carrito vacio");
        }
        // guarda el item en el local storage como "listOfProducts"
        localStorage.setItem("listOfProducts", JSON.stringify(listOfProductsJS));
        // Obtiene la referencia de la tarjeta del producto en la página del carrito y establece su estilo 
        // como none 
        const cardOfProductToDelete = document.getElementById(`card-of-element-${element.id}`);
        cardOfProductToDelete.style.display = 'none';


        showQuantityOfItems();
    });

}

/**
 * muestra la cantidad de items almacenados en el item "listOfProducts" del 
 * localStorage, en el header, en el elemento span con id "total-number-items".
 */
export function showQuantityOfItems() {
    const listOfProductsJSON = localStorage.getItem("listOfProducts");
    const listOfProductsJS = JSON.parse(listOfProductsJSON);
    let totalQuantityOfItems = 0;

    // por cada producto que haya en pr
    for (const key in listOfProductsJS) {
        totalQuantityOfItems += listOfProductsJS[key];
    }
    const numberItemsIcon = document.getElementById("total-number-items");
    numberItemsIcon.innerHTML = totalQuantityOfItems;
}

/**
 * Recibe como parámetros los JSON del localStorage listOfPorducts y fileJsonToLocalStorage
 * Devuelve un arreglo que contiene objetos de los products cuyo id se encuentra en listOfProducts
 * y que son muy similares a los de la clase Product con la 
 * propiedad adicional de quantity, cuyo valor se obtiene del valor asociado al id del producto en 
 * listOfProducts
 * @param {JSON} nameOfListOfProductsToBuy 
 * @param {JSON} nameOfItemOfProducts 
 * @returns 
 */
export function arrayOfProductsWithQuantityInShoppingCart(nameOfListOfProductsToBuy, nameOfItemOfProducts) {
    // obtenemos del local storage el objeto listOfProducts que contiene los id's como atributos y 
    // la cantidad de éstos para comprar, 
    // lo convertimos a un objeto JS con parse y lo guardamos en la variable productsToBuy
    const idOfProductsToBuyInLocalStorageJSON = localStorage.getItem(nameOfListOfProductsToBuy);
    const productsToBuyJS = JSON.parse(idOfProductsToBuyInLocalStorageJSON);
    // también obtenemos del local storage el item que contiene objetos de la clase
    // product, lo convertimos en un objeto de JS y lo almacenamos en una variable 
    // llamada objectsProductJS 
    const objectsProductJSON = localStorage.getItem(nameOfItemOfProducts);
    const objectsProductJS = JSON.parse(objectsProductJSON);

    // areglo que contendrá todos los objetos de tipo producto que el usuario eligió para llevar
    const arrayOfProductObjectsToBuyWithQuantity = [];

    // si hay elementos en el item de listOfProducts (productsToBuyJS), procedemos a realizar lo siguiente
    if (productsToBuyJS != null) {
        const arrayOfKeys = Object.keys(productsToBuyJS);
        for (let i = 0; i < arrayOfKeys.length; i++) {
            // por cada elemento que este en local storage en el item de listOfProducts (productsToBuyJS),
            // si la cantidad a comprar de ese elemento es distinta de cero,
            // obtemos del local storage el objeto de la clase producto con el mismo id y lo guardamos 
            // en el arreglo arrayOfProductObjectsToBuyWithQuantity
            arrayOfProductObjectsToBuyWithQuantity.push(findObjectById(objectsProductJS, parseInt(arrayOfKeys[i])));
            // a cada objeto dentro del arreglo arrayOfProductsWithQuantityToBuy le agregamos un atributo 
            // llamado cantidad
            arrayOfProductObjectsToBuyWithQuantity[i]["quantity"] = parseInt(productsToBuyJS[(arrayOfKeys[i])]);
        }

        // retorna el arreglo
        showQuantityOfItems();
        return arrayOfProductObjectsToBuyWithQuantity;
    }
}

/**
 * Después de haber pulsado el botón + o - en cierto producto, actualiza
 * las etiquetas span y h6 del producto a los valores actualies de cantidad y subtotal
 * respectivamente
 * @param {Array} arrayOfProductObjectsToBuyWithQuantity 
 * @param {Object} element 
 */
function updateQuantityAndSubtotalInnerHtml(arrayOfProductObjectsToBuyWithQuantity, element) {
    // obtenemos las referencias de las etiquetas span y h6 de la página del carrito del elemento pulsado
    let spanWithProductQuantity = document.getElementById(`span-with-product-quantity-${element.id}`);
    let h6WithSubtotalPrice = document.getElementById(`product-subtotal-${element.id}`);
    // utilizando el arreglo que contiene objetos, cada uno con información del producto incluyendo la 
    // cantidad
    arrayOfProductObjectsToBuyWithQuantity.forEach(product => {
        if (element.id == product.id) {
            // asignamos el valor del span que contiene la cantidad, la actual cantidad del producto
            // y al h6 el subtotal real
            spanWithProductQuantity.innerHTML = product.quantity;
            h6WithSubtotalPrice.innerHTML = `Subtotal(${product.quantity} ) Producto(s) : $ ${product.price * product.quantity}`
        }
    });
}

/**
 *  Encuentra el objeto en el arreglo que tiene todas los objetos de tipo Product (fileJsonToLocalStorage
 *  cuyo atributo id es el mismo que nosotros buscamos
 * @param {Array} jsonData 
 * @param {Number} itemId 
 * @returns 
 */
function findObjectById(jsonData, itemId) {
    // por cada categoria en el item del local storage donde tenemos almacenados los objetos de 
    for (const categoryKey in jsonData) {
        //obtenemos el arreglo de los productos asociados a esa categoria y lo almacenamos
        // en la variable categoryItems
        if (jsonData.hasOwnProperty(categoryKey)) {
            const categoryItems = jsonData[categoryKey];
            // itera sobre el arreglo en busca del objeto con el item igual al itemId que nosotros 
            // buscamos
            const foundItem = categoryItems.find(item => item.id === itemId);
            // retorna el objeto de la clase producto si es encontrado
            if (foundItem) {
                return foundItem;
            }
        }
    }
    // de lo contrario retornamos null
    return null;
}