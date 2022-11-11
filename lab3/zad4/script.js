let counter = 0;

const count = document.querySelector('.js-count');
const incrementButton = document.querySelector('.js-increment');
const registerButton = document.querySelector('.js-register');
const unregisterButton = document.querySelector('.js-unregister');

const onIncrementClick = () => {
  count.innerHTML = ++counter;
};

const registerIncrementButton = () => {
  incrementButton.addEventListener('click', onIncrementClick);
};

const resetCounter = () => {
  counter = 0;
  count.innerHTML = 0;
};

const unregisterIncrementButton = () => {
  resetCounter();
  incrementButton.removeEventListener('click', onIncrementClick);
};

registerButton.addEventListener('click', registerIncrementButton);
unregisterButton.addEventListener('click', unregisterIncrementButton);

registerIncrementButton();
