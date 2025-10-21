import { actualizarContadorCarrito } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const contenedorCarrito = document.getElementById("carrito-items");
  const totalHTML = document.getElementById("total");
  const btnVaciar = document.getElementById("vaciar-carrito");

  if (!contenedorCarrito || !totalHTML) {
    console.warn("carrito.js: No se encontró el contenedor del carrito en esta página.");
    return;
  }

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function mostrarCarrito() {
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
      contenedorCarrito.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
      totalHTML.textContent = "";
      actualizarContadorCarrito();
      return;
    }

    carrito.forEach((prod) => {
      const div = document.createElement("div");
      div.classList.add("producto-carrito");

      div.innerHTML = `
        <img src="../${prod.imagen}" alt="${prod.nombre}">
        <div class="info">
          <h3>${prod.nombre}</h3>
          <p>Precio: $${prod.precio}</p>
          <div class="cantidad-control">
            <button class="btn-restar" data-id="${prod.id}">−</button>
            <span class="cantidad">${prod.cantidad}</span>
            <button class="btn-sumar" data-id="${prod.id}">+</button>
          </div>
          <p>Subtotal: $${prod.precio * prod.cantidad}</p>
          <button class="btn-eliminar" data-id="${prod.id}">Eliminar</button>
        </div>
      `;

      contenedorCarrito.appendChild(div);
    });

    actualizarTotal();
    agregarEventosEliminar();
    agregarEventosCantidad();
    actualizarContadorCarrito();
  }

  function actualizarTotal() {
    const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    totalHTML.textContent = `Total: $${total}`;
  }

  function agregarEventosEliminar() {
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");
    botonesEliminar.forEach((boton) => {
      boton.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        carrito = carrito.filter((prod) => prod.id !== id);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
      });
    });
  }

  function agregarEventosCantidad() {
    const botonesSumar = document.querySelectorAll(".btn-sumar");
    const botonesRestar = document.querySelectorAll(".btn-restar");

    botonesSumar.forEach((boton) => {
      boton.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const producto = carrito.find((p) => p.id === id);
        if (producto) {
          producto.cantidad++;
          localStorage.setItem("carrito", JSON.stringify(carrito));
          mostrarCarrito();
        }
      });
    });

    botonesRestar.forEach((boton) => {
      boton.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const producto = carrito.find((p) => p.id === id);
        if (producto && producto.cantidad > 1) {
          producto.cantidad--;
        } else {
          carrito = carrito.filter((p) => p.id !== id);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
      });
    });
  }

  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      carrito = [];
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
    });
  }

  mostrarCarrito();
});
