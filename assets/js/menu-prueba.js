const categoriasSelect = document.getElementById('categorias');
const productosContainer = document.getElementById('productos-container');

// Función para cargar los productos desde el archivo JSON
async function cargarProductos() {
  try {
    const response = await fetch('productos.json');
    const datosProductos = await response.json();

    // Llenar el menú desplegable con las categorías
    datosProductos.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria.categoria;
      option.textContent = categoria.categoria;
      categoriasSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}

// Función para mostrar los productos de la categoría seleccionada
async function mostrarProductos() {
  const categoriaSeleccionada = categoriasSelect.value;

  try {
    const response = await fetch('productos.json');
    const datosProductos = await response.json();
    
    const productos = datosProductos.find(cat => cat.categoria === categoriaSeleccionada).productos;

    // Generar el HTML de los productos
    const productosHTML = productos.map(producto => `
      <div class="producto">
        ${producto.imagen ? `<img src="${producto.imagen}" alt="${producto.nombre}" width="100">` : ''}
        <p>Precio: $${producto.precio.toFixed(2)}</p>
        <p>Descripción: ${producto.descripcion || 'No disponible'}</p>
        <h3>${producto.nombre}</h3>
      </div>
    `).join('');

    productosContainer.innerHTML = productosHTML;
  } catch (error) {
    console.error('Error al mostrar los productos:', error);
  }
}

// Cargar productos al cargar la página
cargarProductos();
