(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (item) {
      item.classList.add('is-visible');
    });
    return;
  }

  document.body.classList.add('js-motion-ready');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -8% 0px'
  });

  items.forEach(function (item) {
    observer.observe(item);
  });
})();
