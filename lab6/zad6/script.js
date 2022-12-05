const canvas = document.querySelector('.js-canvas');
const ctx = canvas.getContext('2d');

const categoryInputs = document.querySelectorAll('.js-ci');

const values = {
  cat1: 0,
  cat2: 0,
  cat3: 0,
  cat4: 0,
  cat5: 0,
  cat6: 0,
};

const categoryColors = Array.from(categoryInputs).reduce((dict, input) => {
  const category = input.getAttribute('id');
  dict[category] = input.style.background;
  return dict;
}, {});

const renderChart = () => {
  let currentAngle = 0;
  const total = Object.values(values).reduce((sum, value) => sum + value, 0);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const [category, value] of Object.entries(values)) {
    const portionAngle = (value / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(100, 100, 100, currentAngle, currentAngle + portionAngle);
    currentAngle += portionAngle;
    ctx.lineTo(100, 100);
    ctx.fillStyle = categoryColors[category];
    ctx.fill();
  }
};

const onCategoryInputChange = (event) => {
  const input = event.currentTarget;
  const value = Number(input.value);
  const category = input.getAttribute('id');
  values[category] = !Number.isNaN(value) ? value : 0;
  renderChart();
};

categoryInputs.forEach((input) =>
  input.addEventListener('input', onCategoryInputChange)
);
