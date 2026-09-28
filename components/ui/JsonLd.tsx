/**
 * Structured data. The JSON is built server-side from trusted content, and `<`
 * is escaped so a stray angle bracket in a title cannot close the script tag.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
