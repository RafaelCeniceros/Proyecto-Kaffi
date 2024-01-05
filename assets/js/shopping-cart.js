console.log("shoopingcart.js");

import ShoppingCard from "./shopping-cart-card.js";
import { addProductsToShoppingCart, deleteProductsOfShoppingCart, showQuantityOfItems, deleteAllItemsOfProductClickedFromShoppingCart, arrayOfProductsWithQuantityInShoppingCart} from "./add-delete-products-to-ls.js";
import { productsToBuy } from "./products-to-buy-object.js";


await showProductsToBuyFromLocalStorage("listOfProducts", "fileJsonToLocalStorage");

const updateTotalPriceProducts = () => {
  const totalPriceCar = document.getElementById("total-price-car");

  // Paso 1: Selecciona todos los elementos con la clase product-subtotal
  let elementos = document.querySelectorAll('.product-subtotal');

  // Paso 2: Itera sobre los elementos y obtén la parte después del "$"
  let sumaSubtotales = 0;
  elementos.forEach(elemento => {
    // Divide la cadena usando "$" como separador y obtén la segunda parte
    let partes = elemento.textContent.split('$');
    if (partes.length === 2) {
      let valor = parseInt(partes[1], 10);
      // Asegúrate de que el valor sea un número antes de sumarlo
      if (!isNaN(valor)) {
        sumaSubtotales += valor;
      }
    }
  });

  // Paso 3: Muestra el resultado de la suma
  totalPriceCar.textContent = "$: " + sumaSubtotales;
};

const updateTotalProducts = () => {
  const totalProductsCar = document.getElementById("total-products-car");
  if (totalProductsCar !== null) {
      totalProductsCar.textContent = "Total de Productos : " + document.getElementById("total-number-items").textContent;
  }

};

document.addEventListener("DOMContentLoaded", function() {
  updateTotalPriceProducts();
  updateTotalProducts();
});

/**
 * Muestra en el HTML las tarjetas con los productos que seleccionó en el Menú.
 * Adicionalmente, puede agregar o eliminar cantidad de cada producto o eliminarlo completamente
 * @param {JSON} nameOfListOfProductsToBuy 
 * @param {JSON} nameOfItemOfProducts 
 */
async function showProductsToBuyFromLocalStorage(nameOfListOfProductsToBuy, nameOfItemOfProducts) {
  // si existe listOfProducts en el localStorage y además no es un objeto vacío
  const listOfProducts = JSON.parse(localStorage.getItem("listOfProducts"));
  if (listOfProducts && Object.keys(listOfProducts).length > 0) {
    document.getElementById("img-empty-car").style.display="none";
    // obtenemos un arreglo con todos los productos a comprar y su cantidad y con dicho arreglo, 
    // mostramos las trajetas en el HTML
    const arrayOfProductsWithQuantityToBuy = arrayOfProductsWithQuantityInShoppingCart(nameOfListOfProductsToBuy, nameOfItemOfProducts);
    showInDOM(arrayOfProductsWithQuantityToBuy);
    showQuantityOfItems();
    // además checa constantement si se cliquea en el botón +,- o eliminar de cada producto del carrtio
    arrayOfProductsWithQuantityToBuy.forEach(element => {
      addProductsToShoppingCart(element, productsToBuy);
      deleteProductsOfShoppingCart(element);
      deleteAllItemsOfProductClickedFromShoppingCart(element);
    });
  } else {
    document.getElementById("img-empty-car").style.display="flex";
  }
};



/**
 * muestra en el dom, en el div con id products-to-buy, los elementos de un arreglo dado. 
 * En nuestro caso, ese arreglo será arrayOfProductsWithQuantityToBuy,que contendrá los objetos de la clase
 * producto con un atributo adicional llamado quantity
 * dicho arreglo arrayOfProductsWithQuantityToBuy es creado en la funcion showProductsFromLocalStorage
 * @param {Array} products 
 */
function showInDOM(products) {
  const productsContainer = document.getElementById("products-to-buy");

  const productsTitle = products.map(
    (element) => new ShoppingCard(element.id, element.name, element.price, element.description,
      element.image, element.quantity).showShoppingCard());

  productsContainer.innerHTML = productsTitle.join("");
}


