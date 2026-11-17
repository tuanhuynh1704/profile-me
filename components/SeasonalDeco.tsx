"use client";

import React, { useEffect, useState } from "react";

export function SeasonalAvatarDeco() {
  const [currentSeason, setCurrentSeason] = useState<string>("winter");
  const [baseSeason, setBaseSeason] = useState<string>("winter");
  const [currentFestive, setCurrentFestive] = useState<string>("none");

  useEffect(() => {
    const updateAttributes = () => {
      const season = document.documentElement.getAttribute("data-season") || "winter";
      const base = document.documentElement.getAttribute("data-base-season") || season || "winter";
      const festive = document.documentElement.getAttribute("data-festive") || "none";
      setCurrentSeason(season);
      setBaseSeason(base);
      setCurrentFestive(festive);
    };

    updateAttributes();

    const observer = new MutationObserver(updateAttributes);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-season", "data-base-season", "data-festive"],
    });

    return () => observer.disconnect();
  }, []);

  // Xác định mùa hiển thị chính xác (kể cả khi đang ở chế độ giao mùa)
  const effectiveSeason = (currentSeason !== "transition" ? currentSeason : baseSeason) || "winter";

  const isWinter =
    currentFestive === "noel" ||
    (effectiveSeason === "winter" &&
      currentFestive !== "tet" &&
      currentFestive !== "newyear" &&
      currentFestive !== "spring-natural" &&
      currentFestive !== "beach");

  const isSpring =
    currentFestive === "tet" ||
    currentFestive === "newyear" ||
    currentFestive === "spring-natural" ||
    (effectiveSeason === "spring" &&
      currentFestive !== "noel" &&
      currentFestive !== "beach");

  // Tết-specific sub-flags (lì xì, pháo, đèn lồng chỉ khi đang trong dịp Tết)
  const isTetFestive = currentFestive === "tet" || currentFestive === "newyear";

  const isSummer =
    currentFestive === "beach" ||
    (effectiveSeason === "summer" &&
      currentFestive !== "noel" &&
      currentFestive !== "tet" &&
      currentFestive !== "newyear" &&
      currentFestive !== "spring-natural");

  const isAutumn =
    effectiveSeason === "autumn" &&
    currentFestive !== "noel" &&
    currentFestive !== "tet" &&
    currentFestive !== "newyear" &&
    currentFestive !== "spring-natural" &&
    currentFestive !== "beach";

  return (
    <div className="avatar-seasonal-frame-wrapper" aria-hidden="true">
      {/* ========================================================
          1. MÙA ĐÔNG & NOEL: KHUNG VIỀN DÂY THÔNG TUYẾT & MŨ NOEL
          Bao bọc toàn bộ 4 cạnh: Tuyết phủ đỉnh, Dây thông 2 bên, Chuông đáy
         ======================================================== */}
      {isWinter && (
        <div className="wrapped-frame winter-noel-frame">
          {/* Mép trên: Lớp tuyết xốp dày phủ trọn vẹn mép khung với các cột nhũ băng (Icicles) */}
          <div className="frame-border-top snow-border-top">
            <svg viewBox="0 0 340 36" preserveAspectRatio="none" className="snow-top-svg">
              <defs>
                <linearGradient id="snowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="70%" stopColor="#f0f9ff" />
                  <stop offset="100%" stopColor="#bae6fd" />
                </linearGradient>
                <filter id="iceGlow">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#38bdf8" floodOpacity="0.45" />
                </filter>
              </defs>
              {/* Lớp tuyết dày có nhũ băng rủ xuống */}
              <path
                d="M-5 0 L345 0 L345 12 
                   Q330 20, 318 10 Q310 24, 305 12 Q295 18, 285 8 Q275 28, 268 9 
                   Q255 18, 242 11 Q230 32, 222 10 Q210 22, 198 12 Q185 29, 175 10 
                   Q160 19, 148 11 Q135 34, 126 9 Q115 21, 102 12 Q90 30, 82 10 
                   Q70 19, 58 11 Q48 26, 40 9 Q25 21, 12 12 Q0 22, -5 10 Z"
                fill="url(#snowGrad)"
                filter="url(#iceGlow)"
              />
              {/* Vệt sáng lấp lánh trên tuyết */}
              <path
                d="M10 4 Q80 8, 160 3 Q240 7, 330 4"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Cạnh viền trái: Dải cành thông tuyết & quả mọng đỏ leo dọc từ trên xuống */}
          <div className="frame-border-side border-left pine-border-left">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="pine-side-svg">
              <defs>
                <linearGradient id="pineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#166534" />
                  <stop offset="60%" stopColor="#15803d" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
              {/* Thân dây leo thông */}
              <path d="M16 0 Q 8 115, 18 230 Q 10 345, 16 460" stroke="#14532d" strokeWidth="3" fill="none" />
              {/* Các cụm nhánh thông tuyết chìa ra */}
              {Array.from({ length: 14 }).map((_, i) => (
                <g key={`pine-l-${i}`} transform={`translate(16, ${i * 32 + 18})`}>
                  <path d="M0 0 L -12 -6 M0 0 L -14 0 M0 0 L -12 6 M0 0 L 10 -4 M0 0 L 10 4" stroke="url(#pineGrad)" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Quả mọng đỏ Giáng sinh */}
                  {i % 2 === 0 && <circle cx="-9" cy="0" r="3.2" fill="#ef4444" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.4))" />}
                  {/* Đốm tuyết đọng trên lá thông */}
                  {i % 3 === 0 && <circle cx="-4" cy="-5" r="2.2" fill="#ffffff" />}
                  {/* Bóng đèn LED Noel phát sáng li ti */}
                  {i % 2 === 1 && (
                    <circle
                      cx="-11"
                      cy="4"
                      r="2.8"
                      fill={i % 4 === 1 ? "#facc15" : "#38bdf8"}
                      className="fairy-light-dot"
                    />
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* Cạnh viền phải: Dải cành thông tuyết & đèn LED Noel leo dọc viền phải */}
          <div className="frame-border-side border-right pine-border-right">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="pine-side-svg">
              {/* Thân dây leo thông */}
              <path d="M16 0 Q 24 115, 14 230 Q 22 345, 16 460" stroke="#14532d" strokeWidth="3" fill="none" />
              {/* Các cụm nhánh thông tuyết chìa ra */}
              {Array.from({ length: 14 }).map((_, i) => (
                <g key={`pine-r-${i}`} transform={`translate(16, ${i * 32 + 26})`}>
                  <path d="M0 0 L 12 -6 M0 0 L 14 0 M0 0 L 12 6 M0 0 L -10 -4 M0 0 L -10 4" stroke="url(#pineGrad)" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Quả mọng đỏ */}
                  {i % 2 === 1 && <circle cx="9" cy="0" r="3.2" fill="#ef4444" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.4))" />}
                  {/* Đốm tuyết */}
                  {i % 3 === 1 && <circle cx="4" cy="-5" r="2.2" fill="#ffffff" />}
                  {/* Bóng đèn LED Noel */}
                  {i % 2 === 0 && (
                    <circle
                      cx="11"
                      cy="4"
                      r="2.8"
                      fill={i % 4 === 0 ? "#ef4444" : "#4ade80"}
                      className="fairy-light-dot"
                    />
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* Mép đáy: Dải thông tuyết phủ kín đáy với Chuông vàng, Quả châu & Nơ đỏ Noel */}
          <div className="frame-border-bottom snow-border-bottom">
            <svg viewBox="0 0 340 44" preserveAspectRatio="none" className="snow-bottom-svg">
              <defs>
                <linearGradient id="bellGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#ca8a04" />
                </linearGradient>
              </defs>
              {/* Lớp tuyết phủ ở đáy khung */}
              <path
                d="M-5 44 L345 44 L345 28 Q300 20, 260 27 Q220 18, 180 26 Q130 19, 90 28 Q45 21, -5 29 Z"
                fill="url(#snowGrad)"
              />
              {/* Nhánh thông uốn chân khung */}
              <path d="M10 32 Q 90 22, 170 28 Q 250 20, 330 30" stroke="#166534" strokeWidth="4" strokeLinecap="round" fill="none" />
              {/* Cụm Quả châu đỏ ở góc trái */}
              <circle cx="28" cy="24" r="8" fill="#dc2626" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))" />
              <circle cx="25" cy="21" r="2.5" fill="#fecaca" />
              {/* Cụm Chuông vàng đôi & Nơ Noel ở góc phải */}
              <g transform="translate(305, 18) scale(0.9)">
                <path d="M-6 8 C-6 2, 6 2, 6 8 L9 18 C11 22, -11 22, -9 18 Z" fill="url(#bellGoldGrad)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
                <circle cx="0" cy="21" r="2.2" fill="#a16207" />
                <path d="M0 4 C-4 -1, -10 1, -7 5 C-4 7, 0 5, 0 5 C0 5, 4 7, 7 5 C10 1, 4 -1, 0 4 Z" fill="#dc2626" />
                <circle cx="0" cy="4.5" r="2" fill="#ffffff" />
              </g>
            </svg>
          </div>

          {/* Mũ Noel đỏ viền tuyết đội nghiêng trên đỉnh góc trái */}
          <div className="corner-ornament hat-top-left">
            <svg viewBox="0 0 100 80" width="88" height="70" className="santa-hat-svg">
              <defs>
                <linearGradient id="hatRed" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#991b1b" />
                </linearGradient>
              </defs>
              <path
                d="M18 55 Q 35 15, 75 10 Q 92 18, 88 42 Q 78 30, 68 28 Q 40 32, 22 55 Z"
                fill="url(#hatRed)"
                filter="drop-shadow(0 4px 8px rgba(0,0,0,0.35))"
              />
              <path d="M75 10 Q 95 18, 92 40 Q 84 46, 82 36 Q 84 22, 75 10 Z" fill="#b91c1c" />
              <circle cx="91" cy="42" r="9" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />
              <circle cx="89" cy="40" r="7" fill="#f8fafc" />
              <rect x="10" y="50" width="64" height="15" rx="7.5" fill="#ffffff" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.25))" />
              <circle cx="16" cy="57" r="6" fill="#f1f5f9" />
              <circle cx="28" cy="58" r="6.5" fill="#ffffff" />
              <circle cx="42" cy="57" r="7" fill="#f8fafc" />
              <circle cx="56" cy="58" r="6.5" fill="#ffffff" />
              <circle cx="68" cy="57" r="6" fill="#f1f5f9" />
            </svg>
          </div>
        </div>
      )}

      {/* ========================================================
          2. MÙA XUÂN — 3 bộ khung viền riêng biệt
         ======================================================== */}

      {/* ─── 2A. XUÂN TỰ NHIÊN: Khung dây hoa anh đào hồng nhạt + Bướm + Lá xanh ─── */}
      {isSpring && !isTetFestive && (
        <div className="wrapped-frame spring-natural-frame">
          {/* Mép trên: Dải cành anh đào hồng nhạt mảnh mai uốn cong */}
          <div className="frame-border-top blossom-border-top">
            <svg viewBox="0 0 340 38" preserveAspectRatio="none" className="blossom-top-svg">
              <defs>
                <linearGradient id="sakuraPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fce7f3" />
                  <stop offset="50%" stopColor="#f9a8d4" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="greenLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#86efac" />
                  <stop offset="60%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#15803d" />
                </linearGradient>
              </defs>
              {/* Cành cây mảnh mai */}
              <path
                d="M-5 14 Q 60 6, 120 12 Q 180 8, 230 15 Q 290 6, 345 11"
                stroke="#a3744f"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Hoa anh đào 5 cánh hồng nhạt nhỏ xinh */}
              {[35, 90, 150, 210, 265, 310].map((pos, idx) => (
                <g key={`sakura-top-${idx}`} transform={`translate(${pos}, ${10 + (idx % 2) * 4}) scale(0.7)`}>
                  <circle cx="0" cy="-5.5" r="4" fill="url(#sakuraPinkGrad)" />
                  <circle cx="5.2" cy="-1.7" r="4" fill="url(#sakuraPinkGrad)" />
                  <circle cx="3.2" cy="4.3" r="4" fill="url(#sakuraPinkGrad)" />
                  <circle cx="-3.2" cy="4.3" r="4" fill="url(#sakuraPinkGrad)" />
                  <circle cx="-5.2" cy="-1.7" r="4" fill="url(#sakuraPinkGrad)" />
                  <circle cx="0" cy="0" r="2.2" fill="#fbbf24" />
                </g>
              ))}
              {/* Lá non xanh mướt */}
              {[20, 70, 130, 185, 245, 290, 330].map((lPos, lIdx) => (
                <ellipse key={`leaf-top-${lIdx}`} cx={lPos} cy={8 + (lIdx % 2) * 6} rx="5" ry="2.5" fill="url(#greenLeafGrad)" transform={`rotate(${(lIdx % 2 === 0 ? -25 : 30)}, ${lPos}, ${8 + (lIdx % 2) * 6})`} />
              ))}
            </svg>
          </div>

          {/* 2 bên viền: Dây lá xanh mảnh với hoa anh đào rải rác */}
          <div className="frame-border-side border-left blossom-border-left">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="blossom-side-svg">
              <path d="M16 0 Q 8 115, 18 230 Q 8 345, 16 460" stroke="#a3744f" strokeWidth="2" fill="none" />
              {Array.from({ length: 8 }).map((_, i) => (
                <g key={`sakura-side-l-${i}`} transform={`translate(14, ${i * 55 + 30}) scale(0.6)`}>
                  {i % 2 === 0 ? (
                    <>
                      <circle cx="0" cy="-4.5" r="3.5" fill="url(#sakuraPinkGrad)" />
                      <circle cx="4.3" cy="-1.5" r="3.5" fill="url(#sakuraPinkGrad)" />
                      <circle cx="2.7" cy="3.5" r="3.5" fill="url(#sakuraPinkGrad)" />
                      <circle cx="-2.7" cy="3.5" r="3.5" fill="url(#sakuraPinkGrad)" />
                      <circle cx="-4.3" cy="-1.5" r="3.5" fill="url(#sakuraPinkGrad)" />
                      <circle cx="0" cy="0" r="2" fill="#fbbf24" />
                    </>
                  ) : (
                    <ellipse cx="0" cy="0" rx="6" ry="3" fill="url(#greenLeafGrad)" transform="rotate(-30)" />
                  )}
                </g>
              ))}
            </svg>
          </div>
          <div className="frame-border-side border-right blossom-border-right">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="blossom-side-svg">
              <path d="M16 0 Q 24 115, 14 230 Q 22 345, 16 460" stroke="#a3744f" strokeWidth="2" fill="none" />
              {Array.from({ length: 8 }).map((_, i) => (
                <g key={`sakura-side-r-${i}`} transform={`translate(18, ${i * 55 + 40}) scale(0.6)`}>
                  {i % 2 === 1 ? (
                    <>
                      <circle cx="0" cy="-4.5" r="3.5" fill="url(#sakuraPinkGrad)" />
                      <circle cx="4.3" cy="-1.5" r="3.5" fill="url(#sakuraPinkGrad)" />
                      <circle cx="2.7" cy="3.5" r="3.5" fill="url(#sakuraPinkGrad)" />
                      <circle cx="-2.7" cy="3.5" r="3.5" fill="url(#sakuraPinkGrad)" />
                      <circle cx="-4.3" cy="-1.5" r="3.5" fill="url(#sakuraPinkGrad)" />
                      <circle cx="0" cy="0" r="2" fill="#fbbf24" />
                    </>
                  ) : (
                    <ellipse cx="0" cy="0" rx="6" ry="3" fill="url(#greenLeafGrad)" transform="rotate(30)" />
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* Mép đáy: Thảm cỏ hoa nhẹ nhàng */}
          <div className="frame-border-bottom blossom-border-bottom">
            <svg viewBox="0 0 340 44" preserveAspectRatio="none" className="blossom-bottom-svg">
              <path d="M-5 26 Q 85 32, 170 24 Q 255 30, 345 24" stroke="#a3744f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {[50, 120, 190, 260, 320].map((pos, idx) => (
                <g key={`sakura-bottom-${idx}`}>
                  {idx % 2 === 0 ? (
                    <g transform={`translate(${pos}, 24) scale(0.55)`}>
                      <circle cx="0" cy="-4.5" r="3.5" fill="url(#sakuraPinkGrad)" />
                      <circle cx="4.3" cy="-1.5" r="3.5" fill="url(#sakuraPinkGrad)" />
                      <circle cx="2.7" cy="3.5" r="3.5" fill="url(#sakuraPinkGrad)" />
                      <circle cx="-2.7" cy="3.5" r="3.5" fill="url(#sakuraPinkGrad)" />
                      <circle cx="-4.3" cy="-1.5" r="3.5" fill="url(#sakuraPinkGrad)" />
                      <circle cx="0" cy="0" r="2" fill="#fbbf24" />
                    </g>
                  ) : (
                    <ellipse cx={pos} cy={26} rx="7" ry="3" fill="url(#greenLeafGrad)" transform={`rotate(20, ${pos}, 26)`} />
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* Bướm bay góc trên phải */}
          <div className="corner-ornament tet-branch-top-right" style={{ animation: "butterfly-drift 6s ease-in-out infinite alternate" }}>
            <svg viewBox="0 0 60 60" width="48" height="48">
              <g transform="translate(30, 30) scale(1.2)">
                <path d="M0 0C-6 -8 -16 -10 -14 -4C-12 0 -4 2 0 0Z" fill="#f9a8d4" />
                <path d="M0 0C6 -8 16 -10 14 -4C12 0 4 2 0 0Z" fill="#ec4899" />
                <path d="M0 0C-5 6 -12 10 -10 6C-8 3 -3 1 0 0Z" fill="#fbcfe8" />
                <path d="M0 0C5 6 12 10 10 6C8 3 3 1 0 0Z" fill="#f472b6" />
                <circle cx="0" cy="0" r="1.5" fill="#831843" />
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* ─── 2B. TẾT ÂM LỊCH: Khung cành mai vàng + đào thắm + Lì xì + Pháo ─── */}
      {isSpring && currentFestive === "tet" && (
        <div className="wrapped-frame spring-tet-frame">
          {/* Mép trên: Mai vàng + đào thắm nở rộ */}
          <div className="frame-border-top blossom-border-top">
            <svg viewBox="0 0 340 38" preserveAspectRatio="none" className="blossom-top-svg">
              <defs>
                <linearGradient id="maiGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="60%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#ca8a04" />
                </linearGradient>
                <linearGradient id="daoPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbcfe8" />
                  <stop offset="60%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#be123c" />
                </linearGradient>
              </defs>
              <path d="M-5 12 Q 80 4, 170 14 Q 255 6, 345 12" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              {[45, 110, 175, 240, 295].map((pos, idx) => {
                const isMai = idx % 2 === 0;
                return (
                  <g key={`tet-top-${idx}`} transform={`translate(${pos}, ${10 + (idx % 2) * 4}) scale(0.85)`}>
                    <circle cx="0" cy="-6" r="4.8" fill={isMai ? "url(#maiGoldGrad)" : "url(#daoPinkGrad)"} />
                    <circle cx="5.8" cy="-1.8" r="4.8" fill={isMai ? "url(#maiGoldGrad)" : "url(#daoPinkGrad)"} />
                    <circle cx="3.6" cy="4.8" r="4.8" fill={isMai ? "url(#maiGoldGrad)" : "url(#daoPinkGrad)"} />
                    <circle cx="-3.6" cy="4.8" r="4.8" fill={isMai ? "url(#maiGoldGrad)" : "url(#daoPinkGrad)"} />
                    <circle cx="-5.8" cy="-1.8" r="4.8" fill={isMai ? "url(#maiGoldGrad)" : "url(#daoPinkGrad)"} />
                    <circle cx="0" cy="0" r="2.8" fill={isMai ? "#dc2626" : "#881337"} />
                    <circle cx="0" cy="0" r="1.2" fill="#fef08a" />
                  </g>
                );
              })}
              {[25, 80, 145, 210, 270, 320].map((lPos, lIdx) => (
                <circle key={`tet-bud-${lIdx}`} cx={lPos} cy={8 + (lIdx % 2) * 5} r="3" fill="#4ade80" />
              ))}
            </svg>
          </div>

          {/* 2 bên viền: Dây cành mai đào leo */}
          <div className="frame-border-side border-left blossom-border-left">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="blossom-side-svg">
              <path d="M16 0 Q 6 115, 18 230 Q 8 345, 16 460" stroke="#78350f" strokeWidth="3" fill="none" />
              {Array.from({ length: 9 }).map((_, i) => {
                const isMai = i % 2 === 1;
                return (
                  <g key={`tet-side-l-${i}`} transform={`translate(14, ${i * 50 + 25}) scale(0.75)`}>
                    <circle cx="0" cy="-5" r="4.2" fill={isMai ? "url(#maiGoldGrad)" : "url(#daoPinkGrad)"} />
                    <circle cx="5" cy="-1.5" r="4.2" fill={isMai ? "url(#maiGoldGrad)" : "url(#daoPinkGrad)"} />
                    <circle cx="3" cy="4" r="4.2" fill={isMai ? "url(#maiGoldGrad)" : "url(#daoPinkGrad)"} />
                    <circle cx="-3" cy="4" r="4.2" fill={isMai ? "url(#maiGoldGrad)" : "url(#daoPinkGrad)"} />
                    <circle cx="-5" cy="-1.5" r="4.2" fill={isMai ? "url(#maiGoldGrad)" : "url(#daoPinkGrad)"} />
                    <circle cx="0" cy="0" r="2.5" fill={isMai ? "#dc2626" : "#881337"} />
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="frame-border-side border-right blossom-border-right">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="blossom-side-svg">
              <path d="M16 0 Q 26 115, 14 230 Q 24 345, 16 460" stroke="#78350f" strokeWidth="3" fill="none" />
              {Array.from({ length: 9 }).map((_, i) => {
                const isMai = i % 2 === 0;
                return (
                  <g key={`tet-side-r-${i}`} transform={`translate(18, ${i * 50 + 35}) scale(0.75)`}>
                    <circle cx="0" cy="-5" r="4.2" fill={isMai ? "url(#maiGoldGrad)" : "url(#daoPinkGrad)"} />
                    <circle cx="5" cy="-1.5" r="4.2" fill={isMai ? "url(#maiGoldGrad)" : "url(#daoPinkGrad)"} />
                    <circle cx="3" cy="4" r="4.2" fill={isMai ? "url(#maiGoldGrad)" : "url(#daoPinkGrad)"} />
                    <circle cx="-3" cy="4" r="4.2" fill={isMai ? "url(#maiGoldGrad)" : "url(#daoPinkGrad)"} />
                    <circle cx="-5" cy="-1.5" r="4.2" fill={isMai ? "url(#maiGoldGrad)" : "url(#daoPinkGrad)"} />
                    <circle cx="0" cy="0" r="2.5" fill={isMai ? "#dc2626" : "#881337"} />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Mép đáy: Dải hoa mai đào */}
          <div className="frame-border-bottom blossom-border-bottom">
            <svg viewBox="0 0 340 44" preserveAspectRatio="none" className="blossom-bottom-svg">
              <path d="M-5 24 Q 85 32, 170 22 Q 255 30, 345 22" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              {[60, 130, 200, 270].map((bPos, bIdx) => (
                <circle key={`tet-bot-${bIdx}`} cx={bPos} cy={24} r="5" fill={bIdx % 2 === 0 ? "url(#maiGoldGrad)" : "url(#daoPinkGrad)"} />
              ))}
            </svg>
          </div>

          {/* Bao lì xì đỏ góc dưới trái */}
          <div className="corner-ornament lucky-env-bottom-left">
            <svg viewBox="0 0 65 75" width="52" height="60">
              <defs>
                <linearGradient id="redEnv" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#b91c1c" />
                </linearGradient>
              </defs>
              <rect x="10" y="14" width="34" height="48" rx="4" fill="url(#redEnv)" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.4))" transform="rotate(-10 25 38)" />
              <path d="M9 22 Q 25 32, 42 18" stroke="#facc15" strokeWidth="1.6" fill="none" transform="rotate(-10 25 38)" />
              <circle cx="26" cy="38" r="8" fill="#facc15" opacity="0.9" transform="rotate(-10 25 38)" />
              <text x="26" y="42" fontSize="9.5" fontWeight="900" fill="#b91c1c" textAnchor="middle" transform="rotate(-10 25 38)">福</text>
              <rect x="44" y="32" width="7.5" height="13" rx="1.5" fill="#dc2626" stroke="#fef08a" strokeWidth="1" />
              <rect x="46" y="46" width="7.5" height="13" rx="1.5" fill="#dc2626" stroke="#fef08a" strokeWidth="1" />
            </svg>
          </div>

          {/* Cụm hoa mai nở góc trên phải */}
          <div className="corner-ornament tet-branch-top-right">
            <svg viewBox="0 0 70 70" width="58" height="58">
              <g transform="translate(35, 35)">
                <circle cx="0" cy="-9" r="6" fill="url(#maiGoldGrad)" />
                <circle cx="8.5" cy="-2.8" r="6" fill="url(#maiGoldGrad)" />
                <circle cx="5.3" cy="7.3" r="6" fill="url(#maiGoldGrad)" />
                <circle cx="-5.3" cy="7.3" r="6" fill="url(#maiGoldGrad)" />
                <circle cx="-8.5" cy="-2.8" r="6" fill="url(#maiGoldGrad)" />
                <circle cx="0" cy="0" r="3.5" fill="#dc2626" />
                <circle cx="0" cy="0" r="1.5" fill="#fef08a" />
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* ─── 2C. TẾT DƯƠNG LỊCH: Khung garland kim tuyến vàng bạc + Ngôi sao ─── */}
      {isSpring && currentFestive === "newyear" && (
        <div className="wrapped-frame spring-newyear-frame">
          {/* Mép trên: Dải garland lấp lánh kim tuyến */}
          <div className="frame-border-top blossom-border-top">
            <svg viewBox="0 0 340 38" preserveAspectRatio="none" className="blossom-top-svg">
              <defs>
                <linearGradient id="goldTinselGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="30%" stopColor="#eab308" />
                  <stop offset="60%" stopColor="#fef08a" />
                  <stop offset="100%" stopColor="#ca8a04" />
                </linearGradient>
                <linearGradient id="silverTinselGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e2e8f0" />
                  <stop offset="50%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
              </defs>
              {/* Dải garland vàng lấp lánh */}
              <path d="M-5 10 Q 40 22, 85 10 Q 130 22, 170 10 Q 215 22, 255 10 Q 300 22, 345 10" stroke="url(#goldTinselGrad)" strokeWidth="3" fill="none" />
              <path d="M-5 16 Q 40 28, 85 16 Q 130 28, 170 16 Q 215 28, 255 16 Q 300 28, 345 16" stroke="url(#silverTinselGrad)" strokeWidth="2" fill="none" opacity="0.7" />
              {/* Ngôi sao lấp lánh */}
              {[50, 130, 210, 290].map((pos, idx) => (
                <g key={`ny-star-top-${idx}`} transform={`translate(${pos}, ${14 + (idx % 2) * 4})`}>
                  <polygon
                    points="0,-6 1.5,-2 6,-2 2.5,1 4,5.5 0,2.5 -4,5.5 -2.5,1 -6,-2 -1.5,-2"
                    fill={idx % 2 === 0 ? "#fbbf24" : "#e2e8f0"}
                    className="fairy-light-dot"
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* 2 bên viền: Dải đèn LED countdown lấp lánh */}
          <div className="frame-border-side border-left blossom-border-left">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="blossom-side-svg">
              <path d="M16 0 L 16 460" stroke="url(#goldTinselGrad)" strokeWidth="2" strokeDasharray="8 5" fill="none" />
              {Array.from({ length: 12 }).map((_, i) => (
                <circle
                  key={`ny-led-l-${i}`}
                  cx="16"
                  cy={i * 38 + 20}
                  r="3"
                  fill={["#fbbf24", "#e2e8f0", "#ef4444", "#38bdf8"][i % 4]}
                  className="fairy-light-dot"
                />
              ))}
            </svg>
          </div>
          <div className="frame-border-side border-right blossom-border-right">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="blossom-side-svg">
              <path d="M16 0 L 16 460" stroke="url(#silverTinselGrad)" strokeWidth="2" strokeDasharray="8 5" fill="none" />
              {Array.from({ length: 12 }).map((_, i) => (
                <circle
                  key={`ny-led-r-${i}`}
                  cx="16"
                  cy={i * 38 + 30}
                  r="3"
                  fill={["#38bdf8", "#ef4444", "#e2e8f0", "#fbbf24"][i % 4]}
                  className="fairy-light-dot"
                />
              ))}
            </svg>
          </div>

          {/* Mép đáy: Dải garland sáng */}
          <div className="frame-border-bottom blossom-border-bottom">
            <svg viewBox="0 0 340 44" preserveAspectRatio="none" className="blossom-bottom-svg">
              <path d="M-5 30 Q 40 18, 85 30 Q 130 18, 170 30 Q 215 18, 255 30 Q 300 18, 345 30" stroke="url(#goldTinselGrad)" strokeWidth="3" fill="none" />
              {[70, 170, 270].map((pos, idx) => (
                <polygon
                  key={`ny-star-bot-${idx}`}
                  points={`${pos},-6 ${pos + 1.5},-2 ${pos + 6},-2 ${pos + 2.5},1 ${pos + 4},5.5 ${pos},2.5 ${pos - 4},5.5 ${pos - 2.5},1 ${pos - 6},-2 ${pos - 1.5},-2`}
                  fill={idx % 2 === 0 ? "#fbbf24" : "#e2e8f0"}
                  transform={`translate(0, 28)`}
                  className="fairy-light-dot"
                />
              ))}
            </svg>
          </div>

          {/* Ngôi sao vàng lớn góc trên phải */}
          <div className="corner-ornament tet-branch-top-right" style={{ animation: "hat-float 3s ease-in-out infinite alternate" }}>
            <svg viewBox="0 0 60 60" width="50" height="50">
              <defs>
                <linearGradient id="starGoldNY" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#ca8a04" />
                </linearGradient>
              </defs>
              <g transform="translate(30, 30)">
                <polygon
                  points="0,-18 4,-6 17,-6 7,2 11,14 0,7 -11,14 -7,2 -17,-6 -4,-6"
                  fill="url(#starGoldNY)"
                  filter="drop-shadow(0 3px 8px rgba(234, 179, 8, 0.6))"
                />
                <circle cx="0" cy="0" r="4" fill="#fffbeb" />
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* ========================================================
          3. MÙA HẠ: KHUNG VIỀN BÃI BIỂN (Lá Dừa Nhiệt Đới, Dây Thừng & Sò Sao Biển)
          Bao bọc toàn bộ 4 cạnh: Tán dừa đỉnh, Dây leo 2 bên, Sao biển & Sóng đáy
         ======================================================== */}
      {isSummer && (
        <div className="wrapped-frame summer-beach-frame">
          {/* Mép trên: Tán lá dừa nhiệt đới và lá monstera rợp bóng mát */}
          <div className="frame-border-top palm-border-top">
            <svg viewBox="0 0 340 40" preserveAspectRatio="none" className="palm-top-svg">
              <defs>
                <linearGradient id="palmTopGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="50%" stopColor="#16a34a" />
                  <stop offset="100%" stopColor="#14532d" />
                </linearGradient>
              </defs>
              <path d="M-10 10 Q 80 4, 170 14 Q 260 4, 350 10" stroke="#ca8a04" strokeWidth="2.5" fill="none" />
              {/* Các tán lá dừa xòe rộng phủ viền trên */}
              {[30, 80, 130, 180, 230, 280, 320].map((xPos, idx) => (
                <path
                  key={`palm-leaf-${idx}`}
                  d={`M${xPos} 10 Q ${xPos - 15} 24, ${xPos - 25} 32 M${xPos} 10 Q ${xPos + 15} 24, ${xPos + 25} 32`}
                  stroke="url(#palmTopGreen)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              ))}
            </svg>
          </div>

          {/* Cạnh viền trái: Dây thừng bãi biển & hoa sứ nhiệt đới leo viền trái */}
          <div className="frame-border-side border-left beach-border-left">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="beach-side-svg">
              <path d="M16 0 L 16 460" stroke="#ca8a04" strokeWidth="3" strokeDasharray="6 4" fill="none" />
              {/* Những bông hoa sứ trắng nhụy vàng (Plumeria) nở dọc viền */}
              {[70, 180, 290, 390].map((yPos, idx) => (
                <g key={`plumeria-l-${idx}`} transform={`translate(14, ${yPos}) scale(0.8)`}>
                  <circle cx="0" cy="-6" r="4.5" fill="#ffffff" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))" />
                  <circle cx="5.7" cy="-1.8" r="4.5" fill="#ffffff" />
                  <circle cx="3.5" cy="4.8" r="4.5" fill="#ffffff" />
                  <circle cx="-3.5" cy="4.8" r="4.5" fill="#ffffff" />
                  <circle cx="-5.7" cy="-1.8" r="4.5" fill="#ffffff" />
                  <circle cx="0" cy="0" r="3" fill="#facc15" />
                </g>
              ))}
            </svg>
          </div>

          {/* Cạnh viền phải: Dây thừng bãi biển & hoa sứ viền phải */}
          <div className="frame-border-side border-right beach-border-right">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="beach-side-svg">
              <path d="M16 0 L 16 460" stroke="#ca8a04" strokeWidth="3" strokeDasharray="6 4" fill="none" />
              {[90, 200, 310, 410].map((yPos, idx) => (
                <g key={`plumeria-r-${idx}`} transform={`translate(18, ${yPos}) scale(0.8)`}>
                  <circle cx="0" cy="-6" r="4.5" fill="#ffffff" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))" />
                  <circle cx="5.7" cy="-1.8" r="4.5" fill="#ffffff" />
                  <circle cx="3.5" cy="4.8" r="4.5" fill="#ffffff" />
                  <circle cx="-3.5" cy="4.8" r="4.5" fill="#ffffff" />
                  <circle cx="-5.7" cy="-1.8" r="4.5" fill="#ffffff" />
                  <circle cx="0" cy="0" r="3" fill="#facc15" />
                </g>
              ))}
            </svg>
          </div>

          {/* Mép đáy: Dải cát vàng ngọc trai & Lớp sóng biển xanh dịu dàng */}
          <div className="frame-border-bottom beach-border-bottom">
            <svg viewBox="0 0 340 40" preserveAspectRatio="none" className="beach-bottom-svg">
              <defs>
                <linearGradient id="waveAquaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(56, 189, 248, 0.4)" />
                  <stop offset="100%" stopColor="rgba(2, 132, 199, 0.75)" />
                </linearGradient>
              </defs>
              <path
                d="M-5 40 L345 40 L345 22 Q300 12, 255 20 Q210 28, 165 18 Q120 10, 75 22 Q35 28, -5 18 Z"
                fill="url(#waveAquaGrad)"
              />
              <path
                d="M-5 40 L345 40 L345 28 Q300 20, 260 27 Q220 18, 180 26 Q130 19, 90 28 Q45 21, -5 29 Z"
                fill="#38bdf8"
                opacity="0.5"
              />
            </svg>
          </div>

          {/* Sao biển vàng cam & Vỏ sò đại dương góc dưới phải */}
          <div className="corner-ornament beach-starfish-bottom-right">
            <svg viewBox="0 0 70 70" width="58" height="58">
              <defs>
                <linearGradient id="starOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fdba74" />
                  <stop offset="60%" stopColor="#ea580c" />
                  <stop offset="100%" stopColor="#c2410c" />
                </linearGradient>
              </defs>
              <g transform="translate(36, 34) rotate(15)">
                <polygon
                  points="0,-16 4,-5 15,-5 7,2 10,13 0,7 -10,13 -7,2 -15,-5 -4,-5"
                  fill="url(#starOrange)"
                  filter="drop-shadow(0 2px 5px rgba(0,0,0,0.35))"
                />
                <circle cx="0" cy="0" r="2.5" fill="#fed7aa" />
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* ========================================================
          4. MÙA THU: KHUNG VIỀN RỢP LÁ PHONG ĐỎ & VÀNG HỔ PHÁCH
          Bao bọc toàn bộ 4 cạnh: Dải lá phong chạy kín viền, Hạt sồi
         ======================================================== */}
      {isAutumn && (
        <div className="wrapped-frame autumn-maple-frame">
          {/* Mép trên: Dải lá phong đỏ & vàng phủ trọn mép trên */}
          <div className="frame-border-top maple-border-top">
            <svg viewBox="0 0 340 38" preserveAspectRatio="none" className="maple-top-svg">
              <defs>
                <linearGradient id="mapleRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="60%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#991b1b" />
                </linearGradient>
                <linearGradient id="mapleGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fed7aa" />
                  <stop offset="60%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
              </defs>
              <path d="M-5 12 Q 85 4, 170 14 Q 255 6, 345 12" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />
              {[35, 95, 160, 225, 290].map((xPos, idx) => {
                const isRed = idx % 2 === 0;
                return (
                  <g key={`top-leaf-${idx}`} transform={`translate(${xPos}, ${12 + (idx % 2) * 4}) scale(0.85) rotate(${idx % 2 === 0 ? 15 : -15})`}>
                    <path
                      d="M12 2 L9.5 7.5 L4 7 L6.5 12 L2 14.5 L7.5 17 L7 22.5 L12 19.5 L17 22.5 L16.5 17 L22 14.5 L17.5 12 L20 7 L14.5 7.5 Z"
                      fill={isRed ? "url(#mapleRedGrad)" : "url(#mapleGoldGrad)"}
                      filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Cạnh viền trái: Dải lá phong leo dọc viền trái */}
          <div className="frame-border-side border-left maple-border-left">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="maple-side-svg">
              <path d="M16 0 Q 6 115, 18 230 Q 8 345, 16 460" stroke="#78350f" strokeWidth="2.8" fill="none" />
              {Array.from({ length: 8 }).map((_, i) => (
                <g key={`side-leaf-l-${i}`} transform={`translate(14, ${i * 55 + 30}) scale(0.75) rotate(${i % 2 === 0 ? -20 : 20})`}>
                  <path
                    d="M12 2 L9.5 7.5 L4 7 L6.5 12 L2 14.5 L7.5 17 L7 22.5 L12 19.5 L17 22.5 L16.5 17 L22 14.5 L17.5 12 L20 7 L14.5 7.5 Z"
                    fill={i % 2 === 0 ? "url(#mapleRedGrad)" : "url(#mapleGoldGrad)"}
                    filter="drop-shadow(0 2px 3px rgba(0,0,0,0.3))"
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Cạnh viền phải: Dải lá phong leo dọc viền phải */}
          <div className="frame-border-side border-right maple-border-right">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="maple-side-svg">
              <path d="M16 0 Q 26 115, 14 230 Q 24 345, 16 460" stroke="#78350f" strokeWidth="2.8" fill="none" />
              {Array.from({ length: 8 }).map((_, i) => (
                <g key={`side-leaf-r-${i}`} transform={`translate(18, ${i * 55 + 40}) scale(0.75) rotate(${i % 2 === 0 ? 25 : -25})`}>
                  <path
                    d="M12 2 L9.5 7.5 L4 7 L6.5 12 L2 14.5 L7.5 17 L7 22.5 L12 19.5 L17 22.5 L16.5 17 L22 14.5 L17.5 12 L20 7 L14.5 7.5 Z"
                    fill={i % 2 === 1 ? "url(#mapleRedGrad)" : "url(#mapleGoldGrad)"}
                    filter="drop-shadow(0 2px 3px rgba(0,0,0,0.3))"
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Mép đáy: Thảm lá phong thu đọng êm ái ở chân khung */}
          <div className="frame-border-bottom maple-border-bottom">
            <svg viewBox="0 0 340 42" preserveAspectRatio="none" className="maple-bottom-svg">
              <path d="M-5 24 Q 85 30, 170 20 Q 255 28, 345 20" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />
              {[40, 100, 170, 240, 300].map((xPos, idx) => (
                <g key={`bottom-leaf-${idx}`} transform={`translate(${xPos}, 22) scale(0.8) rotate(${idx * 18 - 30})`}>
                  <path
                    d="M12 2 L9.5 7.5 L4 7 L6.5 12 L2 14.5 L7.5 17 L7 22.5 L12 19.5 L17 22.5 L16.5 17 L22 14.5 L17.5 12 L20 7 L14.5 7.5 Z"
                    fill={idx % 2 === 0 ? "url(#mapleRedGrad)" : "url(#mapleGoldGrad)"}
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
