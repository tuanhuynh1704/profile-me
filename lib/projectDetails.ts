export type ProjectHighlight = {
  title: string;
  desc: string;
};

export type ArchitectureLayer = {
  layer: string;
  name: string;
  components: string[];
  desc: string;
};

export type TeamMember = {
  name: string;
  role: string;
  responsibilities: string;
};

export type ProjectDetail = {
  slug: string;
  title: string;
  tagline: string;
  award?: string;
  category: string;
  role: string;
  timeframe: string;
  github?: string;
  live?: string;
  googlePlay?: string;
  overview: string;
  problemSolution?: {
    problemTitle: string;
    problemItems: { label: string; desc: string }[];
    solutionDesc: string;
  };
  architecture?: {
    title: string;
    description: string;
    layers: ArchitectureLayer[];
  };
  keyFeatures: {
    title: string;
    badge?: string;
    desc: string;
    tech: string[];
  }[];
  techStackDetailed: {
    category: string;
    items: string[];
  }[];
  team?: TeamMember[];
  roadmap?: {
    phase: string;
    title: string;
    done: boolean;
  }[];
  theme: {
    primary: string;
    secondary: string;
    glow: string;
    border: string;
    surface: string;
  };
};

export const projectDetailsMap: Record<string, ProjectDetail> = {
  eaagri: {
    slug: "eaagri",
    title: "EaAgri — Hệ Sinh Thái Nông Nghiệp Thông Minh",
    tagline:
      "Nền tảng Nông nghiệp Số toàn diện kết hợp AI 'Dual-Brain' (YOLOv9 + Gemini) và IoT thông minh 3 lớp, chẩn đoán sâu bệnh và dự báo giá cho sầu riêng Việt Nam.",
    award: "Quán quân Bảng 1C — NTTU Innovation Startup Challenge 2026",
    category: "AI & Nông Nghiệp Thông Minh (AIoT)",
    role: "Growth & Operations Lead (Đồng sáng lập & Vận hành)",
    timeframe: "2025 – Hiện tại",
    github: "https://github.com/TuansHuynh/EaAgri",
    live: "https://www.eaagri.id.vn/",
    googlePlay: "https://play.google.com/store/apps/details?id=com.eaagri.app",
    overview:
      "EaAgri là dự án nông nghiệp số tiên phong do nhóm sinh viên Khoa Công nghệ Thông tin — Trường ĐH Nguyễn Tất Thành sáng lập. Nhắm vào vùng trồng sầu riêng và cây ăn trái giá trị cao tại Đắk Lắk và Tây Nguyên, EaAgri kết hợp cảm biến vi khí hậu thời gian thực, thị giác máy tính AI và mô hình ngôn ngữ lớn (LLM) để đồng hành cùng nhà nông từ khâu chăm sóc, phát hiện sâu bệnh, tưới tự động đến thu hoạch và tiêu thụ.",
    problemSolution: {
      problemTitle: "Giải Lời Giải Cho 'Tứ Giác Rủi Ro' Của Nhà Nông",
      problemItems: [
        {
          label: "Bất đối xứng thông tin thị trường",
          desc: "Nông dân thường xuyên bị thương lái ép giá do thiếu dữ liệu dự báo biến động cung cầu nông sản.",
        },
        {
          label: "Sâu bệnh hại phức tạp",
          desc: "Nấm Phytophthora, rệp sáp, xì mủ, rụng trái non thường không được phát hiện kịp thời, dẫn đến thất thu mùa màng.",
        },
        {
          label: "Thất thoát tài nguyên tưới tiêu",
          desc: "Tưới tiêu theo cảm tính gây lãng phí hàng ngàn mét khối nước và dẫn tới úng rễ, thối cây.",
        },
        {
          label: "Thiếu truy xuất nguồn gốc",
          desc: "Nông hộ gặp nhiều rào cản khi muốn đạt tiêu chuẩn xuất khẩu chính ngạch (VietGAP, GlobalGAP).",
        },
      ],
      solutionDesc:
        "EaAgri giải quyết toàn diện tứ giác rủi ro bằng mô hình Nông nghiệp Thông minh Hybrid: Tự động hóa giám sát đất và không khí, chẩn đoán sâu bệnh trong vài giây qua camera AI và xuất phác đồ sinh học đạt chuẩn VietGAP.",
    },
    architecture: {
      title: "Kiến Trúc Hệ Thống Hybrid (AI Dual-Brain + IoT 3 Lớp)",
      description:
        "Hệ thống tích hợp 4 tầng công nghệ từ cảm biến thực địa đến mô hình trí tuệ nhân tạo và ứng dụng đa nền tảng:",
      layers: [
        {
          layer: "Tầng 1",
          name: "Lớp Cảm Biến IoT & Vi Khí Hậu",
          components: ["Cảm biến độ ẩm đất đa tầng", "Trạm đo nhiệt độ/độ ẩm không khí", "API thời tiết", "Máy bơm & Van tưới tự động"],
          desc: "Thu thập dữ liệu vi khí hậu thực tế tại vườn 24/7 và điều khiển hệ thống tưới thông minh 3 lớp tự động theo ngưỡng sinh trưởng.",
        },
        {
          layer: "Tầng 2",
          name: "AI Dual-Brain (Bộ Não Kép)",
          components: ["YOLOv9 Computer Vision", "Gemini LLM Reasoning", "Web Speech API & gTTS tiếng Việt"],
          desc: "YOLOv9 nhận diện hình ảnh sâu bệnh theo thời gian thực; Gemini LLM suy luận ngữ cảnh và sinh phác đồ điều trị sinh học đạt chuẩn VietGAP.",
        },
        {
          layer: "Tầng 3",
          name: "RAG & Vector Tri Thức Chuyên Sâu",
          components: ["Vector Database", "Kho tri thức VietGAP/GlobalGAP", "Mô hình ML/LSTM dự báo giá 1-7 ngày"],
          desc: "Lưu trữ dữ liệu canh tác và xu hướng giá nông sản theo từng khu vực, cung cấp khuyến nghị kinh tế cho nông hộ.",
        },
        {
          layer: "Tầng 4",
          name: "Ứng Dụng & Giao Diện Người Dùng",
          components: ["EaAgri Web Platform (React 19 + Vite)", "EaAgri Mobile App (Flutter trên Google Play)", "Trang Quản Trị Admin"],
          desc: "Giao diện hiện đại, thân thiện với bà con nông dân, hỗ trợ điều khiển bằng giọng nói tiếng Việt mượt mà.",
        },
      ],
    },
    keyFeatures: [
      {
        title: "Chẩn đoán sâu bệnh tức thì bằng YOLOv9 & Gemini",
        badge: "AI Vision + LLM",
        desc: "Chụp ảnh lá, thân hoặc trái sầu riêng; mô hình YOLOv9 phân tích các triệu chứng nấm bệnh, xì mủ, rệp sáp; Gemini tự động tra cứu kho tri thức VietGAP để đưa ra phác đồ phun thuốc sinh học phù hợp.",
        tech: ["YOLOv9", "Gemini API", "Python", "Vector DB"],
      },
      {
        title: "Tưới thông minh 3 lớp dựa trên dữ liệu vi khí hậu",
        badge: "IoT Smart Irrigation",
        desc: "Hệ thống tự động kích hoạt van tưới dựa trên độ ẩm đất ở nhiều tầng rễ khác nhau kết hợp dự báo thời tiết khí tượng, tiết kiệm tới 40% nước và điện năng.",
        tech: ["ESP32 / IoT Sensors", "MQTT", "Node.js", "Supabase"],
      },
      {
        title: "Trợ lý ảo tiếng Việt tương tác giọng nói",
        badge: "Voice Assistant",
        desc: "Tích hợp nhận dạng giọng nói tiếng Việt giúp bà con nông dân có thể trò chuyện, hỏi đáp cách chăm sóc vườn trực tiếp ngoài hiện trường mà không cần gõ bàn phím.",
        tech: ["Web Speech API", "gTTS", "Speech Recognition"],
      },
      {
        title: "Dự báo biến động giá sầu riêng bằng LSTM",
        badge: "Machine Learning",
        desc: "Mô hình mạng nơ-ron hồi quy LSTM phân tích chuỗi thời gian dữ liệu giá cả từ các chợ đầu mối và vựa xuất khẩu, đưa ra dự báo xu hướng giá từ 1 đến 7 ngày tới.",
        tech: ["LSTM", "TensorFlow", "Time Series", "Pandas"],
      },
      {
        title: "Trực quan hóa cây sầu riêng 3D tương tác",
        badge: "Three.js 3D",
        desc: "Mô hình cây 3D trực quan hóa sức khỏe từng bộ phận (rễ, thân, tán lá, trái) theo thời gian thực dựa trên các chỉ số cảm biến truyền về.",
        tech: ["Three.js", "React Three Fiber", "WebGL"],
      },
      {
        title: "Ứng dụng di động Flutter trên Google Play",
        badge: "Mobile App",
        desc: "Ứng dụng dành riêng cho nông dân theo dõi vườn từ xa, nhận thông báo thời tiết xấu, cảnh báo sâu bệnh và tra cứu nhật ký nông vụ mọi lúc mọi nơi.",
        tech: ["Flutter", "Dart", "Firebase", "REST API"],
      },
    ],
    techStackDetailed: [
      {
        category: "Frontend Web",
        items: ["React 19", "TypeScript", "Vite", "Three.js", "SCSS Modular (BEM)", "Vercel"],
      },
      {
        category: "Mobile",
        items: ["Flutter", "Dart", "Google Play Store deployment", "Push Notifications"],
      },
      {
        category: "AI & Data Science",
        items: ["YOLOv9 (Computer Vision)", "Google Gemini API (LLM)", "LSTM (Market Forecast)", "Vector DB (RAG)"],
      },
      {
        category: "IoT & Backend",
        items: ["Supabase (PostgreSQL)", "Cảm biến vi khí hậu đa tầng", "MQTT Broker", "Web Speech API"],
      },
    ],
    team: [
      {
        name: "PHAN ĐĂNG HUY",
        role: "Founder & CEO",
        responsibilities: "Chiến lược sản phẩm • Điều phối dự án • Gọi vốn & Quan hệ đối tác",
      },
      {
        name: "NGUYỄN ANH GIẢNG",
        role: "CTO / AI & Data Lead",
        responsibilities: "Kiến trúc AI & Dữ liệu • Phát triển thuật toán YOLOv9, Gemini & LSTM",
      },
      {
        name: "ĐẶNG VĂN CHUNG",
        role: "Field Operations Lead",
        responsibilities: "Khảo sát thực địa vườn sầu riêng Đắk Lắk • Hỗ trợ kỹ thuật • Triển khai trạm Pilot",
      },
      {
        name: "HUỲNH ANH TUẤN",
        role: "Growth & Operations Lead",
        responsibilities: "Truyền thông • Xây dựng cộng đồng nông hộ • Onboarding người dùng • Vận hành sản phẩm",
      },
    ],
    roadmap: [
      {
        phase: "Giai đoạn 1",
        title: "Nghiên cứu thực địa vườn sầu riêng tại Đắk Lắk & xây dựng mô hình AI Dual-Brain",
        done: true,
      },
      {
        phase: "Giai đoạn 2",
        title: "Đạt Quán quân cuộc thi Khởi nghiệp Đổi mới Sáng tạo NTTU Challenge 2026",
        done: true,
      },
      {
        phase: "Giai đoạn 3",
        title: "Ra mắt nền tảng Web & Mobile App trên Google Play kết nối trạm IoT tưới 3 lớp",
        done: true,
      },
      {
        phase: "Giai đoạn 4",
        title: "Mở rộng thử nghiệm Pilot diện rộng trên 50+ hợp tác xã và hộ nông dân Tây Nguyên",
        done: false,
      },
      {
        phase: "Giai đoạn 5",
        title: "Hoàn thiện sàn truy xuất nguồn gốc mã QR và kết nối chuỗi cung ứng xuất khẩu chính ngạch",
        done: false,
      },
    ],
    theme: {
      primary: "#10b981",
      secondary: "#34d399",
      glow: "rgba(16, 185, 129, 0.35)",
      border: "rgba(16, 185, 129, 0.45)",
      surface:
        "radial-gradient(ellipse 90% 80% at 90% 10%, rgba(16, 185, 129, 0.32) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 10% 90%, rgba(5, 150, 105, 0.22) 0%, transparent 60%), linear-gradient(145deg, #061c14 0%, #030d09 100%)",
    },
  },

  "llm-rag": {
    slug: "llm-rag",
    title: "LLM & RAG Playground (Kaggle Engine)",
    tagline:
      "Nền tảng huấn luyện, trải nghiệm và tương tác Mô hình Ngôn ngữ Lớn (LLM) và RAG cá nhân hóa v5.6 kết nối GPU Kaggle qua Cloudflare Tunnel.",
    award: "Kaggle T4 GPU 16GB Engine • RAG v5.6",
    category: "AI & Machine Learning",
    role: "AI Systems Developer",
    timeframe: "2026",
    github: "https://github.com/tuanhuynh1704/LLM_Chatting_bot",
    overview:
      "Dự án kết hợp giao diện Web hiện đại (React 19 + TypeScript + Vite) với năng lực tính toán GPU miễn phí trên Kaggle (NVIDIA T4 16GB VRAM) thông qua đường hầm Cloudflare Tunnel bảo mật. Phiên bản v5.6 kế thừa hardening P0 của v5.5, duy trì hợp đồng API 11 endpoint và mở rộng khả năng tự học từ câu khẳng định tự nhiên mà không cần ép buộc từ khóa 'ghi nhớ'.",
    keyFeatures: [
      {
        title: "Hợp đồng API 11 Endpoints chuẩn mực",
        badge: "API Architecture",
        desc: "Thiết kế REST API đầy đủ cho tác vụ chat, quản lý context, vector search, quản lý session và kiểm tra tình trạng GPU Kaggle.",
        tech: ["FastAPI", "Python", "REST API", "JSON"],
      },
      {
        title: "Cơ chế RAG v5.6 tự học linh hoạt",
        badge: "RAG Engine",
        desc: "Mô hình tự động trích xuất và ghi nhớ tri thức từ câu khẳng định đàm thoại của người dùng, giới hạn câu trả lời đúng phạm vi tri thức được học và gắn nhãn nguồn chưa kiểm chứng.",
        tech: ["LangChain / LlamaIndex", "Vector Search", "Embeddings"],
      },
      {
        title: "Đường hầm Cloudflare Tunnel kết nối Kaggle GPU",
        badge: "Zero Cost GPU Infra",
        desc: "Tận dụng GPU NVIDIA T4 16GB VRAM hoàn toàn miễn phí trên Kaggle, thiết lập đường hầm tunnel an toàn đưa API về môi trường web frontend.",
        tech: ["Cloudflare Tunnel", "Kaggle T4", "Jupyter Notebook"],
      },
      {
        title: "Giao diện React 19 & Monaco Code Editor",
        badge: "Modern Frontend",
        desc: "Hỗ trợ render markdown đa tầng, highlight code thời gian thực, quản lý hội thoại đa luồng với độ trễ thấp.",
        tech: ["React 19", "TypeScript", "Vite", "Markdown Parser"],
      },
    ],
    techStackDetailed: [
      {
        category: "Frontend",
        items: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Monaco Editor"],
      },
      {
        category: "Backend & AI Model",
        items: ["Python", "Kaggle T4 16GB VRAM", "FastAPI / Flask", "HuggingFace Transformers", "Sentence-Transformers"],
      },
      {
        category: "RAG & Storage",
        items: ["FAISS / ChromaDB Vector Store", "Cosine Similarity", "Context Injection Prompting"],
      },
      {
        category: "Infrastructure",
        items: ["Cloudflare Tunnel", "Jupyter Notebook Backend", "RESTful 11 Endpoints"],
      },
    ],
    theme: {
      primary: "#a855f7",
      secondary: "#ec4899",
      glow: "rgba(168, 85, 247, 0.35)",
      border: "rgba(168, 85, 247, 0.45)",
      surface:
        "radial-gradient(ellipse 90% 80% at 90% 10%, rgba(168, 85, 247, 0.35) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 10% 90%, rgba(236, 72, 153, 0.22) 0%, transparent 60%), linear-gradient(145deg, #140926 0%, #080311 100%)",
    },
  },

  "ip-recon-studio": {
    slug: "ip-recon-studio",
    title: "IP Recon Studio",
    tagline:
      "Trạm chẩn đoán & điều tra mạng IPv4/IPv6 chuyên nghiệp giao diện Dark Cyberpunk được viết bằng Go (Chi, netip) và React 19.",
    award: "High-Performance Network Suite",
    category: "Go & Network Systems",
    role: "Full-stack Developer",
    timeframe: "2026",
    github: "https://github.com/tuanhuynh1704/ip-recon-studio",
    overview:
      "IP Recon Studio là workstation chuyên sâu phục vụ các kỹ sư mạng và DevOps điều tra danh tính IP, kiểm tra độ trễ mạng và phân tích cấu trúc định tuyến. Ứng dụng tận dụng gói `netip` tối tân của Go giúp phân giải và bóc tách dữ liệu mạng với tốc độ microsecond, lưu trữ lịch sử điều tra vĩnh viễn với SQLite thuần Go chế độ WAL.",
    keyFeatures: [
      {
        title: "Động cơ mạng Go netip siêu tốc",
        badge: "Go Engine",
        desc: "Sử dụng các cấu trúc dữ liệu không cấp phát vùng nhớ (zero-allocation) trong Go giúp phân tích hàng ngàn dải IP IPv4/IPv6 tức thì.",
        tech: ["Go 1.24+", "Chi Router", "netip", "httptrace"],
      },
      {
        title: "Lưu trữ SQLite Pure Go (WAL Mode)",
        badge: "Embedded Storage",
        desc: "Không yêu cầu GCC, mingw hay CGO; hỗ trợ đồng thời nhiều tác vụ đọc/ghi với Write-Ahead Logging (WAL) đảm bảo tính toàn vẹn dữ liệu.",
        tech: ["modernc.org/sqlite", "WAL Mode", "Pure Go"],
      },
      {
        title: "Giao diện Dark Cyberpunk chuyên nghiệp",
        badge: "Cyberpunk UI",
        desc: "Bảng điều khiển trực quan mang phong cách phòng thí nghiệm an ninh mạng với đồ thị độ trễ, bản đồ định vị GeoIP và bộ lọc thông minh.",
        tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS"],
      },
    ],
    techStackDetailed: [
      { category: "Backend", items: ["Go", "Chi HTTP Router", "net/netip", "Go Concurrency"] },
      { category: "Frontend", items: ["React 19", "TypeScript", "Vite", "Cyberpunk Design System"] },
      { category: "Database", items: ["Embedded SQLite", "Pure Go driver", "WAL Concurrency"] },
    ],
    theme: {
      primary: "#06b6d4",
      secondary: "#10b981",
      glow: "rgba(6, 182, 212, 0.35)",
      border: "rgba(6, 182, 212, 0.45)",
      surface:
        "radial-gradient(ellipse 90% 80% at 90% 10%, rgba(6, 182, 212, 0.32) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 10% 90%, rgba(16, 185, 129, 0.2) 0%, transparent 60%), linear-gradient(145deg, #041921 0%, #020c10 100%)",
    },
  },

  "internal-tool-api": {
    slug: "internal-tool-api",
    title: "Internal Tool API (API Tester Pro v2.4)",
    tagline:
      "Ứng dụng Desktop toàn diện cho Kiểm thử, Đo tải Goroutine, Tự động hóa API & UI — xây dựng trên kiến trúc Go + React 18 + Wails v2.",
    award: "v2.4.0 • Postman / Insomnia Alternative",
    category: "Go Desktop & Automation",
    role: "Desktop Software Engineer",
    timeframe: "2026",
    github: "https://github.com/tuanhuynh1704/internal-tool-api",
    overview:
      "API Tester Pro v2.4 là giải pháp Desktop hoàn chỉnh dành cho Developers và QA/QC Engineers, hỗ trợ quy trình kiểm thử từ thủ công đến tự động hóa, đo tải hiệu năng hàng ngàn request/giây qua Goroutines và giả lập API Mock Server. Toàn bộ ứng dụng được đóng gói thành file thực thi độc lập (exe) nhẹ nhàng, khởi động tức thì.",
    keyFeatures: [
      {
        title: "HTTP Engine thuần Go bóc tách pha mạng",
        badge: "net/http/httptrace",
        desc: "Phân tích chi tiết từng microsecond trong quá trình kết nối: DNS Lookup → TCP Handshake → TLS Negotiation → TTFB → Content Download.",
        tech: ["Go", "httptrace", "High Precision Timing"],
      },
      {
        title: "Goroutine Stress Testing & Đo tải",
        badge: "Stress Testing",
        desc: "Mô phỏng hàng ngàn người dùng ảo (Virtual Users) gửi yêu cầu liên tục, trực quan hóa biểu đồ RPS và độ trễ với cơ chế ngắt an toàn tức thì qua Context.",
        tech: ["Goroutines", "Go Channels", "Realtime Metrics"],
      },
      {
        title: "API Auto Test Studio & Mock Server",
        badge: "Automation Testing",
        desc: "Soạn thảo kịch bản kiểm thử theo kịch bản liên hoàn, trích xuất biến động giữa các bước (Variable Chaining), và giả lập endpoint nội bộ phục vụ phát triển Frontend.",
        tech: ["Variable Chaining", "Assertions Engine", "Mock HTTP Server"],
      },
      {
        title: "Đóng gói đa nền tảng Wails v2 & SQLite",
        badge: "Wails Desktop",
        desc: "Giao diện React 18 tích hợp trình soạn thảo Monaco Editor chuyên nghiệp, lưu trữ workspace bền vững trong SQLite nhúng không cần cài đặt DBMS.",
        tech: ["Wails v2", "React 18", "Monaco Editor", "Pure Go SQLite"],
      },
    ],
    techStackDetailed: [
      { category: "Core Backend", items: ["Go 1.25", "net/http", "Goroutines Concurrency", "Context Management"] },
      { category: "Desktop Framework", items: ["Wails v2.12", "CGO-free Architecture", "In-App Auto Updater"] },
      { category: "Frontend IDE", items: ["React 18", "TypeScript 5", "Monaco Editor", "Vite"] },
      { category: "Storage", items: ["SQLite (Pure Go)", "Zero external dependency", "Environment Variables"] },
    ],
    theme: {
      primary: "#38bdf8",
      secondary: "#6366f1",
      glow: "rgba(56, 189, 248, 0.35)",
      border: "rgba(56, 189, 248, 0.45)",
      surface:
        "radial-gradient(ellipse 90% 80% at 90% 10%, rgba(56, 189, 248, 0.32) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 10% 90%, rgba(99, 102, 241, 0.22) 0%, transparent 60%), linear-gradient(145deg, #07172e 0%, #030a16 100%)",
    },
  },

  "virtual-office": {
    slug: "virtual-office",
    title: "Virtual Office (Văn Phòng Ảo)",
    tagline:
      "Văn phòng ảo theo dõi trạng thái nhân sự thời gian thực bằng nhân vật hoạt hình tương tác, phát triển trên nền Next.js 16 và React 19.",
    award: "Next.js 16 + React 19 Showcase",
    category: "Web Platform & Realtime",
    role: "Full-stack Developer",
    timeframe: "2026",
    github: "https://github.com/tuanhuynh1704/phong-lam-viec",
    overview:
      "Virtual Office giải quyết sự xa cách trong môi trường làm việc từ xa (Remote Work) bằng cách đưa toàn bộ thành viên vào một không gian văn phòng ảo sinh động. Trạng thái của từng nhân sự (đang tập trung, họp nhóm, ra ngoài, nghỉ trưa) được phản ánh tức thì qua cử chỉ nhân vật và âm thanh không gian.",
    keyFeatures: [
      {
        title: "Đồng bộ trạng thái nhân sự thời gian thực",
        badge: "Realtime Presence",
        desc: "Cập nhật tức thì vị trí và trạng thái làm việc của đồng nghiệp trong phòng qua WebSocket, giảm thiểu nhu cầu gọi họp không cần thiết.",
        tech: ["Realtime Engine", "WebSocket", "State Synchronization"],
      },
      {
        title: "Kiến trúc Next.js 16 App Router & React 19",
        badge: "Modern Architecture",
        desc: "Sử dụng Server Components kết hợp Tailwind CSS v4 mới nhất đem lại tốc độ tải trang cực nhanh và chuyển cảnh mượt mà.",
        tech: ["Next.js 16", "React 19", "Tailwind CSS 4", "Turbopack"],
      },
    ],
    techStackDetailed: [
      { category: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4"] },
      { category: "Interactivity", items: ["Framer Motion", "Realtime WebSockets", "Audio Effects"] },
    ],
    theme: {
      primary: "#fb923c",
      secondary: "#f43f5e",
      glow: "rgba(251, 146, 60, 0.35)",
      border: "rgba(251, 146, 60, 0.45)",
      surface:
        "radial-gradient(ellipse 90% 80% at 90% 10%, rgba(251, 146, 60, 0.32) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 10% 90%, rgba(244, 63, 94, 0.22) 0%, transparent 60%), linear-gradient(145deg, #240e06 0%, #0c0502 100%)",
    },
  },

  "inntech-club": {
    slug: "inntech-club",
    title: "INNTECH CLUB — Cổng Thông Tin CLB ĐMST",
    tagline:
      "Website landing page chính thức của Câu lạc bộ Công nghệ và Sáng tạo — Trường ĐH Nguyễn Tất Thành, prerender tĩnh 100%.",
    award: "NTTU Official Landing",
    category: "Web Platform",
    role: "Frontend Developer",
    timeframe: "2026",
    github: "https://github.com/tuanhuynh1704/inntech-club",
    live: "https://inntech-club.vercel.app",
    overview:
      "Website landing page chính thức của INNTECH CLUB (Trường ĐH Nguyễn Tất Thành), đại diện cho câu lạc bộ quy tụ sinh viên đam mê công nghệ và khởi nghiệp. Trang web được thiết kế theo phong cách hiện đại với thanh tiến độ cuộn, header sticky mờ và hệ sinh thái 7 dự án ươm tạo.",
    keyFeatures: [
      {
        title: "Hiệu năng Static Prerender cực cao",
        badge: "Next.js 16 Static",
        desc: "Tải trang trong tích tắc với 100% static prerendering tại build time, tối ưu hóa điểm Google Lighthouse và Core Web Vitals.",
        tech: ["Next.js 16", "React 19", "Static Export", "Turbopack"],
      },
      {
        title: "Trải nghiệm cuộn Scroll Reveal ấn tượng",
        badge: "IntersectionObserver",
        desc: "Các thành phần xuất hiện mượt mà theo tiến trình cuộn trang, thanh tiến độ gradient phản ánh vị trí đọc của người dùng.",
        tech: ["CSS Modules", "IntersectionObserver", "Custom Scrollbar"],
      },
    ],
    techStackDetailed: [
      { category: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "CSS Modules"] },
      { category: "Hosting", items: ["Vercel Edge Network", "Custom Domain", "SEO & Schema.org"] },
    ],
    theme: {
      primary: "#3b82f6",
      secondary: "#38bdf8",
      glow: "rgba(59, 130, 246, 0.35)",
      border: "rgba(59, 130, 246, 0.45)",
      surface:
        "radial-gradient(ellipse 90% 80% at 90% 10%, rgba(59, 130, 246, 0.32) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 10% 90%, rgba(56, 189, 248, 0.22) 0%, transparent 60%), linear-gradient(145deg, #0a1438 0%, #040818 100%)",
    },
  },
};
