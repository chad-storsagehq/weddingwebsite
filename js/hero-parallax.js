(function () {
  'use strict';

  var heroBg = document.querySelector('.hero__bg');
  var heroShowcase = document.querySelector('.hero__showcase');
  if (!heroBg) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.body.classList.add('has-hero-motion');

  var heroEl = document.getElementById('hero-area');
  if (!heroEl) return;
  var mobileMq = window.matchMedia('(max-width: 540px)');
  var currentShift = 0;
  var targetShift = 0;
  var currentScale = 1;
  var targetScale = 1;
  var rafId = 0;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function measure() {
    var rect = heroEl.getBoundingClientRect();
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var travel = rect.height + viewportHeight * 0.2;
    var progress = clamp((viewportHeight - rect.top) / travel, 0, 1);
    targetShift = mobileMq.matches ? progress * 96 : progress * 62;
    targetScale = mobileMq.matches ? 1.014 : 1.065;

    if (heroShowcase) {
      var revealProgress = mobileMq.matches ? clamp((progress - 0.16) / 0.2, 0, 1) : clamp((progress - 0.16) / 0.2, 0, 1);
      heroShowcase.style.setProperty('--hero-showcase-opacity', revealProgress.toFixed(3));
      heroShowcase.style.setProperty('--hero-showcase-shift', (190 - revealProgress * 190).toFixed(2) + 'px');
    }
  }

  function render() {
    currentShift += (targetShift - currentShift) * 0.075;
    currentScale += (targetScale - currentScale) * 0.075;

    heroBg.style.setProperty('--hero-bg-shift', currentShift.toFixed(2) + 'px');
    heroBg.style.setProperty('--hero-bg-scale', currentScale.toFixed(3));

    if (Math.abs(targetShift - currentShift) > 0.1 || Math.abs(targetScale - currentScale) > 0.001) {
      rafId = window.requestAnimationFrame(render);
    } else {
      currentShift = targetShift;
      currentScale = targetScale;
      heroBg.style.setProperty('--hero-bg-shift', currentShift.toFixed(2) + 'px');
      heroBg.style.setProperty('--hero-bg-scale', currentScale.toFixed(3));
      rafId = 0;
    }
  }

  function requestUpdate() {
    measure();
    if (rafId) return;
    rafId = window.requestAnimationFrame(render);
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  requestUpdate();
}());
