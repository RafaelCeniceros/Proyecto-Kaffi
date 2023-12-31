console.log("shoopingcart.js");

import ShoppingCard from "./shopping-cart-card.js";
import { addProductsToShoppingCart, deleteProductsOfShoppingCart, showQuantityOfItems, deleteAllItemsOfProductClickedFromShoppingCart, arrayOfProductsWithQuantityInShoppingCart} from "./add-delete-products-to-ls.js";
import { productsToBuy } from "./products-to-buy-object.js";


await showProductsToBuyFromLocalStorage("listOfProducts", "fileJsonToLocalStorage");

/**
 * Muestra en el HTML las tarjetas con los productos que seleccionó en el Menú.
 * Adicionalmente, puede agregar o eliminar cantidad de cada producto o eliminarlo completamente
 * @param {JSON} nameOfListOfProductsToBuy 
 * @param {JSON} nameOfItemOfProducts 
 */
async function showProductsToBuyFromLocalStorage(nameOfListOfProductsToBuy, nameOfItemOfProducts) {
  // si existe listOfProducts en el localStorage y además no es un objeto vacío
  if (JSON.parse(localStorage.getItem("listOfProducts")) != {} && localStorage.getItem("listOfProducts") != null) {
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
    // CODIGO PARA DECIR QUE EL CARRITO ESTA VACIO
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