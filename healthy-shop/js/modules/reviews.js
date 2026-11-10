import { currentUser } from './auth.js';

export let reviews = JSON.parse(localStorage.getItem('healthyReviews')) || [
    { id: 1, userName: 'Trần Minh Trọng', rating: 5, comment: 'Bánh mì đen rất ngon!', date: '10/11/2026' }
];

export function renderReviews() {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;
    reviewsList.innerHTML = '';
    reviews.forEach(r => {
        const div = document.createElement('div');
        div.style.cssText = 'padding: 8px 0; border-bottom: 1px dashed #eee;';
        div.innerHTML = `
            <strong>${r.userName}</strong> <span style="color: #f39c12;">${'⭐'.repeat(r.rating)}</span>
            <small style="color: #999; float: right;">${r.date}</small>
            <p style="margin-top: 4px; color: #444;">${r.comment}</p>
        `;
        reviewsList.appendChild(div);
    });
}

export function initReviewEvents() {
    document.getElementById('reviewForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentUser) return alert('Bạn cần đăng nhập để đánh giá!');
        
        const rating = parseInt(document.getElementById('reviewRating').value);
        const comment = document.getElementById('reviewComment').value.trim();
        if (!comment) return alert('Vui lòng nhập nội dung!');

        reviews.unshift({ id: Date.now(), userName: currentUser.name, rating, comment, date: new Date().toLocaleDateString('vi-VN') });
        localStorage.setItem('healthyReviews', JSON.stringify(reviews));
        renderReviews();
        document.getElementById('reviewForm').reset();
    });
}