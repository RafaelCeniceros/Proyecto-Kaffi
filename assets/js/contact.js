const botonHistoria = document.getElementById("button-history");

const botonValores = document.getElementById("button-values");

const textoHistoria = document.getElementById("texto-historia");

const textoValores = document.getElementById("texto-values");

botonHistoria.addEventListener("click", () => {
  if (textoHistoria.style.display === "none") {
    textoHistoria.style.display = "block";
  } else {
    textoHistoria.style.display = "none";
  }
});

botonValores.addEventListener("click", () => {
    if (textoValores.style.display === "none") {
      textoValores.style.display = "block";
    } else {
      textoValores.style.display = "none";
    }
  });


