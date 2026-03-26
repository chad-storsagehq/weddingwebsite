(function () {
  'use strict';

  var heroBg = document.querySelector('.hero__bg');
  if (!heroBg) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var heroEl   = document.getElementById('hero-area');
  var heroSection = document.getElementById('home');
  var heroBottom  = 0;
  var heroSectionBottom = 0;

  function recalc() {
    var scrollY = window.pageYOffset;
    heroBottom        = heroEl      ? heroEl.getBoundingClientRect().bottom      + scrollY : 0;
    heroSectionBottom = heroSection ? heroSection.getBoundingClientRect().bottom + scrollY : 0;
  }

  function onScroll() {
    var scrollY = window.pageYOffset;
    if (scrollY > heroBottom) return;

    var bgY;

    if (scrollY <= heroSectionBottom) {
      // Phase 1 — inside the Hero section: sky (15%) → temple center (42%)
      var p1 = scrollY / heroSectionBottom;
      bgY = 15 + p1 * 27;
    } else {
      // Phase 2 — inside the Our Story section: temple (42%) → lower temple (52%)
      // Crowd at base is hidden by overlay gradient darkening
      var remaining = heroBottom - heroSectionBottom;
      var p2 = (scrollY - heroSectionBottom) / remaining;
      bgY = 42 + p2 * 10;
    }

    heroBg.style.backgroundPosition = 'center ' + bgY + '%';
  }

  recalc();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', recalc, { passive: true });
  onScroll();
}());
