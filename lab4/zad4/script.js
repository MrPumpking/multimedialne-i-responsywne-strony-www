let selectedItems = [];
const menuContainer = document.querySelector('.js-menu');
const selectedItemsContainer = document.querySelector('.js-selected-items');

const getJSON = (path) => {
  return fetch(path).then((response) => response.json());
};

const fetchProductCategories = () => {
  return getJSON('http://localhost:3000/categories');
};

const fetchProductListA = () => {
  return getJSON('http://localhost:3001/products');
};

const fetchProductListB = () => {
  return getJSON('http://localhost:3002/products');
};

const fetchMergedProductList = async () => {
  const [categories, productsA, productsB] = await Promise.all([
    fetchProductCategories(),
    fetchProductListA(),
    fetchProductListB(),
  ]);

  const merged = categories.reduce((dict, category) => {
    const set = dict[category] || (dict[category] = new Set());

    if (category in productsA) {
      productsA[category].forEach((item) => set.add(item));
    }

    if (category in productsB) {
      productsB[category].forEach((item) => set.add(item));
    }

    return dict;
  }, {});

  return merged;
};

const renderMenu = (mergedProducts) => {
  const elements = Object.entries(mergedProducts).map(([category, items]) => {
    const itemsArr = [...items];

    const renderItems = () => {
      return itemsArr.map(
        (item) => `
        <li class="menu__item">
          <input id="${category}-${item}" value="${item}" type="checkbox" class="js-menu-item" />
          <label for="${category}-${item}">${item}</label>
        </li>
      `
      );
    };

    const renderCategoryCheckbox = () => {
      return `<input id="${category}" value="${category}" class="js-category" type="checkbox" data-items="${itemsArr.length}" data-checked-items="0" />`;
    };

    return `
      <li class="menu__category">
        <button class="menu__toggle js-toggle">
          <img src="./img/chevron.svg" />
        </button>
        ${renderCategoryCheckbox()}
        <label for="${category}">${category}</label>
        <ul class="menu__items">
          ${renderItems().join('')}
        </ul>
      </li>
    `;
  });

  menuContainer.innerHTML = elements.join('');
  registerMenuEvents();
};

const renderSelectedItems = () => {
  const items = selectedItems.map((item) => `<li>${item}</li>`);
  selectedItemsContainer.innerHTML = items.join('');
};

const registerMenuEvents = () => {
  document.querySelectorAll('.js-toggle').forEach((toggle) => {
    toggle.addEventListener('click', onToggleClick);
  });

  document.querySelectorAll('.js-category').forEach((category) => {
    category.addEventListener('change', onCategoryToggle);
  });

  document.querySelectorAll('.js-menu-item').forEach((item) => {
    item.addEventListener('change', onItemToggle);
  });
};

const onToggleClick = (event) => {
  const button = event.currentTarget;
  const isToggled = button.dataset['toggled'] === 'true';
  button.dataset['toggled'] = !isToggled;
};

const getCategoryCheckboxState = (categoryCheckbox) => {
  const itemCount = Number(categoryCheckbox.dataset['items']);
  const checkedCount = Number(categoryCheckbox.dataset['checkedItems']);
  const isChecked = categoryCheckbox.checked;
  const isIndeterminate = categoryCheckbox.indeterminate;
  return { itemCount, checkedCount, isChecked, isIndeterminate };
};

const updateCategoryCheckboxState = (categoryCheckbox) => {
  const { itemCount, checkedCount } =
    getCategoryCheckboxState(categoryCheckbox);

  if (itemCount === checkedCount) {
    categoryCheckbox.checked = true;
    categoryCheckbox.indeterminate = false;
  } else {
    categoryCheckbox.checked = false;
    categoryCheckbox.indeterminate = checkedCount !== 0;
  }
};

const onCategoryToggle = (event) => {
  const checkbox = event.currentTarget;
  const category = checkbox.value;
  const { itemCount, checkedCount, isChecked } =
    getCategoryCheckboxState(checkbox);

  const childCheckboxes = checkbox.parentNode.querySelectorAll(
    `input[type=checkbox][id^=${category}-]` +
      (itemCount !== checkedCount ? ':not(:checked)' : '')
  );

  childCheckboxes.forEach((child) => {
    child.checked = isChecked;
    const event = new Event('change');
    child.dispatchEvent(event);
  });
};

const onItemToggle = (event) => {
  const checkbox = event.currentTarget;
  const item = checkbox.value;
  const isChecked = checkbox.checked;
  const [category] = checkbox.id.split('-');
  const parentCheckbox = document.querySelector(`#${category}`);
  const parentCheckedItems = Number(parentCheckbox.dataset['checkedItems']);
  const newParentCheckedItems = parentCheckedItems + (isChecked ? 1 : -1);

  if (isChecked) {
    selectedItems = [...selectedItems, item];
  } else {
    selectedItems = selectedItems.filter(
      (selected) => selected.toLowerCase() !== item.toLowerCase()
    );
  }

  parentCheckbox.dataset['checkedItems'] = newParentCheckedItems;

  updateCategoryCheckboxState(parentCheckbox);
  renderSelectedItems();
};

const run = async () => {
  const mergedProducts = await fetchMergedProductList();
  renderMenu(mergedProducts);
};

run();
