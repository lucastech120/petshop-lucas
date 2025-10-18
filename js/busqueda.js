
document.addEventListener("DOMContentLoaded", async () => {
  const searchInput = document.querySelector(".search-box input");
  const contenedor = document.querySelector("#contenedor-cajas"); 
  if (!searchInput || !contenedor) return;
  let productos = [];
  try {
    const rutaJSON = window.location.pathname.includes("page") ? "../productos.json" : "productos.json";
    const response = await fetch(rutaJSON);
    productos = await response.json();
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }

  mostrarProductos(productos, contenedor);

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (query === "") {
      mostrarProductos(productos, contenedor); 
      return;
    }
    const resultados = productos.filter((p) =>
      p.nombre.toLowerCase().includes(query) ||
      p.marca?.toLowerCase().includes(query) ||
      p.categoria?.toLowerCase().includes(query)
    );
    mostrarProductos(resultados, contenedor);
  });
});

function mostrarProductos(lista, contenedor) {
  contenedor.innerHTML = ""; 
  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }
  lista.forEach((prod) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p class="precio">$${prod.precio}</p>
      <button class="btn-agregar" data-id="${prod.id}">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });

  const botonesAgregar = document.querySelectorAll(".btn-agregar");
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const idProducto = e.target.dataset.id;
      const producto = lista.find((p) => p.id == idProducto);
      if (producto) agregarAlCarrito(producto);
    });
  });
}


// Pruebas y pruebas, aun no funciona, ¡¡FIXEAR!!