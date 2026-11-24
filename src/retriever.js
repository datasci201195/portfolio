(() => {
  const button = document.querySelector('.mast-mascot');
  if (!button) return;

  const bark = new Audio();
  bark.preload = 'none';
  bark.src = button.dataset.bark;
  bark.volume = 0.35;

  button.addEventListener('click', () => {
    bark.currentTime = 0;
    bark.play().catch(() => {});
  });
})();
