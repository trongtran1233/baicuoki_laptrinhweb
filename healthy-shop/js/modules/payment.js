export function openPaymentGateway(amount, onSuccessCallback) {
    const payModal = document.getElementById('paymentModal');
    const payAmount = document.getElementById('payAmount');
    if (payAmount) payAmount.textContent = amount.toLocaleString('vi-VN') + ' đ';
    if (payModal) payModal.style.display = 'flex';

    document.getElementById('closePaymentModalBtn').onclick = () => payModal.style.display = 'none';

    document.getElementById('confirmPayBtn').onclick = () => {
        alert('🎉 Thanh toán thành công!');
        payModal.style.display = 'none';
        if (typeof onSuccessCallback === 'function') onSuccessCallback();
    };
}