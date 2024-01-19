const tarjeta = document.querySelector('#tarjeta'),
	  btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
	  formulario = document.querySelector('#formulario-tarjeta'),
	  numeroTarjeta = document.querySelector('#tarjeta .numero'),
	  nombreTarjeta = document.querySelector('#tarjeta .nombre'),
	  logoMarca = document.querySelector('#logo-marca'),
	  firma = document.querySelector('#tarjeta .firma p'),
	  mesExpiracion = document.querySelector('#tarjeta .mes'),
	  yearExpiracion = document.querySelector('#tarjeta .year'),
	  ccv = document.querySelector('#tarjeta .ccv');

// * Volteamos la tarjeta para mostrar el frente.
const mostrarFrente = () => {
	if(tarjeta.classList.contains('active')){
		tarjeta.classList.remove('active');
	}
}

// * Rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
	tarjeta.classList.toggle('active');
});

// * Boton de abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
	btnAbrirFormulario.classList.toggle('active');
	formulario.classList.toggle('active');
});

// * Select del mes generado dinamicamente.
for(let i = 1; i <= 12; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectMes.appendChild(opcion);
}

// * Select del año generado dinamicamente.
const yearActual = new Date().getFullYear();
for(let i = yearActual; i <= yearActual + 8; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectYear.appendChild(opcion);
}

// * Input numero de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNumero.value = valorInput
	// Eliminamos espacios en blanco
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '')
	// Ponemos espacio cada cuatro numeros
	.replace(/([0-9]{4})/g, '$1 ')
	// Elimina el ultimo espaciado
	.trim();

	numeroTarjeta.textContent = valorInput;

	if(valorInput == ''){
		numeroTarjeta.textContent = '#### #### #### ####';

		logoMarca.innerHTML = '';
	}

	if(valorInput[0] == 4){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = '../images/visa.png';
		logoMarca.appendChild(imagen);
	} else if(valorInput[0] == 5){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = '../images/mastercard.png';
		logoMarca.appendChild(imagen);
	}

	// Volteamos la tarjeta para que el usuario vea el frente.
	mostrarFrente();
});

// * Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
	nombreTarjeta.textContent = valorInput;
	firma.textContent = valorInput;

	if(valorInput == ''){
		nombreTarjeta.textContent = 'Jhon Doe';
	}

	mostrarFrente();
});

// * Select mes
formulario.selectMes.addEventListener('change', (e) => {
	mesExpiracion.textContent = e.target.value;
	mostrarFrente();
});

// * Select Año
formulario.selectYear.addEventListener('change', (e) => {
	yearExpiracion.textContent = e.target.value.slice(2);
	mostrarFrente();
});

// * CCV
formulario.inputCCV.addEventListener('keyup', () => {
	if(!tarjeta.classList.contains('active')){
		tarjeta.classList.toggle('active');
	}

	formulario.inputCCV.value = formulario.inputCCV.value
	// Eliminar los espacios
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '');

	ccv.textContent = "*".repeat(formulario.inputCCV.value.length);
});



async function getProducts() {
    const localStorageTimeLimit_s = 60; // Tiempo de vida límite del localStorage en segundos
    const localStorageKey = "ProductsData";

    // Verificar si hay datos en el Local Storage y si han pasado más de 60 segundos
    const storedData = JSON.parse(localStorage.getItem(localStorageKey));

    if (storedData && (Date.now() - storedData.timestamp) / 1000 < localStorageTimeLimit_s) {
        // Leer desde el Local Storage si está dentro del límite de tiempo
        //console.log("Recuperando datos desde el Local Storage");
        //console.log(`Tiempo transcurrido: ${(Date.now() - storedData.timestamp) / 1000} segundos`);
        return storedData.data;
    }

    try {
        // Realizar solicitud GET con async/await
		const url = '../../productos-api.json';
        const response = await fetch(url);

        if (response.status === 200) {
            console.log("Estado de la solicitud: OK");

            // Convertir la respuesta a JSON con async/await
            const products = await response.json();

            // Guardar en el Local Storage con la marca de tiempo
            const timestamp = Date.now();
            const dataToStore = { data: products, timestamp: timestamp };
            localStorage.setItem(localStorageKey, JSON.stringify(dataToStore));
            //console.table(dataToStore); // Mostrar datos almacenados en la consola
            return products;
        } else {
            throw new Error(`Error in fetch. Status: ${response.status}`);
        }
    } catch (error) {
        console.log("Error in the request:", error);
        // Manejar el error o registrar información adicional si es necesario
        throw error; // Propagar el error para que pueda ser manejado por la función que llama a getProducts
    }
}

async function getTotalPriceOrder(){
	const listOfProductsToBuy = JSON.parse(localStorage.getItem("listOfProducts"));
        const listOfProducts = await getProducts();
        let sumaSubtotales = 0;

        // Itera sobre los productos en listOfProductsToBuy
        for (const productId in listOfProductsToBuy) {
            if (listOfProductsToBuy.hasOwnProperty(productId)) {
                const cantidad = listOfProductsToBuy[productId];

                // Busca el producto en listOfProducts por su id
                const product = listOfProducts.find((prod) => prod.id === parseInt(productId));

                // Verifica si se encontró el producto
                if (product) {
                    const precio = product.price || 0;

                    // Calcula el subtotal y suma al total
                    sumaSubtotales += cantidad * precio;
                }
            }
        }
		return sumaSubtotales;
}

const updateTotalPriceProducts = async () => {
    const totalToPay = document.getElementById("total-to-pay");
    const loadingMessage = document.getElementById("loading-message");

    // Mostrar mensaje de carga
    if (loadingMessage !== null) {
        loadingMessage.textContent = "Cargando...";
    }

    // Verifica si totalToPay es diferente de null antes de continuar
    if (totalToPay !== null) {
        try {
            // Obtener el total con await y actualizar el contenido
            const totalPrice = await getTotalPriceOrder();
            totalToPay.textContent = "Total a pagar: $" + totalPrice.toFixed(2) + " MXN";
        } catch (error) {
            console.error("Error al obtener el total:", error);
            // Manejar el error si es necesario
            totalToPay.textContent = "Error al obtener el total";
        } finally {
            // Ocultar mensaje de carga
            if (loadingMessage !== null) {
                loadingMessage.textContent = "";
            }
        }
    }
};

await updateTotalPriceProducts();

function getActualDate() {
    const currentDate = new Date();
    
    // Obtiene componentes de la fecha y hora
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getUTCHours()).padStart(2, '0');
    const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0');

    // Construye la cadena de fecha y hora en el formato deseado
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000+00:00`;

    return formattedDate;
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

async function getNewOrderObj(){

	const totalPrice = await getTotalPriceOrder();
	const actualDate = getActualDate();
	const userId = getUserID();
	const newOrder = {
        price: totalPrice,
        date: actualDate,
        user: {  id: userId }
    }

	return newOrder;
}

async function getOrders() {
	const localStorageTimeLimit_s = 60; //tiempo de vida limite del localStorage en segundos
    const localStorageKey = "ordersData";
    //document.getElementById("preloader").style.display = "flex";
        
    // Verificar si hay datos en el Local Storage y si han pasado más de 60 segundos
    const storedData = JSON.parse(localStorage.getItem(localStorageKey));
    
    if (storedData) {
        // Tiempo que ha transcurrido desde que se presionó el botón
        const timeSince = Math.round((Date.now() - storedData.timestamp) / 1000);
        
        // Si hay información en el localStorage y el tiempo que ha transcurrido desde que se presionó el botón es menor al tiempo de vida límite del localStorage en segundos
        if (timeSince < localStorageTimeLimit_s) {
            // Leer desde el Local Storage si está dentro del límite de tiempo
            console.log("Recuperando datos desde el Local Storage");
            /// Mantener el preloader oculto.
            //document.getElementById("preloader").style.display = "none";
            return storedData.data;
        }
    }

    try {
        // Realizando solicitud GET
		const urlAPIorders = "../../orders.json";
        const response = await fetch(urlAPIorders);

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


async function getLastOrderOfUser() {
    const ordersList = await getOrders();
    const userId = getUserID();

    // Filtra las órdenes del usuario actual
    const userOrders = ordersList.filter(order => order.user.id === userId);

    // Verifica si hay órdenes para el usuario
    if (userOrders.length > 0) {
        // Ordena las órdenes por fecha de manera descendente
        userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Devuelve el ID de la última orden del usuario
        return userOrders[0].id;
    } else {
        // No hay órdenes para el usuario
        console.log("El usuario no tiene órdenes.");
        return null;
    }
}

async function getListOfOrderHasProductsToPost(lastOrderId) {
    const listOfProductsToBuy = JSON.parse(localStorage.getItem("listOfProducts"));
    const listOfProducts = await getProducts();

    const orderHasProductsList = [];

    for (const productId in listOfProductsToBuy) {
        if (listOfProductsToBuy.hasOwnProperty(productId)) {
            const quantity = listOfProductsToBuy[productId];

            // Busca el producto en listOfProducts por su id
            const product = listOfProducts.find((prod) => prod.id === parseInt(productId));

            // Verifica si se encontró el producto
            if (product) {
                const newOrderHasProduct = {
                    order: { id: lastOrderId },
                    product: { id: product.id },
                    quantity: quantity,
                    unitaryPrice: product.price,
                    totalPrice: quantity * product.price
                };

                orderHasProductsList.push(newOrderHasProduct);
            }
        }
    }

    return orderHasProductsList;
}

async function postAllOrderHasProducts() {
    const lastOrderId = await getLastOrderOfUser(); // último ID de orden del usuario
	console.log("ID de la última orden del usuario:", lastOrderId);
    const ListOfOrderHasProducts = await getListOfOrderHasProductsToPost(lastOrderId);
	let cont = 0 ; 
    // Itera sobre la lista de objetos e imprime cada uno
    for (const orderHasProduct of ListOfOrderHasProducts) {
		cont++;
		console.log("OrderHasProduct: "+ cont);
		console.log(orderHasProduct);
		console.log("-------------------")
    }
}

async function getUsers (){
    const localStorageTimeLimit_s = 60; // Tiempo de vida límite del localStorage en segundos
    const localStorageKey = "UsersData";

    // Verificar si hay datos en el Local Storage y si han pasado más de 60 segundos
    const storedData = JSON.parse(localStorage.getItem(localStorageKey));

    if (storedData && (Date.now() - storedData.timestamp) / 1000 < localStorageTimeLimit_s) {
        // Leer desde el Local Storage si está dentro del límite de tiempo
        //console.log("Recuperando datos desde el Local Storage");
        //console.log(`Tiempo transcurrido: ${(Date.now() - storedData.timestamp) / 1000} segundos`);
        return storedData.data;
    }

    try {
        // Realizar solicitud GET con async/await
		const url = '../../users.json';
        const response = await fetch(url);

        if (response.status === 200) {
            console.log("Estado de la solicitud: OK");

            // Convertir la respuesta a JSON con async/await
            const users = await response.json();

            // Guardar en el Local Storage con la marca de tiempo
            const timestamp = Date.now();
            const dataToStore = { data: users, timestamp: timestamp };
            localStorage.setItem(localStorageKey, JSON.stringify(dataToStore));
            //console.table(dataToStore); // Mostrar datos almacenados en la consola
            return users;
        } else {
            throw new Error(`Error in fetch. Status: ${response.status}`);
        }
    } catch (error) {
        console.log("Error in the request:", error);
        // Manejar el error o registrar información adicional si es necesario
        throw error; // Propagar el error para que pueda ser manejado por la función que llama a getProducts
    }

}

async function getUserData(){
    const userId = getUserID();
    const users = await getUsers();
    const userFound = users.find(user => userId === user.id);
    return userFound || null; // Devolver null si no se encuentra ningún usuario con el ID proporcionado
}

async function getProductInfoString() {
    const listOfProductsToBuy = JSON.parse(localStorage.getItem("listOfProducts"));
    const listOfProducts = await getProducts();
    const productInfoArray = [];
  
    // Itera sobre los productos en listOfProductsToBuy
    for (const productId in listOfProductsToBuy) {
      if (listOfProductsToBuy.hasOwnProperty(productId)) {
        const cantidad = listOfProductsToBuy[productId];
  
        // Busca el producto en listOfProducts por su id
        const product = listOfProducts.find((prod) => prod.id === parseInt(productId));
  
        // Verifica si se encontró el producto
        if (product) {
          const productName = product.name || 'Unknown Product';
  
          // Agrega la información del producto al array
          productInfoArray.push(`${cantidad} ${productName}`);
        }
      }
    }
  
    // Convierte el array en una cadena separada por comas
    const productInfoString = productInfoArray.join(', ');
  
    return productInfoString;
  }

async function sendEmail() {

    const userData = await getUserData();
    const orderNumber = await getLastOrderOfUser();
    const productsInfo = await getProductInfoString();
    const totalPrice = await getTotalPriceOrder();
    // Después de que la orden se haya procesado exitosamente, envía un correo de confirmación al usuario
    const templateParams = {
        from_name: "ordenes kaffi",
        userFirstName: userData.firstName +" "+ userData.lastName,
        orderId: orderNumber,
        productNames: productsInfo,
        totalAmount: totalPrice,
        userEmail: userData.email
    };
    console.log(templateParams);
    try {
        //const response = await emailjs.send("service_gr2ei9l", "template_vkvlh29", templateParams);
        //console.log(response);
        console.log("Orden realizada con éxito. Se ha enviado un correo de confirmación al usuario.");
    } catch (error) {
        console.error(error);
        console.log("Error en el proceso de orden. No se pudo enviar el correo de confirmación.");
    }
};


formulario.addEventListener("submit", async event => {
    event.preventDefault();

    const isFormValid =  ValidateForm();
    if(isFormValid){
        console.log(await getNewOrderObj());
        await postAllOrderHasProducts();
        await sendEmail();
    }

});

 function ValidateForm(){
    // Obtener los valores de los campos
    const cardNumber = document.querySelector('#tarjeta .numero').textContent;
    const cardName = document.querySelector('#tarjeta .nombre').textContent;
    const mesExpiracion = document.querySelector('#tarjeta .mes').textContent;
    const yearExpiracion = document.querySelector('#tarjeta .year').textContent;
    const ccv = document.querySelector('#tarjeta .ccv').textContent;

    // Validar que todos los campos no sean null
    if (cardNumber === null || cardName === null || mesExpiracion === null || yearExpiracion === null || ccv === null) {
        alert('Por favor, completa todos los campos del formulario de pago.');
        return false;
    }

    // Validar que el número de tarjeta tenga 16 dígitos
    if (cardNumber.length != 19) {
        alert('El número de tarjeta debe contener exactamente 16 dígitos.');
        return false;
    }

    // Validar que el mes tenga dos dígitos
    if (mesExpiracion.length < 1) {
        alert('El mes de expiración debe contener exactamente dos dígitos.');
        return false;
    }

    // Validar que el año tenga cuatro dígitos
    if (yearExpiracion.length > 2) {
        alert('El año de expiración debe contener exactamente cuatro dígitos.');
        return false;
    }

    // Validar que el CCV tenga tres dígitos
    if (ccv.length !=3) {
        alert('El CCV debe contener exactamente tres dígitos.');
        return false;
    }

    return true;

}


