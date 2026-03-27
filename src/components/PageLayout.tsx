import type { ReactNode } from "react";

/**
 * Dreamy gradient background matching the mockup:
 * Frosted glass pages over a warm-to-cool cosmic gradient with sparkle accents.
 * Section tints are subtle shifts on top of the base.
 */
const SECTION_BACKGROUNDS: Record<string, string> = {
  "near-future": `
    linear-gradient(170deg,
      hsl(220 20% 94% / 0.95) 0%,
      hsl(230 18% 92% / 0.9) 30%,
      hsl(260 15% 90% / 0.85) 60%,
      hsl(30 30% 92% / 0.9) 100%
    ),
    radial-gradient(ellipse at 20% 90%, hsl(30 50% 88% / 0.4) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 10%, hsl(220 30% 92% / 0.3) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, hsl(0 0% 100% / 0.15) 0%, transparent 70%)
  `,
  "expanding-world": `
    linear-gradient(170deg,
      hsl(220 22% 93% / 0.95) 0%,
      hsl(230 20% 91% / 0.9) 30%,
      hsl(250 18% 89% / 0.85) 60%,
      hsl(215 25% 91% / 0.9) 100%
    ),
    radial-gradient(ellipse at 15% 85%, hsl(220 35% 88% / 0.35) 0%, transparent 50%),
    radial-gradient(ellipse at 85% 15%, hsl(200 30% 92% / 0.3) 0%, transparent 50%),
    radial-gradient(circle at 60% 40%, hsl(0 0% 100% / 0.12) 0%, transparent 65%)
  `,
  "far-future": `
    linear-gradient(170deg,
      hsl(250 18% 94% / 0.95) 0%,
      hsl(260 15% 91% / 0.9) 30%,
      hsl(270 12% 89% / 0.85) 60%,
      hsl(280 15% 91% / 0.9) 100%
    ),
    radial-gradient(ellipse at 10% 80%, hsl(260 25% 88% / 0.35) 0%, transparent 50%),
    radial-gradient(ellipse at 90% 20%, hsl(280 20% 92% / 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, hsl(0 0% 100% / 0.12) 0%, transparent 65%)
  `,
};

interface PageLayoutProps {
  section: string;
  side: "left" | "right";
  pageNumber: number;
  image: ReactNode;
  title: ReactNode;
  body: ReactNode;
}

const PageLayout = ({ section, side, pageNumber, image, title, body }: PageLayoutProps) => {
  const bg = SECTION_BACKGROUNDS[section] || SECTION_BACKGROUNDS["near-future"];

  return (
    <div
      className={`relative flex flex-col h-full p-5 md:p-7 lg:p-8 ${
        side === "left" ? "border-r border-border/20" : ""
      }`}
      style={{ backgroundImage: bg }}
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

      {/* Body text — well-spaced paragraphs */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
        <div className="leading-[2.0] md:leading-[2.1] space-y-3 md:space-y-3.5">
          {body}
        </div>
      </div>

      {/* Page number — pinned bottom, muted */}
      <div className="flex-shrink-0 pt-4 md:pt-5">
        <p className="font-ui text-[10px] md:text-[11px] text-muted-foreground/50 text-center tracking-widest">
          {pageNumber}
        </p>
      </div>
    </div>
  );
};

export { SECTION_BACKGROUNDS };
export default PageLayout;
