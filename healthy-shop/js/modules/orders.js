import { currentUser } from './auth.js';
import { openInvoiceModal } from './invoice.js';

export function renderOrderHistory() {
    const ordersList = document.getElementById('ordersList');
    if (!ordersList) return;

    const allOrders = JSON.parse(localStorage.getItem('healthyOrders')) || [];
    const myOrders = currentUser ? allOrders.filter(o => o.email === currentUser.email) : [];

    ordersList.innerHTML = myOrders.length === 0 ? '<p style="color: #888;">Bạn chưa có đơn hàng nào.</p>' : '';

    myOrders.reverse().forEach(o => {
        const div = document.createElement('div');
        div.style.cssText = 'border: 1px solid #e2e8f0; padding: 12px; margin-bottom: 10px; border-radius: 8px; background: #fafafa;';
        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; font-weight: bold;">
                <span>Mã: #${o.id}</span>
                <span style="color: #27ae60;">${o.orderDate}</span>
            </div>
            <p style="margin: 5px 0;">Tổng tiền: <strong>${(o.totalAmount || 0).toLocaleString('vi-VN')} đ</strong></p>
            <small>Đến: ${o.address} (${o.phone})</small><br>
            <button class="btn btn-outline btn-sm print-inv-btn" data-id="${o.id}" style="margin-top: 8px;">🖨️ In Hóa Đơn</button>
        `;
        div.querySelector('.print-inv-btn').addEventListener('click', () => openInvoiceModal(o.id));
        ordersList.appendChild(div);
    });
}