const PROXY_API = 'https://your-worker-name.workers.dev/proxy';

const form = document.getElementById('proxyForm');
const input = document.getElementById('urlInput');
const frame = document.getElementById('proxyFrame');
const browserUrl = document.getElementById('browserUrl');
const newTabBtn = document.getElementById('newTabBtn');

function normalizeUrl(raw) {
  const value = raw.trim();
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

function loadPage(rawUrl) {
  const safe = normalizeUrl(rawUrl);
  if (!safe) return;

  input.value = safe;
  browserUrl.textContent = safe;
  frame.src = `${PROXY_API}?url=${encodeURIComponent(safe)}`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  loadPage(input.value);
});

document.querySelectorAll('.chip').forEach((button) => {
  button.addEventListener('click', () => {
    loadPage(button.dataset.url);
  });
});

newTabBtn.addEventListener('click', () => {
  const safe = normalizeUrl(input.value);
  if (safe) window.open(safe, '_blank', 'noopener');
});

loadPage(input.value);
