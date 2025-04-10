let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`Producto agregado: ${nombre}`);
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total");
  if (!lista || !total) return;

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.nombre} - $${item.precio.toLocaleString()} <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
    lista.appendChild(li);
    suma += item.precio;
  });

  total.textContent = suma.toLocaleString();
}

function procesarPago(event) {
  event.preventDefault();
  if (carrito.length === 0) {
    alert("El carrito está vacío. Agrega productos antes de pagar.");
    return false;
  }

  document.getElementById("mensaje-pago").textContent = "✅ Pago procesado con éxito. ¡Gracias por tu compra!";
  carrito = [];
  localStorage.removeItem("carrito");
  actualizarCarrito();
  event.target.reset();
  return false;
}

window.onload = () => {
  if (document.getElementById("lista-carrito")) {
    actualizarCarrito();
  }
};

