const canvas = document.querySelector('.js-canvas');
const ctx = canvas.getContext('2d');

const drawButton = document.querySelector('.js-draw');
const clearButton = document.querySelector('.js-clear');

const drawHeart = () => {
  const k = 120;
  const d = 150;

  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  ctx.moveTo(k, k + d / 4);
  ctx.quadraticCurveTo(k, k, k + d / 4, k);
  ctx.quadraticCurveTo(k + d / 2, k, k + d / 2, k + d / 4);
  ctx.quadraticCurveTo(k + d / 2, k, k + (d * 3) / 4, k);
  ctx.quadraticCurveTo(k + d, k, k + d, k + d / 4);
  ctx.quadraticCurveTo(k + d, k + d / 2, k + (d * 3) / 4, k + (d * 3) / 4);
  ctx.lineTo(k + d / 2, k + d);
  ctx.lineTo(k + d / 4, k + (d * 3) / 4);
  ctx.quadraticCurveTo(k, k + d / 2, k, k + d / 4);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};

drawButton.addEventListener('click', drawHeart);
clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
