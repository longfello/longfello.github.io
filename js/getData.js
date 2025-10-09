// Номер записи, которую нужно показать (0 — первая, 1 — вторая и т.д.)
const recordIndex = 1;

(async () => {
  const status = document.getElementById('status');
  try {
    const res = await fetch('/api/notes', { credentials: 'include' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();

    const note = Array.isArray(data) ? data[recordIndex] : null;
    if (!note) {
      status.textContent = `В таблице нет записи с индексом ${recordIndex}.`;
      return;
    }

    document.getElementById('id').textContent = note.id ?? '—';
    document.getElementById('notebook').textContent = note.notebook ?? '—';
    document.getElementById('title').textContent = note.title ?? '(без названия)';
    document.getElementById('content').textContent = note.note ?? '';

    document.getElementById('note').hidden = false;
    status.remove();
  } catch (err) {
    status.textContent = 'Не удалось загрузить данные: ' + (err?.message || err);
  }
})();
