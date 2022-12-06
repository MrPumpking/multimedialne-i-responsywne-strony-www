const canvas = document.querySelector('.js-canvas');
const ctx = canvas.getContext('2d');

let isRunning = true;
let currentRadius = 50;
let currentColor = 'red';
let direction = 1;
let growthFactor = 1;

let lastTime;
const framerate = 1000 / 60;
const ballSpeed = 10;

let ballX = currentRadius + 1;

const randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const drawCircle = (xPos, radius, color) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const yPos = canvas.height - radius;
  ctx.save();
  ctx.beginPath();
  ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};

const updateBallState = () => {
  if (ballX <= currentRadius || ballX + currentRadius >= canvas.width) {
    direction = -direction;
    currentColor = randomColor();
  }

  growthFactor = ballX > canvas.width / 2 ? -1 : 1;
  ballX += direction * ballSpeed;
  currentRadius += growthFactor;
};

const animationStep = (timestamp) => {
  if (isRunning) {
    requestAnimationFrame(animationStep);
  }

  if (!lastTime) {
    lastTime = timestamp;
  }

  const elapsed = timestamp - lastTime;

  if (elapsed > framerate) {
    drawCircle(ballX, currentRadius, currentColor);
    updateBallState();
    lastTime = timestamp;
  }
};

requestAnimationFrame(animationStep);

document.querySelector('.js-start').addEventListener('click', () => {
  isRunning = true;
  requestAnimationFrame(animationStep);
});

document.querySelector('.js-stop').addEventListener('click', () => {
  isRunning = false;
});
