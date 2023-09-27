// Obtener elementos del DOM
const container = document.getElementById('conteiner');
const heroElement = document.getElementById('hero');
const heroTitle = document.getElementById('title');

// Función para renderizar un post en el DOM
const renderPost = (post) => {
  document.title = post.title + "_JavaJolt";

  heroElement.style.backgroundImage = `linear-gradient(0deg,rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url("${post.img}")`;
  heroTitle.innerText = post.title;

  const postHTML = `
      <h2 class="title">${post.title}</h2>
      <hr>
      <div class="date-author">
          <div class="author" >
              <img src="${post.img_Author}" alt="">
              <p>${post.author}</p>
          </div>
          <p class="date">${post.date}</p>
          <div class="rating">
              <span class="star" data-value="1">&#9733;</span>
              <span class="star" data-value="2">&#9733;</span>
              <span class="star" data-value="3">&#9733;</span>
              <span class="star" data-value="4">&#9733;</span>
              <span class="star" data-value="5">&#9733;</span>
          </div>
      </div>
      <hr>
      <div class="section-content">
          ${post.content}
      </div>
  `;

  let postElement = document.createElement('article');
  postElement.innerHTML = postHTML;
  postElement.classList.add("blog", "container");

  container.appendChild(postElement);
}

let postId = 0;

// Función para mostrar el post actual según el parámetro 'post_id' en la URL
const currentCategoryPosts = () => {
  postId = (new URLSearchParams(window.location.search)).get('post_id');
  let allPosts = Object.values(categories).flat();

  allPosts.forEach(post => {
    if (post.id === parseInt(postId)) {
      renderPost(post);
    }
  });
}

currentCategoryPosts();

//Rating

const stars = document.querySelectorAll(".star");
let rating = 0;

// Actualiza la visualización de las estrellas activas según la calificación
const updateRating = () => {
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
};

// Verificar si hay una calificación previamente almacenada en el localStorage
const savedRating = localStorage.getItem(`rating_${postId}`);
if (savedRating) {
  rating = parseInt(savedRating);
  updateRating();
}

// Asignar un evento de click a cada estrella
stars.forEach(star => {
  star.addEventListener("click", () => {
    rating = parseInt(star.dataset.value);
    updateRating();
    localStorage.setItem(`rating_${postId}`, rating);
  });
});

