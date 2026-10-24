// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}));

// Hide a photo gracefully if it fails to load (the frame keeps its colour)
document.querySelectorAll('img').forEach((img) => {
  const hide = () => { img.style.visibility = 'hidden'; };
  if (img.complete && img.naturalWidth === 0) hide();
  else img.addEventListener('error', hide, { once: true });
});

document.getElementById('year').textContent = new Date().getFullYear();

// Price tabs (arrow keys move between tabs)
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  tabs.forEach((t) => {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  });
  tab.focus();
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') selectTab(tabs[(i + 1) % tabs.length]);
    if (e.key === 'ArrowLeft') selectTab(tabs[(i - 1 + tabs.length) % tabs.length]);
  });
});

// Open / closed status, using Edmonton time
const HOURS = { 0: null, 1: null, 2: [9, 18], 3: [9, 18], 4: [9, 20], 5: [9, 20], 6: [9, 16] };
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const fmt = (h) => `${h % 12 || 12}${h < 12 ? ' am' : ' pm'}`;

function edmontonNow() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Edmonton', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, hour: Number(get('hour')) + Number(get('minute')) / 60 };
}

(function updateStatus() {
  const { day, hour } = edmontonNow();
  const today = HOURS[day];
  const statusEl = document.getElementById('open-status');
  const detailEl = document.getElementById('open-detail');
  const dot = document.getElementById('status-dot');

  document.querySelector(`.hours tr[data-day="${day}"]`)?.classList.add('today');

  if (today && hour >= today[0] && hour < today[1]) {
    statusEl.textContent = 'Open now';
    detailEl.textContent = `Until ${fmt(today[1])} today`;
    dot.classList.add('open');
    return;
  }

  // Find the next opening time
  let next = null;
  if (today && hour < today[0]) next = { label: 'today', h: today[0] };
  for (let i = 1; !next && i <= 7; i++) {
    const d = (day + i) % 7;
    if (HOURS[d]) next = { label: i === 1 ? 'tomorrow' : DAYS[d], h: HOURS[d][0] };
  }
  statusEl.textContent = 'Closed now';
  detailEl.textContent = `Opens ${next.label} at ${fmt(next.h)}`;
  dot.classList.add('closed');
})();

// Booking form (demo: validates, then shows a message instead of sending)
const form = document.getElementById('book-form');
const status = document.getElementById('form-status');
const dateInput = document.getElementById('date');
dateInput.min = new Date().toISOString().split('T')[0];

function setError(field, message) {
  const wrap = field.closest('.field');
  wrap.classList.add('invalid');
  let msg = wrap.querySelector('.error');
  if (!msg) { msg = document.createElement('span'); msg.className = 'error'; wrap.appendChild(msg); }
  msg.textContent = message;
  field.setAttribute('aria-invalid', 'true');
}
function clearError(field) {
  const wrap = field.closest('.field');
  wrap.classList.remove('invalid');
  wrap.querySelector('.error')?.remove();
  field.removeAttribute('aria-invalid');
}
// Evening slots only on late-closing days (Thu and Fri)
const evening = form.querySelector('input[name="time"][value="Evening"]');
const lateDay = (v) => !v || HOURS[new Date(`${v}T12:00:00`).getDay()]?.[1] >= 20;
function syncEvening() {
  const ok = lateDay(dateInput.value);
  evening.disabled = !ok;
  clearError(evening);
  if (!ok && evening.checked) form.querySelector('input[name="time"][value="Morning"]').checked = true;
}
dateInput.addEventListener('input', syncEvening);
dateInput.addEventListener('change', syncEvening);

form.querySelectorAll('input, select, textarea').forEach((el) => {
  el.addEventListener('input', () => clearError(el));
  el.addEventListener('change', () => clearError(el));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = '';
  status.className = 'form-status';

  const closedDay = (v) => {
    if (!v) return false;
    const d = new Date(`${v}T12:00:00`).getDay();
    return !HOURS[d];
  };

  const checks = [
    ['service', (v) => v !== '', 'Please choose a service.'],
    ['date', (v) => v !== '' && !closedDay(v), dateInput.value && closedDay(dateInput.value) ? 'We are closed that day. Please pick Tuesday to Saturday.' : 'Please pick a day.'],
    ['name', (v) => v.trim().length > 1, 'Please enter your name.'],
    ['phone', (v) => v.replace(/\D/g, '').length >= 10, 'Please enter a 10-digit mobile number.'],
  ];

  let firstBad = null;
  checks.forEach(([id, ok, message]) => {
    const field = document.getElementById(id);
    if (!ok(field.value)) { setError(field, message); firstBad ||= field; } else { clearError(field); }
  });
  if (evening.checked && !lateDay(dateInput.value)) {
    setError(evening, 'Evening appointments are Thursday and Friday only.');
    firstBad ||= evening;
  } else { clearError(evening); }
  if (firstBad) { firstBad.focus(); return; }

  const name = document.getElementById('name').value.trim().split(' ')[0];
  const service = document.getElementById('service').value;
  status.textContent = `Thanks ${name}, we'll text you to confirm your ${service}. (This is a demo site, so nothing was actually sent.)`;
  status.classList.add('ok');
  form.reset();
  syncEvening();
});
