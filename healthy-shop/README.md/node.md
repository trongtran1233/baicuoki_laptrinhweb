🥗 HealthyBites - Ứng Dụng Web Đặt Món Ăn Kiêng & Lành Mạnh
HealthyBites là một ứng dụng web Full-stack thương mại điện tử chuyên cung cấp các bữa ăn lành mạnh, đồ ăn kiêng (Keto, Eat Clean, Vegan, Low-Carb) và thức uống detox. Dự án được xây dựng theo kiến trúc Modular ES6 hiện đại, kết hợp sử dụng localStorage để lưu trữ dữ liệu an toàn và linh hoạt.

✨ Các Tính Năng Nổi Bật
1. 👥 Phân Quyền Tài Khoản (Role-Based Access Control)
Khách hàng (User): Có quyền duyệt thực đơn, tìm kiếm món ăn, thêm vào giỏ hàng, áp dụng mã giảm giá, đánh giá sản phẩm, quản lý danh sách yêu thích, xem lịch sử đơn hàng, in hóa đơn và cập nhật hồ sơ cá nhân.

Quản trị viên (Admin): Có quyền truy cập bảng điều khiển quản trị riêng để thống kê doanh thu, quản lý danh sách sản phẩm (CRUD: Thêm, Sửa, Xóa món ăn trực tiếp) và quản lý đơn hàng từ khách.

2. 🛒 Giỏ Hàng & Thanh Toán Mô Phỏng
Quản lý số lượng sản phẩm, tính tổng tiền tự động.

Tích hợp Cổng thanh toán mô phỏng (Hỗ trợ quét mã QR MoMo/ZaloPay, chuyển khoản ngân hàng hoặc COD).

Tự động làm sạch (reset) thông tin số điện thoại, địa chỉ và mã giảm giá sau khi đặt hàng thành công.

3. 🎟️ Hệ Thống Mã Giảm Giá (Vouchers)
Hỗ trợ áp dụng các mã giảm giá theo % (ví dụ: HEALTHY10) hoặc số tiền cố định (BANHMI20K).

4. ⭐ Đánh Giá & Yêu Thích (Reviews & Favorites)
Cho phép người dùng thả tim món ăn yêu thích và viết bình luận, đánh giá (1 đến 5 sao) cho cửa hàng.

5. 🖨️ Lịch Sử Đơn Hàng & In Hóa Đơn
Lưu trữ lịch sử mua hàng cá nhân.

Cho phép xem lại và In hóa đơn trực tiếp (Print Invoice) dưới dạng bản in chuyên nghiệp.

6. ⚙️ Trang Quản Trị Admin (Dashboard & CRUD)
Thống kê doanh thu: Hiển thị tổng đơn hàng, tổng doanh thu và tổng số lượng món ăn đã bán.

Quản lý sản phẩm (CRUD): Thêm món ăn mới, thay đổi giá tiền, danh mục, số calo, hình ảnh và xóa món ăn trực tiếp trên giao diện.

📂 Cấu Trúc Thư Mục Dự Án
Plaintext
healthy-food/
├── index.html               # Giao diện chính (SPA layout)
├── css/
│   └── style.css            # Tệp định dạng giao diện (CSS)
└── js/
    ├── app.js               # Tệp JavaScript điều phối trung tâm
    └── modules/
        ├── auth.js          # Quản lý đăng nhập, đăng ký & phân quyền
        ├── products.js      # Quản lý danh sách món ăn & bộ lọc
        ├── cart.js          # Xử lý giỏ hàng & đặt hàng
        ├── voucher.js       # Xử lý mã giảm giá
        ├── payment.js       # Mô phỏng cổng thanh toán
        ├── orders.js        # Quản lý lịch sử đơn hàng
        ├── invoice.js       # Xử lý xem và in hóa đơn PDF/Web
        ├── reviews.js       # Hệ thống đánh giá sản phẩm
        ├── favorites.js     # Danh sách món ăn yêu thích
        ├── tips.js          # Mẹo sức khỏe ngẫu nhiên
        ├── profile.js       # Quản lý hồ sơ cá nhân
        └── admin.js         # Bảng điều khiển Admin & CRUD sản phẩm
🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án
Yêu cầu hệ thống:

Trình duyệt web bất kỳ (Chrome, Firefox, Edge, Safari).

Trình soạn thảo mã nguồn Visual Studio Code (VS Code).

Cài đặt sẵn tiện ích mở rộng Live Server trên VS Code.

Các bước chạy:

Bước 1: Tải hoặc clone toàn bộ mã nguồn của dự án vào máy tính của bạn.

Bước 2: Mở thư mục dự án bằng Visual Studio Code.

Bước 3: Click chuột phải vào file index.html và chọn "Open with Live Server".

Bước 4: Trình duyệt sẽ tự động mở trang web ứng dụng HealthyBites.

🔑 Tài Khoản Trải Nghiệm Nhanh
Tài khoản Quản trị viên (Admin):

Email: admin@healthy.com

Mật khẩu: admin123

(Khi đăng nhập tài khoản này, giao diện quản trị Admin sẽ tự động hiển thị để bạn thao tác thêm/sửa/xóa món ăn và xem thống kê doanh thu).

Tài khoản Khách hàng (User):

Bạn có thể bấm nút "Đăng Ký" trên giao diện để tự tạo cho mình một tài khoản mới và trải nghiệm đặt món, xem lịch sử đơn hàng, in hóa đơn.

🛠️ Công Nghệ Sử Dụng
Frontend: HTML5, CSS3, JavaScript (ES6+ Modules).

Lưu trữ dữ liệu: Browser localStorage (giúp lưu trữ giỏ hàng, tài khoản, sản phẩm và đơn hàng ngay trên trình duyệt mà không cần Database server phức tạp).