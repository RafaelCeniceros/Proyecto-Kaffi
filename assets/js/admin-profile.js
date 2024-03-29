console.log("Estoy conectado al HTML");
localStorage.removeItem('userData');
const localStorageTimeLimit_s = 1; //tiempo de vida limite del localStorage en segundos

const checkifAccessToken = () => {
    // Obtener el accessToken encriptado desde el localStorage
    const encryptedAccessToken = localStorage.getItem('accessToken');
    if (encryptedAccessToken) {
        // Clave secreta para desencriptar (debería ser la misma que usaste para encriptar)
        const secretWord = "CodeTitansRafaFerValdoAlan";
        // Desencriptar el accessToken con CryptoJS
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedAccessToken, secretWord);
        // Convertir los bytes desencriptados a cadena JSON
        const decryptedAccessTokenJSON = decryptedBytes.toString(CryptoJS.enc.Utf8);
        // Parsear la cadena JSON a un objeto JavaScript
        const accessToken = JSON.parse(decryptedAccessTokenJSON);

        if (accessToken) {
            console.log("Inicio de sesion detectado");
            //console.log("NombreUsuario:" + accessToken.userName);
            const welcomeHTML = document.getElementById("welcome-name");
            welcomeHTML.textContent = "Bienvenido, " + accessToken.userName;
        }
    }
    else {
        window.location.href = "../pages/login.html#login-container";
    }
}
  

/* 
Get Comments from Api
*/
const urlAPIcomments = "https://kaffi-ecommerce.onrender.com/api/v1/comments";

async function getComments(url) {
    const localStorageKey = "commentsData";
    //document.getElementById("preloader").style.display = "flex";
    
    // Limpiar el contenido del DOM
    clearDOMComments();
    
    // Verificar si hay datos en el Local Storage y si han pasado más de 60 segundos
    const storedData = JSON.parse(localStorage.getItem(localStorageKey));
    
    if (storedData) {
        // Tiempo que ha transcurrido desde que se presionó el botón
        const timeSince = Math.round((Date.now() - storedData.timestamp) / 1000);
        
        // Si hay información en el localStorage y el tiempo que ha transcurrido desde que se presionó el botón es menor al tiempo de vida límite del localStorage en segundos
        if (timeSince < localStorageTimeLimit_s) {
            // Leer desde el Local Storage si está dentro del límite de tiempo
            console.log("Recuperando datos desde el Local Storage");
            console.log("Tiempo transcurrido: " + timeSince + " segundos");
            printOnDOMComments(storedData.data);
            /// Mantener el preloader oculto.
            //document.getElementById("preloader").style.display = "none";
            return;
        }
    }

    try {
        // Realizando solicitud GET
        const response = await fetch(url);

        if (response.status === 200) {
            console.log("Estado de la solicitud: OK");
            console.log("primer then");

            const comments = await response.json();
            
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
        } else {
            throw new Error(`Error in fetch. Status: ${response.status}`);
        }
    } catch (error) {
        console.log("Error in the request:", error);
        // Handle the error or log additional information if needed
    }
}

function generateCommentCard({ date, comment, user }) {
    let userInfo;

    if (user && user.id != null) {
        // Combine firstName and lastName if user is not null
        userInfo = `${user.firstName} ${user.lastName}`;
    } else {
        // Display "Anónimo" if user is null
        userInfo = "Anónimo";
    }

    // Convert the date string to a Date object
    const commentDate = new Date(date);

    // Format the date as "day month year"
    const formattedDate = commentDate.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return `
        <div class="col-12 d-flex my-2 align-items-center justify-content-center">
            <div class="comment-icon d-flex align-items-center justify-content-center me-2">
                <i class="fa-solid fa-user fa-xl mx-1"></i>
                <i class="fa-solid fa-comment-dots fa-xl"></i>
            </div>
            <div class="comment-card w-75 d-flex flex-column p-2">
                <h6 class="my-1 d-flex">${formattedDate}</h6>
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
Get Orders from Api
*/

const urlAPIorders = "https://kaffi-ecommerce.onrender.com/api/v1/orders";

async function getOrders(url) {
    const localStorageKey = "ordersData";
    //document.getElementById("preloader").style.display = "flex";
    
    // Limpiar el contenido del DOM
    clearDOMOrders();
    
    // Verificar si hay datos en el Local Storage y si han pasado más de 60 segundos
    const storedData = JSON.parse(localStorage.getItem(localStorageKey));
    
    if (storedData) {
        // Tiempo que ha transcurrido desde que se presionó el botón
        const timeSince = Math.round((Date.now() - storedData.timestamp) / 1000);
        
        // Si hay información en el localStorage y el tiempo que ha transcurrido desde que se presionó el botón es menor al tiempo de vida límite del localStorage en segundos
        if (timeSince < localStorageTimeLimit_s) {
            // Leer desde el Local Storage si está dentro del límite de tiempo
            console.log("Recuperando datos desde el Local Storage");
            console.log("Tiempo transcurrido: " + timeSince + " segundos");
            printOnDOMOrders(storedData.data);
            /// Mantener el preloader oculto.
            //document.getElementById("preloader").style.display = "none";
            return;
        }
    }

    try {
        // Realizando solicitud GET
        const response = await fetch(url);

        if (response.status === 200) {
            console.log("Estado de la solicitud: OK");

            const orders = await response.json();
            
            // Log the entire orders object to inspect its structure
            console.log("Orders received:", orders);

            // Guardar en el Local Storage con la marca de tiempo
            const timestamp = Date.now();
            const dataToStore = { data: orders, timestamp: timestamp };
            localStorage.setItem(localStorageKey, JSON.stringify(dataToStore));
            
            // Ocultar el preloader después de recibir la respuesta
            //document.getElementById("preloader").style.display = "none";
            console.table(dataToStore); // array con comentarios
            printOnDOMOrders(orders);
        } else {
            throw new Error(`Error in fetch. Status: ${response.status}`);
        }
    } catch (error) {
        console.log("Error in the request:", error);
        // Handle the error or log additional information if needed
    }
};

function generateOrderCard({id, date, price, user }) {
    let userInfo;

    if (user && user.id != null) {
        // Combine firstName and lastName if user is not null
        userInfo = `${user.firstName} ${user.lastName}`;
    } else {
        // Display "Anónimo" if user is null
        userInfo = "Anónimo";
    }

    // Convert the date string to a Date object
    const orderDate = new Date(date);

    // Format the date as "day month year"
    const formattedDate = orderDate.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return `
        <div class="col-12 d-flex my-2 align-items-center justify-content-center">
            <div class="order-card w-75 d-flex flex-column p-2">
                <h6 class="my-2 d-flex order-number">Orden No. ${id}</h6>
                <h6 class="my-1 d-flex">${formattedDate}</h6>
                <h6 class="my-2 d-flex">${userInfo}</h6>
                <p class="d-flex">$: ${price} MXN</p>
                <button onclick="showOrderDetails(${id})" class="d-flex align-items-center justify-content-center mx-3 my-1"> Ver detalles </button>
            </div>
            <div class="order-icon d-flex align-items-center justify-content-center ms-2">
                <i class="fa-solid fa-file-invoice-dollar fa-2xl"></i>
            </div>
        </div>
    `;
}
function clearDOMOrders() {
    // Obtener el contenedor de usuarios y establecer su contenido en blanco
    const ordersContainer = document.getElementById("orders");
    if (ordersContainer) {
        ordersContainer.innerHTML = "";
    }
}

function printOnDOMOrders(orders) {
    const ordersContainer = document.getElementById("orders");
    const noOrdersContainer = document.getElementById("no-orders");
    if (!ordersContainer) {
        console.error("Contenedor de comentarios no encontrado");
        return;
    }

    if (Array.isArray(orders) && orders.length > 0) {
        const ordersHTML = orders.map(generateOrderCard);
        ordersContainer.style.display="flex";
        noOrdersContainer.style.display="none";
        ordersContainer.innerHTML = ordersHTML.join("");
    } else {
        console.log("No hay comentarios");
        ordersContainer.style.display="none";
        noOrdersContainer.style.display="flex";
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

ordersButton.addEventListener('click', async () => {
    hideAllContainers();
    ordersContainer.style.display = 'flex';
    await getOrders(urlAPIorders);
});

commentsButton.addEventListener('click', async () =>{
    hideAllContainers();
    commentsContainer.style.display = 'flex';
    await getComments(urlAPIcomments);
});

// Agregar eventos de clic a los botones del menu lateral
productsButtonLateralMenu.addEventListener('click', () => {
    hideAllContainers();
    productsContainer.style.display = 'flex';
});

ordersButtonLateralMenu.addEventListener('click', async () => {
    hideAllContainers();
    ordersContainer.style.display = 'flex';
    await getOrders(urlAPIorders);
});

commentsButtonLateralMenu.addEventListener('click', async () =>{
    hideAllContainers();
    commentsContainer.style.display = 'flex';
    await getComments(urlAPIcomments);
});

const userLoginButton = document.getElementById("enlace-login-header");
userLoginButton.addEventListener("click", event => {
  event.preventDefault();
  // Obtener el accessToken encriptado desde el localStorage
  const encryptedAccessToken = localStorage.getItem('accessToken');

  if (encryptedAccessToken) {
    // Clave secreta para desencriptar (debería ser la misma que usaste para encriptar)
    const secretWord = "CodeTitansRafaFerValdoAlan";
    // Desencriptar el accessToken con CryptoJS
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedAccessToken, secretWord);
    // Convertir los bytes desencriptados a cadena JSON
    const decryptedAccessTokenJSON = decryptedBytes.toString(CryptoJS.enc.Utf8);
    // Parsear la cadena JSON a un objeto JavaScript
    const accessToken = JSON.parse(decryptedAccessTokenJSON);
    if (accessToken) {
      console.log("Inicio de sesion detectado")
      console.log("UserType:" + accessToken.userType);
      if (accessToken.userType === 1) {
        window.location.href = "../pages/admin-profile.html";
      } else if (accessToken.userType === 2) {
        window.location.href = "../pages/profile.html";
      }
    }
  } else {
    window.location.href = "../pages/login.html#login-container";
  }
});


const buttonLogOutlg = document.getElementById('option-logout-button-lg');
buttonLogOutlg.addEventListener('click', () => {
localStorage.removeItem("accessToken"); 
localStorage.removeItem("commentsData");
localStorage.removeItem("ordersData");
localStorage.removeItem("ProductsData");
window.location.href = "../pages/login.html#login-container";
});

const buttonLogOut = document.getElementById('option-logout-button');
buttonLogOut.addEventListener('click', () => {
localStorage.removeItem("accessToken");
localStorage.removeItem("commentsData");
localStorage.removeItem("ordersData");
localStorage.removeItem("ProductsData");
window.location.href = "../pages/login.html#login-container";
});


checkifAccessToken();

async function showOrderDetails(orderId) {
    try {
        // Realiza una consulta a la API para obtener la información detallada de la orden
        // Puedes usar fetch, axios u otra biblioteca para realizar la consulta

        // Por ahora, asumamos que obtienes los detalles de la orden de un archivo JSON
        const allOrdersHasProducts = await fetch("https://kaffi-ecommerce.onrender.com/api/v1/ordersHasProducts");

        if (!allOrdersHasProducts.ok) {
            throw new Error('Error al obtener detalles de la orden');
        }

        const allOrdersDetails = await allOrdersHasProducts.json();

        // Filtra las órdenes por su ID
        const ordersWithId = allOrdersDetails.filter(orderDetails => parseInt(orderDetails.order.id) === parseInt(orderId));

        displayOrderModal(ordersWithId);
    } catch (error) {
        console.error('Error:', error.message);
    }
}


function displayOrderModal(orderDetailsArray) {
    const modal = document.getElementById('orderDetailsModal');
    const modalBody = modal.querySelector('.modal-body');
    modalBody.innerHTML = ''; // Limpiar el contenido anterior del modal

    orderDetailsArray.forEach(orderDetails => {
        const productDetails = orderDetails.product;
        const quantity = orderDetails.quantity;
        const totalPrice = orderDetails.totalPrice;

        // Crear elementos HTML para mostrar la información
        const productInfo = `<p class="mb-2"><strong>Producto:</strong> ${productDetails.name}</p>`;
        const quantityInfo = `<p class="mb-2"><strong>Cantidad:</strong> ${quantity}</p>`;
        const totalPriceInfo = `<p class="mb-4"><strong>Total:</strong> $${totalPrice} MXN</p>`;

        // Agregar información al modal
        const productContainer = document.createElement('div');
        productContainer.classList.add('border-bottom', 'pb-3');
        productContainer.innerHTML = productInfo + quantityInfo + totalPriceInfo;
        modalBody.appendChild(productContainer);
    });

    // Mostrar el modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}


