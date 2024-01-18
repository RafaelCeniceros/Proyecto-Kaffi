import saveProductsInLocalStorage from "./saveProductsInLocalStorage.js";
const url = '../../productos-menu-api.json';

await saveProductsInLocalStorage(url);

const userLoginButton = document.getElementById("enlace-login-header");
userLoginButton.addEventListener("click", event => {
  event.preventDefault();
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  if (accessToken) {
    console.log("Inicio de sesion detectado");
    console.log("UserType:" + accessToken.userType);
    if (accessToken.userType === 1) {
      window.location.href = "./assets/pages/admin-profile.html";
    } else if (accessToken.userType === 2) {
      window.location.href = "./assets/pages/profile.html";
    }
  }
  else {
    window.location.href = "./assets/pages/login.html#login-container";
  }
})