"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useSiteSettings } from "./SiteSettingsProvider";

export type BaseSeason = "spring" | "summer" | "autumn" | "winter";
export type SeasonMode = BaseSeason | "transition";
export type SpringSubMode = "natural" | "tet-am" | "tet-duong";

export interface SeasonDetails {
  id: BaseSeason;
  name: string;
  icon: string;
  dateRange: string;
  description: string;
}

export const SEASONS_DATA: Record<BaseSeason, SeasonDetails> = {
  spring: {
    id: "spring",
    name: "Mùa Xuân & Tết",
    icon: "🌸",
    dateRange: "11/02 – 28/04",
    description: "Xuân Tự Nhiên (ngoài Tết: Nắng ấm & Hoa bay), Tết Dương Lịch & Tết Âm Lịch",
  },
  summer: {
    id: "summer",
    name: "Mùa Hạ (Bãi Biển)",
    icon: "🏖️",
    dateRange: "11/05 – 31/07",
    description: "Phong cách bãi biển nhiệt đới, sóng vỗ chill, rặng dừa & sao biển",
  },
  autumn: {
    id: "autumn",
    name: "Mùa Thu (Lá Phong)",
    icon: "🍁",
    dateRange: "15/08 – 07/11",
    description: "Phong cách thu lá phong đỏ rực chao liệng xoay 3D & nắng hổ phách",
  },
  winter: {
    id: "winter",
    name: "Mùa Đông (Tuyết & Noel)",
    icon: "❄️",
    dateRange: "21/11 – 27/01",
    description: "Phong cách tuyết lạnh băng giá, Giáng Sinh Noel & mũ Noel",
  },
};

/**
 * Kiểm tra các dịp lễ hội chính xác:
 * 1. Tết Dương Lịch: Đúng 3 ngày (31/12, 1/1, 2/1)
 * 2. Tết Âm Lịch: Từ 20 tháng Chạp ÂL đến hết mùng 10 tháng Giêng ÂL
 *    - Năm 2025: 19/01 - 07/02
 *    - Năm 2026 (Năm hiện tại của Portfolio): 07/02 - 26/02
 *    - Năm 2027: 27/01 - 15/02
 * 3. Mùa Noel Giáng Sinh: 15/12 đến 26/12
 */
export function isTetDuongLich(date: Date = new Date()): boolean {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return (m === 12 && d === 31) || (m === 1 && (d === 1 || d === 2));
}

export function isTetAmLich(date: Date = new Date()): boolean {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const val = m * 100 + d;

  const tetRanges: Record<number, [number, number]> = {
    2025: [119, 207], // 19/01 - 07/02
    2026: [207, 226], // 07/02 - 26/02 (Năm portfolio)
    2027: [127, 215], // 27/01 - 15/02
    2028: [116, 204], // 16/01 - 04/02
    2029: [203, 222], // 03/02 - 22/02
    2030: [123, 211], // 23/01 - 11/02
  };

  const range = tetRanges[y] || [207, 226];
  return val >= range[0] && val <= range[1];
}

export function isNoelSeason(date: Date = new Date()): boolean {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return m === 12 && d >= 15 && d <= 26;
}

export function calculateDateSeason(date: Date = new Date()): {
  activeMode: SeasonMode;
  baseSeason: BaseSeason;
  festive: "none" | "newyear" | "tet" | "spring-natural" | "beach" | "autumn" | "noel";
  transitionName?: string;
  isMidWinter?: boolean;
} {
  const m = date.getMonth() + 1;
  const d = date.getDate();

  // Ưu tiên 1: Tết Dương Lịch (31/12, 1/1, 2/1)
  if (isTetDuongLich(date)) {
    return {
      activeMode: "spring",
      baseSeason: "spring",
      festive: "newyear",
      transitionName: "Tết Dương Lịch",
    };
  }

  // Ưu tiên 2: Tết Âm Lịch (20 tháng Chạp đến mùng 10 tháng Giêng)
  if (isTetAmLich(date)) {
    return {
      activeMode: "spring",
      baseSeason: "spring",
      festive: "tet",
      transitionName: "Tết Nguyên Đán",
    };
  }

  // Ưu tiên 3: Noel Giáng Sinh (15/12 - 26/12)
  if (isNoelSeason(date)) {
    return {
      activeMode: "winter",
      baseSeason: "winter",
      festive: "noel",
      isMidWinter: true,
      transitionName: "Mùa Giáng Sinh & Noel",
    };
  }

  // Giao mùa:
  // Giao mùa Thu ➔ Đông (08/11 - 20/11)
  if (m === 11 && d >= 8 && d <= 20) {
    return {
      activeMode: "transition",
      baseSeason: "winter",
      festive: "none",
      transitionName: "Giao Mùa: Thu ➔ Đông",
    };
  }

  // Giao mùa Đông ➔ Xuân (28/01 - 10/02)
  if ((m === 1 && d >= 28) || (m === 2 && d <= 10)) {
    return {
      activeMode: "transition",
      baseSeason: "spring",
      festive: "none",
      transitionName: "Giao Mùa: Đông ➔ Xuân",
    };
  }

  // Giao mùa Xuân ➔ Hạ (29/04 - 10/05)
  if ((m === 4 && d >= 29) || (m === 5 && d <= 10)) {
    return {
      activeMode: "transition",
      baseSeason: "summer",
      festive: "beach",
      transitionName: "Giao Mùa: Xuân ➔ Hạ",
    };
  }

  // Giao mùa Hạ ➔ Thu (01/08 - 14/08)
  if (m === 8 && d >= 1 && d <= 14) {
    return {
      activeMode: "transition",
      baseSeason: "autumn",
      festive: "autumn",
      transitionName: "Giao Mùa: Hạ ➔ Thu",
    };
  }

  // Các mùa chính
  if ((m === 2 && d >= 11) || m === 3 || (m === 4 && d <= 28)) {
    return { activeMode: "spring", baseSeason: "spring", festive: "spring-natural" };
  }

  if ((m === 5 && d >= 11) || m === 6 || m === 7) {
    return { activeMode: "summer", baseSeason: "summer", festive: "beach" };
  }

  if ((m === 8 && d >= 15) || m === 9 || m === 10 || (m === 11 && d <= 7)) {
    return { activeMode: "autumn", baseSeason: "autumn", festive: "autumn" };
  }

  const isMid = (m === 12 && d >= 15) || (m === 1 && d <= 15);
  return { activeMode: "winter", baseSeason: "winter", festive: "noel", isMidWinter: isMid };
}

interface PinnedSeasonInfo {
  activeMode: SeasonMode;
  baseSeason: BaseSeason;
  festive: "none" | "newyear" | "tet" | "spring-natural" | "beach" | "autumn" | "noel";
  badgeLabel: string;
  badgeIcon: string;
  isTransition: boolean;
  isMidWinter: boolean;
}

/** frame_key cố định (từ site settings) → seasonInfo tương ứng, bỏ qua lịch. */
function pinnedSeasonInfo(frameKey: string): PinnedSeasonInfo {
  switch (frameKey) {
    case "winter":
      return {
        activeMode: "winter",
        baseSeason: "winter",
        festive: "noel",
        badgeLabel: "Mùa Đông (Noel & Tuyết)",
        badgeIcon: "❄️",
        isTransition: false,
        isMidWinter: true,
      };
    case "spring":
      return {
        activeMode: "spring",
        baseSeason: "spring",
        festive: "spring-natural",
        badgeLabel: "Mùa Xuân (Ngoài dịp Tết)",
        badgeIcon: "🌸",
        isTransition: false,
        isMidWinter: false,
      };
    case "tet":
      return {
        activeMode: "spring",
        baseSeason: "spring",
        festive: "tet",
        badgeLabel: "Tết Nguyên Đán",
        badgeIcon: "🧧",
        isTransition: false,
        isMidWinter: false,
      };
    case "newyear":
      return {
        activeMode: "spring",
        baseSeason: "spring",
        festive: "newyear",
        badgeLabel: "Tết Dương Lịch",
        badgeIcon: "🎆",
        isTransition: false,
        isMidWinter: false,
      };
    case "summer":
      return {
        activeMode: "summer",
        baseSeason: "summer",
        festive: "beach",
        badgeLabel: "Mùa Hạ (Bãi Biển)",
        badgeIcon: "🏖️",
        isTransition: false,
        isMidWinter: false,
      };
    case "autumn":
      return {
        activeMode: "autumn",
        baseSeason: "autumn",
        festive: "autumn",
        badgeLabel: "Mùa Thu (Lá Phong)",
        badgeIcon: "🍁",
        isTransition: false,
        isMidWinter: false,
      };
    default:
      return {
        activeMode: "winter",
        baseSeason: "winter",
        festive: "noel",
        badgeLabel: "Mùa Đông (Noel & Tuyết)",
        badgeIcon: "❄️",
        isTransition: false,
        isMidWinter: true,
      };
  }
}

export default function Atmosphere() {
  const { settings } = useSiteSettings();
  const frameKey = settings.frameKey;
  const [mounted, setMounted] = useState(false);
  const [isAuto, setIsAuto] = useState<boolean>(true);
  const [manualSeason, setManualSeason] = useState<BaseSeason>("winter");
  const [springSubMode, setSpringSubMode] = useState<SpringSubMode>("natural");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const controllerRef = useRef<HTMLDivElement>(null);
  const [todayStr, setTodayStr] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    const today = new Date();
    setTodayStr(`${today.getDate()}/${today.getMonth() + 1}`);

    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ticking = false;
    const onPointerMove = (e: PointerEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          root.style.setProperty("--mx", `${e.clientX}px`);
          root.style.setProperty("--my", `${e.clientY}px`);

          const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
            ".project-card, .stat-card, .skill-group, .agent-flow-card, .agent-workflow-banner, .quick-facts li, .about-card"
          );
          if (target) {
            const rect = target.getBoundingClientRect();
            target.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
            target.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  // Tính trạng thái mùa hiện hành
  const seasonInfo = useMemo(() => {
    // Khung ghim từ site settings (Supabase) đè lên lịch ngày
    if (frameKey !== "auto") return pinnedSeasonInfo(frameKey);
    if (!mounted) {
      return {
        activeMode: "winter" as SeasonMode,
        baseSeason: "winter" as BaseSeason,
        festive: "noel" as const,
        badgeLabel: "Mùa Đông (Noel & Tuyết)",
        badgeIcon: "❄️",
        isTransition: false,
        isMidWinter: true,
      };
    }

    if (isAuto) {
      const calc = calculateDateSeason(new Date());
      if (calc.activeMode === "transition") {
        return {
          activeMode: "transition" as SeasonMode,
          baseSeason: calc.baseSeason,
          festive: calc.festive,
          badgeLabel: calc.transitionName || "Giao Mùa",
          badgeIcon: "🍃",
          isTransition: true,
          isMidWinter: false,
        };
      }

      if (calc.festive === "newyear") {
        return {
          activeMode: "spring" as SeasonMode,
          baseSeason: "spring" as BaseSeason,
          festive: "newyear" as const,
          badgeLabel: "Tết Dương Lịch",
          badgeIcon: "🎆",
          isTransition: false,
          isMidWinter: false,
        };
      }

      if (calc.festive === "tet") {
        return {
          activeMode: "spring" as SeasonMode,
          baseSeason: "spring" as BaseSeason,
          festive: "tet" as const,
          badgeLabel: "Tết Nguyên Đán",
          badgeIcon: "🧧",
          isTransition: false,
          isMidWinter: false,
        };
      }

      if (calc.festive === "spring-natural") {
        return {
          activeMode: "spring" as SeasonMode,
          baseSeason: "spring" as BaseSeason,
          festive: "spring-natural" as const,
          badgeLabel: "Mùa Xuân (Ngoài dịp Tết)",
          badgeIcon: "🌸",
          isTransition: false,
          isMidWinter: false,
        };
      }

      if (calc.festive === "noel") {
        return {
          activeMode: "winter" as SeasonMode,
          baseSeason: "winter" as BaseSeason,
          festive: "noel" as const,
          badgeLabel: "Giáng Sinh & Tuyết",
          badgeIcon: "🎄",
          isTransition: false,
          isMidWinter: true,
        };
      }

      const data = SEASONS_DATA[calc.baseSeason];
      return {
        activeMode: calc.baseSeason as SeasonMode,
        baseSeason: calc.baseSeason,
        festive: calc.festive,
        badgeLabel: data.name,
        badgeIcon: data.icon,
        isTransition: false,
        isMidWinter: !!calc.isMidWinter,
      };
    } else {
      // Thủ công
      if (manualSeason === "spring") {
        if (springSubMode === "natural") {
          return {
            activeMode: "spring" as SeasonMode,
            baseSeason: "spring" as BaseSeason,
            festive: "spring-natural" as const,
            badgeLabel: "Mùa Xuân (Ngoài dịp Tết)",
            badgeIcon: "🌸",
            isTransition: false,
            isMidWinter: false,
          };
        }
        if (springSubMode === "tet-duong") {
          return {
            activeMode: "spring" as SeasonMode,
            baseSeason: "spring" as BaseSeason,
            festive: "newyear" as const,
            badgeLabel: "Tết Dương Lịch (31/12-2/1)",
            badgeIcon: "🎆",
            isTransition: false,
            isMidWinter: false,
          };
        }
        return {
          activeMode: "spring" as SeasonMode,
          baseSeason: "spring" as BaseSeason,
          festive: "tet" as const,
          badgeLabel: "Tết Âm Lịch (20 Chạp-10 Giêng)",
          badgeIcon: "🧧",
          isTransition: false,
          isMidWinter: false,
        };
      }

      if (manualSeason === "summer") {
        return {
          activeMode: "summer" as SeasonMode,
          baseSeason: "summer" as BaseSeason,
          festive: "beach" as const,
          badgeLabel: "Mùa Hạ (Bãi Biển)",
          badgeIcon: "🏖️",
          isTransition: false,
          isMidWinter: false,
        };
      }

      if (manualSeason === "autumn") {
        return {
          activeMode: "autumn" as SeasonMode,
          baseSeason: "autumn" as BaseSeason,
          festive: "autumn" as const,
          badgeLabel: "Mùa Thu (Lá Phong)",
          badgeIcon: "🍁",
          isTransition: false,
          isMidWinter: false,
        };
      }

      // winter
      return {
        activeMode: "winter" as SeasonMode,
        baseSeason: "winter" as BaseSeason,
        festive: "noel" as const,
        badgeLabel: "Mùa Đông (Noel & Tuyết)",
        badgeIcon: "🎄",
        isTransition: false,
        isMidWinter: true,
      };
    }
  }, [mounted, isAuto, manualSeason, springSubMode, frameKey]);

  // Đồng bộ data-season, data-base-season, data-festive lên <html>
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.setAttribute("data-season", seasonInfo.activeMode);
    root.setAttribute("data-base-season", seasonInfo.baseSeason);
    root.setAttribute("data-festive", seasonInfo.festive);
  }, [mounted, seasonInfo.activeMode, seasonInfo.baseSeason, seasonInfo.festive]);

  // Đóng menu khi click/tap ra ngoài vùng controller hoặc nhấn Escape
  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (
        target &&
        controllerRef.current &&
        !controllerRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const handleSelect = (choice: BaseSeason | "auto") => {
    if (choice === "auto") {
      setIsAuto(true);
    } else {
      setIsAuto(false);
      setManualSeason(choice);
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* Nền sống động 4 mùa và các dịp lễ hội thiên nhiên */}
      <div
        className="atmosphere"
        data-season-mode={seasonInfo.activeMode}
        data-base-season={seasonInfo.baseSeason}
        data-festive-mode={seasonInfo.festive}
        aria-hidden="true"
      >
        {/* Nền đơn sắc có chiều sâu và gradient theo mùa */}
        <div className="monochrome-base" />

        {/* ========================================================
            1. MÙA XUÂN — 3 giai đoạn riêng biệt
           ======================================================== */}
        {(seasonInfo.activeMode === "spring" ||
          (seasonInfo.isTransition && seasonInfo.baseSeason === "spring")) && (
          <div className={`effect-layer spring-layer spring-festive-${seasonInfo.festive}`}>

            {/* ─── 1A. XUÂN TỰ NHIÊN: Nắng ấm + Bướm + Hoa anh đào nhẹ nhàng ─── */}
            {(seasonInfo.festive === "spring-natural" || seasonInfo.festive === "none") && (
              <>
                {/* Tia nắng xuân dịu dàng */}
                <div className="spring-sunbeams">
                  <span className="sunbeam sunbeam-1" />
                  <span className="sunbeam sunbeam-2" />
                  <span className="sunbeam sunbeam-3" />
                </div>
                <div className="spring-warm-sunray" />

                {/* Cánh hoa anh đào nhẹ nhàng bay */}
                <div className="spring-blossoms natural-blossoms">
                  {Array.from({ length: 18 }).map((_, i) => {
                    const isFullFlower = i % 4 === 0;
                    return (
                      <span
                        key={`nat-blossom-${i}`}
                        className="blossom blossom-dao"
                        style={{
                          left: `${((i * 17 + 5) % 94) + 2}%`,
                          animationDuration: `${10 + (i % 5) * 2.5}s`,
                          animationDelay: `${(i * 0.8) % 8}s`,
                          transform: `scale(${0.5 + (i % 3) * 0.18})`,
                        }}
                      >
                        {isFullFlower ? (
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <circle cx="12" cy="7.5" r="4.2" />
                            <circle cx="16.5" cy="11" r="4.2" />
                            <circle cx="14.8" cy="16.5" r="4.2" />
                            <circle cx="9.2" cy="16.5" r="4.2" />
                            <circle cx="7.5" cy="11" r="4.2" />
                            <circle cx="12" cy="12" r="2.5" fill="#be185d" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                            <path d="M12 2C8 5 4 9 4 14C4 18.5 7.5 22 12 22C16.5 22 20 18.5 20 14C20 9 16 5 12 2Z" />
                          </svg>
                        )}
                      </span>
                    );
                  })}
                </div>

                {/* Bướm xuân bay lượn */}
                <div className="spring-butterflies">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span
                      key={`butterfly-${i}`}
                      className={`butterfly butterfly-${(i % 3) + 1}`}
                      style={{
                        left: `${(i * 22 + 8) % 90}%`,
                        top: `${(i * 18 + 12) % 70}%`,
                        animationDuration: `${12 + (i % 4) * 3}s`,
                        animationDelay: `${i * 1.5}s`,
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                        <path d="M12 12C8 6 2 4 2 8C2 12 8 14 12 12Z" opacity="0.85" />
                        <path d="M12 12C16 6 22 4 22 8C22 12 16 14 12 12Z" opacity="0.85" />
                        <path d="M12 12C8 18 4 20 4 16C4 14 8 13 12 12Z" opacity="0.65" />
                        <path d="M12 12C16 18 20 20 20 16C20 14 16 13 12 12Z" opacity="0.65" />
                      </svg>
                    </span>
                  ))}
                </div>

                {/* Đốm phấn hoa (pollen) lơ lửng */}
                <div className="spring-particles">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <span
                      key={`pollen-${i}`}
                      className="sun-speck pollen-speck"
                      style={{
                        left: `${(i * 12 + 3) % 95}%`,
                        animationDuration: `${8 + (i % 5) * 2}s`,
                        animationDelay: `${(i * 0.6) % 7}s`,
                        width: `${2 + (i % 3)}px`,
                        height: `${2 + (i % 3)}px`,
                      }}
                    />
                  ))}
                </div>

                {/* Lá xanh non bay theo gió nhẹ */}
                <div className="spring-green-leaves">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span
                      key={`green-leaf-${i}`}
                      className="green-leaf"
                      style={{
                        left: `${(i * 18 + 10) % 92}%`,
                        animationDuration: `${12 + (i % 4) * 3}s`,
                        animationDelay: `${(i * 1.2) % 8}s`,
                      }}
                    >
                      <svg viewBox="0 0 20 20" width="16" height="16">
                        <path d="M10 2C6 4 2 10 4 14C6 18 10 16 12 12C14 8 14 4 10 2Z" fill="#4ade80" opacity="0.75" />
                        <path d="M10 2C10 6 8 10 6 12" stroke="#16a34a" strokeWidth="0.8" fill="none" />
                      </svg>
                    </span>
                  ))}
                </div>
              </>
            )}

            {/* ─── 1B. TẾT ÂM LỊCH: Mai vàng + Đào thắm + Đèn lồng + Pháo Tết ─── */}
            {seasonInfo.festive === "tet" && (
              <>
                {/* Nắng vàng Tết ấm áp */}
                <div className="spring-sunbeams tet-sunbeams">
                  <span className="sunbeam sunbeam-1" />
                  <span className="sunbeam sunbeam-2" />
                </div>
                <div className="spring-warm-sunray tet-warm-ray" />

                {/* Đèn lồng đỏ may mắn treo 2 bên */}
                <div className="tet-lanterns-layer">
                  <div className="tet-lantern lantern-left">
                    <div className="lantern-string" />
                    <div className="lantern-body">
                      <span className="lantern-tassel" />
                    </div>
                  </div>
                  <div className="tet-lantern lantern-right">
                    <div className="lantern-string" />
                    <div className="lantern-body">
                      <span className="lantern-tassel" />
                    </div>
                  </div>
                </div>

                {/* Hoa mai vàng và hoa đào thắm rơi dày đặc */}
                <div className="spring-blossoms tet-blossoms">
                  {Array.from({ length: 26 }).map((_, i) => {
                    const isMai = i % 2 === 0;
                    const isFullFlower = i % 3 === 0;
                    return (
                      <span
                        key={`tet-blossom-${i}`}
                        className={`blossom ${isMai ? "blossom-mai" : "blossom-dao"}`}
                        style={{
                          left: `${((i * 13 + 5) % 94) + 2}%`,
                          animationDuration: `${7 + (i % 5) * 1.8}s`,
                          animationDelay: `${(i * 0.5) % 6}s`,
                          transform: `scale(${0.7 + (i % 4) * 0.15})`,
                        }}
                      >
                        {isFullFlower ? (
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <circle cx="12" cy="7.5" r="4.2" />
                            <circle cx="16.5" cy="11" r="4.2" />
                            <circle cx="14.8" cy="16.5" r="4.2" />
                            <circle cx="9.2" cy="16.5" r="4.2" />
                            <circle cx="7.5" cy="11" r="4.2" />
                            <circle cx="12" cy="12" r="2.5" fill={isMai ? "#ea580c" : "#be185d"} />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M12 2C8 5 4 9 4 14C4 18.5 7.5 22 12 22C16.5 22 20 18.5 20 14C20 9 16 5 12 2Z" />
                          </svg>
                        )}
                      </span>
                    );
                  })}
                </div>

                {/* Đốm vàng phúc lộc bay lơ lửng */}
                <div className="spring-particles tet-particles">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span
                      key={`tet-spark-${i}`}
                      className="sun-speck tet-lucky-spark"
                      style={{
                        left: `${(i * 15 + 4) % 95}%`,
                        animationDuration: `${6 + (i % 4) * 2}s`,
                        animationDelay: `${(i * 0.8) % 5}s`,
                        width: `${3 + (i % 2)}px`,
                        height: `${3 + (i % 2)}px`,
                      }}
                    />
                  ))}
                </div>

                {/* Dây pháo Tết nổ li ti phía trên */}
                <div className="tet-firecracker-sparks">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span
                      key={`fc-spark-${i}`}
                      className="fc-spark"
                      style={{
                        left: `${(i * 14 + 8) % 90}%`,
                        animationDuration: `${2 + (i % 3) * 0.8}s`,
                        animationDelay: `${(i * 0.6) % 4}s`,
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            {/* ─── 1C. TẾT DƯƠNG LỊCH: Pháo hoa + Confetti + Garland lấp lánh ─── */}
            {seasonInfo.festive === "newyear" && (
              <>
                {/* Bầu trời đêm countdown */}
                <div className="newyear-sky-glow" />

                {/* Pháo hoa rực rỡ bùng nổ */}
                <div className="newyear-fireworks-container">
                  <div className="firework-burst burst-1" />
                  <div className="firework-burst burst-2" />
                  <div className="firework-burst burst-3" />
                  <div className="firework-burst burst-4" />
                  <div className="firework-burst burst-5" />
                </div>

                {/* Mưa kim tuyến confetti vàng bạc */}
                <div className="confetti-rain">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <span
                      key={`confetti-${i}`}
                      className={`confetti-piece confetti-${(i % 5) + 1}`}
                      style={{
                        left: `${(i * 10 + 2) % 96}%`,
                        animationDuration: `${3.5 + (i % 4) * 1.2}s`,
                        animationDelay: `${(i * 0.25) % 3.5}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Dải ngôi sao lấp lánh bay */}
                <div className="newyear-stars">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span
                      key={`ny-star-${i}`}
                      className={`ny-star ny-star-${(i % 3) + 1}`}
                      style={{
                        left: `${(i * 13 + 5) % 94}%`,
                        top: `${(i * 11 + 8) % 80}%`,
                        animationDuration: `${2.5 + (i % 4) * 1}s`,
                        animationDelay: `${(i * 0.5) % 4}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Hiệu ứng đốm sáng champagne vàng bay lên */}
                <div className="spring-particles newyear-sparkles">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span
                      key={`ny-sparkle-${i}`}
                      className="sun-speck ny-champagne-bubble"
                      style={{
                        left: `${(i * 12 + 6) % 94}%`,
                        animationDuration: `${5 + (i % 5) * 1.5}s`,
                        animationDelay: `${(i * 0.7) % 5}s`,
                        width: `${3 + (i % 3)}px`,
                        height: `${3 + (i % 3)}px`,
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ========================================================
            2. MÙA HẠ: PHONG CÁCH BÃI BIỂN (Sóng Biển, Cây Dừa & Hải Âu)
           ======================================================== */}
        {(seasonInfo.activeMode === "summer" ||
          (seasonInfo.isTransition && seasonInfo.baseSeason === "summer")) && (
          <div className="effect-layer summer-layer beach-theme">
            <div className="summer-solar-flare" />
            
            {/* Làn gió biển mát rượi */}
            <div className="summer-breeze breeze-1" />
            <div className="summer-breeze breeze-2" />
            <div className="summer-breeze breeze-3" />

            {/* Chim hải âu chao lượn trên bầu trời hè */}
            <div className="beach-seagulls">
              <span className="seagull seagull-1" />
              <span className="seagull seagull-2" />
            </div>

            {/* Lớp sóng biển xanh vỗ rì rào ở dưới chân trang */}
            <div className="beach-ocean-waves" aria-hidden="true">
              <div className="wave wave-1" />
              <div className="wave wave-2" />
            </div>
          </div>
        )}

        {/* ========================================================
            3. MÙA THU: PHONG CÁCH THU LÁ PHONG (Lá Phong Đỏ Bay Lượn)
           ======================================================== */}
        {(seasonInfo.activeMode === "autumn" ||
          (seasonInfo.isTransition &&
            (seasonInfo.baseSeason === "autumn" || seasonInfo.baseSeason === "winter"))) && (
          <div className="effect-layer autumn-layer">
            <div className="autumn-leaves">
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={`leaf-${i}`}
                  className={`leaf leaf-${(i % 3) + 1}`}
                  style={{
                    left: `${((i * 16 + 11) % 94) + 2}%`,
                    animationDuration: `${8 + (i % 5) * 2}s`,
                    animationDelay: `${(i * 0.7) % 7}s`,
                    transform: `scale(${0.65 + (i % 4) * 0.15})`,
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                    <path d="M12 2L9.5 7.5L4 7L6.5 12L2 14.5L7.5 17L7 22.5L12 19.5L17 22.5L16.5 17L22 14.5L17.5 12L20 7L14.5 7.5L12 2Z" />
                  </svg>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            4. MÙA ĐÔNG: PHONG CÁCH LẠNH CÓ TUYẾT & NOEL
           ======================================================== */}
        {(seasonInfo.activeMode === "winter" ||
          (seasonInfo.isTransition && seasonInfo.baseSeason === "winter")) && (
          <div className="effect-layer winter-layer noel-theme">
            {/* Luồng gió se lạnh lướt qua */}
            <div className="winter-wind-streak streak-1" />
            <div className="winter-wind-streak streak-2" />
            <div className="winter-wind-streak streak-3" />

            {/* Dải đèn nháy Noel lung linh chạy dọc mép trên */}
            <div className="christmas-fairy-lights">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={`light-${i}`} className={`fairy-bulb bulb-color-${(i % 4) + 1}`} />
              ))}
            </div>

            {/* Bông tuyết rơi dạng hoa băng tinh thể 6 cánh chân thực */}
            <div className="winter-snowflakes">
              {Array.from({ length: 26 }).map((_, i) => {
                const type = i % 3;
                const size = 13 + (i % 4) * 3;
                return (
                  <span
                    key={`snow-${i}`}
                    className="snowflake"
                    style={{
                      left: `${((i * 14 + 5) % 94) + 2}%`,
                      animationDuration: `${7 + (i % 6) * 1.8}s`,
                      animationDelay: `${(i * 0.45) % 8}s`,
                    }}
                  >
                    {type === 0 ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width={size}
                        height={size}
                      >
                        <line x1="12" y1="2" x2="12" y2="22" />
                        <line x1="3.34" y1="7" x2="20.66" y2="17" />
                        <line x1="3.34" y1="17" x2="20.66" y2="7" />
                        <polyline points="9 5 12 7 15 5" />
                        <polyline points="9 19 12 17 15 19" />
                        <polyline points="5.5 8.5 7.5 10 7 12.5" />
                        <polyline points="18.5 15.5 16.5 14 17 11.5" />
                        <polyline points="5.5 15.5 7.5 14 7 11.5" />
                        <polyline points="18.5 8.5 16.5 10 17 12.5" />
                      </svg>
                    ) : type === 1 ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width={size}
                        height={size}
                      >
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <line x1="1.6" y1="6.5" x2="22.4" y2="17.5" />
                        <line x1="1.6" y1="17.5" x2="22.4" y2="6.5" />
                        <polygon points="12 8 15.5 12 12 16 8.5 12" />
                        <polyline points="10 3.5 12 5.5 14 3.5" />
                        <polyline points="10 20.5 12 18.5 14 20.5" />
                        <polyline points="3 8.5 5 10 4 12" />
                        <polyline points="21 15.5 19 14 20 12" />
                        <polyline points="3 15.5 5 14 4 12" />
                        <polyline points="21 8.5 19 10 20 12" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width={size}
                        height={size}
                      >
                        <line x1="12" y1="2" x2="12" y2="22" />
                        <line x1="3.34" y1="7" x2="20.66" y2="17" />
                        <line x1="3.34" y1="17" x2="20.66" y2="7" />
                        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
                        <path d="m10 4 2-2 2 2M10 20l2 2 2-2" />
                        <path d="m4 8 1 2 2-1M20 16l-1-2-2 1" />
                        <path d="m4 16 1-2 2 1M20 8l-1 2-2-1" />
                      </svg>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Tia quét nhẹ và lưới mờ tinh tế */}
        <span className="scanline-beam" />
        <span className="grid-fade" />
        <span className="cursor-glow" />
      </div>

      {/* Season Controller: Góc dưới bên trái */}
      <div className="season-controller" ref={controllerRef}>
        {menuOpen && (
          <div className="season-menu" role="menu" aria-label="Cài đặt mùa nền">
            <div className="season-menu-header">
              <span className="season-menu-title">TRANG TRÍ THEO 4 MÙA &amp; LỄ HỘI</span>
              <span className="season-menu-sub">
                {seasonInfo.isTransition
                  ? "⚡ Đang trong giai đoạn Giao Mùa tự nhiên"
                  : "Màu nền khí hậu đặc trưng · Tự động chuẩn xác theo ngày"}
              </span>
            </div>

            <div className="season-options">
              {/* 4 Mùa chính */}
              {(["spring", "summer", "autumn", "winter"] as BaseSeason[]).map((s) => {
                const info = SEASONS_DATA[s];
                const isSelected = !isAuto && manualSeason === s;
                return (
                  <div key={s} className="season-option-wrapper">
                    <button
                      type="button"
                      className={`season-option-btn ${isSelected ? "is-active" : ""}`}
                      onClick={() => handleSelect(s)}
                    >
                      <span className="season-opt-icon">{info.icon}</span>
                      <span className="season-opt-text">
                        <span className="season-opt-name">{info.name}</span>
                        <span className="season-opt-desc">{info.description}</span>
                      </span>
                    </button>

                    {/* Khi chọn Mùa Xuân, hiển thị tùy chọn: Xuân ngoài Tết, Tết Âm Lịch, Tết Dương Lịch */}
                    {s === "spring" && isSelected && (
                      <div className="spring-sub-options">
                        <button
                          type="button"
                          className={`sub-tet-btn ${springSubMode === "natural" ? "is-sub-active" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSpringSubMode("natural");
                          }}
                        >
                          🌸 Xuân Tự Nhiên (Ngoài dịp Tết)
                        </button>
                        <button
                          type="button"
                          className={`sub-tet-btn ${springSubMode === "tet-am" ? "is-sub-active" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSpringSubMode("tet-am");
                          }}
                        >
                          🧧 Tết Âm Lịch (20 Chạp - 10 Giêng)
                        </button>
                        <button
                          type="button"
                          className={`sub-tet-btn ${springSubMode === "tet-duong" ? "is-sub-active" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSpringSubMode("tet-duong");
                          }}
                        >
                          🎆 Tết Dương Lịch (31/12 - 2/1)
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Nút khớp ngày thực tế (Mặc định) */}
              <button
                type="button"
                className={`season-auto-btn ${isAuto ? "is-active" : ""}`}
                onClick={() => handleSelect("auto")}
              >
                <span className="season-auto-icon">🔄</span>
                <span className="season-auto-text">
                  <span className="season-auto-title">
                    Khớp ngày thực tế ({todayStr})
                  </span>
                  <span className="season-auto-sub">
                    {seasonInfo.isTransition
                      ? "⚡ Tự động khớp tiết Giao Mùa hiện tại"
                      : "Tự động trang trí Tết, Noel, Biển, Thu theo lịch"}
                  </span>
                </span>
                <span className="season-auto-tag">Auto</span>
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          className="season-toggle-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          suppressHydrationWarning
          aria-label={`${seasonInfo.badgeIcon} ${seasonInfo.badgeLabel} — Xem hiệu ứng mùa`}
          title={`Mùa hiện tại: ${seasonInfo.badgeLabel} (${isAuto ? "Tự động" : "Thủ công"})`}
        >
          <span className="season-icon-indicator">{seasonInfo.badgeIcon}</span>
          <span className="season-label-indicator">
            <span className="season-name-text">{seasonInfo.badgeLabel}</span>
            <span className="season-status-dot" />
          </span>
        </button>
      </div>
    </>
  );
}
