"use client";

import { useState } from "react";
import Link from "next/link";
import { projects, ProjectCategory } from "@/lib/data";
import {
  IconGitHub,
  IconExternal,
  IconLock,
  IconAward,
  IconSparkles,
  IconArrowRight,
} from "./Icons";

const filterTabs = [
  { id: "all" as ProjectCategory, label: "Tất cả" },
  { id: "ai" as ProjectCategory, label: "AI & ML" },
  { id: "systems" as ProjectCategory, label: "Go & Systems" },
  { id: "web" as ProjectCategory, label: "Web Platform" },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>("all");

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-head projects-head" data-reveal>
          <div>
            <p className="kicker">Dự án tiêu biểu</p>
            <h2>Sản phẩm thực tế &amp; Nghiên cứu.</h2>
            <p className="section-sub">
              Tuyển tập các hệ sinh thái AI, công cụ Go hiệu năng cao và web app hiện đại từ 46+ repositories.
            </p>
          </div>

          <div className="project-tabs" role="tablist">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`tab-btn ${activeTab === tab.id ? "is-active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.id === "ai" && <IconSparkles size={14} />}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((p, index) => (
            <article
              key={p.title}
              className="project-card spotlight"
              onMouseMove={handleMouseMove}
              data-reveal
              style={{
                ["--delay" as string]: `${index * 100}ms`,
                ["--theme-primary" as string]: p.theme.primary,
                ["--theme-secondary" as string]: p.theme.secondary,
                ["--theme-glow" as string]: p.theme.glow,
                ["--theme-border" as string]: p.theme.border,
              }}
            >
              <span className="corner-bracket corner-tl" aria-hidden="true" />
              <span className="corner-bracket corner-br" aria-hidden="true" />
              <div
                className="project-thumb"
                style={{ background: p.theme.surface }}
                aria-hidden="true"
              >
                {/* Tech grid mesh overlay */}
                <span className="project-grid-mesh" />
                <span className="project-shine" />
                <span className="thumb-sheen-beam" />

                {/* HUD Top Bar */}
                <div className="thumb-hud-top">
                  <span className="thumb-status-tag">
                    <span
                      className="thumb-pulse-dot"
                      style={{
                        background: p.theme.statusDot,
                        boxShadow: `0 0 10px ${p.theme.statusDot}`,
                      }}
                    />
                    {p.theme.statusText}
                  </span>
                </div>

                {/* Center Glass Monogram Insignia */}
                <div className="thumb-center-insignia">
                  <div
                    className="insignia-pill"
                    style={{
                      borderColor: p.theme.border,
                      boxShadow: `0 8px 30px ${p.theme.glow}`,
                    }}
                  >
                    <span
                      className="insignia-monogram"
                      style={{
                        ["--mono-primary" as string]: p.theme.primary,
                      }}
                    >
                      {p.monogram}
                    </span>
                    <span className="insignia-sub">{p.categoryLabel}</span>
                  </div>
                </div>

                {/* Bottom Badge */}
                {p.badge && (
                  <div className="thumb-badge-wrap">
                    <span
                      className="project-badge"
                      style={{
                        borderColor: p.theme.border,
                      }}
                    >
                      <IconAward size={13} style={{ color: p.theme.primary }} />
                      {p.badge}
                    </span>
                  </div>
                )}
              </div>

              <div className="project-body">
                <div className="project-header-row">
                  <span
                    className="project-category-tag"
                    style={{ color: p.theme.primary }}
                  >
                    {p.categoryLabel}
                  </span>
                  {p.isPrivate && (
                    <span className="private-tag" title="Repository nội bộ trên GitHub">
                      <IconLock size={12} /> Private Repo
                    </span>
                  )}
                </div>

                <h3>{p.title}</h3>
                <p>{p.description}</p>

                <div className="tech-chips">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="project-link-btn detail-btn"
                  >
                    Mô tả dự án <IconArrowRight size={14} style={{ color: p.theme.primary }} />
                  </Link>
                  {p.live && (
                    <a
                      href={p.live}
                      aria-label={`Xem trực tiếp ${p.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn live-btn"
                    >
                      <IconExternal size={15} style={{ color: p.theme.primary }} />
                      Live Demo
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      aria-label={`Mã nguồn ${p.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn"
                    >
                      <IconGitHub size={17} />
                      {p.isPrivate ? "GitHub (Private)" : "GitHub"}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
