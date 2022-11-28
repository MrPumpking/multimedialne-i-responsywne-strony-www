let observer;
const state = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  threshold: 0,
};

const sliders = document.querySelectorAll('.js-slider');
const marginText = document.querySelector('.js-margin-text');
const thresholdText = document.querySelector('.js-threshold-text');
const images = document.querySelectorAll('[data-lazy]');

const getRootMargin = () => {
  return `${state.top}px ${state.right}px ${state.bottom}px ${state.left}px`;
};

const getThreshold = () => {
  return state.threshold;
};

const updateStateText = () => {
  marginText.innerHTML = getRootMargin();
  thresholdText.innerHTML = getThreshold();
};

const registerObserver = () => {
  if (observer) {
    observer.disconnect();
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const src = entry.target.getAttribute('data-lazy');
          entry.target.setAttribute('src', src);
        } else {
          entry.target.removeAttribute('src');
        }
      }
    },
    {
      rootMargin: getRootMargin(),
      threshold: getThreshold(),
    }
  );

  images.forEach((image) => observer.observe(image));
};

registerObserver();

const onSliderChange = (event) => {
  const slider = event.currentTarget;
  const key = slider.dataset['key'];
  const value = slider.value;
  state[key] = Number(value);
  updateStateText();
  registerObserver();
};

sliders.forEach((slider) => slider.addEventListener('input', onSliderChange));
