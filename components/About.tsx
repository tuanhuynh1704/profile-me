import { quickFacts } from "@/lib/data";
import { IconCpu, IconTrophy, IconFileText, IconSparkles } from "@/components/Icons";

const aboutSections = [
  {
    tag: "Kỹ sư Phần mềm & Hệ thống",
    icon: IconCpu,
    content: (
      <p>
        Tôi là <strong>Huỳnh Anh Tuấn</strong>, lập trình viên tập trung vào việc
        xây dựng các hệ thống phần mềm hiệu năng cao, clean code và trải nghiệm mượt mà. 
        Hiện tôi sở hữu và phát triển hơn <strong>46 repositories</strong> trên GitHub, 
        trải rộng từ backend Go, ứng dụng Desktop Wails v2 đến các mô hình AI/RAG.
      </p>
    ),
  },
  {
    tag: "Khởi nghiệp & Đổi mới sáng tạo",
    icon: IconTrophy,
    content: (
      <p>
        Với vai trò <strong>Growth &amp; Operations Lead</strong> tại <strong>EaAgri</strong>, 
        tôi cùng đội ngũ đã xuất sắc đạt <strong>Quán quân Bảng 1C</strong> tại cuộc thi 
        <em> NTTU Innovation Startup 2026</em> với giải pháp nông nghiệp thông minh ứng dụng 
        AI Dual-Brain (YOLOv9 + Gemini) và trạm cảm biến IoT.
      </p>
    ),
  },
  {
    tag: "Bản chất Kỹ thuật & Hạ tầng",
    icon: IconFileText,
    content: (
      <p>
        Tôi yêu thích việc đi sâu vào bản chất kỹ thuật: tối ưu luồng mạng (netip, httptrace), 
        xử lý đa luồng Goroutines, nhúng SQLite WAL, kết nối đường hầm Cloudflare Tunnel với 
        GPU Kaggle NVIDIA T4 để phục vụ suy luận mô hình ngôn ngữ lớn (LLM).
      </p>
    ),
  },
  {
    tag: "Văn hóa AI-Native & Swarm Orchestration",
    icon: IconSparkles,
    content: (
      <p>
        Tôi đặc biệt ứng dụng thành thạo văn hóa <strong>AI-Native Engineering</strong> và các công cụ tích hợp như 
        <strong> Antigravity</strong> (Swarm Multi-Agent), <strong>Claude Code (Opus/Sonnet)</strong>, 
        <strong> OpenAI Codex</strong>, <strong>OpenCode</strong>, <strong>Cursor AI</strong> và <strong>Gemini CLI</strong>. 
        Tôi xây dựng <strong>đội ngũ AI gồm Agent chính điều phối mạng lưới Subagent chuyên môn hóa</strong> song song — 
        tự động hóa khép kín từ khảo sát, lập trình, kiểm thử đến triển khai — bản thân đóng vai trò Kiến trúc sư trưởng 
        đọc và thẩm định báo cáo tổng hợp, nhân 10x năng suất phát triển phần mềm.
      </p>
    ),
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="kicker">Giới thiệu</p>
          <h2>Kỹ thuật phần mềm thực chiến &amp; Kiến trúc mở rộng.</h2>
          <p className="section-sub">
            Full-stack &amp; AI Systems Developer — Go, Wails, React 19, Next.js và LLM/RAG.
          </p>
        </div>
        <div className="about-grid">
          <div className="about-cards">
            {aboutSections.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.tag}
                  className="about-card"
                  data-reveal
                  style={{ ["--delay" as string]: `${index * 80}ms` }}
                >
                  <div className="about-card-header">
                    <span className="about-card-tag">
                      <Icon size={14} className="about-tag-icon" />
                      <span>{item.tag}</span>
                    </span>
                  </div>
                  <div className="about-card-body">
                    {item.content}
                  </div>
                </article>
              );
            })}
          </div>
          <ul className="quick-facts">
            {quickFacts.map((f, index) => (
              <li
                key={f.label}
                data-reveal
                style={{ ["--delay" as string]: `${index * 75}ms` }}
              >
                <span className="fact-bullet" aria-hidden="true" />
                <span className="fact-copy">
                  <span className="fact-label">{f.label}</span>
                  <span className="fact-value">{f.value}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
