console.log("menu.js");

function changeContent(opcion) {
    // Modificar el contenido del div según la opción seleccionada
    const menuContent = document.getElementById('products');
    
    switch (opcion) {
      case 'cafes':
        menuContent.innerHTML = '<p>cafes</p>';
        break;
      case 'bebidas':
        menuContent.innerHTML = '<p>bebidas</p>';
        break;
      case 'frapes':
        menuContent.innerHTML = '<p>frapes</p>';
        break;
      case 'especialidades':
        menuContent.innerHTML = '<p>especialidades</p>';
        break;
      case 'bagets':
        menuContent.innerHTML = '<p>bagets</p>';
        break;
      case 'paninis':
        menuContent.innerHTML = '<p>paninis</p>';
        break;
      case 'cuernitos':
        menuContent.innerHTML = '<p>cuernitos</p>';
        break;
      case 'waffles':
        menuContent.innerHTML = '<p>waffles</p>';
        break;
      case 'panes':
        menuContent.innerHTML = '<p>panes</p>';
        break;
      default:
        menuContent.innerHTML = '<p>Selecciona una opción del menú.</p>';
        break;
    }
  };