(function () {
  'use strict';
  document.querySelectorAll('img[aria-hidden="true"]').forEach(function (img) {
    img.addEventListener('error', function () {
      this.style.visibility = 'hidden';
    });
  });
}());
