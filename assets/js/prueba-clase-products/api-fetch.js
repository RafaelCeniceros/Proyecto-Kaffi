import Producto from "./product-class.js";
import Card from "./card-class.js";

const getProductsUsingFetch = async (url) => {
    await fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(function mostrarObjetos(products) {
            // noten la diferencia enre products y arrayProductsObj
            /*
                mientras que products es basicamente el mismo JSON
                (arreglo de objetos genéricos de JavaScript) pero en entendible para JavaScript,

                arrayProductsObj es un arreglo de objetos, pero no son cualquier objeto de JS, son objetos de la clase Producto, con sus atributos nombrados de manera distinta al JSON
            */
            console.log(products); 
            const arrayProductsObj = products.map( element => 
                new Producto(
                    element.id,
                    element.nombre,
                    element.categoria,
                    element.precio,
                    element.descripcion,
                    element.imagen
                )
            );
            console.log(arrayProductsObj);
            imprimirEnDOM(arrayProductsObj);
        })
        .catch((error) => {
            console.log(error);

        })


}

function imprimirEnDOM(products) {
    const productsContainer = document.getElementById("products-container");

    const productsTitle = products.map(
        (element) => new Card(element.name, element.price, element.description, element.image).kaffiCard());

    productsContainer.innerHTML = productsTitle.join("");
}

getProductsUsingFetch('./lista-productos.json');

