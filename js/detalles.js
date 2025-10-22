import { agregarAlCarrito } from "./carrito.js";
import { mostrarNotificacion } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const idProducto = params.get("id");

  fetch("../productos.json")
    .then((res) => res.json())
    .then((productos) => {
      const producto = productos.find((p) => p.id == idProducto);
      const cont = document.getElementById("detalle-producto");
      if (!producto) {
        cont.innerHTML = "<p>Producto no encontrado</p>";
        return;
      }
      renderDetalle(producto);
    })
    .catch((err) => console.error("Error cargando producto:", err));
});


function renderDetalle(prod) {
  const cont = document.getElementById("detalle-producto");
  cont.innerHTML = `
    <div class="detalle">
      <div class="detalle-imagenes">
        <img src="${prod.imagen}" alt="${prod.nombre}" class="imagen-principal">
        <div class="miniaturas">
          <img src="${prod.imagen}" alt="Vista 1">
          <img src="${prod.imagen}" alt="Vista 2">
          <img src="${prod.imagen}" alt="Vista 3">
        </div>
      </div>

      <div class="detalle-info">
        <h2>${prod.nombre}</h2>
        <p class="precio">$${prod.precio.toLocaleString()}</p>

        <p class="promos">
          <span class="badge bg-warning text-dark">3 cuotas sin interés</span>
          <br>
          <small>15% OFF pagando por transferencia</small>
        </p>

        <div class="talles">
          <label>Talle:</label>
          <div class="opciones-talle">
            <button class="talle">35</button>
            <button class="talle">36</button>
            <button class="talle">37</button>
            <button class="talle">38</button>
            <button class="talle">39</button>
          </div>
        </div>

        <div class="cantidad">
          <label for="cantidad">Cantidad:</label>
          <input id="cantidad" type="number" min="1" value="1">
        </div>

        <button id="agregar-detalle" class="btn-agregar-detalle">
          Agregar al carrito 🛒
        </button>

        <div class="info-extra">
          <p><strong>Compra protegida:</strong> tus datos cuidados durante toda la compra.</p>
          <p><strong>Cambios:</strong> si no te gusta, podés solicitar cambio.</p>
        </div>
      </div>
    </div>
  `;

  document.getElementById("agregar-detalle").addEventListener("click", () => {
    const cantidad = parseInt(document.getElementById("cantidad").value) || 1;
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito(prod);
    }
    mostrarNotificacion(`${prod.nombre} agregado al carrito ✅`);
  });

  // cambio de imagen principal al hacer clic en miniaturas
  const imagenPrincipal = cont.querySelector(".imagen-principal");
  cont.querySelectorAll(".miniaturas img").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      imagenPrincipal.src = thumb.src;
    });
  });

  // selección de talle
  cont.querySelectorAll(".talle").forEach((btn) => {
    btn.addEventListener("click", () => {
      cont.querySelectorAll(".talle").forEach((b) => b.classList.remove("activo"));
      btn.classList.add("activo");
    });
  });
}
