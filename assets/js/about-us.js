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