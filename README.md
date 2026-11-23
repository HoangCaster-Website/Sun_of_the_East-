# Sun of the East

Khi khách bấm **Per WhatsApp bestellen**, máy chủ lưu phiếu và tạo link ngắn dạng `/b/mã-phiếu`. Website mở tin nhắn đã soạn sẵn để khách gửi qua WhatsApp. Chủ quán bấm link trong tin nhắn để mở cửa sổ xem phiếu, chọn khổ 58 mm hoặc 80 mm rồi bấm **Bestellbon drucken**. **Überspringen** đóng cửa sổ xem phiếu.

## Chạy website

Yêu cầu Node.js từ 22.13. Sao chép `.env.example` thành `.env`, rồi chạy:

```sh
npm ci
npm start
```

Mở URL đặt trong `PUBLIC_SITE_URL`. Mặc định là `http://localhost:3000/`.

Khi chạy `npm start`, bản xem trước Live Server trên máy mình ở cổng 5500 hoặc 5501 cũng có thể tạo phiếu qua máy chủ ở cổng 3000. Nút đặt đơn thử mở app WhatsApp với nội dung có sẵn. Nếu trình duyệt không mở được app, lựa chọn mở lại app và mở trong trình duyệt sẽ hiện dưới nút đặt đơn.

Để mở link phiếu trên điện thoại cùng Wi-Fi, đặt `ORDER_LAN_PREVIEW_HOST` thành địa chỉ IPv4 Wi-Fi của máy chạy website. Có thể để trống `PUBLIC_SITE_URL` để dùng IP đó hoặc đặt URL của một tên miền thử nghiệm trỏ về IP này. Khởi động lại máy chủ sau khi sửa cấu hình. Khi đổi mạng, cập nhật địa chỉ Wi-Fi và tên miền thử nghiệm tương ứng.

Để đổi tạm số WhatsApp nhận đơn, đặt `ORDER_WHATSAPP_NUMBER` trong `.env` theo định dạng quốc tế, chỉ dùng chữ số. Bỏ dòng này và khởi động lại máy chủ để đơn quay về số của quán.

Khi triển khai, chạy ứng dụng Node.js với `PUBLIC_SITE_URL` là URL HTTPS mà khách và chủ quán truy cập. Đặt `ORDER_DB_PATH` trên ổ đĩa lưu trữ bền vững để link trong WhatsApp vẫn mở được sau khi máy chủ khởi động lại. Nếu máy chủ chạy sau một reverse proxy, đặt `TRUST_PROXY_HOPS` theo số proxy tin cậy để giới hạn tần suất đặt đơn theo IP.
