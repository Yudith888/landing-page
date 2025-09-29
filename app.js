

    
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    let currentIndex = 0;

    function updateSlide() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlide();
    });

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlide();
    });

  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;

      header.classList.toggle('active');
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.classList.remove("show");
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add("show");
      }
    });
  });

 // Elementos
const modal = document.getElementById("reviewModal");
const btn = document.getElementById("openReviewBtn");
const closeBtn = document.querySelector(".close");
const preview = document.getElementById("preview");
let selectedRating = 0;

// Abrir modal
btn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Cerrar modal al hacer clic en la X
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.getElementById("reviewForm").reset();
  preview.innerHTML = "";
});

// Cerrar modal al hacer clic fuera
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.getElementById("reviewForm").reset();
    preview.innerHTML = "";
  }
});

// Manejo de estrellas
const stars = document.querySelectorAll(".rating span");
stars.forEach(star => {
  star.addEventListener("click", () => {
    stars.forEach(s => s.classList.remove("selected"));
    star.classList.add("selected");
    selectedRating = star.getAttribute("data-value");
  });
});

// Previsualización de imágenes
document.getElementById("photos").addEventListener("change", function() {
  preview.innerHTML = "";
  const files = Array.from(this.files).slice(0,3); // máx 3 imágenes
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.width = "80px";
      img.style.height = "80px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "8px";
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

// Enviar reseña
document.getElementById("reviewForm").addEventListener("submit", function(e){
  e.preventDefault();
  
  // Datos del formulario
  const name = this.name.value;
  const comment = this.comment.value;

  // Crear nueva reseña dinámicamente
  const reviewList = document.querySelector(".review-list");
  const newReview = document.createElement("div");
  newReview.classList.add("review-item");

  // Crear sección de fotos
  let photosHTML = "";
  const files = Array.from(this.photos.files).slice(0,3);
  if (files.length > 0) {
    photosHTML = '<div class="review-photos">';
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = "Foto reseña";
        img.style.width = "100px";
        img.style.height = "100px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "8px";
        newReview.querySelector(".review-photos").appendChild(img);
      };
      reader.readAsDataURL(file);
    });
    photosHTML += '</div>';
  }

  // Contenido de la reseña
  newReview.innerHTML = `
    <div class="review-header">
      <span class="stars">${"⭐".repeat(selectedRating)}</span>
      <span class="user">${name}</span>
      <span class="date">ahora mismo</span>
    </div>
    <p>${comment}</p>
    <div class="review-photos"></div>
  `;

  reviewList.prepend(newReview);

  // Resetear formulario y cerrar modal
  modal.style.display = "none";
  this.reset();
  stars.forEach(s => s.classList.remove("selected"));
  preview.innerHTML = "";
});


// Mostrar/ocultar menú
document.querySelector(".main-btn").addEventListener("click", function() {
  document.querySelector(".floating-menu").classList.toggle("active");
});

// Abrir chatbot
document.querySelector(".chat-btn").addEventListener("click", function() {
  document.getElementById("chatbot").style.display = "flex";
});

// Cerrar chatbot
document.getElementById("closeChat").addEventListener("click", function() {
  document.getElementById("chatbot").style.display = "none";
});

// Chatbot funcional básico
const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

sendBtn.addEventListener("click", () => {
  let userText = chatInput.value.trim();
  if (userText !== "") {
    chatBody.innerHTML += `<p><b>Tú:</b> ${userText}</p>`;
    chatInput.value = "";

    setTimeout(() => {
      chatBody.innerHTML += `<p><b>Bot:</b> Gracias por tu mensaje, pronto te responderemos 😊</p>`;
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
  }
});

