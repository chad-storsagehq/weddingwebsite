(function () {
  'use strict';

  const items = document.querySelectorAll('.traditions__item');

  items.forEach(function (item) {
    const toggle = item.querySelector('.traditions__toggle');
    const content = item.querySelector('.traditions__content');
    if (!toggle || !content) return;

    toggle.addEventListener('click', function () {
      const isOpen = item.classList.contains('traditions__item--open');

      // Close all open items
      items.forEach(function (other) {
        other.classList.remove('traditions__item--open');
        const otherToggle = other.querySelector('.traditions__toggle');
        const otherContent = other.querySelector('.traditions__content');
        if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
        if (otherContent) otherContent.hidden = true;
      });

      // Open clicked item if it was closed
      if (!isOpen) {
        item.classList.add('traditions__item--open');
        toggle.setAttribute('aria-expanded', 'true');
        content.hidden = false;
      }
    });
  });
}());
