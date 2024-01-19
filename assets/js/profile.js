import { showQuantityOfItems } from "./add-delete-products-to-ls.js";
showQuantityOfItems();

localStorage.removeItem('userData');

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
        }
    }
    else {
        window.location.href = "../pages/login.html#login-container";
    }
}
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

// Obtener botones y contenedores
const accountButton = document.getElementById('option-account-button');
const paymethodButton = document.getElementById('option-paymethod-button');
const addressButton = document.getElementById('option-address-button');
const ordersButton = document.getElementById('option-orders-button');
const commentsButton = document.getElementById('option-comments-button');

const accountButtonLateralMenu = document.getElementById('option-account-button-lg');
const paymethodButtonLateralMenu = document.getElementById('option-paymethod-button-lg');
const addressButtonLateralMenu = document.getElementById('option-address-button-lg');
const ordersButtonLateralMenu = document.getElementById('option-orders-button-lg');
const commentsButtonLateralMenu = document.getElementById('option-comments-button-lg');

const accountContainer = document.getElementById('container-account');
const paymethodContainer = document.getElementById('container-paymethod');
const addressContainer = document.getElementById('container-address');
const ordersContainer = document.getElementById('container-orders');
const commentsContainer = document.getElementById('container-comments');

// Mostrar por defecto el contenedor de productos
accountContainer.style.display = 'flex';
paymethodContainer.style.display = 'none';
addressContainer.style.display = 'none';
ordersContainer.style.display = 'none';
commentsContainer.style.display = 'none';

// Función para ocultar todos los contenedores
function hideAllContainers() {
    accountContainer.style.display = 'none';
    paymethodContainer.style.display = 'none';
    addressContainer.style.display = 'none';
    ordersContainer.style.display = 'none';
    commentsContainer.style.display = 'none';
}

// Agregar eventos de clic a los botones
accountButton.addEventListener('click', () => {
    hideAllContainers();
    accountContainer.style.display = 'flex';
});

paymethodButton.addEventListener('click', () => {
    hideAllContainers();
    paymethodContainer.style.display = 'flex';
});

addressButton.addEventListener('click', () =>{
    hideAllContainers();
    addressContainer.style.display = 'flex';
});

ordersButton.addEventListener('click', async() => {
    hideAllContainers();
    ordersContainer.style.display = 'flex';
    await getOrdersOfUser();
    assignEventToOrderButtons();
});

commentsButton.addEventListener('click', () =>{
    hideAllContainers();
    commentsContainer.style.display = 'flex';
});

// Agregar eventos de clic a los botones del menu lateral
accountButtonLateralMenu.addEventListener('click', () => {
    hideAllContainers();
    accountContainer.style.display = 'flex';
});

paymethodButtonLateralMenu.addEventListener('click', () => {
    hideAllContainers();
    paymethodContainer.style.display = 'flex';
});

addressButtonLateralMenu.addEventListener('click', () =>{
    hideAllContainers();
    addressContainer.style.display = 'flex';
});

ordersButtonLateralMenu.addEventListener('click',async () => {
    hideAllContainers();
    await getOrdersOfUser();
    assignEventToOrderButtons();
    ordersContainer.style.display = 'flex';
});

commentsButtonLateralMenu.addEventListener('click', () =>{
    hideAllContainers();
    commentsContainer.style.display = 'flex';
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
localStorage.removeItem("UsersData"); 
window.location.href = "../pages/login.html#login-container";
});

const buttonLogOut = document.getElementById('option-logout-button');
buttonLogOut.addEventListener('click', () => {
localStorage.removeItem("accessToken"); 
localStorage.removeItem("UsersData"); 
window.location.href = "../pages/login.html#login-container";
});


/* 
Get Orders from Api
*/

async function getOrders() {
    const url = "https://kaffi-ecommerce.onrender.com/api/v1/orders";
    const localStorageTimeLimit_s = 2; //tiempo de vida limite del localStorage en segundos
    const localStorageKey = "ordersData";
    //document.getElementById("preloader").style.display = "flex";
    
    // Limpiar el contenido del DOM
  
    
    // Verificar si hay datos en el Local Storage y si han pasado más de 60 segundos
    const storedData = JSON.parse(localStorage.getItem(localStorageKey));
    
    if (storedData) {
        // Tiempo que ha transcurrido desde que se presionó el botón
        const timeSince = Math.round((Date.now() - storedData.timestamp) / 1000);
        
        // Si hay información en el localStorage y el tiempo que ha transcurrido desde que se presionó el botón es menor al tiempo de vida límite del localStorage en segundos
        if (timeSince < localStorageTimeLimit_s) {
            // Leer desde el Local Storage si está dentro del límite de tiempo
            console.log("Recuperando datos desde el Local Storage");
            //console.log("Tiempo transcurrido: " + timeSince + " segundos");
            /// Mantener el preloader oculto.
            //document.getElementById("preloader").style.display = "none";
            return storedData.data;
        }
    }

    try {
        // Realizando solicitud GET
        const response = await fetch(url);

        if (response.status === 200) {
            console.log("Estado de la solicitud: OK");

            const orders = await response.json();
            
            // Log the entire orders object to inspect its structure
            //console.log("Orders received:", orders);

            // Guardar en el Local Storage con la marca de tiempo
            const timestamp = Date.now();
            const dataToStore = { data: orders, timestamp: timestamp };
            localStorage.setItem(localStorageKey, JSON.stringify(dataToStore));
            
            // Ocultar el preloader después de recibir la respuesta
            //document.getElementById("preloader").style.display = "none";
            //console.table(dataToStore); // array con comentarios
            return orders;
        } else {
            throw new Error(`Error in fetch. Status: ${response.status}`);
        }
    } catch (error) {
        console.log("Error in the request:", error);
        // Handle the error or log additional information if needed
    }
};

function generateOrderCard({ id, date, price }) {
    const orderDate = new Date(date);
    const formattedDate = orderDate.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });

    return `
    <!-- tarjeta para información de Pedidos -->
    <div class="order-card col-12 p-2 d-flex align-items-center justify-content-center my-2">
        <div class="p-3 mb-2">
            <div class="text-start row mb-2">
                <h5>Pedido</h5>
            </div>
            <div class="row">
                <div class="text-start col-lg-8 p-2">
                    <div class="row text-start d-flex align-items-start justify-content-center">
                        <div class="col-4 my-1">
                            <p>Fecha de pedido</p>
                        </div>
                        <div class="col-8 my-1">
                            <i class="order-info">${formattedDate}</i>
                        </div>
                        <div class="col-4 my-1">
                            <p>No. de pedido</p>
                        </div>
                        <div class="col-8 my-1">
                            <i class="order-info">${id}</i>
                        </div>
                    </div>
                </div>
                <div class="text-start col-lg-4 p-lg-2">
                    <div class="row text-start">
                        <div class="col-4 col-lg-12 d-flex align-items-center justify-content-start">
                            <p class="">Total</p>
                        </div>
                        <div class="col-8 col-lg-12 d-flex align-items-center justify-content-center">
                            <i class="order-info">$ ${price}.00 MXN</i>
                        </div>
                    </div>
                </div>
                <div class="col-12 d-flex align-items-center justify-content-center mt-3">
                    <button data-order-id="${id}" class="d-flex align-items-center justify-content-center px-3 btn-show-order-details">Ver detalles del pedido</button>
                 </div>
            </div>
        </div>
    </div>
    `;
}

function getUserID() {
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
			return accessToken.userId;
		}
		else {
			console.error("No se obtuvo el user id");
		}
	}
}

async function getOrdersOfUser() {
    try {
        clearDOMOrders();
        const ordersList = await getOrders();
        const userId = getUserID();

        // Filtra las órdenes del usuario actual
        const userOrders = ordersList.filter(order => order.user.id === userId);

        // Ordena las órdenes por fecha de manera descendente
        userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
        printOnDOMOrders(userOrders);
        return userOrders || null;
    } catch (error) {
        console.error("Error al obtener órdenes del usuario:", error);
        // Puedes manejar el error de alguna manera, como mostrar un mensaje al usuario
        return null;
    }
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
        ordersContainer.style.display="none";
        noOrdersContainer.style.display="flex";
    }
}


// Función para asignar eventos a los botones
function assignEventToOrderButtons() {
    const orderButtons = document.querySelectorAll('.btn-show-order-details');

    orderButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const orderId = this.dataset.orderId;
            console.log(orderId);
            await showOrderDetails(orderId);
        });
    });
}
assignEventToOrderButtons();
