const unsplashKey = 'gpMJ1W7YKcy_7doVbGZ_VkU8o1RdU_do_rafgeCNPlo';
const searchForm = document.querySelector('.js-search-form');
const galleryContainer = document.querySelector('.js-gallery-container');

const fetchImages = async (query, perPage = 30) => {
  return fetch(
    `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}&client_id=${unsplashKey}`
  ).then((response) => response.json());
};

const buildImageHTML = (data) => {
  return `
    <div class="gallery__item">
      <img src="${data.urls.regular}" alt="${data.alt_description}">
    </div>`;
};

const displayImages = (images) => {
  galleryContainer.innerHTML = '';

  console.log({ images });
  for (const image of images) {
    galleryContainer.insertAdjacentHTML('beforeend', buildImageHTML(image));
  }
};

const onSearchSubmit = async (event) => {
  event.preventDefault();
  const query = new FormData(event.target).get('query');
  const { results: images } = await fetchImages(query);
  displayImages(images);
};

searchForm.addEventListener('submit', onSearchSubmit);
