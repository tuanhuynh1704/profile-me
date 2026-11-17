"use client";

import { useEffect, useState } from "react";

export default function FloatingHUD() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      setVisible(scrollY > 350);

      if (docHeight > 0) {
        setProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG ring circumference for r=18 is 2 * pi * 18 ≈ 113.1
  const strokeDashoffset = 113.1 - (113.1 * progress) / 100;

  return (
    <aside
      className={`floating-hud ${visible ? "is-active" : ""}`}
      aria-label="Điều hướng nhanh"
    >
      <button
        type="button"
        className="hud-back-to-top"
        onClick={scrollToTop}
        aria-label="Cuộn lên đầu trang"
        title="Lên đầu trang"
      >
        <svg
          className="hud-progress-ring"
          width="46"
          height="46"
          viewBox="0 0 46 46"
          aria-hidden="true"
        >
          <circle
            className="ring-bg"
            cx="23"
            cy="23"
            r="18"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="2.5"
          />
          <circle
            className="ring-bar"
            cx="23"
            cy="23"
            r="18"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeDasharray="113.1"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        <span className="hud-icon-wrap" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </span>
      </button>
    </aside>
  );
}
