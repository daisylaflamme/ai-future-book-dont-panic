import type { ReactNode } from "react";

/** Section-specific background gradients with subtle texture feel */
const SECTION_BACKGROUNDS: Record<string, string> = {
  "near-future": `
    linear-gradient(165deg, hsl(42 40% 98%) 0%, hsl(38 30% 95%) 25%, hsl(35 35% 91%) 60%, hsl(32 28% 94%) 100%),
    radial-gradient(ellipse at 15% 85%, hsl(38 50% 90% / 0.35) 0%, transparent 55%),
    radial-gradient(ellipse at 85% 15%, hsl(48 55% 93% / 0.4) 0%, transparent 45%),
    radial-gradient(circle at 50% 50%, hsl(40 30% 96% / 0.15) 0%, transparent 70%)
  `,
  "expanding-world": `
    linear-gradient(165deg, hsl(215 25% 98%) 0%, hsl(220 18% 95%) 25%, hsl(205 22% 92%) 60%, hsl(210 15% 95%) 100%),
    radial-gradient(ellipse at 10% 90%, hsl(215 35% 92% / 0.35) 0%, transparent 55%),
    radial-gradient(ellipse at 90% 10%, hsl(195 40% 93% / 0.4) 0%, transparent 45%),
    radial-gradient(circle at 60% 40%, hsl(210 20% 96% / 0.2) 0%, transparent 60%)
  `,
  "far-future": `
    linear-gradient(165deg, hsl(265 18% 98%) 0%, hsl(255 14% 95%) 25%, hsl(275 12% 92%) 60%, hsl(260 10% 95%) 100%),
    radial-gradient(ellipse at 10% 85%, hsl(265 25% 92% / 0.35) 0%, transparent 55%),
    radial-gradient(ellipse at 90% 15%, hsl(280 20% 94% / 0.3) 0%, transparent 45%),
    radial-gradient(circle at 40% 60%, hsl(255 15% 96% / 0.2) 0%, transparent 60%)
  `,
};

/** Pixel-precise spacing scale */
const SPACING = {
  pagePadding: "p-5 md:p-6 lg:p-7",
  imageHeight: "36%",
  /** 24–32px gap from image to title */
  imageToTitle: "pt-6 md:pt-7 lg:pt-8",
  /** 12–16px gap from title to body */
  titleToBody: "mb-3 md:mb-4",
  /** Generous line height */
  bodyLineHeight: "leading-[2.15]",
  /** Paragraph spacing */
  paragraphGap: "space-y-3 md:space-y-3.5",
  /** Body to page number */
  pageNumberTop: "pt-4 md:pt-5",
} as const;

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
      className={`flex flex-col h-full ${SPACING.pagePadding} ${side === "left" ? "border-r border-border/30" : ""}`}
      style={{ backgroundImage: bg }}
    >
      {/* Image container — breathing room via rounded frame + subtle shadow */}
      <div
        className="relative w-full flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center"
        style={{
          height: SPACING.imageHeight,
          background: "hsl(220 15% 95% / 0.3)",
          boxShadow: "0 4px 20px hsl(var(--book-shadow) / 0.1)",
        }}
      >
        {image}
      </div>

      {/* Text content — vertically balanced with justify-between */}
      <div className={`flex-1 flex flex-col min-h-0 ${SPACING.imageToTitle}`}>
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col justify-start">
          <div className={SPACING.titleToBody}>{title}</div>
          <div className={`${SPACING.bodyLineHeight} ${SPACING.paragraphGap}`}>{body}</div>
        </div>
      </div>

      {/* Page number — pinned bottom */}
      <div className={`flex-shrink-0 ${SPACING.pageNumberTop}`}>
        <p className="font-ui text-[10px] md:text-[11px] text-muted-foreground/60 text-center tracking-wider">
          — {pageNumber} —
        </p>
      </div>
    </div>
  );
};

export { SECTION_BACKGROUNDS, SPACING };
export default PageLayout;
