console.log("shoopingcart.js");

import ShoppingCard from "./shopping-cart-card.js";




showProductsToBuyFromLocalStorage("listOfProducts","fileJsonToLocalStorage");

// funcion que crea un arreglo de objetos de los productos (objetos de la clase producto 
// con un atributo adicional llamado quantity) a comprar, obtenidos del item listOfProdcuts
// y muestra cada producto con una tarjeta
function showProductsToBuyFromLocalStorage(nameOfListOfProductsToBuy, nameOfItemOfProducts) {
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
    const arrayOfProductsObjectsToBuy = [];

    
    // si hay elementos en el item de listOfProducts (productsToBuyJS), procedemos a realizar lo siguiente
    if (productsToBuyJS != null) {
        const arrayOfKeys = Object.keys(productsToBuyJS);
        for (let i = 0; i < arrayOfKeys.length; i++) {
            // por cada elemento que este en local storage en el item de listOfProducts (productsToBuyJS),
            // si la cantidad a comprar de ese elemento es distinta de cero,
            // obtemos del local storage el objeto de la clase producto con el mismo id y lo guardamos 
            // en el anterior arreglo
            console.log(productsToBuyJS[arrayOfKeys[i]]);
            if (productsToBuyJS[arrayOfKeys[i]] != 0) { 
                console.log(typeof(arrayOfKeys[i]));
                arrayOfProductsObjectsToBuy.push(findObjectById(objectsProductJS,parseInt(arrayOfKeys[i])));
                // a cada objeto dentro del arreglo arrayOfProductsObjectsToBuy le agregamos un atributo llamado
                // cantidad
                arrayOfProductsObjectsToBuy[i]["quantity"] = productsToBuyJS[arrayOfKeys[i]];
            }
        }
        showInDOM(arrayOfProductsObjectsToBuy);
        updateListOfProducts(arrayOfProductsObjectsToBuy);
    } else {
        // CODIGO PARA DECIR QUE EL CARRITO ESTA VACIO
    }
    
  }

// itera sobre cada objeto producto del arreglo arrayOfProductsObjectsToBuy 
// para checar en cuál se hace click y así actualizar la cantidad de productos a 
// comprar en el local storage
function updateListOfProducts(arrayOfProductsObjectsToBuy) {
    arrayOfProductsObjectsToBuy.forEach(element => {
        addOneProductToListOfProducts(element);
        deleteOneProductOfListOfProducts(element);
    })
  }


  // funcion para incrementar en el local storage, en uno la cantidad del producto al hacer click 
  // en el boton + de la tarjeta creada por .showShoppingCard
function addOneProductToListOfProducts(element) {
    // variable que obtiene la referencia del boton + creado por ShoppingCard.showShoppingCard()
    let buttonAdd = document.getElementById(`btn-add-product-${element.id}`);
    // evento asociado al click en el boton de +.
    buttonAdd.addEventListener("click",function(event) {
      event.preventDefault();
      // Si no hay un item llamado listOfProducts en el local storage
      // declara una variable llamada quantity y la iguala a 0
      // Incrementa en una unidad a quantity cada vez que se pulsa y guarda en el local
      // storage el objeto productsToBuy
      // muestra el total de items que se registra en el producto
      if (localStorage.getItem("listOfProducts") == null) {
        let quantity = 0;
        quantity += 1; 
        productsToBuy[element.id] = quantity;
        localStorage.setItem("listOfProducts", JSON.stringify(productsToBuy));
        showProductsToBuyFromLocalStorage("listOfProducts","fileJsonToLocalStorage");
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
        quantity += 1; 
        listOfProductsJS[element.id] = quantity;
        localStorage.setItem("listOfProducts", JSON.stringify(listOfProductsJS));
        showProductsToBuyFromLocalStorage("listOfProducts","fileJsonToLocalStorage");
      }
    });
  }

  // funcion para restar en el local storage, en uno la cantidad del producto 
  // en el boton - de la tarjeta creada por .showShoppingCard
function deleteOneProductOfListOfProducts(element) {
    // variable que obtiene la referencia del boton - creado por ShoppingCard.showShoppingCard()
    let buttonDel = document.getElementById(`btn-del-product-${element.id}`);
    // evento asociado al click en el boton de -
    buttonDel.addEventListener("click",function(event) {
      // Si no hay un item llamado listOfProducts en el local storage
      // declara una variable llamada quantity y la iguala a 0
      // Resta en una unidad a quantity cada vez que se pulsa el botón y guarda 
      // en el local storage el objeto productsToBuy,
      // muestra el total de items que se registra en el producto
      event.preventDefault();
      if (localStorage.getItem("listOfProducts") == null) {
        let quantity = 0;
        quantity > 0 ? quantity -= 1 : quantity -= 0;
        productsToBuy[element.id] = quantity;
        localStorage.setItem("listOfProducts", JSON.stringify(productsToBuy));
        showProductsToBuyFromLocalStorage("listOfProducts","fileJsonToLocalStorage");
        // en caso de que si exista un item llamado listOfProducts en el local storage
        // obtiene ese objeto JSON, lo transforma a un objeto de JS y lo almacena 
        // en una variable llamda listOfProductsJS
        // declara la variable quantity como el número que está asociado 
        // al id igual a element.id (el producto que se cliqueo)
        // se le resta uno a quantity en caso de que la cantidad sea mayor a 0
        // y vuelve a establecer en el localStorage el objeto listOfProductsJS actualizado
        // con el nombre de listOfProducts
      } else {
        const listOfProductsJSON = localStorage.getItem("listOfProducts");
        const listOfProductsJS = JSON.parse(listOfProductsJSON);
        let quantity = listOfProductsJS[element.id];
        quantity > 0 ? quantity -= 1 : quantity = 0;
        listOfProductsJS[element.id] = quantity;
        localStorage.setItem("listOfProducts", JSON.stringify(listOfProductsJS));
        showProductsToBuyFromLocalStorage("listOfProducts","fileJsonToLocalStorage");
      }
    });
  }
  

// muestra en el dom, en el div con id products-to-buy, los elementos de un arreglo dado. 
// En nuestro caso, ese arreglo será arrayOfProductsObjectsToBuy,que contendrá los objetos de la clase
// producto con un atributo adicional llamado quantity
// dicho arreglo arrayOfProductsObjectsToBuy es creado en la funcion showProductsFromLocalStorage
function showInDOM(products) {
    const productsContainer = document.getElementById("products-to-buy");
  
    const productsTitle = products.map(
      (element) => new ShoppingCard(element.id, element.name, element.price, element.description, 
        element.image, element.quantity).showShoppingCard());
  
    productsContainer.innerHTML = productsTitle.join("");
}


// funcion para encontrar el objeto de la clase producto cuyo atributo id sea el mismo que nosotros
// buscamos
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