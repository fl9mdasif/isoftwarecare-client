import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";
import { getPortfolioItem } from "@/lib/api";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Case study";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getPortfolioItem(slug);

  return renderOgImage({
    eyebrow: item?.client ? `Case study · ${item.client}` : "Case study",
    title: item?.title ?? "Case study",
    description: item?.description,
  });
}
