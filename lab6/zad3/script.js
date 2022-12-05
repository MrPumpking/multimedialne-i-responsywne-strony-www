const canvas = document.querySelector('.js-canvas');
const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const image = new Image();
image.onload = () => {
  ctx.drawImage(image, 100, 100, 550, 600);
  ctx.drawImage(image, 100, 100, 400, 400, 0, 0, 100, 100);
};

image.src = './img/dog.png';
