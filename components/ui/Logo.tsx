import Image from "next/image";
import markPlate from "@/app/assets/logo-images/derived/mark-plate.png";
import markBare from "@/app/assets/logo-images/derived/mark-bare.png";

/**
 * The brand mark.
 *
 * The logo is navy (#0c2448), which is about 1.31:1 against the dark page
 * background — a dark smudge. Rather than recolour the brand, the dark theme
 * puts the untouched mark on a white rounded plate (18.6:1), which is the
 * conventional way to keep brand colours intact on a dark surface. The light
 * theme uses the untouched navy, where it reads at 14.3:1.
 *
 * Both variants are pre-cropped. The supplied logo.png carries ~50% dead
 * padding, so rendering it directly made the light mark half the size of the
 * dark one at the same box size.
 *
 * Both variants are rendered and CSS picks one, so the correct mark is already
 * in the HTML for whichever theme ThemeScript resolves before first paint —
 * swapping in JS would show the wrong logo for a frame.
 */
export function Logo({ size = 34 }: { size?: number }) {
  return (
    <span className="logo-mark" style={{ width: size, height: size }} aria-hidden="true">
      <Image src={markPlate} alt="" width={size} height={size} className="logo-on-dark" priority />
      <Image src={markBare} alt="" width={size} height={size} className="logo-on-light" priority />
    </span>
  );
}
