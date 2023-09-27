const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu');
const switcherTheme = document.querySelector('.toggle');
const root = document.documentElement;
const filter = document.getElementById('filter');
const searchInput = document.getElementById('search');

// Función para cerrar el menú
const closeMenu = () => {
  if (menuToggle.checked) {
    menuToggle.checked = false;
  }
};
window.addEventListener('scroll', closeMenu);

//Temas

// Comprobamos si hay una preferencia de tema guardada en el local storage
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  root.setAttribute('data-theme', currentTheme);
}

// Para cambiar el tema
document.addEventListener('DOMContentLoaded', () => {
  const toggleTheme = () => {
    const setTheme = switcherTheme.checked ? 'dark' : 'light';
    localStorage.setItem('theme', setTheme);
    root.setAttribute('data-theme', setTheme);
  }

  switcherTheme.addEventListener('click', toggleTheme);
  console.log("funca");
});

//Buscardor

// Renderizar una carta de post y agregarla al filtro de búsqueda
const renderCard = (post) => {
  const postHTML = `
    <article class="card" data-post-id="${post.id}">
      <img src="${post.img}" alt="">
      <p class="title">${post.title}</p>
    </article>
  `;
  const postElement = document.createElement('li');
  postElement.innerHTML = postHTML;
  filter.appendChild(postElement);
};

// Agregar un event listener a cada carta para redirigir a la página del post correspondiente.
const postActive = () => {
  const suggestions = document.querySelectorAll('.card');
  suggestions.forEach(suggestion => {
    suggestion.addEventListener('click', () => {
      const postId = suggestion.getAttribute('data-post-id');
      window.location.href = `post_page.html?post_id=${postId}`;
      console.log(postId);
    });
  });
}

// Remover posts que no coinciden con el texto de búsqueda
const removePosts = (searcherText) => {
  const allPostsElements = document.querySelectorAll('#filter li');
  allPostsElements.forEach((postElement) => {
    const postTitle = postElement.querySelector('.title').innerText.toLowerCase();
    if (!postTitle.includes(searcherText)) {
      postElement.remove();
    }
  });
};

// Mostrar mensaje cuando no se encuentran resultados de búsqueda
const showNoDocumentFoundMessage = () => {
  const noDocumentTitleElement = document.createElement('li');
  noDocumentTitleElement.textContent = 'No document title found';
  noDocumentTitleElement.classList.add('no-document-found');
  filter.appendChild(noDocumentTitleElement);
};

// Event listener para detectar cambios en el input de búsqueda
searchInput.addEventListener('keyup', (e) => {
  const allPosts = Object.values(categories).flat();
  filter.innerHTML = '';
  let foundMatch = false;

  allPosts.forEach((post) => {
    const searchText = e.target.value.toLowerCase();
    if (post.title.toLowerCase().includes(searchText)) {
      renderCard(post);
      postActive();
      foundMatch = true;
    }
  });

  if (!foundMatch) {
    showNoDocumentFoundMessage();
  }

  filter.style.display = searchInput.value === '' ? 'none' : 'block';
});

// Mostrar el filtro cuando el input de búsqueda obtiene el foco
searchInput.addEventListener('focus', () => {
  if (searchInput.value !== '') {
    filter.style.display = 'block';
  }
});

// Ocultar el filtro cuando se hace clic fuera de él
document.addEventListener('click', (event) => {
  if (!filter.contains(event.target) && event.target !== searchInput) {
    filter.style.display = 'none';
  }
});

//Usuario

// Verificar si el usuario está conectado
document.addEventListener('DOMContentLoaded', () => {
  const isConnected = localStorage.getItem('connected') === 'true' || sessionStorage.getItem('connected') === 'true';
  if (!isConnected) {
    window.location.href = '../html/login.html';
  }
});

document.getElementById("btn-sesion").addEventListener('click', (event) => {
  localStorage.setItem('connected', 'false');
  sessionStorage.setItem('connected', 'false');
  window.location.href = '../html/login.html';
});
