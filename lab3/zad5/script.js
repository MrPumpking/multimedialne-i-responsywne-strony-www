let score = 0;
let stopPropagation = false;
let direction = 'bubble';

const box1 = document.querySelector('.js-box-1');
const box2 = document.querySelector('.js-box-2');
const box3 = document.querySelector('.js-box-3');
const boxes = [box1, box2, box3];
const counter = document.querySelector('.js-counter');
const logs = document.querySelector('.js-logs');
const stopPropagationButton = document.querySelector('.js-stop-propagation');
const resetButton = document.querySelector('.js-reset');
const changeDirection = document.querySelector('.js-change-direction');

const setScore = (newScore) => {
  score = newScore;
  counter.innerHTML = score;
};

const logBoxClick = (value, color) => {
  const li = document.createElement('li');
  li.innerHTML = `Nacisnąłeś ${color} o wartości ${value}`;
  logs.appendChild(li);
};

const onBoxClick = (event) => {
  const clickedBox = event.currentTarget;
  const boxValue = Number(clickedBox.dataset['value']);
  const boxColor = clickedBox.dataset['color'];

  if (stopPropagation) {
    event.stopPropagation();
  }

  const newScore = score + boxValue;
  logBoxClick(boxValue, boxColor);
  setScore(newScore);

  if (newScore > 30) {
    box2.dataset['disabled'] = true;
    box2.removeEventListener('click', onBoxClick);
  }

  if (newScore > 50) {
    box3.dataset['disabled'] = true;
    box3.removeEventListener('click', onBoxClick);
  }
};

const setStopPropagationEnabled = (isEnabled) => {
  stopPropagation = isEnabled;
  stopPropagationButton.innerHTML = `${
    stopPropagation ? 'Start' : 'Stop'
  } propagation`;
};

stopPropagationButton.addEventListener('click', () => {
  setStopPropagationEnabled(!stopPropagation);
});

const registerBoxListeners = (direction) => {
  boxes.forEach((box) => {
    box.removeEventListener('click', onBoxClick, {
      capture: direction === 'bubble',
    });

    if (box.dataset['disabled'] !== 'true') {
      box.addEventListener('click', onBoxClick, {
        capture: direction === 'capture',
      });
    }
  });
};

registerBoxListeners('bubble');

const setDirection = (dir) => {
  changeDirection.innerHTML = `Change direction to ${direction}`;
  direction = dir;
  registerBoxListeners(direction);
};

changeDirection.addEventListener('click', () => {
  setDirection(direction === 'bubble' ? 'capture' : 'bubble');
});

const clearLogs = () => {
  logs.innerHTML = '';
};

resetButton.addEventListener('click', () => {
  setStopPropagationEnabled(false);
  setDirection('bubble');
  setScore(0);
  clearLogs();

  box2.dataset['disabled'] = false;
  box3.dataset['disabled'] = false;
});
