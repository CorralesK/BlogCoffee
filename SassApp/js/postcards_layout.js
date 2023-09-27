// Obtene el contenedor donde se mostrarán los posts
const postContainer = document.getElementById('post_content');

// Función para renderizar una tarjeta de post
const renderPostCard = (posts) => {
    posts.forEach(post => {
        const postHTML = `
            <div class="post_header">
                <img src="${post.img}" alt="">
            </div>
            <div class="post_body" data-post-id="${post.id}">
                <span class="posted-on">${post.author} | ${post.date}</span>
                <h3 class="post_title">${post.title}</h3>
                <p>${post.description}</p>
            </div>
        `;
        const postElement = document.createElement('article');
        postElement.innerHTML = postHTML;
        postElement.className = "post_1";
        postElement.dataset.postId = post.id;
        postContainer.appendChild(postElement);
    });
};

// Función para mostrar todos los posts
const showAllPosts = () => {
    const allPosts = Object.values(categories).flat();
    renderPostCard(allPosts);
};

// Función para mostrar los posts de una categoría específica
const showCategory = (category) => {
    renderPostCard(categories[category]);
};

// Función para determinar la página actual y mostrar los posts correspondientes
const currentPage = () => {
    const currentPagePath = window.location.pathname;

    if (currentPagePath === "/html/category_types-coffee.html") {
        showCategory("types");
    } else if (currentPagePath === "/html/category_brands.html") {
        showCategory("brands");
    } else if (currentPagePath === "/html/category_guide.html") {
        showCategory("guides");
    } else {
        showAllPosts();
    }
};

currentPage();

// Agregar un event listener a cada carta.
const postCards = document.querySelectorAll('.post_1');
postCards.forEach(card => {
    card.addEventListener('click', () => {
      const postId = card.getAttribute('data-post-id');
      window.location.href = `post_page.html?post_id=${postId}`;
    });
});
