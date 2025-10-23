import { agregarAlCarrito } from "./carrito.js";
import { actualizarContadorCarrito } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const idProducto = params.get("id");

  //Validar que haya ID en la URL
  if (!idProducto) {
    document.getElementById("detalle-producto").innerHTML =
      "<p>ID de producto no especificado</p>";
    return;
  }

  //Fetch con manejo de errores mejorado
  fetch("../productos.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("No se pudo cargar productos.json");
      }
      return res.json();
    })
    .then((productos) => {
      const producto = productos.find((p) => p.id == idProducto);
      const cont = document.getElementById("detalle-producto");

      if (!producto) {
        cont.innerHTML = "<p>Producto no encontrado</p>";
        return;
      }

      renderDetalle(producto);
    })
    .catch((err) => {
      console.error("Error cargando producto:", err);
      document.getElementById("detalle-producto").innerHTML =
        "<p>Hubo un error al cargar el producto.</p>";
    });

  //Función para renderizar el detalle

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

          <div class="caracteristicas">
            <label>Caracteristicas:</label>  
            <div class="opciones-caracter">
              <button class="caracter">C1</button>
              <button class="caracter">C2</button>
              <button class="caracter">C3</button>
              <button class="caracter">C4</button>
              <button class="caracter">C5</button>
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
            <p><strong>Cambios:</strong> Si hay algún problema con tu pedido, podés solicitar cambio.</p>
            <p class="tyc-estilos"><strong>Ver <a href="condiciones.html">términos y condiciones</a></strong></p>
          </div>
        </div>
      </div>
    `;

    //  Llamamos a agregar al carrito

    document.getElementById("agregar-detalle").addEventListener("click", () => {
      const cantidad = parseInt(document.getElementById("cantidad").value) || 1;
      for (let i = 0; i < cantidad; i++) {
        agregarAlCarrito(prod);
        actualizarContadorCarrito();
      }
    
    });

    //  Imagen principal

    const imagenPrincipal = cont.querySelector(".imagen-principal");
    cont.querySelectorAll(".miniaturas img").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        imagenPrincipal.src = thumb.src;
      });
    });

    // Futuras categorias + Ramificación en tipos (Color, peso, otros)
    // Detalles.js necesita detectar más imagenes principales por producto
    // 
   
    cont.querySelectorAll(".caracter").forEach((btn) => {
      btn.addEventListener("click", () => {
        cont.querySelectorAll(".caracter").forEach((b) => b.classList.remove("activo"));
        btn.classList.add("activo");
      });
    });
  }
});
