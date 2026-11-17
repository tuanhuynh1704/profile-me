"use client";

import { useEffect } from "react";

/**
 * Điều khiển hiệu ứng cuộn (Scroll Reveal):
 * - Phần tử cuộn tới đâu thì xuất hiện tới đó (is-visible)
 * - Khi cuộn ra khỏi tầm nhìn (vượt qua lề an toàn 80px), phần tử ẩn đi để cuộn lại thì kích hoạt tiếp
 * - Tự động quan sát các phần tử mới khi re-render hoặc đổi tab (MutationObserver)
 */
export default function ScrollReveal() {
  useEffect(() => {
    document.documentElement.classList.add("js");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observedSet = new WeakSet<HTMLElement>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        }
      },
      {
        threshold: 0,
        // Biên 80px giúp phần tử bắt đầu hiện từ trước khi chạm mép màn hình,
        // không bao giờ bị cắt đột ngột trước mắt người xem
        rootMargin: "80px 0px 80px 0px",
      }
    );

    const scanAndObserve = () => {
      const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
      elements.forEach((el) => {
        if (!observedSet.has(el)) {
          observedSet.add(el);
          observer.observe(el);

          // Nếu phần tử đang nằm sẵn trong viewport, hiển thị ngay
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight + 80 && rect.bottom > -80) {
            el.classList.add("is-visible");
          }
        }
      });
    };

    scanAndObserve();

    // Theo dõi DOM để tự động observe các phần tử mới (khi lọc tab Projects, load thêm...)
    const mutationObserver = new MutationObserver(() => {
      scanAndObserve();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
