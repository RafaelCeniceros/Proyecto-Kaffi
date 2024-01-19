
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
    const isNameValid = validateName(nameUpdate, nameInput, invalidNameSign);
    return isNameValid 
};

//Funcion de validacion de formulario de apellido
const dataLastNameCheckout = (lastNameUpdate) => {
    resetValues(lastNameInput,invalidLastNameSign,successMessageLastNameContainer);
    const isLastNameValid = validateLastName(lastNameUpdate, lastNameInput, invalidLastNameSign);
    return isLastNameValid;
};

//Funcion de validacion de formulario de email
const dataEmailCheckout = async (emailUpdate) => {
    resetValues(emailInput,invalidEmailSign,successMessageEmailContainer);
    const isEmailValid = await validateEmail(emailUpdate, emailInput, invalidEmailSign);
    return isEmailValid;
};

async function checkIfEmailExists(email){

    const userData = await getUsers();

    // Verifica si el correo electrónico ya existe en los datos del usuario
    const emailExists = userData.some(userData => userData.email === email);

    if (emailExists) {
        // Si el correo ya existe
        return true;
    } else {
        // Si el correo no existe
        return false;
    }
}

//Funcion de validacion de formulario de email
const dataPasswordCheckout = async (passwordUpdate) => {
    resetPasswordValues();
    const isOldPasswordCorrect = await PasswordValidation(passwordUpdate.oldPassword);
    if (isOldPasswordCorrect){
        const isNewPasswordValid = validateNewPassword(passwordUpdate.newPassword, newPasswordInput, invalidNewPasswordSign);
        //return isOldPasswordValid && isNewPasswordValid;
        return isNewPasswordValid;
    }
    else{
        errorMessageNewPassword.style.display="block";
        errorMessage("Tu contraseña actual es incorrecta", errorMessageNewPassword);
        newPasswordInput.classList.add("invalid");
        invalidNewPasswordSign.style.display = "block";
        return false;
    } 

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
const validateEmail = async (email, emailInput, invalidEmailSign) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(email)) {
        errorMessageEmail.style.display="block";
        errorMessage("Introduzca un correo electrónico válido", errorMessageEmail);
        emailInput.classList.add("invalid");
        invalidEmailSign.style.display = "block";
        return false;
    } else {
        const isExistingEmail= await checkIfEmailExists (email);
        if(isExistingEmail){
            errorMessageEmail.style.display="block";
            errorMessage("Email ingresado ya esta registrado", errorMessageEmail);
            emailInput.classList.add("invalid");
            invalidEmailSign.style.display = "block";
        }
        else{
            errorMessageEmail.style.display="none";
            errorMessage("", errorMessageEmail);
            emailInput.classList.remove("invalid");
            invalidEmailSign.style.display = "none";
            return true;
        }
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

async function PasswordValidation(oldPasswordInput){
    const userInfo = await getUserData(getUserID());
    if (userInfo.password == oldPasswordInput){
        return true;
    }
    else{
        return false;
    }
}

userNameForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nameUpdate = userNameForm.elements["Name-Input"].value;
    const isNameFormValid = dataNameCheckout(nameUpdate);
    // Enviar datos solo si el formulario es válido
    if (isNameFormValid) {
        
        nameInput.classList.add("valid");
        const objNewName = await editData("firstName", nameUpdate);
        await sendData(objNewName, successMessageNameContainer);
        disableEditing(nameInput);
        printOnDOMUserData();
    }
});

userLastNameForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const lastNameUpdate = userLastNameForm.elements["LastName-Input"].value;
    const isLastNameFormValid = dataLastNameCheckout(lastNameUpdate);

    // Enviar datos solo si el formulario es válido
    if (isLastNameFormValid) {

        lastNameInput.classList.add("valid");
        const objNewLastName = await editData("lastName", lastNameUpdate);
        await sendData(objNewLastName, successMessageLastNameContainer);
        disableEditing(lastNameInput);
        printOnDOMUserData();
    }
});

userEmailForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const emailUpdate = userEmailForm.elements["E-Mail-Input"].value;
    const isEmailFormValid = await dataEmailCheckout(emailUpdate);

    // Enviar datos solo si el formulario es válido
    if (isEmailFormValid) {

        emailInput.classList.add("valid");
        const objNewEmail = await editData("email", emailUpdate);
        await sendData(objNewEmail, successMessageEmailContainer);
        disableEditing(emailInput);
        printOnDOMUserData();
    }
});

userPasswordForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const passwordUpdate = {
        oldPassword: userPasswordForm.elements["OldPassword-Input"].value,
        newPassword: userPasswordForm.elements["NewPasswor-Input"].value
    };
    const isPasswordFormValid = await dataPasswordCheckout(passwordUpdate);
    // Enviar datos solo si el formulario es válido
    if (isPasswordFormValid) {

        oldPasswordInput.classList.add("valid");
        newPasswordInput.classList.add("valid");
        const objNewPassword = await editData("password", passwordUpdate.newPassword);
        await sendData(objNewPassword,successMessagePasswordContainer);
        disableEditing(oldPasswordInput);
        disableEditing(newPasswordInput);
        printOnDOMUserData();
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


//Funcion para enviar datos de actualizacion
const sendData = async (UpdatedInfo, successContainer) => {
    console.log(UpdatedInfo);
    try {
        const apiUrl = "https://kaffi-ecommerce.onrender.com/api/v1/users/"+getUserID();
        
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
        successMessage(successContainer);
        // Puedes realizar acciones adicionales aquí después de recibir una respuesta exitosa
    } catch (error) {
        console.error("Error:", error.message);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje al usuario
    }

};


async function getUsers (){
    const localStorageTimeLimit_s = 5; // Tiempo de vida límite del localStorage en segundos
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

async function printOnDOMUserData(){

    const welcomeHTML = document.getElementById("welcome-name");
    const actualName = document.getElementById("actual-name");
    const actualLastname = document.getElementById("actual-lastName");
    const actualEmail = document.getElementById("actual-email");
    const userInfo = await getUserData(getUserID());

        actualName.textContent = userInfo.firstName;
        actualLastname.textContent = userInfo.lastName;
        actualEmail.textContent = userInfo.email;
        welcomeHTML.textContent = "Bienvenido, " + userInfo.firstName;
}

await printOnDOMUserData();

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

