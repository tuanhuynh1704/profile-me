import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  IconArrowRight,
  IconExternal,
  IconGitHub,
  IconAward,
  IconSparkles,
} from "@/components/Icons";
import { projectDetailsMap } from "@/lib/projectDetails";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(projectDetailsMap).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectDetailsMap[slug];
  if (!project) return { title: "Dự án không tìm thấy | Huỳnh Anh Tuấn" };

  return {
    title: `${project.title} | Huỳnh Anh Tuấn`,
    description: project.overview,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const p = projectDetailsMap[slug];

  if (!p) {
    notFound();
  }

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
          <span className="nav-current">{p.title.split("—")[0].trim()}</span>
        </nav>

        {/* Hero Header */}
        <header className="detail-hero">
          <div className="detail-hero-badge-row">
            <span
              className="hero-status-tag"
              style={{
                borderColor: p.theme.border,
                color: p.theme.primary,
              }}
            >
              <span
                className="pulse-dot-green"
                style={{ background: p.theme.primary, boxShadow: `0 0 10px ${p.theme.primary}` }}
              />
              {p.category.toUpperCase()}
            </span>
            {p.award && (
              <span className="hero-award-tag" style={{ borderColor: p.theme.border }}>
                <IconAward size={14} style={{ color: p.theme.primary }} />
                {p.award}
              </span>
            )}
          </div>

          <h1 className="detail-title">{p.title}</h1>
          <p className="detail-subtitle">{p.tagline}</p>

          <p className="detail-lead">{p.overview}</p>

          <div className="detail-actions">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  background: p.theme.primary,
                  color: "#0a0c12",
                }}
              >
                Trang web trực tiếp <IconExternal size={16} />
              </a>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <IconGitHub size={17} /> Mã nguồn GitHub
              </a>
            )}
          </div>
        </header>

        {/* Section: Key Features */}
        <section className="detail-section">
          <div className="section-head">
            <p className="kicker">Tính năng &amp; Kỹ thuật</p>
            <h2>Điểm nổi bật từ tài liệu README.md</h2>
            <p className="section-sub">
              Chi tiết các tính năng, module và cấu trúc đã được kiểm thử và đưa vào mã nguồn.
            </p>
          </div>

          <div className="features-grid">
            {p.keyFeatures.map((feat) => (
              <div
                key={feat.title}
                className="feature-card"
                style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
              >
                <div className="feature-top">
                  {feat.badge && (
                    <span
                      className="feature-badge"
                      style={{
                        background: `rgba(255, 255, 255, 0.05)`,
                        borderColor: p.theme.border,
                        color: p.theme.primary,
                      }}
                    >
                      <IconSparkles size={12} />
                      {feat.badge}
                    </span>
                  )}
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

        {/* Section: Tech Stack */}
        <section className="detail-section">
          <div className="section-head">
            <p className="kicker">Công nghệ sử dụng</p>
            <h2>Ngăn xếp công nghệ (Tech Stack).</h2>
          </div>

          <div className="tech-stack-detailed-grid">
            {p.techStackDetailed.map((group) => (
              <div key={group.category} className="tech-group-card">
                <h4 style={{ color: p.theme.primary }}>{group.category}</h4>
                <div className="chips">
                  {group.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <div className="detail-footer-cta">
          <h2>Muốn tìm hiểu thêm về {p.title.split("—")[0].trim()}?</h2>
          <p>
            Trao đổi trực tiếp với tôi về kiến trúc hệ thống hoặc các cơ hội hợp tác phát triển.
          </p>
          <div className="cta-btn-group">
            <Link href="/#contact" className="btn btn-primary">
              Liên hệ trao đổi <IconArrowRight size={18} />
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
