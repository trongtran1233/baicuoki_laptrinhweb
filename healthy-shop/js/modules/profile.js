import { currentUser, users, checkAuthState } from './auth.js';

export function renderProfile() {
    const profileContainer = document.getElementById('profileContainer');
    if (!profileContainer) return;

    if (!currentUser) {
        profileContainer.innerHTML = '<p style="color: #888;">Vui lòng đăng nhập để xem và chỉnh sửa thông tin cá nhân.</p>';
        return;
    }

    const userDetails = users.find(u => u.email === currentUser.email) || currentUser;

    profileContainer.innerHTML = `
        <form id="profileForm" style="max-width: 500px; display: grid; gap: 10px;">
            <div class="form-group">
                <label><strong>Họ và Tên:</strong></label>
                <input type="text" id="profileName" value="${userDetails.name || ''}" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px;">
            </div>
            <div class="form-group">
                <label><strong>Email (Cố định):</strong></label>
                <input type="email" value="${userDetails.email || ''}" disabled style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #eee;">
            </div>
            <div class="form-group">
                <label><strong>Số điện thoại mặc định:</strong></label>
                <input type="text" id="profilePhone" value="${userDetails.phone || ''}" placeholder="Nhập số điện thoại..." style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px;">
            </div>
            <div class="form-group">
                <label><strong>Địa chỉ giao hàng mặc định:</strong></label>
                <textarea id="profileAddress" rows="2" placeholder="Nhập địa chỉ nhận hàng..." style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px; resize: none;">${userDetails.address || ''}</textarea>
            </div>
            <div class="form-group">
                <label><strong>Mật khẩu mới (Để trống nếu không đổi):</strong></label>
                <input type="password" id="profilePassword" placeholder="Nhập mật khẩu mới..." style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px;">
            </div>
            <button type="submit" class="btn btn-primary" style="justify-self: start;">Lưu Hồ Sơ</button>
        </form>
    `;

    document.getElementById('profileForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = document.getElementById('profileName').value.trim();
        const newPhone = document.getElementById('profilePhone').value.trim();
        const newAddress = document.getElementById('profileAddress').value.trim();
        const newPass = document.getElementById('profilePassword').value;

        let allUsers = JSON.parse(localStorage.getItem('healthyUsers')) || [];
        const uIdx = allUsers.findIndex(u => u.email === currentUser.email);

        if (uIdx !== -1) {
            allUsers[uIdx].name = newName;
            allUsers[uIdx].phone = newPhone;
            allUsers[uIdx].address = newAddress;
            if (newPass) allUsers[uIdx].password = newPass;

            localStorage.setItem('healthyUsers', JSON.stringify(allUsers));

            currentUser.name = newName;
            currentUser.phone = newPhone;
            currentUser.address = newAddress;
            localStorage.setItem('healthyCurrentUser', JSON.stringify(currentUser));

            const shipPhone = document.getElementById('shippingPhone');
            const shipAddr = document.getElementById('shippingAddress');
            if (shipPhone) shipPhone.value = newPhone;
            if (shipAddr) shipAddr.value = newAddress;

            checkAuthState();
            alert('✅ Đã cập nhật thông tin hồ sơ cá nhân thành công!');
        }
    });
}