import Producto from "./product-class.js";
import Card from "./card-class.js";

const getProductsUsingFetch = async (url) => {
    await fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(function mostrarObjetos(products) {
            console.log(products["coffee"]);
            
            const arrayProductsObj = products["coffee"].map(element =>
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

getProductsUsingFetch('../../productos-menu.json');

