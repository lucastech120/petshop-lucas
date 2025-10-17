export function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) return;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalCantidad = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  contador.textContent = totalCantidad;

  if (totalCantidad > 0) {
    contador.style.display = "inline-block";
  } else {
    contador.style.display = "inline-block";
  }
}

document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);
