let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre, precio, imagen = 'imagenes/default-product.png') {
  carrito.push({ nombre, precio, imagen });
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
    li.innerHTML = `
      <div class="producto-carrito">
        <img src="${item.imagen || 'imagenes/default-product.png'}" alt="${item.nombre}" class="producto-carrito-img">
        <div class="producto-carrito-info">
          <h4 class="producto-carrito-nombre">${item.nombre}</h4>
          <p class="producto-carrito-precio">$${item.precio.toLocaleString()}</p>
        </div>
        <button class="boton-eliminar" onclick="eliminarDelCarrito(${index})">
          <i class="fas fa-trash-alt"></i> Eliminar
        </button>
      </div>
    `;
    lista.appendChild(li);
    suma += item.precio;
  });

  total.textContent = suma.toLocaleString();
}

function mostrarResumenCarrito() {
  const resumen = document.getElementById("resumen-productos");
  const total = document.getElementById("resumen-total");
  
  if (!resumen || !total) return;
  
  resumen.innerHTML = "";
  let suma = 0;
  
  carrito.forEach(item => {
    const productoDiv = document.createElement("div");
    productoDiv.className = "resumen-producto";

    resumen.appendChild(productoDiv);
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
  if (document.getElementById("resumen-productos")) {
    mostrarResumenCarrito();
  }
};

