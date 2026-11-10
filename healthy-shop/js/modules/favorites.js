import { products } from './products.js';

export let favoriteIds = JSON.parse(localStorage.getItem('healthyFavorites')) || [];

export function toggleFavorite(productId) {
    if (favoriteIds.includes(productId)) {
        favoriteIds = favoriteIds.filter(id => id !== productId);
    } else {
        favoriteIds.push(productId);
    }
    localStorage.setItem('healthyFavorites', JSON.stringify(favoriteIds));
    renderFavorites();
}

export function renderFavorites() {
    const favGrid = document.getElementById('favoritesGrid');
    if (!favGrid) return;
    const favProducts = products.filter(p => favoriteIds.includes(p.id));
    favGrid.innerHTML = favProducts.length === 0 ? '<p style="color: #888;">Chưa có món ăn yêu thích.</p>' : '';
    favProducts.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <div class="product-img-container"><img src="${p.image}" class="product-img"></div>
            <div class="product-info-box">
                <h3>${p.name}</h3>
                <p class="price">${p.price.toLocaleString('vi-VN')} đ</p>
            </div>
            <button class="btn btn-danger-sm remove-fav-btn" data-id="${p.id}">💔 Bỏ yêu thích</button>
        `;
        div.querySelector('.remove-fav-btn').addEventListener('click', () => toggleFavorite(p.id));
        favGrid.appendChild(div);
    });
}