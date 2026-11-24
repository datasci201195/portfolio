const mascot = document.querySelector('.mast-mascot');
const portrait = mascot.querySelector('img');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let animation;

function tilt() {
  animation?.cancel();
  if (reducedMotion.matches) return;
  animation = portrait.animate([
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(-5deg)', offset: 0.45 },
    { transform: 'rotate(0deg)' },
  ], { duration: 660, easing: 'ease-in-out' });
}

mascot.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse') tilt();
});

mascot.addEventListener('click', tilt);
