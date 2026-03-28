(function () {
  'use strict';

  var heroBg = document.querySelector('.hero__bg');
  if (!heroBg) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var heroEl = document.getElementById('hero-area');
  if (!heroEl) return;
  var mobileMq = window.matchMedia('(max-width: 540px)');
  var ticking = false;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function update() {
    var rect = heroEl.getBoundingClientRect();
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var travel = rect.height + viewportHeight * 0.2;
    var progress = clamp((viewportHeight - rect.top) / travel, 0, 1);
    var shift = mobileMq.matches ? progress * -18 : progress * -56;
    var scale = mobileMq.matches ? 1.025 : 1.065;

    heroBg.style.setProperty('--hero-bg-shift', shift.toFixed(2) + 'px');
    heroBg.style.setProperty('--hero-bg-scale', scale.toFixed(3));
    ticking = false;
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  requestUpdate();
}());
