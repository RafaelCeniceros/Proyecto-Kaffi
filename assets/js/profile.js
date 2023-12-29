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

ordersButton.addEventListener('click', () => {
    hideAllContainers();
    ordersContainer.style.display = 'flex';
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

ordersButtonLateralMenu.addEventListener('click', () => {
    hideAllContainers();
    ordersContainer.style.display = 'flex';
});

commentsButtonLateralMenu.addEventListener('click', () =>{
    hideAllContainers();
    commentsContainer.style.display = 'flex';
});
