/**
 * Renders schema.org structured data. Server component: the JSON is in the
 * initial HTML, so crawlers read it without running JavaScript.
 * `<` is escaped so content can never close the script tag early.
 */
export const JsonLd = ({ data }: { data: Record<string, unknown> }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    }}
  />
);
