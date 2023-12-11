console.log("menu.js");

import Producto from "../js/product-class.js";
import MenuCard from "../js/menu-card-class.js";

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
  getProductsUsingFetch(url, 'coffee');
});

anchorDrinks.addEventListener('click', function (event) {
  event.preventDefault();
  getProductsUsingFetch(url, 'bebidas');
});

anchorFrappes.addEventListener('click', function (event) {
  event.preventDefault();
  getProductsUsingFetch(url, 'frappes');
});

anchorEspecialidades.addEventListener('click', function (event) {
  event.preventDefault();
  getProductsUsingFetch(url, 'especialidades');
});

anchorBagels.addEventListener('click', function (event) {
  event.preventDefault();
  getProductsUsingFetch(url, 'bagels');
});

anchorPaninis.addEventListener('click', function (event) {
  event.preventDefault();
  getProductsUsingFetch(url, 'paninis');
});

anchorCuernitos.addEventListener('click', function (event) {
  event.preventDefault();
  getProductsUsingFetch(url, 'cuernitos');
});

anchorWaffles.addEventListener('click', function (event) {
  event.preventDefault();
  getProductsUsingFetch(url, 'waffles');
});

anchorPanes.addEventListener('click', function (event) {
  event.preventDefault();
  getProductsUsingFetch(url, 'panes');
});

getProductsUsingFetch(url, 'coffee');


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
        )
      );
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