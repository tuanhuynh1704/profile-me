# Brief & Spec — Khung avatar "Vườn Xuân Rực Rỡ" (spring-natural)

> **V2 (2026-11-17, yêu cầu Founder: "chưa đủ sinh động, chưa đủ đẹp")** — xem mục "V2 Addendum" cuối file. Các mục V1 bên dưới vẫn là nền tảng; V2 mở rộng, KHÔNG thay cấu trúc 4 cạnh.

Ngày: 2026-11-17 · Trạng thái: hướng đã duyệt với Founder · Phạm vi: **chỉ khung mùa xuân ngoài Tết** (`.spring-natural-frame`)

## Bối cảnh
- Portfolio single-page, theme sáng tối giản (`#FAFAF8`), chân dung nền đen trong hero card (`.portrait-container`, max-width 340px, aspect 3/4.1, radius 24px).
- Khung viền avatar theo mùa nằm ở `components/SeasonalDeco.tsx` (inline SVG, bọc trong `.avatar-seasonal-frame-wrapper`, `aria-hidden="true"`, `pointer-events:none`) + CSS trong `app/globals.css` (mục "Khung viền avatar theo mùa", ~dòng 4740).
- Hình tham chiếu: avatar hiện tại — cành anh đào mảnh + bướm hồng, khá thưa & đơn điệu so với ảnh chân dung vest đen trang trọng.
- **Không đụng**: khung Đông/Noel, Tết, Tết Dương lịch, Hạ, Thu; logic `SeasonalAvatarDeco` (isSpring/isTetFestive…); HUD corners; layout hero.

## Hướng nghệ thuật (Founder đã chọn): "Vườn Xuân Rực Rỡ"
Chân dung nằm giữa một khu vườn mùa xuân đang nở rộ: lớp lớp hoa anh đào hồng, hoa ban trắng, tulip san-hô/apricot, nhánh tử đằng (lilac), lá non xanh nhiều tầng, hạt sương lấp lánh, một chú bướm. Giàu màu nhưng **có nhịp — cụm hoa xen khoảng thở, tỉ lệ so le, không lặp đều tăm tắp**. Đọc được mùa xuân (tháng 3–4), KHÔNG mang hình tượng Tết (không mai vàng, không bao lì xì, không câu đối).

## Animation (Founder đã chọn: tinh tế, tiết chế)
- Bướm: `butterfly-drift` (đã có sẵn trong globals.css), 6s ease-in-out infinite alternate.
- Đốm sáng (3 cái): `garden-twinkle` (mới, chỉ dao động opacity 0.35↔1, 2.6s alternate, delay so le).
- Chùm hoa TL: `garden-sway` (mới, rotate ±2° rất nhẹ, 7s alternate).
- `prefers-reduced-motion: reduce` đã được xử lý toàn cục trong globals.css — không cần thêm.

## Màu sắc (palette)
| Vai trò | Hex |
| --- | --- |
| Cánh anh đào sáng | `#FDE2EE` (stop đầu gradient) |
| Cánh anh đào | `#F9A8D4` |
| Cánh anh đào đậm | `#F472B6` |
| Nhấn hồng sâu | `#EC4899` |
| Tâm hoa / nhị | `#FBBF24` |
| Hoa ban (trắng) | `#FFFFFF`, throat `#FDE68A`, nhụy `#F59E0B` |
| Tulip (san-hô apricot) | `#FED7AA` → `#FB923C` → `#EA580C` |
| Tử đằng (lilac) | `#DDD6FE` → `#A78BFA` → `#7C3AED` |
| Lá non | `#BBF7D0` |
| Lá giữa | `#4ADE80` |
| Lá đậm | `#16A34A` → `#15803D` |
| Cành/thân | `#8B5E3C` (nhánh phụ: `#A3744F`) |
| Tổ chim (BR) | `#8B5E3C` / `#6B4423`; trứng `#FDE68A` & `#FBCFE8` |
| Bướm | cánh `#F9A8D4`→`#EC4899`, đốm trắng, thân `#831843` |
| Sparkle | `#FFF7ED` |

## Bố cục & hình học (giữ nguyên khung tọa độ hiện có)
- **Top** `viewBox 0 0 340 38`, preserveAspectRatio="none", class `.garden-top-svg`. Cành chính: từ góc TL y≈15 uốn 2 sóng mượt tới rìa phải y≈9; nhánh phụ chẻ lên tại x≈232. Cụm hoa so le (không cách đều): sakura @x≈26 (2–3 bông, scale .8) · tulip đôi @x≈72+88 (nụ, nhô lên) · ban @x≈126 (scale .75) · sakura @x≈172 (2 bông, scale .7) · tử đằng @x≈214 (chùm rủ ngắn, nghiêng) · ban @x≈258 (scale .7) · sakura lớn @x≈303 (scale .9, chạm góc TR). Lá xanh so le chen giữa. 1 sparkle @x≈108 y≈8.
- **Side trái** `viewBox 0 0 32 460`, class `.garden-side-svg`. Thân S-curve stroke `#8B5E3C` 2.2px. 7 cụm so le: sakura (scale .6) / ban / lá / sakura / **tử đằng @y≈235** / ban / sakura — y ≈ 28, 95, 160, 225, 290, 355, 415; lá chìa xen kẽ; 1 sparkle @y≈130.
- **Side phải** `viewBox 0 0 32 460`, class `.garden-side-svg`. Phase lệch so với bên trái: 7 cụm y ≈ 48, 110, 175, 240, 305, 368, 425; có **1 nụ tulip đứng @y≈300** (khác bên trái), 1 sparkle @y≈190.
- **Bottom** `viewBox 0 0 340 44`, class `.garden-bottom-svg`. Gò cỏ: 2 tầng cung cỏ (stroke `#15803D` 3px + nhánh cỏ riêng lẻ vươn so le cao thấp); cánh hoa rơi (4–5 ellipse xoay lệch, hồng/trắng); cụm sakura @x≈66 · ban @x≈172 · sakura @x≈266; cỏ so le giữa các cụm.
- **4 góc** (class mới `.corner-ornament.garden-tl/.garden-tr/.garden-bl/.garden-br`):
  - TL: chùm hoa TL — 1 tulip nở (san-hô) + 1 anh đào + 2 lá, xoay −8°, animation `garden-sway`.
  - TR: bướm vẽ lại — cánh 2 tầng gradient + đốm trắng, thân đốt, râu; ~52px; animation `butterfly-drift`.
  - BL: cành hoa ban trắng (3 bông trên nhánh chia đôi) + 2 cánh hoa rơi, xoay +10°.
  - BR: tổ chim nhỏ — cung twig đan chéo (stroke nâu), 2 trứng gradient (`#FDE68A`, `#FBCFE8`) có đốm, 1 sparkle nhỏ.
- Vùng giữa chân dung phải thoáng, không phần tử nào tràn vào quá 30px từ rìa.

## Quy ước kỹ thuật
- Inline SVG trong JSX (như hiện tại), không raster, không font/text trong SVG.
- Gradient/filter ids **phải unique toàn document**, tiền tố `garden` (vd `gardenSakuraGrad`, `gardenTulipGrad`, `gardenBanGrad`, `gardenLilacGrad`, `gardenLeafGrad`, `gardenLeafDeepGrad`, `gardenStemGrad`, `gardenButterflyGrad`, `gardenEggGoldGrad`, `gardenEggPinkGrad`). Không tái sử dụng id cũ (`sakuraPinkGrad`…) — block cũ sẽ bị thay hoàn toàn.
- Giữ nguyên `viewBox`/`preserveAspectRatio`/class `.frame-border-top|side|bottom` (CSS layout phụ thuộc), thêm class svg mới `.garden-*-svg` (width/height 100%).
- Corner ornaments giữ class `.corner-ornament` + class vị trí mới; `pointer-events:none` kế thừa.
- Drop-shadow/filter dùng tiết chế (feDropShadow hoặc CSS filter), không phủ kín hoa.
- `<title>/`<desc>` KHÔNG cần trong block này vì wrapper `aria-hidden="true"` (trang trí thuần túy).

## Out of scope
- Các khung mùa khác & hiệu ứng nền (Atmosphere), phần khác của `globals.css`, theme sáng/tối, layout hero.
- Không thêm phụ thuộc mới, không đổi `package.json`.

## Definition of done
1. `components/SeasonalDeco.tsx`: block spring-natural mới, các block khác nguyên vẹn (diff chỉ chạm vùng 2A + không cần import mới).
2. `app/globals.css`: thêm `.garden-*-svg`, `.corner-ornament.garden-*`, `@keyframes garden-sway`, `@keyframes garden-twinkle` (trong vùng CSS khung avatar).
3. Render thực tế trong browser (hoặc preview static `design/previews/spring-natural-frame.html`) được **nemotron-supervl duyệt đạt** (cân xứng, không chồng lấn, đọc tốt ở cỡ nhỏ).
4. **glm duyệt đạt**: XML well-formed, ids unique, viewBox hợp lệ, không ref hỏng.
5. Preview static (nếu tạo) nằm `design/previews/`, trỏ tới `../../public/avatar.jpg`.

---

# V2 Addendum — "Vườn Xuân Rực Rỡ" bản sống động (2026-11-17)

Founder: "chưa đủ sinh động, chưa đủ đẹp, làm nó đẹp hơn nữa, chi tiết hơn nữa". Phạm vi: **chỉ làm dày phần trang trí + thêm chuyển động nhẹ**, giữ nguyên: viewBox, class layout (`.frame-border-*`, `.corner-ornament.garden-*`), palette nền tảng, 4 góc đã duyệt (vị trí fix vòng QA giữ nguyên), các khung mùa khác.

## Thêm mới
1. **Hoa có khối & thật hơn**:
   - Sakura: cánh vẽ bằng path (có notch giữa cánh), gradient hướng tâm (tâm ấm trắng → hồng mép `gardenSakuraGrad` thành radial cho nhân + rim hồng đậm `#EC4899` opacity thấp); mỗi bông thêm 3 chấm nhị vàng + nhụy hồng sâu.
   - Ban (hoa ban trắng): cánh trắng với gân cánh cong (stroke `#E7D8B0`) + đốm hồng nhạt ở throat.
   - Tulip: thêm đường gân cánh (2 path mảnh `#FFF7ED` opacity .6), mép cánh ngoài đậm `#EA580C` rõ hơn.
   - Lilac: chuỗi rủ dài hơn, 12–14 nụ, 2 cỡ, thêm vài hạt phẤn tím trắng; đặt ở 2 vị trí (x≈211 như cũ + x≈150 rủ từ nhánh phụ).
   - Lá: thêm gân giữa (đã có) + highlight ellipse nhỏ opacity .5; 2 cỡ lá (nhỏ cho kẽ, lớn cho chùm).
2. **Cành chính**: thêm 2–3 vi cành chẻ khỏi thân chính (stroke `#A3744F` 1.2px), 3–4 nụ đỏ mận nhỏ trên ngọn (chấm `#BE185D`).

## Thêm sinh vật
3. **1 chú ong nhỏ** đang bay quanh cành tullip trên mép trên (vùng x≈95–115, y≈2–12): thân sọc vàng-đen 2 vạch, cánh ellipse trắng opacity .8 có vân, râu; class `garden-bee`, animation `garden-bee-hover` (hover lơ lửng ±2px + nghiêng nhẹ, 4.5s alternate) + vệt bay chấm chấm (`stroke-dasharray="1.5 3"`, opacity .35).
4. **1 con bọ rùa** đậu trên gò cỏ mép đáy (x≈240, y≈33): vỏ đỏ `#DC2626`, 3 chấm đen + vạch giữa, đầu+chấm trắng 2 mắt; tĩnh (không animation).
5. **Cánh hoa rơi**: 4 span HTML (không phải SVG) `.garden-petal-fall` với inline SVG cánh sakura nhỏ (12×10, gradient hồng), absolute trong wrapper, animation `garden-petal-fall` (rơi từ trên xuống đáy + xoay 300° + fade in/out, 9–12s, delay so le 0/2.5/5/7.5s, lặp vô hạn). Vị trí ngang: 10%, 26%, 74%, 90% (mép hai bên, vùng mặt hạn chế tối đa). Tôn trọng reduced-motion (global rule đã có).

## Thêm chi tiết nền tảng
6. **Méo đáy**: 2 bông cúc trắng nhỏ (8 cánh ellipse + tâm `#FDE047`/`#F59E0B`) @x≈120 và x≈228; thêm 4–5 nhánh cỏ non cao vòm hơn.
7. **Mép trên**: 1 chuỗi tử đằng rủ thứ 2 @x≈150 (scale .6, xoay −12°); thêm 2 sparkle nữa với twinkle delay .5/1.3s (tổng 3 sparkle cũ giữ nguyên).
8. **Góc TL**: thêm 1 bông ban nhỏ (scale .8) vào chùm + 1 lá chìa dài xuống trên pill (rất nhẹ, không che chữ ACTIVE).
9. **Góc BL**: thêm 1 bông ban nữa (tổng 4) + 1 giọt sương (circle trắng opacity .8 + highlight) trên lá.
10. **Góc BR**: thêm 1 cành lá non vươn khỏi tổ (nhánh lá mới từ twig, trỏ lên phải) + 1 sparkle twinkle delay .7s.
11. **Corner TR (bướm)**: thêm cho bướm đôi cánh dưới đốm trắng nhỏ (opacity .6) — giữ nguyên hình khối & vị trí đã duyệt (right:-32px).

## Cập nhật kỹ thuật
- Gradients/radial mới đều prefix `garden`: `gardenSakuraCore`, `gardenBloomRim`, `gardenPetalGrad`, `gardenDaisyGrad`, `gardenBeeBody`, `gardenWingGrad` (có thể là linearGradient/radialGradient, tuỳ bạn).
- Keyframes mới trong globals.css: `garden-bee-hover`, `garden-petal-fall`. `.garden-bee`, `.garden-petal-fall` classes. Không animation mới nào khác.
- Preview `design/previews/spring-natural-frame.html` phải được TẠO LẠI từ JSX mới (phương pháp transpile + renderToStaticMarkup như lần trước, rồi xóa script tạm).
- `docs/spring-natural-frame-qa.md` + `-codeqa.md` sẽ được cập nhật verdict sau.

## Definition of done (V2)
1. Block 2A dày chi tiết hơn nhưng cùng bố cục; vùng giữa chân dung vẫn thoáng (không phần tử nào vào >30px từ rìa).
2. `tsc --noEmit` sạch; dev server 0 lỗi console.
3. Supervl: ĐẠT (bounding-box) — các corner ornament vẫn giữ vị trí fix vòng trước; ong/bọ rùa/cánh rơi không chồng chữ HUD.
4. glm: PASS — ids unique, refs resolve, CSS hợp lệ, không lỗi JSX.
5. Preview tạo lại từ JSX thật.

---

# V3 Addendum — Cành & nhánh cây (2026-11-17)

Founder: "chưa đủ wow, hoa bướm tạm ok, cành cây nhánh cây chưa đẹp". Phạm vi: **CHỈ phần gỗ (branches/twigs/vines) trong block 2A** — KHÔNG đổi hoa, lá (chỉ thêm gân nếu cần khớp gỗ), bướm, ong, bọ rùa, corner ornaments, cánh rơi, palette nền tảng, viewBox, class layout, vị trí 4 góc, animation đã duyệt.

## Vấn đề của V2
- Thân/cành là **stroke đều bề rộng** (2.4px / 2.2px) — trông như dây; `gardenStemGrad` là gradient ngang không tạo khối cho cành dọc; vi cành là đoạn cụt ~2px không có cấu trúc nhánh thật; 2 cung đáy cũng stroke đều; không vân vỏ, không mắt gỗ, không xoắn ngọn.

## Thiết kế V3 — "gỗ có khối"
1. **Nhánh chính mép trên → silhouette thuôn dần** (filled path, KHÔNG stroke): mép trái off-screen, thuôn về mép phải; base ~6.5px → giữa ~4.5px → ngọn ~3.2px. Gradient dọc `gardenBranchGrad` (y: 0% `#B98A5C` sáng ngọn-trên → 38% `#8B5E3C` → 78% `#5C3A21` → 100% `#3A2412` tối mép-dưới) tạo khối ống 3D.
2. **Cây vi cành thật (3)**, rẽ từ thân chính ở góc 28–42°, thuôn 1.8→0.6px, mỗi cái "ôm" đúng 1 cụm hoa phía trên (đích: tullip @72, ban @126, lilac @150): path thuôn + đầu cong móc nhẹ (curl 1 vòng xoắn ~270°, bán kính ~2.2px). Nhánh phụ @x≈228 kéo dài hơn + xoắn ngọn lớn (2 vòng xoắn) ở (262,2).
3. **Thân 2 bên** → silhouette thuôn (top ~3px → giữa ~2.2px → đáy ~1.4px) + gradient ngang `gardenBranchSideGrad` (x: 0% `#3A2412` tối trái → 30% `#6B4423` → 60% `#8B5E3C` → 82% `#A3744F` → 100% `#B98A5C` sáng phải — sáng từ phải như nguồn sáng top-left chung scene? KHÔNG — nguồn sáng từ trên-trái: bên trái sáng. Đảo: 0% `#B98A5C` → 30% `#A3744F` → 62% `#6B4423` → 100% `#3A2412`).
4. **Vi cành bên** (3/bên, thuôn 1.2→0.5px): mỗi bên từ thân rẽ ra hướng đúng cụm hoa gần nhất (trái: y≈96 ban, y≈215 sakura, y≈330 ban; phải: y≈110 ban, y≈240 ban, y≈301 tulip bud) — tạo cảm giác "hoa mọc trên cành".
5. **2 cung đáy** → crescent thuôn (dưỡng 2 đầu nhọn) thay stroke; cung trên tone sáng hơn cung dưới.
6. **Vân vỏ & chi tiết**: 1–2 nét highlight mảnh (stroke `#C99B6A` opacity .55, width .6) chạy dọc mép trên nhánh chính + 1 nét tương tự mỗi thân bên; 2 "mắt gỗ" (ellipse `#3A2412` + viền `#6B4423`, rx 1.5/ry 1.0): 1 trên nhánh chính (x≈168 y≈13), 1 trên thân phải (y≈300); vài đốm vỏ nhỏ (dot `#4A2E18` opacity .6).
7. **Mép trên phải**: giữ nhánh phụ @232 → kéo xoắn 2 vòng ngọn ở (260,1.5); thêm 1 cành xuôi nhỏ rơi từ ngọn phải (x≈315, rủ xuống ~9px, có 1 chiếc lá nhỏ) — "tóc" mềm mại.
8. **8 cánh hoa rơi / hoa / sinh vật** giữ nguyên vị trí (không động).

## Kỹ thuật
- Tất cả phần gỗ mới là **filled paths** (trừ các nét highlight mảnh là stroke ≤ .8px).
- Gradient mới prefix `garden`: `gardenBranchGrad`, `gardenBranchSideGrad`, (tùy chọn `gardenBranchCrescentGrad`). Không đổi id cũ.
- Paths phải cân đối, không tự cắt nhau, nằm trong viewBox/biên rìa cho phép (nhánh có thể tràn khỏi viewBox ở mép ngoài — như V1/V2).
- Preview `design/previews/spring-natural-frame.html` tạo lại từ JSX mới; xóa script tạm.

## Definition of done (V3)
1. `tsc --noEmit` sạch; grep 5 khung khác + spring-natural markers còn nguyên.
2. glm: PASS (ids unique, refs resolve, XML ok, corner rules không động).
3. supervl: ĐẠT — cây gỗ đọc được dạng khối 3D thuôn ngọn, rõ cấu trúc nhánh; không đè chữ HUD/info; méo cạnh 6% vẫn chấp nhận.

---

# V4 Addendum — Three.js layer (2026-11-17)

Founder: "tôi muốn kết hợp cả SVG và Three.js để làm khung viền sống động hơn, tốt hơn khi chỉ dùng đơn lẻ SVG". Deepseek (free limit) → chuyển vai thiết kế sang model free khác (flint-40b-free).

**Kiến trúc lai SVG + WebGL:** SVG tiếp tục giữ vai trò "họa tiết mỹ thuật" (cành kẽ lá, corner ornaments, gỗ V3); lớp Three.js được chèn vào trong `.wrapped-frame.spring-natural-frame` (z-index 13, `pointer-events: none`, `aria-hidden`), chỉ hiện khi khung xuân-tự-nhiên đang bật (SSR không render → `three` không vào initial bundle; `await import("three")` trong useEffect).

**Các thành phần 3D (canvas full-wrapper):**
- **24 cánh anh đào 3D** (PlaneGeometry 3.4×4.2, MeshStandardMaterial map CanvasTexture cánh vẽ 5 khía hồng gradient, DoubleSide, transparent .96), rơi từ trên xuống: vy −3.2±1.8 u/s, lắc ngang sin (amp 1.5–3.5), tự xoay tumble 3 trục, scale .8–1.3; respawn khi chạm đáy.
- **36 hạt phấn/lấp lánh** (Points, AdditiveBlending, soft-dot texture #FFE9B0, opacity .85), trôi chậm lên trên, respawn.
- **Ánh sáng**: HemisphereLight (hồng phấn/đen) + DirectionalLight trắng chéo + AmbientLight nhẹ — cánh hoa có khối thật khi lật.
- **Parallax**: pointermove trên vùng hero → camera lệch ±2.2 X / ±1.4 Y, lerp .06; lookAt giữa khung. Giới hạn nhỏ, không gây say.
- **Hệ số an toàn**: DỪNG hoàn toàn khi `prefers-reduced-motion: reduce`; pause khi tab ẩn (visibilitychange); pixelRatio ≤ 2; dispose toàn bộ renderer/geometry/material/texture khi unmount; ResizeObserver đồng bộ kích thước.

**Kỹ thuật:** file mới `components/SpringPetalCanvas.tsx`; `npm i three @types/three`; wrapper div `.spring-petal-canvas-host` (inset 0, z 13, overflow hidden, pointer-events none); block spring-natural kết thúc bằng `<SpringPetalCanvas />` ở cuối. SVG giữ nguyên mọi phần đã duyệt (V1 gốc hoa/bướm + V2 chi tiết + V3 gỗ mới).

**DoD V4:** tsc sạch; grep 5 khung khác nguyên; dev server `http://localhost:3000` chuyển "🌸 Mùa Xuân (Ngoài dịp Tết)" render canvas đúng, 0 lỗi console; supervl duyệt (geometry SVG + vị trí canvas trong wrapper); glm duyệt (TS, ids, leak refs, cleanup); preview static chỉ chứa SVG (ghi chú rõ Three.js không hiện trong preview tĩnh).
