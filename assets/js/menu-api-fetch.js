console.log("menu.js");

import Producto from "./product-class.js";
import MenuCard from "./menu-card-class.js";

const url = '../../productos-menu.json';


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
  getProductsUsingFetch(url, 'Cafes');
});

anchorDrinks.addEventListener('click', function (event) {
  event.preventDefault();
  getProductsUsingFetch(url, 'Bebidas');
});

anchorFrappes.addEventListener('click', function (event) {
  event.preventDefault();
  getProductsUsingFetch(url, 'Frappes');
});

anchorEspecialidades.addEventListener('click', function (event) {
  event.preventDefault();
  getProductsUsingFetch(url, 'Especialidades');
});

anchorBagels.addEventListener('click', function (event) {
  event.preventDefault();
  getProductsUsingFetch(url, 'Bagels');
});

anchorPaninis.addEventListener('click', function (event) {
  event.preventDefault();
  getProductsUsingFetch(url, 'Paninis');
});

anchorCuernitos.addEventListener('click', function (event) {
  event.preventDefault();
  getProductsUsingFetch(url, 'Cuernitos');
});

anchorWaffles.addEventListener('click', function (event) {
  event.preventDefault();
  getProductsUsingFetch(url, 'Waffles');
});

anchorPanes.addEventListener('click', function (event) {
  event.preventDefault();
  getProductsUsingFetch(url, 'Panes');
});

getProductsUsingFetch(url, 'Cafes');


async function getProductsUsingFetch(url, category) {
  await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then(function mostrarObjetos(products) {
       
      const arrayProductsObj = products[category].map(element =>
        new Producto(
          element.id,
          element.nombre,
          element.categoria,
          element.precio,
          element.descripcion,
          element.imagen
        ));
      imprimirEnDOM(arrayProductsObj);
        })
    .catch((error) => {
      console.log(error);

    })
}

function imprimirEnDOM(products) {
  const productsContainer = document.getElementById("products");

  const productsTitle = products.map(
    (element) => new MenuCard (element.name, element.price, element.description, element.image).kaffiCard());

  productsContainer.innerHTML = productsTitle.join("");
}