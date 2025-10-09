// какую запись показываем (0 — первая, 1 — вторая и т.д.)
const recordIndex = 0;

(async () => {
  try {
    const res = await fetch('/api/notes', { credentials: 'include' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();

    const note = Array.isArray(data) ? data[recordIndex] : null;
    const app = document.getElementById('app');

    if (!note) {
      app.innerHTML = `<p class="muted">В таблице нет записи с индексом ${recordIndex}.</p>`;
    } else {
      app.innerHTML = `
        <h1>Запись из таблицы <code>notes</code></h1>
        <div class="card">
          <h2>${escapeHtml(note.title ?? '(без названия)')}</h2>
          <div class="muted">id: ${note.id ?? '—'} · notebook: ${note.notebook ?? '—'}</div>
          <pre>${escapeHtml(note.note ?? '')}</pre>
        </div>
      `;
    }
  } catch (e) {
    document.getElementById('app').innerHTML =
      `<p class="muted">Не удалось загрузить данные: ${escapeHtml(e?.message || e)}</p>`;
  } finally {
    // снимаем скрытие — показываем уже готовую разметку одним кадром
    document.documentElement.classList.remove('loading');
  }
})();

// простая защита от XSS при вставке текста
function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
