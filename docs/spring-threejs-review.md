# Review — Khung "Xuân Tự Nhiên" nâng cấp SVG + Three.js

Ngày: 2026-11-17 · Người: lead (Inkling 2 Small) · Trạng thái: **chờ 1 lệnh npm từ Founder** · Phạm vi: chỉ `.spring-natural-frame` (ngoài Tết)

## 1) Bối cảnh & câu hỏi
Founder hỏi: có nên kết hợp **SVG + Three.js** thay vì chỉ SVG (hiện V1–V3) cho khung xuân ngoài lễ không? Verdict sau khi xem code + trang thật:

**CÓ — phương án hybrid hợp lý**, với bộ "phanh" bắt buộc phía dưới. Nếu không cài được `three`, Founder đã chốt fallback: vẫn làm Three.js (không làm canvas-2D), nên bước chặn duy nhất là dependency.

## 2) Hiện trạng đã verify (2026-11-17, dev server localhost:3000)
- V1–V3 (hoa/bướm/ong/bọ rùa/cành gỗ V3) đã có trong `components/SeasonalDeco.tsx` (block 2A, ~dòng 690–1166), `app/globals.css` đã có `.garden-*` + `.garden-petal-fall`.
- Trang load 200, **0 lỗi console**; khung spring-natural render đúng khi chọn "🌸 Mùa Xuân → Xuân Tự Nhiên".
- `three` **chưa cài** (`node_modules/three` không tồn tại, không có trong package.json).
- Shell trong phiên này **bị permission deny với `npm install`** → lead không tự cài được dependency.

## 3) Đánh giá phương án

### Ưu điểm
- Cánh hoa 3D (khối + lật + ánh sáng) và hạt phấn additive-blend cho cảm giác "sống" trên chân dung nền tối — thứ SVG/CSS phẳng không đạt (cánh rơi hiện tại là sprite 12×10px xoay phẳng).
- Giữ 100% phần SVG đã QA duyệt (V1 hoa/bướm → V3 cành gỗ) → Three.js chỉ là lớp trang trí.
- `dynamic import("three")` trong `useEffect` → **không** vào SSR/initial bundle; chỉ tải khi khung xuân thực sự bật.
- Các khung mùa khác (đông/Tết/Hạ/Thu) không bị ảnh hưởng, không thêm rủi ro cho chúng.

### Rủi ro & phanh bắt buộc (đã đưa vào implementation)
- Bundle +~150–160KB gzip (chỉ chunk riêng, chỉ mùa xuân) — cần Founder chấp nhận; chỉ mục tiêu "wow", không thêm cho page nào khác.
- Hai hệ animation (CSS + WebGL) cần bảo trì song song; phần 3D không thay thế SVG mà bổ sung.
- GPU yếu: giảm tải trên coarse pointer / màn <640px (12 cánh + 18 hạt phấn, tắt parallax), pixelRatio ≤ 2.
- `prefers-reduced-motion: reduce` → component không vẽ gì, host ẩn (CSS `@media reduce` đã thêm).
- Pause khi tab ẩn (`visibilitychange`), reset delta khi resume — không nhảy khung hình.
- Dispose đầy đủ geometry/material/texture/renderer + `forceContextLoss()` khi unmount — chống rò bộ nhớ.
- `ResizeObserver` đồng bộ kích thước wrapper; camera parallax ±2.2 X / ±1.4 Y, lerp 0.06 (không gây say).
- Host: `.spring-petal-canvas-host` — absolute inset 0, z-index 13 (trên ảnh, dưới corner ornaments), `pointer-events:none`, `aria-hidden` → không che chữ HUD/info, không nuốt sự kiện.

### Phương án thay thế đã xét (không chọn)
- **Canvas 2D thuần** (~5–8KB tự viết): rẻ, 0 dependency, đạt ~80% hiệu ứng. Founder đã chốt: không lấy nhánh này, ưu tiên Three.js.
- **Giữ SVG/CSS thuần**: an toàn nhất nhưng không đạt yêu cầu "sống động hơn".
- **WebP/video petals**: rối, khó responsive, file nặng — loại.

## 4) Những gì ĐÃ làm trong phiên này
1. `app/globals.css`: thêm `.spring-petal-canvas-host` (+ `@media prefers-reduced-motion` ẩn host) — pure insertion cạnh block `@keyframes garden-petal-fall`, không đụng rule cũ.
2. `design/staging/SpringPetalCanvas.tsx.txt`: component Three.js **hoàn chỉnh** (24 cánh PlaneGeometry + CanvasTexture cánh tự vẽ 5 khía, 36 điểm hạt phấn AdditiveBlending, Hemisphere/Directional/Ambient light, parallax lerp, ResizeObserver, visibilitychange pause, reduced-motion off, low-power mode, dispose sạch). **Chưa wire** — cố tình: file chưa thể compile chừng nào `three` chưa cài (Turbopack/tsc đều không resolve `import("three")`).
3. Xác nhận lại hành vi mặc định **theo ngày** (Founder trả lời #2): fresh load → `data-season="transition"`, base `winter`, chip "Giao Mùa: Thu ➔ Đông", theme dark — đúng kỳ vọng (17/11 nằm trong cửa sổ 08–20/11).

## 5) Những gì CHƯA làm / cần Founder
**Bước chặn**: chạy 1 lệnh trên máy có quyền npm (repo root):

```powershell
npm i three @types/three
```

Sau đó (lead làm tiếp trong phiên sau, hoặc Founder chạy):
```powershell
Move-Item design/staging/SpringPetalCanvas.tsx.txt components/SpringPetalCanvas.tsx
```
Rồi wire vào `components/SeasonalDeco.tsx` (2 chỗ):
1. Trên đầu file: `import SpringPetalCanvas from "./SpringPetalCanvas";`
2. Cuối block `{isSpring && !isTetFestive && (...)}` — ngay trước `</div>` đóng của `.wrapped-frame spring-natural-frame` (sau cụm `.garden-petal-fall`): thêm `<SpringPetalCanvas />`
3. `npx tsc --noEmit` = sạch; dev server không lỗi console; chọn "🌸 Mùa Xuân → Xuân Tự Nhiên" → kiểm canvas + screenshot; **QA bắt buộc**: supervl (visual) + glm (code). Preview tĩnh KHÔNG hiện Three.js (ghi chú cho Founder).

## 6) Definition of done (khi enable)
1. `tsc --noEmit` sạch; grep 5 khung mùa khác còn nguyên.
2. Chọn tay Mùa Xuân → Xuân Tự Nhiên: canvas full-wrapper, cánh rơi mượt, hạt phấn lấp lánh, 0 lỗi console.
3. Desktop: parallax hoạt động, không che chữ HUD/info; tab ẩn → animation dừng; unmount → không rò context.
4. Mobile (coarse pointer / <640px): 12 cánh + 18 hạt phấn, không parallax; không tràn ngang.
5. supervl: ĐẠT · glm: PASS.
