let PRODUCTS = [
  // ── NIKE ──
  { id:1, name:"Nike Air Max 270", brand:"nike", category:"running",
    price:3500000, originalPrice:4200000,
    img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    badge:"hot", desc:"Đế Air Max lớn nhất, êm ái và thoải mái suốt cả ngày dài.",
    sizes:[38,39,40,41,42,43,44], rating:4.8, reviews:241 },

  { id:2, name:"Nike Air Force 1 '07", brand:"nike", category:"lifestyle",
    price:2800000, originalPrice:3200000,
    img:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&q=80",
    badge:"", desc:"Biểu tượng văn hóa đường phố, thiết kế bền bỉ theo thời gian.",
    sizes:[38,39,40,41,42,43], rating:4.7, reviews:389 },

  { id:3, name:"Nike React Infinity Run", brand:"nike", category:"running",
    price:4100000, originalPrice:4800000,
    img:"https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80",
    badge:"new", desc:"Thiết kế giúp giảm chấn thương khi chạy bộ dài hạn.",
    sizes:[39,40,41,42,43,44], rating:4.9, reviews:167 },

  { id:4, name:"Nike Mercurial Superfly", brand:"nike", category:"football",
    price:5200000, originalPrice:6000000,
    img:"https://images.unsplash.com/photo-1511886929837-354d827aae26?w=500&q=80",
    badge:"sale", desc:"Tốc độ tối thượng trên sân cỏ, đinh AG linh hoạt.",
    sizes:[38,39,40,41,42,43], rating:4.6, reviews:98 },

  // ── ADIDAS ──
  { id:5, name:"Adidas Ultraboost 22", brand:"adidas", category:"running",
    price:4500000, originalPrice:5200000,
    img:"https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&q=80",
    badge:"hot", desc:"Công nghệ Boost mang lại năng lượng trả về vượt trội nhất.",
    sizes:[39,40,41,42,43,44,45], rating:4.9, reviews:312 },

  { id:6, name:"Adidas Stan Smith", brand:"adidas", category:"lifestyle",
    price:2200000, originalPrice:2600000,
    img:"https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80",
    badge:"", desc:"Đôi giày tennis huyền thoại, kiểu dáng tối giản bất hủ.",
    sizes:[37,38,39,40,41,42,43], rating:4.5, reviews:445 },

  { id:7, name:"Adidas Predator Edge", brand:"adidas", category:"football",
    price:4800000, originalPrice:5500000,
    img:"https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&q=80",
    badge:"new", desc:"Kiểm soát bóng chính xác với công nghệ Demonskin.",
    sizes:[39,40,41,42,43], rating:4.7, reviews:87 },

  { id:8, name:"Adidas NMD R1", brand:"adidas", category:"lifestyle",
    price:3300000, originalPrice:3800000,
    img:"https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&q=80",
    badge:"sale", desc:"Kết hợp công nghệ Boost với thiết kế đường phố hiện đại.",
    sizes:[39,40,41,42,43,44], rating:4.6, reviews:203 },

  // ── PUMA ──
  { id:9, name:"Puma RS-X Efekt", brand:"puma", category:"lifestyle",
    price:2600000, originalPrice:3000000,
    img:"https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80",
    badge:"new", desc:"Thiết kế chunky retro lấy cảm hứng từ thập niên 80-90.",
    sizes:[38,39,40,41,42,43,44], rating:4.4, reviews:156 },

  { id:10, name:"Puma Future Z 1.3", brand:"puma", category:"football",
    price:3900000, originalPrice:4500000,
    img:"https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=500&q=80",
    badge:"", desc:"Giày bóng đá co dãn linh hoạt, ôm chân hoàn hảo.",
    sizes:[39,40,41,42,43], rating:4.5, reviews:72 },

  // ── NEW BALANCE ──
  { id:11, name:"New Balance 574 Core", brand:"newbalance", category:"lifestyle",
    price:2400000, originalPrice:2800000,
    img:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80",
    badge:"", desc:"Đế ENCAP mang lại sự hỗ trợ tuyệt vời và thoải mái mỗi ngày.",
    sizes:[38,39,40,41,42,43,44,45], rating:4.6, reviews:278 },

  { id:12, name:"New Balance Fresh Foam 1080", brand:"newbalance", category:"running",
    price:4200000, originalPrice:4900000,
    img:"https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&q=80",
    badge:"hot", desc:"Đệm Fresh Foam cải tiến, lý tưởng cho chạy marathon.",
    sizes:[39,40,41,42,43,44], rating:4.8, reviews:134 },

  // ── JORDAN ──
  { id:13, name:"Air Jordan 1 Retro High", brand:"jordan", category:"lifestyle",
    price:5800000, originalPrice:6800000,
    img:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&q=80",
    badge:"hot", desc:"Phiên bản tái sinh của đôi giày huyền thoại nhất lịch sử.",
    sizes:[39,40,41,42,43,44], rating:5.0, reviews:521 },

  { id:14, name:"Air Jordan 4 Retro", brand:"jordan", category:"lifestyle",
    price:6500000, originalPrice:7500000,
    img:"https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&q=80",
    badge:"sale", desc:"Thiết kế mang tính biểu tượng với chi tiết lưới thoáng khí.",
    sizes:[40,41,42,43,44], rating:4.9, reviews:298 },

  // ── CONVERSE ──
  { id:15, name:"Converse Chuck Taylor All Star", brand:"converse", category:"lifestyle",
    price:1500000, originalPrice:1800000,
    img:"https://images.unsplash.com/photo-1494496195158-c3bc02b6b3ef?w=500&q=80",
    badge:"", desc:"Đôi giày canvas kinh điển, phù hợp với mọi outfit hàng ngày.",
    sizes:[36,37,38,39,40,41,42,43,44], rating:4.4, reviews:634 },

  { id:16, name:"Converse Run Star Hike", brand:"converse", category:"lifestyle",
    price:2100000, originalPrice:2400000,
    img:"https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&q=80",
    badge:"new", desc:"Platform chunky hiện đại trên nền canvas cổ điển.",
    sizes:[37,38,39,40,41,42], rating:4.5, reviews:187 },

  // ── VANS ──
  { id:17, name:"Vans Old Skool", brand:"vans", category:"lifestyle",
    price:1800000, originalPrice:2100000,
    img:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&q=80",
    badge:"", desc:"Thiết kế Sidestripe huyền thoại, đồng hành cùng văn hóa skate.",
    sizes:[37,38,39,40,41,42,43,44], rating:4.6, reviews:412 },

  { id:18, name:"Vans Sk8-Hi", brand:"vans", category:"lifestyle",
    price:2000000, originalPrice:2300000,
    img:"https://images.unsplash.com/photo-1508163223045-1880bc36e222?w=500&q=80",
    badge:"", desc:"Cổ cao bảo vệ mắt cá, lý tưởng cho các ván trượt khó.",
    sizes:[38,39,40,41,42,43], rating:4.5, reviews:289 },

  // ── REEBOK ──
  { id:19, name:"Reebok Classic Leather", brand:"reebok", category:"lifestyle",
    price:1900000, originalPrice:2200000,
    img:"https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80",
    badge:"sale", desc:"Chất liệu da mềm mại, phong cách retro không bao giờ lỗi mốt.",
    sizes:[38,39,40,41,42,43,44], rating:4.3, reviews:198 },

  { id:20, name:"Reebok Nano X2", brand:"reebok", category:"training",
    price:3200000, originalPrice:3700000,
    img:"https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=500&q=80",
    badge:"new", desc:"Giày tập lý tưởng với đế Floatride Energy Foam.",
    sizes:[39,40,41,42,43,44], rating:4.7, reviews:143 },

  // ── ASICS ──
  { id:21, name:"ASICS Gel-Nimbus 24", brand:"asics", category:"running",
    price:3800000, originalPrice:4400000,
    img:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80",
    badge:"hot", desc:"Công nghệ GEL hấp thụ chấn động, lý tưởng cho runner nghiêm túc.",
    sizes:[39,40,41,42,43,44,45], rating:4.8, reviews:267 },

  { id:22, name:"ASICS Gel-Kayano 28", brand:"asics", category:"running",
    price:4000000, originalPrice:4700000,
    img:"https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80",
    badge:"", desc:"Kiểm soát chuyển động tốt nhất cho bàn chân bẹt.",
    sizes:[38,39,40,41,42,43], rating:4.7, reviews:189 },

  // ── UNDER ARMOUR ──
  { id:23, name:"UA HOVR Phantom 3", brand:"ua", category:"running",
    price:3600000, originalPrice:4200000,
    img:"https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80",
    badge:"new", desc:"HOVR technology giúp bạn cảm nhận từng bước chạy với zero gravity.",
    sizes:[39,40,41,42,43,44], rating:4.6, reviews:112 },

  { id:24, name:"UA Charged Assert 9", brand:"ua", category:"training",
    price:1700000, originalPrice:2000000,
    img:"https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&q=80",
    badge:"sale", desc:"Giày đa năng cho gym và tập luyện hàng ngày, giá hợp lý.",
    sizes:[38,39,40,41,42,43,44], rating:4.4, reviews:224 },
];

const COUPONS = {
  "SPEEDCORE50": 50,
  "SALE30": 30,
  "NEWUSER20": 20,
  "FLASH10": 10
};

const USERS = [
  { id: 1, name: "Admin Manager", email: "admin@speedcore.vn", password: "123", role: "admin" },
  { id: 2, name: "Nguyễn Nhân Viên", email: "staff@speedcore.vn", password: "123", role: "staff" },
  { id: 3, name: "Trần Khách Hàng", email: "user@gmail.com", password: "123", role: "customer" }
];

// Khởi tạo dữ liệu mẫu nếu chưa có trong localStorage
if (!localStorage.getItem('sc_products')) {
  localStorage.setItem('sc_products', JSON.stringify(PRODUCTS));
} else {
  PRODUCTS = JSON.parse(localStorage.getItem('sc_products'));
}

if (!localStorage.getItem('sc_users')) {
  localStorage.setItem('sc_users', JSON.stringify(USERS));
}
