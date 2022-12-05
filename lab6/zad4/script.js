const canvas = document.querySelector('.js-canvas');
const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

ctx.save();
ctx.rect(0, 0, 200, 100);
ctx.fill();
ctx.restore();

ctx.save();
ctx.translate(400, 0);
ctx.rotate((45 * Math.PI) / 180);
ctx.rect(0, 0, 200, 100);
ctx.fill();
ctx.restore();

ctx.save();
ctx.translate(600, 0);
ctx.scale(1, 2);
ctx.rect(0, 0, 200, 100);
ctx.fill();
ctx.restore();

ctx.save();
ctx.translate(900, 0);
ctx.transform(2, 1, 0.5, 4, 2, 1);
ctx.rect(0, 0, 200, 100);
ctx.fill();
ctx.restore();

const image = new Image();
image.onload = () => {
  ctx.translate(0, 400);

  ctx.save();
  ctx.drawImage(image, 0, 0, 200, 200);
  ctx.restore();

  ctx.save();
  ctx.translate(400, 0);
  ctx.rotate((45 * Math.PI) / 180);
  ctx.drawImage(image, 0, 0, 200, 200);
  ctx.restore();

  ctx.save();
  ctx.translate(600, 0);
  ctx.scale(0.5, 2);
  ctx.drawImage(image, 0, 0, 200, 200);
  ctx.restore();

  ctx.save();
  ctx.translate(800, 0);
  ctx.transform(2, 1, 0.5, 4, 2, 1);
  ctx.drawImage(image, 0, 0, 200, 200);
  ctx.restore();
};
image.src = './img/dog.png';
