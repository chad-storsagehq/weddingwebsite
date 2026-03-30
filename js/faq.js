(function () {
  var items = document.querySelectorAll('.faq__item');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function closeItem(item) {
    var button = item.querySelector('.faq__question');
    var answer = item.querySelector('.faq__answer');

    if (!button || !answer) return;

    button.setAttribute('aria-expanded', 'false');
    item.classList.remove('faq__item--open');

    if (reduceMotion) {
      answer.hidden = true;
      return;
    }

    window.setTimeout(function () {
      if (!item.classList.contains('faq__item--open')) {
        answer.hidden = true;
      }
    }, 420);
  }

  function openItem(item) {
    var button = item.querySelector('.faq__question');
    var answer = item.querySelector('.faq__answer');

    if (!button || !answer) return;

    answer.hidden = false;
    window.requestAnimationFrame(function () {
      item.classList.add('faq__item--open');
      button.setAttribute('aria-expanded', 'true');
    });
  }

  items.forEach(function (item) {
    var btn = item.querySelector('.faq__question');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('faq__item--open');

      items.forEach(function (other) {
        if (other !== item) closeItem(other);
      });

      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });
})();
