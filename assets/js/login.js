import { showQuantityOfItems } from "./add-delete-products-to-ls.js";
showQuantityOfItems();

const url = '../../users.json';

const checkifAccessToken = () => {
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
      console.log("Inicio de sesion detectado")
      console.log("UserType:" + accessToken.userType);
      if (accessToken.userType === 1) {
        window.location.href = "../pages/admin-profile.html";
      } else if (accessToken.userType === 2) {
        window.location.href = "../pages/profile.html";
      }
    }
  } else {
    window.location.href = "../pages/login.html#login-container";
  }
}



const saveUsersLocalStorage = async (url) => {
  try {
    const response = await fetch(url);
    const infoLogin = await response.json();
    console.log(infoLogin);
    localStorage.setItem("userData", JSON.stringify(infoLogin));
  } catch (error) {
    console.log(error);
  }
};


const userLoginButton = document.getElementById("enlace-login-header");
userLoginButton.addEventListener("click", event => {
  event.preventDefault();
  // Obtener el accessToken encriptado desde el localStorage
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
      console.log("Inicio de sesion detectado")
      console.log("UserType:" + accessToken.userType);
      if (accessToken.userType === 1) {
        window.location.href = "../pages/admin-profile.html";
      } else if (accessToken.userType === 2) {
        window.location.href = "../pages/profile.html";
      }
    }
  } else {
    window.location.href = "../pages/login.html#login-container";
  }
});


document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    document.getElementById('error').innerText = 'Por favor, complete todos los campos.';
    return;
  }

  await saveUsersLocalStorage(url);
  const storedUsers = getStoredUsers();

  if (storedUsers) {
    const user = findUserByEmail(storedUsers, email);

    if (user) {
      if (password === user.password) {
        handleSuccessfulLogin(user);
      } else {
        displayError('Email o contraseña incorrectos.');
      }
    } else {
      displayError('Email no registrado.');
    }
  }
});

function getStoredUsers() {
  return JSON.parse(localStorage.getItem('userData')) || [];
}

function findUserByEmail(users, email) {
  return users.find(user => user.email === email);
}

function handleSuccessfulLogin(user) {
  const accessToken = createAccessToken(user);

  // Almacenar el accessToken en el localStorage
  storeAccessToken(accessToken);

  // Eliminar la información de los usuarios del localStorage
  removeAllUsersFromLocalStorage();
  console.log('Informacion de usuarios eliminada');

  // Redireccionar al usuario
  redirectToProfilePage(accessToken.userType);
}

function createAccessToken(user) {
  const { id, firstName, UserType } = user;
  return {
    userId: id,
    userName: firstName,
    userType: UserType.id
  };
}

function storeAccessToken(accessToken) {
  const secretWord = 'CodeTitansRafaFerValdoAlan';
  const accessTokenJSON = JSON.stringify(accessToken);
  const encryptedAccessToken = CryptoJS.AES.encrypt(accessTokenJSON, secretWord).toString();
  localStorage.setItem('accessToken', encryptedAccessToken);
}

function removeAllUsersFromLocalStorage() {
  localStorage.removeItem('userData');
}

function displayError(message) {
  document.getElementById('error').innerText = message;
}

function redirectToProfilePage(userType) {
  const redirectUrl = userType === 1 ? '../pages/admin-profile.html' : '../pages/profile.html';
  window.location.href = redirectUrl;
}

checkifAccessToken();