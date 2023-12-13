console.log("menu.js");

import Producto from "./product-class.js";
import MenuCard from "./menu-card-class.js";

const url = '../../productos-menu.json';


const JSON_item = "fileJsonToLocalStorage";


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




const saveProductsInLocalStorage = async (url) => {
  await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((products) => {

      const objectToJSON = {}
      for (const key in products) {
        const porductsObjectArray = products[key].map(element =>
          new Producto(
            element.id,
            element.nombre,
            element.categoria,
            element.precio,
            element.descripcion,
            element.imagen
          )
        );
        objectToJSON[key] = porductsObjectArray;
      }

      localStorage.setItem("fileJsonToLocalStorage", JSON.stringify(objectToJSON));
      
    })
    .catch(error => {
      console.log(error);
    })
}



function showProductsFromLocalStorage(nameOfItemInLocalStorage, category) {

  const productsInLocalStorageJSON = localStorage.getItem(nameOfItemInLocalStorage);
  const productsJS = JSON.parse(productsInLocalStorageJSON);

  imprimirEnDOM(productsJS[category]);

}

saveProductsInLocalStorage(url);

showProductsFromLocalStorage("fileJsonToLocalStorage","Cafes");


function imprimirEnDOM(products) {
  const productsContainer = document.getElementById("products");

  const productsTitle = products.map(
    (element) => new MenuCard(element.name, element.price, element.description, element.image).kaffiCard());

  productsContainer.innerHTML = productsTitle.join("");
}