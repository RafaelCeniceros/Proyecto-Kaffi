console.log("menu.js");

import MenuCard from "./menu-card-class.js";
import saveProductsInLocalStorage from "./saveProductsInLocalStorage.js";

const url = '../../productos-menu.json';


const JSON_item = "fileJsonToLocalStorage";

/*
    productsToBuy = {
      id_de_producto: cantidad
    }
*/
const productsToBuy = {};


const anchorCoffee = document.getElementById("cafes");
const anchorDrinks = document.getElementById("bebidas");
const anchorFrappes = document.getElementById("frapes");
const anchorEspecialidades = document.getElementById("especialidades");
const anchorBagels = document.getElementById("bagels");
const anchorPaninis = document.getElementById("paninis");
const anchorCuernitos = document.getElementById("cuernitos");
const anchorWaffles = document.getElementById("waffles");
const anchorPanes = document.getElementById("panes");



anchorCoffee.addEventListener('click', function (event) {
  event.preventDefault();
  showProductsFromLocalStorage(JSON_item, 'Cafes');
});

anchorDrinks.addEventListener('click', function (event) {
  event.preventDefault();
  showProductsFromLocalStorage(JSON_item, 'Bebidas');
});

anchorFrappes.addEventListener('click', function (event) {
  event.preventDefault();
  showProductsFromLocalStorage(JSON_item, 'Frappes');
});

anchorEspecialidades.addEventListener('click', function (event) {
  event.preventDefault();
  showProductsFromLocalStorage(JSON_item, 'Especialidades');
});

anchorBagels.addEventListener('click', function (event) {
  event.preventDefault();
  showProductsFromLocalStorage(JSON_item, 'Bagels');
});

anchorPaninis.addEventListener('click', function (event) {
  event.preventDefault();
  showProductsFromLocalStorage(JSON_item, 'Paninis');
});

anchorCuernitos.addEventListener('click', function (event) {
  event.preventDefault();
  showProductsFromLocalStorage(JSON_item, 'Cuernitos');
});

anchorWaffles.addEventListener('click', function (event) {
  event.preventDefault();
  showProductsFromLocalStorage(JSON_item, 'Waffles');
});

anchorPanes.addEventListener('click', function (event) {
  event.preventDefault();
  showProductsFromLocalStorage(JSON_item, 'Panes');
});


// funcion que muestra los productos almacenados en el Local, en el DOM
// el argumento que se usara para el parametro nameOfItemInLocalStorage es "fileJsonToLocalStorage" y la categoria depende del boton que se pulse
function showProductsFromLocalStorage(nameOfItemInLocalStorage, category) {
  // obtiene los productos de localStorage (recordar que el arreglo de productos)
  // asociado a cada categoria es un arreglo de objetos de la clase Produtc
  const productsInLocalStorageJSON = localStorage.getItem(nameOfItemInLocalStorage);
  const productsJS = JSON.parse(productsInLocalStorageJSON);
  // muestra en el DOM las tarjetas creadas por el metodo kaffiCard de la clase MenuCard
  imprimirEnDOM(productsJS[category]);
  // agrega o elimina productos en el objeto productsToBuy y lo almacena en el 
  // localStorage con nombre "listOfProducts"
  addAndDeleteShoppingCartProduct(productsJS, category);
}

await saveProductsInLocalStorage(url);

showProductsFromLocalStorage("fileJsonToLocalStorage","Cafes");


// muestra la cantidad de items almacenados en el item "listOfProducts" del 
// localStorage, en el elemento  span con id "total-number-items"
function showQuantityOfItems() {
  const listOfProductsJSON = localStorage.getItem("listOfProducts");
  const listOfProductsJS = JSON.parse(listOfProductsJSON);
  let totalQuantityOfItems = 0;

  // por cada producto que haya en pr
  for( const key in listOfProductsJS){
    totalQuantityOfItems += listOfProductsJS[key];
  }
  const numberItemsIcon = document.getElementById("total-number-items");
  numberItemsIcon.innerHTML = totalQuantityOfItems;
  console.log(totalQuantityOfItems);
}


// incrementa o decrementa en una unidad la cantidad asociado a un producto en el
// objeto productsToBuy al pulsar sobre el boton +/-
// Además, muestra en en el header la cantidad total de items que se quieren comprar
function addAndDeleteShoppingCartProduct(arrayOfObjectsProducts,category) {
  arrayOfObjectsProducts[category].forEach(element => {
    // variable que almacena la cantidad de productos y que cambia cuando se hace click en el boton + o -
    let quantity = 0;
    // variable que obtiene la referencia del boton + creado por MenuCard.kaffiCard()
    let buttonAdd = document.getElementById(`btn-add-product-${element.id}`);
    // evento asociado al click en el boton de +.
    // Incrementa en una unidad cada vez que se pulsa y guarda en el local
    // storage el objeto productsToBuy
    // muestra el total de items que se registra en el producto
    buttonAdd.addEventListener("click",function(event) {
      event.preventDefault();
      quantity += 1; 
      productsToBuy[element.id] = quantity;
      localStorage.setItem("listOfProducts", JSON.stringify(productsToBuy));
      showQuantityOfItems();
    });
    // variable que obtiene la referencia del boton - creado por MenuCard.kaffiCard()
    let buttonDel = document.getElementById(`btn-del-product-${element.id}`);
    // evento asociado al click en el boton de -
    // Resta en una unidad cada vez que se pulsa y guarda en el local
    // storage el objeto productsToBuy
    // muestra el total de items que se registra en el producto
    buttonDel.addEventListener("click",function(event) {
      event.preventDefault();
      quantity > 0 ? quantity -= 1 : quantity -= 0;
      productsToBuy[element.id] = quantity;
      localStorage.setItem("listOfProducts", JSON.stringify(productsToBuy));
      showQuantityOfItems();
    });
    
  })
}


function imprimirEnDOM(products) {
  const productsContainer = document.getElementById("products");

  const productsTitle = products.map(
    (element) => new MenuCard(element.id, element.name, element.price, element.description, element.image).kaffiCard());

  productsContainer.innerHTML = productsTitle.join("");
}

