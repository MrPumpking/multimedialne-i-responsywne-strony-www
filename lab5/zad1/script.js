const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    }
  },
  {
    threshold: 1,
  }
);

const videos = document.querySelectorAll('.js-video');
videos.forEach((video) => observer.observe(video));
