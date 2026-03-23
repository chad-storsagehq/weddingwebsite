(function () {
  const WEDDING_DATE = new Date('2026-08-16T00:00:00');

  const daysEl     = document.getElementById('countdown-days');
  const hoursEl    = document.getElementById('countdown-hours');
  const minsEl     = document.getElementById('countdown-mins');
  const secsEl     = document.getElementById('countdown-secs');
  const countdownEl = document.getElementById('countdown');

  if (!daysEl) return;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    const now  = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
      clearInterval(intervalId);
      countdownEl.innerHTML = '<p class="countdown__married">We\'re married! \uD83C\uDF89</p>';
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent  = days;
    hoursEl.textContent = pad(hours);
    minsEl.textContent  = pad(mins);
    secsEl.textContent  = pad(secs);
  }

  tick();
  const intervalId = setInterval(tick, 1000);
})();
