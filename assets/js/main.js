// 1. Hàm hiển thị sản phẩm ra HTML
function renderProducts() {
    const listElement = document.getElementById('list');
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filterTerm = document.getElementById('filter').value;
    const priceLimit = document.getElementById('price').value;
    const currency = document.getElementById('currency').value;

    // Xóa nội dung cũ trước khi vẽ mới
    listElement.innerHTML = '';

    // 2. Lọc sản phẩm dựa trên các Input
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = filterTerm === "" || product.category === filterTerm;
        const matchesPrice = priceLimit === "" || product.price <= parseInt(priceLimit);
        
        return matchesSearch && matchesCategory && matchesPrice;
    });

    // 3. Cập nhật số lượng kết quả tìm thấy
    const countElement = document.getElementById('results-count');
    if(countElement) {
        countElement.innerText = `Đang hiển thị ${filteredProducts.length} sản phẩm`;
    }

    // 4. Tạo HTML cho từng sản phẩm
    filteredProducts.forEach(product => {
        // Xử lý chuyển đổi tiền tệ (Giả sử 1 USD = 25.000 VND)
        let displayPrice = product.price;
        let symbol = "$";
        
        if (currency === 'vnd') {
            displayPrice = (product.price * 25000).toLocaleString('vi-VN');
            symbol = "đ";
        }

        const productCard = `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${displayPrice}${symbol}</p>
                    <button onclick="addToCart(${product.id})">Thêm vào giỏ</button>
                </div>
            </div>
        `;
        listElement.innerHTML += productCard;
    });
}

// 5. Hàm thêm vào giỏ hàng (Cơ bản)
function addToCart(productId) {
    // Lấy giỏ hàng từ localStorage hoặc tạo mới nếu chưa có
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Tìm sản phẩm trong data
    const product = products.find(p => p.id === productId);
    
    // Kiểm tra xem sản phẩm đã có trong giỏ chưa
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    // Lưu lại vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
    updateCartBadge();
}

// 6. Cập nhật số lượng trên icon giỏ hàng
function updateCartBadge() {
    const badge = document.getElementById('cart-count-badge');
    if (badge) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.innerText = totalItems;
    }
}

// Chạy hàm hiển thị ngay khi trang web tải xong
window.onload = () => {
    renderProducts();
    updateCartBadge();
};