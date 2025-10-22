
import { agregarAlCarrito } from './carrito.js';
import { actualizarContadorCarrito } from './utils.js';

const contenedor = document.getElementById("contenedor-cajas");

if (contenedor) {
  fetch("../productos.json")
    .then((response) => {
      if (!response.ok) throw new Error("No se pudo cargar el archivo productos.json");
      return response.json();
    })
    .then((productos) => {
      productos.forEach((prod) => {
        const div = document.createElement("div");
        div.classList.add("producto");

      div.innerHTML = `
        <a href="detalles.html?id=${prod.id}" class="link-detalle">
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        </a>
        <p class="precio">$${prod.precio}</p>
        <button class="btn-agregar" data-id="${prod.id}">Agregar al carrito</button>
`;


        contenedor.appendChild(div);
      });

      const botonesAgregar = document.querySelectorAll(".btn-agregar");
      botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
          const id = e.target.dataset.id;
          fetch("../productos.json")
            .then((response) => response.json())
            .then((productos) => {
              const producto = productos.find((p) => p.id == id);
              agregarAlCarrito(producto);
              actualizarContadorCarrito();
            });
        });
      });
    })
    .catch((error) => console.error("Error:", error));
}
