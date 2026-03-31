(function () {
  'use strict';

  var isLikelyMobile = /Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent || '');

  document.querySelectorAll('[data-mobile-href]').forEach(function (link) {
    if (isLikelyMobile) {
      link.href = link.dataset.mobileHref;
    }
  });

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(btn.dataset.copy).then(function () {
        var label = btn.querySelector('.gifts__pill-label');
        if (!label) return;

        var orig = label.textContent;
        label.textContent = 'Copied';
        setTimeout(function () { label.textContent = orig; }, 2000);
      });
    });
  });
}());
