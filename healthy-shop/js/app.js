// 1. DỮ LIỆU SẢN PHẨM PHÂN LOẠI 'food' (ĐỒ ĂN) VÀ 'drink' (ĐỒ UỐNG)
const defaultProducts = [
    { 
        id: 1, 
        name: 'Bánh mì đen', 
        price: 45000, 
        calories: '250 Kcal', 
        category: 'Eat Clean',
        type: 'food',
        image: 'images/banh-mi-den.png' 
    },
    { 
        id: 2, 
        name: 'Ức gà áp chảo sốt chanh dây', 
        price: 65000, 
        calories: '165 Kcal', 
        category: 'Keto',
        type: 'food',
        image: 'images/uc-ga.png'
    },
    { 
        id: 3, 
        name: 'Salad cá hồi bơ xanh', 
        price: 85000, 
        calories: '320 Kcal', 
        category: 'Eat Clean',
        type: 'food',
        image: 'images/salah-ca-hoi.png'
    },
    { 
        id: 4, 
        name: 'Cơm gạo lứt thịt bò rau củ', 
        price: 55000, 
        calories: '380 Kcal', 
        category: 'Low-Carb',
        type: 'food',
        image: 'images/com-gao-luc.png' 
    },
    { 
        id: 5, 
        name: 'Bún trộn rau củ sốt cay', 
        price: 50000, 
        calories: '190 Kcal', 
        category: 'Vegan',
        type: 'food',
        image: 'images/bun-tron-rau-cu.png' 
    },
    { 
        id: 6, 
        name: 'Smoothie Bơ Chuối Hạnh Nhân', 
        price: 40000, 
        calories: '210 Kcal', 
        category: 'Vegan',
        type: 'drink',
        image: 'images/smoothie-bo-chuoi-hanh-nhan.png' 
    },
    { 
        id: 7, 
        name: 'Nước ép cần tây detox', 
        price: 35000, 
        calories: '45 Kcal', 
        category: 'Vegan',
        type: 'drink',
        image: 'images/nuoc-ep-can-tay.png' 
    },
    { 
        id: 8, 
        name: 'Khoai lang luộc', 
        price: 15000, 
        calories: '180 Kcal', 
        category: 'Low-Carb',
        type: 'food',
        image: 'images/khoai-lang.png' 
    },
    { 
        id: 9, 
        name: 'Bánh pancake yến mạch', 
        price: 42000, 
        calories: '195 Kcal', 
        category: 'Vegan',
        type: 'food',
        image: 'images/banh-pancake.png' 
    },
    { 
        id: 10, 
        name: 'Bò áp chảo sốt tiêu đen ', 
        price: 110000, 
        calories: '420 Kcal', 
        category: 'Keto',
        type: 'food',
        image: 'images/bo-ap-chao.png' 
    },
    { 
        id: 11, 
        name: 'Nước ép Cam, cà rốt, táo', 
        price: 35000, 
        calories: '45 Kcal', 
        category: 'Vegan',
        type: 'drink',
        image: 'images/nuoc-ep-cam-carot-tao.png' 
    },
    { 
        id: 12, 
        name: 'Tôm hấp sả ăn kèm rau mầm', 
        price: 75000, 
        calories: '150 Kcal', 
        category: 'Keto',
        type: 'food',
        image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400' 
    },
    { 
        id: 13, 
        name: 'Sữa chua yến mạch hạt granola', 
        price: 38000, 
        calories: '180 Kcal', 
        category: 'Eat Clean',
        type: 'drink',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400' 
    },
    { 
        id: 14, 
        name: 'Salad ức gà xé phay hạt quinoa', 
        price: 60000, 
        calories: '220 Kcal', 
        category: 'Eat Clean',
        type: 'food',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400' 
    }
];

// Đồng bộ mảng mới vào storage
let products = defaultProducts;
localStorage.setItem('healthyProducts', JSON.stringify(products));

// Trạng thái tab thực đơn ('all', 'food', 'drink')
let currentMenuType = 'all';

// 2. KHAI BÁO CÁC BIẾN LƯU TRỮ
let cart = JSON.parse(localStorage.getItem('healthyCart')) || [];
let users = JSON.parse(localStorage.getItem('healthyUsers')) || [];
let currentUser = JSON.parse(localStorage.getItem('healthyCurrentUser')) || null;

// 3. KHAI BÁO BIẾN GIAO DIỆN DOM
const productGrid = document.getElementById('productGrid');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const tipText = document.getElementById('tipText');
const menuTitle = document.getElementById('menuTitle');

// Auth DOM
const authModal = document.getElementById('authModal');
const guestNav = document.getElementById('guestNav');
const userNav = document.getElementById('userNav');
const userNameSpan = document.getElementById('userName');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginTabBtn = document.getElementById('loginTabBtn');
const registerTabBtn = document.getElementById('registerTabBtn');

// 4. FETCH API MẸO SỨC KHỎE
async function fetchHealthTip() {
    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        if (!response.ok) throw new Error('Không thể tải API');
        const data = await response.json();
        tipText.textContent = `"${data.slip.advice}"`;
    } catch (error) {
        tipText.textContent = "Uống đủ 2 lít nước và duy trì lối sống lành mạnh mỗi ngày!";
    }
}

// 5. CHUYỂN ĐỔI TAB ĐỒ ĂN / ĐỒ UỐNG
function switchMenuType(type) {
    currentMenuType = type;

    // Cập nhật class active cho các nút tab
    document.querySelectorAll('.tab-btn-menu').forEach(btn => btn.classList.remove('active'));
    if (type === 'all') document.getElementById('tabAll').classList.add('active');
    if (type === 'food') document.getElementById('tabFood').classList.add('active');
    if (type === 'drink') document.getElementById('tabDrink').classList.add('active');

    // Đổi tiêu đề thực đơn
    if (menuTitle) {
        if (type === 'food') menuTitle.textContent = '🥗 Danh Sách Đồ Ăn Kiêng';
        else if (type === 'drink') menuTitle.textContent = '🥤 Danh Sách Đồ Uống & Nước Detox';
        else menuTitle.textContent = 'Thực Đơn Đồ Ăn & Đồ Uống';
    }

    renderProducts();
}

// 6. HIỂN THỊ DANH SÁCH SẢN PHẨM
function renderProducts() {
    if (!productGrid) return;
    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const category = categoryFilter ? categoryFilter.value : 'all';

    const filtered = products.filter(p => {
        const matchesName = p.name.toLowerCase().includes(keyword);
        const matchesCat = category === 'all' || p.category === category;
        const matchesType = currentMenuType === 'all' || p.type === currentMenuType;
        return matchesName && matchesCat && matchesType;
    });

    productGrid.innerHTML = '';
    if (filtered.length === 0) {
        productGrid.innerHTML = '<p style="padding: 10px; color: #666;">Không tìm thấy món phù hợp.</p>';
        return;
    }

    filtered.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <div class="product-img-container">
                <img src="${p.image}" alt="${p.name}" class="product-img">
            </div>
            <div class="product-info-box">
                <h3>${p.name}</h3>
                <p class="calories">⚡ Năng lượng: ${p.calories} | ${p.category}</p>
                <p class="price">${p.price.toLocaleString('vi-VN')} đ</p>
            </div>
            <button class="btn btn-primary" onclick="addToCart(${p.id})">Thêm vào giỏ</button>
        `;
        productGrid.appendChild(div);
    });
}

// 7. XỬ LÝ ĐĂNG NHẬP / ĐĂNG KÝ / ĐĂNG XUẤT
function checkAuthState() {
    if (!guestNav || !userNav) return;
    if (currentUser) {
        guestNav.style.display = 'none';
        userNav.style.display = 'block';
        if (userNameSpan) userNameSpan.textContent = currentUser.name;
    } else {
        guestNav.style.display = 'block';
        userNav.style.display = 'none';
    }
}

function openAuthModal(tab) {
    if (authModal) {
        authModal.style.display = 'flex';
        switchTab(tab);
    }
}

function closeAuthModal() {
    if (authModal) authModal.style.display = 'none';
}

function switchTab(tab) {
    if (tab === 'login') {
        if (loginForm) loginForm.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
        if (loginTabBtn) loginTabBtn.classList.add('active');
        if (registerTabBtn) registerTabBtn.classList.remove('active');
    } else {
        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'block';
        if (loginTabBtn) loginTabBtn.classList.remove('active');
        if (registerTabBtn) registerTabBtn.classList.add('active');
    }
}

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;

        if (users.some(u => u.email === email)) {
            alert('Email này đã được sử dụng!');
            return;
        }

        const newUser = { id: Date.now(), name, email, password };
        users.push(newUser);
        localStorage.setItem('healthyUsers', JSON.stringify(users));

        alert('Đăng ký thành công! Hãy đăng nhập để tiếp tục.');
        registerForm.reset();
        switchTab('login');
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            currentUser = { id: user.id, name: user.name, email: user.email };
            localStorage.setItem('healthyCurrentUser', JSON.stringify(currentUser));
            checkAuthState();
            closeAuthModal();
            loginForm.reset();
            alert(`Chào mừng ${currentUser.name} quay trở lại!`);
        } else {
            alert('Tài khoản hoặc mật khẩu không chính xác!');
        }
    });
}

function logout() {
    if (confirm('Bạn có muốn đăng xuất?')) {
        currentUser = null;
        localStorage.removeItem('healthyCurrentUser');
        checkAuthState();
    }
}

// 8. QUẢN LÝ GIỎ HÀNG & THANH TOÁN
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('healthyCart', JSON.stringify(cart));
    renderCart();
}

function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) cart = cart.filter(i => i.id !== productId);
    }
    localStorage.setItem('healthyCart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    if (!cartItemsContainer || !cartTotalElement) return;
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart" style="color: #888; text-align: center;">Giỏ hàng trống</p>';
        cartTotalElement.textContent = '0 đ';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-info">
                <strong>${item.name}</strong><br>
                <small>${item.price.toLocaleString('vi-VN')} đ</small>
            </div>
            <div class="cart-item-controls">
                <button class="btn btn-sm" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="btn btn-sm" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="btn btn-danger-sm" onclick="updateQuantity(${item.id}, -${item.quantity})">X</button>
            </div>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartTotalElement.textContent = total.toLocaleString('vi-VN') + ' đ';
}

function checkout() {
    if (!currentUser) {
        alert('Bạn cần đăng nhập trước khi tiến hành đặt hàng!');
        openAuthModal('login');
        return;
    }

    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
        return;
    }

    const phoneInput = document.getElementById('shippingPhone');
    const addressInput = document.getElementById('shippingAddress');

    const phone = phoneInput ? phoneInput.value.trim() : '';
    const address = addressInput ? addressInput.value.trim() : '';

    if (!phone || !address) {
        alert('Vui lòng nhập đầy đủ Số điện thoại và Địa chỉ nhận hàng!');
        if (!phone && phoneInput) phoneInput.focus();
        else if (!address && addressInput) addressInput.focus();
        return;
    }

    const orderData = {
        id: Date.now(),
        customerName: currentUser.name,
        email: currentUser.email,
        phone: phone,
        address: address,
        items: cart,
        orderDate: new Date().toLocaleString('vi-VN')
    };

    let orders = JSON.parse(localStorage.getItem('healthyOrders')) || [];
    orders.push(orderData);
    localStorage.setItem('healthyOrders', JSON.stringify(orders));

    alert(`🎉 Đặt hàng thành công!\n\nThông tin giao hàng:\n- Người nhận: ${currentUser.name}\n- Số điện thoại: ${phone}\n- Địa chỉ: ${address}\n\nĐơn hàng sẽ sớm được gửi đến bạn!`);
    
    cart = [];
    localStorage.setItem('healthyCart', JSON.stringify(cart));
    if (phoneInput) phoneInput.value = '';
    if (addressInput) addressInput.value = '';
    
    renderCart();
}

// 9. LẮNG NGHE SỰ KIỆN VÀ KHỞI CHẠY
if (searchInput) searchInput.addEventListener('input', renderProducts);
if (categoryFilter) categoryFilter.addEventListener('change', renderProducts);

window.addEventListener('click', (e) => {
    if (e.target === authModal) closeAuthModal();
});

document.addEventListener('DOMContentLoaded', () => {
    fetchHealthTip();
    checkAuthState();
    renderProducts();
    renderCart();
});