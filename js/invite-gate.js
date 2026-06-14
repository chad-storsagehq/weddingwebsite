(function () {
  'use strict';

  var params = new URLSearchParams(window.location.search);
  var token = (params.get('invite') || '').toLowerCase();
  var map = window.INVITES || {};
  var entry = token && Object.prototype.hasOwnProperty.call(map, token) ? map[token] : null;
  var invite = entry && entry.events ? entry.events : 'main';
  if (invite !== 'ceremony' && invite !== 'reception' && invite !== 'both') invite = 'main';

  document.documentElement.setAttribute('data-invite', invite);
  if (invite === 'main') return;

  var hide = invite === 'ceremony' ? 'reception' : invite === 'reception' ? 'ceremony' : null;

  function applyGate() {
    if (hide) {
      var nodes = document.querySelectorAll('[data-event="' + hide + '"]');
      for (var i = 0; i < nodes.length; i++) nodes[i].hidden = true;

      var keep = document.querySelector(
        '[data-event="' + invite + '"] input[name="events"]'
      );
      if (keep) keep.checked = true;
    }

    // Cap guests at 2 on every invite link (ceremony / reception / both).
    // The main URL is never reached here, so it keeps its default of 12.
    var partySize = document.getElementById('rsvp-party-size');
    if (partySize) {
      partySize.setAttribute('data-guest-cap', '2');
      if (Number(partySize.value) > 2) partySize.value = '2';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyGate);
  } else {
    applyGate();
  }
}());
