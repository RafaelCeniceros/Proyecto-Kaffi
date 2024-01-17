
//Valdo: se va a rehacer el scipt

const nameInput = document.getElementById("Name-Input");
const lastNameInput = document.getElementById("LastName-Input");
const emailInput = document.getElementById("E-Mail-Input");
const passwordInput = document.getElementById("Password-Input");
const checkPasswordInput = document.getElementById("Check-Password-Input");

const invalidNameSign = document.getElementById("invalid-name-sign");
const invalidLastNameSign = document.getElementById("invalid-lastName-sign");
const invalidEmailSign = document.getElementById("invalid-email-sign");
const invalidPasswordSign = document.getElementById("invalid-password-sign");
const invalidCheckPasswordSign = document.getElementById("invalid-check-password-sign");

const errorMessageName = document.getElementById("error-message-name");
const errorMessageLastName = document.getElementById("error-message-lastName")
const errorMessageEmail = document.getElementById("error-message-email");
const errorMessagePassword = document.getElementById("error-message-password");
const errorMessageCheckPassword = document.getElementById("error-message-check-password");

errorMessageName.style.display="none";
errorMessageLastName.style.display="none";
errorMessageEmail.style.display="none";
errorMessagePassword.style.display="none";
errorMessageCheckPassword.style.display="none";

const successMessageContainer = document.getElementById("user-success-message-container");


const dataCheckout = (userUpdate) => {

    resetValues();

    const isNameValid = validateName(userUpdate.name, nameInput, invalidNameSign);
    const isLastNameValid = validateLastName(userUpdate.lastName, lastNameInput, invalidLastNameSign);
    const isEmailValid = validateEmail(userUpdate.email, emailInput, invalidEmailSign);
    const isPasswordValid = validatePassword(userUpdate.password, passwordInput, invalidPasswordSign);
    const isCheckPasswordValid = validateCheckPassword(userUpdate.password, userUpdate.checkPassword, checkPasswordInput, invalidCheckPasswordSign);

    return isNameValid && isLastNameValid && isEmailValid && isPasswordValid && isCheckPasswordValid;
};


const validateName = (name, nameInput, invalidNameSign) => {
    const regex = /^[a-zA-ZñÑ\s]+$/;
    if (name === "" || name.length > 25 || name.length < 2 || !regex.test(name)) {
        errorMessageName.style.display="block";
        errorMessage("Introduzca un nombre válido", errorMessageName);
        nameInput.classList.add("invalid");
        invalidNameSign.style.display = "block";
        return false;
    } else {
        errorMessageName.style.display="none";
        errorMessage("", errorMessageName);
        nameInput.classList.remove("invalid");
        invalidNameSign.style.display = "none";
        return true;
    }
};

const validateLastName = (lastName, lastNameInput, invalidLastNameSign) => {
    const regex = /^[a-zA-ZñÑ\s]+$/;
    if (lastName === "" || lastName.length > 25 || lastName.length < 2 || !regex.test(lastName)) {
        errorMessageLastName.style.display="block";
        errorMessage("Introduzca un apellido válido", errorMessageLastName);
        lastNameInput.classList.add("invalid");
        invalidLastNameSign.style.display = "block";
        return false;
    } else {
        errorMessageLastName.style.display="none";
        errorMessage("", errorMessageLastName);
        lastNameInput.classList.remove("invalid");
        invalidLastNameSign.style.display = "none";
        return true;
    }
};

const validateEmail = (email, emailInput, invalidEmailSign) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(email)) {
        errorMessageEmail.style.display="block";
        errorMessage("Introduzca un correo electrónico válido", errorMessageEmail);
        emailInput.classList.add("invalid");
        invalidEmailSign.style.display = "block";
        return false;
    } else {
        errorMessageEmail.style.display="none";
        errorMessage("", errorMessageEmail);
        emailInput.classList.remove("invalid");
        invalidEmailSign.style.display = "none";
        return true;
    }
};

const validatePassword = (password, passwordInput, invalidPasswordSign) => {
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasNumber = /\d/;

    if (!(hasUppercase.test(password) && hasLowercase.test(password) && hasNumber.test(password) && password.length >= 8)) {
        errorMessagePassword.style.display="block";
        errorMessage("La contraseña debe tener al menos una mayúscula, una minúscula, un número y ser de al menos 8 caracteres de longitud", errorMessagePassword);
        passwordInput.classList.add("invalid");
        invalidPasswordSign.style.display = "block";
        return false;
    } else {
        errorMessagePassword.style.display="none";
        errorMessage("", errorMessagePassword);
        passwordInput.classList.remove("invalid");
        invalidPasswordSign.style.display = "none";
        return true;
    }
};

const validateCheckPassword = (password, checkPassword, checkPasswordInput, invalidCheckPasswordSign) => {
    if (password !== checkPassword) {
        errorMessageCheckPassword.style.display="block";
        errorMessage("Las contraseñas no coinciden", errorMessageCheckPassword);
        checkPasswordInput.classList.add("invalid");
        invalidCheckPasswordSign.style.display = "block";
        return false;
    } else {
        errorMessageCheckPassword.style.display="none";
        errorMessage("", errorMessageCheckPassword);
        checkPasswordInput.classList.remove("invalid");
        invalidCheckPasswordSign.style.display = "none";
        return true;
    }
};



//Referencia del formulario de contacto
const registerForm = document.forms["user-form"];

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const userUpdate = {
        name: registerForm.elements["Name-Input"].value,
        lastName: registerForm.elements["LastName-Input"].value,
        email: registerForm.elements["E-Mail-Input"].value,
        password: registerForm.elements["Password-Input"].value,
        checkPassword: registerForm.elements["Check-Password-Input"].value
    };

    // Validar el formulario
    const isFormValid = dataCheckout(userUpdate);

    // Enviar datos solo si el formulario es válido
    if (isFormValid) {

        nameInput.classList.add("valid");
        lastNameInput.classList.add("valid");
        emailInput.classList.add("valid");
        passwordInput.classList.add("valid");
        checkPasswordInput.classList.add("valid");
        
        sendData(userUpdate);

        disableEditing();
    }
});


//Imprimir mensaje de error en DOM
const errorMessage = (message, messageContainer) => {
    messageContainer.innerHTML = message;

    if (message === "") {
        messageContainer.style.display = "none";
    } else {
        messageContainer.style.display = "block"; // Mostrar el contenedor de mensaje de error si hay un mensaje
    }
};


// Función para inhabilitar la edición
function disableEditing() {
    nameInput.setAttribute("readonly",true);
    lastNameInput.setAttribute("readonly",true);
    emailInput.setAttribute("readonly",true);
    passwordInput.setAttribute("readonly",true);
    checkPasswordInput.setAttribute("readonly",true);
}

// Función para restablecer valores y deshabilitar edición
const resetValues = () => {

    successMessageContainer.style.display = "none";

    nameInput.classList.remove("invalid");
    lastNameInput.classList.remove("invalid");
    emailInput.classList.remove("invalid");
    passwordInput.classList.remove("invalid");
    checkPasswordInput.classList.remove("invalid");

    nameInput.classList.remove("valid");
    lastNameInput.classList.remove("valid");
    emailInput.classList.remove("valid");
    passwordInput.classList.remove("valid");
    checkPasswordInput.classList.remove("valid");

    invalidNameSign.style.display = "none";
    invalidLastNameSign.style.display = "none";
    invalidEmailSign.style.display = "none";
    invalidPasswordSign.style.display = "none";
    invalidCheckPasswordSign.style.display = "none";

};

const showSuccessMessage = () => {
    successMessageContainer.style.display = "flex"; // Mostrar el contenedor de mensaje de éxito
};


const sendData = (userUpdate) => {
    //Gurdado de datos de usuario en localstorage (Se reemplazara el codigo para questos sean enviados a una api en un futuro)

    console.table(userUpdate);

    setTimeout(() => {showSuccessMessage();}, 1500);

    // Convertir el objeto user a una cadena JSON
    const userJSON = JSON.stringify(userUpdate);

    // Guardar en el localStorage
    localStorage.setItem("userData", userJSON);
};