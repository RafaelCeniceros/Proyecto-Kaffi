
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
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (insideNum === "" || insideNum.length > 10 || !regex.test(insideNum)) {
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
addressForm.addEventListener("submit", (event) => {
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
        
        sendData(addressUpdate);
        disableEditing();
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

// Función para inhabilitar la edición
const disableEditing = () => {
    streetInput.setAttribute("readonly",true);
    outsideNumInput.setAttribute("readonly",true);
    insideNumInput.setAttribute("readonly",true);
    colonyInput.setAttribute("readonly",true);
    municipalityInput.setAttribute("readonly",true);
    zipInput.setAttribute("readonly",true);
    storeInput.setAttribute("disabled", true); 
}

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


const sendData = (addressUpdate) => {
    
    setTimeout(() => {showSuccessMessage();}, 1500);
    
    //Convertir el objeto en un string
    const addressJSONConcatenation = (addressUpdate) => {
        let concatenatedString = "";
        
        for (const key in addressUpdate) {
            if (addressUpdate.hasOwnProperty(key)) {
                concatenatedString += addressUpdate[key] + ', ';
            }
        }
        return concatenatedString.trim();
    }
    
    console.table(addressUpdate);

    //Mostar en la consola la direccion para pruebas 
    console.log(addressJSONConcatenation(addressUpdate));
};



