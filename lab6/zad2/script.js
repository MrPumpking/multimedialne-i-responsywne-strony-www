const canvas = document.querySelector('.js-canvas');
const ctx = canvas.getContext('2d');

const stamps = document.querySelectorAll('.js-stamp');
const fillColorInput = document.querySelector('.js-fill');
const strokeColorInput = document.querySelector('.js-stroke');

const scale = 0.2;
const offsetX = 200;
const offsetY = 200;

const getStampSVGPath = (stamp) => {
  const stampSvgPath = stamp.querySelector('svg > path');
  return stampSvgPath.getAttribute('d');
};

let currentFillColor = fillColorInput.value;
let currentStrokeColor = strokeColorInput.value;
let currentStampPath = getStampSVGPath(
  document.querySelector('.js-stamp[data-active="true"]')
);

fillColorInput.addEventListener('change', (event) => {
  currentFillColor = event.currentTarget.value;
});

strokeColorInput.addEventListener('change', (event) => {
  currentStrokeColor = event.currentTarget.value;
});

const getMousePosition = (element, event) => {
  const rect = element.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
    y: ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
  };
};

const onStampClick = (event) => {
  const stamp = event.currentTarget;
  stamps.forEach((stamp) => (stamp.dataset['active'] = false));
  stamp.dataset['active'] = true;

  const stampSvgPath = stamp.querySelector('svg > path');
  currentStampPath = stampSvgPath.getAttribute('d');
  console.log(currentStampPath);
};

stamps.forEach((stamp) => stamp.addEventListener('click', onStampClick));

const onCanvasClick = (event) => {
  const { x, y } = getMousePosition(canvas, event);

  ctx.fillStyle = currentFillColor;
  ctx.strokeStyle = currentStrokeColor;
  ctx.lineWidth = 30;

  const path = new Path2D(currentStampPath);

  ctx.save();
  ctx.scale(scale, scale);
  ctx.translate(x / scale - offsetX, y / scale - offsetY);
  ctx.stroke(path);
  ctx.fill(path);
  ctx.restore();
};

canvas.addEventListener('dblclick', onCanvasClick);
