
// Constantes para el formulario de actualización de nombre
const userNameForm = document.forms["user-name-form"];
const nameInput = document.getElementById("Name-Input");
const invalidNameSign = document.getElementById("invalid-name-sign");
const errorMessageName = document.getElementById("error-message-name");
const successMessageNameContainer = document.getElementById("name-success-message-container");

// Constantes para el formulario de actualización de apellido
const userLastNameForm = document.forms["user-lastName-form"];
const lastNameInput = document.getElementById("LastName-Input");
const invalidLastNameSign = document.getElementById("invalid-lastName-sign");
const errorMessageLastName = document.getElementById("error-message-lastName");
const successMessageLastNameContainer = document.getElementById("lastName-success-message-container");

// Constantes para el formulario de actualización de email
const userEmailForm = document.forms["user-email-form"];
const emailInput = document.getElementById("E-Mail-Input");
const invalidEmailSign = document.getElementById("invalid-email-sign");
const errorMessageEmail = document.getElementById("error-message-email");
const successMessageEmailContainer = document.getElementById("email-success-message-container");

// Constantes para el formulario de actualización de contraseña
const userPasswordForm = document.forms["user-password-form"];
const oldPasswordInput = document.getElementById("OldPassword-Input");
const newPasswordInput = document.getElementById("NewPasswor-Input");
const invalidOldPasswordSign = document.getElementById("invalid-oldPassword-sign");
const invalidNewPasswordSign = document.getElementById("invalid-newPassword-sign");
const errorMessageOldPassword = document.getElementById("error-message-oldPassword");
const errorMessageNewPassword = document.getElementById("error-message-newPassword");
const successMessagePasswordContainer = document.getElementById("password-success-message-container");



//Funcion de validacion de formulario de nombre
const dataNameCheckout = (nameUpdate) => {
    resetValues(nameInput,invalidNameSign,successMessageNameContainer);
    const isNameValid = validateName(nameUpdate.name, nameInput, invalidNameSign);
    return isNameValid 
};

//Funcion de validacion de formulario de apellido
const dataLastNameCheckout = (lastNameUpdate) => {
    resetValues(lastNameInput,invalidLastNameSign,successMessageLastNameContainer);
    const isLastNameValid = validateLastName(lastNameUpdate.lastName, lastNameInput, invalidLastNameSign);
    return isLastNameValid;
};

//Funcion de validacion de formulario de email
const dataEmailCheckout = (emailUpdate) => {
    resetValues(emailInput,invalidEmailSign,successMessageEmailContainer);
    const isEmailValid = validateEmail(emailUpdate.email, emailInput, invalidEmailSign);
    return isEmailValid;
};

//Funcion de validacion de formulario de email
const dataPasswordCheckout = (passwordUpdate) => {
    resetPasswordValues();
    //const isOldPasswordValid = validateOldPassword(passwordUpdate.oldPassword, oldPasswordInput, invalidOldPasswordSign);
    const isNewPasswordValid = validateNewPassword(passwordUpdate.newPassword, newPasswordInput, invalidNewPasswordSign);
    //return isOldPasswordValid && isNewPasswordValid;
    return isNewPasswordValid;

};

//Validacion de nombre
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

//Validacion de apellido
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

//Validacion de email
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

//Validacion de la nueva contraseña
const validateNewPassword = (newPassword, newPasswordInput, invalidNewPasswordSign) => {
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasNumber = /\d/;

    if (!(hasUppercase.test(newPassword) && hasLowercase.test(newPassword) && hasNumber.test(newPassword) && newPassword.length >= 8)) {
        errorMessageNewPassword.style.display="block";
        errorMessage("La contraseña debe tener al menos una mayúscula, una minúscula, un número y ser de al menos 8 caracteres de longitud", errorMessageNewPassword);
        newPasswordInput.classList.add("invalid");
        invalidNewPasswordSign.style.display = "block";
        return false;
    } else {
        errorMessageNewPassword.style.display="none";
        errorMessage("", errorMessageNewPassword);
        newPasswordInput.classList.remove("invalid");
        invalidNewPasswordSign.style.display = "none";
        return true;
    }
};


userNameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameUpdate = {name: userNameForm.elements["Name-Input"].value};
    const isNameFormValid = dataNameCheckout(nameUpdate);
    
    // Enviar datos solo si el formulario es válido
    if (isNameFormValid) {
        
        nameInput.classList.add("valid");

        sendNameData(nameUpdate);
        disableEditing(nameInput);
    }
});

userLastNameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const lastNameUpdate = { lastName: userLastNameForm.elements["LastName-Input"].value };
    const isLastNameFormValid = dataLastNameCheckout(lastNameUpdate);

    // Enviar datos solo si el formulario es válido
    if (isLastNameFormValid) {

        lastNameInput.classList.add("valid");

        sendLastNameData(lastNameUpdate);
        disableEditing(lastNameInput);
    }
});

userEmailForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailUpdate = { email: userEmailForm.elements["E-Mail-Input"].value };
    const isEmailFormValid = dataEmailCheckout(emailUpdate);

    // Enviar datos solo si el formulario es válido
    if (isEmailFormValid) {

        emailInput.classList.add("valid");

        sendEmailData(emailUpdate);
        disableEditing(emailInput);
    }
});

userPasswordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const passwordUpdate = {
        oldPassword: userPasswordForm.elements["OldPassword-Input"].value,
        newPassword: userPasswordForm.elements["NewPasswor-Input"].value
    };
    const isPasswordFormValid = dataPasswordCheckout(passwordUpdate);

    // Enviar datos solo si el formulario es válido
    if (isPasswordFormValid) {

        oldPasswordInput.classList.add("valid");
        newPasswordInput.classList.add("valid");

        sendPasswordData(passwordUpdate);
        disableEditing(oldPasswordInput);
        disableEditing(newPasswordInput);
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

//Imprimir mensaje de exito en el DOM
const successMessage = (messageContainer) => {
    messageContainer.style.display = "flex";
};


// Función para inhabilitar la edición
const disableEditing = (fieldInput) => {
    fieldInput.setAttribute("readonly",true);
}



// Función para restablecer valores y deshabilitar edición
const resetValues = (fieldInput,sign,successMessage) => {
    fieldInput.classList.remove("invalid");
    fieldInput.classList.remove("valid");
    sign.style.display = "none";
    successMessage.style.display = "none";
};

const resetPasswordValues = () =>{
    oldPasswordInput.classList.remove("invalid");
    newPasswordInput.classList.remove("invalid");
    oldPasswordInput.classList.remove("valid");
    newPasswordInput.classList.remove("valid");
    invalidNewPasswordSign.style.display = "none";
    invalidOldPasswordSign.style.display = "none";
    successMessagePasswordContainer.style.display = "none";
}


//Funcion para enviar datos de actualizacion de nombre
const sendNameData = (nameUpdate) => {
    console.table(nameUpdate);

    setTimeout(() => {
        successMessage(successMessageNameContainer);
    }, 1500);

    const nameJSON = JSON.stringify(nameUpdate);
    localStorage.setItem("nameData", nameJSON);
};


// Función para enviar datos de actualización de apellido
const sendLastNameData = (lastNameUpdate) => {
    console.table(lastNameUpdate);

    setTimeout(() => {
        successMessage(successMessageLastNameContainer);
    }, 1500);

   
    const lastNameJSON = JSON.stringify(lastNameUpdate);
    localStorage.setItem("lastNameData", lastNameJSON);
};

// Función para enviar datos de actualización de email
const sendEmailData = (emailUpdate) => {
    console.table(emailUpdate);

    setTimeout(() => {
        successMessage(successMessageEmailContainer);
    }, 1500);

    const emailJSON = JSON.stringify(emailUpdate);
    localStorage.setItem("emailData", emailJSON);
};

// Función para enviar datos de actualización de contraseña
const sendPasswordData = (passwordUpdate) => {
    console.table(passwordUpdate);

    setTimeout(() => {
        successMessage(successMessagePasswordContainer);
    }, 1500);

    const passwordJSON = JSON.stringify(passwordUpdate);
    localStorage.setItem("passwordData", passwordJSON);
};