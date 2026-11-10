export let users = JSON.parse(localStorage.getItem('healthyUsers')) || [];
export let currentUser = JSON.parse(localStorage.getItem('healthyCurrentUser')) || null;

// Kiểm tra xem user hiện tại có phải là Admin không
export function isAdmin() {
    return currentUser && currentUser.email === 'admin@healthy.com';
}

export function checkAuthState() {
    const guestNav = document.getElementById('guestNav');
    const userNav = document.getElementById('userNav');
    const userNameSpan = document.getElementById('userName');
    const adminSection = document.getElementById('adminSection');

    if (!guestNav || !userNav) return;

    if (currentUser) {
        guestNav.style.display = 'none';
        userNav.style.display = 'block';
        if (userNameSpan) userNameSpan.textContent = currentUser.name;

        // Tự động điền SĐT & Địa chỉ nếu có
        const shipPhone = document.getElementById('shippingPhone');
        const shipAddr = document.getElementById('shippingAddress');
        if (shipPhone && currentUser.phone) shipPhone.value = currentUser.phone;
        if (shipAddr && currentUser.address) shipAddr.value = currentUser.address;

        // PHÂN QUYỀN HIỂN THỊ ADMIN HOẶC USER
        if (isAdmin()) {
            if (adminSection) adminSection.style.display = 'block'; // Hiển thị khung quản trị cho Admin
        } else {
            if (adminSection) adminSection.style.display = 'none';  // Ẩn khung quản trị với User thường
        }
    } else {
        guestNav.style.display = 'block';
        userNav.style.display = 'none';
        
        // Chưa đăng nhập thì ẩn cả Hồ sơ và Admin
        const profileSec = document.getElementById('profileSection');
        if (profileSec) profileSec.style.display = 'none';
        if (adminSection) adminSection.style.display = 'none';
    }
}

export function openAuthModal(tab) {
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.style.display = 'flex';
        switchTab(tab);
    }
}

export function closeAuthModal() {
    const authModal = document.getElementById('authModal');
    if (authModal) authModal.style.display = 'none';
}

export function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTabBtn = document.getElementById('loginTabBtn');
    const registerTabBtn = document.getElementById('registerTabBtn');

    if (tab === 'login') {
        if (loginForm) loginForm.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
        loginTabBtn?.classList.add('active');
        registerTabBtn?.classList.remove('active');
    } else {
        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'block';
        loginTabBtn?.classList.remove('active');
        registerTabBtn?.classList.add('active');
    }
}

export function initAuthEvents() {
    document.getElementById('btnOpenLogin')?.addEventListener('click', () => openAuthModal('login'));
    document.getElementById('btnOpenRegister')?.addEventListener('click', () => openAuthModal('register'));
    document.getElementById('btnLogout')?.addEventListener('click', logout);
    document.getElementById('closeAuthModalBtn')?.addEventListener('click', closeAuthModal);
    
    document.getElementById('loginTabBtn')?.addEventListener('click', () => switchTab('login'));
    document.getElementById('registerTabBtn')?.addEventListener('click', () => switchTab('register'));

    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('authModal')) closeAuthModal();
    });

    const registerForm = document.getElementById('registerForm');
    registerForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;

        if (users.some(u => u.email === email)) {
            alert('Email này đã được sử dụng!');
            return;
        }

        users.push({ id: Date.now(), name, email, password, phone: '', address: '' });
        localStorage.setItem('healthyUsers', JSON.stringify(users));
        alert('Đăng ký thành công! Hãy đăng nhập để tiếp tục.');
        registerForm.reset();
        switchTab('login');
    });

    const loginForm = document.getElementById('loginForm');
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        // Tài khoản Admin mặc định để test nhanh nếu chưa có trong LocalStorage
        if (email === 'admin@healthy.com' && password === 'admin123') {
            currentUser = { id: 999, name: 'Quản Trị Viên (Admin)', email: 'admin@healthy.com', phone: '0900000000', address: 'Hệ Thống Admin' };
        } else {
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                currentUser = { ...user };
            } else {
                alert('Tài khoản hoặc mật khẩu không chính xác!');
                return;
            }
        }

        localStorage.setItem('healthyCurrentUser', JSON.stringify(currentUser));
        checkAuthState();
        closeAuthModal();
        loginForm.reset();
        alert(`Chào mừng ${currentUser.name} quay trở lại!`);
    });
}

export function logout() {
    if (confirm('Bạn có muốn đăng xuất?')) {
        currentUser = null;
        localStorage.removeItem('healthyCurrentUser');
        
        // Ẩn khung Hồ sơ và Admin khi đăng xuất
        const profileSec = document.getElementById('profileSection');
        const adminSection = document.getElementById('adminSection');
        if (profileSec) profileSec.style.display = 'none';
        if (adminSection) adminSection.style.display = 'none';

        checkAuthState();
    }
}