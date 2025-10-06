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

const productos = [
  {id: 1,nombre: "Bebedero rosa gatos",precio: 8399,imagen: "../img/productos/bebedero-rosa.jpg",},
  {id: 2,nombre: "Snack pedigree sabor pollo",precio: 1100,imagen: "../img/productos/sobrecito-perro.jpg",},
  {id: 3,nombre: "Bolsitas higiénicas",precio: 1800,imagen: "../img/productos/bolsitas.jpg",},
  {id: 4,nombre: "Pasta dental y cepillo",precio: 2400,imagen: "../img/productos/pasta-cepillo.jpg",},
  {id: 5,nombre: "Piedras higiénicas 10kg",precio: 6700,imagen: "../img/productos/pets-piedras.jpg",},
  {id: 6,nombre: "Pipeta power perros",precio: 5200,imagen: "../img/productos/power-perros.jpg",},
  {id: 7,nombre: "Sabrositos gatos 20kg",precio: 13600,imagen: "../img/productos/sabrositos.jpg",},
  {id: 8,nombre: "Arenero",precio: 5500,imagen: "../img/productos/arenero.jpg",},
  {id: 9,nombre: "Bebedero alto gatos",precio: 6800,imagen: "../img/productos/bebedero-blanco.jpg",},
  {id: 10,nombre: "Pipeta power gatos",precio: 5200,imagen: "../img/productos/power-gatos.jpg",},
  {id: 11,nombre: "Dispenser comida",precio: 8500,imagen: "../img/productos/bebedero.jpg",},
  {id: 12,nombre: "Huesitos",precio: 2000,imagen: "../img/productos/huesitos.jpg",},
  {id: 13,nombre: "Palita higiénica",precio: 900,imagen: "../img/productos/pala.jpg",},
  {id: 14,nombre: "Piedritas absorsol 10kg",precio: 7400,imagen: "../img/productos/absorsol-piedras.jpg",},
  {id: 15,nombre: "Shampoo gatos",precio: 2500,imagen: "../img/productos/shampoo-gatos.jpg",},
  {id: 16,nombre: "Shampoo perros",precio: 3000,imagen: "../img/productos/dermosedan-perros.jpg",},
  {id: 17,nombre: "Whiskas gatos carne",precio: 900,imagen: "../img/productos/whiskas-gato.jpg",},
  {id: 18,nombre: "Transportadora",precio: 27500,imagen: "../img/productos/gatera.jpg",},
  {id: 19,nombre: "Mordedor Stich",precio: 5000,imagen: "../img/productos/stich.jpg",},
  {id: 20,nombre: "Premier gatos adultos 5kg",precio: 15999,imagen: "../img/productos/premier-cats.jpg",},
  {id: 21,nombre: "Royal gatos dental 5kg",precio: 18999,imagen: "../img/productos/royal-gatos-v.jpg",},
  {id: 22,nombre: "Royal perros renal 5kg",precio: 19999,imagen: "../img/productos/royal-renal.jpg",},
  {id: 23,nombre: "Mordillo",precio: 9799,imagen: "../img/productos/mordillo.jpg",},
  {id: 24,nombre: "Pechera + Correa",precio: 10999,imagen: "../img/productos/pechera-correa.jpg",},
  {id: 25,nombre: "Casita para perro",precio: 19899,imagen: "../img/productos/casita-marron.jpg",},
  {id: 26,nombre: "Royal gatos castrados 5kg",precio: 18999,imagen: "../img/productos/royal-castrados-c.jpg",},
  {id: 27,nombre: "Huesitos de goma para perros",precio: 8999,imagen: "../img/productos/huesito-goma.jpg",},
  {id: 28,nombre: "Cepillo de vapor para gatos",precio: 11999,imagen: "../img/productos/cepillo-vapor.jpg",},
  {id: 29,nombre: "Rascador",precio: 14999,imagen: "../img/productos/rascador-rueda.jpg",},
  {id: 30,nombre: "Arbol para gatos",precio: 27999,imagen: "../img/productos/arbol-gatos.jpg",},
  {id: 31, nombre: "Huesitos sabor carne", precio: 6999, imagen: "../img/productos/huesitos-sabor.jpg",}, 
  {id: 32,nombre: "Royal gatos indoor 5kg",precio: 16999,imagen: "../img/productos/roya-indor-c.jpg",},
  {id: 33,nombre: "Cama para gatos",precio: 14999,imagen: "../img/productos/cama-gatos.jpg",},
  {id: 34,nombre: "Casita para gatos",precio: 19999,imagen: "../img/productos/casita-gatos.jpg",},
  {id: 35,nombre: "Royal perros castrados 5kg",precio: 18999,imagen: "../img/productos/royal-castrados-p.jpg",},
];

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
