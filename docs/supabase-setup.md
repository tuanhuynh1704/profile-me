# Supabase Setup — đổi avatar & khung viền không cần deploy lại

Trang `/admin` cho phép chủ site đổi **ảnh chân dung** và **khung viền** (6 khung hiện có + mở rộng "auto") cho toàn site. Khách chỉ đọc; chỉ bạn ghi được (Supabase Auth + RLS).

Chi phí: **miễn phí** (Supabase free tier + Vercel).

## 1. Tạo project Supabase (3 phút)
1. Vào https://supabase.com → New project → chọn region gần Việt Nam nhất (vd Singapore).
2. Đợi project khởi tạo, vào **Project Settings → API**: ghi lại
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - (TUYỆT ĐỐI không dùng `service_role key` ở client.)

## 2. Tạo bucket Storage cho ảnh
1. **Storage** → New bucket → name: `avatars` → **PUBLIC** (ai cũng xem được ảnh).
2. Bucket → Policies → thêm 2 policy:
   - `avatars_read_public` (SELECT, anon): `bucket_id = 'avatars'`
   - `avatars_write_authenticated` (INSERT/UPDATE, authenticated): `bucket_id = 'avatars'`

## 3. Tạo bảng settings (SQL Editor → New query → Run)
```sql
create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  avatar_url text,
  frame_key text not null default 'auto',
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id, avatar_url, frame_key)
values (1, null, 'auto')
on conflict (id) do nothing;

alter table public.site_settings enable row level security;

-- Ai cũng đọc được (trang chủ cần đọc)
create policy "site_settings_read_public"
  on public.site_settings for select
  using (true);

-- Chỉ người đã đăng nhập (chủ site) mới ghi
create policy "site_settings_write_authenticated"
  on public.site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
```

## 4. Bật magic link auth
1. **Authentication → URL Configuration**:
   - Site URL: `https://<tên-miền-vercel>` (vd `https://portfolio-xxxx.vercel.app`)
   - Redirect URLs: thêm `https://<tên-miền-vercel>/admin` **và** `http://localhost:3000/admin` (để dev local).
2. **Authentication → Email Templates** → có thể giữ nguyên (magic link mặc định).
3. Không cần tạo user thủ công — ai nhập đúng email sẽ nhận được link; bạn chỉ nên để **duy nhất email của bạn** là hợp lệ (xem mục 5).

## 5. Chỉ cho phép email của bạn đăng nhập (khuyên dùng)
Trong **SQL Editor**:
```sql
-- Chặn magic link cho mọi email TRỪ email của bạn
create policy "site_settings_owner_only"
  on public.site_settings for all
  using (auth.jwt() ->> 'email' = 'EMAIL-CỦA-BẠN@example.com')
  with check (auth.jwt() ->> 'email' = 'EMAIL-CỦA-BẠN@example.com');
```
Bảng có RLS nên không đăng nhập được cũng không ghi được; policy này siết thêm theo email.

## 6. Env vars
**Local** — tạo `.env.local` ở repo root:
```
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-public-key>
```
**Vercel** — Settings → Environment Variables (Production + Preview), thêm đúng 2 biến trên → **Redeploy**.

## 7. Chạy thử
1. `npm run dev` → mở `http://localhost:3000/admin`
2. Nhập email → Gửi link → mở email → click link → về `/admin` → chọn khung / upload ảnh → kiểm tra trang chủ (`/`).
3. Chọn "Tự động theo ngày" để quay về hành vi hiện tại.

## Ghi chú kỹ thuật
- Trang chủ đọc settings **trong trình duyệt** (1 request REST) — chưa cấu hình env hoặc lỗi mạng thì giữ nguyên mặc định: `frame_key=auto` + `avatar.jpg`.
- `NEXT_PUBLIC_*` được inline vào JS bundle **lúc build** — đổi env xong bắt buộc redeploy.
- Khung ghim ghi đè logic theo ngày cho **toàn bộ khách** (kể cả các mùa vừa sang); admin vẫn xem trước thay đổi ngay tại `/admin`.
- Thêm khung mới sau này: thêm entry trong `lib/frames.ts` (frame_key là text tự do trong DB) + component/CSS khung đó — không cần đổi schema.
- Ảnh upload đặt tên `avatar-<timestamp>.<ext>`; ảnh cũ không tự xóa (dọn thủ công trong Storage nếu muốn).
