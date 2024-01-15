
/* 
Get Comments from Api
*/

console.log("Estoy conectado al HTML");

const urlAPIcomments = "../../comments.json";
const localStorageKey = "commentsData";
const localStorageTimeLimit_s = 60; //tiempo de vida limite del localStorage en segundos

function getComments(url) {
    //document.getElementById("preloader").style.display = "flex";
    // Limpiar el contenido del DOM
    clearDOMComments();
    // Verificar si hay datos en el Local Storage y si han pasado más de 60 segundos
    const storedData = JSON.parse(localStorage.getItem(localStorageKey));
    if(storedData)
    {
    //tiempo que ha transcurrido desde que se presionó el botón
    const timeSince = Math.round((Date.now() - storedData.timestamp) / 1000);
    //si hay informacion en el localStorage y el tiempo que ha transcurrido desde que se presionó el botón es menor tiempo de vida limite del localStorage en segundos 
    if (storedData && (timeSince < localStorageTimeLimit_s)) {
        // Leer desde el Local Storage si está dentro del límite de tiempo
        console.log("Recuperando datos desde el Local Storage");
        console.log("Tiempo transcurrido: " + timeSince + " segundos");
        printOnDOMComments(storedData.data);
        /// Mantener el preloader oculto.
        //document.getElementById("preloader").style.display = "none";
        return;
    }
    }
    // Realizando solicitud GET
    fetch(url)
    .then((response) => {
        if (response.status === 200) {
            console.log("Estado de la solicitud: OK");
            console.log("primer then");
            return response.json();
        } else {
            throw new Error(`Error in fetch. Status: ${response.status}`);
        }
    })
    .then((comments) => {
        // Log the entire comments object to inspect its structure
        console.log("Comments received:", comments);

        // Guardar en el Local Storage con la marca de tiempo
        console.log("segundo then");
        const timestamp = Date.now();
        const dataToStore = { data: comments, timestamp: timestamp };
        localStorage.setItem(localStorageKey, JSON.stringify(dataToStore));
        // Ocultar el preloader después de recibir la respuesta
        //document.getElementById("preloader").style.display = "none";
        console.table(dataToStore); // array con comentarios
        printOnDOMComments(comments);
    })
    .catch((error) => {
        console.log("Error in the request:", error);
        // Handle the error or log additional information if needed
    });
};

function generateCommentCard({date, comment, user }) {

    let userInfo;
    if(user.id != null){
        userInfo = user.name;
        if(user.name == null){
            userInfo = "Anónimo"
        }
        else{
            userInfo = user.name;
        }
    }
    else{
        userInfo = "Anónimo";
    }
    return `
    <div class="col-12 d-flex my-2">
        <div class="comment-icon d-flex align-items-center justify-content-center mx-2">
            <i class="fa-solid fa-user fa-xl mx-1"></i>
            <i class="fa-solid fa-comment-dots fa-xl"></i>
        </div>
        <div class="comment-card w-75 d-flex flex-column  p-2">
            <h6 class="my-1 d-flex">${date} </h6>
            <h5 class="my-2 d-flex">${userInfo}</h5>
            <p class="d-flex">${comment}</p>
        </div>
    </div>
    `;
}
function clearDOMComments() {
    // Obtener el contenedor de usuarios y establecer su contenido en blanco
    const commentsContainer = document.getElementById("comments");
    if (commentsContainer) {
        commentsContainer.innerHTML = "";
    }
}

function printOnDOMComments(comments) {
    const commentsContainer = document.getElementById("comments");
    const noCommentsContainer = document.getElementById("no-comments");
    if (!commentsContainer) {
        console.error("Contenedor de comentarios no encontrado");
        return;
    }

    if (Array.isArray(comments) && comments.length > 0) {
        const commentsHTML = comments.map(generateCommentCard);
        commentsContainer.style.display="flex";
        noCommentsContainer.style.display="none";
        commentsContainer.innerHTML = commentsHTML.join("");
    } else {
        console.log("No hay comentarios");
        commentsContainer.style.display="none";
        noCommentsContainer.style.display="flex";
    }
}





















/* 

Manejo de contenedores

*/
// Obtener botones y contenedores
const productsButton = document.getElementById('option-products-button');
const ordersButton = document.getElementById('option-orders-button');
const commentsButton = document.getElementById('option-comments-button');

const productsButtonLateralMenu = document.getElementById('option-products-button-lg');
const ordersButtonLateralMenu = document.getElementById('option-orders-button-lg');
const commentsButtonLateralMenu = document.getElementById('option-comments-button-lg');

const productsContainer = document.getElementById('container-products');
const ordersContainer = document.getElementById('container-orders');
const commentsContainer = document.getElementById('container-comments');

// Mostrar por defecto el contenedor de productos
productsContainer.style.display = 'flex';
ordersContainer.style.display = 'none';
commentsContainer.style.display = 'none';

// Función para ocultar todos los contenedores
function hideAllContainers() {
    productsContainer.style.display = 'none';
    ordersContainer.style.display = 'none';
    commentsContainer.style.display = 'none';
}

// Agregar eventos de clic a los botones
productsButton.addEventListener('click', () => {
    hideAllContainers();
    productsContainer.style.display = 'flex';
});

ordersButton.addEventListener('click', () => {
    hideAllContainers();
    ordersContainer.style.display = 'flex';
});

commentsButton.addEventListener('click', () =>{
    hideAllContainers();
    commentsContainer.style.display = 'flex';
    getComments(urlAPIcomments);
});

// Agregar eventos de clic a los botones del menu lateral
productsButtonLateralMenu.addEventListener('click', () => {
    hideAllContainers();
    productsContainer.style.display = 'flex';
});

ordersButtonLateralMenu.addEventListener('click', () => {
    hideAllContainers();
    ordersContainer.style.display = 'flex';
});

commentsButtonLateralMenu.addEventListener('click', () =>{
    hideAllContainers();
    commentsContainer.style.display = 'flex';
    getComments(urlAPIcomments);
});
