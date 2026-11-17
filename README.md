# Portfolio – Huỳnh Anh Tuấn 🚀

> **Full-stack & AI Systems Developer**  
> Xây dựng phần mềm sạch, hiệu năng cao và mở rộng được – từ Go, Wails, React 19, Next.js 16 đến các hệ thống AI/RAG và Multi-Agent Swarms cá nhân hóa.

---

## 🌟 Giới thiệu

Trang portfolio cá nhân hiện đại được xây dựng trên nền tảng **Next.js 16 (App Router)** và **React 19**, viết bằng **TypeScript** và toàn bộ hệ thống giao diện được trau chuốt bằng **Vanilla CSS** thuần túy (không sử dụng framework CSS cồng kềnh nhằm tối ưu hóa hiệu năng và tốc độ render đạt 100/100 điểm Lighthouse).

Trang web nổi bật với **hệ thống khí quyển thời tiết 4 mùa đa tầng (Dynamic Seasonal Atmosphere)**, tự động thích ứng giao diện theo thời gian thực và cho phép người xem tùy chọn từng mùa và dịp lễ hội của Việt Nam.

---

## ✨ Tính năng nổi bật

### 1. 🌦️ Hệ thống khí quyển 4 Mùa & Lễ hội đa tầng (`Atmosphere.tsx`)
Hệ thống tự động phát hiện mùa theo lịch thời gian thực (Lịch Dương & Lịch Âm) hoặc chuyển đổi thủ công qua menu điều khiển:
* **🌸 Mùa Xuân (3 chế độ chuyên biệt)**:
  * **Xuân Tự Nhiên (ngoài dịp Tết)**: Nắng ấm ban mai, những cánh hoa anh đào hồng bay lượn, đôi bướm xuân vỗ cánh 3D, chồi lộc non xanh biếc và bụi phấn hoa vàng bồng bềnh.
  * **Tết Âm Lịch (20 Tháng Chạp - Mùng 10 Tháng Giêng)**: Đèn lồng đỏ treo cao, cành mai vàng và đào thắm, vệt pháo nổ may mắn, tia sáng phát tài lộc.
  * **Tết Dương Lịch (31/12 - 02/01)**: Bầu trời đêm đếm ngược countdown, 5 cụm pháo hoa nở rộ nhiều màu sắc, mưa hoa giấy confetti rực rỡ và bong bóng champagne ánh vàng óng ả.
* **🏖️ Mùa Hạ (Phong cách bãi biển)**: Nắng vàng nhiệt đới chói chang, sóng biển vỗ dập dềnh đáy màn hình, đàn chim hải âu chao liệng và làn gió biển mát rượi.
* **🍁 Mùa Thu (Phong cách thu lá phong)**: Cơn mưa lá phong chuyển sắc vàng – đỏ – cam hổ phách chao liệng trong gió, vệt nắng thu vàng ấm áp.
* **❄️ Mùa Đông (Phong cách tuyết & Giáng Sinh)**:
  * **Mùa Đông thường**: Bông tuyết 6 cánh tinh thể rơi chậm rãi, những vệt bão tuyết lốc xoáy Bắc Cực buốt giá.
  * **Giáng Sinh (Noel)**: Chuông vàng, cây thông tuyết, quả châu đỏ và không khí Noel an lành.
* **🌀 Giao mùa (Transition)**: Hiệu ứng hòa trộn mượt mà giữa các mùa trong năm.

### 2. 🖼️ Khung viền Avatar 4 cạnh độc bản (`SeasonalAvatarDeco.tsx`)
Viền chân dung đại diện không chỉ là các họa tiết đơn lẻ mà được thiết kế thành **khung viền 4 cạnh ôm trọn chân dung** bằng vector SVG chi tiết cho từng dịp:
* **Khung Xuân Tự Nhiên**: Dây leo hoa đào uốn quanh 4 cạnh, lộc non và bướm xuân đậu góc trên.
* **Khung Tết Âm Lịch**: Dây cành mai đào vàng thắm, phong bao lì xì may mắn "Phúc" và dây pháo đỏ nổ góc dưới.
* **Khung Tết Dương Lịch**: Dây kim tuyến lấp lánh, hệ thống đèn LED Countdown đổi màu và ngôi sao vàng rực rỡ.
* **Khung Mùa Hạ**: Tán lá cọ/dừa bao bọc, phụ kiện sao biển nhiệt đới.
* **Khung Mùa Thu**: Dải cành lá phong vàng đỏ phủ kín viền.
* **Khung Mùa Đông & Noel**: Mép trên phủ dải tuyết xốp dày có nhũ băng buốt giá, hai cạnh viền là nhánh thông tuyết leo dọc có đèn LED nhấp nháy, đáy là nơ chuông vàng và mũ ông già Noel đội nghiêng ở góc trên.

### 3. 🎨 Kiến trúc Dynamic Seasonal CSS Theming
Toàn bộ element trên website tự động đổi màu đồng bộ với mùa đang chọn:
* Status pill nhấp nháy, sound-wave audio equalizer.
* Hero title chuyển sắc ánh kim (`linear-gradient`) hòa quyện màu sắc chủ đạo của mùa.
* Subtitle, 4 huy hiệu thế mạnh, các nút CTA chính/phụ và link mạng xã hội.
* Thẻ kỹ năng, chip công nghệ, sơ đồ Multi-Agent, thẻ dự án, thanh đo % đọc HUD.
* Hỗ trợ hoàn hảo cho cả **Chế độ Sáng (Light Mode)** và **Chế độ Tối (Dark Mode)** với độ tương phản cao, dễ nhìn.

### 4. 🤖 Showcase kiến trúc Multi-Agent Swarms & AI Systems
Mô hình hóa trực quan luồng cộng tác của các tác tử AI tự hành:
* **Planner Agent**: Phân rã mục tiêu lớn & lập kế hoạch thực thi.
* **Coder / Executor**: Sinh mã nguồn và tương tác hệ thống.
* **Tester / Verifier**: Kiểm thử đơn vị & xác minh độ tin cậy.
* **Critic / Reviewer**: Đánh giá kiến trúc, bảo mật và phản hồi vòng lặp.

### 5. 📑 Hệ thống trang chi tiết dự án chuyên sâu (`/projects/[slug]`)
Mỗi dự án đều có một trang Case Study riêng biệt được tiền kết xuất (Static Site Generation - SSG):
* Bối cảnh và bài toán thực tế cần giải quyết.
* Giải pháp kỹ thuật, công nghệ áp dụng và kiến trúc hệ thống.
* Các chỉ số định lượng đo lường thực tế (Latency, Benchmark, Accuracy, Performance).
* Đường dẫn trực tiếp đến mã nguồn (GitHub) và bản trải nghiệm (Live Demo).

### 6. 🧭 Floating HUD & Điều hướng thông minh
* Vòng tròn SVG hiển thị chính xác tiến trình cuộn trang (`Scroll Progress`).
* Nút 1-click cuộn mượt về đầu trang.
* Menu chuyển đổi mùa nhanh chóng (`Seasonal Quick Picker`).

---

## 📂 Cấu trúc thư mục

```
test-1/
├── app/
│   ├── layout.tsx              # Root Layout, font Inter, meta tags & metadata
│   ├── page.tsx                # Trang chủ tổng hợp các section chính
│   ├── globals.css             # Hệ thống CSS Design Tokens, Seasonal Themes & Animations
│   └── projects/
│       └── [slug]/
│           └── page.tsx        # Dynamic Route hiển thị trang chi tiết case study dự án
├── components/
│   ├── Atmosphere.tsx          # Engine hiệu ứng khí quyển thời tiết 4 mùa & Lễ hội
│   ├── SeasonalDeco.tsx        # Khung viền Avatar bao bọc 4 cạnh cho từng mùa
│   ├── Header.tsx              # Header thanh điều hướng, logo monogram & theme toggle
│   ├── Hero.tsx                # Hero section, Avatar HUD Card & Hero Badges
│   ├── About.tsx               # Phần giới thiệu kinh nghiệm & Quick facts
│   ├── Skills.tsx              # Lưới kỹ năng chuyên môn & Banner Multi-Agent
│   ├── Projects.tsx            # Danh mục dự án lọc theo Tab với insignia monogram
│   ├── ProjectCard.tsx         # Component thẻ dự án có spotlight gradient
│   ├── StatsBar.tsx            # Thanh số liệu định lượng (Dự án, chính xác, độ trễ)
│   ├── Contact.tsx             # Phần liên hệ và kết nối trực tiếp
│   ├── Footer.tsx              # Chân trang bản quyền và liên kết xã hội
│   ├── FloatingHUD.tsx         # HUD nổi đo tiến trình cuộn trang & Quick season picker
│   ├── SiteNav.tsx             # Menu điều hướng máy tính để bàn
│   ├── MobileNav.tsx           # Menu điều hướng cho thiết bị di động
│   ├── ThemeToggle.tsx         # Nút chuyển đổi giao diện Sáng / Tối
│   ├── ScrollReveal.tsx        # Hiệu ứng xuất hiện mượt mà khi cuộn trang
│   └── Icons.tsx               # Bộ icon SVG vector tối ưu kích thước
├── lib/
│   ├── data.ts                 # Dữ liệu nội dung portfolio, kỹ năng, dự án, thông tin liên hệ
│   └── projectDetails.ts       # Dữ liệu chi tiết 6 case study dự án chuyên sâu
├── public/
│   ├── avatar.jpg              # Ảnh chân dung chất lượng cao
│   └── ...                     # Tài nguyên hình ảnh & favicon
├── specs/                      # Tài liệu đặc tả kỹ thuật dự án
├── package.json                # Danh sách dependencies & scripts
├── tsconfig.json               # Cấu hình TypeScript
└── next.config.ts              # Cấu hình Next.js
```

---

## 🛠️ Công nghệ cốt lõi

| Công nghệ | Phiên bản | Vai trò |
| :--- | :--- | :--- |
| **Next.js** | `16.4.6` | App Router, Static Site Generation (SSG), Turbopack |
| **React** | `19.3.0` | Kiến trúc Component hướng tương lai |
| **TypeScript** | `5.x` | Kiểm soát kiểu tĩnh nghiêm ngặt và an toàn |
| **Vanilla CSS** | Modern CSS | CSS Variables (Tokens), Keyframes, Glassmorphism, Responsive |
| **SVG Filters & Vector** | W3C Standard | Đồ họa vector sắc nét không bể vỡ cho các khung viền mùa |

---

## 🚀 Hướng dẫn cài đặt & Khởi chạy

### 1. Yêu cầu môi trường
* **Node.js**: Phiên bản `18.18.0` trở lên (khuyến nghị Node 20 LTS).
* **Trình quản lý gói**: `npm`, `pnpm` hoặc `yarn`.

### 2. Cài đặt các thư viện phụ thuộc
```bash
npm install
```

### 3. Chạy trong môi trường phát triển (Development)
```bash
npm run dev
```
Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000) để xem trang web.

### 4. Build sản phẩm (Production Build)
```bash
npm run build
```
Next.js sẽ tự động kiểm tra TypeScript và biên dịch toàn bộ các trang tĩnh (SSG).

### 5. Khởi chạy production server
```bash
npm run start
```

---

## ⚙️ Hướng dẫn tùy biến nội dung

* **Thông tin cá nhân, mạng xã hội, kỹ năng & danh sách dự án**:  
  Chỉnh sửa trực tiếp file [lib/data.ts](file:///c:/Users/nkocn/OneDrive/Desktop/Frontend/test-1/lib/data.ts).
* **Nội dung chi tiết từng Case Study dự án**:  
  Chỉnh sửa hoặc thêm mới dự án trong [lib/projectDetails.ts](file:///c:/Users/nkocn/OneDrive/Desktop/Frontend/test-1/lib/projectDetails.ts).
* **Ảnh chân dung đại diện**:  
  Thay thế file [public/avatar.jpg](file:///c:/Users/nkocn/OneDrive/Desktop/Frontend/test-1/public/avatar.jpg).
* **Màu sắc chủ đạo & Thiết kế từng mùa**:  
  Tùy chỉnh các CSS variables trong [app/globals.css](file:///c:/Users/nkocn/OneDrive/Desktop/Frontend/test-1/app/globals.css) tại khối `[data-season]`, `[data-base-season]` và `[data-festive]`.

---

## 📄 Giấy phép (License)

Dự án được phân phối dưới giấy phép **MIT License**. Bạn được tự do tham khảo, học hỏi và phát triển.

---

## 📬 Liên hệ

* **Tác giả**: Huỳnh Anh Tuấn
* **Chuyên môn**: Full-stack & AI Systems Developer
* **GitHub**: [github.com/TuanHuynh05](https://github.com/TuanHuynh05)
* **LinkedIn**: [linkedin.com/in/tuanhuynh05](https://linkedin.com/in/tuanhuynh05)
* **Email**: contact@tuanhuynh.dev
