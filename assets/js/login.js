const url = '../../users.json';

const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  if (accessToken) {
    console.log("Inicio de sesion detectado")
    console.log("UserType:" + accessToken.userType);
    if (accessToken.userType === 1) {
      window.location.href = "../pages/admin-profile.html";
    } else if (accessToken.userType === 2) {
      window.location.href = "../pages/profile.html";
    }
  }else {
    window.location.href = "../pages/login.html#login-container";
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
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  if (accessToken) {
    console.log("Inicio de sesion detectado")
    console.log("UserType:" + accessToken.userType);
    if (accessToken.userType === 1) {
      window.location.href = "../pages/admin-profile.html";
    } else if (accessToken.userType === 2) {
      window.location.href = "../pages/profile.html";
    }
  }
  else {
    window.location.href = "../pages/login.html#login-container";
  }
})


document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  saveUsersLocalStorage(url);
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  if (!email || !password) {
    document.getElementById('error').innerText = 'Por favor, complete todos los campos.';
    return;
  }
  
  const storedUsers = JSON.parse(localStorage.getItem('userData'));
  
  if (storedUsers) {
    let userFound = false;
    
    for (let i = 0; i < storedUsers.length; i++) {
      if (email === storedUsers[i].email) {
        userFound = true;
        if (password === storedUsers[i].password) {
          // Crear un objeto accessToken con la información necesaria
          const accessToken = {
            userId: storedUsers[i].id,
            userName: storedUsers[i].firstName,
            userType: storedUsers[i].UserType.id
          };

          // Almacenar el accessToken en el localStorage
          localStorage.setItem('accessToken', JSON.stringify(accessToken));
          localStorage.removeItem("userData"); //Remover la informacion de los usuarios
          // Cambiar la redirección dependiendo del UserType (tipo de usuario)
          if (storedUsers[i].UserType.id === 1) {
            window.location.href = "../pages/admin-profile.html";
          } else if (storedUsers[i].UserType.id === 2) {
            window.location.href = "../pages/profile.html";
          }
          return;
        } else {
          document.getElementById('error').innerText = 'Email o contraseña incorrectos.';
          return;
        }
      }
    }
    
    if (!userFound) {
      document.getElementById('error').innerText = 'Email no encontrado.';
    }
  }
});