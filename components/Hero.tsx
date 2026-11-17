import Image from "next/image";
import { site } from "@/lib/data";
import {
  IconGitHub,
  IconLinkedIn,
  IconArrowRight,
  IconSparkles,
  IconAward,
} from "./Icons";
import { SeasonalAvatarDeco } from "./SeasonalDeco";

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "github") return <IconGitHub />;
  if (icon === "linkedin") return <IconLinkedIn />;
  return null;
}

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <div className="hero-status-pill">
            <span className="pulse" aria-hidden="true" />
            <span>Sẵn sàng cho các dự án mới &amp; Thử thách công nghệ</span>
            <span className="sound-wave" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
          </div>

          <h1 className="hero-title">{site.name}</h1>
          <p className="hero-subtitle">
            <strong>Full-stack &amp; AI Systems Developer</strong>
          </p>
          <p className="hero-tagline">{site.tagline}</p>

          <div className="hero-badges">
            <span className="hero-badge">
              <IconSparkles size={14} /> Go &amp; Wails Desktop
            </span>
            <span className="hero-badge">
              <IconSparkles size={14} /> LLM &amp; RAG Systems
            </span>
            <span className="hero-badge">
              <IconSparkles size={14} /> React 19 &amp; Next.js 16
            </span>
            <span className="hero-badge hero-badge-agent">
              <IconSparkles size={14} /> Multi-Agent Swarms &amp; Automation
            </span>
          </div>

          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              Khám phá dự án <IconArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Liên hệ hợp tác
            </a>
          </div>

          <div className="hero-socials">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="social-link"
                aria-label={s.label}
                {...(s.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <SocialIcon icon={s.icon} />
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="hero-card">
          <div className="portrait-container">
            {/* Ambient Aura & HUD Corners */}
            <span className="portrait-glow-aura" aria-hidden="true" />
            <span className="portrait-gradient-border" aria-hidden="true" />
            <span className="hud-corner hud-tl" aria-hidden="true" />
            <span className="hud-corner hud-tr" aria-hidden="true" />
            <span className="hud-corner hud-bl" aria-hidden="true" />
            <span className="hud-corner hud-br" aria-hidden="true" />

            {/* Seasonal Full-Border Wraparound (Tuyết & Noel, Cành Mai Đào Tết, Lá Dừa Biển, Lá Phong Thu) */}
            <SeasonalAvatarDeco />

            {/* Main Portrait Card */}
            <div className="portrait-frame">
              <Image
                src="/avatar.jpg"
                alt="Ảnh chân dung Huỳnh Anh Tuấn"
                width={420}
                height={560}
                priority
                className="avatar-photo"
              />

              {/* Bottom vignette overlay */}
              <div className="portrait-overlay" aria-hidden="true" />

              {/* Top HUD Chips */}
              <div className="portrait-top-hud">
                <span className="status-live-pill">
                  <span className="pulse-dot-green" aria-hidden="true" />
                  ACTIVE
                </span>
                <span className="award-mini-pill">
                  <IconAward size={13} />
                  NTTU 2026
                </span>
              </div>

              {/* Bottom Info HUD Card */}
              <div className="portrait-bottom-info">
                <div className="info-identity">
                  <span className="info-name">Huỳnh Anh Tuấn</span>
                  <span className="info-role">Full-stack &amp; AI Systems</span>
                </div>
                <div className="info-motto">
                  <span>Build. Learn.</span>
                  <strong>Improve. Repeat.</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
