/* ── Stars ── */
function stars(n) {
  n = Math.round(n);
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

/* ── Product Card ── */
function productCard(p) {
  const disc = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  const badgeMap = { hot:'🔥 HOT', new:'✨ NEW', sale:`-${disc}%`, combo:'🎁 COMBO' };
  return `
    <div class="product-card" data-id="${p.id}">
      <a href="product.html?id=${p.id}" class="product-card__img-wrap">
        ${p.badge ? `<span class="product-card__badge badge--${p.badge}">${badgeMap[p.badge]||p.badge}</span>` : ''}
        <img src="${p.img}" alt="${p.name}" loading="lazy"
             onerror="this.src='https://via.placeholder.com/400x300?text=SpeedCore'">
        <div class="product-card__overlay">
          <button class="btn-quick-add" onclick="event.preventDefault(); openSizeModal(${p.id})">
            CHỌN SIZE &amp; THÊM GIỎ
          </button>
        </div>
      </a>
      <div class="product-card__body">
        <div class="product-card__brand">${p.brand.toUpperCase()}</div>
        <div class="product-card__name">${p.name}</div>
        <div class="product-card__rating">
          <span class="stars">${stars(p.rating)}</span>
          <span class="rev-count">(${p.reviews})</span>
        </div>
        <div class="product-card__pricing">
          <span class="price-current">${fmt(p.price)}</span>
          ${p.originalPrice ? `<span class="price-original">${fmt(p.originalPrice)}</span>` : ''}
          ${disc > 0 ? `<span class="price-disc">-${disc}%</span>` : ''}
        </div>
        <button class="btn-add" onclick="openSizeModal(${p.id})">
          <i>+</i> THÊM VÀO GIỎ
        </button>
      </div>
    </div>
  `;
}

/* ── Render list ── */
function renderProducts(filteredList) {
  const list = filteredList || PRODUCTS;
  const el = document.getElementById('list');
  if (!el) return;
  if (list.length === 0) {
    el.innerHTML = `<div class="no-results">😕 Không tìm thấy sản phẩm phù hợp.</div>`;
    return;
  }
  el.innerHTML = `<div class="products-grid">${list.map(productCard).join('')}</div>`;
  const cnt = document.getElementById('count');
  if (cnt) cnt.textContent = `Hiển thị ${list.length} sản phẩm`;
}

/* ── Filter ── */
function applyFilters() {
  const q       = (document.getElementById('search')?.value || '').toLowerCase();
  const brand   = document.getElementById('filter-brand')?.value || '';
  const cat     = document.getElementById('filter')?.value || '';
  const priceMax= Number(document.getElementById('price')?.value) || Infinity;
  const sort    = document.getElementById('sort')?.value || '';

  let list = PRODUCTS.filter(p => {
    const matchQ     = !q || p.name.toLowerCase().includes(q) || p.brand.includes(q);
    const matchBrand = !brand || p.brand === brand;
    const matchCat   = !cat || p.category === cat;
    const matchPrice = p.price <= (priceMax === Infinity ? Infinity : priceMax * 1000);
    return matchQ && matchBrand && matchCat && matchPrice;
  });

  if (sort === 'priceAsc')  list.sort((a,b) => a.price - b.price);
  if (sort === 'priceDesc') list.sort((a,b) => b.price - a.price);
  if (sort === 'rating')    list.sort((a,b) => b.rating - a.rating);
  if (sort === 'new')       list.sort((a,b) => (b.badge==='new') - (a.badge==='new'));

  renderProducts(list);
}

/* ── Index page featured products ── */
function renderFeatured(ids) {
  const el = document.getElementById('list');
  if (!el) return;
  const list = ids ? PRODUCTS.filter(p => ids.includes(p.id)) : PRODUCTS.slice(0, 8);
  el.innerHTML = `<div class="products-grid">${list.map(productCard).join('')}</div>`;
}

/* ── Countdown ── */
function startCountdown(targetDate) {
  function update() {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const pad = n => String(n).padStart(2,'0');
    const set = (id, v) => { const el = document.getElementById(id); if(el) el.textContent = pad(v); };
    set('cd-h', h); set('cd-m', m); set('cd-s', s);
  }
  update();
  setInterval(update, 1000);
}

/* ── Size modal template (inject once) ── */
function injectModal() {
  if (document.getElementById('size-modal')) return;
  const modal = document.createElement('div');
  modal.id = 'size-modal';
  modal.className = 'size-modal';
  modal.innerHTML = `
    <div class="size-modal__box">
      <div class="size-modal__head">
        <span id="modal-title">Chọn size</span>
        <button onclick="closeSizeModal()">✕</button>
      </div>
      <p style="color:#888; font-size:.82rem; margin-bottom:14px;">Chọn size phù hợp để thêm vào giỏ hàng</p>
      <div id="modal-sizes" class="size-grid"></div>
    </div>
  `;
  modal.addEventListener('click', e => { if (e.target === modal) closeSizeModal(); });
  document.body.appendChild(modal);
}

document.addEventListener('DOMContentLoaded', () => {
  injectModal();

  // Shop page
  if (document.getElementById('filter') || document.getElementById('search')) {
    applyFilters();
    ['search','filter','filter-brand','price','sort'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', applyFilters);
      document.getElementById(id)?.addEventListener('keyup', applyFilters);
    });
  }

  // Index featured
  if (document.getElementById('list') && !document.getElementById('filter')) {
    renderFeatured([1, 5, 13, 3, 8, 12, 9, 15]);
  }

  // Flash sale countdown (8h from now)
  const target = new Date(Date.now() + 8 * 3600000);
  startCountdown(target);
});
