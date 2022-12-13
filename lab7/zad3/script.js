const dropArea = document.querySelector('.js-drop-area');
const imgInfo = document.querySelector('.js-img-info');

const onDragOver = (event) => {
  event.preventDefault();
};

const onDrop = (event) => {
  event.preventDefault();
  event.currentTarget.dataset['active'] = false;
  const [draggedFile] = event.dataTransfer.files;

  if (!draggedFile || !draggedFile.type.startsWith('image/')) {
    alert('Pole przyjmuje tylko obrazki!');
    return;
  }

  imgInfo.innerHTML = [
    `<b>Nazwa</b>: ${draggedFile.name}`,
    `<b>Typ</b>: ${draggedFile.type}`,
    `<b>Rozmiar</b>: ${draggedFile.size} bajtów`,
  ]
    .map((record) => `<li>${record}</li>`)
    .join('');

  const reader = new FileReader();
  reader.readAsDataURL(draggedFile);
  reader.onloadend = function () {
    let img = document.createElement('img');
    img.src = reader.result;
    dropArea.replaceChildren(img);
  };
};

const onDragEnter = (event) => {
  event.currentTarget.dataset['active'] = true;
};

const onDragLeave = (event) => {
  event.currentTarget.dataset['active'] = false;
};

dropArea.addEventListener('dragover', onDragOver);
dropArea.addEventListener('drop', onDrop);
dropArea.addEventListener('dragenter', onDragEnter);
dropArea.addEventListener('dragleave', onDragLeave);
