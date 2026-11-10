import { renderCart } from './cart.js';

export const availableVouchers = {
    'HEALTHY10': { type: 'percent', value: 10, label: 'Giảm 10%' },
    'BANHMI20K': { type: 'fixed', value: 20000, label: 'Giảm 20.000 đ' }
};

export let appliedVoucher = null;

// 👇 HÀM RESET MÃ GIẢM GIÁ SAU KHI THANH TOÁN THÀNH CÔNG
export function resetVoucher() {
    appliedVoucher = null;
    const input = document.getElementById('voucherCodeInput');
    const msg = document.getElementById('voucherMsg');
    if (input) input.value = '';
    if (msg) msg.textContent = '';
}

export function initVoucherEvents() {
    document.getElementById('applyVoucherBtn')?.addEventListener('click', () => {
        const code = document.getElementById('voucherCodeInput').value.trim().toUpperCase();
        const msg = document.getElementById('voucherMsg');

        if (!availableVouchers[code]) {
            if (msg) { msg.textContent = '❌ Mã không hợp lệ!'; msg.style.color = '#e74c3c'; }
            appliedVoucher = null;
        } else {
            appliedVoucher = availableVouchers[code];
            if (msg) { msg.textContent = `✅ Áp dụng thành công (${appliedVoucher.label})!`; msg.style.color = '#27ae60'; }
        }
        renderCart();
    });
}