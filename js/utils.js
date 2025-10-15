export function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) return; // si el elemento no existe, salimos

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalCantidad = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  contador.textContent = totalCantidad;
}