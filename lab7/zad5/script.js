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
  const isEmpty = !children.length;

  if (!isEmpty) {
    return;
  }

  const dropX = Number(dropTarget.dataset['x']);
  const dropY = Number(dropTarget.dataset['y']);

  const srcCell = document.querySelector(`#${draggedId}`).parentElement;
  const srcX = Number(srcCell.dataset['x']);
  const srcY = Number(srcCell.dataset['y']);

  const validCoords = [
    [dropX, dropY - 1],
    [dropX + 1, dropY],
    [dropX, dropY + 1],
    [dropX - 1, dropY],
  ];

  for (const [x, y] of validCoords) {
    if (srcX === x && srcY === y) {
      document.querySelector(`#${draggedId}.${DRAGGABLE_CLASS_NAME}`).remove();
      dropTarget.insertAdjacentHTML('beforeend', draggedElement);
      break;
    }
  }
};

document.querySelectorAll('.cell').forEach((element) => {
  element.addEventListener('drop', onContainerDrop);
  element.addEventListener('dragover', onContainerDragOver);
});
