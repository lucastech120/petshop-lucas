
// Guarda el filtro actual
function setFiltro(categoria, subcategoria = null) {
  localStorage.setItem(
    "filtroProductos",
    JSON.stringify({ categoria, subcategoria })
  );
}

document.addEventListener("DOMContentLoaded", () => {
  // Captura todos los enlaces que van a productos.html
  const enlacesProductos = document.querySelectorAll(
    '.nav-link[href="productos.html"]'
  );

  enlacesProductos.forEach((enlace) => {
    enlace.addEventListener("click", (event) => {
      const categoria = enlace.dataset.categoria || null;
      const subcategoria = enlace.dataset.subcategoria || null;

      // Si no hay categoría muestra todos los productos
      if (!categoria) {
        localStorage.removeItem("filtroProductos");
        return;
      }

      // Guarda el filtro seleccionado
      setFiltro(categoria.toLowerCase(), subcategoria?.toLowerCase() || null);
    });
  });
});
