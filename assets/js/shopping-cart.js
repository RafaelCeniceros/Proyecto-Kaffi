console.log("shoopingcart.js");

import ShoppingCard from "./shopping-cart-card.js";
import { addProductsToShoppingCart, deleteProductsOfShoppingCart, showQuantityOfItems, deleteAllItemsOfProductClickedFromShoppingCart, arrayOfProductsWithQuantityInShoppingCart } from "./add-delete-products-to-ls.js";
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
  totalPriceCar.textContent = "$ " + sumaSubtotales + ".00";
};

const updateTotalProducts = () => {
  const totalProductsCar = document.getElementById("total-products-car");
  if (totalProductsCar !== null) {
    totalProductsCar.textContent = "Total de Productos : " + document.getElementById("total-number-items").textContent;
  }

};

/* Se declaran globalmente los IDs de las sugerencias */
let randomID1, randomID2;

document.addEventListener("DOMContentLoaded", function () {
  updateTotalPriceProducts();
  updateTotalProducts();
  showSuggestions();
});


/* Codigo del boton "Proceder a Pagar" */
/* 
Si hay elementos en el carrito, se redirige al formulario y se guarda el precio total en el localStorage
*/
const payButton = document.getElementById("pay-button");
payButton.addEventListener('click', event => {
  event.preventDefault();
  const totalItemsInCar = document.getElementById("total-number-items").textContent;
  const totalPriceCar = document.getElementById("total-price-car");
  if (parseInt(totalItemsInCar) != 0) {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    if (accessToken) {
      console.log("Inicio de sesion detectado");
      if (accessToken.userType === 2) {
        localStorage.setItem("PaymentTotalInfo", totalPriceCar.textContent);
        window.location.href = "../pages/payment-form.html";
      }
      else{
      console.log("Usuario Administrador no puede realizar compras")
      }
    }else{
      const modal = document.getElementById('myModal');
      const closeModalSpan = document.getElementsByClassName('close')[0];
      modal.style.display = 'block';
      closeModalSpan.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });
    }






  }
})
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
    document.getElementById("img-empty-car").style.display = "none";
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
    document.getElementById("img-empty-car").style.display = "flex";
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

/* Obtener un array con los IDs de los todos los productos existentes */
function getListOfProductIDs() {
  const productsInLocalStorageJSON = localStorage.getItem("fileJsonToLocalStorage");
  const objectProductsJS = JSON.parse(productsInLocalStorageJSON);

  if (!objectProductsJS) {
    console.error('No hay datos en el almacenamiento local.');
    return [];
  }

  // Obtener todos los productos de todas las categorías en un solo arreglo
  const allProducts = Object.values(objectProductsJS).reduce((accumulator, category) => {
    return accumulator.concat(category);
  }, []);

  // Obtener todos los productos ID en un arreglo
  const ProductIDs = allProducts.map(product => product.id);

  return ProductIDs;

}
/* Obtener un ID aleatorio de la lista de Products IDs */
function getRandomID(arrayWithIDs) {
  // Check if the input array is not empty
  if (arrayWithIDs.length === 0) {
    return null; // or any other appropriate value
  }

  // Generate a random index within the length of the array
  const randomIndex = Math.floor(Math.random() * arrayWithIDs.length);

  // Return the random ID from the array
  return arrayWithIDs[randomIndex];
}
// Función para obtener la información del producto por ID
function getProductById(productId) {
  const productsInLocalStorageJSON = JSON.parse(localStorage.getItem("fileJsonToLocalStorage"));
  for (let category in productsInLocalStorageJSON) {
    let products = productsInLocalStorageJSON[category];
    let product = products.find(p => p.id === productId);
    if (product) {
      return product;
    }
  }
  return null;
}
/* Obtener un array con los IDs de los productos que estan en el carrito */
function getListOfProductIDsOnShoppingCart(listOfProducts) {
  // Inicializa una lista para almacenar los IDs de productos
  const productIDs = [];

  // Recorre las claves del objeto listOfProducts
  for (const productID in listOfProducts) {
    // Verifica si la clave es propia del objeto (no heredada)
    if (listOfProducts.hasOwnProperty(productID)) {
      // Agrega el ID del producto a la lista
      productIDs.push(productID);
    }
  }

  // Retorna la lista de IDs de productos
  return productIDs;
}

function showSuggestions() {
  const imgSuggestion1 = document.getElementById("img-suggestion-1");
  const imgSuggestion2 = document.getElementById("img-suggestion-2");
  const imgSuggestion1sm = document.getElementById("img-suggestion-1-sm");
  const imgSuggestion2sm = document.getElementById("img-suggestion-2-sm");
  const listOfProducts = JSON.parse(localStorage.getItem("listOfProducts"));

  const productIDsOnShoppingCart = getListOfProductIDsOnShoppingCart(listOfProducts);
  do {
    // Obtén dos IDs aleatorios
    randomID1 = getRandomID(getListOfProductIDs());
    randomID2 = getRandomID(getListOfProductIDs());

    // Verifica que los IDs sean diferentes y ninguno esté en el carrito de compras
  } while (randomID1 === randomID2 || productIDsOnShoppingCart.includes(randomID1) || productIDsOnShoppingCart.includes(randomID2));
  // randomID1 y randomID2 son dos IDs diferentes y ninguno está en el carrito de compras


  // Obtener la información del producto para los dos números aleatorios
  let infoProduct1 = getProductById(randomID1);
  let infoProduct2 = getProductById(randomID2);

  // Obtener las imágenes de los productos
  let imageSuggestedProduct1 = infoProduct1 ? infoProduct1.image : null;
  let imageSuggestedProduct2 = infoProduct2 ? infoProduct2.image : null;
  // Ahora image1 y image2 contienen las rutas de las imágenes correspondientes a los números aleatorios
  imgSuggestion1.src = imageSuggestedProduct1;
  imgSuggestion1sm.src=imageSuggestedProduct1;
  imgSuggestion2.src = imageSuggestedProduct2;
  imgSuggestion2sm.src = imageSuggestedProduct2;
}

const addSuggestion1 = document.getElementById("add-suggestion-1")
addSuggestion1.addEventListener('click', event => {
  if (localStorage.getItem("listOfProducts") == null) {
    let quantity = 0;
    quantity += 1;
    productsToBuy[randomID1] = quantity;
    localStorage.setItem("listOfProducts", JSON.stringify(productsToBuy));
    showQuantityOfItems();
    updateTotalPriceProducts();
    updateTotalProducts();
  } else {
    const listOfProductsJSON = localStorage.getItem("listOfProducts");
    const listOfProductsJS = JSON.parse(listOfProductsJSON);
    let quantity = listOfProductsJS[randomID1];
    if (quantity == undefined || quantity == null) {
      quantity = 1;
    } else {
      quantity += 1;
    }
    listOfProductsJS[randomID1] = quantity;
    localStorage.setItem("listOfProducts", JSON.stringify(listOfProductsJS));
    showQuantityOfItems();
    updateTotalPriceProducts();
    updateTotalProducts();
  }

  const arrayOfProductsWithQuantityToBuy = arrayOfProductsWithQuantityInShoppingCart("listOfProducts", "fileJsonToLocalStorage");
  showInDOM(arrayOfProductsWithQuantityToBuy);
  location.reload();
})

const addSuggestion2 = document.getElementById("add-suggestion-2")
addSuggestion2.addEventListener('click', event => {
  event.preventDefault();
  if (localStorage.getItem("listOfProducts") == null) {
    let quantity = 0;
    quantity += 1;
    productsToBuy[randomID2] = quantity;
    localStorage.setItem("listOfProducts", JSON.stringify(productsToBuy));
    showQuantityOfItems();
    updateTotalPriceProducts();
    updateTotalProducts();
  } else {
    const listOfProductsJSON = localStorage.getItem("listOfProducts");
    const listOfProductsJS = JSON.parse(listOfProductsJSON);
    let quantity = listOfProductsJS[randomID2];
    if (quantity == undefined || quantity == null) {
      quantity = 1;
    } else {
      quantity += 1;
    }
    listOfProductsJS[randomID2] = quantity;
    localStorage.setItem("listOfProducts", JSON.stringify(listOfProductsJS));
    showQuantityOfItems();
    updateTotalPriceProducts();
    updateTotalProducts();
  }
  const arrayOfProductsWithQuantityToBuy = arrayOfProductsWithQuantityInShoppingCart("listOfProducts", "fileJsonToLocalStorage");
  showInDOM(arrayOfProductsWithQuantityToBuy);
  location.reload();
})

const addSuggestion1sm = document.getElementById("add-suggestion-1-sm")
addSuggestion1sm.addEventListener('click', event => {
  if (localStorage.getItem("listOfProducts") == null) {
    let quantity = 0;
    quantity += 1;
    productsToBuy[randomID1] = quantity;
    localStorage.setItem("listOfProducts", JSON.stringify(productsToBuy));
    showQuantityOfItems();
    updateTotalPriceProducts();
    updateTotalProducts();
  } else {
    const listOfProductsJSON = localStorage.getItem("listOfProducts");
    const listOfProductsJS = JSON.parse(listOfProductsJSON);
    let quantity = listOfProductsJS[randomID1];
    if (quantity == undefined || quantity == null) {
      quantity = 1;
    } else {
      quantity += 1;
    }
    listOfProductsJS[randomID1] = quantity;
    localStorage.setItem("listOfProducts", JSON.stringify(listOfProductsJS));
    showQuantityOfItems();
    updateTotalPriceProducts();
    updateTotalProducts();
  }

  const arrayOfProductsWithQuantityToBuy = arrayOfProductsWithQuantityInShoppingCart("listOfProducts", "fileJsonToLocalStorage");
  showInDOM(arrayOfProductsWithQuantityToBuy);
  location.reload();
})

const addSuggestion2sm = document.getElementById("add-suggestion-2-sm")
addSuggestion2sm.addEventListener('click', event => {
  event.preventDefault();
  if (localStorage.getItem("listOfProducts") == null) {
    let quantity = 0;
    quantity += 1;
    productsToBuy[randomID2] = quantity;
    localStorage.setItem("listOfProducts", JSON.stringify(productsToBuy));
    showQuantityOfItems();
    updateTotalPriceProducts();
    updateTotalProducts();
  } else {
    const listOfProductsJSON = localStorage.getItem("listOfProducts");
    const listOfProductsJS = JSON.parse(listOfProductsJSON);
    let quantity = listOfProductsJS[randomID2];
    if (quantity == undefined || quantity == null) {
      quantity = 1;
    } else {
      quantity += 1;
    }
    listOfProductsJS[randomID2] = quantity;
    localStorage.setItem("listOfProducts", JSON.stringify(listOfProductsJS));
    showQuantityOfItems();
    updateTotalPriceProducts();
    updateTotalProducts();
  }
  const arrayOfProductsWithQuantityToBuy = arrayOfProductsWithQuantityInShoppingCart("listOfProducts", "fileJsonToLocalStorage");
  showInDOM(arrayOfProductsWithQuantityToBuy);
  location.reload();
})

const userLoginButton = document.getElementById("enlace-login-header");
userLoginButton.addEventListener("click", event => {
  event.preventDefault();
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  if (accessToken) {
    console.log("Inicio de sesion detectado");
    console.log("UserType:" + accessToken.userType);
    if (accessToken.userType === 1) {
      window.location.href = "../pages/admin-profile.html";
    } else if (accessToken.userType === 2) {
      window.location.href = "../pages/profile.html";
    }
  }
  else {
    console.log("Inicio de sesion no detectado");
      window.location.href = "../pages/login.html#login-container";
    }
})