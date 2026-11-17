// Dữ liệu thật, lấy trực tiếp từ GitHub cá nhân @tuanhuynh1704 (46 repos public & private)
// Cập nhật: 2026-11-16

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin";
};

export type QuickFact = {
  label: string;
  value: string;
};

export type ProjectCategory = "all" | "ai" | "systems" | "web";

export type ProjectTheme = {
  primary: string;
  secondary: string;
  glow: string;
  border: string;
  surface: string;
  statusText: string;
  statusDot: string;
};

export type Project = {
  slug: string;
  title: string;
  monogram: string;
  category: "ai" | "systems" | "web";
  categoryLabel: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  badge?: string;
  isPrivate?: boolean;
  theme: ProjectTheme;
};

export type SkillGroup = {
  name: string;
  tagline: string;
  items: string[];
};

export const site = {
  name: "Huỳnh Anh Tuấn",
  monogram: "HAT",
  role: "Full-stack & AI Systems Developer",
  tagline:
    "Xây dựng phần mềm sạch, hiệu năng cao và mở rộng được — từ Go, Wails, React 19 đến các hệ thống AI/RAG cá nhân hóa.",
  socials: [
    { label: "GitHub", href: "https://github.com/tuanhuynh1704", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/tu%E1%BA%A5n-hu%E1%BB%B3nh-508540346/",
      icon: "linkedin",
    },
  ] as SocialLink[],
};

export const stats = [
  { value: "46+", label: "Repositories GitHub", note: "Public & Private" },
  { value: "Top 1", label: "Quán quân Bảng 1C", note: "NTTU Startup 2026" },
  { value: "11+", label: "Endpoints LLM & RAG", note: "Kaggle T4 GPU Engine" },
  { value: "100%", label: "Clean Architecture", note: "Go · TS · Wails · SQLite" },
];

export const quickFacts: QuickFact[] = [
  { label: "Vai trò", value: "Full-stack & AI Systems Developer" },
  { label: "Thực chiến", value: "46+ Repositories (Go · Rust · TS · AI)" },
  { label: "EaAgri", value: "Growth & Operations Lead" },
  { label: "Giải thưởng", value: "Quán quân Bảng 1C — NTTU Innovation Startup 2026" },
  { label: "AI Workflow", value: "Agent ↔ Subagent Orchestration — Tự động hóa & Review báo cáo AI" },
  { label: "Trường", value: "ĐH Nguyễn Tất Thành — Khoa CNTT" },
  { label: "Hệ sinh thái", value: "Go · React 19 · Next.js · Wails · LLM/RAG · AI Agents" },
];

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    tagline: "Ngôn ngữ cốt lõi",
    items: ["Go", "TypeScript", "Rust", "Java", "JavaScript", "SQL"],
  },
  {
    name: "AI & Machine Learning",
    tagline: "Hệ thống AI & LLM",
    items: ["LLM / RAG", "Kaggle T4 GPU", "YOLOv9", "Gemini API", "Embeddings", "Cloudflare Tunnel"],
  },
  {
    name: "Backend & Systems",
    tagline: "Hiệu năng & kiến trúc",
    items: ["Go (Chi, net/http)", "Wails v2 (Desktop)", "Spring Boot", "REST APIs", "Goroutine Concurrency"],
  },
  {
    name: "Frontend Modern",
    tagline: "Giao diện mượt mà",
    items: ["React 19", "Next.js 16", "Vite", "Tailwind CSS 4", "Three.js", "SCSS / CSS Modules"],
  },
  {
    name: "Data & Infrastructure",
    tagline: "Lưu trữ & triển khai",
    items: ["SQLite (Pure Go WAL)", "PostgreSQL", "Supabase", "Docker", "Git / GitHub", "Vercel"],
  },
  {
    name: "AI-Powered Workflow",
    tagline: "Tự động hóa với AI Agents",
    items: [
      "Antigravity (Swarm & Subagents)",
      "Claude Code (Opus / Sonnet)",
      "OpenAI Codex CLI",
      "OpenCode CLI",
      "Gemini CLI / Gemini API",
      "Cursor AI",
      "Agent ↔ Subagent Orchestration",
      "AI Code Review & QA Automation",
      "Prompt Engineering & Context Design",
      "AI Report Review Pipeline",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "eaagri",
    title: "EaAgri",
    monogram: "EA",
    category: "ai",
    categoryLabel: "AI & IoT",
    description:
      "Hệ sinh thái Nông nghiệp Thông minh Hybrid cho sầu riêng Việt Nam — AI Dual-Brain (YOLOv9 + Gemini) chẩn đoán sâu bệnh, IoT tưới thông minh 3 lớp, dự báo giá LSTM, trợ lý giọng nói tiếng Việt. Quán quân Bảng 1C NTTU Innovation Startup 2026.",
    tech: ["React 19", "TypeScript", "Vite", "Supabase", "Three.js", "YOLOv9", "Gemini", "Flutter"],
    github: "https://github.com/tuanhuynh1704/EaAgri",
    live: "https://www.eaagri.id.vn/",
    badge: "Quán quân NTTU 2026",
    isPrivate: false,
    theme: {
      primary: "#10b981",
      secondary: "#34d399",
      glow: "rgba(16, 185, 129, 0.28)",
      border: "rgba(16, 185, 129, 0.45)",
      surface:
        "radial-gradient(ellipse 90% 80% at 90% 10%, rgba(16, 185, 129, 0.32) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 10% 90%, rgba(5, 150, 105, 0.22) 0%, transparent 60%), linear-gradient(145deg, #061c14 0%, #030d09 100%)",
      statusText: "AI DUAL-BRAIN • IOT 3-LAYER",
      statusDot: "#34d399",
    },
  },
  {
    slug: "llm-rag",
    title: "LLM & RAG Playground",
    monogram: "LLM",
    category: "ai",
    categoryLabel: "AI & RAG",
    description:
      "Nền tảng huấn luyện, trải nghiệm và tương tác Mô hình Ngôn ngữ Lớn (LLM) và RAG cá nhân hóa. Kết nối Frontend React 19 với GPU NVIDIA T4 16GB trên Kaggle qua Cloudflare Tunnel, hợp đồng 11 API endpoints, tự học ngữ cảnh tự nhiên.",
    tech: ["React 19", "TypeScript", "Vite", "Kaggle T4 GPU", "RAG", "Cloudflare Tunnel", "Python"],
    github: "https://github.com/tuanhuynh1704/LLM_Chatting_bot",
    badge: "AI RAG Engine",
    isPrivate: true,
    theme: {
      primary: "#a855f7",
      secondary: "#ec4899",
      glow: "rgba(168, 85, 247, 0.3)",
      border: "rgba(168, 85, 247, 0.45)",
      surface:
        "radial-gradient(ellipse 90% 80% at 90% 10%, rgba(168, 85, 247, 0.35) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 10% 90%, rgba(236, 72, 153, 0.22) 0%, transparent 60%), linear-gradient(145deg, #140926 0%, #080311 100%)",
      statusText: "KAGGLE T4 GPU • 11 ENDPOINTS • RAG",
      statusDot: "#c084fc",
    },
  },
  {
    slug: "ip-recon-studio",
    title: "IP Recon Studio",
    monogram: "IPR",
    category: "systems",
    categoryLabel: "Go & Network",
    description:
      "Trạm chẩn đoán & điều tra mạng IPv4/IPv6 chuyên nghiệp giao diện Dark Cyberpunk. Xây dựng với Go (Chi framework, netip engine) tốc độ cao, giao diện React 19, lưu trữ bền vững với Pure Go SQLite (WAL mode).",
    tech: ["Go", "Chi", "React 19", "TypeScript", "Pure Go SQLite", "Vite"],
    github: "https://github.com/tuanhuynh1704/ip-recon-studio",
    badge: "Cyberpunk Tool",
    isPrivate: true,
    theme: {
      primary: "#06b6d4",
      secondary: "#10b981",
      glow: "rgba(6, 182, 212, 0.3)",
      border: "rgba(6, 182, 212, 0.45)",
      surface:
        "radial-gradient(ellipse 90% 80% at 90% 10%, rgba(6, 182, 212, 0.32) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 10% 90%, rgba(16, 185, 129, 0.2) 0%, transparent 60%), linear-gradient(145deg, #041921 0%, #020c10 100%)",
      statusText: "GO CHI • NETIP ENGINE • SQLITE WAL",
      statusDot: "#22d3ee",
    },
  },
  {
    slug: "internal-tool-api",
    title: "Internal Tool API (API Tester Pro)",
    monogram: "API",
    category: "systems",
    categoryLabel: "Go Desktop",
    description:
      "Ứng dụng Desktop IDE toàn diện kiểm thử, đo tải Goroutine stress testing và mock server chuẩn Postman. Xây dựng bằng Go + Wails v2 + React 18, HTTP engine thuần Go bóc tách pha mạng (DNS/TLS/TTFB), SQLite nhúng.",
    tech: ["Go 1.25", "Wails v2", "React 18", "TypeScript", "SQLite", "Monaco Editor"],
    github: "https://github.com/tuanhuynh1704/internal-tool-api",
    badge: "Wails Desktop",
    isPrivate: false,
    theme: {
      primary: "#38bdf8",
      secondary: "#6366f1",
      glow: "rgba(56, 189, 248, 0.3)",
      border: "rgba(56, 189, 248, 0.45)",
      surface:
        "radial-gradient(ellipse 90% 80% at 90% 10%, rgba(56, 189, 248, 0.32) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 10% 90%, rgba(99, 102, 241, 0.22) 0%, transparent 60%), linear-gradient(145deg, #07172e 0%, #030a16 100%)",
      statusText: "WAILS V2 DESKTOP • GOROUTINE STRESS",
      statusDot: "#38bdf8",
    },
  },
  {
    slug: "virtual-office",
    title: "Virtual Office",
    monogram: "VO",
    category: "web",
    categoryLabel: "Web Platform",
    description:
      "Văn phòng ảo theo dõi trạng thái nhân sự thời gian thực bằng nhân vật hoạt hình tương tác. Ứng dụng Next.js 16 App Router mới nhất kết hợp React 19 và Tailwind CSS 4 mang lại trải nghiệm làm việc từ xa trực quan, sống động.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4"],
    github: "https://github.com/tuanhuynh1704/phong-lam-viec",
    badge: "Realtime Office",
    isPrivate: true,
    theme: {
      primary: "#fb923c",
      secondary: "#f43f5e",
      glow: "rgba(251, 146, 60, 0.3)",
      border: "rgba(251, 146, 60, 0.45)",
      surface:
        "radial-gradient(ellipse 90% 80% at 90% 10%, rgba(251, 146, 60, 0.32) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 10% 90%, rgba(244, 63, 94, 0.22) 0%, transparent 60%), linear-gradient(145deg, #240e06 0%, #0c0502 100%)",
      statusText: "NEXT.JS 16 • REACT 19 • REALTIME",
      statusDot: "#fb923c",
    },
  },
  {
    slug: "inntech-club",
    title: "INNTECH CLUB",
    monogram: "INN",
    category: "web",
    categoryLabel: "Web Platform",
    description:
      "Website landing page chính thức của Câu lạc bộ Công nghệ và Sáng tạo — Trường ĐH Nguyễn Tất Thành. Tích hợp Scroll Reveal, Sticky Header Blur với thanh tiến độ cuộn, tối ưu hiệu năng prerender tĩnh.",
    tech: ["Next.js 16", "React 19", "TypeScript", "CSS Modules"],
    github: "https://github.com/tuanhuynh1704/inntech-club",
    live: "https://inntech-club.vercel.app",
    badge: "NTTU Official",
    isPrivate: false,
    theme: {
      primary: "#3b82f6",
      secondary: "#38bdf8",
      glow: "rgba(59, 130, 246, 0.3)",
      border: "rgba(59, 130, 246, 0.45)",
      surface:
        "radial-gradient(ellipse 90% 80% at 90% 10%, rgba(59, 130, 246, 0.32) 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 10% 90%, rgba(56, 189, 248, 0.22) 0%, transparent 60%), linear-gradient(145deg, #0a1438 0%, #040818 100%)",
      statusText: "NTTU TECH HUB • PRERENDER ENGINE",
      statusDot: "#60a5fa",
    },
  },
];

export const navLinks = [
  { label: "Giới thiệu", href: "#about" },
  { label: "Chỉ số", href: "#stats" },
  { label: "Kỹ năng", href: "#skills" },
  { label: "Dự án", href: "#projects" },
  { label: "Liên hệ", href: "#contact" },
];
