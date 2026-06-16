/**
 * ══════════════════════════════════════════
 *  SPEEDCORE — Firebase Configuration
 *  Thay firebaseConfig bằng config thật của bạn
 *  từ Firebase Console → Project Settings → Your App
 * ══════════════════════════════════════════
 */

// ── Bước 1: Paste Firebase config của bạn vào đây ──
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

/**
 * ── Bước 2: Uncomment các dòng dưới sau khi cài Firebase SDK ──
 *
 * Trong index.html / mỗi page, thêm trước các script khác:
 *   <script type="module">
 *     import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
 *     import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
 *     import { getAuth }      from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
 *     const app  = initializeApp(firebaseConfig);
 *     window.db  = getFirestore(app);
 *     window.auth = getAuth(app);
 *   </script>
 *
 * ── Collections Firestore đề xuất: ──
 *   /users/{uid}         — profile, role: 'superadmin'|'admin'|'customer'
 *   /products/{id}       — toàn bộ sản phẩm
 *   /orders/{id}         — đơn hàng
 *   /coupons/{code}      — mã giảm giá
 *
 * ── Auth: dùng Email/Password provider ──
 */

// Hiện tại: dùng localStorage làm mock DB
// Khi tích hợp Firebase thật, thay các hàm trong sc.auth.* và sc.db.*
// bằng Firebase SDK calls tương ứng.
