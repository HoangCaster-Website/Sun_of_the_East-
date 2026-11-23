# Sun of the East

Khi khách bấm **Per WhatsApp bestellen**, trình duyệt tạo link phiếu dạng `/#b=…` rồi mở cửa sổ WhatsApp với nội dung đơn và link. Chủ quán bấm link để xem đúng đơn và chọn **Bestellbon drucken** để in khổ 80 mm. **Überspringen** đóng cửa sổ xem phiếu.

## GitHub Pages

Trang in của bản xuất bản nằm tại [GitHub Pages của Sun of the East](https://hoangcaster-website.github.io/Sun_of_the_East-/). Dữ liệu phiếu nằm trong phần sau dấu `#` và được đọc trên trình duyệt. Người có link xem được phiếu. Mã món lấy theo danh mục cố định trong `js/order-link-catalog.js`. Phiếu lưu thêm giá đã thay đổi và tên của các món mới để giữ đúng nội dung đơn tại lúc đặt. Các link cũ dạng `#bon1=…` vẫn đọc được.

Xuất bản cùng phiên bản của `index.html`, `bon-drucken.html` và thư mục `js` lên GitHub Pages. Có thể chạy thử bằng Live Server. Khi mở bản xem trước qua HTTP, link dùng địa chỉ bản xem trước để kiểm thử. Khi mở website qua HTTPS, link trỏ tới trang in GitHub Pages. Nút **WhatsApp öffnen** dưới giỏ hàng mở lại bản nháp khi trình duyệt chặn popup.

## Phiếu đã tạo từ máy chủ Node.js

Các link cũ dạng `/b/mã-phiếu` tiếp tục được mở trên máy chủ đã tạo phiếu. Giữ cơ sở dữ liệu `ORDER_DB_PATH` của máy chủ đó và chạy `npm ci`, rồi `npm start` với cấu hình `.env` hiện có khi cần truy cập phiếu cũ. Máy chủ này yêu cầu Node.js từ 22.13.
