"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("portfolio-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  if (!mounted) {
    return (
      <div className="theme-toggle-placeholder" aria-hidden="true" />
    );
  }

  return (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "☀️ Nền sáng" : "🌙 Nền tối"}
      title={theme === "dark" ? "Chuyển sang nền sáng để thấy hiệu ứng rõ hơn" : "Chuyển về nền tối"}
    >
      {theme === "dark" ? (
        <>
          <span className="theme-toggle-icon" aria-hidden="true">☀️</span>
          <span className="theme-toggle-label">Nền sáng</span>
        </>
      ) : (
        <>
          <span className="theme-toggle-icon" aria-hidden="true">🌙</span>
          <span className="theme-toggle-label">Nền tối</span>
        </>
      )}
    </button>
  );
}
