(() => {
  const label = document.querySelector('[data-role-typing]');
  if (!label) return;
  const roles = ['Microsoft Fabric Data Engineer', 'Master of Data Science student at UBC'];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer;

  function start() {
    clearTimeout(timer);
    label.textContent = roles[0];
    if (motion.matches) return;

    let role = 0;
    let length = 0;
    let deleting = false;
    function tick() {
      const phrase = roles[role];
      length += deleting ? -1 : 1;
      label.textContent = phrase.slice(0, length);
      if (length === phrase.length) {
        if (role === roles.length - 1) return;
        deleting = true;
        timer = setTimeout(tick, 2200);
      } else if (length === 0) {
        role += 1;
        deleting = false;
        timer = setTimeout(tick, 180);
      } else {
        timer = setTimeout(tick, deleting ? 32 : 70);
      }
    }
    tick();
  }
  start();
  motion.addEventListener('change', start);
})();
