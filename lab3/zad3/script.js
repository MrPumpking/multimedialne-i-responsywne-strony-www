const currentSlideVar = '--current-slide';

const slider = document.querySelector('.js-slider');
const sliderWrapper = slider.querySelector('.js-slider-wrapper');
const slideCount = sliderWrapper.querySelectorAll('.js-slide').length;
const prevButton = slider.querySelector('.js-prev');
const nextButton = slider.querySelector('.js-next');
const randomButton = document.querySelector('.js-random');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const setCurrentSlideIdx = (idx) => {
  sliderWrapper.style.setProperty(currentSlideVar, idx);
};

const getCurrentSlideIdx = () => {
  return Number(
    getComputedStyle(sliderWrapper).getPropertyValue(currentSlideVar).trim()
  );
};

const nextSlide = (direction) => {
  const currentSlideIdx = getCurrentSlideIdx();
  const nextSlideIdx = (currentSlideIdx + direction) % slideCount;
  setCurrentSlideIdx(nextSlideIdx < 0 ? slideCount - 1 : nextSlideIdx);
};

prevButton.addEventListener('click', () => {
  nextSlide(-1);
});

nextButton.addEventListener('click', () => {
  nextSlide(1);
});

randomButton.addEventListener('click', () => {
  const currentSlideIdx = getCurrentSlideIdx();
  let randomIdx = getRandomInt(0, slideCount);

  while (randomIdx === currentSlideIdx) {
    randomIdx = getRandomInt(0, slideCount);
  }

  setCurrentSlideIdx(randomIdx);
});
