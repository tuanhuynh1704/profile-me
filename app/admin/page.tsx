"use client";

/**
 * /admin — trang quản trị nội dung (avatar + khung viền) cho chủ site.
 *
 * - Auth: Supabase magic link (mỗi lần đăng nhập = 1 link email dùng 1 lần).
 * - Quyền ghi đi qua RLS policies của Supabase (xem docs/supabase-setup.md).
 * - Chưa cấu hình env → trang hiển thị hướng dẫn setup thay vì crash.
 * - Trang này KHÔNG index (metadata robots noindex ở layout).
 */

import { useCallback, useEffect, useState } from "react";
import {
  isSupabaseConfigured,
  supabase,
  saveSiteSettings,
  uploadAvatar,
} from "@/lib/supabase";
import { FRAME_OPTIONS, normalizeFrameKey } from "@/lib/frames";
import { useSiteSettings } from "@/components/SiteSettingsProvider";

type View = "loading" | "setup" | "signin" | "panel";

export default function AdminPage() {
  const [view, setView] = useState<View>(isSupabaseConfigured ? "loading" : "setup");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sendingLink, setSendingLink] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const { settings, setFrameKey, setAvatarUrl } = useSiteSettings();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ tone: "ok" | "err"; text: string } | null>(null);

  // Khởi tạo session từ URL (#access_token... sau magic link redirect)
  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setView(data.session?.user ? "panel" : "signin");
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setView("panel");
      } else if (event === "SIGNED_OUT") {
        setView("signin");
      }
    });

    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSendLink = useCallback(async () => {
    if (!supabase) return;
    setEmailError("");
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      setEmailError("Email không hợp lệ.");
      return;
    }
    setSendingLink(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: trimmed,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setSendingLink(false);
    if (error) {
      setEmailError(error.message);
      return;
    }
    setLinkSent(true);
  }, [email]);

  const showMessage = (tone: "ok" | "err", text: string) => setMessage({ tone, text });

  const handleUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file) return;
      setUploading(true);
      const uploaded = await uploadAvatar(file);
      if (!uploaded.ok || !uploaded.url) {
        setUploading(false);
        showMessage("err", uploaded.message);
        return;
      }
      const saved = await saveSiteSettings({ avatarUrl: uploaded.url });
      setUploading(false);
      if (saved.ok) {
        setAvatarUrl(uploaded.url ?? null);
        showMessage("ok", "Đã đổi ảnh chân dung. Trang chủ sẽ hiển thị ảnh mới.");
      } else {
        showMessage("err", saved.message);
      }
    },
    [setAvatarUrl]
  );

  const handleResetAvatar = useCallback(async () => {
    setUploading(true);
    const saved = await saveSiteSettings({ avatarUrl: null });
    setUploading(false);
    if (saved.ok) {
      setAvatarUrl(null);
      showMessage("ok", "Đã về ảnh mặc định (/avatar.jpg).");
    } else {
      showMessage("err", saved.message);
    }
  }, [setAvatarUrl]);

  const handleSelectFrame = useCallback(async (key: string) => {
    const frameKey = normalizeFrameKey(key);
    const prevFrameKey = settings.frameKey;
    setSaving(true);
    setFrameKey(frameKey); // preview ngay qua context → Atmosphere lật khung
    const saved = await saveSiteSettings({ frameKey });
    setSaving(false);
    if (saved.ok) {
      showMessage("ok", "Đã đổi khung viền cho toàn site (xem trực tiếp ngay trên trang).");
    } else {
      setFrameKey(prevFrameKey); // revert preview
      showMessage("err", saved.message);
    }
  }, [settings.frameKey, setFrameKey]);

  const handleSignOut = useCallback(async () => {
    await supabase?.auth.signOut();
    setLinkSent(false);
    setEmail("");
  }, []);

  /* ---------- Render ---------- */

  if (view === "setup") {
    return (
      <main className="section admin-section">
        <div className="container admin-container">
          <p className="kicker">Quản trị</p>
          <h1 className="admin-title">Supabase chưa được cấu hình</h1>
          <p className="admin-sub">
            Trang đổi avatar &amp; khung cần 2 biến môi trường:{" "}
            <code>NEXT_PUBLIC_SUPABASE_URL</code> và{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.
          </p>
          <div className="admin-note">
            <strong>Cách setup (5 phút):</strong>
            <ol>
              <li>Tạo project miễn phí tại supabase.com (bucket <code>avatars</code> public).</li>
              <li>Chạy SQL trong <code>docs/supabase-setup.md</code> (bảng <code>site_settings</code> + RLS).</li>
              <li>Thêm 2 biến env ở máy local (<code>.env.local</code>) và trên Vercel → Settings → Environment Variables.</li>
              <li>Supabase → Authentication → URL Configuration: thêm <code>https://địa-chỉ-site/admin</code> vào Redirect URLs.</li>
            </ol>
            <p style={{ marginTop: 12 }}>
              Chi tiết từng bước: <code>docs/supabase-setup.md</code>.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (view === "loading") {
    return (
      <main className="section admin-section">
        <div className="container admin-container">
          <p className="admin-sub">Đang tải…</p>
        </div>
      </main>
    );
  }

  if (view === "signin") {
    return (
      <main className="section admin-section">
        <div className="container admin-container">
          <p className="kicker">Quản trị</p>
          <h1 className="admin-title">Đăng nhập chủ site</h1>
          <p className="admin-sub">
            Nhập email của bạn — chúng tôi gửi một link đăng nhập dùng một lần.
            Không cần mật khẩu.
          </p>

          {linkSent ? (
            <div className="admin-note">
              <strong>Đã gửi link!</strong> Kiểm tra hộp thư <em>{email}</em> (kể cả spam).
              Link hết hạn sau 1 giờ và chỉ dùng được một lần.
              <button type="button" className="btn btn-ghost admin-inline-btn" onClick={() => setLinkSent(false)}>
                Gửi lại
              </button>
            </div>
          ) : (
            <form
              className="admin-form"
              onSubmit={(e) => {
                e.preventDefault();
                void handleSendLink();
              }}
            >
              <label className="admin-label" htmlFor="admin-email">
                Email
              </label>
              <input
                id="admin-email"
                className="admin-input"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="ban@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(emailError)}
                aria-describedby={emailError ? "admin-email-error" : undefined}
                required
              />
              {emailError && (
                <p id="admin-email-error" className="admin-error" role="alert">
                  {emailError}
                </p>
              )}
              <button type="submit" className="btn btn-primary" disabled={sendingLink}>
                {sendingLink ? "Đang gửi…" : "Gửi link đăng nhập"}
              </button>
            </form>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="section admin-section">
      <div className="container admin-container">
        <p className="kicker">Quản trị</p>
        <h1 className="admin-title">Nội dung trang chủ</h1>
        <p className="admin-sub">
          Thay đổi ảnh chân dung và khung viền — áp dụng cho tất cả khách truy cập, không cần deploy lại.
        </p>

        {message && (
          <p
            className={`admin-message ${message.tone === "ok" ? "is-ok" : "is-err"}`}
            role="status"
            aria-live="polite"
          >
            {message.text}
          </p>
        )}

        {/* Ảnh chân dung */}
        <section className="admin-card" aria-labelledby="admin-avatar-heading">
          <h2 id="admin-avatar-heading" className="admin-card-title">Ảnh chân dung</h2>
          <div className="admin-avatar-row">
            <img
              src={settings.avatarUrl ?? "/avatar.jpg"}
              alt="Ảnh chân dung hiện tại"
              className="admin-avatar-preview"
              width={96}
              height={128}
            />
            <div className="admin-avatar-actions">
              <label className="btn btn-primary admin-file-btn">
                {uploading ? "Đang xử lý…" : "Tải ảnh mới lên"}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/avif"
                  onChange={handleUpload}
                  disabled={uploading}
                  hidden
                />
              </label>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={handleResetAvatar}
                disabled={uploading || !settings.avatarUrl}
              >
                Về ảnh mặc định
              </button>
              <p className="admin-hint">PNG/JPEG/WebP/AVIF · tối đa 5MB · khuyên dùng tỷ lệ dọc 3:4</p>
            </div>
          </div>
        </section>

        {/* Khung viền */}
        <section className="admin-card" aria-labelledby="admin-frame-heading">
          <h2 id="admin-frame-heading" className="admin-card-title">Khung viền</h2>
          <p className="admin-hint" style={{ marginBottom: 10 }}>
            Chọn “Tự động theo ngày” để về hành vi mặc định (Tết/Noel/biển/thu theo lịch).
            Khung ghim đè lên mọi khách truy cập đến khi bạn đổi lại.
          </p>
          <div className="admin-frame-grid" role="radiogroup" aria-label="Chọn khung viền">
            {FRAME_OPTIONS.map((option) => {
              const active = settings.frameKey === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  className={`admin-frame-card ${active ? "is-active" : ""}`}
                  onClick={() => void handleSelectFrame(option.key)}
                  disabled={saving}
                >
                  <span className="admin-frame-icon" aria-hidden="true">
                    {option.icon}
                  </span>
                  <span className="admin-frame-name">{option.name}</span>
                  <span className="admin-frame-desc">{option.description}</span>
                </button>
              );
            })}
          </div>
        </section>

        <div className="admin-footer-row">
          <button type="button" className="btn btn-ghost" onClick={handleSignOut}>
            Đăng xuất
          </button>
        </div>
      </div>
    </main>
  );
}
