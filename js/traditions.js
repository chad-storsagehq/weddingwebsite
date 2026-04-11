(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  var items = document.querySelectorAll('.traditions__item');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var COLLAPSE_DURATION = 420;

  function scrollItemIntoView(item) {
    var navHeight = nav ? nav.offsetHeight : 60;
    var top = item.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
    window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  function closeItem(item) {
    var toggle = item.querySelector('.traditions__toggle');
    var content = item.querySelector('.traditions__content');

    if (!toggle || !content) return;

    item.classList.remove('traditions__item--open');
    toggle.setAttribute('aria-expanded', 'false');

    if (reduceMotion) {
      content.hidden = true;
      return;
    }

    window.setTimeout(function () {
      if (!item.classList.contains('traditions__item--open')) {
        content.hidden = true;
      }
    }, 420);
  }

  function openItem(item) {
    var toggle = item.querySelector('.traditions__toggle');
    var content = item.querySelector('.traditions__content');

    if (!toggle || !content) return;

    content.hidden = false;
    window.requestAnimationFrame(function () {
      item.classList.add('traditions__item--open');
      toggle.setAttribute('aria-expanded', 'true');
    });

    window.requestAnimationFrame(function () {
      scrollItemIntoView(item);
    });

    window.setTimeout(function () {
      if (item.classList.contains('traditions__item--open')) {
        scrollItemIntoView(item);
      }
    }, reduceMotion ? 0 : COLLAPSE_DURATION);
  }

  function hasOtherOpenItem(currentItem) {
    return Array.prototype.some.call(items, function (other) {
      return other !== currentItem && other.classList.contains('traditions__item--open');
    });
  }

  items.forEach(function (item) {
    var toggle = item.querySelector('.traditions__toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      var isOpen = item.classList.contains('traditions__item--open');

      items.forEach(function (other) {
        if (other !== item) closeItem(other);
      });

      if (isOpen) {
        closeItem(item);
      } else {
        if (hasOtherOpenItem(item) && !reduceMotion) {
          window.setTimeout(function () {
            openItem(item);
          }, COLLAPSE_DURATION / 2);
        } else {
          openItem(item);
        }
      }
    });
  });
}());
