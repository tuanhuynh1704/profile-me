# Visual / Smoke QA — V5 Orbit (2026-11-17)

Ghi chú quy trình: supervl (hy4-flash-free) bị giới hạn step, không chụp được ảnh → Founder/lead kiểm trực tiếp trên dev server. glm (hy4-flash-free) xong Code QA nhưng dừng vì giới hạn step; verdict nguyên văn trong `docs/spring-natural-frame-codeqa.md` mục "V5 Orbit".

Quy trình verify: tab QA riêng (`?qa=6`), 0 lỗi console ở mọi mùa, `tsc --noEmit` sạch, CSS braces cân bằng.

| Mùa | Cách bật | data-festive | frame | canvas | Console | Ghi chú |
|---|---|---|---|---|---|---|
| Đông / Giao mùa (17/11) | mặc định theo ngày | none (window Thu→Đông) | tone-winter | ✅ | 0 | Chụp thực: chân dung tròn + vòng dashed xanh băng xoay + 8 bông tuyết + hạt tuyết rơi ✓ đẹp |
| Xuân Tự Nhiên | menu → Mùa Xuân & Tết → Xuân Tự Nhiên | spring-natural | tone-spring | ✅ | 0 | verify bằng evaluate |
| Tết Âm Lịch | menu → Tết Âm Lịch | tet | tone-tet | ✅ | 0 | verify bằng evaluate (Founder đang thử trực tiếp) |
| Tết Dương Lịch | menu → Tết Dương Lịch | newyear | tone-newyear | ✅ | 0 | pháo hoa spawn ~1.1–2.1s, 72 hạt, fade theo alive-ratio |
| Hạ (Bãi Biển) | menu → Mùa Hạ | beach | tone-summer | ✅ | 0 | cyan sea-glimmer + sao vàng |
| Thu (Lá Phong) | menu → Mùa Thu | autumn | tone-autumn | ✅ | 0 | lá phong lật 3D |

## Ràng buộc đã rà
- Portrait tròn, HUD (ACTIVE/NTTU/tên/motto) nằm trên khung — đúng scaffold `.portrait-stage` (HUD tách ra ngoài).
- Motif SVG nằm trên vòng orbit bán kính 152, viewBox 0 0 340 340, ids prefix `orbit`, `rotate` chậm 96s (`.seasonal-orbit-svg`); vòng dashed CSS xoay 48s.
- Canvas clip tròn (inset 7px, radius 50%); không bleed ra ngoài hình tròn; `pointer-events:none`, `aria-hidden`.
- `prefers-reduced-motion`: global rule killed mọi animation/transition (globals.css cuối file).
- Không tràn ngang: scrollWidth === clientWidth (643/643) trên cửa sổ hẹp.

## Nits cần chốt (từ glm)
1. `SeasonalOrbitCanvas.tsx` đã FIX: bỏ listener visibilitychange đăng ký trùng lặp (giữ 1 chỗ ngay trước RAF loop).
2. `SeasonalOrbitCanvas.tsx` đã FIX: firework burst không còn nằm trong `geoms`/`mats` (tránh double-dispose + mảng phình).
3. Nit còn mở: vòng dashed 48s vs motif ring 96s — khác tốc độ, đọc như parallax có chủ đích; Founder xác nhận.

## Chưa xác nhận
- Pixel-close-up từng mùa trên desktop thật (screenshot bị chặn bởi cửa sổ không visible cả 2 agent).
- Firework fade theo thời gian thực (không chụp được frame giữa chừng).
- Test trên điện thoại thật (viewport emulation không có).

**Verdict (lead, hy4-assisted): ĐẠT tạm thời — cấu trúc, logic, không tràn, 0 lỗi console, mùa nào cũng mount + canvas chạy. Chờ Founder soi cảm nhận + chụp trên máy thật; supervl chuẩn chạy lại khi đủ quota.**
