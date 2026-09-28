type CldOptions = {
  w?: number;
  h?: number;
  crop?: "fill" | "fit" | "thumb" | "limit";
  gravity?: "auto" | "face";
};

const UPLOAD_SEGMENT = "/image/upload/";

export function cld(url: string | undefined | null, { w, h, crop = "fill", gravity = "auto" }: CldOptions = {}) {
  if (!url) return "";
  if (!url.includes("res.cloudinary.com") || !url.includes(UPLOAD_SEGMENT)) return url;

  const parts = ["f_auto", "q_auto", `c_${crop}`];
  if (crop === "fill" || crop === "thumb") parts.push(`g_${gravity}`);
  if (w) parts.push(`w_${w}`);
  if (h) parts.push(`h_${h}`);

  const [base, rest] = url.split(UPLOAD_SEGMENT);
  return `${base}${UPLOAD_SEGMENT}${parts.join(",")}/${rest}`;
}
