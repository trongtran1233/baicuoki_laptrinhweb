export function openInvoiceModal(orderId) {
    const orders = JSON.parse(localStorage.getItem('healthyOrders')) || [];
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const printArea = document.getElementById('invoicePrintArea');
    const modal = document.getElementById('invoiceModal');

    const itemsRows = order.items.map(item => `
        <tr>
            <td style="padding: 6px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 6px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 6px; border-bottom: 1px solid #eee; text-align: right;">${item.price.toLocaleString('vi-VN')} đ</td>
            <td style="padding: 6px; border-bottom: 1px solid #eee; text-align: right;">${(item.price * item.quantity).toLocaleString('vi-VN')} đ</td>
        </tr>
    `).join('');

    printArea.innerHTML = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="text-align: center; color: #27ae60; margin-bottom: 5px;">🥗 HEALTHYBITES INVOICE</h2>
            <p style="text-align: center; font-size: 0.85rem; color: #777;">Mã hóa đơn: #${order.id} | Ngày: ${order.orderDate}</p>
            <hr style="margin: 15px 0; border: none; border-top: 1px dashed #ccc;">
            <p><strong>Khách hàng:</strong> ${order.customerName}</p>
            <p><strong>Số điện thoại:</strong> ${order.phone}</p>
            <p><strong>Địa chỉ nhận hàng:</strong> ${order.address}</p>
            <br>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #f4f4f4;">
                        <th style="padding: 6px; text-align: left;">Món ăn</th>
                        <th style="padding: 6px; text-align: center;">SL</th>
                        <th style="padding: 6px; text-align: right;">Đơn giá</th>
                        <th style="padding: 6px; text-align: right;">Thành tiền</th>
                    </tr>
                </thead>
                <tbody>${itemsRows}</tbody>
            </table>
            <div style="text-align: right; margin-top: 15px; font-size: 1.1rem;">
                <strong>Tổng thanh toán: <span style="color: #27ae60;">${(order.totalAmount || 0).toLocaleString('vi-VN')} đ</span></strong>
            </div>
            <p style="text-align: center; margin-top: 25px; font-style: italic; font-size: 0.85rem;">Cảm ơn bạn đã lựa chọn món ăn lành mạnh cùng HealthyBites! ❤️</p>
        </div>
    `;

    if (modal) modal.style.display = 'flex';

    document.getElementById('closeInvoiceModalBtn').onclick = () => modal.style.display = 'none';
    document.getElementById('btnPrintInvoice').onclick = () => window.print();
}