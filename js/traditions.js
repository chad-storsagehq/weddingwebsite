(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  var items = document.querySelectorAll('.traditions__item');

  items.forEach(function (item) {
    var toggle = item.querySelector('.traditions__toggle');
    var content = item.querySelector('.traditions__content');
    if (!toggle || !content) return;

    toggle.addEventListener('click', function () {
      var isOpen = item.classList.contains('traditions__item--open');

      // Close all open items
      items.forEach(function (other) {
        other.classList.remove('traditions__item--open');
        var otherToggle = other.querySelector('.traditions__toggle');
        var otherContent = other.querySelector('.traditions__content');
        if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
        if (otherContent) otherContent.hidden = true;
      });

      // Open clicked item if it was closed, then scroll it into view
      if (!isOpen) {
        item.classList.add('traditions__item--open');
        toggle.setAttribute('aria-expanded', 'true');
        content.hidden = false;

        // Scroll so the item header sits just below the nav
        requestAnimationFrame(function () {
          var navHeight = nav ? nav.offsetHeight : 60;
          var top = item.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
          window.scrollTo({ top: top, behavior: 'smooth' });
        });
      }
    });
  });
}());
