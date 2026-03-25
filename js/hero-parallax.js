(function () {
  'use strict';

  var heroBg = document.querySelector('.hero__bg');
  if (!heroBg) return;

  // Respect user's reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var heroEl = document.getElementById('hero-area');
  var heroBottom = 0;

  function recalc() {
    heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom + window.pageYOffset : 0;
  }

  function onScroll() {
    var scrollY = window.pageYOffset;
    // Only run while hero is visible
    if (scrollY > heroBottom) return;
    heroBg.style.transform = 'translateY(' + (scrollY * 0.38) + 'px)';
  }

  recalc();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', recalc, { passive: true });
  onScroll();
}());
