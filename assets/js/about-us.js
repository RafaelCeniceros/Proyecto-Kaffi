const botonHistoria = document.getElementById("button-history");
const botonValores = document.getElementById("button-values");
const textoHistoria = document.getElementById("history-text");
const textoValores = document.getElementById("values-text");

import saveProductsInLocalStorage from "./saveProductsInLocalStorage.js";
const url = '../../productos-menu.json';
await saveProductsInLocalStorage(url);

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