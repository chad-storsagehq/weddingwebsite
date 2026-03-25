(function () {
  'use strict';

  var heroBg = document.querySelector('.hero__bg');
  if (!heroBg) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var heroEl = document.getElementById('hero-area');
  var heroBottom = 0;

  function recalc() {
    heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom + window.pageYOffset : 0;
  }

  function onScroll() {
    var scrollY = window.pageYOffset;
    if (scrollY > heroBottom) return;

    // Progress 0→1 as user scrolls from page top through the entire hero+about area
    var progress = Math.max(0, Math.min(1, scrollY / heroBottom));

    // Map to background-position: 5% (sky at top) → 88% (ground at bottom)
    // Temple is ~50% into image, visible around mid-scroll
    var bgY = 5 + progress * 83;
    heroBg.style.backgroundPosition = 'center ' + bgY + '%';
  }

  recalc();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', recalc, { passive: true });
  onScroll();
}());
