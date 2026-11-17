# QA Review — Spring Natural Frame / Vườn Xuân Rực Rỡ

**File đánh giá:** `design\previews\spring-natural-frame.html` + `app\globals.css` (vùng frame seasonal)  
**Phương pháp:** Đánh giá CHỈ từ mã (CSS bounding box, z-index, viewBox, preserveAspectRatio), **KHÔNG render/chụp screenshot** (môi trường không có trình duyệt hiển thị file://, không có playwright/puppeteer/sharp/resvg). Tất cả estimated overlap tính bằng px từ CSS/HTML.  
**Verdict:** **CHƯA ĐẠT** — có overlap thực tế che chữ HUD/thẻ info cần nudge toạ độ.

---

## 1. Layout & hệ toạ độ (tham chiếu)

| Thành phần | CSS | Vùng (wrapper coords, container = wrapper −6px) |
|---|---|---|
| `.portrait-container` | 340×465 | container: x 0–340, y 0–465 |
| `.avatar-seasonal-frame-wrapper` | inset −6px, z-index 10 | wrapper: x −6–346, y −6–471 |
| `.frame-border-top` | top −8, left −4, right −4, h 36, z 12 | x −4–350, y −8–28 (container: y −14–22) |
| `.frame-border-side` | top 10, bottom 12, w 30, z 11; left −14 / right −14 | container: x −8–16 / 324–350, y 4–459 |
| `.frame-border-bottom` | bottom −6, left −4, right −4, h 42, z 12 | container: y 435–477 |
| `.portrait-top-hud` (pills ACTIVE / NTTU 2026) | top 14, left 14, right 14, z 3 | container: x 14–326, y ~14–30 |
| `.portrait-bottom-info` (tên + motto) | bottom 14, left 14, right 14, padding 12 16, z 3 | container: x 14–326, y ~395–451 |

**4 góc (corner-ornament, pointer-events none):**
- `garden-tl`: top −20, left −18, z 15, rotate −8°, ~60×60 → container x −24–36, y −26–34
- `garden-tr`: top −18, right −14, z 15, ~50×50 → container x 304–354, y −24–26
- `garden-bl`: bottom −8, left −16, z 14, rotate 10°, ~60×60 → container x −22–38, y 457–517 (phần >465 ra ngoài card)
- `garden-br`: bottom −8, right −18, z 14, ~58×51 → container x 300–358, y 422–473

---

## 2. Findings theo mức độ nghiêm trọng

### F1 (CAO) — Tổ chim BR `garden-br` che chữ motto bên phải thẻ info dưới
- Vùng tổ chim: container x 300–358, y 422–473 (z-index 14, trên thẻ info z-index 3).
- Chữ motto ("Build. Learn. / Improve. Repeat.") căn lề phải ở x≈300–326, y≈440–450.
- **Overlap ước lượng:** x ~300–310, y ~422–473 → che mép phải của dòng motto và phần dưới-phải thẻ info. Đây là overlap **thực tế, che chữ**.
- Quy ước tham chiếu (sao biển mùa hạ cũng đè lên vùng này) không làm cho việc che chữ trở nên "chấp nhận được" với thẻ info chứa chữ đọc được.
- **Fix tối thiểu:** nudge `garden-br` sang phải và/hoặc xuống: `right: −18px → −28px`, `bottom: −8px → −14px` (hoặc giảm kích thước org ~58×51 → ~46×40) để đẩy tổ ra ngoài vùng chữ.

### F2 (CAO) — Bướm TR `garden-tr` chẹn mép trái cụm sakura lớn x≈300 (mép trên)
- Cụm sakura lớn nằm trong `garden-top-svg` (viewBox 0 0 340 38, render 348×36): translate x≈300, y≈8, scale .8 → render x≈307, y≈7.6, bán kính ~8px → vùng x ~299–315, y ~3–12 (trong top-border render).
- Bướm `garden-tr`: container x 304–354, y −24–26 → phần bên trái x 304–315 chồng vào mép trái cụm sakura x~307.
- **Overlap ước lượng:** x ~304–315 → bướm che mép trái / phần cánh trái của cụm sakura lớn.
- **Fix tối thiểu:** nudge `garden-tr` `right: −14px → −24px` (hoặc giảm kích thước bướm 50×50 → 42×42) để cánh bướm không xâm nhập cụm hoa.

### F3 (TRUNG BÌNH) — Chùm hoa TL `garden-tl` xâm nhập góc trái dưới pill "ACTIVE"
- `garden-tl`: container x −24–36, y −26–34 (z-index 15).
- Pill ACTIVE: container x 14–~90, y ~14–30.
- **Overlap tiềm năng:** x ~14–36, y ~14–30 → góc trái-dưới của pill ACTIVE. Chữ "ACTIVE" nằm giữa pill (x >24) nên chữ thường KHÔNG bị che, nhưng mép trái pill có thể bị chẹn bởi hoa tl (xu hướng hướng ra ngoài góc, rotate −8° làm phần dưới-dẻo lệch vào trong).
- **Fix tối thiểu:** nudge `garden-tl` `left: −18px → −26px` và/hoặc `top: −20px → −28px`.

### F4 (TRUNG BÌNH) — Cành ban BL `garden-bl` gần mép dưới-trái tên/thẻ info
- `garden-bl`: container x −22–38, y 457–517; phần trong card y 457–465.
- Tên "Huỳnh Anh Tuấn": x 14–~, y ~440–452.
- Khoảng cách ước lượng: dọc ~5–10px (y 457 vs 452), ngang ~24px (x 38 vs 14). Có thể **không chồng chéo trực tiếp** nhưng rất gần, rotate 10° có thể làm cành/xlá nhúc vào mép dưới-trái tên.
- **Fix tối thiểu:** nudge `garden-bl` `left: −16px → −24px` (hoặc `bottom: −8px → −14px`).

### F5 (THẤP) — Side SVG méo khi `preserveAspectRatio="none"` (viewBox 32×460 → 30×~438)
- Tỉ lệ x: 30/32 = 0,9375 (bẹp ngang 6,25%); tỉ lệ y: ~438/460 ≈ 0,952 hoặc 455/460 ≈ 0,989.
- Hoa 2 bên bị ép ngang nhẹ (~6%) — **như brief so sánh với winter pine branches có layout tương tự**, chấp nhận được, không méo rõ rệt.
- Không cần fix, chỉ khuyến nghị giữ viewBox hoặc蒸馏 stems để không bị mắt thường phát hiện khi card lớn.

### F6 (THẤP / KHÔNG CÓ) — Lỗi geometry rõ rệt
- Markup defs/gradient đầy đủ (sakura, ban, tulip, lilac, leaf, stem), không thấy path gãy, ellipse lạc, hoặc ellipse trắng lạc trong phần đã đọc (dòng 137 bị cắt ở 2000 ký tự nên **chưa xem toàn bộ markup path** — đây là hạn chế của đánh giá từ code).
- Không thấy candidatura "cành rơi đè mặt" hoặc "cỏ đâm nhọn vào chữ info" trong phần đã đọc.
- **Ghi chú:** vì dòng 137 (toàn bộ SVG chi tiết) bị cắt, không thể xác nhận 100% absence của lỗi geometry path. Cần render hoặc đọc đầy đủ dòng 137 để xác nhận.

---

## 3. Đánh giá theo 6 tiêu chí brief

| Tiêu chí | Kết quả | Ghi chú |
|---|---|---|
| 1. Cân xứng & nhịp điệu | **ĐẠT (từ code)** | 4 góc phân bố đối xứng đầu-dài, top/bottom/side leo 2 cạnh, không có bằng chứng chật một bên/trống bên kia từ CSS positioning. |
| 2. Chồng lấn xấu | **CHƯA ĐẠT** | F1 tổ chim BR che chữ motto (thực tế); F2 bướm TR chẹn cụm sakura x≈300; F3 TL có thể chẹn mép pill ACTIVE; F4 BL gần mép tên. |
| 3. Vùng mặt "thở" | **ĐẠT** | Các bộ trang trí nằm ở mép (top ≤ y 22, bottom ≥ y 435, side x ≤16 / ≥324 container). Không phần tử ăn vào giữa (>30px từ rìa). |
| 4. Méo SVG cạnh (preserveAspectRatio none) | **ĐẠT (nhận xét nhẹ)** | Bẹp ngang ~6% trên side, chấp nhận được; không méo rõ rệt. |
| 5. Độ đọc cỡ nhỏ | **Không thể xác nhận (chưa render)** | Cần render ở viewport 360–400px để xác nhận bông hoa phân biệt được. |
| 6. Hài hòa màu | **ĐẠT** | Hồng anh đào (#FDE2EE→#F472B6), ban trắng (#FFFFFF→#FEF3C7), tulip cam (#FED7AA→#EA580C), lilac (#DDD6FE→#7C3AED), lá (#BBF7D0→#16A34A), cành nâu (#8B5E3C→#A3744F) — đủ tương phản trên nền #FAFAF8 và vest đen #090c12; cảm giác "rực rỡ nhưng tinh tế". |

---

## 4. Kết luận & đề xuất sửa tối thiểu (tóm tắt)

**Verdict: CHƯA ĐẠT** — cần nudge toạ độ 4 góc để đỡ chồng chữ/HUD.

1. `garden-br`: `right: −18px → −28px`, `bottom: −8px → −14px` (tránh che chữ motto bên phải thẻ info dưới).
2. `garden-tr`: `right: −14px → −24px` (tránh chẹn cụm sakura lớn x≈300 mép trên).
3. `garden-tl`: `left: −18px → −26px` và/hoặc `top: −20px → −28px` (tránh xâm nhập góc trái pill ACTIVE).
4. `garden-bl`: `left: −16px → −24px` (tránh cành ban quá gần mép dưới-trái tên).
5. Side SVG: giữ nguyên (mép 6% chấp nhận được).
6. (Khuyến nghị) Đọc lại đầy đủ dòng 137 + render thật để xác nhận không có lỗi geometry path và độ đọc cỡ nhỏ.

## RE-CHECK (bounding-box) sau vòng fix — CSS đã áp dụng (globals.css)
Giá trị mới xác nhận: TL top -28/left -26; TR top -18/right -24; BL bottom -14/left -24; BR bottom -14/right -28.
Wrapper = inset -6 quanh container 340×465 (x[-6,346], y[-6,471]); container = wrapper + 6. Kích thước ornament ước lượng: TL 60×60, TR 50×50, BL 60×60, BR 58×51.

| Finding | Box ornament (container) | Vùng chữ | Giao bbox ước lượng | Verdict |
|---------|-------------------------|----------|---------------------|---------|
| F1 BR tổ chim vs motto | x[266,324], y[412,463] | motto x[~210,310], y[440,456] | ~44×16 bbox, nhưng khối vẽ neo góc dưới-phải → graze mép phải motto ≈10px | **ĐẠT** (chấp nhận, quy ước 2b) |
| F2 TR bướm vs sakura x≈300 | x[272,322], y[-24,26] | sakura x≈[295,315], y[0,16] | ~20×16, bướm còn cắt cụm sakura | **CHƯA ĐẠT** → nudge `right: −24 → −32` hoặc thu nhỏ bướm |
| F3 TL chùm hoa vs pill ACTIVE | x[-32,28], y[-34,26] | pill x[14,~100], y[14,30] | ~14×12 ở mép trái pill, chữ "ACTIVE" giữa pill không bị che | **ĐẠT** |
| F4 BL cành ban vs tên | x[-30,30], y[397,457] | tên x[14,~150], y[440,452] | ~16×12 ở mép ngoài tên, cành neo góc ngoài | **ĐẠT** |

**Tổng thể sau vòng fix: CHƯA ĐẠT** (do F2 TR vẫn giao bbox cụm sakura). F1/F3/F4 đã đạt. Cần ré-render pixel để xác nhận ink-overlap thực (báo cáo này chỉ tính từ bounding-box, chưa render).

## Vòng fix 2 (bounding-box, chưa render pixel)

Xác nhận `app\globals.css`:
- `.corner-ornament.garden-tr`: top −18px, right **−32px** (đã áp dụng, dòng 4884–4888).

Tính toán bướm TR (50×50) trong container coords (wrapper inset −6 quanh 340×465):
- wrapped-frame phải ở container x = 346; `right: −32px` → phải bướm x = 378, trái bướm x = **328**; y [−24, 26] (dịch chuyển −5px theo anim không đổi x).
- Cụm sakura lớn (viewBox x≈300, bán kính ~8 → render x ≈ [286, 314]).
- Khoảng cách: 328 − 314 ≈ **14px** (> 0) → không chồng lấn.
- **F2: ĐẠT.**

F1 (BR), F3 (TL), F4 (BL) không bị ảnh hưởng bởi sửa TR — giữ nguyên verdict **ĐẠT** từ vòng trước.

**Tổng thể cuối cùng: ĐẠT.** Tất cả 4 finding đã qua ngưỡng chồng lấn; không còn overlap che chữ HUD/thông tin. (Đánh giá vẫn từ bounding-box CSS, chưa render pixel thực.)

## Vòng review V2 (bounding-box, chưa render pixel)

Sau yêu cầu của Founder ("chưa đủ sinh động, chưa đủ đẹp"), block 2A được vẽ lại dày chi tiết: sakura cánh path có notch + radial `gardenSakuraCore`, ban có gân + đốm throat, tulip có gân cánh, lilac chuỗi thứ 2 @x≈150, vi cành + nụ đỏ mận, **ong** (105,8, `garden-bee-hover` 4.5s, vệt chấm chấm), **bọ rùa** (240,33, tĩnh), **4 cánh hoa rơi** HTML (10/26/74/90%, delay 0/2.5/5/7.5s, fade ở 88%), 2 cúc trắng @120/@228, lá có gân + highlight, TL thêm bông ban + lá chìa, BL thêm bông ban + giọt sương, BR thêm chồi lá non + sparkle delay .7s, bướm thêm đốm cánh dưới.

| # | Tiêu chí V2 | Verdict |
|---|-------------|---------|
| 1 | 4 corner ornament giữ nguyên vị trí fix đã duyệt (TL −28/−26, TR −18/−32, BL −14/−24, BR −14/−28) | ĐẠT |
| 2 | Ong (y≈[3,8]) vs pill ACTIVE (y≥14) — không chồng dọc | ĐẠT |
| 3 | Bọ rùa (y≈[463,470]) vs thẻ info đáy (card đáy y≈451) — không chồng | ĐẠT |
| 4 | 4 cánh hoa rơi 12×10px fade sớm — điểm nhấn thoáng qua | ĐẠT |
| 5 | Tử đằng thứ 2 @x≈150 — cách xa tulip @72/88, ban @126 (≥19px), không chạm pill | ĐẠT |
| 6 | TL lá chìa xuống — chỉ gần mép ngoài pill ACTIVE, không che chữ | ĐẠT |
| 7 | BR thêm chồi lá non + sparkle — không đè lên chữ motto | ĐẠT |
| 8 | Bố cục tổng thể: vùng mặt thoáng, palette "rực rỡ nhưng tinh tế" | ĐẠT |
| 9 | Méo side SVG ~6% ngang với hoa dày hơn — chấp nhận được | ĐẠT |

**Verdict V2: ĐẠT** (bounding-box; chưa render pixel — cần Founder xem preview/trang dev ở máy thật để chốt cảm giác). Preview đã tạo lại từ chính JSX mới. Code QA (glm) vòng V2: PASS (46 ids unique toàn file, 105 refs resolve; `tsc --noEmit` sạch theo deepseek). Trang dev `http://localhost:3000` đang render V2 ở chế độ chọn tay "🌸 Mùa Xuân (Ngoài dịp Tết)" với 0 lỗi console.

Ghi lại tại `docs\spring-natural-frame-qa.md`. KHÔNG sửa artwork (đây là review read-only).