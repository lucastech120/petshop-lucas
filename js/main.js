
import './carrito.js';
import './utils.js';
import './busqueda.js';

import { actualizarContadorCarrito } from "./utils.js";

const contenedor = document.getElementById("contenedor-cajas");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(producto) {
  const existente = carrito.find((item) => item.id === producto.id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito?.(); 
  console.log("Carrito actualizado:", carrito);
  console.log("Producto agregado ✅");
  mostrarNotificacion("Producto agregado ✅");
}

function mostrarNotificacion(mensaje) {
  const contenedorNotifs = document.getElementById("notificaciones-container");
  if (!contenedorNotifs) {
    console.warn(" No existe #notificaciones-container en este HTML");
    return;
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span>${mensaje}</span>
    <button aria-label="Cerrar">×</button>
  `;

  contenedorNotifs.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("mostrar");
  });

  const btn = toast.querySelector("button");
  btn.addEventListener("click", () => cerrarToast(toast));

  const AUTO_CLOSE_MS = 4000;
  const timer = setTimeout(() => cerrarToast(toast), AUTO_CLOSE_MS);

  function cerrarToast(el) {
    if (!el) return;
    el.classList.remove("mostrar");
    setTimeout(() => {
      clearTimeout(timer);
      el.remove();
    }, 400);
  }
}

//Funciones Globales
window.mostrarNotificacion = mostrarNotificacion;
window.agregarAlCarrito = agregarAlCarrito;


  fetch("../productos.json")
    .then((response) => {
      if (!response.ok) throw new Error("No se pudo cargar el archivo productos.json");
      return response.json();
    })
    .then((productos) => {
      if (!contenedor) {
        console.error(" No se encontró el contenedor de productos en el DOM");
        return;
      }

      productos.forEach((prod) => {
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
          const id = e.target.dataset.id;
          const producto = productos.find((p) => p.id == id);
          agregarAlCarrito(producto);
        });
      });
    })
    .catch((error) => console.error(error));

  actualizarContadorCarrito?.();
;

