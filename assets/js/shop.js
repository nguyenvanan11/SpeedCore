/**
 * ══════════════════════════════════════════
 *  SPEEDCORE — Shop / Product Rendering
 * ══════════════════════════════════════════
 */

/* ── Product Card HTML ── */
function productCard(p) {
  const disc = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  const badgeMap = { hot:'🔥 HOT', new:'✨ NEW', sale:`-${disc}%` };
  return `
    <div class="product-card" data-id="${p.id}">
      <a href="product.html?id=${p.id}" class="product-card__img-wrap">
        ${p.badge ? `<span class="product-card__badge badge--${p.badge}">${badgeMap[p.badge]||p.badge}</span>` : ''}
        ${p.stock <= 5 && p.stock > 0 ? `<span class="product-card__badge badge--stock" style="top:auto;bottom:12px;left:12px;">Còn ${p.stock}</span>` : ''}
        ${p.stock === 0 ? `<span class="product-card__badge badge--oos">HẾT HÀNG</span>` : ''}
        <img src="${p.img}" alt="${p.name}" loading="lazy"
             onerror="this.src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=60'">
        <div class="product-card__overlay">
          ${p.stock > 0
            ? `<button class="btn-quick-add" onclick="event.preventDefault(); sc.ui.openSizeModal(${p.id})">CHỌN SIZE &amp; THÊM GIỎ</button>`
            : `<span class="btn-quick-add" style="background:#555;cursor:default;">HẾT HÀNG</span>`}
        </div>
        <button class="product-card__wishlist" onclick="event.preventDefault(); toggleWishlist(${p.id}, this)" title="Yêu thích">♡</button>
      </a>
      <div class="product-card__body">
        <div class="product-card__brand">${p.brand.toUpperCase()}</div>
        <a href="product.html?id=${p.id}" class="product-card__name-link">
          <div class="product-card__name">${p.name}</div>
        </a>
        <div class="product-card__rating">
          <span class="stars">${sc.ui.stars(p.rating)}</span>
          <span class="rev-count">(${p.reviews})</span>
        </div>
        <div class="product-card__pricing">
          <span class="price-current">${sc.ui.fmt(p.price)}</span>
          ${p.originalPrice ? `<span class="price-original">${sc.ui.fmt(p.originalPrice)}</span>` : ''}
          ${disc > 0 ? `<span class="price-disc">-${disc}%</span>` : ''}
        </div>
        <button class="btn-add ${p.stock === 0 ? 'btn-add--oos' : ''}"
                onclick="${p.stock > 0 ? `sc.ui.openSizeModal(${p.id})` : 'sc.ui.toast(\"Sản phẩm tạm hết hàng!\",\"warn\")'}"
                ${p.stock === 0 ? 'disabled' : ''}>
          ${p.stock > 0 ? '<i>+</i> THÊM VÀO GIỎ' : 'HẾT HÀNG'}
        </button>
      </div>
    </div>`;
}

/* ── Wishlist toggle ── */
function toggleWishlist(id, btn) {
  const wl = JSON.parse(localStorage.getItem('sc_wishlist') || '[]');
  const idx = wl.indexOf(id);
  if (idx >= 0) {
    wl.splice(idx, 1);
    btn.textContent = '♡';
    btn.classList.remove('wishlisted');
    sc.ui.toast('Đã xoá khỏi yêu thích', 'info');
  } else {
    wl.push(id);
    btn.textContent = '♥';
    btn.classList.add('wishlisted');
    sc.ui.toast('Đã thêm vào yêu thích ♥', 'success');
  }
  localStorage.setItem('sc_wishlist', JSON.stringify(wl));
}

/* ── Render grid ── */
function renderProducts(list, containerId = 'list') {
  const el = document.getElementById(containerId);
  if (!el) return;
  const cnt = document.getElementById('count');

  if (!list || list.length === 0) {
    el.innerHTML = `<div class="no-results">
      <div style="font-size:3rem;margin-bottom:12px;opacity:.3">👟</div>
      <div>Không tìm thấy sản phẩm phù hợp</div>
      <a href="shop.html" style="color:var(--accent);margin-top:12px;display:inline-block;font-weight:700;">← Xem tất cả</a>
    </div>`;
    if (cnt) cnt.textContent = '';
    return;
  }
  // Apply wishlist state
  const wl = JSON.parse(localStorage.getItem('sc_wishlist') || '[]');
  el.innerHTML = `<div class="products-grid">${list.map(productCard).join('')}</div>`;
  // Mark wishlisted
  list.forEach(p => {
    if (wl.includes(p.id)) {
      const btn = el.querySelector(`.product-card[data-id="${p.id}"] .product-card__wishlist`);
      if (btn) { btn.textContent = '♥'; btn.classList.add('wishlisted'); }
    }
  });
  if (cnt) cnt.textContent = `Hiển thị ${list.length} sản phẩm`;
}

/* ── Filter logic (shop page) ── */
function applyFilters() {
  const q        = (document.getElementById('search')?.value || '').toLowerCase();
  const brand    = document.getElementById('filter-brand')?.value || '';
  const cat      = document.getElementById('filter')?.value || '';
  const priceMax = Number(document.getElementById('price')?.value) || Infinity;
  const sort     = document.getElementById('sort')?.value || '';

  let list = sc.products.getAll().filter(p => {
    const matchQ     = !q || p.name.toLowerCase().includes(q) || p.brand.includes(q) || p.desc?.toLowerCase().includes(q);
    const matchBrand = !brand || p.brand === brand;
    const matchCat   = !cat   || p.category === cat;
    const matchPrice = p.price <= (priceMax === Infinity ? Infinity : priceMax * 1000);
    return matchQ && matchBrand && matchCat && matchPrice;
  });

  if (sort === 'priceAsc')  list.sort((a,b) => a.price - b.price);
  if (sort === 'priceDesc') list.sort((a,b) => b.price - a.price);
  if (sort === 'rating')    list.sort((a,b) => b.rating - a.rating);
  if (sort === 'new')       list.sort((a,b) => (b.badge==='new') - (a.badge==='new'));
  if (sort === 'reviews')   list.sort((a,b) => b.reviews - a.reviews);

  renderProducts(list);
}

/* ── Featured (index page) ── */
function renderFeatured(ids) {
  const all = sc.products.getAll();
  const list = ids ? all.filter(p => ids.includes(p.id)) : all.slice(0, 8);
  renderProducts(list);
}

/* ── URL param sync (shop page) ── */
function syncFromURL() {
  const p = new URLSearchParams(location.search);
  if (p.get('cat'))   { const el = document.getElementById('filter');       if(el) el.value = p.get('cat'); }
  if (p.get('brand')) { const el = document.getElementById('filter-brand'); if(el) el.value = p.get('brand'); }
  if (p.get('q'))     { const el = document.getElementById('search');       if(el) el.value = p.get('q'); }
  if (p.get('badge')) {
    // filter by badge via custom
    const el = document.getElementById('filter-badge');
    if(el) el.value = p.get('badge');
  }
  applyFilters();
}

document.addEventListener('DOMContentLoaded', () => {
  // Shop page
  if (document.getElementById('filter') || document.getElementById('search')) {
    syncFromURL();
    ['search','filter','filter-brand','price','sort'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.addEventListener('change', applyFilters); el.addEventListener('keyup', applyFilters); }
    });
  }
  // Index featured
  if (document.getElementById('list') && !document.getElementById('filter')) {
    renderFeatured([1, 5, 13, 3, 8, 12, 9, 15]);
  }
  // Flash sale countdown — 8h from now
  sc.countdown.start(Date.now() + 8 * 3600000);
});
