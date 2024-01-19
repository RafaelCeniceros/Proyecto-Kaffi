import saveProductsInLocalStorage from "./saveProductsInLocalStorage.js";
import { showQuantityOfItems } from "./add-delete-products-to-ls.js";

const url = 'http://localhost:8080/api/v1/products';

await saveProductsInLocalStorage(url);

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
        window.location.href = "./assets/pages/admin-profile.html";
      } else if (accessToken.userType === 2) {
        window.location.href = "./assets/pages/profile.html";
      }
    }
  } else {
    window.location.href = "./assets/pages/login.html#login-container";
  }
});


showQuantityOfItems();


