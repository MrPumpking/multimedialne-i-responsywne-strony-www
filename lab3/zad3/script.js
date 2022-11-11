const currentSlideVar = '--current-slide';

const slider = document.querySelector('.js-slider');
const sliderWrapper = slider.querySelector('.js-slider-wrapper');
const slideCount = sliderWrapper.querySelectorAll('.js-slide').length;
const prevButton = slider.querySelector('.js-prev');
const nextButton = slider.querySelector('.js-next');

const setCurrentSlide = (idx) => {
  sliderWrapper.style.setProperty(currentSlideVar, idx);
};

const nextSlide = (direction) => {
  const currentSlideIdx = Number(
    getComputedStyle(sliderWrapper).getPropertyValue(currentSlideVar).trim()
  );
  const nextSlideIdx = (currentSlideIdx + direction) % slideCount;
  setCurrentSlide(nextSlideIdx < 0 ? slideCount - 1 : nextSlideIdx);
};

prevButton.addEventListener('click', () => {
  nextSlide(-1);
});

nextButton.addEventListener('click', () => {
  nextSlide(1);
});
