# ⚡ SpeedCore v2 — Website Bán Giày Thể Thao

> HTML/CSS/JS thuần · Firebase-ready · Deploy Vercel 1 click

---

## 📁 Cấu trúc thư mục

```
SpeedCore-v2/
├── index.html          # Trang chủ
├── shop.html           # Danh sách sản phẩm
├── product.html        # Chi tiết sản phẩm
├── cart.html           # Giỏ hàng
├── checkout.html       # Thanh toán
├── login.html          # Đăng nhập / Đăng ký
├── contact.html        # Liên hệ
├── admin.html          # Quản trị (admin/staff/superadmin)
├── vercel.json         # Cấu hình Vercel
└── assets/
    ├── css/style.css   # Toàn bộ CSS
    └── js/
        ├── sc.js       # Core module (auth, cart, db, ui)
        ├── shop.js     # Logic trang shop
        └── firebase.js # Firebase config (chưa kích hoạt)
```

---

## 🚀 Deploy lên Vercel

### Cách 1 — Vercel CLI
```bash
npm i -g vercel
cd SpeedCore-v2
vercel
```

### Cách 2 — Vercel Dashboard
1. Push project lên GitHub
2. Vào [vercel.com](https://vercel.com) → **New Project** → Import repo
3. Framework: **Other** (không cần build command)
4. Deploy ✅

---

## 🔥 Kết nối Firebase

### Bước 1 — Tạo project Firebase
1. [console.firebase.google.com](https://console.firebase.google.com)
2. **Add project** → Đặt tên → Enable Google Analytics (tuỳ)
3. **Authentication** → Sign-in method → Enable **Email/Password**
4. **Firestore Database** → Create database → Start in **production mode**

### Bước 2 — Lấy config
1. Project Settings → General → Your apps → **Web app** (</>)
2. Copy `firebaseConfig`

### Bước 3 — Cập nhật `assets/js/firebase.js`
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Bước 4 — Swap localStorage → Firestore trong `sc.js`

Tìm comment `// TODO: Firebase swap` trong `sc.js` và thay:
```javascript
// Hiện tại (localStorage mock):
db.getAll('products')

// Sau khi có Firebase:
const snap = await getDocs(collection(db, 'products'));
snap.docs.map(d => ({ id: d.id, ...d.data() }))
```

---

## 👤 Tài khoản demo

| Email | Mật khẩu | Role |
|-------|----------|------|
| `superadmin@speedcore.vn` | `Admin@2026!` | Super Admin |
| `admin@speedcore.vn` | `admin123` | Admin |
| `staff@speedcore.vn` | `staff123` | Staff |
| `user@gmail.com` | `user123` | Customer |

---

## 🗂️ Firestore Collections (schema gợi ý)

```
/users/{uid}
  name, email, role, phone, address, createdAt

/products/{id}
  name, brand, category, price, originalPrice, img,
  badge, desc, sizes[], rating, reviews, stock

/orders/{id}
  userId, items[], total, discount, status,
  shippingInfo{}, paymentMethod, createdAt

/contacts/{id}
  name, email, phone, topic, message, createdAt

/coupons/{code}
  pct, label, active, maxUses, usedCount
```

---

## 🔐 Phân quyền

| Quyền | customer | staff | admin | superadmin |
|-------|----------|-------|-------|------------|
| Xem shop | ✅ | ✅ | ✅ | ✅ |
| Đặt hàng | ✅ | ✅ | ✅ | ✅ |
| Dashboard | ❌ | ✅ | ✅ | ✅ |
| Quản lý SP | ❌ | ✅ | ✅ | ✅ |
| Quản lý đơn | ❌ | ✅ | ✅ | ✅ |
| Quản lý users | ❌ | ❌ | ✅ | ✅ |
| Cài đặt hệ thống | ❌ | ❌ | ❌ | ✅ |
| Đổi role user | ❌ | ❌ | ❌ | ✅ |

---

## ⚙️ Coupon codes (demo)

| Code | Giảm |
|------|------|
| `SPEEDCORE50` | 50% |
| `SALE30` | 30% |

---

© 2026 SpeedCore — Built with ❤️
