console.log("menu.js");

import MenuCard from "./menu-card-class.js";
import saveProductsInLocalStorage from "./saveProductsInLocalStorage.js";
import {addProductsToShoppingCart,deleteProductsOfShoppingCart,showQuantityOfItems,updateQuantityCardMenu} from "./add-delete-products-to-ls.js";
import { productsToBuy } from "./products-to-buy-object.js";

const url = 'https://kaffi-ecommerce.onrender.com/api/v1/products';


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


// funcion que muestra los productos almacenados en el Local, en el DOM
// el argumento que se usara para el parametro nameOfItemInLocalStorage es "fileJsonToLocalStorage" y la categoria depende del boton que se pulse
function showProductsFromLocalStorage(nameOfItemInLocalStorage, category) {
  // obtiene los productos de localStorage (recordar que el arreglo de productos)
  // asociado a cada categoria es un arreglo de objetos de la clase Produtc
  const productsInLocalStorageJSON = localStorage.getItem(nameOfItemInLocalStorage);
  const productsJS = JSON.parse(productsInLocalStorageJSON);
  // muestra en el DOM las tarjetas creadas por el metodo kaffiCard de la clase MenuCard
  //console.log(productsJS);
  imprimirEnDOM(productsJS[category]);
  // agrega o elimina productos en el objeto productsToBuy y lo almacena en el 
  // localStorage con nombre "listOfProducts"
  addAndDeleteShoppingCartProduct(productsJS, category);
  
}

await saveProductsInLocalStorage(url);
showProductsFromLocalStorage("fileJsonToLocalStorage","Cafes");


// incrementa o decrementa en una unidad la cantidad asociado a un producto en el
// objeto productsToBuy al pulsar sobre el boton +/-
// Además, muestra en en el header la cantidad total de items que se quieren comprar
function addAndDeleteShoppingCartProduct(arrayOfObjectsProducts,category) {
  arrayOfObjectsProducts[category].forEach(element => {
    addProductsToShoppingCart(element, productsToBuy);
    showQuantityOfItems();
    deleteProductsOfShoppingCart(element);
    showQuantityOfItems(); 
    if (localStorage.getItem("listOfProducts") != null) {
      updateQuantityCardMenu(element);
    }
  })
  
}

function imprimirEnDOM(products) {
  const productsContainer = document.getElementById("products");

  const productsTitle = products.map(
    (element) => new MenuCard(element.id, element.name, element.price, element.description, element.image).kaffiCard());
  
  productsContainer.innerHTML = productsTitle.join("");


}

const userLoginButton = document.getElementById("enlace-login-header");
userLoginButton.addEventListener("click", event => {
  event.preventDefault();
  // Obtener el accessToken encriptado desde el localStorage
  const encryptedAccessToken = localStorage.getItem('accessToken');

  if (encryptedAccessToken) {
    // Clave secreta para desencriptar (debería ser la misma que usaste para encriptar)
    const secretWord = "CodeTitansRafaFerValdoAlan";
    // Desencriptar el accessToken con CryptoJS
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedAccessToken, secretWord);
    // Convertir los bytes desencriptados a cadena JSON
    const decryptedAccessTokenJSON = decryptedBytes.toString(CryptoJS.enc.Utf8);
    // Parsear la cadena JSON a un objeto JavaScript
    const accessToken = JSON.parse(decryptedAccessTokenJSON);
    if (accessToken) {
      console.log("Inicio de sesion detectado")
      console.log("UserType:" + accessToken.userType);
      if (accessToken.userType === 1) {
        window.location.href = "../pages/admin-profile.html";
      } else if (accessToken.userType === 2) {
        window.location.href = "../pages/profile.html";
      }
    }
  } else {
    window.location.href = "../pages/login.html#login-container";
  }
});