(function () {
  const items = document.querySelectorAll('.faq__item');

  items.forEach(function (item) {
    const btn = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    const icon = item.querySelector('.faq__icon');

    btn.addEventListener('click', function () {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all others
      items.forEach(function (other) {
        other.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq__answer').hidden = true;
        other.querySelector('.faq__icon').textContent = '+';
        other.classList.remove('faq__item--open');
      });

      // Toggle current
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
        icon.textContent = '−';
        item.classList.add('faq__item--open');
      }
    });
  });
})();
