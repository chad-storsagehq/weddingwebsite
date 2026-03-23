(function () {
  var WEDDING_DATE = new Date('2026-08-16T00:00:00');

  var daysEl  = document.getElementById('countdown-days');
  var hoursEl = document.getElementById('countdown-hours');
  var minsEl  = document.getElementById('countdown-mins');
  var secsEl  = document.getElementById('countdown-secs');
  var countdownEl = document.getElementById('countdown');

  if (!daysEl) return;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    var now  = new Date();
    var diff = WEDDING_DATE - now;

    if (diff <= 0) {
      countdownEl.innerHTML = '<p class="countdown__married">We\'re married! \uD83C\uDF89</p>';
      return;
    }

    var days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var secs  = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent  = days;
    hoursEl.textContent = pad(hours);
    minsEl.textContent  = pad(mins);
    secsEl.textContent  = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();
