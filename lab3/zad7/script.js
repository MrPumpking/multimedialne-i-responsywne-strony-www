const ruleList = document.querySelector('.js-rule-list');
const newPasswordInput = document.querySelector('#new-password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const showPasswordButtons = document.querySelectorAll('.js-show-password');

const rules = [
  { test: (val) => val.length >= 8, label: 'at least 8 characters' },
  {
    test: (val) => /(?=.*?[#?!@$%^&*-])/.test(val),
    label: 'at least one special character',
  },
  { test: (val) => /[A-Z]+/.test(val), label: 'at least one capital letter' },
  { test: (val) => /[0-9]+/.test(val), label: 'at least one digit' },
];

const renderRule = (isValid, label) => {
  return `
    <div class="rule" data-valid="${isValid}">
      <div class="rule__icon"></div>
      <span class="rule__label">${label}</span>
    </div>`;
};

const renderRules = (password) => {
  ruleList.innerHTML = rules
    .map((rule) => renderRule(rule.test(password), rule.label))
    .join('');
};

renderRules('');

const checkPasswordMatch = () => {
  const match = newPasswordInput.value === confirmPasswordInput.value;
  document.querySelector('.js-confirm-control').dataset['invalid'] = !match;
};

newPasswordInput.addEventListener('input', (event) => {
  const password = event.target.value;
  renderRules(password);
  checkPasswordMatch();
});

confirmPasswordInput.addEventListener('input', () => {
  checkPasswordMatch();
});

const onTogglePasswordVisibility = (event) => {
  const button = event.target;
  const isVisible = button.dataset['visible'] === 'true';
  const passwordInput = button.parentNode.querySelector('.js-password');

  passwordInput.setAttribute('type', isVisible ? 'password' : 'text');
  button.dataset['visible'] = !isVisible;
};

showPasswordButtons.forEach((button) => {
  button.addEventListener('click', onTogglePasswordVisibility);
});
