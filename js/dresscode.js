(function () {
  'use strict';

  // ── Main event tabs (Haldi / Wedding & Reception) ──
  var eventTabs   = Array.from(document.querySelectorAll('[data-dresscode-event]'));
  var eventPanels = Array.from(document.querySelectorAll('[data-dresscode-panel]'));

  if (eventTabs.length) {
    eventTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.dataset.dresscodeEvent;

        eventTabs.forEach(function (t) {
          t.classList.toggle('is-active', t === tab);
          t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
        });

        eventPanels.forEach(function (panel) {
          panel.hidden = panel.dataset.dresscodePanel !== target;
        });
      });
    });
  }

  // ── Inspo gender sub-tabs (Women / Men) ──
  var inspoTabs  = Array.from(document.querySelectorAll('[data-inspo-gender]'));
  var inspoGrids = Array.from(document.querySelectorAll('[data-inspo-panel]'));

  if (inspoTabs.length) {
    inspoTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var gender = tab.dataset.inspoGender;
        var event  = tab.dataset.inspoEvent;
        var key    = event + '-' + gender;

        // Activate only sibling tabs for the same event
        inspoTabs.forEach(function (t) {
          if (t.dataset.inspoEvent === event) {
            t.classList.toggle('is-active', t === tab);
          }
        });

        // Show only the matching grid; hide others for this event
        inspoGrids.forEach(function (grid) {
          var panelKey = grid.dataset.inspoPanel;
          if (panelKey.indexOf(event + '-') === 0) {
            grid.hidden = panelKey !== key;
          }
        });
      });
    });
  }

}());
