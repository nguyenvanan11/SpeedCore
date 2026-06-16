/* ── Cart Storage ── */
function getCart() {
  return JSON.parse(localStorage.getItem('sc_cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('sc_cart', JSON.stringify(cart));
  renderBadge();
}
function addToCart(productId, size) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  const cart = getCart();
  const key = `${productId}-${size}`;
  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ key, id: productId, name: p.name, brand: p.brand, price: p.price, img: p.img, size, qty: 1 });
  }
  saveCart(cart);
  showToast(`✓ Đã thêm ${p.name} (size ${size}) vào giỏ`);
}
function removeFromCart(key) {
  const cart = getCart().filter(i => i.key !== key);
  saveCart(cart);
}
function updateQty(key, delta) {
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);
}
function clearCart() {
  localStorage.removeItem('sc_cart');
  renderBadge();
}

/* ── Badge ── */
function renderBadge() {
  const count = getCart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cart-count, .cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

/* ── Format ── */
function fmt(n) {
  return n.toLocaleString('vi-VN') + ' ₫';
}

/* ── Toast ── */
function showToast(msg, type = 'success') {
  let el = document.getElementById('sc-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'sc-toast';
    el.style.cssText = `
      position:fixed; bottom:30px; left:50%; transform:translateX(-50%) translateY(20px);
      background:#111; color:#fff; padding:12px 22px; border-radius:8px;
      font-size:.88rem; font-weight:600; z-index:99999;
      opacity:0; transition:all .3s; white-space:nowrap;
      border-left:3px solid #e63946;
    `;
    document.body.appendChild(el);
  }
  if (type === 'success') el.style.borderLeftColor = '#22c55e';
  else if (type === 'error') el.style.borderLeftColor = '#e63946';
  else el.style.borderLeftColor = '#f59e0b';
  el.textContent = msg;
  el.style.opacity = '1'; el.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(el._t);
  el._t = setTimeout(() => {
    el.style.opacity = '0'; el.style.transform = 'translateX(-50%) translateY(20px)';
  }, 2800);
}

/* ── Render Cart Page ── */
function renderCartPage() {
  const cart = getCart();
  const container = document.getElementById('cart-content');
  const emptyEl = document.getElementById('cart-empty');
  const cartTableEl = document.getElementById('cart-table');
  if (!container) return;

  if (cart.length === 0) {
    if (emptyEl) emptyEl.style.display = 'flex';
    if (cartTableEl) cartTableEl.style.display = 'none';
    updateSummary(0, 0);
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';
  if (cartTableEl) cartTableEl.style.display = 'block';

  container.innerHTML = cart.map(item => `
    <div class="cart-item" id="ci-${item.key}">
      <img src="${item.img}" alt="${item.name}" class="cart-item__img">
      <div class="cart-item__info">
        <div class="cart-item__brand">${item.brand.toUpperCase()}</div>
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__size">Size: ${item.size}</div>
      </div>
      <div class="cart-item__price">${fmt(item.price)}</div>
      <div class="cart-item__qty">
        <button onclick="changeQty('${item.key}',-1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty('${item.key}',1)">+</button>
      </div>
      <div class="cart-item__sub">${fmt(item.price * item.qty)}</div>
      <button class="cart-item__del" onclick="deleteItem('${item.key}')">✕</button>
    </div>
  `).join('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  updateSummary(subtotal, window._discount || 0);
}

function changeQty(key, delta) {
  updateQty(key, delta);
  renderCartPage();
}
function deleteItem(key) {
  removeFromCart(key);
  renderCartPage();
  showToast('Đã xoá sản phẩm khỏi giỏ', 'error');
}
function handleClearCart() {
  if (!confirm('Xoá toàn bộ giỏ hàng?')) return;
  clearCart();
  renderCartPage();
}

/* ── Coupon ── */
window._discount = 0;
function applyCoupon() {
  const code = document.getElementById('coupon-code')?.value.trim().toUpperCase();
  const msg  = document.getElementById('coupon-msg');
  const pct  = COUPONS?.[code];
  if (!pct) {
    if (msg) { msg.textContent = '❌ Mã không hợp lệ!'; msg.style.color = '#e63946'; }
    window._discount = 0;
  } else {
    if (msg) { msg.textContent = `✅ Áp dụng giảm ${pct}% thành công!`; msg.style.color = '#22c55e'; }
    const cart = getCart();
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    window._discount = Math.round(subtotal * pct / 100);
    showToast(`🎉 Giảm ${pct}% — bạn tiết kiệm ${fmt(window._discount)}`);
  }
  const cart = getCart();
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  updateSummary(subtotal, window._discount);
}

function updateSummary(subtotal, discount) {
  const total = Math.max(0, subtotal - discount);
  const ship  = subtotal >= 1000000 ? 0 : 30000;
  const el = id => document.getElementById(id);
  if (el('subtotal'))       el('subtotal').textContent       = fmt(subtotal);
  if (el('discount-amount'))el('discount-amount').textContent = `-${fmt(discount)}`;
  if (el('shipping-fee'))   el('shipping-fee').textContent   = ship === 0 ? 'Miễn phí 🎉' : fmt(ship);
  if (el('final-total'))    el('final-total').textContent    = fmt(total + ship);
}

/* ── Checkout ── */
function processCheckout() {
  const name = document.getElementById('customer-name')?.value.trim();
  if (!name) { showToast('Vui lòng nhập tên người nhận!', 'error'); return; }
  const cart = getCart();
  if (cart.length === 0) { showToast('Giỏ hàng đang trống!', 'error'); return; }

  // Save order summary for checkout page
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  localStorage.setItem('sc_order_draft', JSON.stringify({
    name, cart, subtotal, discount: window._discount || 0
  }));
  window.location.href = 'checkout.html';
}

/* ── Size Modal ── */
function openSizeModal(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  const modal = document.getElementById('size-modal');
  const title = document.getElementById('modal-title');
  const sizes = document.getElementById('modal-sizes');
  if (!modal) return;
  title.textContent = p.name;
  sizes.innerHTML = p.sizes.map(s => `
    <button class="size-btn" onclick="confirmAddToCart(${productId}, ${s})">${s}</button>
  `).join('');
  modal.classList.add('open');
}
function closeSizeModal() {
  document.getElementById('size-modal')?.classList.remove('open');
}
function confirmAddToCart(productId, size) {
  addToCart(productId, size);
  closeSizeModal();
}

document.addEventListener('DOMContentLoaded', () => {
  renderBadge();
  renderCartPage();
});
