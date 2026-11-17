# Design: Portfolio single-page — minimal light, professional

## Hướng thiết kế
- Tối giản, nền sáng (off-white `#FAFAF8` / `#FFFFFF`), chữ gần đen `#1A1A1A`, một màu nhấn duy nhất (indigo `#4F46E5`).
- Typography: system font stack (không dùng Google Fonts để tránh phụ thuộc network lúc build). Heading đậm, tight letter-spacing; body 16-17px, line-height 1.6-1.7.
- Khoảng trắng rộng, max-width container ~1080px, section padding dọc ~80-96px.
- Đường kẻ 1px `#E5E5E0` ngăn section khi cần; bo góc 12-16px; shadow rất nhẹ, tinh tế.

## Layout từng section
1. **Header**: sticky, blur nền khi scroll (backdrop-filter), logo = monogram "NV" (mẫu), nav phải: About / Skills / Projects / Contact. Mobile: nút hamburger toggle menu dọc.
2. **Hero**: 2 cột (text trái, monogram card phải) trên desktop; xếp dọc trên mobile. Tên lớn, chức danh ("Full-stack Developer"), tagline 1 câu, 2 CTA: "Xem dự án" (solid) + "Liên hệ" (ghost/outline). Social icons (GitHub/LinkedIn/Email) dạng SVG inline.
3. **About**: 2 cột — đoạn giới thiệu + danh sách "quick facts" (vị trí, kinh nghiệm, ngôn ngữ, học vấn mẫu).
4. **Skills**: nhóm theo cụm (Frontend / Backend / Tools), hiển thị dạng chip bo tròn viền mảnh.
5. **Projects**: grid 3 cột (1 cột mobile), card: thumbnail gradient + tên + mô tả ngắn + tech chips + link GitHub/Live. 3 dự án mẫu thực tế (dashboard analytics, e-commerce, task manager).
6. **Contact**: 2 cột — thông tin liên hệ (email, phone, location, socials) + form (name/email/message, validate client, submit → mailto). Ghi chú nhỏ "Form mở ứng dụng email của bạn".
7. **Footer**: © 2026 + monogram + link "Back to top".

## Nguyên tắc
- Một accent color xuyên suốt; không gradient loè loẹt; không emoji trong UI.
- Focus-visible ring rõ ràng (accessibility). `prefers-reduced-motion: reduce` tắt transition.
- Mọi interactive element có hover state nhẹ (translateY(-2px)/đổi màu), transition ~200ms.
