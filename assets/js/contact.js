const nameInput = document.getElementById("Name-Input");
const emailInput = document.getElementById("E-Mail-Input");
const commentInput = document.getElementById("Commentary-Input");
const successMessageContainer = document.getElementById("success-message-container");
const invalidNameSign = document.getElementById("invalid-name-sign");
const invalidEmailSign = document.getElementById("invalid-email-sign");
const invalidCommentSign = document.getElementById("invalid-comment-sign");

import saveProductsInLocalStorage from "./saveProductsInLocalStorage.js";
const url = '../../productos-menu.json';
await saveProductsInLocalStorage(url);

// Función principal para validar el formulario
const dataCheckout = (user) => {

    resetValues();
    const isNameValid = validateName(user.name, nameInput, invalidNameSign);
    const isEmailValid = validateEmail(user.email, emailInput, invalidEmailSign);
    const isCommentValid = validateComment(user.commentary, commentInput, invalidCommentSign);

    return isNameValid && isEmailValid && isCommentValid;
};

// Función para validar el nombre
const validateName = (name, nameInput, invalidNameSign) => {
    const regex = /^[a-zA-Z\s]+$/;
    if (name === "" || name.length > 25 || name.length < 2 || !regex.test(name)) {
        errorMessage("Introduzca un nombre válido", errorMessageName);
        nameInput.classList.add("invalid");
        invalidNameSign.style.display = "block";
        return false;
    } else {
        errorMessage("", errorMessageName);
        nameInput.classList.remove("invalid");
        invalidNameSign.style.display = "none";
        return true;
    }
};

// Función para validar el correo electrónico
const validateEmail = (email, emailInput, invalidEmailSign) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(email)) {
        errorMessage("Introduzca un correo electrónico válido", errorMessageEmail);
        emailInput.classList.add("invalid");
        invalidEmailSign.style.display = "block";
        return false;
    } else {
        errorMessage("", errorMessageEmail);
        emailInput.classList.remove("invalid");
        invalidEmailSign.style.display = "none";
        return true;
    }
};

// Función para validar el comentario
const validateComment = (comment, commentInput, invalidCommentSign) => {
    if (comment.length < 10 || comment.length > 120) {
        errorMessage("Tu comentario debe tener entre 10 y 120 caracteres", errorMessageComment);
        commentInput.classList.add("invalid");
        invalidCommentSign.style.display = "block";
        return false;
    } else {
        errorMessage("", errorMessageComment);
        commentInput.classList.remove("invalid");
        invalidCommentSign.style.display = "none";
        return true;
    }
};

//Imprimir mensaje de error en DOM
const errorMessage = (message, messageContainer) => {
    messageContainer.innerHTML = message;

    if (message === "") {
        messageContainer.style.display = "none";
    } else {
        messageContainer.style.display = "block"; // Mostrar el contenedor de mensaje de error si hay un mensaje
    }
};

//Referencia del formulario de contacto
const contactForm = document.forms["contact-form"];
const errorMessageName = document.getElementById("error-message-name");
const errorMessageEmail = document.getElementById("error-message-email");
const errorMessageComment = document.getElementById("error-message-comment");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = {
        name: contactForm.elements["Name-Input"].value,
        email: contactForm.elements["E-Mail-Input"].value,
        commentary: contactForm.elements["Commentary-Input"].value
    };

    // Validar el formulario
    const isFormValid = dataCheckout(user);

    // Enviar datos solo si el formulario es válido
    if (isFormValid) {
        nameInput.classList.add("valid");
        emailInput.classList.add("valid");
        commentInput.classList.add("valid");
        sendData(user);
    }
});

//Envio de datos a correo electronico o a API
const sendData = (user) => {
    // Simulación de envío exitoso (puedes reemplazar esto con tu lógica real de envío)
    setTimeout(() => {
        console.table(user);
        // Mostrar el mensaje de éxito después de un tiempo (por ejemplo, 2 segundos)
        showSuccessMessage();
    }, 1500);
};

const showSuccessMessage = () => {
    successMessageContainer.style.display = "flex"; // Mostrar el contenedor de mensaje de éxito
};

const resetValues =()=>{
    successMessageContainer.style.display = "none";
    nameInput.classList.remove("invalid");
    emailInput.classList.remove("invalid");
    commentInput.classList.remove("invalid");
    invalidNameSign.style.display = "none";
    invalidEmailSign.style.display = "none";
    invalidCommentSign.style.display = "none";
    nameInput.classList.remove("valid");
    emailInput.classList.remove("valid");
    commentInput.classList.remove("valid");
}