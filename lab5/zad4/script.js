const sections = document.querySelectorAll('.js-section');

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    entry.target.setAttribute(
      'data-state',
      entry.isIntersecting ? 'visible' : 'hidden'
    );
  }
});

sections.forEach((section) => observer.observe(section));
