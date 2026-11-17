"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data";
import MobileNav from "./MobileNav";
import SiteNav from "./SiteNav";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" className="logo" aria-label="HAT Huỳnh Anh Tuấn" suppressHydrationWarning>
          <span className="monogram">{site.monogram}</span>{' '}
          <span className="logo-name">{site.name}</span>
        </a>
        <SiteNav />
        <ThemeToggle />
        <a href="#contact" className="header-cta">
          Liên hệ
        </a>
        <MobileNav />
      </div>
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
    </header>
  );
}
