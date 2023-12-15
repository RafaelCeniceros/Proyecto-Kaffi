const url = '../../login.json';

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

saveUsersLocalStorage(url);

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value; // Cambio de 'username' a 'email'
  const password = document.getElementById('password').value;
  
  if (!email || !password) {
    document.getElementById('error').innerText = 'Por favor, complete todos los campos.';
    return;
  }
  
  const storedUser = localStorage.getItem('userData');
  if (storedUser) {
    const userDataJS = JSON.parse(storedUser);
    let userFound = false; // Bandera para verificar si se encontró al usuario
    
    for (let i = 0; i < userDataJS.emails.length; i++) {
      if (email === userDataJS.emails[i]) { // Cambio de 'usuarios' a 'emails'
        userFound = true;
        if (password === userDataJS.contrasenas[i]) {
          window.location.href = '../../index.html';
          return;
        } else {
          document.getElementById('error').innerText = 'Email o contraseña incorrectos.';
          return; // Detener el bucle si el email coincide pero la contraseña no
        }
      }
    }
    
    if (!userFound) {
      document.getElementById('error').innerText = 'Email no encontrado.';
    }
  }
});
