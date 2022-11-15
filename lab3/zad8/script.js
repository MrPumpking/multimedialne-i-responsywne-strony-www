let nextTooltipId = 0;
const tooltipLifetime = 2000;

const area = document.querySelector('.js-area');
const ball = document.querySelector('.js-ball');

const clamp = (min, value, max) => {
  return Math.max(min, Math.min(value, max));
};

const onMouseClick = (event) => {
  if (event.button !== 0) {
    return;
  }

  event.stopPropagation();

  const areaRect = area.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();
  const x = clamp(
    0,
    event.clientX - areaRect.left - ballRect.width / 2,
    areaRect.width - ballRect.width
  );
  const y = clamp(
    0,
    event.clientY - areaRect.top - ballRect.height / 2,
    areaRect.height - ballRect.height
  );

  ball.style.setProperty('--pos-x', `${x}px`);
  ball.style.setProperty('--pos-y', `${y}px`);
};

area.addEventListener('mousedown', onMouseClick);

const renderTooltip = (x, y) => {
  const id = `tooltip-${nextTooltipId++}`;

  document.querySelector('body').insertAdjacentHTML(
    'afterend',
    `<div id="${id}" class="tooltip" style="--pos-x:${x}px; --pos-y:${y}px">
        Naciśnięto poza obszarem
      </div>`
  );

  setTimeout(() => {
    const tooltip = document.querySelector(`#${id}`);
    tooltip.parentNode.removeChild(tooltip);
  }, tooltipLifetime);
};

const onOutsideAreaClick = (event) => {
  renderTooltip(event.clientX, event.clientY);
};

window.addEventListener('mousedown', onOutsideAreaClick);
