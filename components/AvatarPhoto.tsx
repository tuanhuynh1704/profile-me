"use client";

/**
 * AvatarPhoto — ảnh chân dung đọc từ site settings (Supabase).
 * Chưa cấu hình env / chưa upload → fallback /avatar.jpg.
 * Dùng <img> thường (URL public từ Supabase Storage thay đổi theo upload;
 * next/image sẽ cần remotePatterns + loader — giữ đơn giản, tránh lỗi deploy).
 */

import Image from "next/image";
import { useSiteSettings } from "./SiteSettingsProvider";

export default function AvatarPhoto() {
  const { settings } = useSiteSettings();
  const avatarUrl = settings.avatarUrl;

  if (avatarUrl) {
    // Ảnh remote từ Supabase: <img> thường để tránh cấu hình optimizer.
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={avatarUrl}
        alt="Ảnh chân dung Huỳnh Anh Tuấn"
        className="avatar-photo"
        width={420}
        height={560}
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <Image
      src="/avatar.jpg"
      alt="Ảnh chân dung Huỳnh Anh Tuấn"
      width={420}
      height={560}
      priority
      className="avatar-photo"
    />
  );
}
