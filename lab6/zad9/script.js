const canvas = document.querySelector('.js-canvas');
const ctx = canvas.getContext('2d');

const starSpikes = 5;
const starInset = 2;
const starRadius = 15;

let starSpeed = 1;

let stars = [{ x: 100, y: 150, vx: 1, vy: 1 }];

const drawStar = (x, y, r, n, inset) => {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.moveTo(0, 0 - r);
  for (var i = 0; i < n; i++) {
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - r * inset);
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - r);
  }
  ctx.closePath();
  ctx.fillStyle = 'orange';
  ctx.fill();
  ctx.restore();
};

const updateStar = (star) => {
  if (star.x <= starRadius || star.x >= canvas.width - starRadius) {
    star.vx *= -1;
  }

  if (star.y <= starRadius || star.y >= canvas.height - starRadius) {
    star.vy *= -1;
  }

  star.x += star.vx * starSpeed;
  star.y += star.vy * starSpeed;
};

let lastTime;
const framerate = 1000 / 60;

const animationStep = (timestamp) => {
  requestAnimationFrame(animationStep);

  if (!lastTime) {
    lastTime = timestamp;
  }

  const elapsed = timestamp - lastTime;

  if (elapsed > framerate) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const star of stars) {
      drawStar(star.x, star.y, starRadius, starSpikes, starInset);
      updateStar(star);
    }

    lastTime = timestamp;
  }
};

requestAnimationFrame(animationStep);

document.querySelector('.js-speed').addEventListener('change', (event) => {
  starSpeed = Number(event.currentTarget.value);
});

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const createRandomStar = () => {
  return {
    x: getRandomIntInclusive(starRadius + 1, canvas.width - 2 * starRadius - 1),
    y: getRandomIntInclusive(
      starRadius + 1,
      canvas.height - 2 * starRadius - 1
    ),
    vx: Math.random() > 0.5 ? 1 : -1,
    vy: Math.random() > 0.5 ? 1 : -1,
  };
};

document.querySelector('.js-count').addEventListener('change', (event) => {
  const starCount = Number(event.currentTarget.value);
  const base = stars.slice(0, starCount);

  if (base.length < starCount) {
    for (let i = 0; i < starCount - base.length; i++) {
      const star = createRandomStar();
      base.push(star);
    }
  }

  stars = base;
});
