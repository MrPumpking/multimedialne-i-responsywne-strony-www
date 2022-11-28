const imageCount = 10;
const container = document.querySelector('.js-sections');
let nextSection = 'text';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const appendSection = (content) => {
  container.insertAdjacentHTML(
    'beforeend',
    `<section class="section">
      ${content}
    </section>`
  );
};

const appendTextSection = () => {
  appendSection(`
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus quas
    iusto amet, quae cumque dolor unde exercitationem adipisci obcaecati ab
    dolore eligendi, temporibus mollitia libero ea earum illo. Tempore
    inventore fuga possimus alias illo eaque repellendus reiciendis? Provident
    nostrum nulla fugit. Minima impedit facere, distinctio est asperiores et
    ipsum ducimus?
  `);
};

const getRandomImageURL = () => {
  return `./img/${getRandomInt(0, imageCount)}.jpg`;
};

const appendImageSection = () => {
  return appendSection(`<img src="${getRandomImageURL()}" alt="" />`);
};

const appendNextSection = () => {
  if (nextSection === 'text') {
    appendTextSection();
    nextSection = 'image';
  } else {
    appendImageSection();
    nextSection = 'text';
  }
};

const observer = new IntersectionObserver((entries, observer) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      appendNextSection();
      observer.unobserve(entry.target);
      observePenultimateElement();
    }
  }
});

const observePenultimateElement = () => {
  const element = container.querySelector('section:nth-last-child(3)');
  observer.observe(element);
};

observePenultimateElement();
