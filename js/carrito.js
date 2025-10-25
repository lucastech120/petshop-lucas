import { actualizarContadorCarrito } from "./utils.js";
import { mostrarNotificacion } from './ui.js';

// Función fuera del DOMContentLoaded para separar las lógicas 

// Buscamos el item, si el item existe devolvemos true

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

export function agregarAlCarrito(producto) {
  if (!producto) return;

  const existe = carrito.find((item) => item.id === producto.id);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  console.log("Carrito actualizado:", carrito);
  console.log("Producto agregado ✅");
  mostrarNotificacion(`✅ ${producto.nombre} agregado al carrito`);
}


//  Todo el render del  carrito permanece en el evento DOMContentLoaded:

// Crea un contenedor por cada producto del carrito, y les agrega funciones de cantidad - / + y eliminar individualmente, 
// al final, función para vaciarlo entero con cartel de confirmación


document.addEventListener("DOMContentLoaded", () => {
  const contenedorCarrito = document.getElementById("carrito-items");
  const totalHTML = document.getElementById("total");
  const btnVaciar = document.getElementById("vaciar-carrito");

  if (!contenedorCarrito || !totalHTML) {
    console.info("No se encontró el contenedor del carrito en esta página."); // Aviso en consola por si carrito.js se ejecuta fuera de carrito.html
    return;
  }

  function mostrarCarrito() {
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
      contenedorCarrito.innerHTML = "<p>☹ Tu carrito está vacío ☹</p>";
      totalHTML.textContent = "";
      actualizarContadorCarrito();
      return;
    }

    carrito.forEach((prod) => {
      const div = document.createElement("div");
      div.classList.add("producto-carrito");

      div.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}">
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
    actualizarContadorCarrito(); // Llamamos a las funciones que necesitamos actualizar cada vez que agregamos +1 producto al carrito
  }

  function actualizarTotal() {
    const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    totalHTML.textContent = `Total: $${total}`;
  }

  function agregarEventosEliminar() {
    document.querySelectorAll(".btn-eliminar").forEach((boton) => {
      boton.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        carrito = carrito.filter((prod) => prod.id !== id);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
      });
    });
  }

  function agregarEventosCantidad() {
    document.querySelectorAll(".btn-sumar").forEach((boton) => {
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

    document.querySelectorAll(".btn-restar").forEach((boton) => {
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

  // Confirmación si el usuario desea vaciar el carrito o no

  const confirmacion = document.getElementById("confirmacion");
  const btnConfirmar = document.getElementById("confirmacion-boton1");
  const btnCancelar = document.getElementById("confirmacion-boton2");

  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      confirmacion.style.display = "flex"; 
    });
  }

  btnCancelar.addEventListener("click", () => {
    confirmacion.style.display = "none"; 
  });

  btnConfirmar.addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    confirmacion.style.display = "none"; 
  });

 // Botón para pagar
const btnPagar = document.getElementById("pagar-carrito");
if (btnPagar) {
  btnPagar.addEventListener("click", () => {
    if (carrito.length === 0) {
      mostrarNotificacion("Tu carrito está vacío 😕", "error");
      return;
    }

    // Simulación de pago
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    mostrarNotificacion("¡Compra realizada con éxito! 🎉", "exito");

  });
  mostrarCarrito();
}})
