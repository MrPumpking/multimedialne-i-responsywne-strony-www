let dragSrcEl = null;

document.querySelectorAll('.drag-element').forEach((element) => {
  element.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  element.addEventListener('dragstart', (event) => {
    dragSrcEl = event.currentTarget;
    dragSrcEl.style.opacity = 0.4;

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', dragSrcEl.innerHTML);
  });

  element.addEventListener('dragend', (event) => {
    event.currentTarget.style.opacity = 1;
  });

  element.addEventListener('drop', (event) => {
    event.preventDefault();
    const dropTarget = event.currentTarget;

    if (dragSrcEl !== dropTarget) {
      dragSrcEl.innerHTML = dropTarget.innerHTML;
      dropTarget.innerHTML = event.dataTransfer.getData('text/html');
    }
  });
});
