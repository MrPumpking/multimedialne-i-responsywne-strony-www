const images = [
  { src: './img/sea.jpg', color: 'red' },
  { src: './img/mountains.jpg', color: 'blue' },
  { src: './img/desert.jpg', color: 'orange' },
];

const img = document.querySelector('.js-img');
const imgWrapper = document.querySelector('.js-wrapper');
const nextButton = document.querySelector('.js-next');

let currentIdx = 0;

const setCurrentImage = (idx) => {};

nextButton.addEventListener('click', () => {
  currentIdx = ++currentIdx % images.length;
  img.setAttribute('src', images[currentIdx].src);
  imgWrapper.style.setProperty('--border-color', images[currentIdx].color);
});
