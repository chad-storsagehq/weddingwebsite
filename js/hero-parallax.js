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
      // Phase 1 — inside the Hero section: sky (5%) → temple center (52%)
      var p1 = scrollY / heroSectionBottom;
      bgY = 5 + p1 * 47;
    } else {
      // Phase 2 — inside the Our Story section: temple (52%) → ground (88%)
      var remaining = heroBottom - heroSectionBottom;
      var p2 = (scrollY - heroSectionBottom) / remaining;
      bgY = 52 + p2 * 36;
    }

    heroBg.style.backgroundPosition = 'center ' + bgY + '%';
  }

  recalc();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', recalc, { passive: true });
  onScroll();
}());
