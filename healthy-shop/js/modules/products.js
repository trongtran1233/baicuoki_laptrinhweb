import { toggleFavorite, favoriteIds } from './favorites.js';

export const defaultProducts = [
    { id: 1, name: 'Bánh mì đen', price: 45000, calories: '250 Kcal', category: 'Eat Clean', type: 'food', image: 'images/banh-mi-den.png' },
    { id: 2, name: 'Ức gà áp chảo sốt chanh dây', price: 65000, calories: '165 Kcal', category: 'Keto', type: 'food', image: 'images/uc-ga.png' },
    { id: 3, name: 'Salad cá hồi bơ xanh', price: 85000, calories: '320 Kcal', category: 'Eat Clean', type: 'food', image: 'images/salah-ca-hoi.png' },
    { id: 4, name: 'Cơm gạo lứt thịt bò rau củ', price: 55000, calories: '380 Kcal', category: 'Low-Carb', type: 'food', image: 'images/com-gao-luc.png' },
    { id: 5, name: 'Bún trộn rau củ sốt cay', price: 50000, calories: '190 Kcal', category: 'Vegan', type: 'food', image: 'images/bun-tron-rau-cu.png' },
    { id: 6, name: 'Smoothie Bơ Chuối Hạnh Nhân', price: 40000, calories: '210 Kcal', category: 'Vegan', type: 'drink', image: 'images/smoothie-bo-chuoi-hanh-nhan.png' },
    { id: 7, name: 'Nước ép cần tây detox', price: 35000, calories: '45 Kcal', category: 'Vegan', type: 'drink', image: 'images/nuoc-ep-can-tay.png' },
    { id: 8, name: 'Khoai lang luộc', price: 15000, calories: '180 Kcal', category: 'Low-Carb', type: 'food', image: 'images/khoai-lang.png' },
    { id: 9, name: 'Bánh pancake yến mạch', price: 42000, calories: '195 Kcal', category: 'Vegan', type: 'food', image: 'images/banh-pancake.png' },
    { id: 10, name: 'Bò áp chảo sốt tiêu đen ', price: 110000, calories: '420 Kcal', category: 'Keto', type: 'food', image: 'images/bo-ap-chao.png' },
    { id: 11, name: 'Nước ép Cam, cà rốt, táo', price: 35000, calories: '45 Kcal', category: 'Vegan', type: 'drink', image: 'images/nuoc-ep-cam-carot-tao.png' },
    { id: 12, name: 'Tôm hấp sả ăn kèm rau mầm', price: 75000, calories: '150 Kcal', category: 'Keto', type: 'food', image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400' },
    { id: 13, name: 'Sữa chua yến mạch hạt granola', price: 38000, calories: '180 Kcal', category: 'Eat Clean', type: 'drink', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400' },
    { id: 14, name: 'Salad ức gà xé phay hạt quinoa', price: 60000, calories: '220 Kcal', category: 'Eat Clean', type: 'food', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400' }
];

// Ưu tiên lấy từ localStorage nếu có, nếu không dùng defaultProducts
export let products = JSON.parse(localStorage.getItem('healthyProducts')) || defaultProducts;
if (!localStorage.getItem('healthyProducts')) {
    localStorage.setItem('healthyProducts', JSON.stringify(products));
}

export let currentMenuType = 'all';

export function switchMenuType(type, renderCallback) {
    currentMenuType = type;
    document.querySelectorAll('.tab-btn-menu').forEach(btn => btn.classList.remove('active'));
    if (type === 'all') document.getElementById('tabAll')?.classList.add('active');
    if (type === 'food') document.getElementById('tabFood')?.classList.add('active');
    if (type === 'drink') document.getElementById('tabDrink')?.classList.add('active');

    const menuTitle = document.getElementById('menuTitle');
    if (menuTitle) {
        if (type === 'food') menuTitle.textContent = '🥗 Danh Sách Đồ Ăn Kiêng';
        else if (type === 'drink') menuTitle.textContent = '🥤 Danh Sách Đồ Uống & Nước Detox';
        else menuTitle.textContent = 'Thực Đơn Đồ Ăn & Đồ Uống';
    }
    if (typeof renderCallback === 'function') renderCallback();
}

export function renderProducts(onAddToCart) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    const keyword = document.getElementById('searchInput')?.value.toLowerCase().trim() || '';
    const category = document.getElementById('categoryFilter')?.value || 'all';

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
        const isFav = favoriteIds.includes(p.id);
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <div class="product-img-container"><img src="${p.image}" alt="${p.name}" class="product-img"></div>
            <div class="product-info-box">
                <h3>${p.name}</h3>
                <p class="calories">⚡ ${p.calories} | ${p.category}</p>
                <p class="price">${Number(p.price).toLocaleString('vi-VN')} đ</p>
            </div>
            <div style="display: flex; gap: 6px;">
                <button class="btn btn-primary add-to-cart-btn" style="flex: 1;" data-id="${p.id}">Thêm vào giỏ</button>
                <button class="btn btn-outline fav-btn" data-id="${p.id}">${isFav ? '❤️' : '🤍'}</button>
            </div>
        `;
        div.querySelector('.add-to-cart-btn').addEventListener('click', () => onAddToCart(p.id));
        div.querySelector('.fav-btn').addEventListener('click', () => {
            toggleFavorite(p.id);
            renderProducts(onAddToCart);
        });
        productGrid.appendChild(div);
    });
}

export function initProductEvents(renderCallback) {
    document.getElementById('searchInput')?.addEventListener('input', renderCallback);
    document.getElementById('categoryFilter')?.addEventListener('change', renderCallback);
    document.getElementById('tabAll')?.addEventListener('click', () => switchMenuType('all', renderCallback));
    document.getElementById('tabFood')?.addEventListener('click', () => switchMenuType('food', renderCallback));
    document.getElementById('tabDrink')?.addEventListener('click', () => switchMenuType('drink', renderCallback));
}