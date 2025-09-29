
  const reviewForm = document.getElementById("reviewForm");
  const reviewList = document.querySelector(".review-list"); // usamos tu clase
  const ratingStars = document.querySelector(".rating");     // usamos tu clase
  let selectedRating = 0;

  // Guardar reseña en localStorage
  function saveReview(review) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }

  // Cargar reseñas al iniciar
  function loadReviews() {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviewList.innerHTML = ""; // limpiar antes de recargar

    reviews.forEach(r => {
      let reviewItem = document.createElement("div");
      reviewItem.classList.add("review-item");
      reviewItem.innerHTML = `
        <div class="review-header">
          <span class="stars">${"⭐".repeat(r.rating)}</span>
          <span class="user">${r.name}</span>
          <span class="date">${r.date}</span>
        </div>
        <p>${r.comment}</p>
        <div class="review-photos">
          ${r.photos.map(src => `<img src="${src}" width="80">`).join("")}
        </div>
      `;
      reviewList.appendChild(reviewItem);
    });
  }

  // Seleccionar estrellas
  ratingStars.addEventListener("click", e => {
    if (e.target.dataset.value) {
      selectedRating = e.target.dataset.value;
      [...ratingStars.children].forEach(star => {
        star.style.color = star.dataset.value <= selectedRating ? "gold" : "black";
      });
    }
  });

  // Enviar reseña
  reviewForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const comment = document.getElementById("comment").value;
    const photosInput = document.getElementById("photos").files;

    let photos = [];
    if (photosInput.length > 0) {
      for (let i = 0; i < photosInput.length && i < 3; i++) {
        let reader = new FileReader();
        reader.onload = function(evt) {
          photos.push(evt.target.result);

          if (photos.length === Math.min(photosInput.length, 3)) {
            let review = {
              name,
              comment,
              rating: selectedRating || 5,
              date: new Date().toLocaleDateString(),
              photos
            };
            saveReview(review);
            loadReviews();
            reviewForm.reset();
            selectedRating = 0;
          }
        };
        reader.readAsDataURL(photosInput[i]);
      }
    } else {
      let review = {
        name,
        comment,
        rating: selectedRating || 5,
        date: new Date().toLocaleDateString(),
        photos: []
      };
      saveReview(review);
      loadReviews();
      reviewForm.reset();
      selectedRating = 0;
    }
  });

  // Cargar reseñas al inicio
  window.onload = loadReviews;
// Cargar reseñas al iniciar
function loadReviews() {
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  // 🔹 NO borramos el contenido original (ya viene en el HTML)

  reviews.forEach(r => {
    let reviewItem = document.createElement("div");
    reviewItem.classList.add("review-item");
    reviewItem.innerHTML = `
      <div class="review-header">
        <span class="stars">${"⭐".repeat(r.rating)}</span>
        <span class="user">${r.name}</span>
        <span class="date">${r.date}</span>
      </div>
      <p>${r.comment}</p>
      <div class="review-photos">
        ${r.photos.map(src => `<img src="${src}" width="80">`).join("")}
      </div>
    `;
    reviewList.appendChild(reviewItem);
  });
}
