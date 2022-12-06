const canvas = document.querySelector('.js-canvas');
const ctx = canvas.getContext('2d');

const colorInput = document.querySelector('.js-color');
let currentColor = colorInput.value;

colorInput.addEventListener('change', (event) => {
  currentColor = event.currentTarget.value;
});

const drawImage = () => {
  const image = new Image();
  image.onload = () => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  };
  image.src = './img/forest.jpg';
};

const addColor = () => {
  ctx.save();
  ctx.fillStyle = currentColor;
  ctx.globalCompositeOperation = 'overlay';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
};

document.querySelector('.js-add-color').addEventListener('click', addColor);

const cutFragment = () => {
  const src = canvas.toDataURL('image/jpeg', 1.0);
  const image = new Image();
  image.onload = () => {
    ctx.drawImage(image, 0, 0, 400, 225, 0, 0, canvas.width, canvas.height);
  };
  image.src = src;
};

document.querySelector('.js-cut').addEventListener('click', cutFragment);

const addMask = () => {
  ctx.save();
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
  ctx.clip();
  addColor();
  ctx.restore();
};

document.querySelector('.js-add-mask').addEventListener('click', addMask);

const reset = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawImage();
};

document.querySelector('.js-reset').addEventListener('click', reset);

drawImage();
