/**
 * ══════════════════════════════════════════
 *  SPEEDCORE — Core App Module (sc.js)
 *  Tất cả logic dùng chung: auth, db, toast, cart
 *  Firebase-ready: swap localStorage calls → Firestore/Auth
 * ══════════════════════════════════════════
 */

const sc = (() => {

  /* ─────────────────────────────────────────
     DATA — Seed mặc định (thay bằng Firestore)
  ───────────────────────────────────────── */
  const SEED_PRODUCTS = [
    { id:1,  name:"Nike Air Max 270",          brand:"nike",       category:"running",   price:3500000, originalPrice:4200000, img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",  badge:"hot",  desc:"Đế Air Max lớn nhất, êm ái và thoải mái suốt cả ngày dài.",                     sizes:[38,39,40,41,42,43,44], rating:4.8, reviews:241, stock:15 },
    { id:2,  name:"Nike Air Force 1 '07",      brand:"nike",       category:"lifestyle", price:2800000, originalPrice:3200000, img:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&q=80", badge:"",     desc:"Biểu tượng văn hóa đường phố, thiết kế bền bỉ theo thời gian.",              sizes:[38,39,40,41,42,43],    rating:4.7, reviews:389, stock:22 },
    { id:3,  name:"Nike React Infinity Run",   brand:"nike",       category:"running",   price:4100000, originalPrice:4800000, img:"https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80",  badge:"new",  desc:"Thiết kế giúp giảm chấn thương khi chạy bộ dài hạn.",                          sizes:[39,40,41,42,43,44],    rating:4.9, reviews:167, stock:9  },
    { id:4,  name:"Nike Mercurial Superfly",   brand:"nike",       category:"football",  price:5200000, originalPrice:6000000, img:"https://images.unsplash.com/photo-1511886929837-354d827aae26?w=500&q=80",  badge:"sale", desc:"Tốc độ tối thượng trên sân cỏ, đinh AG linh hoạt.",                            sizes:[38,39,40,41,42,43],    rating:4.6, reviews:98,  stock:7  },
    { id:5,  name:"Adidas Ultraboost 22",      brand:"adidas",     category:"running",   price:4500000, originalPrice:5200000, img:"https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&q=80",  badge:"hot",  desc:"Công nghệ Boost mang lại năng lượng trả về vượt trội nhất.",                    sizes:[39,40,41,42,43,44,45], rating:4.9, reviews:312, stock:18 },
    { id:6,  name:"Adidas Stan Smith",         brand:"adidas",     category:"lifestyle", price:2200000, originalPrice:2600000, img:"https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80",  badge:"",     desc:"Đôi giày tennis huyền thoại, kiểu dáng tối giản bất hủ.",                      sizes:[37,38,39,40,41,42,43], rating:4.5, reviews:445, stock:30 },
    { id:7,  name:"Adidas Predator Edge",      brand:"adidas",     category:"football",  price:4800000, originalPrice:5500000, img:"https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&q=80",  badge:"new",  desc:"Kiểm soát bóng chính xác với công nghệ Demonskin.",                            sizes:[39,40,41,42,43],       rating:4.7, reviews:87,  stock:6  },
    { id:8,  name:"Adidas NMD R1",             brand:"adidas",     category:"lifestyle", price:3300000, originalPrice:3800000, img:"https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&q=80",  badge:"sale", desc:"Kết hợp công nghệ Boost với thiết kế đường phố hiện đại.",                      sizes:[39,40,41,42,43,44],    rating:4.6, reviews:203, stock:12 },
    { id:9,  name:"Puma RS-X Efekt",           brand:"puma",       category:"lifestyle", price:2600000, originalPrice:3000000, img:"https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80",  badge:"new",  desc:"Thiết kế chunky retro lấy cảm hứng từ thập niên 80-90.",                        sizes:[38,39,40,41,42,43,44], rating:4.4, reviews:156, stock:11 },
    { id:10, name:"Puma Future Z 1.3",         brand:"puma",       category:"football",  price:3900000, originalPrice:4500000, img:"https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=500&q=80",  badge:"",     desc:"Giày bóng đá co dãn linh hoạt, ôm chân hoàn hảo.",                            sizes:[39,40,41,42,43],       rating:4.5, reviews:72,  stock:8  },
    { id:11, name:"New Balance 574 Core",      brand:"newbalance", category:"lifestyle", price:2400000, originalPrice:2800000, img:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80",  badge:"",     desc:"Đế ENCAP mang lại sự hỗ trợ tuyệt vời và thoải mái mỗi ngày.",                 sizes:[38,39,40,41,42,43,44,45], rating:4.6, reviews:278, stock:20 },
    { id:12, name:"New Balance Fresh Foam 1080",brand:"newbalance",category:"running",   price:4200000, originalPrice:4900000, img:"https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&q=80",  badge:"hot",  desc:"Đệm Fresh Foam cải tiến, lý tưởng cho chạy marathon.",                          sizes:[39,40,41,42,43,44],    rating:4.8, reviews:134, stock:14 },
    { id:13, name:"Air Jordan 1 Retro High",   brand:"jordan",     category:"lifestyle", price:5800000, originalPrice:6800000, img:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&q=80",  badge:"hot",  desc:"Phiên bản tái sinh của đôi giày huyền thoại nhất lịch sử.",                     sizes:[39,40,41,42,43,44],    rating:5.0, reviews:521, stock:4  },
    { id:14, name:"Air Jordan 4 Retro",        brand:"jordan",     category:"lifestyle", price:6500000, originalPrice:7500000, img:"https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&q=80",  badge:"sale", desc:"Thiết kế mang tính biểu tượng với chi tiết lưới thoáng khí.",                  sizes:[40,41,42,43,44],       rating:4.9, reviews:298, stock:3  },
    { id:15, name:"Converse Chuck Taylor",     brand:"converse",   category:"lifestyle", price:1500000, originalPrice:1800000, img:"https://images.unsplash.com/photo-1494496195158-c3bc02b6b3ef?w=500&q=80",  badge:"",     desc:"Đôi giày canvas kinh điển, phù hợp với mọi outfit hàng ngày.",                 sizes:[36,37,38,39,40,41,42,43,44], rating:4.4, reviews:634, stock:35 },
    { id:16, name:"Converse Run Star Hike",    brand:"converse",   category:"lifestyle", price:2100000, originalPrice:2400000, img:"https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&q=80",  badge:"new",  desc:"Platform chunky hiện đại trên nền canvas cổ điển.",                            sizes:[37,38,39,40,41,42],    rating:4.5, reviews:187, stock:16 },
    { id:17, name:"Vans Old Skool",            brand:"vans",       category:"lifestyle", price:1800000, originalPrice:2100000, img:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&q=80",  badge:"",     desc:"Thiết kế Sidestripe huyền thoại, đồng hành cùng văn hóa skate.",               sizes:[37,38,39,40,41,42,43,44], rating:4.6, reviews:412, stock:25 },
    { id:18, name:"Vans Sk8-Hi",               brand:"vans",       category:"lifestyle", price:2000000, originalPrice:2300000, img:"https://images.unsplash.com/photo-1508163223045-1880bc36e222?w=500&q=80",  badge:"",     desc:"Cổ cao bảo vệ mắt cá, lý tưởng cho các ván trượt khó.",                        sizes:[38,39,40,41,42,43],    rating:4.5, reviews:289, stock:18 },
    { id:19, name:"Reebok Classic Leather",    brand:"reebok",     category:"lifestyle", price:1900000, originalPrice:2200000, img:"https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80",  badge:"sale", desc:"Chất liệu da mềm mại, phong cách retro không bao giờ lỗi mốt.",                sizes:[38,39,40,41,42,43,44], rating:4.3, reviews:198, stock:10 },
    { id:20, name:"Reebok Nano X2",            brand:"reebok",     category:"training",  price:3200000, originalPrice:3700000, img:"https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=500&q=80",  badge:"new",  desc:"Giày tập lý tưởng với đế Floatride Energy Foam.",                               sizes:[39,40,41,42,43,44],    rating:4.7, reviews:143, stock:13 },
    { id:21, name:"ASICS Gel-Nimbus 24",       brand:"asics",      category:"running",   price:3800000, originalPrice:4400000, img:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80",  badge:"hot",  desc:"Công nghệ GEL hấp thụ chấn động, lý tưởng cho runner nghiêm túc.",             sizes:[39,40,41,42,43,44,45], rating:4.8, reviews:267, stock:17 },
    { id:22, name:"ASICS Gel-Kayano 28",       brand:"asics",      category:"running",   price:4000000, originalPrice:4700000, img:"https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80",  badge:"",     desc:"Kiểm soát chuyển động tốt nhất cho bàn chân bẹt.",                              sizes:[38,39,40,41,42,43],    rating:4.7, reviews:189, stock:9  },
    { id:23, name:"UA HOVR Phantom 3",         brand:"ua",         category:"running",   price:3600000, originalPrice:4200000, img:"https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80",  badge:"new",  desc:"HOVR technology giúp bạn cảm nhận từng bước chạy với zero gravity.",            sizes:[39,40,41,42,43,44],    rating:4.6, reviews:112, stock:8  },
    { id:24, name:"UA Charged Assert 9",       brand:"ua",         category:"training",  price:1700000, originalPrice:2000000, img:"https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&q=80",  badge:"sale", desc:"Giày đa năng cho gym và tập luyện hàng ngày, giá hợp lý.",                      sizes:[38,39,40,41,42,43,44], rating:4.4, reviews:224, stock:20 },
  ];

  const SEED_USERS = [
    { id:"sa001", name:"Super Admin", email:"superadmin@speedcore.vn", password:"Admin@2026!", role:"superadmin", createdAt: new Date().toISOString() },
    { id:"ad001", name:"Admin Manager",        email:"admin@speedcore.vn",      password:"admin123",   role:"admin",      createdAt: new Date().toISOString() },
    { id:"st001", name:"Nguyễn Nhân Viên",     email:"staff@speedcore.vn",      password:"staff123",   role:"staff",      createdAt: new Date().toISOString() },
    { id:"cu001", name:"Trần Khách Hàng",      email:"user@gmail.com",          password:"user123",    role:"customer",   createdAt: new Date().toISOString() },
  ];

  const COUPONS = {
    "SPEEDCORE50": { pct: 50, label: "Giảm 50%" },
    "SALE30":      { pct: 30, label: "Giảm 30%" },
    "NEWUSER20":   { pct: 20, label: "Chào tân khách" },
    "FLASH10":     { pct: 10, label: "Flash deal" },
  };

  /* ─────────────────────────────────────────
     DB — localStorage mock (swap → Firestore)
  ───────────────────────────────────────── */
  const db = {
    get: (key, fallback = null) => {
      try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
      catch { return fallback; }
    },
    set: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
    remove: (key) => localStorage.removeItem(key),

    // Products
    getProducts: ()  => db.get('sc_products', []),
    setProducts: (p) => db.set('sc_products', p),

    // Users
    getUsers: ()  => db.get('sc_users', []),
    setUsers: (u) => db.set('sc_users', u),

    // Orders
    getOrders: ()    => db.get('sc_orders', []),
    addOrder: (ord)  => {
      const list = db.getOrders();
      list.unshift(ord);
      db.set('sc_orders', list);
    },

    // Cart
    getCart: ()    => db.get('sc_cart', []),
    setCart: (c)   => db.set('sc_cart', c),
    clearCart: ()  => db.remove('sc_cart'),
  };

  /* ─────────────────────────────────────────
     SEED — chạy 1 lần khi chưa có data
  ───────────────────────────────────────── */
  (function seed() {
    if (!db.get('sc_seeded')) {
      db.setProducts(SEED_PRODUCTS);
      db.setUsers(SEED_USERS);
      db.set('sc_seeded', true);
    }
  })();

  /* ─────────────────────────────────────────
     AUTH
  ───────────────────────────────────────── */
  const auth = {
    current: () => db.get('sc_current_user'),

    login: (email, password) => {
      const users = db.getUsers();
      const user = users.find(u =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!user) throw new Error('Email hoặc mật khẩu không đúng!');
      // Không lưu password vào session
      const { password: _, ...safe } = user;
      db.set('sc_current_user', safe);
      return safe;
    },

    logout: () => {
      db.remove('sc_current_user');
      window.location.href = 'index.html';
    },

    register: (name, email, password) => {
      const users = db.getUsers();
      if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
        throw new Error('Email này đã tồn tại!');
      const newUser = {
        id: 'cu' + Date.now(),
        name, email, password,
        role: 'customer',
        createdAt: new Date().toISOString()
      };
      users.push(newUser);
      db.setUsers(users);
      return newUser;
    },

    requireAuth: (redirect = 'login.html') => {
      if (!auth.current()) {
        window.location.href = redirect;
        return null;
      }
      return auth.current();
    },

    requireRole: (roles, redirect = 'index.html') => {
      const user = auth.current();
      if (!user || !roles.includes(user.role)) {
        window.location.href = redirect;
        return null;
      }
      return user;
    },

    isAdmin: () => {
      const u = auth.current();
      return u && (u.role === 'superadmin' || u.role === 'admin' || u.role === 'staff');
    },

    isSuperAdmin: () => {
      const u = auth.current();
      return u && u.role === 'superadmin';
    },
  };

  /* ─────────────────────────────────────────
     CART
  ───────────────────────────────────────── */
  const cart = {
    get: () => db.getCart(),

    add: (productId, size) => {
      const products = db.getProducts();
      const p = products.find(x => x.id === productId);
      if (!p) return;
      const items = db.getCart();
      const key = `${productId}-${size}`;
      const existing = items.find(i => i.key === key);
      if (existing) {
        existing.qty = Math.min(existing.qty + 1, p.stock || 99);
      } else {
        items.push({ key, id: productId, name: p.name, brand: p.brand,
                     price: p.price, img: p.img, size, qty: 1 });
      }
      db.setCart(items);
      cart.renderBadge();
      ui.toast(`✓ Đã thêm <b>${p.name}</b> (size ${size})`);
    },

    remove: (key) => {
      db.setCart(db.getCart().filter(i => i.key !== key));
      cart.renderBadge();
    },

    updateQty: (key, delta) => {
      const items = db.getCart();
      const item = items.find(i => i.key === key);
      if (!item) return;
      item.qty = Math.max(1, item.qty + delta);
      db.setCart(items);
      cart.renderBadge();
    },

    clear: () => { db.clearCart(); cart.renderBadge(); },

    total: () => db.getCart().reduce((s, i) => s + i.price * i.qty, 0),

    count: () => db.getCart().reduce((s, i) => s + i.qty, 0),

    renderBadge: () => {
      const n = cart.count();
      document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = n;
        el.style.display = n > 0 ? 'inline-flex' : 'none';
      });
    },
  };

  /* ─────────────────────────────────────────
     COUPONS
  ───────────────────────────────────────── */
  const coupon = {
    apply: (code) => {
      const c = COUPONS[code?.trim().toUpperCase()];
      if (!c) throw new Error('Mã giảm giá không hợp lệ!');
      return c;
    }
  };

  /* ─────────────────────────────────────────
     UI HELPERS
  ───────────────────────────────────────── */
  const ui = {
    fmt: (n) => n.toLocaleString('vi-VN') + ' ₫',

    stars: (n) => {
      n = Math.round(n * 2) / 2;
      let s = '';
      for (let i = 1; i <= 5; i++) {
        s += i <= n ? '★' : (i - 0.5 === n ? '⯨' : '☆');
      }
      return s;
    },

    toast: (msg, type = 'success', duration = 3000) => {
      let el = document.getElementById('sc-toast');
      if (!el) {
        el = document.createElement('div');
        el.id = 'sc-toast';
        el.style.cssText = `
          position:fixed; bottom:28px; left:50%; transform:translateX(-50%) translateY(16px);
          background:#111; color:#fff; padding:13px 22px; border-radius:10px;
          font-size:.88rem; font-weight:600; z-index:99999; max-width:360px;
          opacity:0; transition:all .28s cubic-bezier(.34,1.2,.64,1);
          border-left:3px solid #e63946; box-shadow:0 8px 32px rgba(0,0,0,.4);
          pointer-events:none;
        `;
        document.body.appendChild(el);
      }
      const colors = { success:'#22c55e', error:'#e63946', warn:'#f59e0b', info:'#3b82f6' };
      el.style.borderLeftColor = colors[type] || colors.success;
      el.innerHTML = msg;
      el.style.opacity = '1';
      el.style.transform = 'translateX(-50%) translateY(0)';
      clearTimeout(el._t);
      el._t = setTimeout(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-50%) translateY(16px)';
      }, duration);
    },

    // Size selection modal
    openSizeModal: (productId, onPick) => {
      const products = db.getProducts();
      const p = products.find(x => x.id === productId);
      if (!p) return;

      let modal = document.getElementById('sc-size-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'sc-size-modal';
        modal.className = 'size-modal';
        modal.innerHTML = `
          <div class="size-modal__box">
            <div class="size-modal__head">
              <span id="sm-title"></span>
              <button onclick="sc.ui.closeSizeModal()">✕</button>
            </div>
            <p class="size-modal__sub">Chọn size phù hợp để thêm vào giỏ hàng</p>
            <div class="size-modal__img-wrap">
              <img id="sm-img" src="" alt="">
            </div>
            <div id="sm-sizes" class="size-grid"></div>
          </div>`;
        modal.addEventListener('click', e => { if (e.target === modal) sc.ui.closeSizeModal(); });
        document.body.appendChild(modal);
      }

      document.getElementById('sm-title').textContent = p.name;
      const img = document.getElementById('sm-img');
      img.src = p.img; img.alt = p.name;
      document.getElementById('sm-sizes').innerHTML = p.sizes.map(s =>
        `<button class="size-btn" onclick="sc.ui._pickSize(${productId},${s})">${s}</button>`
      ).join('');
      modal._onPick = onPick || ((id, size) => sc.cart.add(id, size));
      requestAnimationFrame(() => modal.classList.add('open'));
    },

    _pickSize: (productId, size) => {
      const modal = document.getElementById('sc-size-modal');
      if (modal?._onPick) modal._onPick(productId, size);
      sc.ui.closeSizeModal();
    },

    closeSizeModal: () => {
      document.getElementById('sc-size-modal')?.classList.remove('open');
    },

    // Auth zone in header
    renderAuthZone: () => {
      const zone = document.getElementById('auth-zone');
      if (!zone) return;
      const user = auth.current();
      if (user) {
        const adminLink = auth.isAdmin()
          ? `<a href="admin.html" class="auth-admin-link">⚙ Quản trị</a>`
          : '';
        zone.innerHTML = `
          ${adminLink}
          <div class="auth-user-menu">
            <button class="auth-user-btn" onclick="this.closest('.auth-user-menu').classList.toggle('open')">
              <span class="auth-avatar">${user.name[0].toUpperCase()}</span>
              <span>${user.name.split(' ').pop()}</span>
              <span style="font-size:.7em;opacity:.6">▾</span>
            </button>
            <div class="auth-dropdown">
              <div class="auth-dropdown__name">${user.name}</div>
              <div class="auth-dropdown__role">${roleLabel(user.role)}</div>
              <hr>
              ${auth.isAdmin() ? `<a href="admin.html">⚙ Trang quản trị</a>` : ''}
              <a href="#" onclick="sc.auth.logout(); return false;">↩ Đăng xuất</a>
            </div>
          </div>`;
      } else {
        zone.innerHTML = `<a href="login.html" class="auth-login-link">Đăng nhập</a>`;
      }
    },
  };

  function roleLabel(role) {
    return { superadmin:'Super Admin', admin:'Quản trị viên', staff:'Nhân viên', customer:'Khách hàng' }[role] || role;
  }

  /* ─────────────────────────────────────────
     PRODUCTS
  ───────────────────────────────────────── */
  const products = {
    getAll: () => db.getProducts(),
    getById: (id) => db.getProducts().find(p => p.id === id),
    save: (p) => {
      const list = db.getProducts();
      const idx = list.findIndex(x => x.id === p.id);
      if (idx >= 0) list[idx] = p; else list.push(p);
      db.setProducts(list);
    },
    delete: (id) => db.setProducts(db.getProducts().filter(p => p.id !== id)),
  };

  /* ─────────────────────────────────────────
     ORDERS
  ───────────────────────────────────────── */
  const orders = {
    create: (data) => {
      const ord = {
        id: 'SC' + Date.now(),
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      db.addOrder(ord);
      return ord;
    },
    getAll: () => db.getOrders(),
    updateStatus: (id, status) => {
      const list = db.getOrders();
      const o = list.find(x => x.id === id);
      if (o) { o.status = status; db.set('sc_orders', list); }
    },
    STATUS_LABELS: {
      pending:    '⏳ Chờ xác nhận',
      confirmed:  '✅ Đã xác nhận',
      shipping:   '🚚 Đang giao',
      delivered:  '📦 Đã giao',
      cancelled:  '❌ Đã huỷ',
    },
  };

  /* ─────────────────────────────────────────
     COUNTDOWN
  ───────────────────────────────────────── */
  const countdown = {
    start: (targetMs) => {
      const update = () => {
        const diff = targetMs - Date.now();
        if (diff <= 0) return;
        const pad = n => String(n).padStart(2,'0');
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        const set = (id, v) => { const el = document.getElementById(id); if(el) el.textContent = pad(v); };
        set('cd-h', h); set('cd-m', m); set('cd-s', s);
      };
      update();
      setInterval(update, 1000);
    },
  };

  // Init on every page
  document.addEventListener('DOMContentLoaded', () => {
    cart.renderBadge();
    ui.renderAuthZone();
    // Close auth dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.auth-user-menu')) {
        document.querySelectorAll('.auth-user-menu.open').forEach(m => m.classList.remove('open'));
      }
    });
  });

  return { db, auth, cart, coupon, ui, products, orders, countdown, COUPONS };
})();

// Expose cho inline onclick handlers
const openSizeModal = (id) => sc.ui.openSizeModal(id);
const closeSizeModal = () => sc.ui.closeSizeModal();
const showToast = (msg, type) => sc.ui.toast(msg, type);
const fmt = (n) => sc.ui.fmt(n);
