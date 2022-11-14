let nextId = 0;

const form = document.querySelector('.js-form');
const phoneRegExp = /^\+?\d{0,3}\d{9}$/;
const nameRegExp = /^\p{Lu}\p{Ll}+ \p{Lu}\p{Ll}+(-\p{Lu}\p{Ll}+)?$/u;

const listContainer = document.querySelector('.js-list-container');
const nameFormControl = document.querySelector('.js-form-control-name');
const phoneFormControl = document.querySelector('.js-form-control-phone');

const validateName = (name) => {
  return nameRegExp.test(name);
};

const validatePhoneNumber = (number) => {
  const trimmed = number.replace(/\s/g, '');
  return phoneRegExp.test(trimmed);
};

const validate = (name, phone) => {
  const isNameValid = validateName(name);
  const isPhoneValid = validatePhoneNumber(phone);

  nameFormControl.dataset['error'] = !isNameValid;
  phoneFormControl.dataset['error'] = !isPhoneValid;

  return isNameValid && isPhoneValid;
};

const onContactDelete = (id) => {
  const contact = document.querySelector(`#${id}`);
  listContainer.removeChild(contact);
};

const insertContact = (name, phone) => {
  const id = `contact-${nextId++}`;

  listContainer.insertAdjacentHTML(
    'beforeend',
    `
    <div id="${id}" class="contact">
      <div class="contact__details">
        <span class="contact__name">${name}</span>
        <span>${phone}</span>
      </div>
      <button class="contact__delete">
        <img src="./img/delete.svg" />
      </button>
    </div>`
  );

  document
    .querySelector(`#${id} .contact__delete`)
    .addEventListener('click', onContactDelete.bind(null, id));
};

const onSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const name = formData.get('name');
  const phone = formData.get('phone');

  if (validate(name, phone)) {
    insertContact(name, phone);
  }
};

form.addEventListener('submit', onSubmit);
