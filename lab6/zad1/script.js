const canvas = document.querySelector('.js-canvas');
const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

ctx.beginPath();
ctx.rect(20, 20, 150, 150);
ctx.stroke();

ctx.beginPath();
ctx.arc(300, 75, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.moveTo(250, 75);
ctx.lineTo(300, 25);
ctx.lineTo(350, 75);
ctx.fillStyle = 'white';
ctx.fill();

ctx.beginPath();
ctx.moveTo(250, 75);
ctx.lineTo(300, 125);
ctx.lineTo(350, 75);
ctx.fillStyle = 'white';
ctx.fill();

ctx.beginPath();
ctx.moveTo(50, 200);
ctx.lineTo(100, 200);
ctx.lineTo(150, 250);
ctx.lineTo(10, 250);
ctx.closePath();
ctx.stroke();

const r = 50;
const n = 5;
const inset = 1.8;

const drawStar = (x, y, radius, spikes, inset, fill) => {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.moveTo(0, 0 - radius);
  for (let i = 0; i < spikes; i++) {
    ctx.rotate(Math.PI / spikes);
    ctx.lineTo(0, 0 - radius * inset);
    ctx.rotate(Math.PI / spikes);
    ctx.lineTo(0, 0 - radius);
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.restore();
};

drawStar(300, 300, 50, 5, 2, 'orange');
ctx.save();
ctx.translate(250, -120);
ctx.rotate((38 * Math.PI) / 180);
drawStar(300, 300, 50, 5, 2, 'yellow');
ctx.restore();

const k = 120;
const d = 150;

ctx.save();
ctx.beginPath();
ctx.fillStyle = 'black';
ctx.translate(-100, 300);
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
ctx.restore();

ctx.save();
ctx.translate(250, 420);
ctx.strokeStyle = 'black';
ctx.lineWidth = 5;
const path = new Path2D(
  'M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z'
);
ctx.scale(0.3, 0.3);
ctx.stroke(path);
ctx.restore();

ctx.beginPath();
ctx.rect(475, 0, 250, 250);
ctx.closePath();
ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
ctx.fill();

const image = new Image();
image.onload = () => {
  ctx.save();
  ctx.shadowColor = 'white';
  ctx.shadowBlur = 0;
  const outlineSize = 3;

  for (let x = -outlineSize; x <= outlineSize; x++) {
    for (let y = -outlineSize; y <= outlineSize; y++) {
      ctx.shadowOffsetX = x;
      ctx.shadowOffsetY = y;
      ctx.drawImage(image, 500, 20, 200, 200);
    }
  }

  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.drawImage(image, 500, 20, 200, 200);

  ctx.restore();
};
image.src = './img/cloud.png';
