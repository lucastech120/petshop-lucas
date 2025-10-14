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

let productos = [];
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarCarrito() {
  const contenedorCarrito = document.getElementById("carrito");
  contenedorCarrito.innerHTML = "";
  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>El carrito está vacío</p>";
  } else {
    carrito.forEach((prod, index) => {
      const item = document.createElement("div");
      item.innerHTML = ` <img src="${prod.imagen}" alt="${
        prod.nombre
      }" style="width:60px; height:auto; margin-right:10px;" />
      <div class="info-carrito"> 
      <h4>${prod.nombre}</h4> 
      <p>$${prod.precio.toLocaleString("es-AR")}</p> 
      
      </div> <button class="btn-eliminar" data-index="${index}">❌</button> `;
      contenedorCarrito.appendChild(item);
    });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-agregar")) {
    const id = parseInt(e.target.dataset.id);
    const producto = productos.find((p) => p.id === id);
    const existe = carrito.find((p) => p.id === id);
    if (!existe) carrito.push(producto);
    actualizarCarrito();
  }

  if (e.target.classList.contains("btn-eliminar")) {
    const index = parseInt(e.target.dataset.index);
    carrito.splice(index, 1);
    actualizarCarrito();
  }
});

document.getElementById("vaciar-carrito").addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
});

actualizarCarrito();
