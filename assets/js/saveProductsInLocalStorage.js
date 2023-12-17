import Producto from "./product-class.js";

export default async function saveProductsInLocalStorage (url) {

    const storedProducts = JSON.parse(localStorage.getItem('fileJsonToLocalStorage'));

    if (storedProducts) {
       
    console.log("Los productos han sido encontrados en el LocalStorage")
    
    }
    else{
        await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((products) => {
    
          const objectToJSON = {}
          for (const key in products) {
            const productsObjectArray = products[key].map(element =>
              new Producto(
                element.id,
                element.nombre,
                element.categoria,
                element.precio,
                element.descripcion,
                element.imagen
              )
            );
            objectToJSON[key] = productsObjectArray;
          }
    
          localStorage.setItem("fileJsonToLocalStorage", JSON.stringify(objectToJSON));
          
        })
        .catch(error => {
          console.log(error);
        })
    }

  }