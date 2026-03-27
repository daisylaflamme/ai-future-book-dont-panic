import type { ReactNode } from "react";

/**
 * Warm, elegant book page background.
 * Base: #F7F4EF warm off-white
 * Gradient: top-left #F2EDE7 → bottom-right #FAF7F2
 * Subtle radial glow + faint noise texture for print realism.
 * Consistent across all sections with very subtle section tints.
 */
const BASE_BACKGROUND = `
  linear-gradient(135deg, #F2EDE7 0%, #F7F4EF 45%, #FAF7F2 100%),
  radial-gradient(ellipse at 25% 75%, hsl(35 40% 92% / 0.25) 0%, transparent 55%),
  radial-gradient(ellipse at 75% 25%, hsl(40 30% 95% / 0.2) 0%, transparent 50%)
`;

const SECTION_TINTS: Record<string, string> = {
  "near-future": `
    radial-gradient(ellipse at 60% 30%, hsl(38 45% 92% / 0.15) 0%, transparent 60%)
  `,
  "expanding-world": `
    radial-gradient(ellipse at 60% 30%, hsl(215 30% 93% / 0.15) 0%, transparent 60%)
  `,
  "far-future": `
    radial-gradient(ellipse at 60% 30%, hsl(260 20% 93% / 0.15) 0%, transparent 60%)
  `,
};

function getSectionBackground(section: string): string {
  const tint = SECTION_TINTS[section] || SECTION_TINTS["near-future"];
  return `${tint}, ${BASE_BACKGROUND}`;
}

interface PageLayoutProps {
  section: string;
  side: "left" | "right";
  pageNumber: number;
  image: ReactNode;
  title: ReactNode;
  body: ReactNode;
}

const PageLayout = ({ section, side, pageNumber, image, title, body }: PageLayoutProps) => {
  const bg = getSectionBackground(section);

  return (
    <div
      className={`relative flex flex-col h-full p-5 md:p-7 lg:p-8 ${
        side === "left" ? "border-r border-border/20" : ""
      }`}
      style={{
        backgroundImage: bg,
        backgroundColor: "#F7F4EF",
      }}
    >
      {/* Image container with border frame like mockup */}
      <div
        className="relative w-full flex-shrink-0 rounded-md overflow-hidden"
        style={{
          height: "36%",
          border: "3px solid hsl(220 15% 88% / 0.6)",
          boxShadow: "0 4px 24px hsl(220 30% 30% / 0.08), inset 0 0 0 1px hsl(0 0% 100% / 0.3)",
        }}
      >
        {image}
      </div>

      {/* Title — centered, larger, bold serif like mockup */}
      <div className="pt-5 md:pt-6 lg:pt-7 pb-3 md:pb-4">
        {title}
      </div>

      {/* Body text */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
        {body}
      </div>

      {/* Page number — Libre Baskerville, small, subtle */}
      <div className="flex-shrink-0 pt-4 md:pt-5">
        <p className="font-body text-[10px] md:text-[11px] text-foreground/35 text-center tracking-wider">
          {pageNumber}
        </p>
      </div>
    </div>
  );
};

export { SECTION_TINTS, getSectionBackground };
export default PageLayout;
