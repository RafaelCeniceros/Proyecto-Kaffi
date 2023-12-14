import Producto from "./product-class.js";

const url = '../../productos-menu.json';


const saveProductsInLocalStorage = async (url) => {
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
  
await saveProductsInLocalStorage(url);