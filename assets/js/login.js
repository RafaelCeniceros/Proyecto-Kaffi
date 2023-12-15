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
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Verifica datos de inicio de sesión
      if (username === userData.username && password === userData.password) {
        // Redireccionar a la página de inicio después del inicio de sesión exitoso
        window.location.href = 'pagina_de_inicio.html';
        return;
      }
    }
  
    // Si los datos son inválidos, muestra un mensaje de error
    document.getElementById('error').innerText = 'Nombre de usuario o contraseña incorrectos.';
  });
  
  // Almacena datos de usuario de prueba en el Local Storage
  const userTestData = { username: 'usuario_prueba', password: 'contraseña123' };
  localStorage.setItem('user', JSON.stringify(userTestData));
  