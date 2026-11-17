/**
 * Supabase client (browser-safe).
 * Chỉ dùng ANON key — mọi quyền ghi phải đi qua RLS policies (xem docs/supabase-setup.md).
 * Thiếu env → client = null, mọi consumer phải fallback im lặng về mặc định.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { normalizeFrameKey, type FrameKey } from "./frames";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;

export interface SiteSettings {
  avatarUrl: string | null;
  frameKey: FrameKey;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  avatarUrl: null,
  frameKey: "auto",
};

const SETTINGS_ID = 1;

/** Đọc settings; lỗi / thiếu bảng / env → mặc định. Không bao giờ throw. */
export async function fetchSiteSettings(): Promise<SiteSettings> {
  if (!supabase) return DEFAULT_SITE_SETTINGS;
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("avatar_url, frame_key")
      .eq("id", SETTINGS_ID)
      .maybeSingle();
    if (error || !data) return DEFAULT_SITE_SETTINGS;
    const row = data as { avatar_url?: string | null; frame_key?: string | null };
    return {
      avatarUrl: row.avatar_url ?? null,
      frameKey: normalizeFrameKey(row.frame_key),
    };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

/** Ghi settings (yêu cầu session đã đăng nhập — RLS quyết định). */
export async function saveSiteSettings(
  settings: Partial<SiteSettings>
): Promise<{ ok: boolean; message: string }> {
  if (!supabase) {
    return { ok: false, message: "Supabase chưa được cấu hình (thiếu env)." };
  }
  try {
    const payload: Record<string, unknown> = {
      id: SETTINGS_ID,
      updated_at: new Date().toISOString(),
    };
    if (settings.avatarUrl !== undefined) payload.avatar_url = settings.avatarUrl;
    if (settings.frameKey !== undefined) payload.frame_key = settings.frameKey;
    const { error } = await supabase.from("site_settings").upsert(payload);
    if (error) return { ok: false, message: error.message };
    return { ok: true, message: "Đã lưu." };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : "Lỗi không xác định." };
  }
}

/** Upload avatar lên bucket avatars; trả public URL. */
export async function uploadAvatar(
  file: File
): Promise<{ ok: boolean; url?: string; message: string }> {
  if (!supabase) {
    return { ok: false, message: "Supabase chưa được cấu hình (thiếu env)." };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { ok: false, message: "Ảnh quá lớn (tối đa 5MB)." };
  }
  if (!/^image\/(png|jpeg|jpg|webp|avif)$/i.test(file.type)) {
    return { ok: false, message: "Chỉ nhận PNG/JPEG/WebP/AVIF." };
  }
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `avatar-${Date.now()}.${ext}`;
  try {
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { cacheControl: "3600", upsert: false });
    if (uploadError) return { ok: false, message: uploadError.message };
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    return { ok: true, url: data.publicUrl, message: "Đã upload." };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : "Lỗi upload." };
  }
}
