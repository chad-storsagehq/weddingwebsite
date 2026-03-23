(function () {
  var nav = document.getElementById('nav');
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');

  if (!nav || !hamburger || !navLinks) return;

  function updateNavStyle() {
    if (window.scrollY > 80) {
      nav.classList.remove('nav--transparent');
      nav.classList.add('nav--solid');
    } else {
      nav.classList.remove('nav--solid');
      nav.classList.add('nav--transparent');
    }
  }

  nav.classList.add('nav--transparent');
  updateNavStyle();
  window.addEventListener('scroll', updateNavStyle, { passive: true });

  hamburger.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) {
      var firstLink = navLinks.querySelector('a');
      if (firstLink) firstLink.focus();
    } else {
      hamburger.focus();
    }
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();
