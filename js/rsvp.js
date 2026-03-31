(function () {
  'use strict';

  var form = document.getElementById('rsvp-form');
  if (!form) return;

  var endpoint = form.dataset.endpoint || '';
  var attendanceInput = document.getElementById('rsvp-attendance');
  var choiceButtons = Array.prototype.slice.call(form.querySelectorAll('[data-attendance-choice]'));
  var followup = document.getElementById('rsvp-followup');
  var nameInput = document.getElementById('rsvp-name');
  var partySizeInput = document.getElementById('rsvp-party-size');
  var eventInputs = Array.prototype.slice.call(form.querySelectorAll('input[name="events"]'));
  var dietaryInput = document.getElementById('rsvp-dietary');
  var status = document.getElementById('rsvp-status');
  var submitButton = form.querySelector('.rsvp-form__submit');

  function setStatus(message, isSuccess) {
    status.textContent = message;
    status.classList.toggle('is-success', Boolean(isSuccess));
  }

  function setAttendance(value) {
    attendanceInput.value = value;

    choiceButtons.forEach(function (button) {
      var selected = button.dataset.attendanceChoice === value;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });

    var joining = value === 'yes';
    followup.hidden = !joining;
    partySizeInput.required = joining;

    if (!joining) {
      partySizeInput.value = '';
      dietaryInput.value = '';
      eventInputs.forEach(function (input) {
        input.checked = false;
      });
    }
  }

  choiceButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      setAttendance(button.dataset.attendanceChoice);
      setStatus('', false);
    });
  });

  function getSelectedEvents() {
    return eventInputs.filter(function (input) {
      return input.checked;
    }).map(function (input) {
      return input.value;
    });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    setStatus('', false);

    if (form.website.value) {
      return;
    }

    var attendance = attendanceInput.value;
    var name = nameInput.value.trim();
    var partySize = partySizeInput.value;
    var events = getSelectedEvents();
    var dietary = dietaryInput.value.trim();

    if (!attendance) {
      setStatus('Please let us know if you are joining us.', false);
      return;
    }

    if (!name) {
      setStatus('Please enter your name.', false);
      nameInput.focus();
      return;
    }

    if (attendance === 'yes') {
      if (!partySize || Number(partySize) < 1) {
        setStatus('Please tell us how many people are attending.', false);
        partySizeInput.focus();
        return;
      }

      if (!events.length) {
        setStatus('Please select at least one event.', false);
        return;
      }
    }

    if (!endpoint || endpoint.indexOf('__SET_GOOGLE_APPS_SCRIPT_WEB_APP_URL__') !== -1) {
      setStatus('The custom RSVP design is ready, but the Google Sheets connection still needs to be linked.', false);
      return;
    }

    var payload = {
      submitted_at: new Date().toISOString(),
      attendance: attendance,
      name: name,
      party_size: attendance === 'yes' ? Number(partySize) : 0,
      attending_ceremony: events.indexOf('Wedding Ceremony') !== -1,
      attending_reception: events.indexOf('Reception') !== -1,
      dietary_restrictions: dietary,
      source: window.location.href
    };

    submitButton.disabled = true;
    setStatus('Submitting your RSVP...', false);

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify(payload)
    }).then(function () {
      form.reset();
      setAttendance('');
      setStatus('Thank you. Your RSVP has been received.', true);
    }).catch(function () {
      setStatus('We could not submit your RSVP just yet. Please email us at chadandanusha@gmail.com.', false);
    }).finally(function () {
      submitButton.disabled = false;
    });
  });
}());
