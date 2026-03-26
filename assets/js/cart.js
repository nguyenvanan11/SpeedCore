let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cart-content");
const totalPriceEl = document.getElementById("total-price");

// Hàm lưu giỏ hàng vào LocalStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Hàm thay đổi số lượng
function changeQty(id, delta) {
    let item = cart.find(x => x.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty < 1) item.qty = 1; // Không cho nhỏ hơn 1
        saveCart();
    }
}

// Hàm xóa 1 sản phẩm
function removeItem(id) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
        cart = cart.filter(x => x.id !== id);
        saveCart();
    }
}

// Hàm xóa toàn bộ
function clearAll() {
    if (confirm("Xóa toàn bộ giỏ hàng?")) {
        cart = [];
        saveCart();
    }
}

function renderCart() {
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div style="text-align:center; padding: 50px;">
                <p>Giỏ hàng trống. <a href="shop.html">Mua sắm ngay!</a></p>
            </div>`;
        totalPriceEl.innerHTML = "0 VND";
        return;
    }

    let html = `<button class="btn-clear-all" onclick="clearAll()">🧹 Xóa tất cả</button>`;
    let total = 0;

    cart.forEach(item => {
        let p = products.find(x => x.id === item.id);
        if (p) {
            let subtotal = p.price * item.qty;
            total += subtotal;

             html += `
            <div class="cart-item">
            <img src="${p.image}" class="item-img" onerror="this.src='https://via.placeholder.com/100?text=No+Image'">
           <div class="item-info">
           <h3 style="margin:0">${p.name}</h3>
           <div class="quantity-control">
            <button onclick="changeQty(${p.id}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${p.id}, 1)">+</button>
          </div>
           <button onclick="removeItem(${p.id})" style="color:red; border:none; background:none; cursor:pointer; margin-top:10px; font-size:13px">
            <i class="fas fa-trash"></i> Xóa sản phẩm
        </button>
    </div>
    <div class="item-price" style="font-weight:800">
        ${(p.price * item.qty * 24000).toLocaleString()}đ
    </div>
      </div>`;
        }
    });

    cartContainer.innerHTML = html;
    totalPriceEl.innerHTML = (total * 24000).toLocaleString() + " VND";
}

// Chạy lần đầu
renderCart();