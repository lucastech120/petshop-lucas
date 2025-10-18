/* 

CODIGO COMENTADO, RAZON: CODIGO PARTE DE LA PRIMER ENTREGA, COMENTADO PARA NO INTERFERIR CON LA SEGUNDA ENTREGA DEL CURSO DE JS. 26/9/2025 FECHA DE COMENTADO.
class Alimentos {
  constructor(id, peso, precio, especie) {
    this.id = id;
    this.peso = peso;
    this.precio = precio;
    this.especie = especie;
  }
  mostrarDescripcionCompleta() {
    return (
      this.id +
      " - " +
      this.peso +
      "Kg" +
      " | $ " +
      this.precio +
      " | " +
      this.especie
    );
  }
  getPrecio() {
    return this.precio;
  }
  setPrecio(nuevoPrecio) {
    this.precio = nuevoPrecio;
  }
  getId() {
    return this.id;
  }
}

let arregloAlimentos = [];
arregloAlimentos.push(new Alimentos("Pedigree", 10, 15000, "perros"));
arregloAlimentos.push(new Alimentos("Royal Canin", 15, 24000, "perros"));
arregloAlimentos.push(new Alimentos("Power", 20, 21000, "perros"));
arregloAlimentos.push(new Alimentos("Sabrositos", 20, 20000, "gatos"));
arregloAlimentos.push(new Alimentos("Cat Chow", 10, 16000, "gatos"));
arregloAlimentos.push(new Alimentos("Whiskas", 10, 13000, "gatos"));
arregloAlimentos.push(new Alimentos("Raza", 5, 4000, "gatos"));

let respuesta = "";
while (respuesta !== "salir") {
  respuesta = mostrarMenu();
}

function mostrarMenu() {
  let opcion = prompt(
    "¿Qué acción desea realizar?\n" +
      "1) Ver los alimentos\n" +
      "2) Asignar nuevo precio\n" +
      "3) Ordenar stock por precio\n" +
      "Escriba 'salir' para finalizar."
  );

  if (opcion === "1") {
    alert("Los alimentos son: \n" + mostrarStock());
  } else if (opcion === "2") {
    actualizarPrecio();
  } else if (opcion === "3") {
    ordenarStock();
    alert("Stock ordenado por precio:\n" + mostrarStock());
  }
  return opcion;
}

function actualizarPrecio() {
  let alimentoId = prompt("Ingrese el nombre del alimento a actualizar:");
  let indice = buscarAlimento(alimentoId);

  if (indice >= 0) {
    let nuevoValor = parseInt(prompt("Ingrese un nuevo precio:"));
    arregloAlimentos[indice].setPrecio(nuevoValor);
    alert("Precio actualizado correctamente.\n\n" + mostrarStock());
  } else {
    alert("No existe un alimento con ese nombre.");
  }
}

function buscarAlimento(id) {
  for (let i = 0; i < arregloAlimentos.length; i++) {
    if (arregloAlimentos[i].getId().toLowerCase() === id.toLowerCase()) {
      return i;
    }
  }
  return -1;
}

function mostrarStock() {
  let stock = "";
  for (let i = 0; i < arregloAlimentos.length; i++) {
    stock +=
      i + 1 + ") " + arregloAlimentos[i].mostrarDescripcionCompleta() + "\n";
  }
  return stock;
}
function ordenarStock() {
  arregloAlimentos.sort((a, b) => a.getPrecio() - b.getPrecio());
}
 */

// js/main.js
import './carrito.js';
import './utils.js';
import './busqueda.js';

import { actualizarContadorCarrito } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
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
    actualizarContadorCarrito();
    console.log("Carrito actualizado:", carrito); 
    mostrarNotificacion("Producto agregado ✅");
  }

  function mostrarNotificacion(mensaje) {
  const notificacion = document.getElementById("notificacion");
  notificacion.textContent = mensaje;
  notificacion.classList.add("mostrar");

  setTimeout(() => {
    notificacion.classList.remove("mostrar");
  }, 4000);
}

  fetch("../productos.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el archivo productos.json");
      }
      return response.json();
    })
    .then((productos) => {
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
          const producto = productos.find((p) => p.id === id);
          agregarAlCarrito(producto);
        });
      });
    })

    .catch((error) => console.error(error));

  actualizarContadorCarrito();
});
