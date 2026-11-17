# Code QA — Khung avatar "Vườn Xuân Rực Rỡ" (spring-natural)

Ngày: 2026-11-17 · Người thực hiện: Gesign/glm (agent) + lead chốt · Verdict: **PASS WITH NITS** → các nit được xử lý bên dưới.

Môi trường: Windows, Python 3.11.0, Next.js 16 + React 19, `tsc --noEmit` sạch (deepseek, lần splice).

## Kết quả từng mục

1. **Well-formed XML/JSX — PASS.** Block 2A (~dòng 237–510, giữa marker `2A.` và `2B.`): braces/parens cân; 8 SVG parse sạch bằng `xml.etree.ElementTree` sau normalize.
2. **Ids unique toàn document — PASS.** 38 ids, 0 trùng lặp. Block 2A định nghĩa đúng **22 ids, 100% prefix `garden`** (8 gradient + 8 template `<g id>` + 2 butterfly + 4 nest). Legacy ids các khung khác giữ nguyên.
3. **Refs resolve — PASS.** 76 refs (`url(#…)` + `href="#…"`) trong block 2A đều resolve; toàn bộ target là garden ids. Không dùng `xlink:href`.
4. **ViewBox — PASS.** Top `0 0 340 38` · Sides `0 0 32 460` ×2 · Bottom `0 0 340 44`; đủ `preserveAspectRatio="none"`; `.frame-border-top|side|bottom` trong globals.css:4754–4786 nguyên vẹn.
5. **Hygiene — PASS.** Wrapper `aria-hidden="true"`; block 2A không `<text>`/`<image>`/`<foreignObject>`/handler; class TSX↔CSS khớp đầy đủ (`.garden-top-svg`, `.garden-side-svg`, `.garden-bottom-svg`, `.garden-sparkle`, `.corner-ornament.garden-*`, keyframes `garden-sway`/`garden-twinkle`); CSS dùng `butterfly-drift` (có sẵn tại globals.css:5325).
6. **globals.css — PASS.** Section mới sau `@keyframes starfish-float` (dòng 4868–4917): pure insertion 50 dòng, 0 xóa; braces cân; mọi `animation:` đều có `@keyframes` tương ứng; không đè rule cũ.
7. **Preview `design/previews/spring-natural-frame.html` — PASS.** Well-formed; đúng 8 SVG; đúng 22 garden ids; 84 refs resolve; census khớp expansion `.map` (ban 4, sakura 6, grass 16, petals 5); không sót expression JSX.
8. **tsc** — PASS (`npx tsc --noEmit`, không output lỗi).
9. **Các khung khác — PASS (spot-check).** Winter (75–231), Tết (512–632), Tết Dương lịch (634–738), Hạ (744–847), Thu (853–933) nguyên vẹn, không nhiễm id `garden*`.

## Nits / lưu ý

- ⚠️ **Cross-SVG `<use>`**: cạnh/đáy/góc tham chiếu template trong `<defs>` của SVG mép trên qua `href` — hợp lệ trong cùng document HTML (76 refs resolve OK), nhưng sẽ gãy nếu sau này tách các SVG ra render độc lập. Giữ nguyên, ghi chú cho các khung mùa sau.
- `public/avatar.jpg` tồn tại (đã đọc/verify).
- Script tạm `scripts/check_spring_frame_qa.py` (glm tạo để tự kiểm) đã được yêu cầu xóa.
- Preview dùng `../../public/avatar.jpg` (tương đối từ `design/previews/`) — đúng.

## Phạm vi verify

`git status --porcelain` tại thời điểm QA: `M app/globals.css`, `M components/SeasonalDeco.tsx`, `?? design/previews/`, `?? design/spring-natural-frame.md`. Commit gốc `9482f51`. Diff TSX gói trong 1 hunk từ dòng 235; CSS pure insertion 50 dòng.

## Chưa chứng minh được bằng render

QA hình pixel KHÔNG thể thực hiện trong môi trường này (built-in browser không mở file://, screenshot API báo tab không visible, node_modules không có playwright/puppeteer/sharp/resvg). Xem `docs/spring-natural-frame-qa.md` (đánh giá hình học bounding-box) — verdict CHƯA ĐẠT đã được fix ở vòng sau (nudge 4 corner ornament). **Cần Founder mở preview/trang dev ở máy thật để xác nhận cuối cùng** (`http://localhost:3000`, bật menu "Xem hiệu ứng mùa" → Mùa Xuân).

---

# V4 (Three.js, 2026-11-17) - kiem tra inline boi lead (Inkling 2 Small Free)

> Ghi chu quy trinh: glm-5.3-flash va deepseek-v4.1-flash cung bao "Free usage limit reached" khi chay subagent.
> Flint-40b-free dang duoc thu lam fallback (sessionID ses_e16b271d1ffeKOkIpVJem3PW7V). Section nay do lead tu chay tuong tu phong ban glm QA; CHUA thay the sign-off chinh thuc cua glm.

Moi truong: Windows, Next.js 16.4.6 + React 19.3 + TypeScript strict, `npx tsc --noEmit` **sach**, three 0.187.0 (+@types/three).

1. **Ids/xlink: PASS.** SpringPetalCanvas.tsx khong co `id=` nao, khong xlink; texture dung CanvasTexture. Khong id moi duoc them vao diff scope.
2. **Mount placement: PASS.** `<SpringPetalCanvas />` chi xuat hien tai dong 1162 - cuoi block `isSpring && !isTetFestive` (spring-natural). Import dong 4. Khong khung nao khac (winter/tet/newyear/summer/autumn) bi mount.
3. **CSS: PASS (canh bao nhe).** Block moi `.spring-petal-canvas-host` chen sau `@keyframes garden-petal-fall`: brace balance toan file 1087/1087; `display:none` trong @media reduce dung class; khong xoa rule cu. z-index 13 nam tren HUD (z 3) va duoi corner ornaments (z 14/15) - hon hop y? = canh chu: petals ve tren text HUD, xem khuyen nghi o docs/spring-threejs-qa.md.
4. **Logic defect hunt (SpringPetalCanvas.tsx): PASS.** (a) unmount truoc khi await import resolve -> `disposed` check ngan, khong tao renderer, khong leak listener. (b) frame() gan lai `raf` moi vong; onVisibilityChange hidden -> running=false + cancelAnimationFrame(raf); visible -> running=true + clock.getDelta() reset delta -> resume khong nhay khung. (c) pollen: mutate `attr.array` + `attr.needsUpdate = true` dung. (d) resize chi cap nhat size + aspect, KHONG cap nhat pixelRatio khi dpr doi (nit, chap nhan). (e) dispose thu tu: cancel raf -> RO.disconnect -> removeEventListener (pointermove chi khi !isCoarse, visibilitychange) -> dispose geometries/materials/textures -> renderer.dispose() -> forceContextLoss() -> xoa canvas: dung. (f) useEffect 1 lan, closure on dinh, khong stale deps.
5. **A11y label-content-name-mismatch (6 files): PASS.** Header.tsx:29, Footer.tsx:8, Projects.tsx:180/:192, Contact.tsx:38, Atmosphere.tsx:959, ThemeToggle.tsx:39 - accessible name deu CHUA dung visible text; JSX hop le; Lighthouse trang chu 100/100/100, 0 failures sau fix.
6. **git: PASS.** diff --stat chi gom cac file du kien + docs/design previews; .next/ va node_modules/ duoc ignore.

**Nits:** pixelRatio khong theo window resize; parallax chi ngan truoc isCoarse chu khong tinh reduced-motion cho listener (listener chi them khi !isCoarse; reduced-motion da chan tai guard dau component nen vo hai); host z 13 > HUD z 3 (quyet dinh thiet ke V4, xem QA visual).

**Verdict: PASS (inline, chua qua glm chuan).** Can glm-5.3-flash (hoac fallback) chay lai khi quota reset de chot chinh thuc.

---

# V5 Orbit (2026-11-17) — glm (hy4-flash-free) + lead consolidated

> glm dùng tool đến giới hạn step; kết luận ban đầu: **PASS WITH NITS**. Lead sửa 2 nit code trước khi dừng; supervl không chụp được ảnh (cửa sổ không visible). Chi tiết visual: `docs/orbit-v5-qa.md`.

1. **tsc: PASS** (xác nhận bởi lead + glm). `three` 0.187.0.
2. **Ids/refs: PASS** (glm): 8 SVG ids unique, refs resolve, không xlink; wrapper `aria-hidden`, `role="presentation"` trên svg.
3. **CSS: PASS (nit dead CSS)**: brace cân bằng; `.avatar-seasonal-frame-wrapper` `display:none !important` (legacy, đúng ý founder) cộng re-style ở ~5121 là dead CSS — giữ nguyên; `.wrapped-frame.seasonal-orbit` KHÔNG bị `!important` này ảnh hưởng.
4. **Mount: PASS** (glm): `<SeasonalAvatarDeco />` nằm trong `.portrait-stage`, sau `.portrait-frame`.
5. **Logic (glm + lead re-check)**: unmount trong `await import` an toàn (disposed guard); firework splice lùi đúng; visibilitychange resume reset clock delta; không pointermove; `mats: Material[]` hợp lệ.
6. **NIT 1 (lead fixed)**: `visibilitychange` đăng ký trùng lặp đã xóa (giữ 1 vị trí ngay trước RAF loop).
7. **NIT 2 (lead fixed)**: firework geom/mat không còn được push vào `geoms`/`mats` (tránh double-dispose + mảng phình).
8. **NIT 3 (còn mở)**: dual-spin 48s (CSS dashed) vs 96s (motif SVG) — đọc như parallax; chờ Founder xác nhận.
9. **SpringPetalCanvas.tsx unused** — không import; đề xuất xóa.

**Verdict: PASS WITH NITS** (2 nit code đã fix; nit còn lại = quyết định Founder). Supervl chuẩn chưa chạy.
