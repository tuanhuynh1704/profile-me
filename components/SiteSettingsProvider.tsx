"use client";

/**
 * SiteSettingsProvider — nguồn sự thật duy nhất cho cài đặt site
 * (avatar + khung cố định) lấy từ Supabase, dùng chung toàn cây.
 *
 * - Thiếu env / bảng chưa tạo / lỗi mạng → giữ mặc định: by-date + avatar.jpg.
 * - frame_key != "auto" → Atmosphere (useSiteSettings) tự ghim seasonInfo;
 *   useMemo đổi → effect ghi data-* lên <html> → SeasonalAvatarDeco lật khung.
 *   Không ghi đè attribute thủ công nữa (tránh race hydration).
 * - SSR/lần render đầu: settings = DEFAULT (auto) → HTML khớp server↔client.
 */

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_SITE_SETTINGS,
  fetchSiteSettings,
  type SiteSettings,
} from "@/lib/supabase";
import { DEFAULT_FRAME_KEY, type FrameKey } from "@/lib/frames";

interface SiteSettingsContextValue {
  settings: SiteSettings;
  setFrameKey: (key: FrameKey) => void;
  setAvatarUrl: (url: string | null) => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue>({
  settings: DEFAULT_SITE_SETTINGS,
  setFrameKey: () => {},
  setAvatarUrl: () => {},
});

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

export default function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    let cancelled = false;
    void fetchSiteSettings().then((next) => {
      if (!cancelled) setSettings(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const setFrameKey = useCallback((key: FrameKey) => {
    setSettings((prev) => ({ ...prev, frameKey: key || DEFAULT_FRAME_KEY }));
  }, []);

  const setAvatarUrl = useCallback((url: string | null) => {
    setSettings((prev) => ({ ...prev, avatarUrl: url }));
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, setFrameKey, setAvatarUrl }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}
