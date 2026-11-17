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
          1. MÙA ĐÔNG & NOEL: "Đêm Tuyết Linh Ấm"
          Thông tuyết nhiều tầng, bauble gold/ice/berry, bullfinch,
          nhũ băng, đèn lồng 4 góc — tiết chế animation
         ======================================================== */}
      {isWinter && (
        <div className="wrapped-frame winter-noel-frame">
          <FrameAmbient tone="winter" />
          {/* Mép trên: 2 bough thông phủ tuyết + nhũ băng + twine treo bauble giữa */}
          <div className="frame-border-top snow-border-top">
            <svg viewBox="0 0 340 36" preserveAspectRatio="none" className="snow-top-svg">
              <defs>
                <linearGradient id="wnSnowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="58%" stopColor="#F7FBFF" />
                  <stop offset="100%" stopColor="#DCEEFB" />
                </linearGradient>
                <linearGradient id="wnSnowShadeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F7FBFF" />
                  <stop offset="60%" stopColor="#D6E8F6" />
                  <stop offset="100%" stopColor="#BFD9EC" />
                </linearGradient>
                <linearGradient id="wnBoughGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1F7A4D" />
                  <stop offset="45%" stopColor="#14532D" />
                  <stop offset="100%" stopColor="#0B3D2E" />
                </linearGradient>
                <linearGradient id="wnBoughSideGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0B3D2E" />
                  <stop offset="48%" stopColor="#14532D" />
                  <stop offset="100%" stopColor="#1F7A4D" />
                </linearGradient>
                <linearGradient id="wnNeedleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#86EFAC" />
                  <stop offset="42%" stopColor="#4ADE80" />
                  <stop offset="100%" stopColor="#166534" />
                </linearGradient>
                <linearGradient id="wnNeedleDeepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22C55E" />
                  <stop offset="100%" stopColor="#0B3D2E" />
                </linearGradient>
                <radialGradient id="wnBerryGrad" cx="34%" cy="28%" r="78%">
                  <stop offset="0%" stopColor="#FCA5A5" />
                  <stop offset="46%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="#991B1B" />
                </radialGradient>
                <linearGradient id="wnGoldGrad" x1="12%" y1="0%" x2="88%" y2="100%">
                  <stop offset="0%" stopColor="#FFF7D6" />
                  <stop offset="38%" stopColor="#FFF3C4" />
                  <stop offset="74%" stopColor="#F6C453" />
                  <stop offset="100%" stopColor="#D99A1F" />
                </linearGradient>
                <linearGradient id="wnIceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E0F2FE" />
                  <stop offset="55%" stopColor="#BAE6FD" />
                  <stop offset="100%" stopColor="#7DD3FC" />
                </linearGradient>
                <linearGradient id="wnHatGrad" x1="6%" y1="0%" x2="94%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="46%" stopColor="#C8102E" />
                  <stop offset="100%" stopColor="#8E0D22" />
                </linearGradient>
                <linearGradient id="wnHatDeepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B91C1C" />
                  <stop offset="100%" stopColor="#6B0A18" />
                </linearGradient>
                <linearGradient id="wnLanternGrad" x1="18%" y1="0%" x2="82%" y2="100%">
                  <stop offset="0%" stopColor="#FFF7D6" />
                  <stop offset="42%" stopColor="#F6C453" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
                <radialGradient id="wnGlowGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF3C4" stopOpacity="0.7" />
                  <stop offset="62%" stopColor="#F6C453" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#F6C453" stopOpacity="0" />
                </radialGradient>

                {/* Template: chùm kim thông fill thuôn + tuyết đọng */}
                <g id="wnNeedleFan">
                  <g fill="url(#wnNeedleDeepGrad)" opacity="0.9">
                    <path d="M0 0 C -4.6 -2.4, -8.2 -4.6, -11 -7.4 C -7.6 -6.6, -3.4 -4.2, 0 0 Z" transform="rotate(-28)" />
                    <path d="M0 0 C -4.6 -2.4, -8.2 -4.6, -11 -7.4 C -7.6 -6.6, -3.4 -4.2, 0 0 Z" transform="rotate(30)" />
                  </g>
                  <g fill="url(#wnNeedleGrad)">
                    <path d="M0 0 C -5 -2.2, -9 -4.4, -12.4 -7 C -8.4 -6.4, -4 -4.2, 0 0 Z" />
                    <path d="M0 0 C -5 -2.2, -9 -4.4, -12.4 -7 C -8.4 -6.4, -4 -4.2, 0 0 Z" transform="rotate(-20)" />
                    <path d="M0 0 C -5 -2.2, -9 -4.4, -12.4 -7 C -8.4 -6.4, -4 -4.2, 0 0 Z" transform="rotate(20)" />
                  </g>
                  <path d="M0 0 C -4 -1.6, -7.4 -3.4, -10.4 -5.6" stroke="#86EFAC" strokeWidth="0.45" opacity="0.5" fill="none" strokeLinecap="round" />
                  <ellipse cx="-5.4" cy="-4" rx="3.4" ry="1.4" fill="#FFFFFF" opacity="0.92" transform="rotate(-34 -5.4 -4)" />
                </g>

                {/* Template: 3 quả mọng đỏ + lá kim */}
                <g id="wnBerryCluster">
                  <path d="M0 0 C 3 1.4, 6 2.2, 8.6 2.4" stroke="#14532D" strokeWidth="0.9" fill="none" strokeLinecap="round" />
                  <circle cx="2.4" cy="2.6" r="2.5" fill="url(#wnBerryGrad)" />
                  <circle cx="6.9" cy="4.1" r="2.2" fill="url(#wnBerryGrad)" />
                  <circle cx="5.5" cy="1.2" r="1.9" fill="url(#wnBerryGrad)" />
                  <circle cx="1.6" cy="1.8" r="0.7" fill="#FCA5A5" opacity="0.9" />
                  <circle cx="6.9" cy="3.2" r="0.6" fill="#FCA5A5" opacity="0.8" />
                  <ellipse cx="8.2" cy="5.6" rx="2.1" ry="0.9" fill="url(#wnNeedleGrad)" transform="rotate(-24 8.2 5.6)" />
                </g>

                {/* Template: quả thông 3 tầng vảy */}
                <g id="wnPineCone">
                  <path d="M0 -1 C 3.4 0.6, 5.6 4.4, 5.4 8.6 C 5.2 12.8, 2.6 16.2, 0 17.4 C -2.6 16.2, -5.2 12.8, -5.4 8.6 C -5.6 4.4, -3.4 0.6, 0 -1 Z" fill="#4A2E18" />
                  <ellipse cx="-1.4" cy="6" rx="1.8" ry="3" fill="#6B4423" opacity="0.7" />
                  <g fill="#8B5E3C">
                    <path d="M-3.6 2.2 Q 0 3.6 3.6 2.2 Q 0.6 5 -3.6 4.4 Z" />
                    <path d="M-4.6 5.6 Q 0 7.4 4.6 5.6 Q 0.8 8.6 -4.6 8 Z" />
                    <path d="M-4.4 9.4 Q 0 11.4 4.4 9.4 Q 0.8 12.4 -4.4 11.8 Z" />
                    <path d="M-3.2 13 Q 0 14.8 3.2 13 Q 0.6 15.6 -3.2 15 Z" />
                  </g>
                  <g stroke="#3F2411" strokeWidth="0.35" opacity="0.55" fill="none">
                    <path d="M-3.6 2.2 Q 0 3.6 3.6 2.2" /><path d="M-4.6 5.6 Q 0 7.4 4.6 5.6" /><path d="M-4.4 9.4 Q 0 11.4 4.4 9.4" /><path d="M-3.2 13 Q 0 14.8 3.2 13" />
                  </g>
                </g>

                {/* Template: bauble gold / ice / berry (facet + highlight) */}
                <g id="wnBaubleGold">
                  <path d="M0 -8.6 L0 -5.8" stroke="#B45309" strokeWidth="0.7" />
                  <path d="M-1.8 -6 L1.8 -6 L1.3 -4.2 L-1.3 -4.2 Z" fill="url(#wnGoldGrad)" />
                  <circle cx="0" cy="0.4" r="4.8" fill="url(#wnGoldGrad)" />
                  <path d="M-3.4 -1.8 C -2.2 2.4, 2.2 2.4, 3.4 -1.8" stroke="#FFF7D6" strokeWidth="0.6" opacity="0.55" fill="none" />
                  <ellipse cx="-1.7" cy="-1.6" rx="1.2" ry="1.9" fill="#FFFFF7" opacity="0.7" transform="rotate(-24 -1.7 -1.6)" />
                  <circle cx="1.6" cy="2.2" r="0.55" fill="#B8860B" opacity="0.5" />
                </g>
                <g id="wnBaubleIce">
                  <path d="M0 -8.6 L0 -5.8" stroke="#7DD3FC" strokeWidth="0.7" />
                  <path d="M-1.8 -6 L1.8 -6 L1.3 -4.2 L-1.3 -4.2 Z" fill="url(#wnIceGrad)" />
                  <circle cx="0" cy="0.4" r="4.8" fill="url(#wnIceGrad)" />
                  <path d="M-3.4 -1.8 C -2.2 2.4, 2.2 2.4, 3.4 -1.8" stroke="#F0F9FF" strokeWidth="0.6" opacity="0.6" fill="none" />
                  <ellipse cx="-1.7" cy="-1.6" rx="1.2" ry="1.9" fill="#FFFFFF" opacity="0.8" transform="rotate(-24 -1.7 -1.6)" />
                  <circle cx="1.6" cy="2.2" r="0.55" fill="#38BDF8" opacity="0.45" />
                </g>
                <g id="wnBaubleBerry">
                  <path d="M0 -8.6 L0 -5.8" stroke="#7F1D1D" strokeWidth="0.7" />
                  <path d="M-1.8 -6 L1.8 -6 L1.3 -4.2 L-1.3 -4.2 Z" fill="url(#wnGoldGrad)" />
                  <circle cx="0" cy="0.4" r="4.8" fill="url(#wnBerryGrad)" />
                  <path d="M-3.4 -1.8 C -2.2 2.4, 2.2 2.4, 3.4 -1.8" stroke="#FCA5A5" strokeWidth="0.6" opacity="0.45" fill="none" />
                  <ellipse cx="-1.7" cy="-1.6" rx="1.2" ry="1.9" fill="#FFF1F2" opacity="0.6" transform="rotate(-24 -1.7 -1.6)" />
                  <circle cx="1.6" cy="2.2" r="0.55" fill="#7F1D1D" opacity="0.5" />
                </g>

                {/* Template: ngôi sao 5 cánh 2 tầng */}
                <g id="wnStar">
                  <path d="M0 -5.4 L1.5 -1.6 L5.4 -1.4 L2.3 1.2 L3.4 5 L0 2.8 L-3.4 5 L-2.3 1.2 L-5.4 -1.4 L-1.5 -1.6 Z" fill="url(#wnGoldGrad)" />
                  <path d="M0 -2.4 L0.7 -0.6 L2.5 -0.6 L1.1 0.6 L1.6 2.4 L0 1.4 L-1.6 2.4 L-1.1 0.6 L-2.5 -0.6 L-0.7 -0.6 Z" fill="#FFF7D6" opacity="0.85" />
                </g>

                {/* Template: đèn lồng ấm 4 ô kính */}
                <g id="wnLantern">
                  <ellipse cx="0" cy="0" rx="10.5" ry="13.5" fill="url(#wnGlowGrad)" opacity="0.55" />
                  <path d="M0 -18 L0 -14" stroke="#6B4423" strokeWidth="0.9" />
                  <path d="M-4 -14 L4 -14 L5 -12 L-5 -12 Z" fill="#4A2E18" />
                  <path d="M-6 -12 L6 -12 L7 12 L-7 12 Z" fill="url(#wnLanternGrad)" />
                  <path d="M-6 -12 L6 -12 L7 12 L-7 12 Z" fill="none" stroke="#8E5A1F" strokeWidth="0.7" />
                  <g fill="#FFF7D6" opacity="0.92">
                    <rect x="-4.2" y="-9.4" width="3.4" height="7.2" rx="0.6" /><rect x="0.8" y="-9.4" width="3.4" height="7.2" rx="0.6" />
                    <rect x="-4.2" y="-0.8" width="3.4" height="7.2" rx="0.6" /><rect x="0.8" y="-0.8" width="3.4" height="7.2" rx="0.6" />
                  </g>
                  <path d="M-4 -12 C -7 -6, -7 6, -4 12 M4 -12 C 7 -6, 7 6, 4 12" stroke="#B8860B" strokeWidth="0.5" opacity="0.6" fill="none" />
                  <path d="M-5 12 L5 12 L4 15 L-4 15 Z" fill="#4A2E18" />
                  <path d="M0 15 L0 19" stroke="#D99A1F" strokeWidth="0.9" />
                  <ellipse cx="0" cy="20" rx="2.6" ry="1.1" fill="url(#wnGoldGrad)" />
                </g>

                {/* Template: hộp quà nơ vàng */}
                <g id="wnGift">
                  <rect x="-8" y="-6" width="16" height="12" rx="1.4" fill="url(#wnBerryGrad)" />
                  <rect x="-8" y="-6" width="16" height="3.6" rx="1.4" fill="#B91C1C" />
                  <rect x="-1.6" y="-6" width="3.2" height="12" fill="url(#wnGoldGrad)" />
                  <path d="M0 -6 C -3.4 -9, -6.2 -8.4, -6.4 -6 C -6.5 -3.8, -3.2 -4.2, 0 -6 Z" fill="url(#wnGoldGrad)" />
                  <path d="M0 -6 C 3.4 -9, 6.2 -8.4, 6.4 -6 C 6.5 -3.8, 3.2 -4.2, 0 -6 Z" fill="url(#wnGoldGrad)" />
                  <circle cx="0" cy="-6" r="1.2" fill="#FFF7D6" />
                  <ellipse cx="-4.6" cy="-2.4" rx="2.2" ry="2.8" fill="#FCA5A5" opacity="0.32" />
                  <ellipse cx="4.8" cy="1.6" rx="1.6" ry="2" fill="#7F1D1D" opacity="0.3" />
                </g>

                {/* Template: chim bullfinch ức đỏ, mũ tuyết */}
                <g id="wnBird">
                  <path d="M-6 2 C -8 -4, -4 -9, 1 -9 C 6 -9, 9 -5, 8 -1 C 7 2, 4 4, 0 4 C -3 4, -5.4 3.4, -6 2 Z" fill="#94A3B8" />
                  <path d="M-6 2 C -8 -3, -5 -8, 0 -8.4 C 3 -8.6, 5.4 -6.4, 5.6 -4 C 4 -5.6, 1 -6.2, -2 -5.4 C -4 -4.8, -5.2 -2.4, -5.4 0.4 C -5.6 2, -5.8 2.8, -6 2 Z" fill="#64748B" />
                  <path d="M1.2 4 C -1 4, -3.4 3.4, -4.6 2 C -3 0.6, -0.4 0.4, 1.6 1.2 C 3.4 2, 3.6 3.4, 1.2 4 Z" fill="#DC2626" />
                  <ellipse cx="1.6" cy="2" rx="2.8" ry="1.8" fill="#EF4444" opacity="0.9" />
                  <circle cx="6.2" cy="-6.4" r="3.3" fill="#1F2937" />
                  <path d="M8.6 -7.2 L11.6 -6.6 L8.8 -5.6 Z" fill="#374151" />
                  <circle cx="6.9" cy="-7.2" r="0.7" fill="#F8FAFC" />
                  <circle cx="6.9" cy="-7.2" r="0.3" fill="#111827" />
                  <path d="M-5.6 1.4 C -8 2.6, -10.2 2.2, -11.4 0.8 C -9.4 0, -7 0, -5.6 1.4 Z" fill="#334155" />
                  <ellipse cx="-0.6" cy="-3.8" rx="3.2" ry="1.6" fill="#E2E8F0" opacity="0.5" transform="rotate(-18 -0.6 -3.8)" />
                  <path d="M-2 3.4 L-2 5 M1 3.6 L1 5.2" stroke="#B45309" strokeWidth="0.5" />
                  <path d="M-2.6 -8.4 C -1.4 -9.8, 1.4 -10.2, 3 -9.2" stroke="#F8FAFC" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                </g>
              
                <linearGradient id="wnV4Relief" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0B3D2E" />
                  <stop offset="46%" stopColor="#14532D" />
                  <stop offset="100%" stopColor="#D6E8F6" />
                </linearGradient>
                <linearGradient id="wnV4RimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="52%" stopColor="#BFD9EC" />
                  <stop offset="100%" stopColor="#64748B" />
                </linearGradient>
                <radialGradient id="wnV4MedalGrad" cx="46%" cy="38%" r="62%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="42%" stopColor="#DCEFFB" />
                  <stop offset="78%" stopColor="#7FB6D9" />
                  <stop offset="100%" stopColor="#1E4C6B" />
                </radialGradient>
                <g id="wnV4Medallion">
                  <circle r="9.6" fill="none" stroke="url(#wnV4RimGrad)" strokeWidth="1.5" />
                  <circle r="7.8" fill="url(#wnV4MedalGrad)" opacity="0.85" />
                  <circle r="7.8" fill="none" stroke="#FFFFFF" strokeWidth="0.4" opacity="0.8" />
                  <path d="M0 -7.4 L0 -2.2" stroke="#F8FCFF" strokeWidth="0.7" transform="rotate(0)" /><path d="M0 -7.4 L0 -2.2" stroke="#F8FCFF" strokeWidth="0.7" transform="rotate(60)" /><path d="M0 -7.4 L0 -2.2" stroke="#F8FCFF" strokeWidth="0.7" transform="rotate(120)" /><path d="M0 -7.4 L0 -2.2" stroke="#F8FCFF" strokeWidth="0.7" transform="rotate(180)" /><path d="M0 -7.4 L0 -2.2" stroke="#F8FCFF" strokeWidth="0.7" transform="rotate(240)" /><path d="M0 -7.4 L0 -2.2" stroke="#F8FCFF" strokeWidth="0.7" transform="rotate(300)" />
                  <path d="M0 -5.8 l1.5 1.5 l-1.5 1.5 l-1.5 -1.5 z" fill="#FFFFFF" opacity="0.85" transform="rotate(0)" /><path d="M0 -5.8 l1.5 1.5 l-1.5 1.5 l-1.5 -1.5 z" fill="#FFFFFF" opacity="0.85" transform="rotate(60)" /><path d="M0 -5.8 l1.5 1.5 l-1.5 1.5 l-1.5 -1.5 z" fill="#FFFFFF" opacity="0.85" transform="rotate(120)" /><path d="M0 -5.8 l1.5 1.5 l-1.5 1.5 l-1.5 -1.5 z" fill="#FFFFFF" opacity="0.85" transform="rotate(180)" /><path d="M0 -5.8 l1.5 1.5 l-1.5 1.5 l-1.5 -1.5 z" fill="#FFFFFF" opacity="0.85" transform="rotate(240)" /><path d="M0 -5.8 l1.5 1.5 l-1.5 1.5 l-1.5 -1.5 z" fill="#FFFFFF" opacity="0.85" transform="rotate(300)" />
                  <circle r="1.7" fill="#FFFFFF" />
                  <circle cx="-2.4" cy="-2.8" r="0.7" fill="#1E4C6B" opacity="0.5" />
                  <circle cy="-10.6" r="0.55" fill="#EAF6FF" transform="rotate(0)" /><circle cy="-10.6" r="0.55" fill="#EAF6FF" transform="rotate(30)" /><circle cy="-10.6" r="0.55" fill="#EAF6FF" transform="rotate(60)" /><circle cy="-10.6" r="0.55" fill="#EAF6FF" transform="rotate(90)" /><circle cy="-10.6" r="0.55" fill="#EAF6FF" transform="rotate(120)" /><circle cy="-10.6" r="0.55" fill="#EAF6FF" transform="rotate(150)" /><circle cy="-10.6" r="0.55" fill="#EAF6FF" transform="rotate(180)" /><circle cy="-10.6" r="0.55" fill="#EAF6FF" transform="rotate(210)" /><circle cy="-10.6" r="0.55" fill="#EAF6FF" transform="rotate(240)" /><circle cy="-10.6" r="0.55" fill="#EAF6FF" transform="rotate(270)" /><circle cy="-10.6" r="0.55" fill="#EAF6FF" transform="rotate(300)" /><circle cy="-10.6" r="0.55" fill="#EAF6FF" transform="rotate(330)" />
                  <path d="M-8 5.4 A 9.6 9.6 0 0 0 8 5.4" fill="none" stroke="#0B3D2E" strokeWidth="0.9" opacity="0.35" />
                </g>
              </defs>

              {/* Lớp tuyết nền mờ */}
              <path d="M-6 0 L346 0 L346 8 C 300 6, 262 10, 212 8 C 162 6, 120 11, 70 8 C 40 6, 10 9, -6 7 Z" fill="url(#wnSnowGrad)" opacity="0.5" />
              <path d="M-6 7 C 40 9, 90 6, 140 8 C 190 10, 250 6, 346 8" stroke="#BFD9EC" strokeWidth="0.7" opacity="0.6" fill="none" />

              {/* Bough trái: filled thuôn đầu nhọn */}
              <path d="M-8 1 C 18 0.4, 48 2.4, 76 5.6 C 96 7.8, 116 10.8, 130 13.4 L 128 16.4 C 112 13.6, 92 10.6, 74 8.6 C 48 5.8, 18 4.4, -8 5.2 Z" fill="url(#wnBoughGrad)" />
              <path d="M-8 2.4 C 18 1.8, 48 3.6, 76 6.6 C 96 8.6, 114 11.4, 128 13.8" stroke="#4ADE80" strokeWidth="0.55" opacity="0.45" fill="none" strokeLinecap="round" />
              {/* Bough phải: mirror */}
              <path d="M348 1 C 322 0.4, 292 2.4, 264 5.6 C 244 7.8, 224 10.8, 210 13.4 L 212 16.4 C 228 13.6, 248 10.6, 266 8.6 C 292 5.8, 322 4.4, 348 5.2 Z" fill="url(#wnBoughGrad)" />
              <path d="M348 2.4 C 322 1.8, 292 3.6, 264 6.6 C 244 8.6, 226 11.4, 212 13.8" stroke="#4ADE80" strokeWidth="0.55" opacity="0.45" fill="none" strokeLinecap="round" />

              {/* Chùm kim thông 2 bên (fill + tuyết) */}
              <use href="#wnNeedleFan" transform="translate(8,5.4) rotate(-75) scale(0.92)" />
              <use href="#wnNeedleFan" transform="translate(36,6.6) rotate(-75) scale(0.88)" />
              <use href="#wnNeedleFan" transform="translate(64,8) rotate(-75) scale(0.95)" />
              <use href="#wnNeedleFan" transform="translate(94,9.8) rotate(-75) scale(0.84)" />
              <use href="#wnNeedleFan" transform="translate(120,12.4) rotate(-75) scale(0.78)" />
              <use href="#wnNeedleFan" transform="translate(332,5.4) rotate(195) scale(0.92)" />
              <use href="#wnNeedleFan" transform="translate(304,6.6) rotate(195) scale(0.88)" />
              <use href="#wnNeedleFan" transform="translate(276,8) rotate(195) scale(0.95)" />
              <use href="#wnNeedleFan" transform="translate(246,9.8) rotate(195) scale(0.84)" />
              <use href="#wnNeedleFan" transform="translate(220,12.4) rotate(195) scale(0.78)" />

              {/* Tuyết đọng trên bough */}
              <ellipse cx="22" cy="3.4" rx="11" ry="2.4" fill="#FFFFFF" opacity="0.95" />
              <ellipse cx="58" cy="4.6" rx="9" ry="2.2" fill="#F7FBFF" opacity="0.9" />
              <ellipse cx="104" cy="7.6" rx="8" ry="2" fill="#FFFFFF" opacity="0.9" />
              <ellipse cx="318" cy="3.4" rx="11" ry="2.4" fill="#FFFFFF" opacity="0.95" />
              <ellipse cx="282" cy="4.6" rx="9" ry="2.2" fill="#F7FBFF" opacity="0.9" />
              <ellipse cx="236" cy="7.6" rx="8" ry="2" fill="#FFFFFF" opacity="0.9" />

              {/* Nhũ băng dài ngắn khác nhau */}
              <path d="M44 15.4 L46.4 15.4 L45.1 27 Z" fill="url(#wnIceGrad)" />
              <path d="M45.3 16.4 L45.7 24.4" stroke="#F0F9FF" strokeWidth="0.5" opacity="0.8" />
              <path d="M96 16.8 L98.2 16.8 L97 25 Z" fill="url(#wnIceGrad)" />
              <path d="M140 16.4 L142.6 16.4 L141.1 23 Z" fill="url(#wnIceGrad)" />
              <path d="M246 16.8 L248.2 16.8 L247 26 Z" fill="url(#wnIceGrad)" />
              <path d="M306 16.6 L308.6 16.6 L307.1 28 Z" fill="url(#wnIceGrad)" />
              <path d="M307.2 17.6 L307.6 25.4" stroke="#F0F9FF" strokeWidth="0.5" opacity="0.8" />

              {/* Twine + 3 bauble giữa (khu vực không có chữ HUD) */}
              <path d="M148 2 C 154 12, 160 16, 168 17 C 176 16, 184 12, 190 2" stroke="#8B5E3C" strokeWidth="0.7" fill="none" opacity="0.8" />
              <path d="M160 12.6 L160 19" stroke="#D4AF37" strokeWidth="0.45" />
              <path d="M168 14.6 L168 20" stroke="#D4AF37" strokeWidth="0.45" />
              <path d="M176 12.8 L176 19.4" stroke="#D4AF37" strokeWidth="0.45" />
              <use href="#wnBaubleGold" transform="translate(160,25) scale(0.92)" />
              <use href="#wnBaubleIce" transform="translate(168,26.4) scale(1)" />
              <use href="#wnBaubleBerry" transform="translate(176,25.2) scale(0.86)" />

              {/* 6 LED vàng ấm men mép trong */}
              {[
                { x: 28, y: 12.4, d: "0s" }, { x: 68, y: 13.6, d: "0.45s" }, { x: 110, y: 15, d: "0.9s" },
                { x: 230, y: 15, d: "1.35s" }, { x: 272, y: 13.6, d: "0.7s" }, { x: 312, y: 12.4, d: "1.15s" },
              ].map((l, i) => (
                <g key={`wn-led-${i}`} className="wn-light" style={{ animationDelay: l.d }} transform={`translate(${l.x},${l.y})`}>
                  <circle r="3.4" fill="#F6C453" opacity="0.22" />
                  <circle r="1.55" fill="#FFF3C4" />
                </g>
              ))}

              {/* 2 sparkle */}
              <path d="M124 2.6 C 124.3 4, 124.9 4.6, 126.3 4.9 C 124.9 5.2, 124.3 5.8, 124 7.2 C 123.7 5.8, 123.1 5.2, 121.7 4.9 C 123.1 4.6, 123.7 4, 124 2.6 Z" fill="#FFF7D6" opacity="0.85" />
              <path d="M212 3.4 C 212.3 4.6, 212.8 5.1, 214 5.4 C 212.8 5.7, 212.3 6.2, 212 7.4 C 211.7 6.2, 211.2 5.7, 210 5.4 C 211.2 5.1, 211.7 4.6, 212 3.4 Z" fill="#FFF7D6" opacity="0.7" />
            
              {/* V4 — relief tuyết, ren băng, viền kép, hạt cườm, huy hiệu */}
              <g>
                <path d="M114 20 q10 -6 20 0 q10 -6 20 0 q10 -6 20 0 q10 -6 20 0 q10 -6 20 0  L224 27 L114 27 Z" fill="url(#wnV4Relief)" opacity="0.42" />
                <path d="M0 21 q10 -7 20 0 q10 -7 20 0 q10 -7 20 0 q10 -7 20 0 q10 -7 20 0 q10 -7 20 0 q10 -7 20 0 q10 -7 20 0 q10 -7 20 0 q10 -7 20 0 q10 -7 20 0 q10 -7 20 0 q10 -7 20 0 q10 -7 20 0 q10 -7 20 0 q10 -7 20 0 q10 -7 20 0 " fill="none" stroke="#EAF6FF" strokeWidth="0.55" opacity="0.55" />
                <path d="M0 19 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 q5 -3 10 0 " fill="none" stroke="#BFD9EC" strokeWidth="0.4" opacity="0.45" />
                <path d="M2 8 l4.2 -3.6 l4.2 3.6 l4.2 -3.6 l4.2 -3.6 l4.2 3.6 l4.2 -3.6 l4.2 -3.6 l4.2 3.6 l4.2 -3.6 l4.2 -3.6 l4.2 3.6 l4.2 -3.6 l4.2 -3.6 l4.2 3.6 l4.2 -3.6 l4.2 -3.6 l4.2 3.6 l4.2 -3.6 l4.2 -3.6 l4.2 3.6 l4.2 -3.6 l4.2 -3.6 l4.2 3.6 l4.2 -3.6 l4.2 -3.6 l4.2 3.6 l4.2 -3.6 l4.2 -3.6 l4.2 3.6 l4.2 -3.6 l4.2 -3.6 l4.2 3.6 l4.2 -3.6 l4.2 -3.6 l4.2 3.6 l4.2 -3.6 l4.2 -3.6 l4.2 3.6 l4.2 -3.6 l4.2 -3.6 l4.2 3.6 l4.2 -3.6 l4.2 -3.6 l4.2 3.6 l4.2 -3.6 l4.2 -3.6 l4.2 3.6 l4.2 -3.6 l4.2 -3.6 l4.2 3.6 l4.2 -3.6 " fill="none" stroke="#DBECF7" strokeWidth="0.5" opacity="0.6" />
                <path d="M4 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M19 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M34 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M49 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M64 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M79 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M94 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M109 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M124 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M139 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M154 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M169 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M184 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M199 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M214 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M229 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M244 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M259 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M274 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M289 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M304 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" /><path d="M319 12 l3 3 l-3 3 l-3 -3 z" fill="none" stroke="#EAF6FF" strokeWidth="0.45" opacity="0.55" />
                <path d="M0 2.6 H340" stroke="url(#wnV4RimGrad)" strokeWidth="1.1" opacity="0.6" />
                <path d="M0 5 H340" stroke="#F8FCFF" strokeWidth="0.45" opacity="0.4" />
                <circle cx="10" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="22" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="34" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="46" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="58" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="70" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="82" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="94" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="106" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="118" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="130" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="142" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="154" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="166" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="178" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="190" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="202" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="214" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="226" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="238" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="250" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="262" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="274" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="286" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="298" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="310" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="322" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                <circle cx="334" cy="5" r="0.8" fill="#F8FCFF" opacity="0.7" />
                
                <use href="#wnV4Medallion" transform="translate(206,17.4) scale(0.72)" />
                <path d="M196 6 C 200 3.4, 212 3.4, 216 6" fill="none" stroke="#EAF6FF" strokeWidth="0.5" opacity="0.6" />
              </g>
            </svg>
          </div>

          {/* Cạnh trái: thân S-curve filled thuôn + 7 chùm kim + berry + quả thông + LED */}
          <div className="frame-border-side border-left pine-border-left">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="pine-side-svg">
              <g>
                <path d="M1.2 0 V460" stroke="url(#wnV4RimGrad)" strokeWidth="0.9" opacity="0.5" />
                <path d="M4.4 0 V460" stroke="#F0F9FF" strokeWidth="0.35" opacity="0.3" />
                <path d="M12.4 0 V460" stroke="#7FB6D9" strokeWidth="0.4" opacity="0.55" strokeDasharray="3 5" />
                <path d="M4 0 l3 20 l-3 20 l3 20 l-3 20 l3 20 l-3 20 l3 20 l-3 20 l3 20 l-3 20 l3 20 l-3 20 l3 20 l-3 20 l3 20 l-3 20 l3 20 l-3 20 l3 20 l-3 20 l3 20 l-3 20 " fill="none" stroke="#DBECF7" strokeWidth="0.45" opacity="0.5" />
                <path d="M2 0 L15 20 L2 40 L15 20 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 40 L15 60 L2 80 L15 60 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 80 L15 100 L2 120 L15 100 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 120 L15 140 L2 160 L15 140 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 160 L15 180 L2 200 L15 180 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 200 L15 220 L2 240 L15 220 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 240 L15 260 L2 280 L15 260 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 280 L15 300 L2 320 L15 300 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 320 L15 340 L2 360 L15 340 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 360 L15 380 L2 400 L15 380 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 400 L15 420 L2 440 L15 420 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 440 L15 460 L2 480 L15 460 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" />
                <circle cx="11.4" cy="10" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="34" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="58" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="82" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="106" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="130" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="154" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="178" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="202" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="226" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="250" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="274" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="298" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="322" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="346" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="370" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="394" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="418" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="442" r="0.75" fill="#F0F9FF" opacity="0.6" />
                
              </g>
              <path d="M0 0 L6 0 C 5.2 120, 6.6 240, 5 460 L0 460 Z" fill="#0B3D2E" opacity="0.16" />
              <path d="M14 -4 C 9 80, 20 160, 15 230 C 10 300, 20 380, 17 464 L 20.6 464 C 23.6 380, 13.6 300, 18.6 230 C 23.6 160, 12.6 80, 17.6 -4 Z" fill="url(#wnBoughSideGrad)" />
              <path d="M14.6 -4 C 9.6 80, 20.6 160, 15.6 230 C 10.6 300, 20.6 380, 17.6 464" stroke="#4ADE80" strokeWidth="0.5" opacity="0.35" fill="none" />
              <ellipse cx="16.4" cy="148" rx="1.5" ry="2.1" fill="#3F2411" stroke="#6B4423" strokeWidth="0.3" />
              <circle cx="18.6" cy="196" r="0.5" fill="#3F2411" opacity="0.6" />
              <circle cx="14.4" cy="290" r="0.45" fill="#3F2411" opacity="0.6" />

              <use href="#wnNeedleFan" transform="translate(16,40) rotate(-75) scale(0.86)" />
              <use href="#wnNeedleFan" transform="translate(16.4,96) rotate(-75) scale(0.78)" />
              <use href="#wnNeedleFan" transform="translate(14.4,162) rotate(-75) scale(0.9)" />
              <use href="#wnNeedleFan" transform="translate(17,226) rotate(-75) scale(0.8)" />
              <use href="#wnNeedleFan" transform="translate(14.2,288) rotate(-75) scale(0.86)" />
              <use href="#wnNeedleFan" transform="translate(16.8,352) rotate(-75) scale(0.76)" />
              <use href="#wnNeedleFan" transform="translate(16,414) rotate(-75) scale(0.88)" />

              <use href="#wnBerryCluster" transform="translate(14,120) rotate(-16) scale(0.9)" />
              <use href="#wnBerryCluster" transform="translate(16,268) rotate(8) scale(0.8)" />
              <use href="#wnBerryCluster" transform="translate(14.4,398) rotate(-10) scale(0.86)" />
              <use href="#wnPineCone" transform="translate(21,325) rotate(18) scale(0.62)" />

              <ellipse cx="12" cy="62" rx="4.4" ry="1.5" fill="#FFFFFF" opacity="0.9" transform="rotate(-16 12 62)" />
              <ellipse cx="12" cy="204" rx="3.8" ry="1.3" fill="#F7FBFF" opacity="0.85" transform="rotate(-14 12 204)" />
              <ellipse cx="12" cy="378" rx="4" ry="1.4" fill="#FFFFFF" opacity="0.88" transform="rotate(-18 12 378)" />

              {[
                { y: 78, d: "0s" }, { y: 176, d: "0.4s" }, { y: 302, d: "0.9s" }, { y: 438, d: "1.4s" },
              ].map((l, i) => (
                <g key={`wn-side-light-l-${i}`} className="wn-light" style={{ animationDelay: l.d }} transform={`translate(10,${l.y})`}>
                  <circle r="3.1" fill="#F6C453" opacity="0.2" />
                  <circle r="1.4" fill="#FFF3C4" />
                </g>
              ))}
            </svg>
          </div>

          {/* Cạnh phải: phase lệch + bullfinch y≈300 + star ornament y≈220 */}
          <div className="frame-border-side border-right pine-border-right">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="pine-side-svg">
              <g>
                <path d="M1.2 0 V460" stroke="url(#wnV4RimGrad)" strokeWidth="0.9" opacity="0.5" />
                <path d="M4.4 0 V460" stroke="#F0F9FF" strokeWidth="0.35" opacity="0.3" />
                <path d="M12.4 0 V460" stroke="#7FB6D9" strokeWidth="0.4" opacity="0.55" strokeDasharray="3 5" />
                <path d="M4 0 l3 20 l-3 20 l3 20 l-3 20 l3 20 l-3 20 l3 20 l-3 20 l3 20 l-3 20 l3 20 l-3 20 l3 20 l-3 20 l3 20 l-3 20 l3 20 l-3 20 l3 20 l-3 20 l3 20 l-3 20 " fill="none" stroke="#DBECF7" strokeWidth="0.45" opacity="0.5" />
                <path d="M2 0 L15 20 L2 40 L15 20 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 40 L15 60 L2 80 L15 60 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 80 L15 100 L2 120 L15 100 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 120 L15 140 L2 160 L15 140 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 160 L15 180 L2 200 L15 180 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 200 L15 220 L2 240 L15 220 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 240 L15 260 L2 280 L15 260 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 280 L15 300 L2 320 L15 300 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 320 L15 340 L2 360 L15 340 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 360 L15 380 L2 400 L15 380 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 400 L15 420 L2 440 L15 420 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" /><path d="M2 440 L15 460 L2 480 L15 460 Z" fill="none" stroke="#DCEFFB" strokeWidth="0.4" opacity="0.4" />
                <circle cx="11.4" cy="10" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="34" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="58" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="82" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="106" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="130" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="154" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="178" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="202" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="226" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="250" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="274" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="298" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="322" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="346" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="370" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="394" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="418" r="0.75" fill="#F0F9FF" opacity="0.6" />
                <circle cx="11.4" cy="442" r="0.75" fill="#F0F9FF" opacity="0.6" />
                
              </g>
              <path d="M26 0 L32 0 L32 460 L26 460 C 27.6 240, 26.2 120, 26 0 Z" fill="#0B3D2E" opacity="0.16" />
              <path d="M18 -4 C 23 80, 12 160, 17 230 C 22 300, 12 380, 15 464 L 11.4 464 C 8.4 380, 18.4 300, 13.4 230 C 8.4 160, 19.4 80, 14.4 -4 Z" fill="url(#wnBoughSideGrad)" />
              <path d="M17.4 -4 C 22.4 80, 11.4 160, 16.4 230 C 21.4 300, 11.4 380, 14.4 464" stroke="#4ADE80" strokeWidth="0.5" opacity="0.35" fill="none" />
              <ellipse cx="15.6" cy="172" rx="1.5" ry="2.1" fill="#3F2411" stroke="#6B4423" strokeWidth="0.3" />
              <circle cx="13.4" cy="252" r="0.5" fill="#3F2411" opacity="0.6" />

              <use href="#wnNeedleFan" transform="translate(16,58) rotate(195) scale(0.86)" />
              <use href="#wnNeedleFan" transform="translate(15.6,118) rotate(195) scale(0.78)" />
              <use href="#wnNeedleFan" transform="translate(17.6,180) rotate(195) scale(0.9)" />
              <use href="#wnNeedleFan" transform="translate(15,243) rotate(195) scale(0.8)" />
              <use href="#wnNeedleFan" transform="translate(17.8,305) rotate(195) scale(0.86)" />
              <use href="#wnNeedleFan" transform="translate(15.2,368) rotate(195) scale(0.76)" />
              <use href="#wnNeedleFan" transform="translate(16,430) rotate(195) scale(0.88)" />

              <use href="#wnBerryCluster" transform="translate(18,100) rotate(160) scale(0.82)" />
              <use href="#wnBerryCluster" transform="translate(15,270) rotate(188) scale(0.78)" />
              <use href="#wnBerryCluster" transform="translate(17,402) rotate(170) scale(0.84)" />

              <path d="M13 216 L13 205" stroke="#D4AF37" strokeWidth="0.5" />
              <use href="#wnStar" transform="translate(13,200) scale(1.15)" />
              <path d="M13 186 L13 194.4" stroke="#D4AF37" strokeWidth="0.45" />

              <use href="#wnBird" transform="translate(22,300) rotate(-6) scale(0.85)" />

              {[
                { y: 74, d: "0.2s" }, { y: 156, d: "0.65s" }, { y: 282, d: "1.05s" }, { y: 444, d: "0.35s" },
              ].map((l, i) => (
                <g key={`wn-side-light-r-${i}`} className="wn-light" style={{ animationDelay: l.d }} transform={`translate(22,${l.y})`}>
                  <circle r="3.1" fill="#F6C453" opacity="0.2" />
                  <circle r="1.4" fill="#FFF3C4" />
                </g>
              ))}
            </svg>
          </div>

          {/* Mép đáy: 2 lớp drift + cành thông ngang + quà + bauble + star + dấu chân */}
          <div className="frame-border-bottom snow-border-bottom">
            <svg viewBox="0 0 340 44" preserveAspectRatio="none" className="snow-bottom-svg">
              <g>
                <path d="M0 20.4 H340" stroke="url(#wnV4RimGrad)" strokeWidth="1" />
                <path d="M0 23 H340" stroke="#F0F9FF" strokeWidth="0.4" opacity="0.65" />
                <circle cx="10" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="22" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="34" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="46" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="58" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="70" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="82" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="94" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="106" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="118" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="130" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="142" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="154" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="166" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="178" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="190" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="202" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="214" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="226" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="238" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="250" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="262" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="274" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="286" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="298" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="310" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="322" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                <circle cx="334" cy="23" r="0.75" fill="#EAF6FF" opacity="0.6" />
                
                <path d="M0 31 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 q8 -4 16 0 t16 0 " fill="none" stroke="#DCEFFB" strokeWidth="0.5" opacity="0.6" />
                <path d="M0 36 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 q6 -3 12 0 t12 0 " fill="none" stroke="#BFD9EC" strokeWidth="0.4" opacity="0.5" />
                <use href="#wnV4Medallion" transform="translate(170,31) scale(0.72)" />
              </g>
              <path d="M-8 44 L348 44 L348 29 C 300 23, 258 31, 210 27 C 160 23, 118 33, 68 29 C 38 26, 10 31, -8 29 Z" fill="url(#wnSnowShadeGrad)" />
              <path d="M-8 44 L348 44 L348 36 C 300 31, 258 38, 210 34.4 C 160 30.6, 118 40, 68 36 C 38 33.4, 8 37, -8 35 Z" fill="url(#wnSnowGrad)" />
              <ellipse cx="26" cy="40" rx="14" ry="3.6" fill="#FFFFFF" opacity="0.9" />
              <ellipse cx="96" cy="42" rx="12" ry="2.8" fill="#F7FBFF" opacity="0.85" />
              <ellipse cx="196" cy="41" rx="13" ry="3" fill="#FFFFFF" opacity="0.85" />
              <ellipse cx="274" cy="40" rx="11" ry="3.2" fill="#F7FBFF" opacity="0.9" />

              <path d="M-8 29 C 42 25, 92 32, 142 28 C 192 24, 252 32, 348 27 L 348 30.4 C 252 36, 192 28, 142 32.4 C 92 36.6, 42 29.4, -8 32.6 Z" fill="url(#wnBoughGrad)" />
              <use href="#wnNeedleFan" transform="translate(30,31) rotate(-75) scale(0.6)" />
              <use href="#wnNeedleFan" transform="translate(132,31) rotate(-70) scale(0.55)" />
              <use href="#wnNeedleFan" transform="translate(300,30.4) rotate(195) scale(0.6)" />
              <ellipse cx="70" cy="28" rx="7" ry="1.8" fill="#FFFFFF" opacity="0.9" />
              <ellipse cx="238" cy="29" rx="8" ry="1.9" fill="#FFFFFF" opacity="0.88" />

              <use href="#wnGift" transform="translate(64,35) scale(0.85)" />
              <path d="M166 28 L166 31.4 M168 28 L168 31.4 M172 28 L172 31.4" stroke="#D4AF37" strokeWidth="0.4" />
              <use href="#wnBaubleGold" transform="translate(166,35.4) scale(0.8)" />
              <use href="#wnBaubleIce" transform="translate(172,36.4) scale(0.86)" />
              <use href="#wnBaubleBerry" transform="translate(178,34.8) scale(0.74)" />

              <use href="#wnStar" transform="translate(250,31) scale(0.9)" />
              <use href="#wnStar" transform="translate(316,33.4) scale(0.7)" />

              <g fill="#BFD9EC" opacity="0.85">
                <ellipse cx="104" cy="38.6" rx="1.5" ry="2.1" transform="rotate(-16 104 38.6)" />
                <ellipse cx="108" cy="41.2" rx="1.5" ry="2.1" transform="rotate(-16 108 41.2)" />
                <ellipse cx="116" cy="39.8" rx="1.4" ry="2" transform="rotate(-16 116 39.8)" />
              </g>
            </svg>
          </div>

          {/* Góc TL: mũ Noel vẽ lại 62×54 (crown 4 stop, 3 nếp, vành 7 ellipse, pompom sợi) */}
          <div className="corner-ornament hat-top-left">
            <svg viewBox="0 0 100 80" width="62" height="54" className="santa-hat-svg">
              <path d="M16 54 C 20 32, 34 16, 56 10 C 70 6, 82 10, 86 22 C 88 30, 86 38, 82 44 C 78 34, 70 28, 58 28 C 40 28, 26 38, 20 56 Z" fill="url(#wnHatGrad)" />
              <path d="M56 10 C 70 6, 82 10, 86 22 C 88 30, 86 38, 82 44 C 79 36, 74 31, 66 29 C 74 24, 76 16, 68 12 Z" fill="url(#wnHatDeepGrad)" />
              <path d="M28 44 C 30 34, 38 24, 50 19" stroke="#FCA5A5" strokeWidth="0.7" opacity="0.45" fill="none" strokeLinecap="round" />
              <path d="M38 40 C 40 32, 46 25, 55 21" stroke="#8E0D22" strokeWidth="0.8" opacity="0.5" fill="none" strokeLinecap="round" />
              <path d="M50 34 C 52 27, 57 22, 64 20" stroke="#8E0D22" strokeWidth="0.7" opacity="0.4" fill="none" strokeLinecap="round" />
              <circle cx="83" cy="46" r="8.6" fill="#FFFFFF" />
              <circle cx="80.4" cy="43.4" r="6.2" fill="#F8FAFC" />
              <path d="M86 52 C 88 55, 89 58, 88 61 M83 53 C 84 56, 84 59, 82 62" stroke="#E2E8F0" strokeWidth="0.7" fill="none" strokeLinecap="round" />
              <ellipse cx="28" cy="56" rx="22" ry="7.4" fill="#FFFFFF" />
              <ellipse cx="28" cy="55" rx="21" ry="6.2" fill="#F8FAFC" />
              {[10, 18, 26, 34, 42, 50, 57].map((x, i) => (
                <ellipse key={`wn-hat-fur-${i}`} cx={x} cy={i % 2 === 0 ? 55.2 : 57} rx="4.6" ry="4.2" fill={i % 2 === 0 ? "#FFFFFF" : "#F1F5F9"} />
              ))}
              <ellipse cx="34" cy="50" rx="10" ry="3" fill="#FFFFFF" opacity="0.6" />
              <circle cx="20" cy="48" r="1.2" fill="#FFFFFF" opacity="0.9" />
              <circle cx="60" cy="42" r="0.9" fill="#FFFFFF" opacity="0.8" />
              <circle cx="74" cy="54" r="1.4" fill="#FFFFFF" opacity="0.9" />
            </svg>
          </div>

          {/* Góc TR: star lantern 6 cánh + facet + dây treo */}
          <div className="corner-ornament wn-tr">
            <svg viewBox="0 0 56 58" width="54" height="58">
              <path d="M28 0 L28 9" stroke="#B45309" strokeWidth="0.9" />
              <circle cx="28" cy="9" r="2" fill="none" stroke="#D4AF37" strokeWidth="0.7" />
              <g transform="translate(28,30)">
                <path d="M0 -17 L4.4 -6.6 L15.4 -6.2 L7 1.8 L10.2 13.8 L0 7.4 L-10.2 13.8 L-7 1.8 L-15.4 -6.2 L-4.4 -6.6 Z" fill="url(#wnGoldGrad)" />
                <path d="M0 -17 L0 7.4 L-10.2 13.8 L-7 1.8 L-15.4 -6.2 L-4.4 -6.6 Z" fill="#D99A1F" opacity="0.55" />
                <g stroke="#FFF7D6" strokeWidth="0.35" opacity="0.55" fill="none">
                  <path d="M0 -13 L0 6" /><path d="M-4.4 -5 L4 1.4" /><path d="M-6.8 8.4 L4 -3" />
                </g>
                <circle r="3" fill="#FFF7D6" opacity="0.75" />
                <circle r="1.3" fill="#FFFFFF" />
              </g>
              <path d="M28 48 L28 52" stroke="#D99A1F" strokeWidth="0.7" />
              <ellipse cx="28" cy="53.4" rx="3" ry="1.3" fill="url(#wnGoldGrad)" />
            </svg>
          </div>

          {/* Góc BL: quả thông + 2 berry (ink x ≤ 16, không chạm tên) */}
          <div className="corner-ornament wn-bl">
            <svg viewBox="0 0 56 50" width="56" height="50">
              <path d="M34 46 C 28 38, 20 34, 12 32" stroke="#14532D" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <use href="#wnPineCone" transform="translate(20,26) rotate(-24) scale(0.72)" />
              <use href="#wnBerryCluster" transform="translate(10,20) rotate(200) scale(1.05)" />
              <ellipse cx="30" cy="38" rx="5.4" ry="1.8" fill="#FFFFFF" opacity="0.92" transform="rotate(-24 30 38)" />
              <ellipse cx="40" cy="43" rx="4" ry="1.5" fill="#F7FBFF" opacity="0.85" transform="rotate(-18 40 43)" />
            </svg>
          </div>

          {/* Góc BR: đèn lồng ấm + tuyết nóc + glow */}
          <div className="corner-ornament wn-br">
            <svg viewBox="0 0 54 62" width="54" height="62">
              <use href="#wnLantern" transform="translate(27,29) scale(0.92)" />
              <path d="M18 10 C 22 7.4, 32 7.4, 37 10" stroke="#FFFFFF" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              <circle cx="24" cy="8.2" r="1.4" fill="#FFFFFF" />
              <circle cx="32" cy="8.6" r="1.2" fill="#F7FBFF" />
            </svg>
          </div>

          {/* Tuyết rơi (HTML): 3 bông nhỏ mép hai bên */}
          {[
            { left: "6.5%", delay: "0s", dur: "17s" },
            { left: "9%", delay: "3.4s", dur: "18s" },
            { left: "11.5%", delay: "6.8s", dur: "16s" },
            { left: "8%", delay: "10.2s", dur: "19s" },
            { left: "88%", delay: "5s", dur: "18s" },
            { left: "91.5%", delay: "1.8s", dur: "16.5s" },
            { left: "94%", delay: "10s", dur: "16s" },
          ].map((s, i) => (
            <span key={`wn-snowfall-${i}`} className="wn-snowfall" style={{ left: s.left, animationDelay: s.delay, animationDuration: s.dur }}>
              <svg viewBox="0 0 8 8" width="8" height="8" aria-hidden="true">
                <circle cx="4" cy="4" r="2.6" fill="#FFFFFF" opacity="0.9" />
                <circle cx="4" cy="4" r="1.4" fill="#F0F9FF" />
              </svg>
            </span>
          ))}
        </div>
      )}

      {/* ========================================================
          2. MÙA XUÂN — 3 bộ khung viền riêng biệt
         ======================================================== */}

      {/* ─── 2A. XUÂN TỰ NHIÊN: "Vườn Xuân Rực Rỡ" — vườn hoa nhiều tầng, ong, bọ rùa, cánh rơi ─── */}
      {isSpring && !isTetFestive && (
        <div className="wrapped-frame spring-natural-frame">
          {/* Mép trên: cành chính uốn 2 sóng, 7 cụm hoa so le chen khoảng thở + ong lượn */}
          <div className="frame-border-top">
            <svg viewBox="0 0 340 38" preserveAspectRatio="none" className="garden-top-svg">
              <defs>
                <radialGradient id="gardenSakuraGrad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="9">
                  <stop offset="0%" stopColor="#FFF7FA" /><stop offset="38%" stopColor="#FDE2EE" /><stop offset="76%" stopColor="#F9A8D4" /><stop offset="100%" stopColor="#F472B6" />
                </radialGradient>
                <radialGradient id="gardenSakuraCore" cx="50%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="#FFFDF5" /><stop offset="55%" stopColor="#FDE68A" /><stop offset="100%" stopColor="#FBBF24" />
                </radialGradient>
                <radialGradient id="gardenBloomRim" cx="50%" cy="50%" r="50%">
                  <stop offset="58%" stopColor="#EC4899" stopOpacity="0" /><stop offset="100%" stopColor="#EC4899" stopOpacity="0.85" />
                </radialGradient>
                <linearGradient id="gardenBanGrad" x1="20%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" /><stop offset="58%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#FEF3C7" />
                </linearGradient>
                <linearGradient id="gardenTulipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FED7AA" /><stop offset="55%" stopColor="#FB923C" /><stop offset="100%" stopColor="#EA580C" />
                </linearGradient>
                <linearGradient id="gardenTulipDeepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FB923C" /><stop offset="100%" stopColor="#C2410C" />
                </linearGradient>
                <linearGradient id="gardenLilacGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EDE9FE" /><stop offset="45%" stopColor="#C4B5FD" /><stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
                <linearGradient id="gardenLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#BBF7D0" /><stop offset="100%" stopColor="#4ADE80" />
                </linearGradient>
                <linearGradient id="gardenLeafDeepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ADE80" /><stop offset="100%" stopColor="#16A34A" />
                </linearGradient>
                <linearGradient id="gardenStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5E3C" /><stop offset="100%" stopColor="#A3744F" />
                </linearGradient>
                <linearGradient id="gardenBranchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#B98A5C" /><stop offset="38%" stopColor="#8B5E3C" /><stop offset="78%" stopColor="#5C3A21" /><stop offset="100%" stopColor="#3A2412" />
                </linearGradient>
                <linearGradient id="gardenBranchSideGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B98A5C" /><stop offset="30%" stopColor="#A3744F" /><stop offset="62%" stopColor="#6B4423" /><stop offset="100%" stopColor="#3A2412" />
                </linearGradient>
                <linearGradient id="gardenBranchCrescentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#A3744F" /><stop offset="55%" stopColor="#6B4423" /><stop offset="100%" stopColor="#3A2412" />
                </linearGradient>
                <linearGradient id="gardenDaisyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#FEF9C3" />
                </linearGradient>
                <linearGradient id="gardenPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE2EE" /><stop offset="55%" stopColor="#F9A8D4" /><stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
                <linearGradient id="gardenBeeBody" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE047" /><stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
                <linearGradient id="gardenWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#FEF3C7" />
                </linearGradient>

                {/* Mẫu dùng lại — mỗi bông là nhiều lớp path/circle lồng nhau để có khối */}
                <g id="gardenSakuraBloom">
                  <circle r="8.6" fill="url(#gardenBloomRim)" opacity="0.4" />
                  <g fill="url(#gardenSakuraGrad)">
                    <path d="M0 0 C-4.4 -1.6, -5.2 -6.3, -2.7 -8 C-1.4 -8.9, -0.4 -8.3, 0 -7.2 C0.4 -8.3, 1.4 -8.9, 2.7 -8 C5.2 -6.3, 4.4 -1.6, 0 0 Z" />
                    <path d="M0 0 C-4.4 -1.6, -5.2 -6.3, -2.7 -8 C-1.4 -8.9, -0.4 -8.3, 0 -7.2 C0.4 -8.3, 1.4 -8.9, 2.7 -8 C5.2 -6.3, 4.4 -1.6, 0 0 Z" transform="rotate(72)" />
                    <path d="M0 0 C-4.4 -1.6, -5.2 -6.3, -2.7 -8 C-1.4 -8.9, -0.4 -8.3, 0 -7.2 C0.4 -8.3, 1.4 -8.9, 2.7 -8 C5.2 -6.3, 4.4 -1.6, 0 0 Z" transform="rotate(144)" />
                    <path d="M0 0 C-4.4 -1.6, -5.2 -6.3, -2.7 -8 C-1.4 -8.9, -0.4 -8.3, 0 -7.2 C0.4 -8.3, 1.4 -8.9, 2.7 -8 C5.2 -6.3, 4.4 -1.6, 0 0 Z" transform="rotate(216)" />
                    <path d="M0 0 C-4.4 -1.6, -5.2 -6.3, -2.7 -8 C-1.4 -8.9, -0.4 -8.3, 0 -7.2 C0.4 -8.3, 1.4 -8.9, 2.7 -8 C5.2 -6.3, 4.4 -1.6, 0 0 Z" transform="rotate(288)" />
                  </g>
                  <g stroke="#F472B6" strokeWidth="0.3" opacity="0.35" fill="none">
                    <path d="M0 -1.6 L0 -6.4" /><path d="M0 -1.6 L0 -6.4" transform="rotate(72)" /><path d="M0 -1.6 L0 -6.4" transform="rotate(144)" />
                    <path d="M0 -1.6 L0 -6.4" transform="rotate(216)" /><path d="M0 -1.6 L0 -6.4" transform="rotate(288)" />
                  </g>
                  <circle r="2.9" fill="url(#gardenSakuraCore)" />
                  <g fill="#FBBF24"><circle cx="0" cy="-1.6" r="0.5" /><circle cx="1.4" cy="0.8" r="0.5" /><circle cx="-1.4" cy="0.8" r="0.5" /></g>
                  <circle cx="0" cy="0.1" r="0.8" fill="#EC4899" />
                </g>
                <g id="gardenBanBloom">
                  <g fill="url(#gardenBanGrad)">
                    <path d="M0 0 C-4 -1.2, -4.6 -5.4, -2.4 -7.1 C-1.1 -8, 1.1 -8, 2.4 -7.1 C4.6 -5.4, 4 -1.2, 0 0 Z" />
                    <path d="M0 0 C-4 -1.2, -4.6 -5.4, -2.4 -7.1 C-1.1 -8, 1.1 -8, 2.4 -7.1 C4.6 -5.4, 4 -1.2, 0 0 Z" transform="rotate(72)" />
                    <path d="M0 0 C-4 -1.2, -4.6 -5.4, -2.4 -7.1 C-1.1 -8, 1.1 -8, 2.4 -7.1 C4.6 -5.4, 4 -1.2, 0 0 Z" transform="rotate(144)" />
                    <path d="M0 0 C-4 -1.2, -4.6 -5.4, -2.4 -7.1 C-1.1 -8, 1.1 -8, 2.4 -7.1 C4.6 -5.4, 4 -1.2, 0 0 Z" transform="rotate(216)" />
                    <path d="M0 0 C-4 -1.2, -4.6 -5.4, -2.4 -7.1 C-1.1 -8, 1.1 -8, 2.4 -7.1 C4.6 -5.4, 4 -1.2, 0 0 Z" transform="rotate(288)" />
                  </g>
                  <g stroke="#E7D8B0" strokeWidth="0.32" opacity="0.8" fill="none">
                    <path d="M0 -1.8 Q 0.3 -4.6, 0 -6.9" /><path d="M0 -1.8 Q 0.3 -4.6, 0 -6.9" transform="rotate(72)" /><path d="M0 -1.8 Q 0.3 -4.6, 0 -6.9" transform="rotate(144)" />
                    <path d="M0 -1.8 Q 0.3 -4.6, 0 -6.9" transform="rotate(216)" /><path d="M0 -1.8 Q 0.3 -4.6, 0 -6.9" transform="rotate(288)" />
                  </g>
                  <circle r="2.2" fill="#FDE68A" />
                  <g fill="#FBCFE8" opacity="0.9"><circle cx="0" cy="-1.7" r="0.6" /><circle cx="1.5" cy="0.9" r="0.6" /><circle cx="-1.5" cy="0.9" r="0.6" /></g>
                  <g fill="#F59E0B"><circle cx="0" cy="-2.5" r="0.45" /><circle cx="2.1" cy="1.2" r="0.45" /><circle cx="-2.1" cy="1.2" r="0.45" /></g>
                </g>
                <g id="gardenTulipBloom">
                  <path d="M0 3.6 C-3.6 1.6, -4.4 -3.2, -2.8 -6.2 C-1.4 -3.4, -1 0.4, 0 3.6 Z" fill="url(#gardenTulipDeepGrad)" stroke="#EA580C" strokeWidth="0.45" />
                  <path d="M0 3.6 C3.6 1.6, 4.4 -3.2, 2.8 -6.2 C1.4 -3.4, 1 0.4, 0 3.6 Z" fill="url(#gardenTulipDeepGrad)" stroke="#EA580C" strokeWidth="0.45" />
                  <path d="M0 3.8 C-2.3 0.6, -2.3 -4.6, 0 -7.4 C2.3 -4.6, 2.3 0.6, 0 3.8 Z" fill="url(#gardenTulipGrad)" />
                  <g stroke="#FFF7ED" strokeWidth="0.42" opacity="0.65" strokeLinecap="round" fill="none">
                    <path d="M0 2.8 C-0.6 0.2, -0.6 -3, 0 -6.2" />
                    <path d="M-2.9 1.9 C-3.1 -0.6, -3 -3.4, -2.1 -5.3" /><path d="M2.9 1.9 C3.1 -0.6, 3 -3.4, 2.1 -5.3" />
                  </g>
                </g>
                <g id="gardenTulipBud">
                  <path d="M0 0 C-2.6 -2.4, -2.8 -6.6, 0 -9.2 C2.8 -6.6, 2.6 -2.4, 0 0 Z" fill="url(#gardenTulipGrad)" stroke="#EA580C" strokeWidth="0.4" />
                  <path d="M0 -0.4 C-0.9 -2.6, -0.9 -6.2, 0 -8.2 C0.9 -6.2, 0.9 -2.6, 0 -0.4 Z" fill="#FED7AA" opacity="0.55" />
                </g>
                <g id="gardenLilacSpray">
                  <path d="M0 -2.5 C 3.4 2, 6.6 8, 8.2 16.5" stroke="#7C3AED" strokeWidth="0.9" strokeLinecap="round" fill="none" />
                  <g fill="url(#gardenLilacGrad)">
                    <circle cx="-1.2" cy="-3" r="2.7" /><circle cx="2.4" cy="-0.6" r="2.6" /><circle cx="4.4" cy="2.4" r="2.3" /><circle cx="5.8" cy="5.6" r="2.1" /><circle cx="6.8" cy="9" r="1.9" />
                    <circle cx="1.2" cy="3.2" r="2.2" /><circle cx="3.2" cy="5.4" r="2.1" /><circle cx="4.8" cy="8.2" r="1.9" /><circle cx="5.8" cy="11.6" r="1.7" /><circle cx="6.8" cy="13.4" r="1.5" />
                    <circle cx="0.2" cy="7.4" r="1.7" /><circle cx="2.6" cy="10" r="1.6" /><circle cx="4.4" cy="12.4" r="1.5" /><circle cx="5.6" cy="15.4" r="1.3" />
                  </g>
                  <g fill="#DDD6FE" opacity="0.9">
                    <circle cx="0.4" cy="-1.2" r="1.1" /><circle cx="3.6" cy="1.6" r="1.1" /><circle cx="1.8" cy="6.2" r="1" /><circle cx="4" cy="10.6" r="0.9" />
                  </g>
                  <g fill="#EDE9FE" opacity="0.75"><circle cx="1.6" cy="0.2" r="0.45" /><circle cx="4.6" cy="4" r="0.45" /><circle cx="3" cy="9" r="0.4" /></g>
                </g>
                <g id="gardenDaisyBloom">
                  <g fill="url(#gardenDaisyGrad)" stroke="#F5E6A8" strokeWidth="0.25" strokeOpacity="0.65">
                    <ellipse cx="0" cy="-5" rx="2" ry="4.4" /><ellipse cx="0" cy="-5" rx="2" ry="4.4" transform="rotate(45)" />
                    <ellipse cx="0" cy="-5" rx="2" ry="4.4" transform="rotate(90)" /><ellipse cx="0" cy="-5" rx="2" ry="4.4" transform="rotate(135)" />
                    <ellipse cx="0" cy="-5" rx="2" ry="4.4" transform="rotate(180)" /><ellipse cx="0" cy="-5" rx="2" ry="4.4" transform="rotate(225)" />
                    <ellipse cx="0" cy="-5" rx="2" ry="4.4" transform="rotate(270)" /><ellipse cx="0" cy="-5" rx="2" ry="4.4" transform="rotate(315)" />
                  </g>
                  <circle r="2.4" fill="#FDE047" /><circle r="1.1" fill="#F59E0B" />
                </g>
                <g id="gardenLeafLight">
                  <ellipse rx="5.4" ry="2.3" fill="url(#gardenLeafGrad)" />
                  <path d="M-4.2 0 Q 0 -0.6, 4.2 0" stroke="#15803D" strokeWidth="0.45" opacity="0.3" fill="none" />
                  <ellipse cx="-1.2" cy="-0.9" rx="2.1" ry="0.6" fill="#FFFFFF" opacity="0.5" />
                </g>
                <g id="gardenLeafDeep">
                  <ellipse rx="5.4" ry="2.3" fill="url(#gardenLeafDeepGrad)" />
                  <path d="M-4.2 0 Q 0 -0.6, 4.2 0" stroke="#15803D" strokeWidth="0.45" opacity="0.35" fill="none" />
                  <ellipse cx="-1.2" cy="-0.9" rx="2" ry="0.55" fill="#FFFFFF" opacity="0.35" />
                </g>
                <g id="gardenLeafSmall">
                  <ellipse rx="3.4" ry="1.5" fill="url(#gardenLeafGrad)" />
                  <path d="M-2.6 0 Q 0 -0.4, 2.6 0" stroke="#15803D" strokeWidth="0.32" opacity="0.3" fill="none" />
                </g>
                <g id="gardenSparkle">
                  <circle r="3.4" fill="#FBBF24" opacity="0.18" />
                  <path d="M0 -4 C0.6 -1.2, 1.2 -0.6, 4 0 C1.2 0.6, 0.6 1.2, 0 4 C-0.6 1.2, -1.2 0.6, -4 0 C-1.2 -0.6, -0.6 -1.2, 0 -4 Z" fill="#FFF7ED" /><circle r="1.2" fill="#FFFFFF" />
                </g>
              </defs>

              {/* Cành chính: silhouette thuôn 6.5 → 4.5 → 3.2px; nhánh phụ @232 xoắn 2 vòng */}
              <path d="M-6 12.7 C24 6.6 52 14.8 82 12.9 C112 10.6 136 4.7 166 7.2 C196 9.7 214 16.7 244 12.9 C274 8.8 300 4.3 322 7.6 C332 8.5 341 8.5 346 7.9 L346 11.1 C341 12.5 332 12.6 322 11.4 C300 8.7 274 13.2 244 17.4 C214 21.3 196 14.3 166 11.8 C136 9.3 112 15.4 82 18.1 C52 20.2 24 13.4 -6 19.3 Z" fill="url(#gardenBranchGrad)" />
              <path d="M232.3 14.9 C233.7 14.5 238.1 13.2 240.7 12.3 C243.3 11.5 245.6 10.8 247.7 10 C249.8 9.3 251.6 8.6 253.2 8 C254.8 7.3 256.1 6.7 257.2 6.1 C258.3 5.6 259.2 5.2 259.8 4.5 C260.4 3.9 260.9 3.1 260.9 2.4 C261 1.7 260.7 0.7 260.3 0.1 C259.8 -0.4 259 -0.9 258.3 -0.9 C257.6 -1 256.7 -0.7 256.2 -0.3 C255.7 0.1 255.3 0.9 255.2 1.5 C255.1 2.2 255.4 3 255.8 3.5 C256.2 4 256.9 4.3 257.5 4.4 C258.1 4.5 258.8 4.2 259.3 3.8 C259.7 3.5 260 2.8 260.1 2.3 C260.1 1.7 259.9 1 259.6 0.7 C259.3 0.3 258.6 0 258.1 -0.1 C257.7 -0.1 257 0.1 256.7 0.4 C256.3 0.7 256.1 1.2 256 1.7 C256 2.1 256.2 2.7 256.5 3 C256.7 3.3 257.2 3.5 257.6 3.6 C258 3.6 258.5 3.3 258.7 3.2 L258.5 2.7C258.4 2.7 257.9 3 257.7 3 C257.4 3 257.1 2.8 256.9 2.6 C256.7 2.4 256.6 2 256.6 1.7 C256.6 1.4 256.8 1.1 257.1 0.9 C257.3 0.7 257.7 0.5 258.1 0.5 C258.4 0.6 258.9 0.8 259.1 1.1 C259.3 1.3 259.5 1.8 259.4 2.2 C259.4 2.6 259.1 3.1 258.8 3.3 C258.5 3.6 258 3.7 257.6 3.7 C257.1 3.6 256.6 3.4 256.3 3 C256.1 2.7 255.9 2.1 255.9 1.6 C256 1.2 256.3 0.6 256.7 0.3 C257 0 257.7 -0.2 258.2 -0.1 C258.7 -0.1 259.3 0.2 259.6 0.7 C259.9 1.1 260.2 1.8 260.1 2.3 C260 2.8 259.8 3.4 259.2 3.9 C258.6 4.3 257.8 4.7 256.7 5.2 C255.6 5.6 254.3 6.2 252.7 6.7 C251.1 7.3 249.3 7.9 247.2 8.6 C245.1 9.3 242.8 10 240.2 10.7 C237.6 11.5 233.1 12.7 231.7 13.1 Z" fill="url(#gardenBranchGrad)" />
              <path d="M66.6 16.3 C66.7 16.1 66.9 15.6 67.1 15.3 C67.3 14.9 67.5 14.6 67.7 14.3 C67.9 14 68.2 13.7 68.5 13.4 C68.8 13.1 69.2 12.7 69.4 12.5 C69.7 12.4 69.8 12.3 70 12.3 C70.2 12.2 70.5 12.2 70.7 12.3 C70.9 12.3 71.1 12.4 71.2 12.5 C71.4 12.7 71.5 12.8 71.7 13 C71.8 13.1 71.8 13.3 71.9 13.5 C71.9 13.7 71.9 13.9 71.8 14.1 C71.8 14.3 71.7 14.5 71.6 14.6 C71.5 14.7 71.4 14.9 71.2 15 C71.1 15 70.9 15.1 70.8 15.1 C70.6 15.2 70.4 15.1 70.3 15.1 C70.1 15.1 70 15 69.8 14.9 C69.7 14.8 69.6 14.6 69.5 14.5 L69.1 14.9C69.2 14.9 69.4 15.2 69.5 15.3 C69.7 15.4 69.9 15.6 70.1 15.6 C70.4 15.7 70.6 15.7 70.8 15.7 C71.1 15.6 71.3 15.6 71.5 15.4 C71.7 15.3 71.9 15.1 72.1 14.9 C72.3 14.7 72.4 14.5 72.4 14.2 C72.5 14 72.5 13.7 72.5 13.4 C72.5 13.2 72.4 12.9 72.2 12.6 C72.1 12.4 71.9 12.2 71.6 12 C71.4 11.8 71.1 11.7 70.8 11.6 C70.5 11.5 70.2 11.5 69.9 11.5 C69.6 11.6 69.3 11.7 69 11.9 C68.6 12.1 68.2 12.4 67.9 12.7 C67.5 13 67.2 13.3 66.9 13.6 C66.6 13.9 66.3 14.3 66.1 14.6 C65.8 15 65.5 15.5 65.4 15.7 Z" fill="url(#gardenBranchGrad)" />
              <path d="M122.4 10.6 C122.5 10.5 122.8 10.2 123.1 10 C123.3 9.9 123.6 9.7 123.8 9.5 C124.1 9.4 124.4 9.2 124.7 9 C125 8.9 125.5 8.7 125.7 8.6 C126 8.5 126 8.5 126.2 8.5 C126.4 8.5 126.5 8.6 126.7 8.7 C126.8 8.7 127 8.8 127.1 8.9 C127.2 9 127.3 9.2 127.3 9.3 C127.4 9.5 127.4 9.6 127.4 9.8 C127.4 9.9 127.4 10 127.3 10.2 C127.3 10.3 127.2 10.4 127.1 10.5 C127 10.6 126.9 10.7 126.8 10.8 C126.7 10.8 126.6 10.9 126.4 10.9 C126.3 10.9 126.2 10.9 126.1 10.8 C126 10.8 125.9 10.8 125.8 10.7 C125.7 10.6 125.6 10.5 125.5 10.4 L125.1 10.8C125.1 10.9 125.3 11.1 125.4 11.2 C125.5 11.3 125.7 11.4 125.9 11.4 C126.1 11.5 126.3 11.5 126.5 11.5 C126.7 11.5 126.9 11.4 127.1 11.4 C127.3 11.3 127.5 11.1 127.6 11 C127.7 10.8 127.9 10.6 128 10.4 C128 10.2 128.1 10 128.1 9.8 C128.1 9.5 128.1 9.3 128 9.1 C127.9 8.8 127.8 8.6 127.6 8.4 C127.4 8.3 127.2 8.1 127 8 C126.8 7.9 126.5 7.8 126.3 7.8 C126 7.7 125.8 7.7 125.5 7.8 C125.2 7.9 124.7 8.1 124.4 8.2 C124 8.3 123.7 8.4 123.4 8.6 C123 8.7 122.7 8.8 122.4 9 C122.1 9.1 121.8 9.3 121.6 9.4 Z" fill="url(#gardenBranchGrad)" />
              <path d="M137.3 11.8 C137.7 11.6 138.9 10.9 139.7 10.5 C140.5 10.1 141.4 9.8 142.2 9.5 C143 9.2 143.8 9 144.6 8.8 C145.4 8.6 146.5 8.4 147 8.4 C147.5 8.4 147.5 8.4 147.7 8.5 C147.9 8.6 148.1 8.7 148.3 8.9 C148.4 9 148.6 9.2 148.6 9.4 C148.7 9.6 148.8 9.8 148.8 10 C148.8 10.2 148.7 10.5 148.7 10.6 C148.6 10.8 148.5 11 148.3 11.1 C148.2 11.3 148 11.4 147.9 11.5 C147.7 11.5 147.5 11.6 147.3 11.6 C147.1 11.6 147 11.5 146.8 11.5 C146.6 11.4 146.5 11.3 146.4 11.2 C146.3 11.1 146.2 10.9 146.1 10.8 C146 10.6 146 10.3 146 10.3 L145.5 10.4C145.5 10.5 145.5 10.8 145.6 11 C145.7 11.2 145.8 11.4 146 11.6 C146.1 11.8 146.3 11.9 146.6 12 C146.8 12.1 147.1 12.2 147.3 12.2 C147.6 12.2 147.8 12.1 148.1 12 C148.3 11.9 148.6 11.8 148.8 11.6 C149 11.4 149.2 11.2 149.3 10.9 C149.4 10.6 149.5 10.3 149.5 10 C149.5 9.7 149.4 9.4 149.3 9.1 C149.2 8.9 149 8.6 148.8 8.4 C148.6 8.1 148.3 7.9 148 7.8 C147.7 7.7 147.6 7.6 147 7.6 C146.4 7.6 145.3 7.7 144.4 7.9 C143.6 8 142.7 8.2 141.8 8.5 C141 8.8 140.1 9.1 139.3 9.4 C138.4 9.8 137.1 10.4 136.7 10.6 Z" fill="url(#gardenBranchGrad)" />

              {/* Vi cành + nụ đỏ mận; cành xuôi @315 có lá */}
              <path d="M46.4 15 C46.1 14.9 45.2 14.4 44.6 14 C44 13.6 43.4 13.2 42.8 12.8 C42.2 12.4 41.5 12 40.8 11.6 C40.1 11.2 39.5 10.7 38.7 10.3 C38 9.8 36.9 9.1 36.5 8.8 L36.3 9.2C36.6 9.4 37.7 10.2 38.4 10.7 C39.1 11.2 39.8 11.7 40.4 12.2 C41.1 12.7 41.7 13.1 42.3 13.6 C42.9 14 43.5 14.5 44 14.9 C44.6 15.3 45.3 15.9 45.6 16.2 Z" fill="url(#gardenBranchGrad)" />
              <path d="M259.3 13.8 C259.7 13.5 260.9 12.9 261.7 12.4 C262.5 11.9 263.3 11.4 264.1 10.9 C264.9 10.4 265.7 9.9 266.6 9.3 C267.4 8.8 268.2 8.2 269.1 7.6 C269.9 7 271.2 6.1 271.6 5.8 L271.4 5.4C271 5.7 269.6 6.6 268.8 7.2 C267.9 7.7 267.1 8.2 266.2 8.7 C265.4 9.2 264.5 9.7 263.7 10.2 C262.8 10.6 262 11.1 261.2 11.5 C260.4 11.9 259.1 12.5 258.7 12.6 Z" fill="url(#gardenBranchGrad)" />
              <path d="M314.5 9.6 C314.8 9.9 315.6 10.7 316.1 11.2 C316.6 11.7 317.1 12.2 317.6 12.8 C318.1 13.4 318.5 13.9 319 14.5 C319.5 15.1 319.9 15.7 320.3 16.3 C320.8 16.9 321.4 17.8 321.6 18.1 L322 17.9C321.8 17.6 321.2 16.6 320.8 16 C320.4 15.3 320 14.7 319.6 14.1 C319.1 13.5 318.7 12.9 318.2 12.3 C317.8 11.7 317.3 11.1 316.9 10.5 C316.4 9.9 315.7 9 315.5 8.8 Z" fill="url(#gardenBranchGrad)" />
              <ellipse cx="168" cy="10.2" rx="1.5" ry="1" fill="#3A2412" stroke="#6B4423" strokeWidth="0.35" />
              <circle cx="150" cy="9.9" r="0.45" fill="#4A2E18" opacity="0.6" />
              <circle cx="212" cy="17.2" r="0.5" fill="#4A2E18" opacity="0.6" />
              <use href="#gardenLeafSmall" transform="translate(321.7,17.9) rotate(72)" />
              <g fill="#BE185D"><circle cx="36" cy="8.4" r="1.25" /><circle cx="271.6" cy="4.9" r="1.15" /><circle cx="322.4" cy="13.9" r="1.1" /></g>
              <g fill="#A3744F"><circle cx="36" cy="8.4" r="0.4" /><circle cx="271.6" cy="4.9" r="0.38" /><circle cx="322.4" cy="13.9" r="0.36" /></g>

              {/* Lá non 2 cỡ so le chen giữa các cụm */}
              <use href="#gardenLeafLight" transform="translate(47,19.5) rotate(-24)" />
              <use href="#gardenLeafDeep" transform="translate(99,20.5) rotate(30)" />
              <use href="#gardenLeafLight" transform="translate(138,19) rotate(-30)" />
              <use href="#gardenLeafDeep" transform="translate(192,4.5) rotate(18)" />
              <use href="#gardenLeafLight" transform="translate(233,21.5) rotate(42)" />
              <use href="#gardenLeafDeep" transform="translate(268,6.5) rotate(-20)" />
              <use href="#gardenLeafDeep" transform="translate(330,16) rotate(30)" />
              <use href="#gardenLeafLight" transform="translate(64,18.5) rotate(-54)" />
              <use href="#gardenLeafSmall" transform="translate(58,10) rotate(24)" />
              <use href="#gardenLeafSmall" transform="translate(186,17.5) rotate(-18)" />
              <use href="#gardenLeafSmall" transform="translate(279,19) rotate(36)" />

              {/* Tulip đôi san-hô @72 + 88: bông nở + nụ nhô lên khỏi cành */}
              <path d="M72 15.6 C 71.4 13.4, 71.6 12, 72 10.4" stroke="#15803D" strokeWidth="1.3" strokeLinecap="round" fill="none" />
              <use href="#gardenTulipBloom" transform="translate(72,10.4) rotate(-7) scale(0.92)" />
              <path d="M89 16.4 C 88.6 14.6, 88.7 13.4, 88.8 12.2" stroke="#15803D" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <use href="#gardenTulipBud" transform="translate(88.8,12.2) rotate(8) scale(0.82)" />

              {/* Ban trắng @126 & @258 (gân cánh + đốm throat) */}
              {[
                { x: 126, y: 8.2, s: 0.82, r: -8 }, { x: 133.5, y: 15.5, s: 0.5, r: 16 },
                { x: 258, y: 9.6, s: 0.76, r: 10 }, { x: 249.5, y: 16.5, s: 0.46, r: -14 },
              ].map((b, i) => (
                <use key={`garden-ban-top-${i}`} href="#gardenBanBloom" transform={`translate(${b.x},${b.y}) rotate(${b.r}) scale(${b.s})`} filter="drop-shadow(0 0.8px 1.2px rgba(180,120,60,0.4))" />
              ))}

              {/* Anh đào @26 (đôi) · @172 (đôi) · @300 chạm góc TR */}
              {[
                { x: 26, y: 9.4, s: 0.8, r: -8 }, { x: 37.5, y: 17, s: 0.46, r: 22 },
                { x: 172, y: 6.6, s: 0.7, r: 10 }, { x: 181.5, y: 15.5, s: 0.44, r: -16 },
                { x: 293.5, y: 16.5, s: 0.44, r: 14 }, { x: 300, y: 8, s: 0.8, r: -10 },
              ].map((f, i) => (
                <use key={`garden-sakura-top-${i}`} href="#gardenSakuraBloom" transform={`translate(${f.x},${f.y}) rotate(${f.r}) scale(${f.s})`} filter="drop-shadow(0 0.8px 1.5px rgba(157,23,77,0.2))" />
              ))}

              {/* Tử đằng 2 chuỗi: @211 (chính) + @150 (rủ từ nhánh phụ, nhỏ hơn) */}
              <use href="#gardenLilacSpray" transform="translate(211,13) rotate(18) scale(0.78)" />
              <use href="#gardenLilacSpray" transform="translate(150,11) rotate(-12) scale(0.6)" />

              {/* 3 sparkle twinkle so le */}
              <use href="#gardenSparkle" className="garden-sparkle" transform="translate(57,5)" />
              <use href="#gardenSparkle" className="garden-sparkle" style={{ animationDelay: "0.5s" }} transform="translate(221,6.5) scale(0.9)" />
              <use href="#gardenSparkle" className="garden-sparkle" style={{ animationDelay: "1.3s" }} transform="translate(283,7) scale(0.8)" />

              {/* Ong nhỏ lượn quanh chùm tulip: vệt bay chấm chấm + thân sọc + cánh có vân */}
              <g transform="translate(105,8)">
                <path d="M-17 8 C -13 5, -9 3.4, -5 2.6" stroke="#8B5E3C" strokeWidth="0.8" strokeDasharray="1.5 3" opacity="0.35" fill="none" strokeLinecap="round" />
                <g className="garden-bee">
                  <ellipse cx="0" cy="0" rx="3.6" ry="2.5" fill="url(#gardenBeeBody)" />
                  <path d="M-1.1 -2.45 C -1.5 -0.4, -1.5 0.4, -1.1 2.45" stroke="#3F1D0B" strokeWidth="0.85" />
                  <path d="M1.5 -2.2 C 1.2 -0.4, 1.2 0.4, 1.5 2.2" stroke="#3F1D0B" strokeWidth="0.75" />
                  <ellipse cx="-1.6" cy="-3.1" rx="3.3" ry="1.9" fill="url(#gardenWingGrad)" opacity="0.85" transform="rotate(-24)" />
                  <ellipse cx="1.6" cy="-3.2" rx="2.7" ry="1.6" fill="url(#gardenWingGrad)" opacity="0.75" transform="rotate(16)" />
                  <path d="M-3.4 -3.6 Q -1.6 -4.4, 0.2 -3.4" stroke="#F9A8D4" strokeWidth="0.3" opacity="0.7" fill="none" />
                  <circle cx="3.4" cy="-0.4" r="1.6" fill="#3F1D0B" />
                  <path d="M3.9 -1.7 C 4.7 -3, 5.6 -3.5, 6.3 -3.3" stroke="#3F1D0B" strokeWidth="0.42" fill="none" strokeLinecap="round" />
                  <path d="M4.4 -1.2 C 5.3 -1.9, 6.2 -1.9, 6.8 -1.5" stroke="#3F1D0B" strokeWidth="0.4" fill="none" strokeLinecap="round" />
                  <circle cx="6.4" cy="-3.3" r="0.32" fill="#3F1D0B" /><circle cx="6.9" cy="-1.4" r="0.3" fill="#3F1D0B" />
                </g>
              </g>
            </svg>
          </div>

          {/* Cạnh trái: thân S-curve 2.2px + 7 cụm so le (sakura/ban/lá/sakura/tử đằng/ban/sakura) */}
          <div className="frame-border-side border-left">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="garden-side-svg">
              <path d="M16 -4 Q 8 118, 18 232 Q 8 348, 16 464" stroke="#8B5E3C" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <use href="#gardenSakuraBloom" transform="translate(13.5,28) rotate(-12) scale(0.6)" />
              <use href="#gardenLeafSmall" transform="translate(21,52) rotate(50)" />
              <use href="#gardenLeafLight" transform="translate(20,68) rotate(52) scale(0.9)" />
              <use href="#gardenBanBloom" transform="translate(13,96) rotate(10) scale(0.58)" filter="drop-shadow(0 0.8px 1.2px rgba(180,120,60,0.4))" />
              <use href="#gardenLeafSmall" transform="translate(9,122) rotate(-46)" />
              <use href="#gardenLeafDeep" transform="translate(20,158) rotate(64) scale(0.95)" />
              <use href="#gardenLeafLight" transform="translate(11,166) rotate(-70) scale(0.85)" />
              <use href="#gardenSakuraBloom" transform="translate(14,215) rotate(14) scale(0.52)" />
              <use href="#gardenLilacSpray" transform="translate(15,236) rotate(-6) scale(0.62)" />
              <circle cx="9.5" cy="252" r="1.1" fill="#BE185D" />
              <use href="#gardenLeafDeep" transform="translate(11,288) rotate(-58) scale(0.9)" />
              <use href="#gardenBanBloom" transform="translate(17,330) rotate(-14) scale(0.54)" filter="drop-shadow(0 0.8px 1.2px rgba(180,120,60,0.4))" />
              <use href="#gardenLeafDeep" transform="translate(21,368) rotate(58) scale(0.9)" />
              <use href="#gardenLeafSmall" transform="translate(9,384) rotate(-50)" />
              <use href="#gardenSakuraBloom" transform="translate(13,402) rotate(-6) scale(0.58)" />
              <use href="#gardenLeafLight" transform="translate(10,442) rotate(-60) scale(0.9)" />
              <use href="#gardenSparkle" className="garden-sparkle" style={{ animationDelay: "0.9s" }} transform="translate(23,130) scale(0.85)" />
            </svg>
          </div>

          {/* Cạnh phải: phase lệch + nụ tulip đứng @y≈300 (khác bên trái) */}
          <div className="frame-border-side border-right">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="garden-side-svg">
              <path d="M16 -4 Q 24 118, 14 232 Q 22 348, 16 464" stroke="#8B5E3C" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <use href="#gardenSakuraBloom" transform="translate(19,48) rotate(10) scale(0.55)" />
              <use href="#gardenLeafSmall" transform="translate(11,74) rotate(-44)" />
              <use href="#gardenBanBloom" transform="translate(19,110) rotate(-8) scale(0.58)" filter="drop-shadow(0 0.8px 1.2px rgba(180,120,60,0.4))" />
              <use href="#gardenLeafDeep" transform="translate(12,142) rotate(-56) scale(0.9)" />
              <use href="#gardenSakuraBloom" transform="translate(17,175) rotate(-12) scale(0.6)" />
              <use href="#gardenBanBloom" transform="translate(16,240) rotate(12) scale(0.55)" filter="drop-shadow(0 0.8px 1.2px rgba(180,120,60,0.4))" />
              <use href="#gardenLeafLight" transform="translate(23,268) rotate(48) scale(0.9)" />
              <path d="M17.5 316 C 17 311, 17.2 306, 17.8 301" stroke="#15803D" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <use href="#gardenTulipBud" transform="translate(17.8,301) rotate(4) scale(0.72)" />
              <use href="#gardenLeafDeep" transform="translate(13,338) rotate(-62) scale(0.95)" />
              <use href="#gardenSakuraBloom" transform="translate(19,368) rotate(8) scale(0.58)" />
              <use href="#gardenLeafLight" transform="translate(22,398) rotate(56) scale(0.85)" />
              <use href="#gardenBanBloom" transform="translate(17,425) rotate(-10) scale(0.55)" filter="drop-shadow(0 0.8px 1.2px rgba(180,120,60,0.4))" />
              <circle cx="23" cy="345" r="1.1" fill="#BE185D" />
              <use href="#gardenSparkle" className="garden-sparkle" style={{ animationDelay: "1.7s" }} transform="translate(9,190) scale(0.85)" />
            </svg>
          </div>

          {/* Mép đáy: gò cỏ 2 tầng + cúc trắng + bọ rùa + 3 cụm hoa + cánh hoa rơi */}
          <div className="frame-border-bottom">
            <svg viewBox="0 0 340 44" preserveAspectRatio="none" className="garden-bottom-svg">
              <path d="M-6 44 L346 44 L346 34 Q 300 26, 252 32 Q 206 38, 158 31 Q 110 24, 64 33 Q 26 40, -6 33 Z" fill="#BBF7D0" opacity="0.45" />
              <path d="M-6 38 Q 48 27, 100 34 Q 152 41, 206 32 Q 262 23, 316 32 Q 332 35, 346 30" stroke="#15803D" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M-6 43 Q 62 33, 124 40 Q 186 46, 248 37 Q 300 30, 346 40" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.85" />

              {/* Nhánh cỏ vươn cao thấp so le (5 nhánh mới cao vòm hơn) */}
              {[
                { x: 12, h: 11, l: -4 }, { x: 24, h: 6, l: 3 }, { x: 38, h: 14, l: 5 }, { x: 52, h: 7, l: -2 },
                { x: 84, h: 18, l: -6 }, { x: 96, h: 12, l: -5 }, { x: 108, h: 6, l: 3 },
                { x: 148, h: 13, l: -3 }, { x: 150, h: 16, l: 4 }, { x: 162, h: 7, l: 3 },
                { x: 176, h: 17, l: 5 }, { x: 196, h: 10, l: -4 }, { x: 210, h: 6, l: 2 },
                { x: 214, h: 19, l: -5 }, { x: 230, h: 13, l: 4 }, { x: 248, h: 7, l: -3 },
                { x: 284, h: 16, l: 4 }, { x: 296, h: 11, l: -4 }, { x: 312, h: 8, l: 3 }, { x: 328, h: 13, l: 5 },
              ].map((g, i) => (
                <path key={`garden-grass-${i}`} d={`M${g.x} 42 Q ${g.x + g.l * 0.45} ${42 - g.h * 0.6}, ${g.x + g.l * 1.4} ${42 - g.h}`} stroke={["#15803D", "#16A34A", "#4ADE80"][i % 3]} strokeWidth="1.3" strokeLinecap="round" fill="none" />
              ))}

              {/* Cánh hoa rơi lệch hướng */}
              {[
                { x: 114, y: 12, r: -26, f: "#F9A8D4" }, { x: 140, y: 23, r: 20, f: "#FDF2F8" }, { x: 198, y: 9, r: 34, f: "#FBCFE8" },
                { x: 222, y: 25, r: -14, f: "#F9A8D4" }, { x: 304, y: 14, r: 18, f: "#FDE2EE" },
              ].map((p, i) => (
                <ellipse key={`garden-petal-${i}`} cx={p.x} cy={p.y} rx="2.8" ry="1.25" fill={p.f} opacity="0.9" transform={`rotate(${p.r}, ${p.x}, ${p.y})`} />
              ))}

              {/* Cúc trắng nhỏ @120 & @228 */}
              <use href="#gardenDaisyBloom" transform="translate(120,29) rotate(-8) scale(0.8)" filter="drop-shadow(0 0.8px 1.2px rgba(180,120,60,0.3))" />
              <use href="#gardenDaisyBloom" transform="translate(228,28) rotate(12) scale(0.8)" filter="drop-shadow(0 0.8px 1.2px rgba(180,120,60,0.3))" />

              {/* Bọ rùa đậu trên gò cỏ @240 */}
              <g transform="translate(240,33) rotate(-8)">
                <ellipse rx="4.3" ry="3.7" fill="#DC2626" />
                <path d="M0 -3.7 L0 3.7" stroke="#7F1D1D" strokeWidth="0.7" />
                <circle cx="-2.3" cy="-1.2" r="0.95" fill="#111827" /><circle cx="2.2" cy="-1.4" r="0.9" fill="#111827" /><circle cx="-1.9" cy="1.9" r="0.85" fill="#111827" />
                <circle cx="0" cy="-4.9" r="1.9" fill="#111827" /><circle cx="-0.8" cy="-5.2" r="0.35" fill="#FFFFFF" /><circle cx="0.8" cy="-5.2" r="0.35" fill="#FFFFFF" />
                <path d="M-2.4 -4.1 C -3.6 -5.5, -4.4 -5.7, -5 -5.4" stroke="#111827" strokeWidth="0.4" fill="none" strokeLinecap="round" />
                <path d="M2.4 -4.1 C 3.6 -5.5, 4.4 -5.7, 5 -5.4" stroke="#111827" strokeWidth="0.4" fill="none" strokeLinecap="round" />
              </g>

              <use href="#gardenLeafLight" transform="translate(46,37) rotate(30)" />
              <use href="#gardenLeafSmall" transform="translate(100,35) rotate(-28)" />
              <use href="#gardenSakuraBloom" transform="translate(66,30.5) rotate(-8) scale(0.8)" filter="drop-shadow(0 0.8px 1.5px rgba(157,23,77,0.2))" />
              <use href="#gardenLeafDeep" transform="translate(88,37) rotate(-40)" />
              <use href="#gardenBanBloom" transform="translate(172,32) rotate(12) scale(0.74)" filter="drop-shadow(0 0.8px 1.2px rgba(180,120,60,0.4))" />
              <use href="#gardenLeafLight" transform="translate(196,37) rotate(-34)" />
              <use href="#gardenLeafSmall" transform="translate(208,34) rotate(24)" />
              <use href="#gardenLeafDeep" transform="translate(234,37) rotate(46)" />
              <use href="#gardenSakuraBloom" transform="translate(258,30) rotate(10) scale(0.82)" filter="drop-shadow(0 0.8px 1.5px rgba(157,23,77,0.2))" />
            </svg>
          </div>

          {/* Góc TL: tulip san-hô + anh đào + ban nhỏ + 3 lá, 1 lá chìa dài xuống (garden-sway) */}
          <div className="corner-ornament garden-tl">
            <svg viewBox="0 0 88 88" width="60" height="60">
              <path d="M0 6 C 14 18, 26 26, 38 38 C 44 44, 48 50, 50 58" stroke="url(#gardenStemGrad)" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              <use href="#gardenLeafDeep" transform="translate(20,22) rotate(58) scale(1.35)" />
              <use href="#gardenLeafLight" transform="translate(46,46) rotate(-24) scale(1.15)" />
              <path d="M32 32 C 32 27, 32.5 23, 34 19" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <use href="#gardenTulipBloom" transform="translate(34,19) rotate(-14) scale(1.55)" />
              <use href="#gardenSakuraBloom" transform="translate(54,54) rotate(-8) scale(1.7)" filter="drop-shadow(0 1px 1.6px rgba(157,23,77,0.2))" />
              <use href="#gardenBanBloom" transform="translate(19,44) rotate(-6) scale(0.8)" filter="drop-shadow(0 1px 1.4px rgba(180,120,60,0.4))" />
              <use href="#gardenLeafLight" transform="translate(44,72) rotate(78) scale(1.45)" />
            </svg>
          </div>

          {/* Góc TR: bướm 2 tầng cánh + đốm trắng trên/dưới (butterfly-drift, right -32px) */}
          <div className="corner-ornament garden-tr">
            <svg viewBox="0 0 60 60" width="50" height="50">
              <defs>
                <linearGradient id="gardenButterflyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE2EE" /><stop offset="55%" stopColor="#F9A8D4" /><stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
                <linearGradient id="gardenButterflyDeepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F9A8D4" /><stop offset="100%" stopColor="#BE185D" />
                </linearGradient>
              </defs>
              <g transform="translate(24,44) rotate(-16)">
                <path d="M0 0 C -2 -10, -8 -19, -16 -17 C -23 -15, -21 -5, -11 -1 C -7 0.6, -3 1, 0 0 Z" fill="url(#gardenButterflyGrad)" />
                <path d="M0 0 C 2 -11, 9 -20, 18 -18 C 25 -16, 22 -5, 12 -1 C 8 0.6, 3 1, 0 0 Z" fill="url(#gardenButterflyDeepGrad)" />
                <path d="M0 1 C -4 3, -10 8, -8 13 C -6 17, -1 13, 0 6 Z" fill="#F9A8D4" />
                <path d="M0 1 C 4 3, 10 8, 8 13 C 6 17, 1 13, 0 6 Z" fill="#F472B6" />
                <circle cx="-15" cy="-12" r="2.4" fill="#FFFFFF" opacity="0.85" /><circle cx="16" cy="-12" r="2.2" fill="#FFFFFF" opacity="0.7" />
                <circle cx="-9" cy="-4" r="1.3" fill="#FFFFFF" opacity="0.6" /><circle cx="10" cy="-4" r="1.2" fill="#FFFFFF" opacity="0.55" />
                <circle cx="-6" cy="9" r="1.2" fill="#FFFFFF" opacity="0.6" /><circle cx="6" cy="9" r="1.1" fill="#FFFFFF" opacity="0.55" /><circle cx="-3.4" cy="12" r="0.9" fill="#FFFFFF" opacity="0.5" />
                <ellipse cx="0" cy="3" rx="2.2" ry="8" fill="#831843" /><circle cx="0" cy="10" r="1.9" fill="#831843" /><circle cx="0" cy="-5.5" r="2.8" fill="#831843" />
                <circle cx="0" cy="-1" r="0.7" fill="#F9A8D4" opacity="0.8" /><circle cx="0" cy="3" r="0.7" fill="#F9A8D4" opacity="0.8" /><circle cx="0" cy="7" r="0.7" fill="#F9A8D4" opacity="0.8" />
                <path d="M-1 -8 C -4 -13, -8 -15, -11 -14" stroke="#831843" strokeWidth="0.9" strokeLinecap="round" fill="none" />
                <path d="M1 -8 C 4 -13, 8 -15, 11 -14" stroke="#831843" strokeWidth="0.9" strokeLinecap="round" fill="none" />
                <circle cx="-11" cy="-14" r="1.1" fill="#831843" /><circle cx="11" cy="-14" r="1.1" fill="#831843" />
              </g>
            </svg>
          </div>

          {/* Góc BL: cành ban trắng 4 bông + 2 cánh rơi + giọt sương (xoay +10°) */}
          <div className="corner-ornament garden-bl">
            <svg viewBox="0 0 88 88" width="60" height="60">
              <path d="M8 86 C 18 68, 30 54, 40 40" stroke="url(#gardenStemGrad)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              <path d="M34 52 C 44 50, 52 44, 58 34" stroke="url(#gardenStemGrad)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M30 64 C 40 62, 48 60, 56 56" stroke="url(#gardenStemGrad)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <use href="#gardenLeafDeep" transform="translate(20,48) rotate(-46) scale(1.1)" />
              <use href="#gardenLeafLight" transform="translate(48,50) rotate(40) scale(1.2)" />
              <use href="#gardenBanBloom" transform="translate(40,36) rotate(-10) scale(1.6)" filter="drop-shadow(0 1px 1.5px rgba(180,120,60,0.45))" />
              <use href="#gardenBanBloom" transform="translate(58,30) rotate(14) scale(1.3)" filter="drop-shadow(0 1px 1.5px rgba(180,120,60,0.45))" />
              <use href="#gardenBanBloom" transform="translate(22,62) rotate(-18) scale(1.4)" filter="drop-shadow(0 1px 1.5px rgba(180,120,60,0.45))" />
              <use href="#gardenBanBloom" transform="translate(62,54) rotate(8) scale(1.05)" filter="drop-shadow(0 1px 1.5px rgba(180,120,60,0.45))" />
              <circle cx="49" cy="48.5" r="2.2" fill="#FFFFFF" opacity="0.85" /><circle cx="48.2" cy="47.6" r="0.7" fill="#FFFFFF" /><circle cx="49.6" cy="49.2" r="0.5" fill="#DBEAFE" opacity="0.9" />
              <ellipse cx="70" cy="62" rx="4.2" ry="2" fill="#FFFFFF" transform="rotate(34 70 62)" filter="drop-shadow(0 0.8px 1px rgba(180,120,60,0.3))" />
              <ellipse cx="14" cy="76" rx="3.6" ry="1.8" fill="#FDF2F8" transform="rotate(-16 14 76)" />
            </svg>
          </div>

          {/* Góc BR: tổ chim + 2 trứng + cành lá non vươn lên + sparkle delay .7s */}
          <div className="corner-ornament garden-br">
            <svg viewBox="0 0 84 74" width="58" height="51">
              <defs>
                <linearGradient id="gardenNestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5E3C" /><stop offset="100%" stopColor="#6B4423" />
                </linearGradient>
                <linearGradient id="gardenTwigGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A3744F" /><stop offset="100%" stopColor="#6B4423" />
                </linearGradient>
                <linearGradient id="gardenEggGoldGrad" x1="20%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%" stopColor="#FEF9C3" /><stop offset="55%" stopColor="#FDE68A" /><stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
                <linearGradient id="gardenEggPinkGrad" x1="20%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%" stopColor="#FDF2F8" /><stop offset="55%" stopColor="#FBCFE8" /><stop offset="100%" stopColor="#F472B6" />
                </linearGradient>
              </defs>
              <path d="M54 46 C 58 36, 60 29, 64 22" stroke="#15803D" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              <use href="#gardenLeafSmall" transform="translate(59.5,31) rotate(-34)" />
              <use href="#gardenLeafLight" transform="translate(65,21) rotate(22) scale(0.8)" />
              <ellipse cx="42" cy="38" rx="34" ry="9" fill="url(#gardenTwigGrad)" />
              <ellipse cx="31" cy="33" rx="9" ry="11" fill="url(#gardenEggGoldGrad)" transform="rotate(-14 31 33)" />
              <circle cx="28" cy="28" r="1.6" fill="#D97706" opacity="0.45" /><circle cx="34" cy="34" r="1.3" fill="#D97706" opacity="0.4" /><circle cx="29" cy="38" r="1.1" fill="#D97706" opacity="0.35" />
              <ellipse cx="52" cy="34" rx="8" ry="10" fill="url(#gardenEggPinkGrad)" transform="rotate(12 52 34)" />
              <circle cx="49" cy="29" r="1.5" fill="#DB2777" opacity="0.4" /><circle cx="55" cy="35" r="1.2" fill="#DB2777" opacity="0.35" /><circle cx="50" cy="40" r="1" fill="#DB2777" opacity="0.3" />
              <path d="M4 40 C 8 60, 24 70, 42 70 C 60 70, 76 60, 80 40 C 70 48, 56 51, 42 51 C 28 51, 14 48, 4 40 Z" fill="url(#gardenNestGrad)" />
              <path d="M6 44 C 16 52, 28 55, 42 55 C 56 55, 68 52, 78 44" stroke="#6B4423" strokeWidth="1.4" fill="none" opacity="0.55" />
              <path d="M10 46 C 18 62, 30 68, 42 68 M20 44 C 26 58, 34 64, 40 66 M64 44 C 58 58, 50 64, 44 66" stroke="#A3744F" strokeWidth="1.3" fill="none" opacity="0.6" />
              <path d="M8 42 C 14 44, 20 45, 26 46 M58 46 C 66 44, 72 42, 76 40" stroke="#6B4423" strokeWidth="1.6" fill="none" opacity="0.5" />
              <use href="#gardenLeafLight" transform="translate(74,34) rotate(50) scale(0.9)" />
              <use href="#gardenSparkle" transform="translate(70,12) scale(0.7)" />
              <use href="#gardenSparkle" className="garden-sparkle" style={{ animationDelay: "0.7s" }} transform="translate(56,15) scale(0.8)" />
            </svg>
          </div>

          {/* Cánh hoa rơi (HTML): rơi ngang 10/26/74/90%, fade trước khi chạm đáy */}
          {[
            { left: "10%", delay: "0s", dur: "9.5s" },
            { left: "26%", delay: "2.5s", dur: "11s" },
            { left: "74%", delay: "5s", dur: "12s" },
            { left: "90%", delay: "7.5s", dur: "10s" },
          ].map((p, i) => (
            <span key={`garden-petal-fall-${i}`} className="garden-petal-fall" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur }}>
              <svg viewBox="0 0 12 10" width="12" height="10" aria-hidden="true">
                <path d="M6 1.2 C 8.6 0, 11.2 1.9, 10.8 4.6 C 10.4 7.4, 7.8 9.6, 6 8.2 C 4.2 9.6, 1.6 7.4, 1.2 4.6 C 0.8 1.9, 3.4 0, 6 1.2 Z" fill="url(#gardenPetalGrad)" />
                <path d="M6 8.2 C 5.4 5.6, 5.6 3.4, 6 1.6" stroke="#F472B6" strokeWidth="0.4" opacity="0.5" fill="none" />
              </svg>
            </span>
          ))}
        </div>
      )}

      {/* ─── 2B. TẾT ÂM LỊCH: "Mai Đào Xuân Sắc" — cành gỗ filled thuôn,
          mai 5 cánh notch, đào nhiều tầng, lì xì 福 path, lồng đèn, pháo ─── */}
      {isSpring && currentFestive === "tet" && (
        <div className="wrapped-frame spring-tet-frame">
          <FrameAmbient tone="tet" />
          {/* Mép trên: thân chính uốn sóng + 7 cụm mai/đào so le + lá non + pháo giữa */}
          <div className="frame-border-top blossom-border-top">
            <svg viewBox="0 0 340 38" preserveAspectRatio="none" className="blossom-top-svg">
              <defs>
                <linearGradient id="tfMaiGrad" x1="18%" y1="0%" x2="82%" y2="100%">
                  <stop offset="0%" stopColor="#FFF7C2" />
                  <stop offset="46%" stopColor="#FDE047" />
                  <stop offset="82%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="tfMaiEdgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <linearGradient id="tfDaoGrad" x1="18%" y1="0%" x2="82%" y2="100%">
                  <stop offset="0%" stopColor="#FFF1F2" />
                  <stop offset="44%" stopColor="#FDA4AF" />
                  <stop offset="88%" stopColor="#F43F5E" />
                  <stop offset="100%" stopColor="#BE123C" />
                </linearGradient>
                <linearGradient id="tfDaoEdgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F43F5E" />
                  <stop offset="100%" stopColor="#9F1239" />
                </linearGradient>
                <radialGradient id="tfCoreGrad" cx="50%" cy="42%" r="58%">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="55%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B91C1C" />
                </radialGradient>
                <linearGradient id="tfWoodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C2703F" />
                  <stop offset="34%" stopColor="#9A4B22" />
                  <stop offset="72%" stopColor="#6B2F14" />
                  <stop offset="100%" stopColor="#3F1A0B" />
                </linearGradient>
                <linearGradient id="tfLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#86EFAC" />
                  <stop offset="55%" stopColor="#22C55E" />
                  <stop offset="100%" stopColor="#166534" />
                </linearGradient>
                <linearGradient id="tfLeafDeepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22C55E" />
                  <stop offset="100%" stopColor="#14532D" />
                </linearGradient>
                <linearGradient id="tfGoldGrad" x1="10%" y1="0%" x2="90%" y2="100%">
                  <stop offset="0%" stopColor="#FEF3C7" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <linearGradient id="tfEnvGrad" x1="15%" y1="0%" x2="85%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="55%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="#7F1D1D" />
                </linearGradient>
                <linearGradient id="tfEnvDeepGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#B91C1C" />
                  <stop offset="100%" stopColor="#6B0F16" />
                </linearGradient>
                <linearGradient id="tfLanternGrad" x1="18%" y1="0%" x2="82%" y2="100%">
                  <stop offset="0%" stopColor="#F87171" />
                  <stop offset="46%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="#7F1D1D" />
                </linearGradient>
                <radialGradient id="tfLanternGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.55" />
                  <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="tfCoinGrad" cx="40%" cy="32%" r="70%">
                  <stop offset="0%" stopColor="#FEF3C7" />
                  <stop offset="55%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </radialGradient>
                <linearGradient id="tfFireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B91C1C" />
                  <stop offset="45%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#7F1D1D" />
                </linearGradient>

                {/* Template: hoa mai 5 cánh notch, 2 lớp, gân, 5 nhị */}
                <g id="tfMaiBloom">
                  <circle r="8.4" fill="url(#tfMaiEdgeGrad)" opacity="0.26" />
                  <g fill="url(#tfMaiGrad)">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <path key={`mai-p-${i}`} d="M0 0 C -3.8 -1.2, -4.6 -5, -2.4 -7 C -1.2 -8, -0.4 -7.4, 0 -6.2 C 0.4 -7.4, 1.2 -8, 2.4 -7 C 4.6 -5, 3.8 -1.2, 0 0 Z" transform={`rotate(${i * 72})`} />
                    ))}
                  </g>
                  <g stroke="#D97706" strokeWidth="0.3" opacity="0.42" fill="none">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <path key={`mai-v-${i}`} d="M0 -1.4 L0 -6.2" transform={`rotate(${i * 72})`} />
                    ))}
                  </g>
                  <circle r="2.7" fill="url(#tfCoreGrad)" />
                  <g fill="#FEF08A">
                    <circle cx="0" cy="-3.7" r="0.55" /><circle cx="3.5" cy="-1.1" r="0.5" /><circle cx="2.2" cy="3" r="0.5" /><circle cx="-2.2" cy="3" r="0.5" /><circle cx="-3.5" cy="-1.1" r="0.5" />
                  </g>
                  <circle r="0.9" fill="#B91C1C" />
                </g>

                {/* Template: hoa đào 5 cánh notch, tâm đỏ sẫm */}
                <g id="tfDaoBloom">
                  <circle r="8.2" fill="url(#tfDaoEdgeGrad)" opacity="0.24" />
                  <g fill="url(#tfDaoGrad)">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <path key={`dao-p-${i}`} d="M0 0 C -3.9 -1.3, -4.7 -5.1, -2.5 -7.1 C -1.2 -8.2, -0.4 -7.5, 0 -6.3 C 0.4 -7.5, 1.2 -8.2, 2.5 -7.1 C 4.7 -5.1, 3.9 -1.3, 0 0 Z" transform={`rotate(${i * 72})`} />
                    ))}
                  </g>
                  <g stroke="#BE123C" strokeWidth="0.3" opacity="0.35" fill="none">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <path key={`dao-v-${i}`} d="M0 -1.4 L0 -6.4" transform={`rotate(${i * 72})`} />
                    ))}
                  </g>
                  <circle r="2.5" fill="#9F1239" />
                  <g fill="#FECDD3">
                    <circle cx="0" cy="-3.4" r="0.5" /><circle cx="3.2" cy="-1" r="0.45" /><circle cx="2" cy="2.8" r="0.45" /><circle cx="-2" cy="2.8" r="0.45" /><circle cx="-3.2" cy="-1" r="0.45" />
                  </g>
                  <circle r="0.8" fill="#FDE68A" />
                </g>

                {/* Template: nụ đào + đài xanh */}
                <g id="tfBud">
                  <path d="M0 0 C -2.6 -1.4, -3.2 -5, -1.4 -7.4 C -0.6 -8.4, 0.6 -8.4, 1.4 -7.4 C 3.2 -5, 2.6 -1.4, 0 0 Z" fill="url(#tfDaoGrad)" />
                  <path d="M0 -0.4 C -1.2 -2, -1.2 -5.4, 0 -7" stroke="#FDA4AF" strokeWidth="0.4" opacity="0.7" fill="none" />
                  <path d="M-1.6 -0.4 C -2.8 0.6, -3.2 2, -2.6 2.8 C -1.4 2.6, -0.6 1.6, 0 0.6 Z" fill="url(#tfLeafGrad)" />
                </g>

                {/* Template: lá non có gân + highlight */}
                <g id="tfLeaf">
                  <path d="M0 0 C 2 -3.2, 6.2 -4.4, 9.4 -3.6 C 8.4 0.4, 4.4 3, 0 0 Z" fill="url(#tfLeafGrad)" />
                  <path d="M0 0 C 3 -1.4, 6 -2.4, 9 -3.4" stroke="#166534" strokeWidth="0.4" opacity="0.55" fill="none" />
                  <path d="M2.4 -1 C 4.4 -1.8, 6 -2.4, 7.4 -2.8" stroke="#BBF7D0" strokeWidth="0.5" opacity="0.5" fill="none" />
                  <ellipse cx="4.4" cy="-2" rx="1.6" ry="0.5" fill="#FFFFFF" opacity="0.45" transform="rotate(-22 4.4 -2)" />
                </g>
                <g id="tfLeafDeep">
                  <path d="M0 0 C 2 -3.2, 6.2 -4.4, 9.4 -3.6 C 8.4 0.4, 4.4 3, 0 0 Z" fill="url(#tfLeafDeepGrad)" />
                  <path d="M0 0 C 3 -1.4, 6 -2.4, 9 -3.4" stroke="#14532D" strokeWidth="0.4" opacity="0.6" fill="none" />
                  <ellipse cx="4.2" cy="-2" rx="1.4" ry="0.45" fill="#FFFFFF" opacity="0.3" transform="rotate(-22 4.2 -2)" />
                </g>

                {/* Template: đèn lồng đỏ 6 nan vàng + tua */}
                <g id="tfLantern">
                  <ellipse cx="0" cy="0" rx="14" ry="17" fill="url(#tfLanternGlow)" />
                  <path d="M0 -23 L0 -18" stroke="#8B5E3C" strokeWidth="0.9" />
                  <path d="M-5 -18 L5 -18 L6 -15.6 L-6 -15.6 Z" fill="url(#tfGoldGrad)" />
                  <ellipse cx="0" cy="0" rx="9.6" ry="12" fill="url(#tfLanternGrad)" />
                  <g stroke="url(#tfGoldGrad)" strokeWidth="0.65" fill="none" opacity="0.9">
                    <path d="M-6 -15.6 C -3 -11.4, -3 11.4, -6 15.6" /><path d="M-3 -16.6 C -1.4 -11.8, -1.4 11.8, -3 16.6" />
                    <path d="M0 -17 L0 17" /><path d="M3 -16.6 C 1.4 -11.8, 1.4 11.8, 3 16.6" /><path d="M6 -15.6 C 3 -11.4, 3 11.4, 6 15.6" />
                  </g>
                  <g stroke="#FDE68A" strokeWidth="0.45" opacity="0.5" fill="none">
                    <path d="M-7.4 -6 C -3 -8.4, 3 -8.4, 7.4 -6" /><path d="M-8.6 0 C -3 -2.4, 3 -2.4, 8.6 0" /><path d="M-7.4 6 C -3 3.6, 3 3.6, 7.4 6" />
                  </g>
                  <path d="M-5 17 L5 17 L4 20 L-4 20 Z" fill="url(#tfGoldGrad)" />
                  <g stroke="#F59E0B" strokeWidth="0.8" strokeLinecap="round">
                    <path d="M-2.6 20 L-3.4 27" /><path d="M0 20 L0 28" /><path d="M2.6 20 L3.4 27" />
                  </g>
                  <circle cx="0" cy="20" r="1.1" fill="#FDE68A" />
                </g>

                {/* Template: pháo đỏ 2 đai vàng */}
                <g id="tfFirecracker">
                  <rect x="-3" y="-2" width="6" height="12" rx="1.2" fill="url(#tfFireGrad)" />
                  <rect x="-3.2" y="0.4" width="6.4" height="1.4" fill="url(#tfGoldGrad)" />
                  <rect x="-3.2" y="6.6" width="6.4" height="1.4" fill="url(#tfGoldGrad)" />
                  <ellipse cx="-1" cy="3.4" rx="0.8" ry="2" fill="#FCA5A5" opacity="0.35" />
                  <path d="M0 -2 C 1 -5, 3 -6, 4 -8" stroke="#8B5E3C" strokeWidth="0.6" fill="none" />
                  <circle cx="4.2" cy="-8.4" r="1" fill="#F59E0B" opacity="0.9" />
                  <path d="M0 10 L0 13" stroke="#FDE68A" strokeWidth="0.5" />
                </g>

                {/* Template: đồng xu lỗ vuông */}
                <g id="tfCoin">
                  <circle r="5.4" fill="url(#tfCoinGrad)" />
                  <circle r="5.4" fill="none" stroke="#B45309" strokeWidth="0.4" />
                  <rect x="-1.8" y="-1.8" width="3.6" height="3.6" rx="0.4" fill="#7F1D1D" />
                  <circle r="3.2" fill="none" stroke="#FEF3C7" strokeWidth="0.3" opacity="0.7" />
                  <path d="M-3.6 -3.2 C -2 -4.4, 2 -4.4, 3.6 -3.2" stroke="#FFFFF7" strokeWidth="0.5" opacity="0.65" fill="none" />
                </g>

                {/* Template: phong bao nhỏ + 福 path */}
                <g id="tfEnvSmall">
                  <rect x="-7" y="-9" width="14" height="18" rx="1.6" fill="url(#tfEnvGrad)" />
                  <rect x="-7" y="-9" width="14" height="18" rx="1.6" fill="none" stroke="#FDE68A" strokeWidth="0.5" />
                  <path d="M-7 -8.4 L0 -2.6 L7 -8.4" stroke="#FDE68A" strokeWidth="0.55" fill="none" opacity="0.9" />
                  <path d="M-7 8.4 L0 2.6 L7 8.4" stroke="#B91C1C" strokeWidth="0.5" fill="none" opacity="0.5" />
                  <circle r="4.6" fill="#FEF3C7" opacity="0.16" />
                  <use href="#tfFuGlyph" transform="translate(0,0.6) scale(0.72)" />
                </g>

                {/* Glyph 福 vẽ bằng 8 nét path (không dùng text) */}
                <g id="tfFuGlyph">
                  <g stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" fill="none">
                    <path d="M-5 -6 L5 -6" />
                    <path d="M0 -6 L0 7" />
                    <path d="M-7 -5 L-7.4 -4.4" />
                    <path d="M-8 -2 L-4 -2" />
                    <path d="M-6 -2 L-6 6" />
                    <path d="M-6 2 L-9 5" />
                    <path d="M-1 -4 L6 -4" />
                    <path d="M0 -1 L6 -1 L6 3 L0 3 Z" />
                    <path d="M3 -1 L3 3" />
                    <path d="M0 1 L6 1" />
                    <path d="M-6 6 L-2.6 6" />
                    <path d="M-6 3.6 L-2.6 3.6" />
                  </g>
                </g>
              
                <linearGradient id="tfV4Relief" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7F1D1D" />
                  <stop offset="48%" stopColor="#B45309" />
                  <stop offset="100%" stopColor="#FDE68A" />
                </linearGradient>
                <linearGradient id="tfV4RimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFF7C2" />
                  <stop offset="48%" stopColor="#F4C430" />
                  <stop offset="100%" stopColor="#92400E" />
                </linearGradient>
                <radialGradient id="tfV4MedalGrad" cx="46%" cy="38%" r="62%">
                  <stop offset="0%" stopColor="#FFF7C2" />
                  <stop offset="44%" stopColor="#FCD34D" />
                  <stop offset="80%" stopColor="#B45309" />
                  <stop offset="100%" stopColor="#7C2D12" />
                </radialGradient>
                <g id="tfV4Medallion">
                  <circle r="9.6" fill="none" stroke="url(#tfV4RimGrad)" strokeWidth="1.5" />
                  <circle cy="-10.7" r="0.55" fill="#FFF7C2" transform="rotate(0)" /><circle cy="-10.7" r="0.55" fill="#FFF7C2" transform="rotate(22.5)" /><circle cy="-10.7" r="0.55" fill="#FFF7C2" transform="rotate(45)" /><circle cy="-10.7" r="0.55" fill="#FFF7C2" transform="rotate(67.5)" /><circle cy="-10.7" r="0.55" fill="#FFF7C2" transform="rotate(90)" /><circle cy="-10.7" r="0.55" fill="#FFF7C2" transform="rotate(112.5)" /><circle cy="-10.7" r="0.55" fill="#FFF7C2" transform="rotate(135)" /><circle cy="-10.7" r="0.55" fill="#FFF7C2" transform="rotate(157.5)" /><circle cy="-10.7" r="0.55" fill="#FFF7C2" transform="rotate(180)" /><circle cy="-10.7" r="0.55" fill="#FFF7C2" transform="rotate(202.5)" /><circle cy="-10.7" r="0.55" fill="#FFF7C2" transform="rotate(225)" /><circle cy="-10.7" r="0.55" fill="#FFF7C2" transform="rotate(247.5)" /><circle cy="-10.7" r="0.55" fill="#FFF7C2" transform="rotate(270)" /><circle cy="-10.7" r="0.55" fill="#FFF7C2" transform="rotate(292.5)" /><circle cy="-10.7" r="0.55" fill="#FFF7C2" transform="rotate(315)" /><circle cy="-10.7" r="0.55" fill="#FFF7C2" transform="rotate(337.5)" />
                  <circle r="8" fill="url(#tfV4MedalGrad)" opacity="0.9" />
                  <circle r="8" fill="none" stroke="#7C2D12" strokeWidth="0.4" opacity="0.6" />
                  <ellipse cy="-4.6" rx="2.6" ry="4" fill="#FEF3C7" stroke="#B45309" strokeWidth="0.4" transform="rotate(0)" /><ellipse cy="-4.6" rx="2.6" ry="4" fill="#FEF3C7" stroke="#B45309" strokeWidth="0.4" transform="rotate(72)" /><ellipse cy="-4.6" rx="2.6" ry="4" fill="#FEF3C7" stroke="#B45309" strokeWidth="0.4" transform="rotate(144)" /><ellipse cy="-4.6" rx="2.6" ry="4" fill="#FEF3C7" stroke="#B45309" strokeWidth="0.4" transform="rotate(216)" /><ellipse cy="-4.6" rx="2.6" ry="4" fill="#FEF3C7" stroke="#B45309" strokeWidth="0.4" transform="rotate(288)" />
                  <path d="M-2.4 -2.4 H2.4 V2.4 H-2.4 Z M-1 -1 H1 V1 H-1 Z" fill="#7C2D12" fillRule="evenodd" />
                  <circle r="1.2" fill="#FFF7C2" opacity="0.9" />
                  <path d="M-8 5.4 A 9.6 9.6 0 0 0 8 5.4" fill="none" stroke="#7C2D12" strokeWidth="0.9" opacity="0.4" />
                </g>
              </defs>

              {/* Thân chính filled thuôn (đầu nhọn về phải) */}
              <path d="M-6 10.4 C 30 8.6, 60 15.4, 96 13.2 C 130 11, 158 5.2, 190 7.4 C 222 9.6, 246 16.4, 278 13.4 C 306 10.6, 326 6.2, 346 7.4 L 346 10.6 C 326 9.8, 306 14.4, 278 17 C 246 20, 222 13.2, 190 11 C 158 8.8, 130 14.8, 96 17 C 60 19.2, 30 12.4, -6 14.2 Z" fill="url(#tfWoodGrad)" />
              <path d="M-6 11.4 C 30 9.8, 60 16.4, 96 14.2 C 130 12, 158 6.4, 190 8.6 C 222 10.6, 246 17.2, 278 14.4 C 306 11.8, 326 7.4, 346 8.6" stroke="#E8B48A" strokeWidth="0.5" opacity="0.5" fill="none" />
              <path d="M90 15.4 C 88 10.6, 87 6, 88 2.4 L 90 2.2 C 89.4 6, 90.4 10.8, 92 15.6 Z" fill="url(#tfWoodGrad)" />
              <path d="M210 13.4 C 214 17.4, 216 21.4, 215 25 L 213 25 C 213.6 21.4, 211.8 17.6, 208.6 14.2 Z" fill="url(#tfWoodGrad)" />
              <ellipse cx="168" cy="10" rx="1.6" ry="1.1" fill="#3F1A0B" stroke="#9A4B22" strokeWidth="0.3" />
              <ellipse cx="74" cy="16.2" rx="1.3" ry="0.9" fill="#3F1A0B" stroke="#9A4B22" strokeWidth="0.3" />
              <circle cx="146" cy="15.4" r="0.45" fill="#3F1A0B" opacity="0.6" />
              <circle cx="262" cy="17.4" r="0.5" fill="#3F1A0B" opacity="0.6" />

              {/* Cụm so le: đào 28 · mai 78 · mai 132 · đào 176 · mai 224 · đào 268 · mai 310 */}
              <use href="#tfDaoBloom" transform="translate(28,12) rotate(-10) scale(0.62)" />
              <use href="#tfDaoBloom" transform="translate(35.4,16.6) rotate(14) scale(0.46)" />
              <use href="#tfDaoBloom" transform="translate(21.4,17.4) rotate(-22) scale(0.42)" />

              <use href="#tfMaiBloom" transform="translate(78,10.4) rotate(-6) scale(0.68)" />
              <use href="#tfMaiBloom" transform="translate(85.4,15.4) rotate(18) scale(0.5)" />
              <use href="#tfMaiBloom" transform="translate(71.6,16.6) rotate(-16) scale(0.46)" />
              <use href="#tfMaiBloom" transform="translate(80.4,19.4) rotate(4) scale(0.38)" />

              <use href="#tfMaiBloom" transform="translate(132,11) rotate(8) scale(0.64)" />
              <use href="#tfMaiBloom" transform="translate(139.4,15.8) rotate(-12) scale(0.46)" />
              <use href="#tfMaiBloom" transform="translate(125.6,17) rotate(18) scale(0.42)" />
              <use href="#tfBud" transform="translate(118,13.6) rotate(-24) scale(0.72)" />

              <use href="#tfDaoBloom" transform="translate(176,13.8) rotate(-8) scale(0.56)" />
              <use href="#tfDaoBloom" transform="translate(182,18) rotate(16) scale(0.42)" />

              <use href="#tfMaiBloom" transform="translate(224,10.8) rotate(6) scale(0.66)" />
              <use href="#tfMaiBloom" transform="translate(231.4,15.6) rotate(-14) scale(0.48)" />
              <use href="#tfMaiBloom" transform="translate(217.6,17) rotate(18) scale(0.44)" />
              <use href="#tfMaiBloom" transform="translate(226,19.6) rotate(2) scale(0.36)" />

              <use href="#tfDaoBloom" transform="translate(268,13.4) rotate(10) scale(0.6)" />
              <use href="#tfDaoBloom" transform="translate(275,17.8) rotate(-12) scale(0.44)" />
              <use href="#tfDaoBloom" transform="translate(261,18) rotate(20) scale(0.4)" />
              <use href="#tfBud" transform="translate(283,13.4) rotate(24) scale(0.66)" />

              <use href="#tfMaiBloom" transform="translate(310,9.6) rotate(-6) scale(0.78)" />
              <use href="#tfMaiBloom" transform="translate(318,15.6) rotate(18) scale(0.48)" />
              <use href="#tfBud" transform="translate(301,14.6) rotate(-20) scale(0.62)" />

              {/* Lá non so le */}
              <use href="#tfLeaf" transform="translate(47,18) rotate(-24) scale(0.9)" />
              <use href="#tfLeafDeep" transform="translate(104,19) rotate(20) scale(0.85)" />
              <use href="#tfLeaf" transform="translate(157,18.4) rotate(-14) scale(0.8)" />
              <use href="#tfLeafDeep" transform="translate(206,19) rotate(26) scale(0.9)" />
              <use href="#tfLeaf" transform="translate(294,19.4) rotate(-20) scale(0.84)" />
              <use href="#tfLeafDeep" transform="translate(334,14.4) rotate(14) scale(0.7)" />

              {/* Cặp pháo treo giữa x≈190 (dip y24, không chạm HUD) */}
              <path d="M186 8 C 186 12, 185 16, 184.6 19 M194 9 C 194 13, 195 17, 195.4 20" stroke="#8B5E3C" strokeWidth="0.6" fill="none" />
              <use href="#tfFirecracker" transform="translate(184,22) rotate(-14) scale(0.62)" />
              <use href="#tfFirecracker" transform="translate(195,23.4) rotate(12) scale(0.58)" />

              {/* 3 sparkle vàng */}
              <path d="M56 5.4 C 56.4 7, 57 7.6, 58.6 8 C 57 8.4, 56.4 9, 56 10.6 C 55.6 9, 55 8.4, 53.4 8 C 55 7.6, 55.6 7, 56 5.4 Z" fill="#FEF3C7" className="tf-sparkle" />
              <path d="M202 4.6 C 202.3 5.8, 202.8 6.3, 204 6.6 C 202.8 6.9, 202.3 7.4, 202 8.6 C 201.7 7.4, 201.2 6.9, 200 6.6 C 201.2 6.3, 201.7 5.8, 202 4.6 Z" fill="#FEF3C7" className="tf-sparkle" style={{ animationDelay: "0.8s" }} />
              <path d="M286 5 C 286.3 6.2, 286.8 6.7, 288 7 C 286.8 7.3, 286.3 7.8, 286 9 C 285.7 7.8, 285.2 7.3, 284 7 C 285.2 6.7, 285.7 6.2, 286 5 Z" fill="#FEF3C7" className="tf-sparkle" style={{ animationDelay: "1.5s" }} />
            
              {/* V4 — meander vạn thọ, vòm lồng đèn, viền kép, hạt cườm, huy hiệu xu */}
              <g>
                <path d="M116 34 q10 -13 20 0 l0 0 q10 -13 20 0 l0 0 q10 -13 20 0 l0 0 q10 -13 20 0 l0 0 q10 -13 20 0 l0 0 L216 38 L116 38 Z" fill="url(#tfV4Relief)" opacity="0.34" />
                <path d="M0 15 C 46 9, 92 19, 170 12 C 248 5, 294 17, 340 11" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.5" />
                <path d="M0 8 h12 v7 h-7 v-4 h3" fill="none" stroke="#FDE68A" strokeWidth="0.55" opacity="0.65" /><path d="M20 8 h12 v7 h-7 v-4 h3" fill="none" stroke="#FDE68A" strokeWidth="0.55" opacity="0.65" /><path d="M40 8 h12 v7 h-7 v-4 h3" fill="none" stroke="#FDE68A" strokeWidth="0.55" opacity="0.65" /><path d="M60 8 h12 v7 h-7 v-4 h3" fill="none" stroke="#FDE68A" strokeWidth="0.55" opacity="0.65" /><path d="M80 8 h12 v7 h-7 v-4 h3" fill="none" stroke="#FDE68A" strokeWidth="0.55" opacity="0.65" /><path d="M100 8 h12 v7 h-7 v-4 h3" fill="none" stroke="#FDE68A" strokeWidth="0.55" opacity="0.65" /><path d="M120 8 h12 v7 h-7 v-4 h3" fill="none" stroke="#FDE68A" strokeWidth="0.55" opacity="0.65" /><path d="M140 8 h12 v7 h-7 v-4 h3" fill="none" stroke="#FDE68A" strokeWidth="0.55" opacity="0.65" /><path d="M160 8 h12 v7 h-7 v-4 h3" fill="none" stroke="#FDE68A" strokeWidth="0.55" opacity="0.65" /><path d="M180 8 h12 v7 h-7 v-4 h3" fill="none" stroke="#FDE68A" strokeWidth="0.55" opacity="0.65" /><path d="M200 8 h12 v7 h-7 v-4 h3" fill="none" stroke="#FDE68A" strokeWidth="0.55" opacity="0.65" /><path d="M220 8 h12 v7 h-7 v-4 h3" fill="none" stroke="#FDE68A" strokeWidth="0.55" opacity="0.65" /><path d="M240 8 h12 v7 h-7 v-4 h3" fill="none" stroke="#FDE68A" strokeWidth="0.55" opacity="0.65" /><path d="M260 8 h12 v7 h-7 v-4 h3" fill="none" stroke="#FDE68A" strokeWidth="0.55" opacity="0.65" /><path d="M280 8 h12 v7 h-7 v-4 h3" fill="none" stroke="#FDE68A" strokeWidth="0.55" opacity="0.65" /><path d="M300 8 h12 v7 h-7 v-4 h3" fill="none" stroke="#FDE68A" strokeWidth="0.55" opacity="0.65" /><path d="M320 8 h12 v7 h-7 v-4 h3" fill="none" stroke="#FDE68A" strokeWidth="0.55" opacity="0.65" />
                <path d="M0 3 H340" stroke="url(#tfV4RimGrad)" strokeWidth="1.1" opacity="0.62" />
                <path d="M0 5.6 H340" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.42" />
                <circle cx="10" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="22" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="34" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="46" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="58" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="70" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="82" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="94" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="106" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="118" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="130" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="142" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="154" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="166" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="178" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="190" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="202" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="214" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="226" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="238" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="250" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="262" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="274" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="286" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="298" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="310" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="322" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                <circle cx="334" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.7" />
                
                <use href="#tfV4Medallion" transform="translate(206,17.6) scale(0.74)" />
              </g>
            </svg>
          </div>

          {/* Cạnh trái: thân filled + 6 cụm so le + pháo y≈350 */}
          <div className="frame-border-side border-left blossom-border-left">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="blossom-side-svg">
              <g>
                <path d="M1.2 0 V460" stroke="url(#tfV4RimGrad)" strokeWidth="0.9" opacity="0.5" />
                <path d="M4.4 0 V460" stroke="#FFF7C2" strokeWidth="0.35" opacity="0.3" />
                <path d="M14.6 0 V460" stroke="#B45309" strokeWidth="0.4" opacity="0.55" strokeDasharray="2 6" />
                <path d="M4 0 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" /><path d="M4 46 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" /><path d="M4 92 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" /><path d="M4 138 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" /><path d="M4 184 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" /><path d="M4 230 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" /><path d="M4 276 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" /><path d="M4 322 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" /><path d="M4 368 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" /><path d="M4 414 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" />
                <path d="M16 6 c6 4 6 14 0 18" fill="none" stroke="#FCD34D" strokeWidth="0.4" opacity="0.45" /><path d="M16 56 c6 4 6 14 0 18" fill="none" stroke="#FCD34D" strokeWidth="0.4" opacity="0.45" /><path d="M16 106 c6 4 6 14 0 18" fill="none" stroke="#FCD34D" strokeWidth="0.4" opacity="0.45" /><path d="M16 156 c6 4 6 14 0 18" fill="none" stroke="#FCD34D" strokeWidth="0.4" opacity="0.45" /><path d="M16 206 c6 4 6 14 0 18" fill="none" stroke="#FCD34D" strokeWidth="0.4" opacity="0.45" /><path d="M16 256 c6 4 6 14 0 18" fill="none" stroke="#FCD34D" strokeWidth="0.4" opacity="0.45" /><path d="M16 306 c6 4 6 14 0 18" fill="none" stroke="#FCD34D" strokeWidth="0.4" opacity="0.45" /><path d="M16 356 c6 4 6 14 0 18" fill="none" stroke="#FCD34D" strokeWidth="0.4" opacity="0.45" /><path d="M16 406 c6 4 6 14 0 18" fill="none" stroke="#FCD34D" strokeWidth="0.4" opacity="0.45" />
                <circle cx="11" cy="10" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="35" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="60" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="85" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="110" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="135" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="160" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="185" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="210" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="235" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="260" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="285" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="310" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="335" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="360" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="385" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="410" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="435" r="0.75" fill="#FFF7C2" opacity="0.62" />
                
              </g>
              <path d="M0 0 L5 0 C 4 100, 5.6 200, 4.4 300 C 3.4 380, 5 430, 4.2 460 L0 460 Z" fill="#3F1A0B" opacity="0.12" />
              <path d="M14 -4 C 9 80, 20 160, 15 230 C 10 300, 20 380, 17 464 L 20.6 464 C 23.6 380, 13.6 300, 18.6 230 C 23.6 160, 12.6 80, 17.6 -4 Z" fill="url(#tfWoodGrad)" />
              <path d="M14.6 -4 C 9.6 80, 20.6 160, 15.6 230 C 10.6 300, 20.6 380, 17.6 464" stroke="#E8B48A" strokeWidth="0.5" opacity="0.4" fill="none" />
              <ellipse cx="16.4" cy="146" rx="1.4" ry="2" fill="#3F1A0B" stroke="#9A4B22" strokeWidth="0.3" />
              <circle cx="18" cy="206" r="0.45" fill="#3F1A0B" opacity="0.6" />

              <use href="#tfDaoBloom" transform="translate(14,30) rotate(-12) scale(0.56)" />
              <use href="#tfMaiBloom" transform="translate(14.6,100) rotate(10) scale(0.6)" />
              <use href="#tfMaiBloom" transform="translate(13.4,170) rotate(-14) scale(0.52)" />
              <use href="#tfDaoBloom" transform="translate(14.2,240) rotate(8) scale(0.58)" />
              <use href="#tfMaiBloom" transform="translate(13.4,310) rotate(-10) scale(0.54)" />
              <use href="#tfDaoBloom" transform="translate(14.4,400) rotate(12) scale(0.56)" />

              <use href="#tfBud" transform="translate(20,64) rotate(48) scale(0.72)" />
              <use href="#tfBud" transform="translate(8.6,136) rotate(-52) scale(0.66)" />
              <use href="#tfBud" transform="translate(21,208) rotate(40) scale(0.7)" />
              <use href="#tfBud" transform="translate(8.4,276) rotate(-44) scale(0.64)" />
              <use href="#tfBud" transform="translate(20,362) rotate(52) scale(0.68)" />

              <use href="#tfLeaf" transform="translate(21,78) rotate(52) scale(0.9)" />
              <use href="#tfLeafDeep" transform="translate(9,112) rotate(-60) scale(0.8)" />
              <use href="#tfLeaf" transform="translate(21.4,186) rotate(46) scale(0.84)" />
              <use href="#tfLeafDeep" transform="translate(8.6,258) rotate(-54) scale(0.88)" />
              <use href="#tfLeaf" transform="translate(20.6,332) rotate(58) scale(0.8)" />

              <path d="M14 336 C 20 340, 24 346, 25 352" stroke="#8B5E3C" strokeWidth="0.6" fill="none" />
              <use href="#tfFirecracker" transform="translate(24,360) rotate(18) scale(0.62)" />
              <use href="#tfFirecracker" transform="translate(19,374) rotate(-10) scale(0.58)" />

              <path d="M22 140 C 22.3 141.4, 22.9 142, 24.3 142.3 C 22.9 142.6, 22.3 143.2, 22 144.6 C 21.7 143.2, 21.1 142.6, 19.7 142.3 C 21.1 142, 21.7 141.4, 22 140 Z" fill="#FEF3C7" className="tf-sparkle" style={{ animationDelay: "0.4s" }} />
            </svg>
          </div>

          {/* Cạnh phải: phase lệch + nút tassel y≈140 */}
          <div className="frame-border-side border-right blossom-border-right">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="blossom-side-svg">
              <g>
                <path d="M1.2 0 V460" stroke="url(#tfV4RimGrad)" strokeWidth="0.9" opacity="0.5" />
                <path d="M4.4 0 V460" stroke="#FFF7C2" strokeWidth="0.35" opacity="0.3" />
                <path d="M14.6 0 V460" stroke="#B45309" strokeWidth="0.4" opacity="0.55" strokeDasharray="2 6" />
                <path d="M4 0 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" /><path d="M4 46 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" /><path d="M4 92 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" /><path d="M4 138 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" /><path d="M4 184 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" /><path d="M4 230 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" /><path d="M4 276 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" /><path d="M4 322 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" /><path d="M4 368 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" /><path d="M4 414 h7 v12 h-4 v-7 h2" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.55" />
                <path d="M16 6 c6 4 6 14 0 18" fill="none" stroke="#FCD34D" strokeWidth="0.4" opacity="0.45" /><path d="M16 56 c6 4 6 14 0 18" fill="none" stroke="#FCD34D" strokeWidth="0.4" opacity="0.45" /><path d="M16 106 c6 4 6 14 0 18" fill="none" stroke="#FCD34D" strokeWidth="0.4" opacity="0.45" /><path d="M16 156 c6 4 6 14 0 18" fill="none" stroke="#FCD34D" strokeWidth="0.4" opacity="0.45" /><path d="M16 206 c6 4 6 14 0 18" fill="none" stroke="#FCD34D" strokeWidth="0.4" opacity="0.45" /><path d="M16 256 c6 4 6 14 0 18" fill="none" stroke="#FCD34D" strokeWidth="0.4" opacity="0.45" /><path d="M16 306 c6 4 6 14 0 18" fill="none" stroke="#FCD34D" strokeWidth="0.4" opacity="0.45" /><path d="M16 356 c6 4 6 14 0 18" fill="none" stroke="#FCD34D" strokeWidth="0.4" opacity="0.45" /><path d="M16 406 c6 4 6 14 0 18" fill="none" stroke="#FCD34D" strokeWidth="0.4" opacity="0.45" />
                <circle cx="11" cy="10" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="35" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="60" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="85" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="110" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="135" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="160" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="185" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="210" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="235" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="260" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="285" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="310" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="335" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="360" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="385" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="410" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="11" cy="435" r="0.75" fill="#FFF7C2" opacity="0.62" />
                
              </g>
              <path d="M27 0 L32 0 L32 460 L27.8 460 C 29 400, 27.4 320, 28.6 240 C 30 160, 28.4 80, 27 0 Z" fill="#3F1A0B" opacity="0.12" />
              <path d="M18 -4 C 23 80, 12 160, 17 230 C 22 300, 12 380, 15 464 L 11.4 464 C 8.4 380, 18.4 300, 13.4 230 C 8.4 160, 19.4 80, 14.4 -4 Z" fill="url(#tfWoodGrad)" />
              <path d="M17.4 -4 C 22.4 80, 11.4 160, 16.4 230 C 21.4 300, 11.4 380, 14.4 464" stroke="#E8B48A" strokeWidth="0.5" opacity="0.4" fill="none" />
              <ellipse cx="15.6" cy="168" rx="1.4" ry="2" fill="#3F1A0B" stroke="#9A4B22" strokeWidth="0.3" />

              <use href="#tfMaiBloom" transform="translate(18,55) rotate(12) scale(0.58)" />
              <use href="#tfDaoBloom" transform="translate(17.4,125) rotate(-8) scale(0.54)" />
              <use href="#tfMaiBloom" transform="translate(18.6,195) rotate(10) scale(0.6)" />
              <use href="#tfDaoBloom" transform="translate(17.2,265) rotate(-12) scale(0.56)" />
              <use href="#tfMaiBloom" transform="translate(18.4,335) rotate(8) scale(0.52)" />
              <use href="#tfDaoBloom" transform="translate(17.4,415) rotate(-10) scale(0.58)" />

              <use href="#tfBud" transform="translate(10,88) rotate(-48) scale(0.68)" />
              <use href="#tfBud" transform="translate(22,158) rotate(44) scale(0.7)" />
              <use href="#tfBud" transform="translate(9.6,230) rotate(-52) scale(0.64)" />
              <use href="#tfBud" transform="translate(22,300) rotate(46) scale(0.7)" />
              <use href="#tfBud" transform="translate(9.4,378) rotate(-42) scale(0.66)" />

              <use href="#tfLeafDeep" transform="translate(10,70) rotate(-58) scale(0.84)" />
              <use href="#tfLeaf" transform="translate(22,142) rotate(50) scale(0.88)" />
              <use href="#tfLeafDeep" transform="translate(10,212) rotate(-54) scale(0.8)" />
              <use href="#tfLeaf" transform="translate(22,288) rotate(56) scale(0.86)" />
              <use href="#tfLeafDeep" transform="translate(10,352) rotate(-50) scale(0.82)" />

              <path d="M18 130 L15 136" stroke="#B45309" strokeWidth="0.7" />
              <circle cx="14" cy="138" r="2.6" fill="url(#tfGoldGrad)" />
              <path d="M14 138 L11 146 M14 138 L14 148 M14 138 L17 146" stroke="#F59E0B" strokeWidth="0.7" strokeLinecap="round" />
              <circle cx="14" cy="137.4" r="0.7" fill="#FEF3C7" opacity="0.9" />
            </svg>
          </div>

          {/* Mép đáy: cành ngang + 3 bông lớn + phong bao + xu + pháo (ink ≥ y22) */}
          <div className="frame-border-bottom blossom-border-bottom">
            <svg viewBox="0 0 340 44" preserveAspectRatio="none" className="blossom-bottom-svg">
              <g>
                <path d="M0 20.4 H340" stroke="url(#tfV4RimGrad)" strokeWidth="1" />
                <path d="M0 23 H340" stroke="#FFF7C2" strokeWidth="0.4" opacity="0.7" />
                <circle cx="10" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="22" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="34" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="46" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="58" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="70" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="82" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="94" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="106" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="118" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="130" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="142" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="154" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="166" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="178" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="190" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="202" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="214" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="226" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="238" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="250" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="262" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="274" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="286" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="298" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="310" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="322" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                <circle cx="334" cy="23" r="0.75" fill="#FFF7C2" opacity="0.62" />
                
                <path d="M0 28 h11 v7 h-6 v-4 h2.6" fill="none" stroke="#FDE68A" strokeWidth="0.45" opacity="0.55" /><path d="M20 28 h11 v7 h-6 v-4 h2.6" fill="none" stroke="#FDE68A" strokeWidth="0.45" opacity="0.55" /><path d="M40 28 h11 v7 h-6 v-4 h2.6" fill="none" stroke="#FDE68A" strokeWidth="0.45" opacity="0.55" /><path d="M60 28 h11 v7 h-6 v-4 h2.6" fill="none" stroke="#FDE68A" strokeWidth="0.45" opacity="0.55" /><path d="M80 28 h11 v7 h-6 v-4 h2.6" fill="none" stroke="#FDE68A" strokeWidth="0.45" opacity="0.55" /><path d="M100 28 h11 v7 h-6 v-4 h2.6" fill="none" stroke="#FDE68A" strokeWidth="0.45" opacity="0.55" /><path d="M120 28 h11 v7 h-6 v-4 h2.6" fill="none" stroke="#FDE68A" strokeWidth="0.45" opacity="0.55" /><path d="M140 28 h11 v7 h-6 v-4 h2.6" fill="none" stroke="#FDE68A" strokeWidth="0.45" opacity="0.55" /><path d="M160 28 h11 v7 h-6 v-4 h2.6" fill="none" stroke="#FDE68A" strokeWidth="0.45" opacity="0.55" /><path d="M180 28 h11 v7 h-6 v-4 h2.6" fill="none" stroke="#FDE68A" strokeWidth="0.45" opacity="0.55" /><path d="M200 28 h11 v7 h-6 v-4 h2.6" fill="none" stroke="#FDE68A" strokeWidth="0.45" opacity="0.55" /><path d="M220 28 h11 v7 h-6 v-4 h2.6" fill="none" stroke="#FDE68A" strokeWidth="0.45" opacity="0.55" /><path d="M240 28 h11 v7 h-6 v-4 h2.6" fill="none" stroke="#FDE68A" strokeWidth="0.45" opacity="0.55" /><path d="M260 28 h11 v7 h-6 v-4 h2.6" fill="none" stroke="#FDE68A" strokeWidth="0.45" opacity="0.55" /><path d="M280 28 h11 v7 h-6 v-4 h2.6" fill="none" stroke="#FDE68A" strokeWidth="0.45" opacity="0.55" /><path d="M300 28 h11 v7 h-6 v-4 h2.6" fill="none" stroke="#FDE68A" strokeWidth="0.45" opacity="0.55" /><path d="M320 28 h11 v7 h-6 v-4 h2.6" fill="none" stroke="#FDE68A" strokeWidth="0.45" opacity="0.55" />
                <path d="M0 40 C 60 33, 110 43, 170 36 C 230 29, 290 39, 340 33" fill="none" stroke="#B45309" strokeWidth="0.45" opacity="0.5" />
                <use href="#tfV4Medallion" transform="translate(170,31) scale(0.72)" />
              </g>
              <path d="M-8 28 C 44 24, 92 31, 140 27.4 C 190 24, 248 31, 348 26.4 L 348 30 C 248 34.6, 190 27.6, 140 31 C 92 34.6, 44 27.6, -8 31.6 Z" fill="url(#tfWoodGrad)" />
              <path d="M-8 29 C 44 25, 92 32, 140 28.4 C 190 25, 248 32, 348 27.4" stroke="#E8B48A" strokeWidth="0.5" opacity="0.4" fill="none" />
              <ellipse cx="170" cy="27.6" rx="1.5" ry="1" fill="#3F1A0B" stroke="#9A4B22" strokeWidth="0.3" />

              <use href="#tfMaiBloom" transform="translate(100,25) rotate(-8) scale(0.84)" />
              <use href="#tfDaoBloom" transform="translate(190,26) rotate(10) scale(0.82)" />
              <use href="#tfMaiBloom" transform="translate(280,24.6) rotate(-6) scale(0.86)" />
              <use href="#tfDaoBloom" transform="translate(140,33) rotate(14) scale(0.5)" />
              <use href="#tfMaiBloom" transform="translate(232,33.6) rotate(-12) scale(0.48)" />
              <use href="#tfBud" transform="translate(66,28.4) rotate(-22) scale(0.76)" />
              <use href="#tfBud" transform="translate(316,28) rotate(20) scale(0.7)" />

              <use href="#tfLeaf" transform="translate(166,29.4) rotate(-30) scale(0.9)" />
              <use href="#tfLeafDeep" transform="translate(212,30.4) rotate(24) scale(0.84)" />
              <use href="#tfLeaf" transform="translate(262,29) rotate(-36) scale(0.8)" />

              <use href="#tfEnvSmall" transform="translate(40,32) rotate(-10) scale(0.92)" />
              <use href="#tfCoin" transform="translate(250,34) scale(1.05)" />
              <path d="M300 26 C 306 28, 312 30, 316 34 M310 26 C 316 28, 322 31, 326 35" stroke="#8B5E3C" strokeWidth="0.55" fill="none" />
              <use href="#tfFirecracker" transform="translate(303,33) rotate(-6) scale(0.6)" />
              <use href="#tfFirecracker" transform="translate(312,35) rotate(8) scale(0.56)" />
              <use href="#tfFirecracker" transform="translate(321,36.4) rotate(-4) scale(0.52)" />
            </svg>
          </div>

          {/* Góc BL: phong bao lớn — thân gradient, nắp gấp, viền vàng đôi, 福 path, 2 tua, xu */}
          <div className="corner-ornament lucky-env-bottom-left">
            <svg viewBox="0 0 65 78" width="48" height="54">
              <g transform="rotate(-8 32 40)">
                <rect x="10" y="12" width="42" height="58" rx="4.4" fill="url(#tfEnvGrad)" />
                <rect x="10" y="12" width="42" height="58" rx="4.4" fill="none" stroke="#FDE68A" strokeWidth="1.1" />
                <rect x="13.4" y="15.4" width="35.2" height="51.2" rx="2.6" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.7" />
                <path d="M10 13.4 L31 32 L52 13.4" fill="url(#tfEnvDeepGrad)" opacity="0.55" />
                <path d="M10 13.4 L31 32 L52 13.4" fill="none" stroke="#FDE68A" strokeWidth="0.7" />
                <path d="M11.4 68 L31 50 L50.6 68" fill="#6B0F16" opacity="0.35" />
                <circle cx="31" cy="46" r="12.4" fill="#FEF3C7" opacity="0.14" />
                <use href="#tfFuGlyph" transform="translate(31,46) scale(1.45)" />
                <path d="M27 70 L27 76 M31 70 L31 78 M35 70 L35 76" stroke="#F59E0B" strokeWidth="1.1" strokeLinecap="round" />
                <path d="M31 70 L31 73" stroke="#B45309" strokeWidth="1.4" />
                <ellipse cx="20" cy="20" rx="3.4" ry="7" fill="#FCA5A5" opacity="0.25" transform="rotate(-20 20 20)" />
                <use href="#tfCoin" transform="translate(52,64) rotate(18) scale(0.9)" />
              </g>
            </svg>
          </div>

          {/* Góc TR: cành mai 3 bông + nụ + 2 lá (giữ class tet-branch-top-right) */}
          <div className="corner-ornament tet-branch-top-right">
            <svg viewBox="0 0 70 70" width="52" height="52">
              <path d="M4 58 C 16 46, 24 34, 30 22 C 33 16, 36 12, 40 8" stroke="url(#tfWoodGrad)" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              <path d="M28 26 C 34 22, 40 20, 46 20" stroke="url(#tfWoodGrad)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              <use href="#tfMaiBloom" transform="translate(32,20) rotate(-12) scale(1.15)" />
              <use href="#tfMaiBloom" transform="translate(46,19) rotate(16) scale(0.92)" />
              <use href="#tfMaiBloom" transform="translate(41,8) rotate(4) scale(0.8)" />
              <use href="#tfBud" transform="translate(30,31) rotate(-28) scale(0.9)" />
              <use href="#tfLeaf" transform="translate(22,36) rotate(-16) scale(1.15)" />
              <use href="#tfLeafDeep" transform="translate(36,30) rotate(30) scale(0.95)" />
            </svg>
          </div>

          {/* Góc TL: lồng đèn đỏ + 6 nan vàng + tua rua + glow */}
          <div className="corner-ornament tf-tl">
            <svg viewBox="0 0 50 70" width="50" height="70">
              <use href="#tfLantern" transform="translate(25,34) rotate(-4) scale(1.02)" />
              <path d="M25 4 L25 11" stroke="#8B5E3C" strokeWidth="0.8" />
            </svg>
          </div>

          {/* Góc BR: 2 phong bao xếp + đồng xu (ink x ≥ 330) */}
          <div className="corner-ornament tf-br">
            <svg viewBox="0 0 50 48" width="50" height="48">
              <g transform="translate(26,26) rotate(-12)">
                <rect x="-8" y="-13" width="17" height="26" rx="2" fill="url(#tfEnvDeepGrad)" />
                <rect x="-8" y="-13" width="17" height="26" rx="2" fill="none" stroke="#FDE68A" strokeWidth="0.7" />
                <path d="M-8 -12 L0.6 -4 L9 -12" stroke="#FDE68A" strokeWidth="0.55" fill="none" opacity="0.85" />
                <use href="#tfFuGlyph" transform="translate(0.6,4) scale(0.72)" />
              </g>
              <g transform="translate(17,24) rotate(10)">
                <rect x="-7" y="-11.4" width="15" height="23" rx="2" fill="url(#tfEnvGrad)" />
                <rect x="-7" y="-11.4" width="15" height="23" rx="2" fill="none" stroke="#FDE68A" strokeWidth="0.6" />
                <path d="M-7 -10.6 L0.6 -3.4 L8 -10.6" stroke="#FDE68A" strokeWidth="0.5" fill="none" opacity="0.85" />
                <use href="#tfFuGlyph" transform="translate(0.6,3.4) scale(0.64)" />
              </g>
              <use href="#tfCoin" transform="translate(37,38) rotate(16) scale(0.85)" />
            </svg>
          </div>

          {/* Cánh đào rơi (HTML): 3 span mép hai bên */}
          {[
            { left: "7%", delay: "0s", dur: "13s" },
            { left: "10.5%", delay: "3.2s", dur: "14.5s" },
            { left: "8.5%", delay: "6.4s", dur: "12.5s" },
            { left: "89%", delay: "4.5s", dur: "15s" },
            { left: "93.5%", delay: "8s", dur: "12s" },
          ].map((p, i) => (
            <span key={`tf-petal-fall-${i}`} className="tf-petal-fall" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur }}>
              <svg viewBox="0 0 12 11" width="12" height="11" aria-hidden="true">
                <path d="M6 0.8 C 9.4 -0.6, 11.6 2.2, 10.4 5 C 9.6 7.8, 7.4 10.2, 6 9 C 4.6 10.2, 2.4 7.8, 1.6 5 C 0.4 2.2, 2.6 -0.6, 6 0.8 Z" fill="url(#tfDaoGrad)" />
                <path d="M6 8.6 C 5.6 6.2, 5.8 4, 6 1.6" stroke="#F43F5E" strokeWidth="0.4" opacity="0.55" fill="none" />
              </svg>
            </span>
          ))}
        </div>
      )}

      {/* ─── 2C. TẾT DƯƠNG LỊCH: "Đêm Countdown Rực Rỡ" — swag ruy-băng,
          bauble facet, đồng hồ 11:59, champagne flute, star 4 góc ─── */}
      {isSpring && currentFestive === "newyear" && (
        <div className="wrapped-frame spring-newyear-frame">
          <FrameAmbient tone="newyear" />
          <ParticleField kind="confetti" count={4} />
          {/* Mép trên: swag ruy-băng filled + bauble/star facet + đồng hồ 11:59 */}
          <div className="frame-border-top blossom-border-top">
            <svg viewBox="0 0 340 38" preserveAspectRatio="none" className="blossom-top-svg">
              <defs>
                <linearGradient id="nyfGoldGrad" x1="8%" y1="0%" x2="92%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFF7" />
                  <stop offset="34%" stopColor="#FFF7D6" />
                  <stop offset="68%" stopColor="#F4C430" />
                  <stop offset="100%" stopColor="#D4A017" />
                </linearGradient>
                <linearGradient id="nyfGoldDeepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E8B92A" />
                  <stop offset="55%" stopColor="#C9971A" />
                  <stop offset="100%" stopColor="#8A6410" />
                </linearGradient>
                <linearGradient id="nyfSilverGrad" x1="10%" y1="0%" x2="90%" y2="100%">
                  <stop offset="0%" stopColor="#F8FAFC" />
                  <stop offset="45%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#94A3B8" />
                </linearGradient>
                <linearGradient id="nyfChampagneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDF6E3" />
                  <stop offset="55%" stopColor="#F0DFA8" />
                  <stop offset="100%" stopColor="#D9BC6A" />
                </linearGradient>
                <linearGradient id="nyfGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="55%" stopColor="#E0F2FE" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.75" />
                </linearGradient>
                <linearGradient id="nyfClockFaceGrad" x1="20%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFF7" />
                  <stop offset="60%" stopColor="#FDF6E3" />
                  <stop offset="100%" stopColor="#E8D8A8" />
                </linearGradient>
                <linearGradient id="nyfStarFacetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF7D6" />
                  <stop offset="52%" stopColor="#F4C430" />
                  <stop offset="100%" stopColor="#A8790B" />
                </linearGradient>
                <linearGradient id="nyfIceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F0F9FF" />
                  <stop offset="55%" stopColor="#BAE6FD" />
                  <stop offset="100%" stopColor="#7DD3FC" />
                </linearGradient>
                <radialGradient id="nyfGlowGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF7D6" stopOpacity="0.6" />
                  <stop offset="70%" stopColor="#F4C430" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#F4C430" stopOpacity="0" />
                </radialGradient>

                {/* Template: ngôi sao 5 cánh 2 tầng facet */}
                <g id="nyfStar5">
                  <path d="M0 -9 L2.6 -2.8 L9 -2.6 L4.1 1.4 L5.7 8 L0 4.6 L-5.7 8 L-4.1 1.4 L-9 -2.6 L-2.6 -2.8 Z" fill="url(#nyfGoldGrad)" />
                  <path d="M0 -9 L0 4.6 L-5.7 8 L-4.1 1.4 L-9 -2.6 L-2.6 -2.8 Z" fill="url(#nyfGoldDeepGrad)" opacity="0.5" />
                  <path d="M0 -9 L2.6 -2.8 L0 0 Z" fill="#FFFFF7" opacity="0.75" />
                  <circle r="1.5" fill="#FFFFF7" opacity="0.9" />
                </g>
                {/* Template: star 6 cánh (góc TR) */}
                <g id="nyfStar6">
                  <path d="M0 -14 L3.6 -6.4 L12.1 -5.3 L5.8 1.6 L7.4 10.8 L0 6.4 L-7.4 10.8 L-5.8 1.6 L-12.1 -5.3 L-3.6 -6.4 Z" fill="url(#nyfGoldGrad)" />
                  <path d="M0 -14 L0 6.4 L-7.4 10.8 L-5.8 1.6 L-12.1 -5.3 L-3.6 -6.4 Z" fill="url(#nyfGoldDeepGrad)" opacity="0.45" />
                  <circle r="2.4" fill="#FFFFF7" />
                  <circle r="1" fill="#F4C430" />
                </g>
                {/* Template: bauble facet */}
                <g id="nyfBauble">
                  <path d="M0 -8.4 L0 -5.8" stroke="#A8790B" strokeWidth="0.6" />
                  <path d="M-1.7 -6 L1.7 -6 L1.2 -4.3 L-1.2 -4.3 Z" fill="url(#nyfGoldGrad)" />
                  <circle cx="0" cy="0.3" r="4.7" fill="url(#nyfGoldGrad)" />
                  <path d="M-3.6 -1.6 L0 -3.8 L3.6 -1.6 L2.4 2.6 L-2.4 2.6 Z" fill="#FFFFF7" opacity="0.28" />
                  <path d="M-3.2 -1.8 C -2 2.2, 2 2.2, 3.2 -1.8" stroke="#FFFFF7" strokeWidth="0.55" opacity="0.6" fill="none" />
                  <ellipse cx="-1.6" cy="-1.6" rx="1.1" ry="1.8" fill="#FFFFF7" opacity="0.8" transform="rotate(-24 -1.6 -1.6)" />
                </g>
                {/* Template: mặt đồng hồ countdown */}
                <g id="nyfClock">
                  <circle r="9.8" fill="url(#nyfGoldDeepGrad)" />
                  <circle r="8.4" fill="url(#nyfClockFaceGrad)" />
                  <circle r="8.4" fill="none" stroke="#B8860B" strokeWidth="0.45" />
                  <g stroke="#8A6410" strokeWidth="0.4" strokeLinecap="round">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <path key={`nyf-tick-${i}`} d="M0 -7.2 L0 -6.2" transform={`rotate(${i * 30})`} opacity={i % 3 === 0 ? 0.95 : 0.55} />
                    ))}
                  </g>
                  <path d="M0 0 L0 -5.6" stroke="#8A6410" strokeWidth="0.8" strokeLinecap="round" />
                  <path d="M0 0 L-2.2 -2.2" stroke="#8A6410" strokeWidth="1" strokeLinecap="round" />
                  <circle r="0.9" fill="#8A6410" />
                  <path d="M0 -9.8 L -1.8 -13.4 L 1.8 -13.4 Z" fill="url(#nyfGoldGrad)" opacity="0.9" />
                </g>
                {/* Template: champagne flute */}
                <g id="nyfFlute">
                  <path d="M-2.6 -10 C -2.6 -6, -1.8 -3.4, 0 -2.4 C 1.8 -3.4, 2.6 -6, 2.6 -10 Z" fill="url(#nyfGlassGrad)" />
                  <path d="M-2.2 -9.4 C -2.2 -6.4, -1.6 -4.4, 0 -3.5 C 1.6 -4.4, 2.2 -6.4, 2.2 -9.4 Z" fill="url(#nyfChampagneGrad)" opacity="0.9" />
                  <ellipse cx="0" cy="-9.4" rx="2.3" ry="0.6" fill="#FFFFF7" opacity="0.55" />
                  <path d="M0 -2.4 L0 8" stroke="#CBD5E1" strokeWidth="0.7" />
                  <ellipse cx="0" cy="8.6" rx="2.3" ry="0.9" fill="#E2E8F0" opacity="0.9" />
                  <path d="M-2.5 -8.6 C -2.7 -6, -2.4 -4, -1.6 -3.2" stroke="#FFFFFF" strokeWidth="0.4" opacity="0.8" fill="none" />
                  <circle cx="0.4" cy="-6.4" r="0.3" fill="#FFFFF7" />
                </g>
                {/* Template: chai champagne */}
                <g id="nyfBottle">
                  <path d="M-2.6 -8 L2.6 -8 L2.6 -3.6 C 4 -3, 5.2 -1.4, 5.2 0.6 L 5.2 14 C 5.2 15.4, 4.4 16, 3 16 L -3 16 C -4.4 16, -5.2 15.4, -5.2 14 L -5.2 0.6 C -5.2 -1.4, -4 -3, -2.6 -3.6 Z" fill="url(#nyfChampagneGrad)" />
                  <path d="M-2.9 -3.8 C -4.2 -3, -4.6 -1.2, -4.6 0.6 L -4.6 14" stroke="#FFF7D6" strokeWidth="0.55" opacity="0.7" fill="none" />
                  <rect x="-2.6" y="-9.6" width="5.2" height="2.2" rx="0.6" fill="url(#nyfGoldGrad)" />
                  <rect x="-3.4" y="3.2" width="6.8" height="5.4" rx="0.6" fill="#FFFFF7" opacity="0.92" />
                  <path d="M-1.8 4.6 L1.8 4.6 M-1.8 6 L1.2 6" stroke="#B8860B" strokeWidth="0.35" opacity="0.65" />
                  <circle cx="0" cy="7.6" r="0.6" fill="#D4A017" opacity="0.8" />
                  <ellipse cx="-2.4" cy="8" rx="0.6" ry="3.4" fill="#FFFFF7" opacity="0.4" />
                </g>
                {/* Template: kèn party */}
                <g id="nyfHorn">
                  <path d="M-8 6 L7 -3 C 10 -1.4, 10 2.8, 7 4.2 L -7 11 Z" fill="url(#nyfGoldGrad)" />
                  <path d="M-7 11 L-8 6 L-2 7.4 L-1 12.6 Z" fill="url(#nyfGoldDeepGrad)" />
                  <path d="M-8 6 L-11 4 L-10 8.4 L-7 11" stroke="#D4A017" strokeWidth="0.7" fill="none" />
                  <path d="M7 -3 C 10 -1.4, 10 2.8, 7 4.2" stroke="#FFF7D6" strokeWidth="0.5" opacity="0.8" fill="none" />
                  <path d="M1 -6 C 4 -9, 7 -9.6, 10 -8" stroke="#E11D48" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                  <path d="M-1 -6.4 C 0 -10, 2 -12, 4 -13" stroke="#94A3B8" strokeWidth="0.7" fill="none" strokeLinecap="round" />
                </g>
                <g id="nyfConfetti">
                  <rect x="-1.4" y="-0.7" width="2.8" height="1.4" rx="0.4" fill="#F4C430" />
                </g>
              
                <linearGradient id="nyfV4Relief" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1F2937" />
                  <stop offset="46%" stopColor="#4B5563" />
                  <stop offset="100%" stopColor="#FDE68A" />
                </linearGradient>
                <linearGradient id="nyfV4RimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFF7" />
                  <stop offset="50%" stopColor="#F4C430" />
                  <stop offset="100%" stopColor="#78350F" />
                </linearGradient>
                <radialGradient id="nyfV4MedalGrad" cx="46%" cy="38%" r="62%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#FDE68A" />
                  <stop offset="78%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#78350F" />
                </radialGradient>
                <g id="nyfV4Medallion">
                  <circle r="9.6" fill="none" stroke="url(#nyfV4RimGrad)" strokeWidth="1.5" />
                  <path d="M0 -11.4 l1 2.6 l-1 2.6 l-1 -2.6 z" fill="#FFF7C2" opacity="0.8" transform="rotate(0)" /><path d="M0 -11.4 l1 2.6 l-1 2.6 l-1 -2.6 z" fill="#FFF7C2" opacity="0.8" transform="rotate(22.5)" /><path d="M0 -11.4 l1 2.6 l-1 2.6 l-1 -2.6 z" fill="#FFF7C2" opacity="0.8" transform="rotate(45)" /><path d="M0 -11.4 l1 2.6 l-1 2.6 l-1 -2.6 z" fill="#FFF7C2" opacity="0.8" transform="rotate(67.5)" /><path d="M0 -11.4 l1 2.6 l-1 2.6 l-1 -2.6 z" fill="#FFF7C2" opacity="0.8" transform="rotate(90)" /><path d="M0 -11.4 l1 2.6 l-1 2.6 l-1 -2.6 z" fill="#FFF7C2" opacity="0.8" transform="rotate(112.5)" /><path d="M0 -11.4 l1 2.6 l-1 2.6 l-1 -2.6 z" fill="#FFF7C2" opacity="0.8" transform="rotate(135)" /><path d="M0 -11.4 l1 2.6 l-1 2.6 l-1 -2.6 z" fill="#FFF7C2" opacity="0.8" transform="rotate(157.5)" /><path d="M0 -11.4 l1 2.6 l-1 2.6 l-1 -2.6 z" fill="#FFF7C2" opacity="0.8" transform="rotate(180)" /><path d="M0 -11.4 l1 2.6 l-1 2.6 l-1 -2.6 z" fill="#FFF7C2" opacity="0.8" transform="rotate(202.5)" /><path d="M0 -11.4 l1 2.6 l-1 2.6 l-1 -2.6 z" fill="#FFF7C2" opacity="0.8" transform="rotate(225)" /><path d="M0 -11.4 l1 2.6 l-1 2.6 l-1 -2.6 z" fill="#FFF7C2" opacity="0.8" transform="rotate(247.5)" /><path d="M0 -11.4 l1 2.6 l-1 2.6 l-1 -2.6 z" fill="#FFF7C2" opacity="0.8" transform="rotate(270)" /><path d="M0 -11.4 l1 2.6 l-1 2.6 l-1 -2.6 z" fill="#FFF7C2" opacity="0.8" transform="rotate(292.5)" /><path d="M0 -11.4 l1 2.6 l-1 2.6 l-1 -2.6 z" fill="#FFF7C2" opacity="0.8" transform="rotate(315)" /><path d="M0 -11.4 l1 2.6 l-1 2.6 l-1 -2.6 z" fill="#FFF7C2" opacity="0.8" transform="rotate(337.5)" />
                  <circle r="8" fill="url(#nyfV4MedalGrad)" opacity="0.92" />
                  <path d="M0 -7.4 L0 -2.8" stroke="#7C2D12" strokeWidth="0.55" opacity="0.65" transform="rotate(0)" /><path d="M0 -7.4 L0 -2.8" stroke="#7C2D12" strokeWidth="0.55" opacity="0.65" transform="rotate(30)" /><path d="M0 -7.4 L0 -2.8" stroke="#7C2D12" strokeWidth="0.55" opacity="0.65" transform="rotate(60)" /><path d="M0 -7.4 L0 -2.8" stroke="#7C2D12" strokeWidth="0.55" opacity="0.65" transform="rotate(90)" /><path d="M0 -7.4 L0 -2.8" stroke="#7C2D12" strokeWidth="0.55" opacity="0.65" transform="rotate(120)" /><path d="M0 -7.4 L0 -2.8" stroke="#7C2D12" strokeWidth="0.55" opacity="0.65" transform="rotate(150)" /><path d="M0 -7.4 L0 -2.8" stroke="#7C2D12" strokeWidth="0.55" opacity="0.65" transform="rotate(180)" /><path d="M0 -7.4 L0 -2.8" stroke="#7C2D12" strokeWidth="0.55" opacity="0.65" transform="rotate(210)" /><path d="M0 -7.4 L0 -2.8" stroke="#7C2D12" strokeWidth="0.55" opacity="0.65" transform="rotate(240)" /><path d="M0 -7.4 L0 -2.8" stroke="#7C2D12" strokeWidth="0.55" opacity="0.65" transform="rotate(270)" /><path d="M0 -7.4 L0 -2.8" stroke="#7C2D12" strokeWidth="0.55" opacity="0.65" transform="rotate(300)" /><path d="M0 -7.4 L0 -2.8" stroke="#7C2D12" strokeWidth="0.55" opacity="0.65" transform="rotate(330)" />
                  <circle r="3" fill="#FFFDF0" />
                  <circle r="1.6" fill="#D4AF37" />
                  <path d="M-8 5.4 A 9.6 9.6 0 0 0 8 5.4" fill="none" stroke="#78350F" strokeWidth="0.9" opacity="0.4" />
                </g>
              </defs>

              {/* Dây bạc phía sau */}
              <path d="M-8 12.4 C 30 16, 60 12.4, 90 12.8 C 120 13.2, 146 20, 170 20.6 C 194 20, 220 13.2, 250 12.8 C 280 12.4, 310 16, 348 12.4" stroke="url(#nyfSilverGrad)" strokeWidth="0.9" fill="none" opacity="0.75" />

              {/* Swag ruy-băng vàng filled (nhóm sway rất nhẹ) */}
              <g className="nyf-sway">
                <path d="M-8 10.4 C 6 14.4, 14 15.8, 20 16.4 C 48 18.4, 62 11.8, 90 12.4 C 118 13, 144 20.8, 170 21.4 C 196 20.8, 226 13, 250 12.4 C 278 11.8, 292 16.4, 320 16.4 C 330 16.4, 340 13.8, 348 12 L 348 16 C 338 18, 328 20.2, 320 20.2 C 290 20.2, 278 15.6, 250 16.2 C 224 16.8, 196 24.8, 170 25.4 C 144 24.8, 116 16.8, 90 16.2 C 62 15.6, 50 20.2, 20 20.2 C 14 20.2, 4 18.8, -8 14.6 Z" fill="url(#nyfGoldGrad)" />
                <path d="M-8 11.4 C 20 17.4, 60 13.4, 90 13.8 C 120 14.2, 146 21.4, 170 22 C 194 21.4, 220 14.2, 250 13.8 C 280 13.4, 320 17.4, 348 13.4" stroke="#FFFFF7" strokeWidth="0.5" opacity="0.65" fill="none" />
                <path d="M-8 14.6 C 20 20.4, 62 16, 90 16.6 C 120 17.2, 146 24, 170 24.6 C 194 24, 220 17.2, 250 16.6 C 280 16, 322 20.4, 348 15.6" stroke="#B8860B" strokeWidth="0.45" opacity="0.5" fill="none" />
              </g>

              {/* Điểm treo: bauble 20/320, star 90/250, đồng hồ 170 */}
              <path d="M20 18 L20 22.6 M90 14 L90 18 M250 14 L250 18 M320 18 L320 22.6" stroke="#B8860B" strokeWidth="0.45" />
              <use href="#nyfBauble" transform="translate(20,27.4) scale(0.88)" />
              <use href="#nyfStar5" transform="translate(90,24.4) scale(1.15)" className="nyf-twinkle" style={{ animationDelay: "0.3s" }} />
              <use href="#nyfStar5" transform="translate(250,24.4) scale(-1.15,1.15)" className="nyf-twinkle" style={{ animationDelay: "0.6s" }} />
              <use href="#nyfBauble" transform="translate(320,27.4) scale(-0.88,0.88)" />

              <use href="#nyfClock" transform="translate(170,25) scale(0.94)" />

              {/* 2 nơ hai đầu swag */}
              <g transform="translate(9,17.4) rotate(-14)">
                <path d="M0 0 C -5 -4.4, -11 -3.4, -10 0.6 C -9 4, -3 3, 0 0 Z" fill="url(#nyfGoldGrad)" />
                <path d="M0 0 C 1.4 -4.8, 6.6 -7, 8 -3.4 C 9.2 0, 3 2, 0 0 Z" fill="url(#nyfGoldDeepGrad)" />
                <circle r="1.7" fill="#FFFFF7" />
              </g>
              <g transform="translate(331,17.4) rotate(14)">
                <path d="M0 0 C 5 -4.4, 11 -3.4, 10 0.6 C 9 4, 3 3, 0 0 Z" fill="url(#nyfGoldGrad)" />
                <path d="M0 0 C -1.4 -4.8, -6.6 -7, -8 -3.4 C -9.2 0, -3 2, 0 0 Z" fill="url(#nyfGoldDeepGrad)" />
                <circle r="1.7" fill="#FFFFF7" />
              </g>

              {/* 3 confetti tick nhỏ trên swag */}
              <g className="nyf-twinkle" style={{ animationDelay: "0.9s" }}>
                <rect x="138" y="6.4" width="2.6" height="1.2" rx="0.4" fill="#F4C430" transform="rotate(-24 139.3 7)" />
                <rect x="196" y="8.6" width="2.4" height="1.1" rx="0.4" fill="#E2E8F0" transform="rotate(32 197.2 9.1)" />
                <rect x="264" y="6.8" width="2.2" height="1" rx="0.4" fill="#BAE6FD" transform="rotate(18 265.1 7.3)" />
              </g>
            
              {/* V4 — art-deco ray, guilloche, viền kép, hạt cườm, huy hiệu mặt trời */}
              <g>
                <path d="M6 0 L9 13 L3 13 Z" fill="#FDE68A" opacity="0.18" /><path d="M17 0 L20 13 L14 13 Z" fill="#FDE68A" opacity="0.27" /><path d="M28 0 L31 13 L25 13 Z" fill="#FDE68A" opacity="0.36" /><path d="M39 0 L42 13 L36 13 Z" fill="#FDE68A" opacity="0.18" /><path d="M50 0 L53 13 L47 13 Z" fill="#FDE68A" opacity="0.27" /><path d="M61 0 L64 13 L58 13 Z" fill="#FDE68A" opacity="0.36" /><path d="M72 0 L75 13 L69 13 Z" fill="#FDE68A" opacity="0.18" /><path d="M83 0 L86 13 L80 13 Z" fill="#FDE68A" opacity="0.27" /><path d="M94 0 L97 13 L91 13 Z" fill="#FDE68A" opacity="0.36" /><path d="M105 0 L108 13 L102 13 Z" fill="#FDE68A" opacity="0.18" /><path d="M116 0 L119 13 L113 13 Z" fill="#FDE68A" opacity="0.27" /><path d="M127 0 L130 13 L124 13 Z" fill="#FDE68A" opacity="0.36" /><path d="M138 0 L141 13 L135 13 Z" fill="#FDE68A" opacity="0.18" /><path d="M149 0 L152 13 L146 13 Z" fill="#FDE68A" opacity="0.27" /><path d="M160 0 L163 13 L157 13 Z" fill="#FDE68A" opacity="0.36" /><path d="M171 0 L174 13 L168 13 Z" fill="#FDE68A" opacity="0.18" /><path d="M182 0 L185 13 L179 13 Z" fill="#FDE68A" opacity="0.27" /><path d="M193 0 L196 13 L190 13 Z" fill="#FDE68A" opacity="0.36" /><path d="M204 0 L207 13 L201 13 Z" fill="#FDE68A" opacity="0.18" /><path d="M215 0 L218 13 L212 13 Z" fill="#FDE68A" opacity="0.27" /><path d="M226 0 L229 13 L223 13 Z" fill="#FDE68A" opacity="0.36" /><path d="M237 0 L240 13 L234 13 Z" fill="#FDE68A" opacity="0.18" /><path d="M248 0 L251 13 L245 13 Z" fill="#FDE68A" opacity="0.27" /><path d="M259 0 L262 13 L256 13 Z" fill="#FDE68A" opacity="0.36" /><path d="M270 0 L273 13 L267 13 Z" fill="#FDE68A" opacity="0.18" /><path d="M281 0 L284 13 L278 13 Z" fill="#FDE68A" opacity="0.27" /><path d="M292 0 L295 13 L289 13 Z" fill="#FDE68A" opacity="0.36" /><path d="M303 0 L306 13 L300 13 Z" fill="#FDE68A" opacity="0.18" /><path d="M314 0 L317 13 L311 13 Z" fill="#FDE68A" opacity="0.27" /><path d="M325 0 L328 13 L322 13 Z" fill="#FDE68A" opacity="0.36" />
                <path d="M0 17 C 72 12, 116 20, 170 15 C 224 10, 268 18, 340 13" fill="none" stroke="#FDE68A" strokeWidth="0.5" opacity="0.45" />
                <circle cx="10" cy="10" r="5.4" fill="none" stroke="#FFF7C2" strokeWidth="0.4" opacity="0.45" /><circle cx="10" cy="10" r="3" fill="none" stroke="#F4C430" strokeWidth="0.35" opacity="0.4" /><circle cx="30" cy="10" r="5.4" fill="none" stroke="#FFF7C2" strokeWidth="0.4" opacity="0.45" /><circle cx="30" cy="10" r="3" fill="none" stroke="#F4C430" strokeWidth="0.35" opacity="0.4" /><circle cx="50" cy="10" r="5.4" fill="none" stroke="#FFF7C2" strokeWidth="0.4" opacity="0.45" /><circle cx="50" cy="10" r="3" fill="none" stroke="#F4C430" strokeWidth="0.35" opacity="0.4" /><circle cx="70" cy="10" r="5.4" fill="none" stroke="#FFF7C2" strokeWidth="0.4" opacity="0.45" /><circle cx="70" cy="10" r="3" fill="none" stroke="#F4C430" strokeWidth="0.35" opacity="0.4" /><circle cx="90" cy="10" r="5.4" fill="none" stroke="#FFF7C2" strokeWidth="0.4" opacity="0.45" /><circle cx="90" cy="10" r="3" fill="none" stroke="#F4C430" strokeWidth="0.35" opacity="0.4" /><circle cx="110" cy="10" r="5.4" fill="none" stroke="#FFF7C2" strokeWidth="0.4" opacity="0.45" /><circle cx="110" cy="10" r="3" fill="none" stroke="#F4C430" strokeWidth="0.35" opacity="0.4" /><circle cx="130" cy="10" r="5.4" fill="none" stroke="#FFF7C2" strokeWidth="0.4" opacity="0.45" /><circle cx="130" cy="10" r="3" fill="none" stroke="#F4C430" strokeWidth="0.35" opacity="0.4" /><circle cx="150" cy="10" r="5.4" fill="none" stroke="#FFF7C2" strokeWidth="0.4" opacity="0.45" /><circle cx="150" cy="10" r="3" fill="none" stroke="#F4C430" strokeWidth="0.35" opacity="0.4" /><circle cx="170" cy="10" r="5.4" fill="none" stroke="#FFF7C2" strokeWidth="0.4" opacity="0.45" /><circle cx="170" cy="10" r="3" fill="none" stroke="#F4C430" strokeWidth="0.35" opacity="0.4" /><circle cx="190" cy="10" r="5.4" fill="none" stroke="#FFF7C2" strokeWidth="0.4" opacity="0.45" /><circle cx="190" cy="10" r="3" fill="none" stroke="#F4C430" strokeWidth="0.35" opacity="0.4" /><circle cx="210" cy="10" r="5.4" fill="none" stroke="#FFF7C2" strokeWidth="0.4" opacity="0.45" /><circle cx="210" cy="10" r="3" fill="none" stroke="#F4C430" strokeWidth="0.35" opacity="0.4" /><circle cx="230" cy="10" r="5.4" fill="none" stroke="#FFF7C2" strokeWidth="0.4" opacity="0.45" /><circle cx="230" cy="10" r="3" fill="none" stroke="#F4C430" strokeWidth="0.35" opacity="0.4" /><circle cx="250" cy="10" r="5.4" fill="none" stroke="#FFF7C2" strokeWidth="0.4" opacity="0.45" /><circle cx="250" cy="10" r="3" fill="none" stroke="#F4C430" strokeWidth="0.35" opacity="0.4" /><circle cx="270" cy="10" r="5.4" fill="none" stroke="#FFF7C2" strokeWidth="0.4" opacity="0.45" /><circle cx="270" cy="10" r="3" fill="none" stroke="#F4C430" strokeWidth="0.35" opacity="0.4" /><circle cx="290" cy="10" r="5.4" fill="none" stroke="#FFF7C2" strokeWidth="0.4" opacity="0.45" /><circle cx="290" cy="10" r="3" fill="none" stroke="#F4C430" strokeWidth="0.35" opacity="0.4" /><circle cx="310" cy="10" r="5.4" fill="none" stroke="#FFF7C2" strokeWidth="0.4" opacity="0.45" /><circle cx="310" cy="10" r="3" fill="none" stroke="#F4C430" strokeWidth="0.35" opacity="0.4" /><circle cx="330" cy="10" r="5.4" fill="none" stroke="#FFF7C2" strokeWidth="0.4" opacity="0.45" /><circle cx="330" cy="10" r="3" fill="none" stroke="#F4C430" strokeWidth="0.35" opacity="0.4" />
                <path d="M0 3 H340" stroke="url(#nyfV4RimGrad)" strokeWidth="1.1" opacity="0.62" />
                <path d="M0 5.6 H340" stroke="#FFFFF7" strokeWidth="0.45" opacity="0.42" />
                <circle cx="10" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="22" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="34" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="46" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="58" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="70" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="82" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="94" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="106" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="118" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="130" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="142" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="154" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="166" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="178" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="190" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="202" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="214" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="226" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="238" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="250" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="262" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="274" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="286" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="298" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="310" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="322" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                <circle cx="334" cy="5.6" r="0.8" fill="#FFF7C2" opacity="0.68" />
                
                <use href="#nyfV4Medallion" transform="translate(206,17.6) scale(0.74)" />
                <path d="M16 8 l-4 -4 m4 4 l-4 4 m-4 -4 h8" stroke="#FDE68A" strokeWidth="0.5" opacity="0.6" />
                <path d="M324 8 l4 -4 m-4 4 l4 4 m-4 -4 h-8" stroke="#FDE68A" strokeWidth="0.5" opacity="0.6" />
              </g>
            </svg>
          </div>

          {/* Cạnh trái: ruy-băng dọc + 7 star/bauble so le + tinsel chấm */}
          <div className="frame-border-side border-left blossom-border-left">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="blossom-side-svg">
              <g>
                <path d="M1.2 0 V460" stroke="url(#nyfV4RimGrad)" strokeWidth="0.9" opacity="0.5" />
                <path d="M4.2 0 V460" stroke="#FFFFF7" strokeWidth="0.35" opacity="0.28" />
                <path d="M14.2 0 V460" stroke="#D4AF37" strokeWidth="0.4" opacity="0.5" strokeDasharray="1 5" />
                <path d="M3 0 V11" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 20 V31" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 40 V51" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 60 V71" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 80 V91" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 100 V111" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 120 V131" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 140 V151" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 160 V171" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 180 V191" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 200 V211" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 220 V231" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 240 V251" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 260 V271" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 280 V291" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 300 V311" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 320 V331" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 340 V351" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 360 V371" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 380 V391" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 400 V411" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 420 V431" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 440 V451" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" />
                <path d="M10 8 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 48 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 88 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 128 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 168 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 208 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 248 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 288 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 328 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 368 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 408 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" />
                <circle cx="10.5" cy="10" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="36" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="62" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="88" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="114" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="140" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="166" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="192" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="218" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="244" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="270" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="296" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="322" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="348" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="374" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="400" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="426" r="0.7" fill="#FFF7C2" opacity="0.55" />
                
              </g>
              <path d="M0 0 L5.4 0 C 4.4 80, 6 160, 4.6 240 C 3.4 320, 5.2 400, 4 460 L0 460 Z" fill="#D4A017" opacity="0.12" />
              <path d="M11 -4 C 8 80, 20 150, 13.6 230 C 8.4 298, 19.4 380, 14 464 L 18.6 464 C 24.4 380, 13.6 298, 18.8 230 C 24.8 150, 12.8 80, 15.6 -4 Z" fill="url(#nyfGoldGrad)" />
              <path d="M12.2 -4 C 9.2 80, 21.2 150, 14.8 230 C 9.6 298, 20.6 380, 15.2 464" stroke="#FFFFF7" strokeWidth="0.5" opacity="0.6" fill="none" />
              {Array.from({ length: 14 }).map((_, i) => (
                <circle key={`nyf-tinsel-l-${i}`} cx={i % 2 === 0 ? 5.4 : 24.6} cy={i * 33 + 12} r={i % 3 === 0 ? 0.9 : 0.6} fill="#E2E8F0" opacity={i % 3 === 0 ? 0.9 : 0.55} />
              ))}

              <path d="M14 26 L14 30 M14 90 L14 94 M15 154 L15 158 M13 218 L13 222 M15 282 L15 286 M14 346 L14 350 M15 410 L15 414" stroke="#B8860B" strokeWidth="0.45" />
              <use href="#nyfBauble" transform="translate(14,36) scale(0.8)" className="nyf-twinkle" style={{ animationDelay: "0s" }} />
              <use href="#nyfStar5" transform="translate(14,100) scale(0.86)" className="nyf-twinkle" style={{ animationDelay: "0.3s" }} />
              <use href="#nyfStar5" transform="translate(14,164) scale(-0.72,0.72)" className="nyf-twinkle" style={{ animationDelay: "0.6s" }} />
              <use href="#nyfBauble" transform="translate(14,228) scale(0.86)" className="nyf-twinkle" style={{ animationDelay: "0.9s" }} />
              <use href="#nyfStar5" transform="translate(14,292) scale(0.78)" className="nyf-twinkle" style={{ animationDelay: "0.45s" }} />
              <use href="#nyfBauble" transform="translate(14,356) scale(-0.74,0.74)" className="nyf-twinkle" style={{ animationDelay: "0.15s" }} />
              <use href="#nyfStar5" transform="translate(14,420) scale(0.8)" className="nyf-twinkle" style={{ animationDelay: "0.75s" }} />
            </svg>
          </div>

          {/* Cạnh phải: phase lệch + chuỗi 3 bong bóng champagne y240–300 */}
          <div className="frame-border-side border-right blossom-border-right">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="blossom-side-svg">
              <g>
                <path d="M1.2 0 V460" stroke="url(#nyfV4RimGrad)" strokeWidth="0.9" opacity="0.5" />
                <path d="M4.2 0 V460" stroke="#FFFFF7" strokeWidth="0.35" opacity="0.28" />
                <path d="M14.2 0 V460" stroke="#D4AF37" strokeWidth="0.4" opacity="0.5" strokeDasharray="1 5" />
                <path d="M3 0 V11" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 20 V31" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 40 V51" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 60 V71" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 80 V91" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 100 V111" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 120 V131" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 140 V151" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 160 V171" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 180 V191" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 200 V211" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 220 V231" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 240 V251" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 260 V271" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 280 V291" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 300 V311" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 320 V331" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 340 V351" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 360 V371" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 380 V391" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 400 V411" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 420 V431" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" /><path d="M3 440 V451" stroke="#FDE68A" strokeWidth="0.45" opacity="0.4" />
                <path d="M10 8 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 48 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 88 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 128 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 168 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 208 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 248 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 288 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 328 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 368 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" /><path d="M10 408 l4 5 l-4 5 l-4 -5 z" fill="none" stroke="#FFF7C2" strokeWidth="0.45" opacity="0.5" />
                <circle cx="10.5" cy="10" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="36" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="62" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="88" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="114" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="140" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="166" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="192" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="218" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="244" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="270" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="296" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="322" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="348" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="374" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="400" r="0.7" fill="#FFF7C2" opacity="0.55" />
                <circle cx="10.5" cy="426" r="0.7" fill="#FFF7C2" opacity="0.55" />
                
              </g>
              <path d="M26.6 0 L32 0 L32 460 L28 460 C 29.2 400, 27.4 320, 28.6 240 C 30 160, 28.4 80, 26.6 0 Z" fill="#D4A017" opacity="0.12" />
              <path d="M21 -4 C 24 80, 12 150, 18.4 230 C 23.6 298, 12.6 380, 18 464 L 13.4 464 C 7.6 380, 18.4 298, 13.2 230 C 7.2 150, 19.2 80, 16.4 -4 Z" fill="url(#nyfGoldGrad)" />
              <path d="M19.8 -4 C 22.8 80, 10.8 150, 17.2 230 C 22.4 298, 11.4 380, 16.8 464" stroke="#FFFFF7" strokeWidth="0.5" opacity="0.6" fill="none" />
              {Array.from({ length: 14 }).map((_, i) => (
                <circle key={`nyf-tinsel-r-${i}`} cx={i % 2 === 0 ? 26.4 : 7.2} cy={i * 33 + 22} r={i % 3 === 1 ? 0.9 : 0.6} fill="#F4C430" opacity={i % 3 === 1 ? 0.9 : 0.55} />
              ))}

              <path d="M18 40 L18 44 M18 104 L18 108 M17 168 L17 172 M19 232 L19 236 M17 296 L17 300 M18 360 L18 364 M17 424 L17 428" stroke="#B8860B" strokeWidth="0.45" />
              <use href="#nyfStar5" transform="translate(18,50) scale(0.82)" className="nyf-twinkle" style={{ animationDelay: "0.2s" }} />
              <use href="#nyfBauble" transform="translate(18,114) scale(0.78)" className="nyf-twinkle" style={{ animationDelay: "0.5s" }} />
              <use href="#nyfBauble" transform="translate(18,178) scale(-0.8,0.8)" className="nyf-twinkle" style={{ animationDelay: "0.8s" }} />
              <use href="#nyfStar5" transform="translate(18,242) scale(0.84)" className="nyf-twinkle" style={{ animationDelay: "0.35s" }} />
              <use href="#nyfBauble" transform="translate(18,306) scale(0.76)" className="nyf-twinkle" style={{ animationDelay: "0.65s" }} />
              <use href="#nyfStar5" transform="translate(18,370) scale(-0.78,0.78)" className="nyf-twinkle" style={{ animationDelay: "0.05s" }} />
              <use href="#nyfBauble" transform="translate(18,434) scale(0.8)" className="nyf-twinkle" style={{ animationDelay: "0.95s" }} />

              <g className="nyf-bubble" style={{ animationDelay: "0s" }}>
                <circle cx="10" cy="252" r="3" fill="url(#nyfGlassGrad)" stroke="#FFFFFF" strokeWidth="0.35" />
                <circle cx="8.8" cy="250.6" r="0.7" fill="#FFFFFF" opacity="0.9" />
              </g>
              <g className="nyf-bubble" style={{ animationDelay: "2.4s" }}>
                <circle cx="12.4" cy="272" r="2.3" fill="url(#nyfGlassGrad)" stroke="#FFFFFF" strokeWidth="0.3" />
                <circle cx="11.6" cy="271" r="0.5" fill="#FFFFFF" opacity="0.9" />
              </g>
              <g className="nyf-bubble" style={{ animationDelay: "4.6s" }}>
                <circle cx="9.4" cy="292" r="1.7" fill="url(#nyfGlassGrad)" stroke="#FFFFFF" strokeWidth="0.3" />
              </g>
            </svg>
          </div>

          {/* Mép đáy: 2 swag + 3 star lớn + 2 flute + confetti */}
          <div className="frame-border-bottom blossom-border-bottom">
            <svg viewBox="0 0 340 44" preserveAspectRatio="none" className="blossom-bottom-svg">
              <g>
                <path d="M0 20.4 H340" stroke="url(#nyfV4RimGrad)" strokeWidth="1" />
                <path d="M0 23 H340" stroke="#FFFFF7" strokeWidth="0.4" opacity="0.7" />
                <circle cx="10" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="22" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="34" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="46" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="58" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="70" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="82" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="94" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="106" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="118" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="130" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="142" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="154" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="166" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="178" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="190" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="202" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="214" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="226" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="238" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="250" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="262" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="274" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="286" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="298" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="310" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="322" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                <circle cx="334" cy="23" r="0.75" fill="#FFF7C2" opacity="0.6" />
                
                <path d="M10 28 v12 m-3 -8 h6 m-6 4 h4" stroke="#FDE68A" strokeWidth="0.4" opacity="0.5" /><path d="M32 28 v12 m-3 -8 h6 m-6 4 h4" stroke="#FDE68A" strokeWidth="0.4" opacity="0.5" /><path d="M54 28 v12 m-3 -8 h6 m-6 4 h4" stroke="#FDE68A" strokeWidth="0.4" opacity="0.5" /><path d="M76 28 v12 m-3 -8 h6 m-6 4 h4" stroke="#FDE68A" strokeWidth="0.4" opacity="0.5" /><path d="M98 28 v12 m-3 -8 h6 m-6 4 h4" stroke="#FDE68A" strokeWidth="0.4" opacity="0.5" /><path d="M120 28 v12 m-3 -8 h6 m-6 4 h4" stroke="#FDE68A" strokeWidth="0.4" opacity="0.5" /><path d="M142 28 v12 m-3 -8 h6 m-6 4 h4" stroke="#FDE68A" strokeWidth="0.4" opacity="0.5" /><path d="M164 28 v12 m-3 -8 h6 m-6 4 h4" stroke="#FDE68A" strokeWidth="0.4" opacity="0.5" /><path d="M186 28 v12 m-3 -8 h6 m-6 4 h4" stroke="#FDE68A" strokeWidth="0.4" opacity="0.5" /><path d="M208 28 v12 m-3 -8 h6 m-6 4 h4" stroke="#FDE68A" strokeWidth="0.4" opacity="0.5" /><path d="M230 28 v12 m-3 -8 h6 m-6 4 h4" stroke="#FDE68A" strokeWidth="0.4" opacity="0.5" /><path d="M252 28 v12 m-3 -8 h6 m-6 4 h4" stroke="#FDE68A" strokeWidth="0.4" opacity="0.5" /><path d="M274 28 v12 m-3 -8 h6 m-6 4 h4" stroke="#FDE68A" strokeWidth="0.4" opacity="0.5" /><path d="M296 28 v12 m-3 -8 h6 m-6 4 h4" stroke="#FDE68A" strokeWidth="0.4" opacity="0.5" /><path d="M318 28 v12 m-3 -8 h6 m-6 4 h4" stroke="#FDE68A" strokeWidth="0.4" opacity="0.5" />
                <path d="M0 40 H340" stroke="#D4AF37" strokeWidth="0.35" opacity="0.4" />
                <use href="#nyfV4Medallion" transform="translate(170,31) scale(0.72)" />
              </g>
              <path d="M-8 26 C 22 32, 52 33.4, 86 30 C 118 27, 146 33, 170 34.6 C 194 33, 222 27, 254 30 C 288 33.4, 318 32, 348 26 L 348 29.6 C 318 35.6, 288 37, 254 33.6 C 222 30.6, 194 36.6, 170 38.2 C 146 36.6, 118 30.6, 86 33.6 C 52 37, 22 35.6, -8 29.6 Z" fill="url(#nyfGoldGrad)" />
              <path d="M-8 31.6 C 22 37.4, 52 38.6, 86 35.4 C 118 32.4, 146 38.4, 170 40 C 194 38.4, 222 32.4, 254 35.4 C 288 38.6, 318 37.4, 348 31.6" stroke="#B8860B" strokeWidth="0.5" opacity="0.5" fill="none" />

              <use href="#nyfStar5" transform="translate(140,31.4) scale(1.35)" className="nyf-twinkle" style={{ animationDelay: "0.2s" }} />
              <use href="#nyfStar5" transform="translate(170,34.4) scale(1.6)" className="nyf-twinkle" style={{ animationDelay: "0.5s" }} />
              <use href="#nyfStar5" transform="translate(200,31.4) scale(-1.35,1.35)" className="nyf-twinkle" style={{ animationDelay: "0.8s" }} />

              <use href="#nyfFlute" transform="translate(60,33.4) scale(0.86)" />
              <use href="#nyfFlute" transform="translate(280,33.4) scale(-0.86,0.86)" />

              <g className="nyf-twinkle" style={{ animationDelay: "0.4s" }}>
                <rect x="18" y="30" width="2.6" height="1.2" rx="0.4" fill="#F4C430" transform="rotate(-28 19.3 30.6)" />
                <rect x="28" y="36.4" width="2.4" height="1.1" rx="0.4" fill="#E2E8F0" transform="rotate(24 29.2 36.9)" />
                <rect x="34" y="32.6" width="2.2" height="1" rx="0.4" fill="#BAE6FD" transform="rotate(-14 35.1 33.1)" />
                <rect x="304" y="31" width="2.4" height="1.1" rx="0.4" fill="#F4C430" transform="rotate(22 305.2 31.5)" />
                <rect x="312" y="36" width="2.2" height="1" rx="0.4" fill="#E2E8F0" transform="rotate(-26 313.1 36.5)" />
                <rect x="320" y="33" width="2.4" height="1.1" rx="0.4" fill="#BAE6FD" transform="rotate(12 321.2 33.5)" />
              </g>
            </svg>
          </div>

          {/* Góc TL: chai champagne + 2 flute + bong bóng (ink x ≤ 24 < ACTIVE x39) */}
          <div className="corner-ornament nyf-tl">
            <svg viewBox="0 0 58 62" width="58" height="62">
              <use href="#nyfBottle" transform="translate(23,28) rotate(-8) scale(0.92)" />
              <use href="#nyfFlute" transform="translate(41,30) rotate(10) scale(0.62)" />
              <use href="#nyfFlute" transform="translate(10,34) rotate(-12) scale(0.55)" />
              <g className="nyf-twinkle" style={{ animationDelay: "0.6s" }}>
                <circle cx="45" cy="12" r="1.6" fill="url(#nyfGlassGrad)" stroke="#FFFFFF" strokeWidth="0.3" />
                <circle cx="33" cy="7.4" r="1.1" fill="url(#nyfGlassGrad)" stroke="#FFFFFF" strokeWidth="0.3" />
                <circle cx="14" cy="16" r="0.9" fill="url(#nyfGlassGrad)" stroke="#FFFFFF" strokeWidth="0.25" />
              </g>
              <path d="M6 40 C 16 45, 34 46, 50 40" stroke="#E8D8A8" strokeWidth="1.2" opacity="0.5" fill="none" />
            </svg>
          </div>

          {/* Góc TR: star 5 cánh 2 tầng facet (giữ class tet-branch-top-right, CSS scope) */}
          <div className="corner-ornament tet-branch-top-right nyf-tr">
            <svg viewBox="0 0 50 50" width="50" height="50">
              <g transform="translate(25,26)" className="nyf-star">
                <circle r="15" fill="url(#nyfGlowGrad)" />
                <use href="#nyfStar5" transform="scale(2.1)" />
              </g>
            </svg>
          </div>

          {/* Góc BL: party horn + 3 confetti */}
          <div className="corner-ornament nyf-bl">
            <svg viewBox="0 0 54 50" width="54" height="50">
              <use href="#nyfHorn" transform="translate(28,28) rotate(-14) scale(1.05)" />
              <rect x="9" y="14" width="3" height="1.4" rx="0.5" fill="#E11D48" transform="rotate(-24 10.5 14.7)" />
              <rect x="12" y="8.4" width="2.8" height="1.2" rx="0.5" fill="#F4C430" transform="rotate(16 13.4 9)" />
              <rect x="4" y="24" width="2.6" height="1.1" rx="0.5" fill="#94A3B8" transform="rotate(34 5.3 24.5)" />
            </svg>
          </div>

          {/* Góc BR: flute + bong bóng (ink x ≥ 330 > motto 309) */}
          <div className="corner-ornament nyf-br">
            <svg viewBox="0 0 50 58" width="50" height="58">
              <use href="#nyfFlute" transform="translate(28,36) rotate(8) scale(0.95)" />
              <g className="nyf-bubble" style={{ animationDelay: "1.2s" }}>
                <circle cx="20" cy="16" r="2.4" fill="url(#nyfGlassGrad)" stroke="#FFFFFF" strokeWidth="0.3" />
                <circle cx="19.2" cy="15.2" r="0.6" fill="#FFFFFF" opacity="0.9" />
              </g>
              <g className="nyf-bubble" style={{ animationDelay: "3.6s" }}>
                <circle cx="28" cy="8.4" r="1.5" fill="url(#nyfGlassGrad)" stroke="#FFFFFF" strokeWidth="0.3" />
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* ========================================================
          3. MÙA HẠ: "Biển Xanh Nắng Hạ" — tán dừa filled, monstera,
          hoa sứ nhiều tầng, dây thừng braided, sóng 3 lớp, sinh vật biển
         ======================================================== */}
      {isSummer && (
        <div className="wrapped-frame summer-beach-frame">
          <FrameAmbient tone="summer" />
          <ParticleField kind="bubble" count={4} />
          {/* Mép trên: 2 tán dừa + monstera + dây thừng + 3 vỏ sò treo */}
          <div className="frame-border-top palm-border-top">
            <svg viewBox="0 0 340 40" preserveAspectRatio="none" className="palm-top-svg">
              <defs>
                <linearGradient id="sbfPalmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#86EFAC" />
                  <stop offset="45%" stopColor="#4ADE80" />
                  <stop offset="100%" stopColor="#16A34A" />
                </linearGradient>
                <linearGradient id="sbfFrondGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4ADE80" />
                  <stop offset="55%" stopColor="#16A34A" />
                  <stop offset="100%" stopColor="#14532D" />
                </linearGradient>
                <linearGradient id="sbfFrondDeepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22C55E" />
                  <stop offset="55%" stopColor="#15803D" />
                  <stop offset="100%" stopColor="#065F46" />
                </linearGradient>
                <linearGradient id="sbfMonsteraGrad" x1="14%" y1="0%" x2="86%" y2="100%">
                  <stop offset="0%" stopColor="#4ADE80" />
                  <stop offset="48%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#065F46" />
                </linearGradient>
                <linearGradient id="sbfRopeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F2D8A0" />
                  <stop offset="48%" stopColor="#E8C07A" />
                  <stop offset="100%" stopColor="#B07A2A" />
                </linearGradient>
                <linearGradient id="sbfSandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFF7D6" />
                  <stop offset="55%" stopColor="#FDE68A" />
                  <stop offset="100%" stopColor="#E9B949" />
                </linearGradient>
                <linearGradient id="sbfWaveDeepGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0284C7" />
                  <stop offset="60%" stopColor="#075985" />
                  <stop offset="100%" stopColor="#0C4A6E" />
                </linearGradient>
                <linearGradient id="sbfWaveMidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7DD3FC" />
                  <stop offset="55%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
                <linearGradient id="sbfFoamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E0F2FE" />
                </linearGradient>
                <radialGradient id="sbfPlumeriaGrad" cx="50%" cy="38%" r="62%">
                  <stop offset="0%" stopColor="#FFF7ED" />
                  <stop offset="62%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#FFEDD5" />
                </radialGradient>
                <radialGradient id="sbfPlumeriaCore" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stopColor="#FDE047" />
                  <stop offset="55%" stopColor="#FACC15" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </radialGradient>
                <radialGradient id="sbfStarGrad" cx="40%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FDBA74" />
                  <stop offset="50%" stopColor="#FB923C" />
                  <stop offset="100%" stopColor="#C2410C" />
                </radialGradient>
                <linearGradient id="sbfShellGrad" x1="20%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%" stopColor="#FFF7ED" />
                  <stop offset="55%" stopColor="#FBCFE8" />
                  <stop offset="100%" stopColor="#F9A8D4" />
                </linearGradient>
                <linearGradient id="sbfGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#CCFBF1" />
                  <stop offset="55%" stopColor="#99F6E4" />
                  <stop offset="100%" stopColor="#5EEAD4" />
                </linearGradient>
                <linearGradient id="sbfCrabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F87171" />
                  <stop offset="55%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#B91C1C" />
                </linearGradient>

                {/* Template: lá dừa fill + 12 leaflet so le + gân */}
                <g id="sbfFrond">
                  <g fill="url(#sbfFrondDeepGrad)">
                    {Array.from({ length: 6 }).map((_, i) => {
                      const x = 3 + i * 5;
                      return (
                        <g key={`sbf-leaflet-${i}`}>
                          <path d={`M${x} -0.8 C ${x + 1.6} -3.6, ${x + 4} -5.6, ${x + 7} -6.2 C ${x + 4.6} -3.8, ${x + 2.4} -1.6, ${x} -0.8 Z`} />
                          <path d={`M${x + 1.6} 0.8 C ${x + 3.2} 3.6, ${x + 5.6} 5.6, ${x + 8.6} 6.2 C ${x + 6.2} 3.8, ${x + 4} 1.6, ${x + 1.6} 0.8 Z`} />
                        </g>
                      );
                    })}
                  </g>
                  <g fill="url(#sbfFrondGrad)">
                    <path d="M0 0 C 10 0.4, 22 0.2, 34 -0.6 L 34 1.4 C 22 2.6, 10 2.8, 0 1 Z" />
                    <path d="M4 -1.4 C 10 -4.4, 18 -6, 27 -6.6 C 20 -4.2, 12 -2, 4 -1.4 Z" opacity="0.9" />
                  </g>
                  <path d="M2 0.4 C 12 0.8, 24 0.6, 34 -0.2" stroke="#BBF7D0" strokeWidth="0.45" opacity="0.55" fill="none" />
                </g>

                {/* Template: lá monstera 5 khe */}
                <g id="sbfMonstera">
                  <path d="M0 0 C -8 -2, -12 -9, -10 -15 C -8 -21, -1 -24, 5 -21 C 11 -18, 13 -10, 9 -4 C 7 -1, 3 1, 0 0 Z" fill="url(#sbfMonsteraGrad)" />
                  <g stroke="#FAFAF8" strokeWidth="1.1" strokeLinecap="round">
                    <path d="M-9 -12 L-2 -10" /><path d="M-9.4 -7 L-2.4 -6" /><path d="M-6 -18 L-1 -14" /><path d="M2 -20 L1 -14" /><path d="M7 -16 L3 -12" />
                  </g>
                  <path d="M0 0 C 2 -6, 5 -13, 7 -19" stroke="#065F46" strokeWidth="0.7" fill="none" opacity="0.6" />
                  <ellipse cx="-4" cy="-14" rx="3" ry="1.4" fill="#86EFAC" opacity="0.35" transform="rotate(-28 -4 -14)" />
                </g>

                {/* Template: hoa sứ 5 cánh xếp lớp + throat vàng */}
                <g id="sbfPlumeria">
                  <g fill="url(#sbfPlumeriaGrad)">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <path key={`plum-p-${i}`} d="M0 0 C -2.6 -2.8, -4.2 -6.6, -2.2 -8.8 C -1.1 -10, 1.1 -10, 2.2 -8.8 C 4.2 -6.6, 2.6 -2.8, 0 0 Z" transform={`rotate(${i * 72})`} />
                    ))}
                  </g>
                  <g fill="#FFF7ED" opacity="0.6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <path key={`plum-in-${i}`} d="M0 0 C -1.6 -2.2, -2.4 -4.6, -1.2 -6 C -0.6 -6.7, 0.6 -6.7, 1.2 -6 C 2.4 -4.6, 1.6 -2.2, 0 0 Z" transform={`rotate(${i * 72 + 36})`} />
                    ))}
                  </g>
                  <circle r="3.5" fill="url(#sbfPlumeriaCore)" />
                  <circle r="1.4" fill="#F59E0B" />
                  <g fill="#FDE68A" opacity="0.9">
                    <circle cx="0" cy="-2.4" r="0.45" /><circle cx="2.3" cy="0.7" r="0.45" /><circle cx="-2.3" cy="0.7" r="0.45" />
                  </g>
                  <path d="M0 -1 L0 -6.4 M0 -1 L-2.2 -5.8 M0 -1 L2.2 -5.8" stroke="#FDE68A" strokeWidth="0.3" opacity="0.55" fill="none" />
                </g>

                {/* Template: vỏ sò quạt 5 gân */}
                <g id="sbfShell">
                  <path d="M0 0 C -7 -1.6, -10 -6, -9 -11 C -5 -9.6, -2 -8.4, 0 -10.6 C 2 -8.4, 5 -9.6, 9 -11 C 10 -6, 7 -1.6, 0 0 Z" fill="url(#sbfShellGrad)" />
                  <g stroke="#C2872E" strokeWidth="0.35" opacity="0.55" fill="none">
                    <path d="M0 0 L-7 -8" /><path d="M0 0 L-3.6 -10" /><path d="M0 0 L0 -10.6" /><path d="M0 0 L3.6 -10" /><path d="M0 0 L7 -8" />
                  </g>
                  <circle cx="0" cy="-1" r="1.1" fill="#FDE68A" />
                  <path d="M-6.4 -9.4 C -3 -7.8, 3 -7.8, 6.4 -9.4" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.65" fill="none" />
                </g>

                {/* Template: sao biển 5 nhánh bump + gradient */}
                <g id="sbfStarfish">
                  <path d="M0 -13 C 2.6 -9, 3.2 -5.4, 2.2 -2 C 4.6 -2.6, 7 -2, 8.4 0 C 6.2 1.2, 3.6 1, 1.6 -0.2 C 2.4 2.6, 2 5.4, 0 7 C -2 5.4, -2.4 2.6, -1.6 -0.2 C -3.6 1, -6.2 1.2, -8.4 0 C -7 -2, -4.6 -2.6, -2.2 -2 C -3.2 -5.4, -2.6 -9, 0 -13 Z" fill="url(#sbfStarGrad)" />
                  <g fill="#C2410C" opacity="0.5">
                    <circle cx="0" cy="-6.4" r="0.7" /><circle cx="2.6" cy="-4.4" r="0.6" /><circle cx="-2.6" cy="-4.4" r="0.6" />
                    <circle cx="4.6" cy="-0.6" r="0.55" /><circle cx="-4.6" cy="-0.6" r="0.55" /><circle cx="0" cy="3.2" r="0.6" />
                  </g>
                  <ellipse cx="-1.6" cy="-4.6" rx="2.2" ry="0.8" fill="#FFEDD5" opacity="0.5" transform="rotate(-24 -1.6 -4.6)" />
                </g>

                {/* Template: cua nhỏ */}
                <g id="sbfCrab">
                  <ellipse cx="0" cy="0" rx="6.4" ry="4.2" fill="url(#sbfCrabGrad)" />
                  <path d="M-6 2 L-9 4.6 M-5.4 3.2 L-7.8 6.4 M5.4 3.2 L7.8 6.4 M6 2 L9 4.6" stroke="#B91C1C" strokeWidth="0.8" strokeLinecap="round" />
                  <path d="M-5.6 -1.4 C -8 -3.4, -9 -6, -7.6 -7.4 C -6.2 -8.6, -4.4 -7, -4.2 -4.6 Z" fill="url(#sbfCrabGrad)" />
                  <path d="M5.6 -1.4 C 8 -3.4, 9 -6, 7.6 -7.4 C 6.2 -8.6, 4.4 -7, 4.2 -4.6 Z" fill="url(#sbfCrabGrad)" />
                  <circle cx="-2.2" cy="-3.4" r="1.2" fill="#7F1D1D" /><circle cx="2.2" cy="-3.4" r="1.2" fill="#7F1D1D" />
                  <circle cx="-2.2" cy="-3.4" r="0.45" fill="#FEE2E2" /><circle cx="2.2" cy="-3.4" r="0.45" fill="#FEE2E2" />
                  <ellipse cx="-2" cy="-1" rx="2" ry="1" fill="#FCA5A5" opacity="0.4" />
                </g>

                {/* Template: hải âu */}
                <g id="sbfSeagull">
                  <path d="M-14 0 C -9 -5.4, -3 -6.6, 2 -3 C 6 -5.6, 11 -5.6, 15 -1.6 C 10 -3.2, 6 -1.8, 2 1.8 C -2 -1.6, -8 -2.6, -14 0 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
                  <path d="M-14 0 C -9 -2.4, -4 -2.4, 0.4 0.4 C -4 2.6, -9.6 2.6, -14 0 Z" fill="#E2E8F0" />
                  <path d="M15 -1.6 C 18 -2.4, 20 -2.2, 21.4 -1 C 19.4 -0.2, 17 0, 15 -1.6 Z" fill="#FB923C" />
                  <circle cx="13.4" cy="-3" r="0.7" fill="#334155" />
                  <path d="M-7 -4.4 C -3 -7, 2 -6.6, 5 -3.6" stroke="#94A3B8" strokeWidth="0.45" opacity="0.6" fill="none" />
                </g>

                {/* Template: ốc sên */}
                <g id="sbfSnail">
                  <path d="M-9 5 C -12 5, -13 3, -12 1" stroke="#86EFAC" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                  <ellipse cx="0" cy="5" rx="8" ry="2.6" fill="#FDE68A" />
                  <ellipse cx="0" cy="4.2" rx="7.4" ry="2.2" fill="#FCD34D" />
                  <circle cx="1" cy="0.4" r="6" fill="url(#sbfShellGrad)" stroke="#C2872E" strokeWidth="0.5" />
                  <path d="M1 0.4 C 3.6 0.4, 4.6 2, 3.6 3.4 C 2.4 5, 0 4.4, -0.4 2.6 C -0.8 0.8, 0.8 -0.4, 2.2 0.4" stroke="#C2872E" strokeWidth="0.6" fill="none" />
                  <path d="M-6 3.4 L-7.6 1 M-6 3.6 L-8.6 2.6" stroke="#F59E0B" strokeWidth="0.45" />
                  <circle cx="-7.7" cy="0.8" r="0.45" fill="#7C2D12" /><circle cx="-8.8" cy="2.4" r="0.4" fill="#7C2D12" />
                  <path d="M-1 6.6 C 1 7.4, 3 7.4, 4.6 6.6" stroke="#EAB308" strokeWidth="0.5" opacity="0.7" fill="none" />
                </g>

                {/* Template: chuồn chuồn */}
                <g id="sbfDragonfly">
                  <ellipse cx="0" cy="2" rx="1.4" ry="8" fill="#0F766E" />
                  <circle cx="0" cy="-6.4" r="2" fill="#134E4A" />
                  <ellipse cx="-6.4" cy="-2.4" rx="6" ry="2.4" fill="#CCFBF1" opacity="0.75" transform="rotate(-18 -6.4 -2.4)" stroke="#5EEAD4" strokeWidth="0.35" />
                  <ellipse cx="6.4" cy="-2.4" rx="6" ry="2.4" fill="#CCFBF1" opacity="0.75" transform="rotate(18 6.4 -2.4)" stroke="#5EEAD4" strokeWidth="0.35" />
                  <ellipse cx="-5.4" cy="2.4" rx="4.8" ry="2" fill="#99F6E4" opacity="0.65" transform="rotate(14 -5.4 2.4)" />
                  <ellipse cx="5.4" cy="2.4" rx="4.8" ry="2" fill="#99F6E4" opacity="0.65" transform="rotate(-14 5.4 2.4)" />
                  <circle cx="-1" cy="-7.4" r="0.55" fill="#F0FDFA" /><circle cx="1" cy="-7.4" r="0.55" fill="#F0FDFA" />
                </g>
              
                <linearGradient id="sbfV4Relief" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0E7490" />
                  <stop offset="52%" stopColor="#0891B2" />
                  <stop offset="100%" stopColor="#A5F3FC" />
                </linearGradient>
                <linearGradient id="sbfV4RimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFF7" />
                  <stop offset="50%" stopColor="#67E8F9" />
                  <stop offset="100%" stopColor="#0E7490" />
                </linearGradient>
                <radialGradient id="sbfV4MedalGrad" cx="46%" cy="38%" r="62%">
                  <stop offset="0%" stopColor="#FFFDF5" />
                  <stop offset="42%" stopColor="#FDE68A" />
                  <stop offset="76%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </radialGradient>
                <g id="sbfV4Medallion">
                  <circle r="9.6" fill="none" stroke="url(#sbfV4RimGrad)" strokeWidth="1.5" />
                  <circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(0)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(18)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(36)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(54)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(72)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(90)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(108)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(126)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(144)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(162)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(180)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(198)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(216)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(234)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(252)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(270)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(288)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(306)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(324)" /><circle cy="-10.6" r="0.5" fill="#E0F2FE" transform="rotate(342)" />
                  <circle r="8.2" fill="url(#sbfV4MedalGrad)" opacity="0.92" />
                  <path d="M0 -2 l0 -6" stroke="#B45309" strokeWidth="0.55" opacity="0.6" transform="rotate(0)" /><path d="M0 -2 l0 -6" stroke="#B45309" strokeWidth="0.55" opacity="0.6" transform="rotate(40)" /><path d="M0 -2 l0 -6" stroke="#B45309" strokeWidth="0.55" opacity="0.6" transform="rotate(80)" /><path d="M0 -2 l0 -6" stroke="#B45309" strokeWidth="0.55" opacity="0.6" transform="rotate(120)" /><path d="M0 -2 l0 -6" stroke="#B45309" strokeWidth="0.55" opacity="0.6" transform="rotate(160)" /><path d="M0 -2 l0 -6" stroke="#B45309" strokeWidth="0.55" opacity="0.6" transform="rotate(200)" /><path d="M0 -2 l0 -6" stroke="#B45309" strokeWidth="0.55" opacity="0.6" transform="rotate(240)" /><path d="M0 -2 l0 -6" stroke="#B45309" strokeWidth="0.55" opacity="0.6" transform="rotate(280)" /><path d="M0 -2 l0 -6" stroke="#B45309" strokeWidth="0.55" opacity="0.6" transform="rotate(320)" />
                  <path d="M-3 -3.6 A 4.6 4.6 0 0 1 3 -3.6" fill="none" stroke="#FFF7C2" strokeWidth="0.5" opacity="0.75" transform="rotate(0)" /><path d="M-3 -3.6 A 4.6 4.6 0 0 1 3 -3.6" fill="none" stroke="#FFF7C2" strokeWidth="0.5" opacity="0.75" transform="rotate(40)" /><path d="M-3 -3.6 A 4.6 4.6 0 0 1 3 -3.6" fill="none" stroke="#FFF7C2" strokeWidth="0.5" opacity="0.75" transform="rotate(80)" /><path d="M-3 -3.6 A 4.6 4.6 0 0 1 3 -3.6" fill="none" stroke="#FFF7C2" strokeWidth="0.5" opacity="0.75" transform="rotate(120)" /><path d="M-3 -3.6 A 4.6 4.6 0 0 1 3 -3.6" fill="none" stroke="#FFF7C2" strokeWidth="0.5" opacity="0.75" transform="rotate(160)" /><path d="M-3 -3.6 A 4.6 4.6 0 0 1 3 -3.6" fill="none" stroke="#FFF7C2" strokeWidth="0.5" opacity="0.75" transform="rotate(200)" /><path d="M-3 -3.6 A 4.6 4.6 0 0 1 3 -3.6" fill="none" stroke="#FFF7C2" strokeWidth="0.5" opacity="0.75" transform="rotate(240)" /><path d="M-3 -3.6 A 4.6 4.6 0 0 1 3 -3.6" fill="none" stroke="#FFF7C2" strokeWidth="0.5" opacity="0.75" transform="rotate(280)" /><path d="M-3 -3.6 A 4.6 4.6 0 0 1 3 -3.6" fill="none" stroke="#FFF7C2" strokeWidth="0.5" opacity="0.75" transform="rotate(320)" />
                  <circle r="2.2" fill="#FFFDF5" />
                  <path d="M-8 5.4 A 9.6 9.6 0 0 0 8 5.4" fill="none" stroke="#0E7490" strokeWidth="0.9" opacity="0.4" />
                </g>
              </defs>

              {/* Tán dừa trái: 5 frond filled xòe từ góc */}
              <g className="sbf-fronds">
                <use href="#sbfFrond" transform="translate(2,-7) rotate(4) scale(2.6)" />
                <use href="#sbfFrond" transform="translate(2,-7) rotate(16) scale(2.3)" />
                <use href="#sbfFrond" transform="translate(2,-7) rotate(28) scale(2)" />
                <use href="#sbfFrond" transform="translate(2,-7) rotate(42) scale(1.72)" />
                <use href="#sbfFrond" transform="translate(2,-7) rotate(56) scale(1.5)" />
              </g>
              {/* Tán dừa phải: mirror */}
              <g className="sbf-fronds">
                <use href="#sbfFrond" transform="translate(338,-7) scale(-1,1) rotate(4) scale(2.6)" />
                <use href="#sbfFrond" transform="translate(338,-7) scale(-1,1) rotate(16) scale(2.3)" />
                <use href="#sbfFrond" transform="translate(338,-7) scale(-1,1) rotate(28) scale(2)" />
                <use href="#sbfFrond" transform="translate(338,-7) scale(-1,1) rotate(42) scale(1.72)" />
                <use href="#sbfFrond" transform="translate(338,-7) scale(-1,1) rotate(56) scale(1.5)" />
              </g>

              {/* Monstera mép trên */}
              <use href="#sbfMonstera" transform="translate(252,14) rotate(24) scale(0.78)" />
              <use href="#sbfMonstera" transform="translate(240,17) rotate(-16) scale(0.54)" />

              {/* Dây thừng swag filled 2 sợi + highlight */}
              <path d="M-8 11 C 30 18, 66 21.4, 104 21 C 132 20.6, 152 19.4, 170 20.4 C 188 21.4, 210 20.6, 238 21 C 276 21.6, 312 18, 348 11 L 348 14.6 C 312 21.6, 276 25.2, 238 24.6 C 210 24.2, 188 25, 170 24 C 152 23, 132 24, 104 24.6 C 66 25.2, 30 21.8, -8 14.6 Z" fill="url(#sbfRopeGrad)" />
              <path d="M-8 11.8 C 30 18.6, 66 22, 104 21.6 C 132 21.2, 152 20, 170 21 C 188 22, 210 21.2, 238 21.6 C 276 22.2, 312 18.8, 348 11.8" stroke="#FFF7D6" strokeWidth="0.5" opacity="0.6" fill="none" />
              {Array.from({ length: 22 }).map((_, i) => (
                <path key={`sbf-rope-twist-${i}`} d={`M${i * 16 - 4} ${13 + (i % 3)} L${i * 16 + 2} ${16.4 + (i % 3)}`} stroke="#8B5E34" strokeWidth="0.45" opacity="0.4" />
              ))}

              {/* 3 vỏ sò treo */}
              <path d="M124 20.4 L124 23 M180 20.6 L180 23.4 M236 20.8 L236 23" stroke="#8B5E34" strokeWidth="0.5" />
              <use href="#sbfShell" transform="translate(124,33) scale(0.92)" />
              <use href="#sbfShell" transform="translate(180,34) scale(0.96)" />
              <use href="#sbfShell" transform="translate(236,32) scale(0.84)" />

              {/* Glint mặt nước */}
              <path d="M170 4.4 C 170.4 6.2, 171 6.8, 172.8 7.2 C 171 7.6, 170.4 8.2, 170 10 C 169.6 8.2, 169 7.6, 167.2 7.2 C 169 6.8, 169.6 6.2, 170 4.4 Z" fill="#FFFFFF" className="sbf-glint" />
            
              {/* V4 — thừng bện, sóng 3 lớp, viền kép, hạt cườm, huy hiệu mặt trời biển */}
              <g>
                <path d="M114 28 q10 -6 20 0 t20 0 q10 -6 20 0 t20 0 q10 -6 20 0 t20 0  L232 40 L114 40 Z" fill="url(#sbfV4Relief)" opacity="0.36" />
                <path d="M114 22 q10 -4 20 0 t20 0 q10 -4 20 0 t20 0 q10 -4 20 0 t20 0 " fill="none" stroke="#A5F3FC" strokeWidth="0.6" opacity="0.6" />
                <path d="M114 27 q10 -4 20 0 t20 0 q10 -4 20 0 t20 0 q10 -4 20 0 t20 0 " fill="none" stroke="#67E8F9" strokeWidth="0.48" opacity="0.5" />
                <path d="M114 32 q10 -4 20 0 t20 0 q10 -4 20 0 t20 0 q10 -4 20 0 t20 0 " fill="none" stroke="#22D3EE" strokeWidth="0.36" opacity="0.39999999999999997" />
                <path d="M0 8 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 " fill="none" stroke="#E0F2FE" strokeWidth="0.55" opacity="0.6" />
                <path d="M0 11 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 q5 5 10 0 q5 -5 10 0 " fill="none" stroke="#67E8F9" strokeWidth="0.45" opacity="0.5" />
                <path d="M0 3 H340" stroke="url(#sbfV4RimGrad)" strokeWidth="1.1" opacity="0.62" />
                <path d="M0 5.8 H340" stroke="#FFFFF7" strokeWidth="0.45" opacity="0.4" />
                <circle cx="10" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="22" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="34" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="46" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="58" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="70" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="82" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="94" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="106" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="118" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="130" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="142" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="154" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="166" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="178" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="190" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="202" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="214" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="226" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="238" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="250" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="262" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="274" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="286" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="298" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="310" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="322" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                <circle cx="334" cy="5.8" r="0.8" fill="#E0F2FE" opacity="0.68" />
                
                <use href="#sbfV4Medallion" transform="translate(206,17.6) scale(0.74)" />
              </g>
            </svg>
          </div>

          {/* Cạnh trái: dây thừng braided + 4 hoa sứ + monstera + sea glass + ốc sên */}
          <div className="frame-border-side border-left beach-border-left">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="beach-side-svg">
              <g>
                <path d="M1.2 0 V460" stroke="url(#sbfV4RimGrad)" strokeWidth="0.9" opacity="0.5" />
                <path d="M4.2 0 V460" stroke="#E0F2FE" strokeWidth="0.35" opacity="0.3" />
                <path d="M4 0 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 " fill="none" stroke="#A5F3FC" strokeWidth="0.5" opacity="0.55" />
                <path d="M8 0 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 " fill="none" stroke="#67E8F9" strokeWidth="0.45" opacity="0.45" />
                <path d="M18 8 c-6 8 6 14 0 22 c-5 7 4 13 0 20" fill="none" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.45" /><path d="M18 66 c-6 8 6 14 0 22 c-5 7 4 13 0 20" fill="none" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.45" /><path d="M18 124 c-6 8 6 14 0 22 c-5 7 4 13 0 20" fill="none" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.45" /><path d="M18 182 c-6 8 6 14 0 22 c-5 7 4 13 0 20" fill="none" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.45" /><path d="M18 240 c-6 8 6 14 0 22 c-5 7 4 13 0 20" fill="none" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.45" /><path d="M18 298 c-6 8 6 14 0 22 c-5 7 4 13 0 20" fill="none" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.45" /><path d="M18 356 c-6 8 6 14 0 22 c-5 7 4 13 0 20" fill="none" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.45" /><path d="M18 414 c-6 8 6 14 0 22 c-5 7 4 13 0 20" fill="none" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.45" />
                <circle cx="11.5" cy="10" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="36" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="62" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="88" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="114" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="140" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="166" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="192" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="218" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="244" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="270" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="296" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="322" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="348" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="374" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="400" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="426" r="0.7" fill="#E0F2FE" opacity="0.55" />
                
              </g>
              <path d="M0 0 L5 0 C 4 120, 5.4 240, 4.2 460 L0 460 Z" fill="#0284C7" opacity="0.08" />
              <path d="M14 -4 C 10 80, 20 160, 15 240 C 11 310, 20 390, 17 464" stroke="#B07A2A" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              <path d="M17.4 -4 C 13.4 80, 23.4 160, 18.4 240 C 14.4 310, 23.4 390, 20.4 464" stroke="url(#sbfRopeGrad)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              <path d="M14 0 C 10 80, 20 160, 15 240 C 11 310, 20 390, 17 464" stroke="#F2D8A0" strokeWidth="0.6" opacity="0.55" fill="none" />
              {Array.from({ length: 26 }).map((_, i) => (
                <path key={`sbf-braid-l-${i}`} d={`M${11.4 + (i % 2) * 2} ${i * 18 + 2} L${16 + (i % 2) * 2} ${i * 18 + 8}`} stroke="#8B5E34" strokeWidth="0.55" opacity="0.45" />
              ))}

              <use href="#sbfPlumeria" transform="translate(14,70) rotate(-10) scale(0.66)" />
              <use href="#sbfPlumeria" transform="translate(14.4,180) rotate(12) scale(0.6)" />
              <use href="#sbfPlumeria" transform="translate(13.6,290) rotate(-6) scale(0.68)" />
              <use href="#sbfPlumeria" transform="translate(14.2,395) rotate(14) scale(0.62)" />
              <use href="#sbfMonstera" transform="translate(16,120) rotate(-28) scale(0.5)" />
              <use href="#sbfMonstera" transform="translate(15,320) rotate(22) scale(0.46)" />

              <g transform="translate(10,240) rotate(-14)">
                <path d="M-2.4 0 C 0 -3.4, 4 -3.8, 5.4 -1.4 C 6.4 0.6, 4.6 2.4, 2.4 1.8 C 1 1.4, 0.4 0.4, 1 0 C 1.6 -0.4, 2.6 0, 2.6 0.8" fill="none" stroke="#5EEAD4" strokeWidth="1.6" strokeLinecap="round" />
              </g>
              <use href="#sbfSnail" transform="translate(14,268) rotate(-8) scale(0.85)" />

              <path d="M9 148 C 9.3 149.4, 9.9 150, 11.3 150.3 C 9.9 150.6, 9.3 151.2, 9 152.6 C 8.7 151.2, 8.1 150.6, 6.7 150.3 C 8.1 150, 8.7 149.4, 9 148 Z" fill="#FFFFFF" className="sbf-glint" style={{ animationDelay: "0.9s" }} />
            </svg>
          </div>

          {/* Cạnh phải: braided phase lệch + hoa sứ + monstera + chuồn chuồn */}
          <div className="frame-border-side border-right beach-border-right">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="beach-side-svg">
              <g>
                <path d="M1.2 0 V460" stroke="url(#sbfV4RimGrad)" strokeWidth="0.9" opacity="0.5" />
                <path d="M4.2 0 V460" stroke="#E0F2FE" strokeWidth="0.35" opacity="0.3" />
                <path d="M4 0 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 " fill="none" stroke="#A5F3FC" strokeWidth="0.5" opacity="0.55" />
                <path d="M8 0 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 q-5 5 0 10 q5 5 0 10 " fill="none" stroke="#67E8F9" strokeWidth="0.45" opacity="0.45" />
                <path d="M18 8 c-6 8 6 14 0 22 c-5 7 4 13 0 20" fill="none" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.45" /><path d="M18 66 c-6 8 6 14 0 22 c-5 7 4 13 0 20" fill="none" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.45" /><path d="M18 124 c-6 8 6 14 0 22 c-5 7 4 13 0 20" fill="none" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.45" /><path d="M18 182 c-6 8 6 14 0 22 c-5 7 4 13 0 20" fill="none" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.45" /><path d="M18 240 c-6 8 6 14 0 22 c-5 7 4 13 0 20" fill="none" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.45" /><path d="M18 298 c-6 8 6 14 0 22 c-5 7 4 13 0 20" fill="none" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.45" /><path d="M18 356 c-6 8 6 14 0 22 c-5 7 4 13 0 20" fill="none" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.45" /><path d="M18 414 c-6 8 6 14 0 22 c-5 7 4 13 0 20" fill="none" stroke="#5EEAD4" strokeWidth="0.5" opacity="0.45" />
                <circle cx="11.5" cy="10" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="36" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="62" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="88" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="114" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="140" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="166" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="192" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="218" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="244" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="270" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="296" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="322" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="348" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="374" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="400" r="0.7" fill="#E0F2FE" opacity="0.55" />
                <circle cx="11.5" cy="426" r="0.7" fill="#E0F2FE" opacity="0.55" />
                
              </g>
              <path d="M27 0 L32 0 L32 460 L27.8 460 C 29 400, 27.4 320, 28.6 240 C 30 160, 28.4 80, 27 0 Z" fill="#0284C7" opacity="0.08" />
              <path d="M18 -4 C 22 80, 12 160, 17 240 C 21 310, 12 390, 15 464" stroke="#B07A2A" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              <path d="M14.6 -4 C 18.6 80, 8.6 160, 13.6 240 C 17.6 310, 8.6 390, 11.6 464" stroke="url(#sbfRopeGrad)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              <path d="M18 0 C 22 80, 12 160, 17 240 C 21 310, 12 390, 15 464" stroke="#F2D8A0" strokeWidth="0.6" opacity="0.55" fill="none" />
              {Array.from({ length: 26 }).map((_, i) => (
                <path key={`sbf-braid-r-${i}`} d={`M${18.6 - (i % 2) * 2} ${i * 18 + 4} L${14 + (i % 2) * 2} ${i * 18 + 10}`} stroke="#8B5E34" strokeWidth="0.55" opacity="0.45" />
              ))}

              <use href="#sbfPlumeria" transform="translate(18,90) rotate(10) scale(0.64)" />
              <use href="#sbfPlumeria" transform="translate(17.6,205) rotate(-12) scale(0.6)" />
              <use href="#sbfPlumeria" transform="translate(18.4,315) rotate(8) scale(0.66)" />
              <use href="#sbfPlumeria" transform="translate(17.8,420) rotate(-14) scale(0.6)" />
              <use href="#sbfMonstera" transform="translate(16,120) rotate(34) scale(0.48)" />
              <use href="#sbfMonstera" transform="translate(17,330) rotate(-26) scale(0.5)" />

              <use href="#sbfDragonfly" transform="translate(17,270) rotate(12) scale(0.8)" />

              <path d="M23 190 C 23.3 191.4, 23.9 192, 25.3 192.3 C 23.9 192.6, 23.3 193.2, 23 194.6 C 22.7 193.2, 22.1 192.6, 20.7 192.3 C 22.1 192, 22.7 191.4, 23 190 Z" fill="#FFFFFF" className="sbf-glint" style={{ animationDelay: "1.6s" }} />
            </svg>
          </div>

          {/* Mép đáy: 3 dải sóng + foam curl + cát + sò + sao biển + cua */}
          <div className="frame-border-bottom beach-border-bottom">
            <svg viewBox="0 0 340 40" preserveAspectRatio="none" className="beach-bottom-svg">
              <g>
                <path d="M0 19.4 H340" stroke="url(#sbfV4RimGrad)" strokeWidth="1" />
                <path d="M0 22 H340" stroke="#E0F2FE" strokeWidth="0.4" opacity="0.65" />
                <circle cx="10" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="22" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="34" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="46" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="58" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="70" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="82" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="94" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="106" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="118" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="130" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="142" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="154" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="166" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="178" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="190" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="202" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="214" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="226" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="238" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="250" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="262" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="274" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="286" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="298" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="310" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="322" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                <circle cx="334" cy="22" r="0.75" fill="#E0F2FE" opacity="0.55" />
                
                <path d="M0 28 q9 -4 18 0 t18 0 q9 -4 18 0 t18 0 q9 -4 18 0 t18 0 q9 -4 18 0 t18 0 q9 -4 18 0 t18 0 q9 -4 18 0 t18 0 q9 -4 18 0 t18 0 q9 -4 18 0 t18 0 q9 -4 18 0 t18 0 q9 -4 18 0 t18 0 q9 -4 18 0 t18 0 q9 -4 18 0 t18 0 q9 -4 18 0 t18 0 q9 -4 18 0 t18 0 q9 -4 18 0 t18 0 q9 -4 18 0 t18 0 q9 -4 18 0 t18 0 q9 -4 18 0 t18 0 q9 -4 18 0 t18 0 " fill="none" stroke="#A5F3FC" strokeWidth="0.55" opacity="0.6" />
                <path d="M0 32 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 q7 -3 14 0 t14 0 " fill="none" stroke="#67E8F9" strokeWidth="0.45" opacity="0.5" />
                <path d="M0 36 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 q5 -2.4 10 0 t10 0 " fill="none" stroke="#22D3EE" strokeWidth="0.35" opacity="0.4" />
                <use href="#sbfV4Medallion" transform="translate(170,29.4) scale(0.7)" />
              </g>
              <path d="M-8 40 L348 40 L348 24.4 C 312 19.4, 286 27, 252 24 C 218 21, 196 28, 164 25 C 132 22, 108 29, 74 25.6 C 42 22.4, 18 28, -8 24 Z" fill="url(#sbfWaveDeepGrad)" opacity="0.9" />
              <path d="M-8 40 L348 40 L348 28.6 C 314 24, 288 31, 254 28.4 C 220 26, 198 32, 166 29.4 C 134 27, 110 33, 76 30 C 44 27.2, 18 32, -8 28.4 Z" fill="url(#sbfWaveMidGrad)" />
              <path d="M-8 40 L348 40 L348 33 C 314 29.4, 288 35, 254 32.6 C 220 30.4, 198 36, 166 33.6 C 134 31.4, 110 37, 76 34 C 44 31.4, 18 36, -8 32.6 Z" fill="url(#sbfSandGrad)" />

              <g className="sbf-wave">
                <path d="M38 29.4 C 46 25.6, 56 26, 62 29.6 C 54 28.6, 46 28.8, 38 29.4 Z" fill="url(#sbfFoamGrad)" />
                <path d="M150 30.6 C 158 26.8, 168 27.2, 174 30.8 C 166 29.8, 158 30, 150 30.6 Z" fill="url(#sbfFoamGrad)" />
                <path d="M248 29.8 C 256 26, 266 26.4, 272 30 C 264 29, 256 29.2, 248 29.8 Z" fill="url(#sbfFoamGrad)" />
              </g>
              <path d="M-8 37.4 C 60 34.6, 130 38.6, 196 36.4 C 260 34.2, 312 38, 348 35.4" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.55" fill="none" />

              <use href="#sbfShell" transform="translate(30,36) rotate(-8) scale(0.82)" />
              <use href="#sbfShell" transform="translate(120,37.4) rotate(10) scale(0.78)" />
              <use href="#sbfShell" transform="translate(210,36.6) rotate(-6) scale(0.8)" />
              <use href="#sbfStarfish" transform="translate(280,33) rotate(12) scale(0.86)" />
              <use href="#sbfCrab" transform="translate(80,33.4) scale(0.9)" />

              <g transform="translate(166,36) rotate(16)">
                <path d="M-2 0 C 0 -2.6, 3.4 -3, 4.6 -1 C 5.6 0.8, 4 2.4, 2 1.8 C 0.8 1.4, 0.4 0.6, 0.8 0.2" fill="none" stroke="#5EEAD4" strokeWidth="1.5" strokeLinecap="round" />
              </g>
              <g transform="translate(182,37.4) rotate(-10)">
                <path d="M-1.6 0 C 0 -2, 2.6 -2.4, 3.6 -0.8 C 4.4 0.6, 3 1.8, 1.6 1.4" fill="none" stroke="#99F6E4" strokeWidth="1.2" strokeLinecap="round" />
              </g>
            </svg>
          </div>

          {/* Góc TL: monstera + hoa sứ */}
          <div className="corner-ornament sbf-tl">
            <svg viewBox="0 0 58 58" width="58" height="58">
              <use href="#sbfMonstera" transform="translate(26,36) rotate(-18) scale(1.05)" />
              <use href="#sbfPlumeria" transform="translate(40,20) rotate(8) scale(1.02)" />
              <use href="#sbfPlumeria" transform="translate(20,15) rotate(-14) scale(0.74)" />
              <path d="M6 4 C 18 12, 30 22, 40 34" stroke="#16A34A" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.8" />
            </svg>
          </div>

          {/* Góc TR: hải âu bay có viền */}
          <div className="corner-ornament sbf-tr">
            <svg viewBox="0 0 54 44" width="54" height="44">
              <use href="#sbfSeagull" transform="translate(27,26) rotate(-6) scale(1.15)" />
              <ellipse cx="27" cy="35" rx="8" ry="2.4" fill="#E0F2FE" opacity="0.55" />
            </svg>
          </div>

          {/* Góc BL: vỏ sò + sea glass */}
          <div className="corner-ornament sbf-bl">
            <svg viewBox="0 0 52 50" width="52" height="50">
              <use href="#sbfShell" transform="translate(26,30) rotate(-10) scale(1.7)" />
              <g transform="translate(10,40) rotate(-18)">
                <path d="M-2.6 0 C 0 -3.6, 4.4 -4, 5.8 -1.4 C 6.8 0.8, 4.8 2.8, 2.4 2 C 0.8 1.4, 0.2 0.2, 1 -0.2" fill="none" stroke="#5EEAD4" strokeWidth="1.8" strokeLinecap="round" />
              </g>
              <ellipse cx="38" cy="42" rx="7" ry="2.2" fill="#FDE68A" opacity="0.8" />
            </svg>
          </div>

          {/* Góc BR: sao biển bump + gradient (giữ class beach-starfish-bottom-right) */}
          <div className="corner-ornament beach-starfish-bottom-right">
            <svg viewBox="0 0 58 58" width="54" height="54">
              <g transform="translate(29,28) rotate(15)">
                <use href="#sbfStarfish" transform="scale(2.1)" />
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* ========================================================
          4. MÙA THU: "Rừng Phong Hổ Phách" — cành gỗ filled thuôn,
          3 template lá phong, hạt sồi treo, nấm, sinh vật rừng
         ======================================================== */}
      {isAutumn && (
        <div className="wrapped-frame autumn-maple-frame">
          <FrameAmbient tone="autumn" />
          {/* Mép trên: cành filled + 7 lá phong 3 template + 2 hạt sồi treo giữa */}
          <div className="frame-border-top maple-border-top">
            <svg viewBox="0 0 340 38" preserveAspectRatio="none" className="maple-top-svg">
              <defs>
                <linearGradient id="mpfRubyGrad" x1="16%" y1="0%" x2="84%" y2="100%">
                  <stop offset="0%" stopColor="#F87171" />
                  <stop offset="42%" stopColor="#DC2626" />
                  <stop offset="78%" stopColor="#B91C1C" />
                  <stop offset="100%" stopColor="#7F1D1D" />
                </linearGradient>
                <linearGradient id="mpfAmberGrad" x1="16%" y1="0%" x2="84%" y2="100%">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="44%" stopColor="#F59E0B" />
                  <stop offset="80%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <linearGradient id="mpfRustGrad" x1="16%" y1="0%" x2="84%" y2="100%">
                  <stop offset="0%" stopColor="#FB923C" />
                  <stop offset="48%" stopColor="#EA580C" />
                  <stop offset="82%" stopColor="#C2410C" />
                  <stop offset="100%" stopColor="#9A3412" />
                </linearGradient>
                <linearGradient id="mpfBarkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#A3744F" />
                  <stop offset="34%" stopColor="#7A4A2A" />
                  <stop offset="72%" stopColor="#4A2A16" />
                  <stop offset="100%" stopColor="#2B180D" />
                </linearGradient>
                <linearGradient id="mpfBarkSideGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2B180D" />
                  <stop offset="46%" stopColor="#4A2A16" />
                  <stop offset="78%" stopColor="#7A4A2A" />
                  <stop offset="100%" stopColor="#A3744F" />
                </linearGradient>
                <linearGradient id="mpfAcornGrad" x1="18%" y1="0%" x2="82%" y2="100%">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="48%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#92400E" />
                </linearGradient>
                <linearGradient id="mpfAcornCapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5E3C" />
                  <stop offset="55%" stopColor="#6B4423" />
                  <stop offset="100%" stopColor="#3F2411" />
                </linearGradient>
                <linearGradient id="mpfMushroomGrad" x1="18%" y1="0%" x2="82%" y2="100%">
                  <stop offset="0%" stopColor="#FDBA74" />
                  <stop offset="52%" stopColor="#EA580C" />
                  <stop offset="100%" stopColor="#9A3412" />
                </linearGradient>
                <linearGradient id="mpfMushroomGillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FEF3C7" />
                  <stop offset="100%" stopColor="#D6B98C" />
                </linearGradient>
                <linearGradient id="mpfLeafShadeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2B180D" stopOpacity="0" />
                  <stop offset="100%" stopColor="#2B180D" stopOpacity="0.45" />
                </linearGradient>
                <radialGradient id="mpfGlowGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
                </radialGradient>

                {/* Template: lá phong ruby 5 thùy + gân tỏa + cuống */}
                <g id="mpfLeafRuby">
                  <path d="M0 9.6 L0 14" stroke="#4A2A16" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M0 -11 L1.4 -6.6 L4.4 -8.8 L3.6 -4.4 L8.6 -5.4 L5.2 -2.2 L10 -0.6 L6.6 1.2 L9.4 5 L4.8 4.2 L4.2 8.4 L1.6 5.4 L0 9.6 L-1.6 5.4 L-4.2 8.4 L-4.8 4.2 L-9.4 5 L-6.6 1.2 L-10 -0.6 L-5.2 -2.2 L-8.6 -5.4 L-3.6 -4.4 L-4.4 -8.8 L-1.4 -6.6 Z" fill="url(#mpfRubyGrad)" />
                  <path d="M0 -8 L0 8 M0 0 L-6 -3 M0 0 L6 -3 M0 -1 L-4 -7 M0 -1 L4 -7 M0 2 L-6 3.6 M0 2 L6 3.6" stroke="#7F1D1D" strokeWidth="0.45" opacity="0.45" fill="none" />
                  <path d="M0 -11 L1.4 -6.6 L4.4 -8.8 L3.6 -4.4 L8.6 -5.4 L5.2 -2.2 L4 -1 L0 -2.4 L-4 -1 L-5.2 -2.2 L-8.6 -5.4 L-3.6 -4.4 L-4.4 -8.8 L-1.4 -6.6 Z" fill="url(#mpfLeafShadeGrad)" opacity="0.5" />
                  <ellipse cx="-3.4" cy="-1.4" rx="3.4" ry="1.2" fill="#FCA5A5" opacity="0.35" transform="rotate(-24 -3.4 -1.4)" />
                </g>

                {/* Template: lá phong amber (thùy tròn hơn, thu nhỏ ngang) */}
                <g id="mpfLeafAmber">
                  <path d="M0 9 L0 13.4" stroke="#4A2A16" strokeWidth="1.4" strokeLinecap="round" />
                  <g transform="scale(0.92,1.04)">
                    <path d="M0 -10.6 C 1 -7.4, 1.4 -7, 4 -8.4 C 3.4 -5.4, 4 -4.6, 7.6 -5.2 C 5.6 -2.4, 5.2 -1.8, 9 -0.8 C 6.4 0.8, 6 1.4, 8.4 4.4 C 5 3.8, 4.4 4.2, 4 7.8 C 1.8 5.4, 1.4 5.2, 0 9 C -1.4 5.2, -1.8 5.4, -4 7.8 C -4.4 4.2, -5 3.8, -8.4 4.4 C -6 1.4, -6.4 0.8, -9 -0.8 C -5.2 -1.8, -5.6 -2.4, -7.6 -5.2 C -4 -4.6, -3.4 -5.4, -4 -8.4 C -1.4 -7, -1 -7.4, 0 -10.6 Z" fill="url(#mpfAmberGrad)" />
                    <path d="M0 -7.6 L0 7.4 M0 0 L-5.4 -2.6 M0 0 L5.4 -2.6 M0 -1 L-3.4 -6 M0 -1 L3.4 -6 M0 1.6 L-5 3.4 M0 1.6 L5 3.4" stroke="#B45309" strokeWidth="0.4" opacity="0.45" fill="none" />
                    <ellipse cx="-2.6" cy="-2.6" rx="3" ry="1" fill="#FDE68A" opacity="0.4" transform="rotate(-26 -2.6 -2.6)" />
                  </g>
                </g>

                {/* Template: lá phong rust (dài, thùy nhọn) */}
                <g id="mpfLeafRust">
                  <path d="M0 10 L0 14.6" stroke="#4A2A16" strokeWidth="1.4" strokeLinecap="round" />
                  <g transform="scale(0.88,1.08)">
                    <path d="M0 -11.4 L1.2 -6 L3.6 -8.6 L3.4 -3.6 L8 -5.8 L5 -1.8 L10.4 -0.2 L6.2 2 L8.6 6 L4 4.6 L3.6 8.8 L1.2 5.6 L0 10 L-1.2 5.6 L-3.6 8.8 L-4 4.6 L-8.6 6 L-6.2 2 L-10.4 -0.2 L-5 -1.8 L-8 -5.8 L-3.4 -3.6 L-3.6 -8.6 L-1.2 -6 Z" fill="url(#mpfRustGrad)" />
                    <path d="M0 -8.4 L0 8.4 M0 0 L-6.4 -3 M0 0 L6.4 -3 M0 -1 L-4.4 -7 M0 -1 L4.4 -7 M0 2 L-6 3.8 M0 2 L6 3.8" stroke="#9A3412" strokeWidth="0.4" opacity="0.45" fill="none" />
                    <ellipse cx="-3" cy="-1.6" rx="3" ry="1" fill="#FDBA74" opacity="0.35" transform="rotate(-30 -3 -1.6)" />
                  </g>
                </g>

                {/* Template: hạt sồi (nắp gân + thân gradient + cuống) */}
                <g id="mpfAcorn">
                  <path d="M0 -8.2 L0 -9.6" stroke="#4A2A16" strokeWidth="0.9" />
                  <path d="M-5 -1.4 C -5 -5.4, -2.6 -7.6, 0 -7.6 C 2.6 -7.6, 5 -5.4, 5 -1.4 C 3 0.6, -3 0.6, -5 -1.4 Z" fill="url(#mpfAcornCapGrad)" />
                  <g stroke="#2B180D" strokeWidth="0.35" opacity="0.55" fill="none">
                    <path d="M-4.2 -2.2 Q 0 -0.8 4.2 -2.2" /><path d="M-3.4 -4.2 Q 0 -2.8 3.4 -4.2" /><path d="M-2 -5.8 Q 0 -4.8 2 -5.8" />
                  </g>
                  <path d="M-4.4 -1.2 C -4.4 3.4, -2.4 7.4, 0 8.6 C 2.4 7.4, 4.4 3.4, 4.4 -1.2 C 2.6 0.4, -2.6 0.4, -4.4 -1.2 Z" fill="url(#mpfAcornGrad)" />
                  <ellipse cx="-1.4" cy="2" rx="1.2" ry="2.8" fill="#FEF3C7" opacity="0.45" />
                  <path d="M0 -1.2 L0 8" stroke="#92400E" strokeWidth="0.35" opacity="0.45" />
                </g>

                {/* Template: nấm mũ 5 gân */}
                <g id="mpfMushroom">
                  <path d="M-2.2 0 C -2.6 4, -1.8 7.4, 0 8.4 C 1.8 7.4, 2.6 4, 2.2 0 Z" fill="url(#mpfMushroomGillGrad)" />
                  <path d="M-2.4 0.4 L-3.6 6.4" stroke="#7A4A2A" strokeWidth="0.4" opacity="0.4" />
                  <path d="M-9 0.4 C -9 -4.6, -4.8 -7.6, 0 -7.6 C 4.8 -7.6, 9 -4.6, 9 0.4 C 5.4 2.2, -5.4 2.2, -9 0.4 Z" fill="url(#mpfMushroomGrad)" />
                  <g stroke="#4A2A16" strokeWidth="0.35" opacity="0.42" fill="none">
                    <path d="M-7.4 0 C -5 -2.4, -2 -3.4, 0 -3.4" /><path d="M7.4 0 C 5 -2.4, 2 -3.4, 0 -3.4" /><path d="M0 1.4 L0 -3.4" />
                  </g>
                  <g fill="#FDE68A" opacity="0.7"><circle cx="-4.4" cy="-3.6" r="1.1" /><circle cx="2.6" cy="-4.8" r="0.9" /><circle cx="5.2" cy="-1.4" r="0.8" /></g>
                  <ellipse cx="-4.6" cy="-4.4" rx="2.2" ry="0.7" fill="#FFF7ED" opacity="0.4" transform="rotate(-24 -4.6 -4.4)" />
                </g>

                {/* Template: nấm bám thân 3 tầng */}
                <g id="mpfShelfFungus">
                  <path d="M0 0 C 6 -1, 11 -0.4, 13 2 C 11 3.6, 5 4, 0 2.6 Z" fill="url(#mpfMushroomGrad)" />
                  <path d="M0 3 C 7 2, 13 2.6, 15 4.6 C 12 6.4, 5 6.6, 0 5.4 Z" fill="#D97706" opacity="0.9" />
                  <path d="M0 5.6 C 6 5, 12 5.4, 14 7 C 11 8.6, 4 8.8, 0 7.6 Z" fill="#B45309" opacity="0.85" />
                  <path d="M1 1 C 5 0.4, 9 0.8, 11 2" stroke="#FDE68A" strokeWidth="0.4" opacity="0.6" fill="none" />
                  <path d="M1.4 4.4 C 5 3.8, 9 4, 11.4 5" stroke="#FDE68A" strokeWidth="0.35" opacity="0.45" fill="none" />
                </g>
              
                <linearGradient id="mpfV4Relief" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#451A03" />
                  <stop offset="45%" stopColor="#92400E" />
                  <stop offset="100%" stopColor="#FCD34D" />
                </linearGradient>
                <linearGradient id="mpfV4RimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FEF3C7" />
                  <stop offset="48%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#7C2D12" />
                </linearGradient>
                <radialGradient id="mpfV4MedalGrad" cx="46%" cy="38%" r="62%">
                  <stop offset="0%" stopColor="#FFFBEB" />
                  <stop offset="40%" stopColor="#FBBF24" />
                  <stop offset="78%" stopColor="#B45309" />
                  <stop offset="100%" stopColor="#451A03" />
                </radialGradient>
                <g id="mpfV4Medallion">
                  <circle r="9.6" fill="none" stroke="url(#mpfV4RimGrad)" strokeWidth="1.5" />
                  <circle cy="-10.6" r="0.55" fill="#FDE68A" transform="rotate(0)" /><circle cy="-10.6" r="0.55" fill="#FDE68A" transform="rotate(20)" /><circle cy="-10.6" r="0.55" fill="#FDE68A" transform="rotate(40)" /><circle cy="-10.6" r="0.55" fill="#FDE68A" transform="rotate(60)" /><circle cy="-10.6" r="0.55" fill="#FDE68A" transform="rotate(80)" /><circle cy="-10.6" r="0.55" fill="#FDE68A" transform="rotate(100)" /><circle cy="-10.6" r="0.55" fill="#FDE68A" transform="rotate(120)" /><circle cy="-10.6" r="0.55" fill="#FDE68A" transform="rotate(140)" /><circle cy="-10.6" r="0.55" fill="#FDE68A" transform="rotate(160)" /><circle cy="-10.6" r="0.55" fill="#FDE68A" transform="rotate(180)" /><circle cy="-10.6" r="0.55" fill="#FDE68A" transform="rotate(200)" /><circle cy="-10.6" r="0.55" fill="#FDE68A" transform="rotate(220)" /><circle cy="-10.6" r="0.55" fill="#FDE68A" transform="rotate(240)" /><circle cy="-10.6" r="0.55" fill="#FDE68A" transform="rotate(260)" /><circle cy="-10.6" r="0.55" fill="#FDE68A" transform="rotate(280)" /><circle cy="-10.6" r="0.55" fill="#FDE68A" transform="rotate(300)" /><circle cy="-10.6" r="0.55" fill="#FDE68A" transform="rotate(320)" /><circle cy="-10.6" r="0.55" fill="#FDE68A" transform="rotate(340)" />
                  <circle r="8" fill="url(#mpfV4MedalGrad)" opacity="0.92" />
                  <path d="M0 -6.4 L2.6 -2.2 L7 -1.8 L3.8 1.4 L4.8 6 L0 4 L-4.8 6 L-3.8 1.4 L-7 -1.8 L-2.6 -2.2 Z" fill="#7C2D12" opacity="0.85" />
                  <path d="M0 0 L0 -4.8" stroke="#FDE68A" strokeWidth="0.5" opacity="0.8" transform="rotate(0)" /><path d="M0 0 L0 -4.8" stroke="#FDE68A" strokeWidth="0.5" opacity="0.8" transform="rotate(72)" /><path d="M0 0 L0 -4.8" stroke="#FDE68A" strokeWidth="0.5" opacity="0.8" transform="rotate(144)" /><path d="M0 0 L0 -4.8" stroke="#FDE68A" strokeWidth="0.5" opacity="0.8" transform="rotate(216)" /><path d="M0 0 L0 -4.8" stroke="#FDE68A" strokeWidth="0.5" opacity="0.8" transform="rotate(288)" />
                  <circle r="1.5" fill="#FFFBEB" />
                  <path d="M-8 5.4 A 9.6 9.6 0 0 0 8 5.4" fill="none" stroke="#451A03" strokeWidth="0.9" opacity="0.4" />
                </g>
              </defs>

              {/* Thân chính filled thuôn + 2 vi cành */}
              <path d="M-6 16.4 C 26 12.4, 58 6.4, 92 7.4 C 126 8.4, 152 14.4, 186 12.4 C 218 10.4, 248 4.4, 280 5.2 C 308 6, 326 9.4, 346 8.4 L 346 11.6 C 326 12.8, 308 9.8, 280 8.8 C 248 8, 218 14, 186 16 C 152 18, 126 12, 92 11 C 58 10, 26 16.4, -6 19.6 Z" fill="url(#mpfBarkGrad)" />
              <path d="M-6 17.4 C 26 13.4, 58 7.4, 92 8.4 C 126 9.4, 152 15.4, 186 13.4 C 218 11.4, 248 5.4, 280 6.2 C 308 7, 326 10.4, 346 9.4" stroke="#C9A27A" strokeWidth="0.5" opacity="0.45" fill="none" />
              <path d="M96 10.6 C 93 6, 91 2, 92 -1 L 94 -1.4 C 94.4 2, 96.4 6.4, 98.6 10.2 Z" fill="url(#mpfBarkGrad)" />
              <path d="M252 7.6 C 256 4, 258 1, 257.4 -1.6 L 255.4 -1.4 C 255.8 1.4, 253.6 4.6, 249.6 8.2 Z" fill="url(#mpfBarkGrad)" />
              <ellipse cx="168" cy="13.6" rx="1.6" ry="1.1" fill="#2B180D" stroke="#7A4A2A" strokeWidth="0.3" />
              <ellipse cx="64" cy="10.6" rx="1.3" ry="0.9" fill="#2B180D" stroke="#7A4A2A" strokeWidth="0.3" />
              <circle cx="132" cy="10.6" r="0.45" fill="#2B180D" opacity="0.6" />
              <circle cx="226" cy="12.6" r="0.5" fill="#2B180D" opacity="0.6" />

              {/* 7 lá phong 3 template, scale .55–.95, xoay khác nhau */}
              <use href="#mpfLeafRuby" transform="translate(24,13) rotate(-24) scale(0.9)" />
              <use href="#mpfLeafAmber" transform="translate(62,10.4) rotate(18) scale(0.7)" />
              <use href="#mpfLeafRust" transform="translate(104,11.6) rotate(-8) scale(0.8)" />
              <use href="#mpfLeafRuby" transform="translate(140,8.4) rotate(26) scale(0.58)" />
              <use href="#mpfLeafAmber" transform="translate(206,11) rotate(-18) scale(0.86)" />
              <use href="#mpfLeafRust" transform="translate(284,10.4) rotate(14) scale(0.72)" />
              <use href="#mpfLeafRuby" transform="translate(322,12.6) rotate(-10) scale(0.94)" />

              {/* 2 hạt sồi treo giữa (dip y27, không chạm HUD) */}
              <path d="M150 12 L150 17.4 M250 7.4 L250 13" stroke="#4A2A16" strokeWidth="0.6" />
              <use href="#mpfAcorn" transform="translate(150,23) rotate(-6) scale(0.9)" />
              <use href="#mpfAcorn" transform="translate(250,18.6) rotate(8) scale(0.82)" />

              {/* 3 berry khô + 2 dust mote */}
              <g fill="#7F1D1D">
                <circle cx="88" cy="14.4" r="1.5" /><circle cx="92" cy="16.6" r="1.2" /><circle cx="84.6" cy="17" r="1.1" />
              </g>
              <g fill="#FDE68A" opacity="0.55">
                <circle cx="182" cy="6.4" r="0.8" /><circle cx="292" cy="4.6" r="0.7" />
              </g>
              <path d="M176 16.4 C 176.3 17.6, 176.8 18.1, 178 18.4 C 176.8 18.7, 176.3 19.2, 176 20.4 C 175.7 19.2, 175.2 18.7, 174 18.4 C 175.2 18.1, 175.7 17.6, 176 16.4 Z" fill="#FDE68A" className="mpf-twinkle" />
            
              {/* V4 — vân gỗ chạm, ô lưới khắc, viền kép, hạt cườm, huy hiệu lá phong */}
              <g>
                <path d="M0 11 C 58 7, 96 17, 156 10 C 216 3, 274 15, 340 9" fill="none" stroke="#FCD34D" strokeWidth="0.55" opacity="0.55" />
                <path d="M0 15 C 58 11, 96 21, 156 14 C 216 7, 274 19, 340 13" fill="none" stroke="#F59E0B" strokeWidth="0.47000000000000003" opacity="0.47000000000000003" />
                <path d="M0 19 C 58 15, 96 25, 156 18 C 216 11, 274 23, 340 17" fill="none" stroke="#B45309" strokeWidth="0.39" opacity="0.39" />
                <path d="M0 23 C 58 19, 96 29, 156 22 C 216 15, 274 27, 340 21" fill="none" stroke="#FDE68A" strokeWidth="0.31000000000000005" opacity="0.31000000000000005" />
                <path d="M110 27 h12 v9 h-12 z M112 29 h8 v5 h-8" fill="none" stroke="#FDE68A" strokeWidth="0.35" opacity="0.35" /><path d="M130 27 h12 v9 h-12 z M132 29 h8 v5 h-8" fill="none" stroke="#FDE68A" strokeWidth="0.35" opacity="0.35" /><path d="M150 27 h12 v9 h-12 z M152 29 h8 v5 h-8" fill="none" stroke="#FDE68A" strokeWidth="0.35" opacity="0.35" /><path d="M170 27 h12 v9 h-12 z M172 29 h8 v5 h-8" fill="none" stroke="#FDE68A" strokeWidth="0.35" opacity="0.35" /><path d="M190 27 h12 v9 h-12 z M192 29 h8 v5 h-8" fill="none" stroke="#FDE68A" strokeWidth="0.35" opacity="0.35" />
                <path d="M0 15 C 60 10, 120 19, 170 13 C 220 7, 286 16, 340 11" fill="none" stroke="#7C2D12" strokeWidth="0.55" opacity="0.45" />
                <path d="M0 3 H340" stroke="url(#mpfV4RimGrad)" strokeWidth="1.1" opacity="0.62" />
                <path d="M0 5.6 H340" stroke="#FEF3C7" strokeWidth="0.45" opacity="0.4" />
                <circle cx="10" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="22" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="34" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="46" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="58" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="70" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="82" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="94" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="106" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="118" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="130" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="142" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="154" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="166" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="178" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="190" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="202" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="214" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="226" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="238" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="250" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="262" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="274" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="286" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="298" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="310" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="322" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                <circle cx="334" cy="5.6" r="0.8" fill="#FDE68A" opacity="0.65" />
                
                <use href="#mpfV4Medallion" transform="translate(206,17.6) scale(0.74)" />
              </g>
            </svg>
          </div>

          {/* Cạnh trái: bough filled + 4 lá + shelf fungus y≈200 */}
          <div className="frame-border-side border-left maple-border-left">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="maple-side-svg">
              <g>
                <path d="M1.2 0 V460" stroke="url(#mpfV4RimGrad)" strokeWidth="0.9" opacity="0.5" />
                <path d="M3 0 C 7 84, 1 168, 6 250 C 11 330, 3 392, 7 460" fill="none" stroke="#FCD34D" strokeWidth="0.5" opacity="0.5" />
                <path d="M7 0 C 11 84, 5 168, 10 250 C 15 330, 7 392, 11 460" fill="none" stroke="#F59E0B" strokeWidth="0.43" opacity="0.43" />
                <path d="M11 0 C 15 84, 9 168, 14 250 C 19 330, 11 392, 15 460" fill="none" stroke="#B45309" strokeWidth="0.36" opacity="0.36" />
                <path d="M15 0 C 19 84, 13 168, 18 250 C 23 330, 15 392, 19 460" fill="none" stroke="#FDE68A" strokeWidth="0.29" opacity="0.29" />
                <path d="M2 10 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 52 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 94 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 136 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 178 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 220 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 262 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 304 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 346 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 388 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 430 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" />
                <circle cx="13" cy="10" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="38" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="66" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="94" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="122" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="150" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="178" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="206" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="234" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="262" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="290" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="318" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="346" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="374" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="402" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="430" r="0.7" fill="#FDE68A" opacity="0.55" />
                
              </g>
              <path d="M0 0 L5 0 C 4 100, 5.6 200, 4.4 300 C 3.4 380, 5 430, 4.2 460 L0 460 Z" fill="#2B180D" opacity="0.12" />
              <path d="M14 -4 C 9 80, 20 160, 15 230 C 10 300, 20 380, 17 464 L 20.6 464 C 23.6 380, 13.6 300, 18.6 230 C 23.6 160, 12.6 80, 17.6 -4 Z" fill="url(#mpfBarkSideGrad)" />
              <path d="M14.6 -4 C 9.6 80, 20.6 160, 15.6 230 C 10.6 300, 20.6 380, 17.6 464" stroke="#C9A27A" strokeWidth="0.5" opacity="0.4" fill="none" />
              <ellipse cx="16.4" cy="146" rx="1.4" ry="2" fill="#2B180D" stroke="#7A4A2A" strokeWidth="0.3" />
              <circle cx="18" cy="256" r="0.45" fill="#2B180D" opacity="0.6" />

              <use href="#mpfLeafRuby" transform="translate(13.4,30) rotate(-76) scale(0.58)" />
              <use href="#mpfLeafAmber" transform="translate(16.4,120) rotate(58) scale(0.62)" />
              <use href="#mpfLeafRust" transform="translate(13.6,245) rotate(-64) scale(0.6)" />
              <use href="#mpfLeafRuby" transform="translate(16.2,360) rotate(70) scale(0.56)" />

              <path d="M17 154 C 22 160, 24 166, 23.6 174" stroke="#4A2A16" strokeWidth="0.9" fill="none" />
              <use href="#mpfLeafAmber" transform="translate(23.4,180) rotate(136) scale(0.5)" />
              <path d="M14 336 C 9 342, 7.6 350, 8.6 356" stroke="#4A2A16" strokeWidth="0.9" fill="none" />
              <use href="#mpfLeafRust" transform="translate(8.4,362) rotate(-126) scale(0.5)" />

              <use href="#mpfShelfFungus" transform="translate(14,200) rotate(-8) scale(0.62)" />
              <use href="#mpfShelfFungus" transform="translate(15,196) rotate(-8) scale(-0.4,0.4)" />

              <path d="M9 128 C 9.3 129.4, 9.9 130, 11.3 130.3 C 9.9 130.6, 9.3 131.2, 9 132.6 C 8.7 131.2, 8.1 130.6, 6.7 130.3 C 8.1 130, 8.7 129.4, 9 128 Z" fill="#FDE68A" className="mpf-twinkle" style={{ animationDelay: "0.7s" }} />
            </svg>
          </div>

          {/* Cạnh phải: phase lệch + hạt sồi treo y≈325 */}
          <div className="frame-border-side border-right maple-border-right">
            <svg viewBox="0 0 32 460" preserveAspectRatio="none" className="maple-side-svg">
              <g>
                <path d="M1.2 0 V460" stroke="url(#mpfV4RimGrad)" strokeWidth="0.9" opacity="0.5" />
                <path d="M3 0 C 7 84, 1 168, 6 250 C 11 330, 3 392, 7 460" fill="none" stroke="#FCD34D" strokeWidth="0.5" opacity="0.5" />
                <path d="M7 0 C 11 84, 5 168, 10 250 C 15 330, 7 392, 11 460" fill="none" stroke="#F59E0B" strokeWidth="0.43" opacity="0.43" />
                <path d="M11 0 C 15 84, 9 168, 14 250 C 19 330, 11 392, 15 460" fill="none" stroke="#B45309" strokeWidth="0.36" opacity="0.36" />
                <path d="M15 0 C 19 84, 13 168, 18 250 C 23 330, 15 392, 19 460" fill="none" stroke="#FDE68A" strokeWidth="0.29" opacity="0.29" />
                <path d="M2 10 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 52 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 94 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 136 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 178 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 220 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 262 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 304 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 346 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 388 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" /><path d="M2 430 l10 12 m0 -12 l-10 12" stroke="#FDE68A" strokeWidth="0.35" opacity="0.3" />
                <circle cx="13" cy="10" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="38" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="66" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="94" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="122" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="150" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="178" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="206" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="234" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="262" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="290" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="318" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="346" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="374" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="402" r="0.7" fill="#FDE68A" opacity="0.55" />
                <circle cx="13" cy="430" r="0.7" fill="#FDE68A" opacity="0.55" />
                
              </g>
              <path d="M27 0 L32 0 L32 460 L27.8 460 C 29 400, 27.4 320, 28.6 240 C 30 160, 28.4 80, 27 0 Z" fill="#2B180D" opacity="0.12" />
              <path d="M18 -4 C 23 80, 12 160, 17 230 C 22 300, 12 380, 15 464 L 11.4 464 C 8.4 380, 18.4 300, 13.4 230 C 8.4 160, 19.4 80, 14.4 -4 Z" fill="url(#mpfBarkSideGrad)" />
              <path d="M17.4 -4 C 22.4 80, 11.4 160, 16.4 230 C 21.4 300, 11.4 380, 14.4 464" stroke="#C9A27A" strokeWidth="0.5" opacity="0.4" fill="none" />
              <ellipse cx="15.6" cy="178" rx="1.4" ry="2" fill="#2B180D" stroke="#7A4A2A" strokeWidth="0.3" />

              <use href="#mpfLeafAmber" transform="translate(18.6,60) rotate(72) scale(0.6)" />
              <use href="#mpfLeafRuby" transform="translate(15.6,165) rotate(-58) scale(0.62)" />
              <use href="#mpfLeafRust" transform="translate(18.4,290) rotate(66) scale(0.58)" />
              <use href="#mpfLeafAmber" transform="translate(15.8,405) rotate(-70) scale(0.56)" />

              <path d="M17 228 C 23 234, 24.6 240, 23.8 248" stroke="#4A2A16" strokeWidth="0.9" fill="none" />
              <use href="#mpfLeafRuby" transform="translate(23.6,254) rotate(128) scale(0.5)" />
              <path d="M17 92 C 11 98, 9 106, 9.6 112" stroke="#4A2A16" strokeWidth="0.9" fill="none" />
              <use href="#mpfLeafRust" transform="translate(9.4,118) rotate(-132) scale(0.5)" />

              <path d="M15 312 L19 320" stroke="#4A2A16" strokeWidth="0.7" />
              <use href="#mpfAcorn" transform="translate(19.4,326) rotate(12) scale(0.82)" />

              <path d="M23 140 C 23.3 141.4, 23.9 142, 25.3 142.3 C 23.9 142.6, 23.3 143.2, 23 144.6 C 22.7 143.2, 22.1 142.6, 20.7 142.3 C 22.1 142, 22.7 141.4, 23 140 Z" fill="#FDE68A" className="mpf-twinkle" style={{ animationDelay: "0.3s" }} />
            </svg>
          </div>

          {/* Mép đáy: 2 lớp lá rụng + 6 lá + 2 sồi + nấm + lá cuộn + cỏ (ink ≥ y22) */}
          <div className="frame-border-bottom maple-border-bottom">
            <svg viewBox="0 0 340 42" preserveAspectRatio="none" className="maple-bottom-svg">
              <g>
                <path d="M0 20 H340" stroke="url(#mpfV4RimGrad)" strokeWidth="1" />
                <path d="M0 22.6 H340" stroke="#FEF3C7" strokeWidth="0.4" opacity="0.6" />
                <circle cx="10" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="22" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="34" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="46" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="58" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="70" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="82" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="94" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="106" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="118" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="130" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="142" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="154" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="166" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="178" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="190" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="202" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="214" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="226" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="238" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="250" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="262" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="274" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="286" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="298" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="310" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="322" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                <circle cx="334" cy="22.6" r="0.75" fill="#FDE68A" opacity="0.55" />
                
                <path d="M0 31 C 60 24, 120 34, 170 27 C 220 20, 286 30, 340 24" fill="none" stroke="#FCD34D" strokeWidth="0.5" opacity="0.55" />
                <path d="M0 36 C 70 30, 110 39, 170 33 C 236 27, 280 38, 340 31" fill="none" stroke="#B45309" strokeWidth="0.45" opacity="0.5" />
                <use href="#mpfV4Medallion" transform="translate(170,30) scale(0.7)" />
              </g>
              <path d="M-8 42 L348 42 L348 27 C 298 22, 256 30, 206 26 C 156 22, 110 32, 62 28 C 34 25.6, 8 30, -8 27 Z" fill="url(#mpfAmberGrad)" opacity="0.28" />
              <path d="M-8 42 L348 42 L348 33 C 298 28, 256 36, 206 32 C 156 28, 110 38, 62 34 C 34 31.6, 8 36, -8 33 Z" fill="url(#mpfRustGrad)" opacity="0.22" />
              <path d="M-8 27 C 42 24, 92 30, 142 27 C 192 24, 248 30, 348 26" stroke="#4A2A16" strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.8" />

              <use href="#mpfLeafRuby" transform="translate(38,33) rotate(-58) scale(0.58)" />
              <use href="#mpfLeafAmber" transform="translate(96,32) rotate(42) scale(0.62)" />
              <use href="#mpfLeafRust" transform="translate(148,34.4) rotate(-16) scale(0.6)" />
              <use href="#mpfLeafAmber" transform="translate(196,31) rotate(64) scale(0.56)" />
              <use href="#mpfLeafRuby" transform="translate(244,33.6) rotate(28) scale(0.6)" />
              <use href="#mpfLeafRust" transform="translate(318,33) rotate(-44) scale(0.62)" />

              <use href="#mpfAcorn" transform="translate(168,32) rotate(-64) scale(0.78)" />
              <use href="#mpfAcorn" transform="translate(230,34.6) rotate(74) scale(0.72)" />

              <use href="#mpfMushroom" transform="translate(72,32.4) scale(0.9)" />
              <g transform="translate(290,32.6) rotate(8)">
                <path d="M-8 6 C -8 -2, -2 -7, 4 -5 C 9 -3, 9 4, 3 6 C -1 7.4, -4 6, -4 3 C -4 0.6, -1.6 0, 0 1.4" fill="none" stroke="url(#mpfRustGrad)" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M-7 5.4 C -7 -1.6, -2 -6, 3.6 -4.4" fill="none" stroke="#FDBA74" strokeWidth="0.7" opacity="0.6" />
              </g>

              <g stroke="#4D7C0F" strokeWidth="1.2" strokeLinecap="round" fill="none">
                <path d="M12 38 C 10 32, 10 28, 12 24" /><path d="M18 38.4 C 18 33, 20 29, 22 26" /><path d="M24 38 C 25 33, 28 30, 31 28" />
                <path d="M126 38 C 124 33, 124 30, 126 26" /><path d="M132 38.4 C 132 33, 134 30, 136 27" />
                <path d="M268 38 C 266 32, 266 29, 268 25" /><path d="M274 38.4 C 274 33, 276 30, 278 27" /><path d="M280 38 C 281 33, 284 30, 287 28" />
              </g>
              <g stroke="#65A30D" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.8">
                <path d="M56 38.6 C 55 34, 55 31, 56 28" /><path d="M60 38.4 C 60 34, 61.6 31, 63 29" />
                <path d="M212 38.6 C 211 34, 211 31, 212 28" /><path d="M216 38.4 C 216 34, 218 31, 219 29" />
              </g>
            </svg>
          </div>

          {/* Góc TL: cành + 2 lá + hạt sồi */}
          <div className="corner-ornament mpf-tl">
            <svg viewBox="0 0 56 56" width="56" height="56">
              <path d="M4 50 C 14 38, 24 26, 34 16 C 38 12, 42 9, 46 6" stroke="url(#mpfBarkGrad)" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M28 24 C 34 22, 38 18, 40 13" stroke="url(#mpfBarkGrad)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <use href="#mpfLeafRuby" transform="translate(34,18) rotate(28) scale(1.1)" />
              <use href="#mpfLeafAmber" transform="translate(20,34) rotate(-38) scale(0.95)" />
              <use href="#mpfAcorn" transform="translate(45,32) rotate(16) scale(0.9)" />
            </svg>
          </div>

          {/* Góc TR: 2 hạt sồi treo + 2 lá (acorn-sway) */}
          <div className="corner-ornament mpf-tr">
            <svg viewBox="0 0 50 58" width="50" height="58">
              <path d="M14 0 C 16 10, 18 18, 20 26 M36 0 C 34 8, 32 14, 30 20" stroke="#4A2A16" strokeWidth="0.8" fill="none" />
              <g className="mpf-acorn">
                <use href="#mpfAcorn" transform="translate(20,32) rotate(-8) scale(0.98)" />
              </g>
              <g className="mpf-acorn" style={{ animationDelay: "0.8s" }}>
                <use href="#mpfAcorn" transform="translate(30,26) rotate(10) scale(0.86)" />
              </g>
              <use href="#mpfLeafRust" transform="translate(10,44) rotate(-66) scale(0.8)" />
              <use href="#mpfLeafAmber" transform="translate(42,48) rotate(58) scale(0.74)" />
            </svg>
          </div>

          {/* Góc BL: nấm + lá */}
          <div className="corner-ornament mpf-bl">
            <svg viewBox="0 0 52 50" width="52" height="50">
              <use href="#mpfMushroom" transform="translate(28,30) scale(1.5)" />
              <use href="#mpfLeafAmber" transform="translate(12,38) rotate(-56) scale(0.9)" />
              <g stroke="#4D7C0F" strokeWidth="1" strokeLinecap="round" fill="none">
                <path d="M42 46 C 41 41, 41 38, 43 35" /><path d="M46 46 C 46 42, 47 39, 49 37" />
              </g>
            </svg>
          </div>

          {/* Góc BR: lá cuộn + hạt sồi */}
          <div className="corner-ornament mpf-br">
            <svg viewBox="0 0 54 46" width="54" height="46">
              <g transform="translate(28,22) rotate(-6)">
                <path d="M-12 10 C -12 -2, -2 -10, 8 -7 C 16 -4, 16 6, 6 9 C -1 11, -6 8, -6 3 C -6 -1, -2 -2, 1 0" fill="none" stroke="url(#mpfRustGrad)" strokeWidth="4" strokeLinecap="round" />
                <path d="M-10 8 C -10 -1, -2 -8, 7 -5.6" fill="none" stroke="#FDBA74" strokeWidth="0.9" opacity="0.6" />
              </g>
              <use href="#mpfAcorn" transform="translate(44,38) rotate(24) scale(0.84)" />
              <use href="#mpfLeafRuby" transform="translate(12,38) rotate(-48) scale(0.72)" />
            </svg>
          </div>

          {/* Lá phong rơi (HTML): 3 span mép hai bên */}
          {[
            { left: "6.5%", delay: "0s", dur: "14s" },
            { left: "9.5%", delay: "2.6s", dur: "16s" },
            { left: "12%", delay: "5.2s", dur: "13.5s" },
            { left: "7.5%", delay: "7.8s", dur: "15.5s" },
            { left: "88%", delay: "5s", dur: "16s" },
            { left: "91%", delay: "1.4s", dur: "14.5s" },
            { left: "94%", delay: "9s", dur: "15s" },
          ].map((p, i) => (
            <span key={`mpf-leaf-fall-${i}`} className="mpf-leaf-fall" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur }}>
              <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
                <path d="M6 0.6 L7 3.6 L9.4 2.4 L8.8 5 L11.4 5.8 L9 7.4 L10.4 9.8 L7.8 9.4 L6 11.4 L4.2 9.4 L1.6 9.8 L3 7.4 L0.6 5.8 L3.2 5 L2.6 2.4 L5 3.6 Z" fill="url(#mpfRubyGrad)" />
                <path d="M6 2.6 L6 10.4" stroke="#7F1D1D" strokeWidth="0.4" opacity="0.5" />
              </svg>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

type FrameTone = "winter" | "spring" | "tet" | "newyear" | "summer" | "autumn";

function FrameAmbient({ tone }: { tone: FrameTone }) {
  return (
    <div className={`frame-ambient tone-${tone}`}>
      <span className="ambient-edge ambient-top" />
      <span className="ambient-edge ambient-right" />
      <span className="ambient-edge ambient-left" />
      <span className="ambient-edge ambient-bottom" />
    </div>
  );
}

function ParticleField({ kind, count = 7 }: { kind: "snow" | "petal" | "leaf" | "confetti" | "bubble" | "pollen"; count?: number }) {
  return (
    <div className="particle-field">
      {Array.from({ length: count }).map((_, i) => (
        <span key={`${kind}-${i}`} className={`particle particle-${kind}`} />
      ))}
    </div>
  );
}
