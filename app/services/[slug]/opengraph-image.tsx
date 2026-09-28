import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";
import { getService } from "@/lib/api";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Service";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug);

  return renderOgImage({
    eyebrow: "Service",
    title: service?.title ?? "Service",
    description: service?.shortDescription,
  });
}
