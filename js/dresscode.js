(function () {
  'use strict';

  var genderButtons = Array.prototype.slice.call(document.querySelectorAll('[data-dresscode-gender]'));
  var priceButtons = Array.prototype.slice.call(document.querySelectorAll('[data-dresscode-price]'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.dresscode__browse-card'));

  if (!genderButtons.length || !priceButtons.length || !cards.length) return;

  var state = {
    gender: 'women',
    price: 'budget'
  };

  function syncButtons(buttons, activeValue, attribute) {
    buttons.forEach(function (button) {
      button.classList.toggle('is-active', button.getAttribute(attribute) === activeValue);
    });
  }

  function renderCards() {
    cards.forEach(function (card) {
      var matches = card.dataset.gender === state.gender && card.dataset.price === state.price;
      card.hidden = !matches;
    });

    syncButtons(genderButtons, state.gender, 'data-dresscode-gender');
    syncButtons(priceButtons, state.price, 'data-dresscode-price');
  }

  genderButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      state.gender = button.dataset.dresscodeGender;
      renderCards();
    });
  });

  priceButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      state.price = button.dataset.dresscodePrice;
      renderCards();
    });
  });

  renderCards();
}());
