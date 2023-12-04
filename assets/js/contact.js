console.log("contact page");

//Referencia del formulario de contacto
const contactForm = document.forms["contact-form"];

contactForm.addEventListener ("submit",(event) =>{
    event.preventDefault();
    console.log(event);

    const user = {
        name : contactForm.elements["Name-Imput"].value,
        email : contactForm.elements["E-Mail-Imput"].value,
        commentary : contactForm.elements["Commentary-Imput"].value
    };

    if (dataCheckout(user)) {
        sendData(user);
    };
});  

//Validacion de formulario
const dataCheckout = (user) =>{
    let response = true;
    const regex = /^[a-zA-Z\s]+$/;
    const regex2 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    
    if(user.name === ""){
        errorMessage("Introduzca un nombre válido*");
        response = false;
    } else if (user.name.length > 25 || user.name.length < 2 ){
        errorMessage("Su nombre debe tener entre 2 y 25 caracteres*");
        response = false;
    } else if (!regex.test(user.name)){
        errorMessage("Tu nombre solo puede contener letras y espacios*");
        response = false;
    } else if (!regex2.test(user.email)){
        errorMessage("Introduzca un correo electrónico válido*");
        response = false;
    } else if (user.commentary.length < 10 || user.commentary.length > 120 ){
        errorMessage("Tu comentario debe tener entre 10 y 120 caracteres*");
        response = false;
    } else {
        errorMessage("");
    }

    return response;
};


//Imprimir mensaje de error en DOM
const errorMessage = (message) => {
    console.log(message);
    const errorMessage = document.getElementById("error-message");
    const errorMessageContainer = document.getElementById ("error-message-container");

    errorMessage.innerHTML = message;
    if (message === ""){
        errorMessageContainer.style.display = "none";   
    }else { errorMessageContainer.style.display = "block";
    }
};


//Envio de datos a correo electronico o a API
const sendData = ( user ) => {
    console.table(user);
};