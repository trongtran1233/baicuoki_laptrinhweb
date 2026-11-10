import { products, renderProducts } from './products.js';
import { addToCart } from './cart.js';

export function renderAdminDashboard() {
    renderAdminAnalytics();
    renderAdminProductsList();
    renderAdminOrders();
    initAdminEvents();
}

// 1. THỐNG KÊ DOANH THU (DASHBOARD)
export function renderAdminAnalytics() {
    const container = document.getElementById('adminAnalyticsContainer');
    if (!container) return;

    const orders = JSON.parse(localStorage.getItem('healthyOrders')) || [];
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const totalItemsSold = orders.reduce((sum, o) => sum + (o.items ? o.items.reduce((iSum, i) => iSum + i.quantity, 0) : 0), 0);

    container.innerHTML = `
        <h4 style="margin-bottom: 10px; color: #1e824c;">📊 Dashboard Thống Kê Kinh Doanh</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 15px; text-align: center;">
            <div style="background: #fff; padding: 12px; border-radius: 8px; border: 1px solid #c8e6c9;">
                <small style="color: #666;">Tổng Đơn Hàng</small>
                <p style="font-size: 1.4rem; font-weight: bold; color: #27ae60; margin-top: 4px;">${totalOrders}</p>
            </div>
            <div style="background: #fff; padding: 12px; border-radius: 8px; border: 1px solid #c8e6c9;">
                <small style="color: #666;">Tổng Doanh Thu</small>
                <p style="font-size: 1.4rem; font-weight: bold; color: #d35400; margin-top: 4px;">${totalRevenue.toLocaleString('vi-VN')} đ</p>
            </div>
            <div style="background: #fff; padding: 12px; border-radius: 8px; border: 1px solid #c8e6c9;">
                <small style="color: #666;">Số Món Đã Bán</small>
                <p style="font-size: 1.4rem; font-weight: bold; color: #2980b9; margin-top: 4px;">${totalItemsSold}</p>
            </div>
        </div>
    `;
}

// 2. QUẢN LÝ DANH SÁCH SẢN PHẨM (CRUD)
export function renderAdminProductsList() {
    const list = document.getElementById('adminProductsList');
    if (!list) return;

    list.innerHTML = '';
    if (products.length === 0) {
        list.innerHTML = '<p style="color: #888;">Chưa có sản phẩm nào trong hệ thống.</p>';
        return;
    }

    products.forEach(p => {
        const div = document.createElement('div');
        div.style.cssText = 'display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding: 10px 0;';
        div.innerHTML = `
            <div>
                <strong>${p.name}</strong> ID: (${p.id})<br>
                <span style="color: #27ae60; font-weight: bold;">${Number(p.price).toLocaleString('vi-VN')} đ</span> - <small>${p.category}</small>
            </div>
            <div style="display: flex; gap: 6px;">
                <button type="button" class="btn btn-sm edit-prod-btn" data-id="${p.id}">✏️ Sửa</button>
                <button type="button" class="btn btn-danger-sm del-prod-btn" data-id="${p.id}">🗑️ Xóa</button>
            </div>
        `;
        
        // Gắn sự kiện chuẩn xác qua dataset
        div.querySelector('.edit-prod-btn').addEventListener('click', () => editProduct(p.id));
        div.querySelector('.del-prod-btn').addEventListener('click', () => deleteProduct(p.id));
        list.appendChild(div);
    });
}

function editProduct(id) {
    // Ép kiểu tương đương để tìm đúng sản phẩm bất kể string hay number
    const p = products.find(item => String(item.id) === String(id));
    if (!p) {
        alert('Không tìm thấy sản phẩm!');
        return;
    }

    document.getElementById('adminProdId').value = p.id;
    document.getElementById('adminProdName').value = p.name;
    document.getElementById('adminProdPrice').value = p.price;
    document.getElementById('adminProdCalories').value = p.calories || '';
    document.getElementById('adminProdCategory').value = p.category;
    document.getElementById('adminProdType').value = p.type || 'food';
    document.getElementById('adminProdImage').value = p.image;

    // Cuộn màn hình lên form quản trị để thấy thông tin đang sửa
    document.getElementById('adminProductForm')?.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('adminProdName')?.focus();
}

function deleteProduct(id) {
    if (confirm('Bạn có chắc chắn muốn xóa món ăn này khỏi menu?')) {
        const idx = products.findIndex(p => String(p.id) === String(id));
        if (idx !== -1) {
            products.splice(idx, 1);
            localStorage.setItem('healthyProducts', JSON.stringify(products));
            renderAdminProductsList();
            renderProducts(addToCart);
        }
    }
}

export function initAdminEvents() {
    const form = document.getElementById('adminProductForm');
    const resetBtn = document.getElementById('adminResetFormBtn');

    resetBtn?.addEventListener('click', () => {
        form?.reset();
        document.getElementById('adminProdId').value = '';
    });

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const idVal = document.getElementById('adminProdId').value.trim();
        const name = document.getElementById('adminProdName').value.trim();
        const price = Number(document.getElementById('adminProdPrice').value);
        const calories = document.getElementById('adminProdCalories').value.trim();
        const category = document.getElementById('adminProdCategory').value;
        const type = document.getElementById('adminProdType').value;
        const image = document.getElementById('adminProdImage').value.trim();

        if (idVal !== '') {
            // CẬP NHẬT SẢN PHẨM CŨ (Đã có ID)
            const p = products.find(item => String(item.id) === String(idVal));
            if (p) {
                p.name = name;
                p.price = price;
                p.calories = calories;
                p.category = category;
                p.type = type;
                p.image = image;
            } else {
                alert('Lỗi: Không tìm thấy sản phẩm cần cập nhật trong bộ nhớ!');
                return;
            }
        } else {
            // THÊM SẢN PHẨM MỚI
            const newProd = {
                id: Date.now(),
                name,
                price,
                calories,
                category,
                type,
                image
            };
            products.push(newProd);
        }

        // Lưu vào localStorage
        localStorage.setItem('healthyProducts', JSON.stringify(products));

        // Reset form
        form.reset();
        document.getElementById('adminProdId').value = '';

        // Cập nhật lại giao diện danh sách quản trị và thực đơn chính ngoài trang chủ
        renderAdminProductsList();
        renderProducts(addToCart);

        alert('✅ Cập nhật giá và thông tin sản phẩm thành công!');
    });
}

// 3. QUẢN LÝ ĐƠN HÀNG
export function renderAdminOrders() {
    const list = document.getElementById('adminOrdersList');
    if (!list) return;

    const orders = JSON.parse(localStorage.getItem('healthyOrders')) || [];
    list.innerHTML = orders.length === 0 ? '<p style="color: #888;">Chưa có đơn hàng nào.</p>' : '';

    orders.forEach(o => {
        const div = document.createElement('div');
        div.style.cssText = 'border: 1px solid #ddd; padding: 10px; margin-bottom: 8px; background: #fff; border-radius: 6px;';
        div.innerHTML = `
            <p><strong>Khách hàng:</strong> ${o.customerName} - SĐT: ${o.phone}</p>
            <p><strong>Địa chỉ:</strong> ${o.address} | <strong>Ngày:</strong> ${o.orderDate}</p>
            <p><strong>Tổng tiền:</strong> ${(o.totalAmount || 0).toLocaleString('vi-VN')} đ</p>
            <button type="button" class="btn btn-danger-sm delete-order-btn" data-id="${o.id}" style="margin-top: 5px;">Xóa đơn</button>
        `;
        div.querySelector('.delete-order-btn').addEventListener('click', () => {
            if (confirm('Xóa đơn hàng này khỏi hệ thống?')) {
                let updated = orders.filter(item => String(item.id) !== String(o.id));
                localStorage.setItem('healthyOrders', JSON.stringify(updated));
                renderAdminDashboard();
            }
        });
        list.appendChild(div);
    });
}