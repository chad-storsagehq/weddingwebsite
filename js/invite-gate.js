(function () {
  'use strict';

  var params = new URLSearchParams(window.location.search);
  var token = (params.get('invite') || '').toLowerCase();
  var map = window.INVITES || {};
  var entry = token && Object.prototype.hasOwnProperty.call(map, token) ? map[token] : null;
  var invite = entry && entry.events ? entry.events : 'both';
  if (invite !== 'ceremony' && invite !== 'reception') invite = 'both';

  document.documentElement.setAttribute('data-invite', invite);
  if (invite === 'both') return;

  var hide = invite === 'ceremony' ? 'reception' : 'ceremony';

  function applyGate() {
    var nodes = document.querySelectorAll('[data-event="' + hide + '"]');
    for (var i = 0; i < nodes.length; i++) nodes[i].hidden = true;

    var keep = document.querySelector(
      '[data-event="' + invite + '"] input[name="events"]'
    );
    if (keep) keep.checked = true;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyGate);
  } else {
    applyGate();
  }
}());
