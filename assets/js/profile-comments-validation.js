
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

    const isCommentValid = validateComment(commentary, commentaryInput, invalidCommentarySign);

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

    const newComment = {
        date: getActualDateTime(),
        comment: commentaryForm.elements["Commentary-Input"].value,
        user: {id: getUserID()}
    };

    // Validar el formulario
    const isFormValid = dataCheckout(newComment.comment);

    // Enviar datos solo si el formulario es válido
    if (isFormValid) {

        commentaryInput.classList.add("valid")
        
        sendData(newComment);
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

const getActualDateTime = () => {
    // Obtener la fecha y hora actuales
    const currentDate = new Date();
  
    // Obtener los componentes de la fecha
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
  
    // Obtener los componentes de la hora
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  
    // Obtener el desplazamiento horario (timezone offset) en minutos
    const timezoneOffsetMinutes = currentDate.getTimezoneOffset();
    const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffsetMinutes / 60));
    const timezoneOffsetSign = timezoneOffsetMinutes > 0 ? '-' : '+';
  
    // Formatear la fecha y hora en el formato deseado (YYYY-MM-DDTHH:mm:ss.SSSZ)
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000${timezoneOffsetSign}${String(timezoneOffsetHours).padStart(2, '0')}:${String(Math.abs(timezoneOffsetMinutes % 60)).padStart(2, '0')}`;
  
    return formattedDateTime;
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


// Envío de datos
const sendData = (commentary) => {
    
    // Convertir el objeto user a una cadena JSON
    const commentJSON = JSON.stringify(commentary);

    console.log(commentJSON);
    // Limpiar el campo de entrada después de enviar el comentario
    commentaryForm.elements["Commentary-Input"].value = '';

    // Mostrar mensaje de éxito
    setTimeout(() => {
        showSuccessMessage();
    }, 1500);
};