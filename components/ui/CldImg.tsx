import Image from "next/image";
import { cld } from "@/lib/cloudinary";

type Props = {
  src: string;
  alt: string;
  w: number;
  h?: number;
  sizes: string;
  crop?: "fill" | "fit" | "thumb" | "limit";
  gravity?: "auto" | "face";
  priority?: boolean;
  className?: string;
};

export function CldImg({ src, alt, w, h, sizes, crop, gravity, priority, className }: Props) {
  return (
    <Image
      src={cld(src, { w, h, crop, gravity })}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized
      className={className}
    />
  );
}
