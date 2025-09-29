
document.getElementById("checkoutForm").addEventListener("submit", function(e){
  e.preventDefault();

  // Capturar datos del formulario
  let producto = document.getElementById("productoNombre").innerText;
  let precio = document.getElementById("productoPrecio").innerText;
  let color = document.getElementById("productoColor").value;
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let telefono = document.getElementById("telefono").value;
  let correo = document.getElementById("correo").value;
  let departamento = document.getElementById("departamento").value;
  let ciudad = document.getElementById("ciudad").value;
  let direccion = document.getElementById("direccion").value;
  let detalles = document.getElementById("detalles").value;

  // Mensaje para WhatsApp
  let mensaje = `📦 Nuevo Pedido\n\n` +
                `🛒 Producto: ${producto}\n` +
                `🎨 Color: ${color}\n` +
                `💲 Precio: ${precio}\n\n` +
                `👤 Cliente: ${nombre} ${apellido}\n` +
                `📱 Teléfono: ${telefono}\n` +
                `📧 Correo: ${correo}\n` +
                `🌍 Departamento: ${departamento}\n` +
                `🏙️ Ciudad: ${ciudad}\n` +
                `🏠 Dirección: ${direccion}\n` +
                `📝 Detalles: ${detalles}`;

  // Número destino en formato internacional (+57 para Colombia)
  let numero = "573052380621";

  // Abrir WhatsApp automáticamente
  window.location.href = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
});

// Abrir y cerrar modales
const checkoutModal = document.getElementById("checkoutModal");
const pseModal = document.getElementById("pseModal");
const openCheckout = document.getElementById("openCheckout");
const closeModal = document.getElementById("closeModal");
const closePseModal = document.getElementById("closePseModal");
const openPseModal = document.getElementById("openPseModal");
const checkoutForm = document.getElementById("checkoutForm");

// Abrir modal de compra
openCheckout.onclick = function(e) {
  e.preventDefault();
  checkoutModal.style.display = "block";
}

// Cerrar modal de compra
closeModal.onclick = function() {
  checkoutModal.style.display = "none";
}

// Cerrar modal PSE
closePseModal.onclick = function() {
  pseModal.style.display = "none";
}

// Validar y abrir modal PSE
openPseModal.onclick = function() {
  if (checkoutForm.checkValidity()) {
    pseModal.style.display = "block";
  } else {
    checkoutForm.reportValidity(); // Muestra qué falta por llenar
  }
}

// Simulación de pago PSE
function simularPago() {
  alert("✅ Pago simulado exitosamente con PSE.");
  pseModal.style.display = "none";
  checkoutModal.style.display = "none";
}




const moda = document.getElementById("checkoutModal");
const bt = document.getElementById("openCheckout");
const close = document.getElementById("closeModal");

// Abrir modal
bt.onclick = function(e) {
  e.preventDefault();
  moda.style.display = "block";
}

// Cerrar modal
close.onclick = function() {
  moda.style.display = "none";
}

// Cerrar al hacer clic fuera
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Acción del formulario
document.getElementById("checkoutForm").addEventListener("submit", function(e){
  e.preventDefault();
  alert("✅ Pedido confirmado. Te enviaremos un WhatsApp con los detalles.");
  moda.style.display = "none";
});
document.getElementById("openCheckout").addEventListener("click", function(e){
  e.preventDefault();
  document.getElementById("checkoutModal").style.display = "block";
});
document.getElementById("closeModal").addEventListener("click", function(){
  document.getElementById("checkoutModal").style.display = "none";
});
window.onclick = function(event) {
  if (event.target == document.getElementById("checkoutModal")) {
    document.getElementById("checkoutModal").style.display = "none";
  }
}
