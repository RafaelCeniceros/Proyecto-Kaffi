const botonHistoria = document.getElementById("button-history");
const botonValores = document.getElementById("button-values");
const textoHistoria = document.getElementById("history-text");
const textoValores = document.getElementById("values-text");


// Ocultar el texto al principio
textoHistoria.style.display = "none";
textoValores.style.display = "none";

botonHistoria.addEventListener("click", () => {
  if (textoHistoria.style.display === "none") {
    textoHistoria.style.display = "block";
    botonHistoria.style.display = "none";
  } else {
    textoHistoria.style.display = "none";
    botonHistoria.style.display = "block";
  }
});

botonValores.addEventListener("click", () => {
  if (textoValores.style.display === "none") {
    textoValores.style.display = "block";
    botonValores.style.display = "none";
  } else {
    textoValores.style.display = "none";
    botonValores.style.display = "block";
  }
});


import saveProductsInLocalStorage from "./saveProductsInLocalStorage.js";
import { showQuantityOfItems } from "./add-delete-products-to-ls.js";

const url = 'https://kaffi-ecommerce.onrender.com/api/v1/products';
await saveProductsInLocalStorage(url);
showQuantityOfItems();


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