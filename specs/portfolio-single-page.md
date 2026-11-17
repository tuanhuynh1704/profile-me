# Spec: Portfolio một trang (Next.js)

## MỤC TIÊU
Trang portfolio cá nhân dạng single-page: đơn giản, hiện đại, chuyên nghiệp.
Nội dung THẬT lấy từ GitHub công khai @tuanhuynh1704 (Huỳnh Anh Tuấn).
Email/SĐT/địa điểm không công khai — liên hệ qua GitHub/LinkedIn (không hiển thị form/email).

## PHẠM VI (IN SCOPE)
- Next.js (App Router) + TypeScript, 1 trang duy nhất (`/`).
- Các section: Header/Nav (sticky, smooth scroll), Hero, About, Skills, Projects, Contact, Footer.
- Nội dung tập trung 1 file (`lib/data.ts`) để dễ chỉnh sửa.
- Responsive (mobile-first), mobile nav dạng hamburger/toggle (đóng bằng Escape).
- Accessibility: semantic HTML, aria-label, focus-visible, prefers-reduced-motion.
- SEO: `metadata` trong `app/layout.tsx` (title, description, openGraph), lang="vi".
- Liên hệ: nút link GitHub/LinkedIn (email không công khai, không có form/backend).
- Hiệu ứng: reveal on scroll, gradient nền hero, text gradient, hover glow (CSS + IntersectionObserver).
- CSS thuần: `app/globals.css` (+ CSS modules nếu cần cho component). KHÔNG Tailwind, KHÔNG UI lib, KHÔNG dependency mới ngoài next/react/react-dom/typescript.

## NGOÀI PHẠM VI (OUT OF SCOPE)
- Backend/API route gửi email, CMS, i18n, blog, form liên hệ (email không công khai → dùng link GitHub/LinkedIn).
- Dark mode; animation library (hiệu ứng làm bằng CSS + IntersectionObserver thuần).

## QUYẾT ĐỊNH CẦN FOUNDER
- Deploy/hosting (Vercel/khác) — chưa làm trong task này.
- Có công khai email không (hiện form liên hệ đã thay bằng link social).

## TIÊU CHÍ HOÀN THÀNH (DONE)
- `npm install` OK, `npm run build` pass (production build), `npm run dev` chạy được.
- Không lỗi TypeScript, không lỗi console nghiêm trọng.
- Lighthouse-ish: semantic, alt/aria đầy đủ, responsive tốt ở 375px và 1280px.
- Sửa dữ liệu chỉ cần đổi `lib/data.ts`.

## GHI CHÚ
- Dữ liệu đã được thay bằng thông tin thật từ GitHub @tuanhuynh1704 (2026-11-16).
