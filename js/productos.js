import { agregarAlCarrito } from './carrito.js';
import { actualizarContadorCarrito } from './utils.js';

// Función para cargar y mostrar productos
export function mostrarProductos() {
  const contenedor = document.getElementById("contenedor-cajas");

  if (!contenedor) {
    console.info("No se encontró el contenedor 'contenedor-cajas' (productos.html).");
    return;
  }

  fetch("../productos.json")
    .then((response) => {
      if (!response.ok) throw new Error("No se pudo cargar el archivo productos.json");
      return response.json();
    })
    .then((productos) => {
      // Leer el filtro guardado en localStorage
      const filtro = JSON.parse(localStorage.getItem("filtroProductos"));
      let productosFiltrados = productos;

      // Aplicar el filtro si existe
      if (filtro) {
        productosFiltrados = productos.filter((p) => {
          const categoria = p.categoria?.toLowerCase();
          const subcategoria = p.subcategoria?.toLowerCase();

          if (filtro.subcategoria) {
            return (
              categoria === filtro.categoria &&
              subcategoria === filtro.subcategoria
            );
          } else {
            return categoria === filtro.categoria;
          }
        });
      }

      contenedor.innerHTML = "";

      // Mostrar productos (filtrados o todos)
      productosFiltrados.forEach((prod) => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
          <a href="detalles.html?id=${prod.id}" class="link-detalle">
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h3>${prod.nombre}</h3>
          </a>
          <p class="precio">$${prod.precio}</p>
          <button class="btn-agregar" data-id="${prod.id}">Comprar</button>
        `;

        contenedor.appendChild(div);
      });

      // Eventos de "Agregar al carrito"
      const botonesAgregar = document.querySelectorAll(".btn-agregar");
      botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
          const id = e.target.dataset.id;
          const producto = productos.find((p) => p.id == id);
          agregarAlCarrito(producto);
          actualizarContadorCarrito();
        });
      });
    })
    .catch((error) => console.error("Error al cargar productos:", error));
}
