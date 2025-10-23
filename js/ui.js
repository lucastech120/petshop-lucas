// Funciones exclusivamente visuales

// Función del recuadro de notificación al agregar al carrito

export function mostrarNotificacion(mensaje) {
  const contenedorNotifs = document.getElementById("notificaciones-container");
  if (!contenedorNotifs) {
    console.warn("⚠ No existe #notificaciones-container en este HTML");
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

// Funcion global
window.mostrarNotificacion = mostrarNotificacion;
