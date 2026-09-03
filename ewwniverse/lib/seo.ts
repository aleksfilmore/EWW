const SHARE_IMAGE = {
  url: "/images/og-eww.jpg",
  width: 1200,
  height: 630,
  alt: "Dr. Icky — Chief Specimen Scientist of the EWW-niverse",
};

/** Complete, route-specific Open Graph data for static EWW-niverse pages. */
export function pageOpenGraph(path: string, title: string, description: string) {
  return {
    type: "website" as const,
    url: path,
    title,
    description,
    images: [SHARE_IMAGE],
  };
}
