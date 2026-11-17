/**
 * Kho khung viền avatar — registry dùng chung cho trang /admin (chọn khung)
 * và SiteSettingsProvider (áp dụng khung theo site settings).
 * Thêm khung mới trong tương lai: thêm entry tại đây + component/CSS tương ứng,
 * không cần đổi schema DB (frame_key là text tự do).
 */

export type FrameKey =
  | "auto"
  | "winter"
  | "spring"
  | "tet"
  | "newyear"
  | "summer"
  | "autumn";

export interface FrameOption {
  key: FrameKey;
  name: string;
  icon: string;
  description: string;
}

export const FRAME_OPTIONS: readonly FrameOption[] = [
  {
    key: "auto",
    name: "Tự động theo ngày",
    icon: "🔄",
    description: "Khớp lịch: Tết, Noel, biển, thu, giao mùa — như hiện tại.",
  },
  {
    key: "winter",
    name: "Mùa Đông (Tuyết & Noel)",
    icon: "❄️",
    description: "Bông tuyết orbit, hạt tuyết 3D, tông xanh băng.",
  },
  {
    key: "spring",
    name: "Xuân Tự Nhiên",
    icon: "🌸",
    description: "Cánh anh đào + phấn vàng 3D, vòng sakura mảnh.",
  },
  {
    key: "tet",
    name: "Tết Âm Lịch",
    icon: "🧧",
    description: "Mai vàng 5 cánh, đèn lồng, tia lửa đỏ 3D.",
  },
  {
    key: "newyear",
    name: "Tết Dương Lịch",
    icon: "🎆",
    description: "Chùm pháo hoa tím/vàng/san hô nổ theo chu kỳ 3D.",
  },
  {
    key: "summer",
    name: "Mùa Hạ (Bãi Biển)",
    icon: "🏖️",
    description: "Sao biển, bong bóng, tia biển cyan lấp lánh.",
  },
  {
    key: "autumn",
    name: "Mùa Thu (Lá Phong)",
    icon: "🍁",
    description: "Lá phong lật 3D, hạt dẻ, tông hổ phách.",
  },
] as const;

export const DEFAULT_FRAME_KEY: FrameKey = "auto";

const VALID_KEYS = new Set<string>(FRAME_OPTIONS.map((f) => f.key));

export function normalizeFrameKey(raw: string | null | undefined): FrameKey {
  return raw && VALID_KEYS.has(raw) ? (raw as FrameKey) : DEFAULT_FRAME_KEY;
}

/** Map frame_key → (season, festive) cho html data-* attributes; auto → null. */
export function pinnedFrameToAttributes(
  frameKey: FrameKey
): { season: string; festive: string } | null {
  switch (frameKey) {
    case "winter":
      return { season: "winter", festive: "noel" };
    case "spring":
      return { season: "spring", festive: "spring-natural" };
    case "tet":
      return { season: "spring", festive: "tet" };
    case "newyear":
      return { season: "spring", festive: "newyear" };
    case "summer":
      return { season: "summer", festive: "beach" };
    case "autumn":
      return { season: "autumn", festive: "autumn" };
    default:
      return null; // auto — giữ logic theo ngày
  }
}
