const getInitialState = () => ({
  count: 0,
  propagate: true,
  capture: false,
});

const state = getInitialState();

const countDisplay = document.querySelector('.js-count-display');
const logList = document.querySelector('.js-logs');

const box1 = document.querySelector('.js-box-1');
const box2 = document.querySelector('.js-box-2');
const box3 = document.querySelector('.js-box-3');

const resetBtn = document.querySelector('.js-reset');
const changeDirectionBtn = document.querySelector('.js-change-direction');
const changePropagationBtn = document.querySelector('.js-change-propagation');

const setCount = (value) => {
  state.count = value;
  countDisplay.innerHTML = state.count;
};

const setPropagationEnabled = (isEnabled) => {
  state.propagate = isEnabled;
  changePropagationBtn.innerHTML = `${
    isEnabled ? 'Stop' : 'Start'
  } propagation`;
};

const togglePropagation = () => {
  setPropagationEnabled(!state.propagate);
};

changePropagationBtn.addEventListener('click', togglePropagation);

const logBoxClick = (value, label) => {
  logList.insertAdjacentHTML(
    'beforeend',
    `<li>Nacisnąłeś ${label} o wartości ${value}</li>`
  );
};

const setBoxDisabled = (box, isDisabled) => {
  box.dataset['disabled'] = isDisabled;
};

const onBoxClick = (event, value, label) => {
  if (!state.propagate) {
    event.stopPropagation();
  }

  setCount(state.count + value);
  logBoxClick(value, label);
  checkBoxState();
};

const onBox1Click = (event) => {
  onBoxClick(event, 1, 'niebieski');
};

const onBox2Click = (event) => {
  onBoxClick(event, 2, 'czerwony');
};

const onBox3Click = (event) => {
  onBoxClick(event, 3, 'żółty');
};

const checkBoxState = () => {
  if (state.count > 30) {
    setBoxDisabled(box2, true);
    box2.removeEventListener('click', onBox2Click, { capture: state.capture });
  }

  if (state.count > 50) {
    setBoxDisabled(box3, true);
    box3.removeEventListener('click', onBox3Click, { capture: state.capture });
  }
};

const unregisterEventListeners = (capture = false) => {
  box1.removeEventListener('click', onBox1Click, { capture });
  box2.removeEventListener('click', onBox2Click, { capture });
  box3.removeEventListener('click', onBox3Click, { capture });
};

const registerEventListeners = (capture = false) => {
  box1.addEventListener('click', onBox1Click, { capture });
  box2.addEventListener('click', onBox2Click, { capture });
  box3.addEventListener('click', onBox3Click, { capture });
};

registerEventListeners();

const setCaptureEnabled = (isEnabled) => {
  state.capture = isEnabled;
  changeDirectionBtn.innerHTML = `Change direction to ${
    isEnabled ? 'bubble' : 'capture'
  }`;

  unregisterEventListeners(!state.capture);
  registerEventListeners(state.capture);
};

const toggleCapture = () => {
  setCaptureEnabled(!state.capture);
};

changeDirectionBtn.addEventListener('click', toggleCapture);

const clearLogList = () => {
  logList.innerHTML = '';
};

const reset = () => {
  setCount(0);
  setPropagationEnabled(true);
  setCaptureEnabled(false);
  clearLogList();
  setBoxDisabled(box2, false);
  setBoxDisabled(box3, false);
};

resetBtn.addEventListener('click', reset);
