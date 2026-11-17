"use client";

import { useEffect, useState } from "react";
import ThreeSeasonalAvatarFrame from "./ThreeSeasonalAvatarFrame";

type Season = "winter" | "spring" | "tet" | "newyear" | "summer" | "autumn";

export function SeasonalAvatarDeco() {
  const [season, setSeason] = useState<Season>("winter");

  useEffect(() => {
    const updateSeason = () => {
      const festive = document.documentElement.getAttribute("data-festive") || "none";
      const current = document.documentElement.getAttribute("data-season") || "winter";
      const base = document.documentElement.getAttribute("data-base-season") || current;
      const activeSeason = current === "transition" ? base : current;
      const theme: Season = festive === "noel" ? "winter"
        : festive === "tet" ? "tet"
        : festive === "newyear" ? "newyear"
        : festive === "spring-natural" ? "spring"
        : festive === "beach" ? "summer"
        : activeSeason === "spring" ? "spring"
        : activeSeason === "summer" ? "summer"
        : activeSeason === "autumn" ? "autumn"
        : "winter";
      setSeason(theme);
    };

    updateSeason();
    const observer = new MutationObserver(updateSeason);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-season", "data-base-season", "data-festive"],
    });
    return () => observer.disconnect();
  }, []);

  return <ThreeSeasonalAvatarFrame season={season} />;
}
