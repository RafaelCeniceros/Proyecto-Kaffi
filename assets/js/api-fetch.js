import Producto from "./product-class.js";
import Card from "./menu-card-class.js";


const url = '../../productos-menu.json';

const anchorCoffee = document.querySelectorAll(".anchor-coffee");

const anchorDrinks = document.querySelectorAll(".anchor-drinks");

const anchorFrappes = document.querySelectorAll(".anchor-frappes");

const anchorEspecialidades = document.querySelectorAll(".anchor-specialties");

const anchorBagels = document.querySelectorAll(".anchor-bagels");

const anchorPaninis = document.querySelectorAll(".anchor-paninis");

const anchorCuernitos = document.querySelectorAll(".anchor-cuernitos");

const anchorWaffles = document.querySelectorAll(".anchor-waffles");

const anchorBreads = document.querySelectorAll(".anchor-breads");



anchorCoffee.forEach(function (elemento) {
    elemento.addEventListener('click', (event) => {
        event.preventDefault();
        getProductsUsingFetch(url, 'coffee');
    })
})

anchorDrinks.forEach(function (elemento) {
    elemento.addEventListener('click', (event) => {
        event.preventDefault();
        getProductsUsingFetch(url, 'bebidas');
    })
})

anchorFrappes.forEach(function (elemento) {
    elemento.addEventListener('click', (event) => {
        event.preventDefault();
        getProductsUsingFetch(url, 'frappes');
    })
})

anchorEspecialidades.forEach(function (elemento) {
    elemento.addEventListener('click', (event) => {
        event.preventDefault();
        getProductsUsingFetch(url, 'especialidades');
    })
})


anchorBagels.forEach(function (elemento) {
    elemento.addEventListener('click', (event) => {
        event.preventDefault();
        getProductsUsingFetch(url, 'bagels');
    })
})


anchorPaninis.forEach(function (elemento) {
    elemento.addEventListener('click', (event) => {
        event.preventDefault();
        getProductsUsingFetch(url, 'paninis');
    })
})

anchorCuernitos.forEach(function (elemento) {
    elemento.addEventListener('click', (event) => {
        event.preventDefault();
        getProductsUsingFetch(url, 'cuernitos');
    })
})

anchorWaffles.forEach(function (elemento) {
    elemento.addEventListener('click', (event) => {
        event.preventDefault();
        getProductsUsingFetch(url, 'waffles');
    })
})

anchorBreads.forEach(function (elemento) {
    elemento.addEventListener('click', (event) => {
        event.preventDefault();
        getProductsUsingFetch(url, 'panes');
    })
})


getProductsUsingFetch(url, 'coffee');


async function getProductsUsingFetch(url, category) {
    await fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(function mostrarObjetos(products) {

            const arrayProductsObj = products[category].map(element =>
                new Producto(
                    element.id,
                    element.nombre,
                    element.categoria,
                    element.precio,
                    element.descripcion,
                    element.imagen
                )
            );
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
