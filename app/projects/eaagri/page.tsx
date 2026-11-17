import Link from "next/link";
import { Metadata } from "next";
import {
  IconArrowRight,
  IconExternal,
  IconGitHub,
  IconAward,
  IconSparkles,
  IconCheck,
} from "@/components/Icons";
import { projectDetailsMap } from "@/lib/projectDetails";

export const metadata: Metadata = {
  title: "EaAgri — Hệ Sinh Thái Nông Nghiệp Thông Minh | Huỳnh Anh Tuấn",
  description:
    "Chi tiết dự án EaAgri: Hệ sinh thái Nông nghiệp Thông minh Hybrid cho sầu riêng Việt Nam ứng dụng AI Dual-Brain (YOLOv9 + Gemini) và IoT 3 lớp. Quán quân NTTU Innovation Startup 2026.",
};

export default function EaAgriDetailPage() {
  const p = projectDetailsMap["eaagri"];

  return (
    <div className="project-detail-page">
      {/* Top Ambient Glow */}
      <div className="detail-ambient-glow" style={{ background: p.theme.glow }} />

      <div className="container detail-container">
        {/* Navigation Breadcrumb */}
        <nav className="detail-nav" aria-label="Điều hướng">
          <Link href="/#projects" className="back-link">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Trở về Portfolio</span>
          </Link>
          <span className="nav-separator">/</span>
          <span className="nav-current">EaAgri</span>
        </nav>

        {/* Hero Header */}
        <header className="detail-hero">
          <div className="detail-hero-badge-row">
            <span className="hero-status-tag">
              <span className="pulse-dot-green" />
              AI &amp; IOT SMART FARMING
            </span>
            <span className="hero-award-tag">
              <IconAward size={14} />
              Quán quân NTTU Innovation Startup 2026
            </span>
          </div>

          <h1 className="detail-title">
            EaAgri — Hệ Sinh Thái Nông Nghiệp Thông Minh
          </h1>
          <p className="detail-subtitle">
            Digital Farming System • AI &quot;Dual-Brain&quot; (YOLOv9 + Gemini) • IoT Smart Irrigation • Market Forecast
          </p>

          <p className="detail-lead">{p.overview}</p>

          <div className="detail-actions">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Trang web nền tảng <IconExternal size={16} />
              </a>
            )}
            <a
              href="https://www.eaagri.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Trang giới thiệu (eaagri.vn) <IconExternal size={16} />
            </a>
            {p.googlePlay && (
              <a
                href={p.googlePlay}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Google Play App <IconExternal size={16} />
              </a>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <IconGitHub size={17} /> GitHub Repo
              </a>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="detail-metrics-grid">
            <div className="metric-box">
              <span className="metric-val">Bảng 1C</span>
              <span className="metric-lbl">Quán quân NTTU Startup 2026</span>
            </div>
            <div className="metric-box">
              <span className="metric-val">Dual-Brain</span>
              <span className="metric-lbl">YOLOv9 Vision + Gemini LLM</span>
            </div>
            <div className="metric-box">
              <span className="metric-val">3 Lớp</span>
              <span className="metric-lbl">Tưới thông minh theo vi khí hậu</span>
            </div>
            <div className="metric-box">
              <span className="metric-val">1 - 7 Ngày</span>
              <span className="metric-lbl">Mô hình LSTM dự báo giá</span>
            </div>
          </div>
        </header>

        {/* Section: Problem & Solution */}
        {p.problemSolution && (
          <section className="detail-section">
            <div className="section-head">
              <p className="kicker">Bối cảnh &amp; Bài toán</p>
              <h2>{p.problemSolution.problemTitle}</h2>
              <p className="section-sub">
                Ngành nông nghiệp sầu riêng và cây ăn trái giá trị cao tại Đắk Lắk và Tây Nguyên đang đối mặt với những thách thức nghiêm trọng.
              </p>
            </div>

            <div className="problem-grid">
              {p.problemSolution.problemItems.map((item) => (
                <div key={item.label} className="problem-card">
                  <span className="problem-badge">
                    <IconSparkles size={13} /> Vấn đề
                  </span>
                  <h3>{item.label}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="solution-banner">
              <div className="solution-badge">
                <IconSparkles size={16} /> Giải pháp EaAgri
              </div>
              <p>{p.problemSolution.solutionDesc}</p>
            </div>
          </section>
        )}

        {/* Section: Architecture */}
        {p.architecture && (
          <section className="detail-section">
            <div className="section-head">
              <p className="kicker">Kiến trúc công nghệ</p>
              <h2>{p.architecture.title}</h2>
              <p className="section-sub">{p.architecture.description}</p>
            </div>

            <div className="architecture-grid">
              {p.architecture.layers.map((layer) => (
                <div key={layer.layer} className="arch-card">
                  <div className="arch-header">
                    <span className="arch-layer-pill">{layer.layer}</span>
                    <h3>{layer.name}</h3>
                  </div>
                  <p>{layer.desc}</p>
                  <div className="arch-tags">
                    {layer.components.map((c) => (
                      <span key={c} className="arch-tag">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Key Features */}
        <section className="detail-section">
          <div className="section-head">
            <p className="kicker">Tính năng cốt lõi</p>
            <h2>Đột phá công nghệ vì nhà nông.</h2>
            <p className="section-sub">
              Các tính năng thực chiến đã được đưa vào ứng dụng thực tế và thử nghiệm tại vườn.
            </p>
          </div>

          <div className="features-grid">
            {p.keyFeatures.map((feat) => (
              <div key={feat.title} className="feature-card">
                <div className="feature-top">
                  <span className="feature-badge">{feat.badge}</span>
                </div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
                <div className="feature-tech">
                  {feat.tech.map((t) => (
                    <span key={t} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Core Team */}
        {p.team && (
          <section className="detail-section">
            <div className="section-head">
              <p className="kicker">Đội ngũ phát triển</p>
              <h2>Đội ngũ sáng lập &amp; Vận hành (Core Team).</h2>
              <p className="section-sub">
                Sinh viên Khoa Công nghệ Thông tin — Trường Đại học Nguyễn Tất Thành.
              </p>
            </div>

            <div className="team-grid">
              {p.team.map((member) => (
                <div
                  key={member.name}
                  className={`team-card ${
                    member.name.includes("HUỲNH ANH TUẤN") ? "is-author" : ""
                  }`}
                >
                  <div className="team-avatar-box">
                    <span>
                      {member.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div className="team-info">
                    <h4>{member.name}</h4>
                    <span className="team-role">{member.role}</span>
                    <p>{member.responsibilities}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Roadmap */}
        {p.roadmap && (
          <section className="detail-section">
            <div className="section-head">
              <p className="kicker">Lộ trình phát triển</p>
              <h2>Lộ trình thương mại hóa &amp; Pilot thực địa.</h2>
            </div>

            <div className="roadmap-timeline">
              {p.roadmap.map((step, idx) => (
                <div
                  key={step.phase}
                  className={`roadmap-item ${step.done ? "is-done" : ""}`}
                >
                  <div className="roadmap-status">
                    {step.done ? <IconCheck size={16} /> : <span>{idx + 1}</span>}
                  </div>
                  <div className="roadmap-content">
                    <span className="roadmap-phase">{step.phase}</span>
                    <h4>{step.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer CTA */}
        <div className="detail-footer-cta">
          <h2>Quan tâm đến giải pháp Nông Nghiệp Số?</h2>
          <p>
            Kết nối cùng tôi để trao đổi thêm về kiến trúc kỹ thuật AI/IoT hoặc hợp tác triển khai giải pháp.
          </p>
          <div className="cta-btn-group">
            <Link href="/#contact" className="btn btn-primary">
              Liên hệ hợp tác <IconArrowRight size={18} />
            </Link>
            <Link href="/#projects" className="btn btn-ghost">
              Xem các dự án khác
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
