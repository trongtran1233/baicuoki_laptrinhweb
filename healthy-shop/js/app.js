import { fetchHealthTip } from './modules/tips.js';
import { checkAuthState, initAuthEvents, isAdmin } from './modules/auth.js';
import { renderProducts, initProductEvents } from './modules/products.js';
import { renderCart, initCartEvents, addToCart } from './modules/cart.js';
import { renderReviews, initReviewEvents } from './modules/reviews.js';
import { renderFavorites } from './modules/favorites.js';
import { renderOrderHistory } from './modules/orders.js';
import { initVoucherEvents } from './modules/voucher.js';
import { renderProfile } from './modules/profile.js';
import { renderAdminDashboard } from './modules/admin.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tải dữ liệu chung
    fetchHealthTip();
    checkAuthState();
    renderProfile();
    renderProducts(addToCart);
    renderCart();
    renderReviews();
    renderFavorites();
    renderOrderHistory();

    // Chỉ load bảng điều khiển Admin nếu user hiện tại là Admin
    if (isAdmin()) {
        renderAdminDashboard();
    }

    // 2. Sự kiện bấm nút "Hồ Sơ" trên Header
    const btnOpenProfile = document.getElementById('btnOpenProfile');
    const profileSection = document.getElementById('profileSection');
    
    btnOpenProfile?.addEventListener('click', () => {
        if (profileSection) {
            const isHidden = profileSection.style.display === 'none';
            profileSection.style.display = isHidden ? 'block' : 'none';
            if (isHidden) {
                renderProfile();
                profileSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // 3. Khởi tạo các sự kiện khác
    initAuthEvents();
    initProductEvents(() => renderProducts(addToCart));
    initCartEvents();
    initReviewEvents();
    initVoucherEvents();
});