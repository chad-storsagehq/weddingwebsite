(function () {
  'use strict';

  var eventTabs   = Array.from(document.querySelectorAll('[data-dresscode-event]'));
  var eventPanels = Array.from(document.querySelectorAll('[data-dresscode-panel]'));
  var inspoTabs  = Array.from(document.querySelectorAll('[data-inspo-gender]'));
  var inspoGrids = Array.from(document.querySelectorAll('[data-inspo-panel]'));
  var inspoCopyPanels = Array.from(document.querySelectorAll('[data-inspo-copy]'));

  function setActiveInspo(eventName, gender) {
    var activeKey = eventName + '-' + gender;

    inspoTabs.forEach(function (tab) {
      if (tab.dataset.inspoEvent !== eventName) return;
      var isActive = tab.dataset.inspoGender === gender;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    inspoGrids.forEach(function (grid) {
      if (grid.dataset.inspoPanel.indexOf(eventName + '-') !== 0) return;
      grid.hidden = grid.dataset.inspoPanel !== activeKey;
    });

    inspoCopyPanels.forEach(function (panel) {
      if (panel.dataset.inspoCopy.indexOf(eventName + '-') !== 0) return;
      panel.hidden = panel.dataset.inspoCopy !== activeKey;
    });
  }

  function setActiveEvent(eventName) {
    eventTabs.forEach(function (tab) {
      var isActive = tab.dataset.dresscodeEvent === eventName;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    eventPanels.forEach(function (panel) {
      panel.hidden = panel.dataset.dresscodePanel !== eventName;
    });

    setActiveInspo(eventName, 'women');
  }

  eventTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      setActiveEvent(tab.dataset.dresscodeEvent);
    });
  });

  inspoTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      setActiveInspo(tab.dataset.inspoEvent, tab.dataset.inspoGender);
    });
  });

  if (eventTabs.length) {
    var initialEvent = 'wedding';
    var activeEventTab = eventTabs.find(function (tab) {
      return tab.classList.contains('is-active');
    });

    if (activeEventTab) {
      initialEvent = activeEventTab.dataset.dresscodeEvent || initialEvent;
    }

    setActiveEvent(initialEvent);
  }

}());
