const url = '../../login.json';

const saveUsersLocalStorage = async (url) => {
  // fetch: promesa de recuperar la info de la url
  await fetch(url)
  .then((response) => {
    return response.json(); // response.json(): promesa de convertir la info devuelta por fetch en un objeto JS
  })
  .then((infoLogin) => {
    console.log(infoLogin); // se imprime en console
    localStorage.setItem("userData", JSON.stringify(infoLogin));
    })
  .catch(error => {
    console.log(error);
  })
}

saveUsersLocalStorage(url);

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Verifica campos vacíos
    if (!username || !password) {
      document.getElementById('error').innerText = 'Por favor, complete todos los campos.';
      return;
    }
  
    // Obtiene datos almacenados del Local Storage
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const userDataJS = JSON.parse(storedUser);
      // Verifica datos de inicio de sesión
      console.log(userDataJS);
      // itera sobre todo el arreglo en busca de alguna coincidencia con el usuario 
      // que la persona ingresó
      for(let i=0; i < userDataJS.usuarios.length; i++) {
        // si encontró el usuario entonces checar si la contraseña que ingresó la persona es la misma que la contraseña correspondiente al indice  del usuario
        if (username === userDataJS.usuarios[i]) {
          // si ingresó correctamente su contrasena, logearlo
          if (password === userDataJS.contrasenas[i]) {
             // Redireccionar a la página de inicio después del inicio de sesión exitoso
             window.location.href = '../../index.html';
             return;
             // en caso contrario 
          } else {
            document.getElementById('error').innerText = 'Nombre de usuario o contraseña incorrectos.';
          }
        } else {
          // Si los datos son inválidos, muestra un mensaje de error
          document.getElementById('error').innerText = 'Nombre de usuario o contraseña incorrectos.';
        }
      }       
    }     
  });
  

  