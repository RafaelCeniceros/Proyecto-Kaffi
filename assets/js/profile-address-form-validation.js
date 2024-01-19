
// Variables para campos de entrada
const streetInput = document.getElementById("inputStreet");
const outsideNumInput = document.getElementById("inputOutsideNum");
const insideNumInput = document.getElementById("inputInsideNum");
const colonyInput = document.getElementById("inputColony");
const municipalityInput = document.getElementById("inputMunicipality");
const zipInput = document.getElementById("inputZip");
const storeInput = document.getElementById("inputStore");

// Variables para signos de error
const invalidStreetSign = document.getElementById("invalid-street-sign");
const invalidOutsideNumSign = document.getElementById("invalid-outsideNum-sign");
const invalidInsideNumSign = document.getElementById("invalid-insideNum-sign");
const invalidColonySign = document.getElementById("invalid-colony-sign");
const invalidMunicipalitySign = document.getElementById("invalid-municipality-sign");
const invalidZipSign = document.getElementById("invalid-zip-sign");

// Variables para mensajes de error
const errorMessageStreet = document.getElementById("error-message-street");
const errorMessageOutsideNum = document.getElementById("error-message-outsideNum");
const errorMessageInsideNum = document.getElementById("error-message-insideNum");
const errorMessageColony = document.getElementById("error-message-colony");
const errorMessageMunicipality = document.getElementById("error-message-municipality");
const errorMessageZip = document.getElementById("error-message-zip");

//Variable para mensaje de exito
const successMessageContainer = document.getElementById("address-success-message-container");

//Referencia del formulario de direccion
const addressForm = document.forms["address-form"];

//Funcion de validacion de formulario
const dataCheckout = (addressUpdate) => {

    resetValues();

    const isStreetValid = validateStreet(addressUpdate.street, streetInput, invalidStreetSign);
    const isOutsideNumValid = validateOutsideNum(addressUpdate.outsideNum, outsideNumInput, invalidOutsideNumSign);
    const isInsideNumValid = validateInsideNum(addressUpdate.insideNum, insideNumInput, invalidInsideNumSign);
    const isColonyValid = validateColony(addressUpdate.colony, colonyInput, invalidColonySign);
    const isMunicipalityValid = validateMunicipality(addressUpdate.municipality, municipalityInput, invalidMunicipalitySign);
    const isZipValid = validateZip(addressUpdate.zip, zipInput, invalidZipSign);

    return (
        isStreetValid &&
        isOutsideNumValid &&
        isInsideNumValid &&
        isColonyValid &&
        isMunicipalityValid &&
        isZipValid
    );
};

//Validacion de calle
const validateStreet = (street, streetInput, invalidStreetSign) => {
    const regex = /^[a-zA-ZñÑ\s0-9]+$/;
    if (street === "" || street.length > 50 || !regex.test(street)) {
        errorMessageStreet.style.display = "block";
        errorMessage("Introduzca una calle válida", errorMessageStreet);
        streetInput.classList.add("invalid");
        invalidStreetSign.style.display = "block";
        return false;
    } else {
        errorMessageStreet.style.display = "none";
        errorMessage("", errorMessageStreet);
        streetInput.classList.remove("invalid");
        invalidStreetSign.style.display = "none";
        return true;
    }
};

//Validacion de numero exterior
const validateOutsideNum = (outsideNum, outsideNumInput, invalidOutsideNumSign) => {
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (outsideNum === "" || outsideNum.length > 10 || !regex.test(outsideNum)) {
        errorMessageOutsideNum.style.display = "block";
        errorMessage("Introduzca un número exterior válido", errorMessageOutsideNum);
        outsideNumInput.classList.add("invalid");
        invalidOutsideNumSign.style.display = "block";
        return false;
    } else {
        errorMessageOutsideNum.style.display = "none";
        errorMessage("", errorMessageOutsideNum);
        outsideNumInput.classList.remove("invalid");
        invalidOutsideNumSign.style.display = "none";
        return true;
    }
};

//validacion de numero interior
const validateInsideNum = (insideNum, insideNumInput, invalidInsideNumSign) => {
    if(insideNum==""||insideNum == null){
        errorMessageInsideNum.style.display = "none";
        errorMessage("", errorMessageInsideNum);
        insideNumInput.classList.remove("invalid");
        invalidInsideNumSign.style.display = "none";
        return true;
    }
    else{
        const regex = /^[a-zA-Z0-9\s]+$/;
        if (insideNum.length > 10 || !regex.test(insideNum)) {
            errorMessageInsideNum.style.display = "block";
            errorMessage("Introduzca un número interior válido", errorMessageInsideNum);
            insideNumInput.classList.add("invalid");
            invalidInsideNumSign.style.display = "block";
            return false;
        } else {
            errorMessageInsideNum.style.display = "none";
            errorMessage("", errorMessageInsideNum);
            insideNumInput.classList.remove("invalid");
            invalidInsideNumSign.style.display = "none";
            return true;
        }   
    }
};

//Validacion de colonia
const validateColony = (colony, colonyInput, invalidColonySign) => {
    const regex = /^[a-zA-ZñÑ\s]+$/;
    if (colony === "" || colony.length > 50 || !regex.test(colony)) {
        errorMessageColony.style.display = "block";
        errorMessage("Introduzca una colonia válida", errorMessageColony);
        colonyInput.classList.add("invalid");
        invalidColonySign.style.display = "block";
        return false;
    } else {
        errorMessageColony.style.display = "none";
        errorMessage("", errorMessageColony);
        colonyInput.classList.remove("invalid");
        invalidColonySign.style.display = "none";
        return true;
    }
};

//Validacion de municipio
const validateMunicipality = (municipality, municipalityInput, invalidMunicipalitySign) => {
    const regex = /^[a-zA-ZñÑ\s]+$/;
    if (municipality === "" || municipality.length > 50 || !regex.test(municipality)) {
        errorMessageMunicipality.style.display = "block";
        errorMessage("Introduzca un municipio válido", errorMessageMunicipality);
        municipalityInput.classList.add("invalid");
        invalidMunicipalitySign.style.display = "block";
        return false;
    } else {
        errorMessageMunicipality.style.display = "none";
        errorMessage("", errorMessageMunicipality);
        municipalityInput.classList.remove("invalid");
        invalidMunicipalitySign.style.display = "none";
        return true;
    }
};

//Validar codigo postal
const validateZip = (zip, zipInput, invalidZipSign) => {
    const regex = /^\d{5}$/;
    if (zip === "" || !regex.test(zip)) {
        errorMessageZip.style.display = "block";
        errorMessage("Introduzca un código postal válido", errorMessageZip);
        zipInput.classList.add("invalid");
        invalidZipSign.style.display = "block";
        return false;
    } else {
        errorMessageZip.style.display = "none";
        errorMessage("", errorMessageZip);
        zipInput.classList.remove("invalid");
        invalidZipSign.style.display = "none";
        return true;
    }
};

//Almacenamiento de datos
addressForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const addressUpdate = {
        street: addressForm.elements["inputStreet"].value,
        outsideNum: addressForm.elements["inputOutsideNum"].value,
        insideNum: addressForm.elements["inputInsideNum"].value,
        colony: addressForm.elements["inputColony"].value,
        municipality: addressForm.elements["inputMunicipality"].value,
        zip: addressForm.elements["inputZip"].value,
        store: addressForm.elements["inputStore"].value
    };

    // Validar el formulario
    const isFormValid = dataCheckout(addressUpdate);

    // Enviar datos solo si el formulario es válido
    if (isFormValid) {

        streetInput.classList.add("valid");
        outsideNumInput.classList.add("valid");
        insideNumInput.classList.add("valid");
        colonyInput.classList.add("valid");
        municipalityInput.classList.add("valid");
        zipInput.classList.add("valid");
        storeInput.classList.add("valid");
        const newAddress = getNewAddress(addressUpdate);
        console.log(newAddress);
        const updatedInfo = await editData("address", newAddress);
        await sendData(updatedInfo);

        // Obtener los elementos de input y select
        const inputElements = addressForm.querySelectorAll("input:not([type='submit']), select");
        // Función para habilitar los elementos
        for (const element of inputElements) {
            element.setAttribute("disabled", "true");
        }
    }
});

//Imprimir mensaje de error en DOM
const errorMessage = (message, messageContainer) => {
    messageContainer.innerHTML = message;

    if (message === "") {
        messageContainer.style.display = "none";
    } else {
        messageContainer.style.display = "block";
    }
};

//Imprimir mensaje de exito
const showSuccessMessage = () => {
    successMessageContainer.style.display = "flex";
};



// Función para restablecer valores y deshabilitar edición
const resetValues = () => {

    successMessageContainer.style.display = "none";

    streetInput.classList.remove("invalid");
    outsideNumInput.classList.remove("invalid");
    insideNumInput.classList.remove("invalid");
    colonyInput.classList.remove("invalid");
    municipalityInput.classList.remove("invalid");
    zipInput.classList.remove("invalid");

    streetInput.classList.remove("valid");
    outsideNumInput.classList.remove("valid");
    insideNumInput.classList.remove("valid");
    colonyInput.classList.remove("valid");
    municipalityInput.classList.remove("valid");
    zipInput.classList.remove("valid");

    invalidStreetSign.style.display = "none";
    invalidOutsideNumSign.style.display = "none";
    invalidInsideNumSign.style.display = "none";
    invalidColonySign.style.display = "none";
    invalidMunicipalitySign.style.display = "none";
    invalidZipSign.style.display = "none";

};


const getNewAddress = (addressUpdate) => {

    let concatenatedString = "";

    for (const key in addressUpdate) {
        if (addressUpdate.hasOwnProperty(key)) {
            concatenatedString += addressUpdate[key] + ', ';
        }
    }
    return concatenatedString.trim();
};


async function getUsers (){
    const localStorageTimeLimit_s = 1; // Tiempo de vida límite del localStorage en segundos
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
		const url = 'https://kaffi-ecommerce.onrender.com/api/v1/users';
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

async function getUserData(userId) {
    const users = await getUsers();
    const userFound = users.find(user => userId === user.id);
    return userFound || null; // Devolver null si no se encuentra ningún usuario con el ID proporcionado
  }

async function printOnDOMUserAddress() {
    // Obtener los elementos del formulario
    const street = addressForm.elements["inputStreet"];
    const outsideNum = addressForm.elements["inputOutsideNum"];
    const insideNum = addressForm.elements["inputInsideNum"];
    const colony = addressForm.elements["inputColony"];
    const municipality = addressForm.elements["inputMunicipality"];
    const zip = addressForm.elements["inputZip"];
    const storeSelect = addressForm.elements["inputStore"];

    // Función para obtener solo la parte numérica de una cadena
    function getNumericPart(str) {
        return str.replace(/\D/g, ''); // Filtra los dígitos
    }

    // Obtener la información del usuario
    const userInfo = await getUserData(getUserID());
    console.log(userInfo);

    // Verificar si se encontró la información del usuario
    if (userInfo && userInfo.address) {
        // Utilizar split para dividir la dirección
        const addressParts = userInfo.address.split(',').map(part => part.trim());

        // Asignar las partes a los campos correspondientes del formulario
        street.value = addressParts[0] || "";

        // Filtrar dígitos para obtener solo la parte numérica
        outsideNum.value = getNumericPart(addressParts[1]);
        insideNum.value = getNumericPart(addressParts[2]);

        colony.value = addressParts[3] || "";
        municipality.value = addressParts[4] || "";

        // Filtrar dígitos para obtener solo la parte numérica
        zip.value = getNumericPart(addressParts[5]);

        // Asignar el valor seleccionado en el select (store)
        for (let option of storeSelect.options) {
            if (option.value === addressParts[6]) {
                option.selected = true;
                break;
            }
        }
    } else {
        // Si no se encuentra la información del usuario, asignar valores por defecto o vacíos
        street.value = "";
        outsideNum.value = "";
        insideNum.value = "";
        colony.value = "";
        municipality.value = "";
        zip.value = "";
        storeSelect.value = ""; // Puedes establecer el valor seleccionado en el select como vacío
    }
}

await printOnDOMUserAddress();



const editAddressButton = document.getElementById("edit-address-button");
// Evento clic para el botón de edición
editAddressButton.addEventListener("click", function () {
    // Obtener los elementos de input y select
    const inputElements = addressForm.querySelectorAll("input[disabled], select[disabled]");
    // Función para habilitar los elementos
    for (const element of inputElements) {
        element.removeAttribute("disabled");
    }
});

async function editData(clave, nuevoValor) {
    // Obtener la información actual del usuario
    const actualUserInfo = await getUserData(getUserID());
  
    // Verificar si se encontró el usuario
    if (actualUserInfo) {
      // Modificar el valor de la clave proporcionada
      actualUserInfo[clave] = nuevoValor;
  
      // Aquí puedes guardar la información actualizada si es necesario
      // Puedes implementar una función para guardar los cambios en tu base de datos
  
      // Devolver la información actualizada
      return actualUserInfo;
    } else {
      // Devolver null si no se encuentra el usuario
      return null;
    }
  }

const sendData = async (UpdatedInfo) => {
    console.log(UpdatedInfo);
    try {
        const apiUrl = "https://kaffi-ecommerce.onrender.com/api/v1/users/" + getUserID();

        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
                // Puedes agregar más encabezados según sea necesario
            },
            body: JSON.stringify(UpdatedInfo)
        });

        if (!response.ok) {
            throw new Error(`Error al realizar la solicitud. Código de estado: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Respuesta del servidor:", responseData);
        showSuccessMessage();
        // Puedes realizar acciones adicionales aquí después de recibir una respuesta exitosa
    } catch (error) {
        console.error("Error:", error.message);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje al usuario
    }

};