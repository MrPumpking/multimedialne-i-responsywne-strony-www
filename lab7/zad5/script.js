const DRAGGABLE_CLASS_NAME = 'js-element';
const DRAGGING_CLASS_NAME = 'js-dragging';

const onElementDragStart = (event) => {
  const element = event.target;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', element.outerHTML);
  event.dataTransfer.setData('text/plain', element.getAttribute('id'));
  element.classList.add(DRAGGING_CLASS_NAME);
};

const onElementDragEnd = (event) => {
  event.target.classList.remove(DRAGGING_CLASS_NAME);
};

document.addEventListener('dragstart', (event) => {
  if (event.target.className.includes(DRAGGABLE_CLASS_NAME)) {
    onElementDragStart(event);
  }
});

document.addEventListener('dragend', (event) => {
  if (event.target.className.includes(DRAGGABLE_CLASS_NAME)) {
    onElementDragEnd(event);
  }
});

const onContainerDragOver = (event) => {
  event.preventDefault();
};

const onContainerDrop = (event) => {
  event.preventDefault();

  const dropTarget = event.currentTarget;
  const draggedId = event.dataTransfer.getData('text/plain');
  const draggedElement = event.dataTransfer.getData('text/html');
  const children = Array.from(
    dropTarget.querySelectorAll(`.${DRAGGABLE_CLASS_NAME}`)
  );

  if (children.length) {
    return;
  }

  document.querySelector(`#${draggedId}.${DRAGGABLE_CLASS_NAME}`).remove();
  dropTarget.insertAdjacentHTML('beforeend', draggedElement);
};

document.querySelectorAll('.cell').forEach((element) => {
  element.addEventListener('drop', onContainerDrop);
  element.addEventListener('dragover', onContainerDragOver);
});
