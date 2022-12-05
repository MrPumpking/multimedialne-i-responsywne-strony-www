const canvas = document.querySelector('.js-canvas');
const ctx = canvas.getContext('2d');

const stamps = document.querySelectorAll('.js-stamp');
const fillColorInput = document.querySelector('.js-fill');
const strokeColorInput = document.querySelector('.js-stroke');

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
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
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

  ctx.save();
  ctx.translate(x, y);

  ctx.lineWidth = 5;
  ctx.fillStyle = currentFillColor;
  ctx.strokeStyle = currentStrokeColor;

  const currentPath = new Path2D(currentStampPath);
  const matrix = document
    .createElementNS('http://www.w3.org/2000/svg', 'svg')
    .createSVGMatrix();
  const path = new Path2D();
  const transform = matrix.scale(0.05);
  path.addPath(currentPath, transform);

  ctx.scale(1.2, 1.2);
  ctx.stroke(path);
  ctx.fill(path);

  ctx.restore();
};

canvas.addEventListener('dblclick', onCanvasClick);
