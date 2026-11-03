(() => {
  const HOLD_MS = 400;
  const $ = (id) => document.getElementById(id);
  const menuBtn = $('menu-btn'), menu = $('menu'), meta = $('meta'), text = $('text'), src = $('src'), pos = $('pos');

  let decks = [], deck = null, cards = [], i = 0, back = false;
  let timer = null, held = false;

  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
  };

  function render() {
    const c = cards[i];
    if (!c) { text.textContent = 'No cards'; meta.textContent = ''; src.hidden = true; pos.textContent = ''; return; }
    meta.textContent = back ? 'Summary' : `Obj ${c.obj}`;
    text.textContent = back ? c.back : c.front;
    src.hidden = !back;
    if (back) { src.href = c.src.url; src.textContent = c.src.title + ' ↗'; }
    pos.textContent = `${i + 1} / ${cards.length}`;
  }

  function go(n) {
    i = Math.max(0, Math.min(cards.length - 1, n));
    back = false;
    store.set('pos:' + deck.id, i);
    render();
  }

  async function load(d) {
    deck = d;
    store.set('deck', d.id);
    cards = await (await fetch(d.file)).json();
    i = Math.min(+store.get('pos:' + d.id) || 0, cards.length - 1);
    back = false;
    [...menu.children].forEach((li) => li.classList.toggle('on', li.dataset.id === d.id));
    render();
  }

  function setBack(v) { if (back !== v) { back = v; render(); } }

  document.addEventListener('contextmenu', (e) => e.preventDefault());

  document.addEventListener('pointerdown', (e) => {
    if (e.target === menuBtn || menu.contains(e.target)) return;
    if (!menu.hidden) { menu.hidden = true; return; }
    held = false;
    timer = setTimeout(() => { held = true; setBack(true); }, HOLD_MS);
  });

  document.addEventListener('pointerup', (e) => {
    clearTimeout(timer);
    if (e.target === menuBtn || menu.contains(e.target)) return;
    if (held) {
      // release over the source link opens it; anywhere else flips back to front
      const over = document.elementFromPoint(e.clientX, e.clientY);
      if (over === src && !src.hidden) window.open(src.href, '_blank', 'noopener');
      setBack(false);
      held = false;
      return;
    }
    if (!menu.hidden || !cards.length) return;
    go(e.clientX > innerWidth / 2 ? i + 1 : i - 1);
  });

  document.addEventListener('pointercancel', () => { clearTimeout(timer); held = false; setBack(false); });

  // keyboard: arrows to move, hold space to flip
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') go(i + 1);
    else if (e.key === 'ArrowLeft') go(i - 1);
    else if (e.key === ' ' && !e.repeat) { e.preventDefault(); setBack(true); }
  });
  document.addEventListener('keyup', (e) => { if (e.key === ' ') setBack(false); });

  menuBtn.addEventListener('click', () => { menu.hidden = !menu.hidden; });

  (async () => {
    decks = await (await fetch('decks/index.json')).json();
    for (const d of decks) {
      const li = document.createElement('li');
      li.textContent = d.title;
      li.dataset.id = d.id;
      li.addEventListener('click', () => { menu.hidden = true; load(d); });
      menu.appendChild(li);
    }
    load(decks.find((d) => d.id === store.get('deck')) || decks[0]);
  })();
})();
