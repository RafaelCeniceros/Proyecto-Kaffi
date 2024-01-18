
// Variable para campo de entrada
const commentaryInput = document.getElementById("Commentary-Input");
// Variable para signo de error
const invalidCommentarySign = document.getElementById("invalid-comment-sign");
// Variable para mensaje de error
const errorMessageCommentary = document.getElementById("error-message-comment");
//Variable para mensaje de exito
const successMessageContainer = document.getElementById("comments-success-message-container");
//Referencia del formulario de direccion
const commentaryForm = document.forms["commentary-form"];

//Funcion de validacion de formulario
const dataCheckout = (commentary) => {

    resetValues();

    const isCommentValid = validateComment(commentary.comment, commentaryInput, invalidCommentarySign);

    return isCommentValid 
   
};


//Validacion de comentario
const validateComment = (comment, commentaryInput, invalidCommentarySign) => {
    if (comment === "" || comment.length < 10 || comment.length > 200) {
        errorMessage("Tu comentario debe tener entre 10 y 200 caracteres", errorMessageCommentary);
        commentaryInput.classList.add("invalid");
        invalidCommentarySign.style.display = "block";
        return false;
    } else {
        errorMessageCommentary.style.display = "none";
        errorMessage("", errorMessageCommentary);
        commentaryInput.classList.remove("invalid");
        invalidCommentarySign.style.display = "none";
        return true;
    }
};

//Almacenamiento de datos
commentaryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const commentary = {comment: commentaryForm.elements["Commentary-Input"].value};

    // Validar el formulario
    const isFormValid = dataCheckout(commentary);

    // Enviar datos solo si el formulario es válido
    if (isFormValid) {

        commentaryInput.classList.add("valid")
        
        sendData(commentary);
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

const resetValues = () => {

    successMessageContainer.style.display = "none";

    commentaryInput.classList.remove("invalid");
    commentaryInput.classList.remove("valid");
    invalidCommentarySign.style.display = "none";

};

// Envío de datos
const sendData = (commentary) => {
    
    console.table(commentary);

    // Convertir el objeto user a una cadena JSON
    const commentJSON = JSON.stringify(commentary);

    // Guardar en el localStorage
    localStorage.setItem("commentary", commentJSON);

    // Limpiar el campo de entrada después de enviar el comentario
    commentaryForm.elements["Commentary-Input"].value = '';

    // Mostrar mensaje de éxito
    setTimeout(() => {
        showSuccessMessage();
    }, 1500);
};