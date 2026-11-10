import { currentUser, openAuthModal } from './auth.js';
import { products } from './products.js';
import { appliedVoucher, resetVoucher } from './voucher.js'; // 👈 Import thêm resetVoucher
import { openPaymentGateway } from './payment.js';
import { renderOrderHistory } from './orders.js';
import { renderAdminOrders } from './admin.js';

export let cart = JSON.parse(localStorage.getItem('healthyCart')) || [];

export function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem('healthyCart', JSON.stringify(cart));
    renderCart();
}

export function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) cart = cart.filter(i => i.id !== productId);
    }
    localStorage.setItem('healthyCart', JSON.stringify(cart));
    renderCart();
}

export function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    if (!cartItemsContainer || !cartTotalElement) return;

    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart" style="color: #888; text-align: center;">Giỏ hàng trống</p>';
        cartTotalElement.textContent = '0 đ';
        return;
    }

    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-info">
                <strong>${item.name}</strong><br>
                <small>${item.price.toLocaleString('vi-VN')} đ</small>
            </div>
            <div class="cart-item-controls">
                <button class="btn btn-sm decrease-btn">-</button>
                <span>${item.quantity}</span>
                <button class="btn btn-sm increase-btn">+</button>
                <button class="btn btn-danger-sm remove-btn">X</button>
            </div>
        `;
        div.querySelector('.decrease-btn').addEventListener('click', () => updateQuantity(item.id, -1));
        div.querySelector('.increase-btn').addEventListener('click', () => updateQuantity(item.id, 1));
        div.querySelector('.remove-btn').addEventListener('click', () => updateQuantity(item.id, -item.quantity));
        cartItemsContainer.appendChild(div);
    });

    let discount = 0;
    if (appliedVoucher) {
        discount = appliedVoucher.type === 'percent' ? (subtotal * appliedVoucher.value) / 100 : appliedVoucher.value;
    }
    const finalTotal = Math.max(0, subtotal - discount);
    cartTotalElement.textContent = finalTotal.toLocaleString('vi-VN') + ' đ';
}

export function checkout() {
    if (!currentUser) {
        alert('Bạn cần đăng nhập trước khi đặt hàng!');
        openAuthModal('login');
        return;
    }

    if (cart.length === 0) {
        alert('Giỏ hàng trống!');
        return;
    }

    const phoneInput = document.getElementById('shippingPhone');
    const addressInput = document.getElementById('shippingAddress');

    const phone = phoneInput?.value.trim();
    const address = addressInput?.value.trim();

    if (!phone || !address) {
        alert('Vui lòng nhập Số điện thoại và Địa chỉ nhận hàng!');
        return;
    }

    let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let discount = appliedVoucher ? (appliedVoucher.type === 'percent' ? (subtotal * appliedVoucher.value) / 100 : appliedVoucher.value) : 0;
    const finalAmount = Math.max(0, subtotal - discount);

    // Mở Cổng thanh toán mô phỏng
    openPaymentGateway(finalAmount, () => {
        const orderData = {
            id: Date.now(),
            customerName: currentUser.name,
            email: currentUser.email,
            phone,
            address,
            items: [...cart],
            totalAmount: finalAmount,
            orderDate: new Date().toLocaleString('vi-VN')
        };

        let orders = JSON.parse(localStorage.getItem('healthyOrders')) || [];
        orders.push(orderData);
        localStorage.setItem('healthyOrders', JSON.stringify(orders));

        // Xóa trắng SĐT và Địa chỉ
        if (phoneInput) phoneInput.value = '';
        if (addressInput) addressInput.value = '';

        // 👇 GỌI HÀM RESET MÃ GIẢM GIÁ ĐỂ XÓA TRẠNG THÁI CŨ
        resetVoucher();

        cart = [];
        localStorage.setItem('healthyCart', JSON.stringify(cart));
        renderCart();
        renderOrderHistory();
        renderAdminOrders();
    });
}

export function initCartEvents() {
    document.getElementById('checkoutBtn')?.addEventListener('click', checkout);
}