"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";

export default function SiteNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. Khi ở khu vực Hero (đầu trang), không highlight link nào trong menu
      if (scrollY < 220) {
        setActive("");
        return;
      }

      // 2. Khi cuộn gần sát chân trang (120px cuối), luôn highlight Liên hệ
      if (windowHeight + scrollY >= docHeight - 120) {
        setActive("#contact");
        return;
      }

      // 3. Đường tiêu cự thị giác: khoảng 35% chiều cao viewport (sau thanh header 72px)
      const focalLine = Math.min(260, windowHeight * 0.35);

      // Tìm section đang bao trùm đường tiêu cự
      let matchedHref = "";
      for (const link of navLinks) {
        const id = link.href.slice(1);
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= focalLine && rect.bottom > focalLine) {
          matchedHref = link.href;
          break;
        }
      }

      // Dự phòng khi khoảng cách giữa 2 section: lấy section gần nhất nằm trên đường tiêu cự
      if (!matchedHref) {
        let maxTop = -Infinity;
        for (const link of navLinks) {
          const id = link.href.slice(1);
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= focalLine && rect.top > maxTop) {
            maxTop = rect.top;
            matchedHref = link.href;
          }
        }
      }

      if (matchedHref) {
        setActive(matchedHref);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Kiểm tra ngay khi mount
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className="desktop-nav" aria-label="Điều hướng chính">
      <ul>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={active === link.href ? "is-active" : undefined}
              aria-current={active === link.href ? "true" : undefined}
              onClick={() => setActive(link.href)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
