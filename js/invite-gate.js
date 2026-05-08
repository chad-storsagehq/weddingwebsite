(function () {
  'use strict';

  var params = new URLSearchParams(window.location.search);
  var invite = (params.get('invite') || '').toLowerCase();
  if (invite !== 'ceremony' && invite !== 'reception') invite = 'both';

  document.documentElement.setAttribute('data-invite', invite);
  if (invite === 'both') return;

  var hide = invite === 'ceremony' ? 'reception' : 'ceremony';

  function applyGate() {
    var nodes = document.querySelectorAll('[data-event="' + hide + '"]');
    for (var i = 0; i < nodes.length; i++) nodes[i].hidden = true;

    var picker = document.querySelector('.rsvp-form__field--checkboxes');
    if (picker) picker.hidden = true;

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
