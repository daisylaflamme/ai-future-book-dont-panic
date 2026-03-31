import type { ReactNode } from "react";
import pageBackground from "@/assets/page-background.png";

const SECTION_TINTS: Record<string, string> = {};

function getSectionBackground(_section: string): string {
  return `url(${pageBackground})`;
}

interface PageLayoutProps {
  section: string;
  side: "left" | "right";
  pageNumber: number;
  image: ReactNode;
  title: ReactNode;
  body: ReactNode;
}

const PageLayout = ({ section, side, image, title, body }: PageLayoutProps) => {
  const sectionBackground = getSectionBackground(section);

  return (
    <div
      className={`relative flex h-full min-h-0 flex-col p-2 sm:p-4 md:p-7 lg:p-8 ${
        side === "left" ? "md:landscape:border-r lg:border-r border-border/20" : ""
      }`}
      style={{
        backgroundImage: sectionBackground,
        backgroundSize: "cover",
        backgroundPosition: side === "left" ? "left center" : "right center",
      }}
    >
      {/* Content outline container */}
        <div
          className="grid h-full min-h-0 w-full flex-1 grid-rows-[minmax(0,35%)_auto_minmax(0,1fr)_minmax(20px,auto)] sm:grid-rows-[minmax(0,38%)_auto_minmax(0,1fr)_minmax(24px,auto)] overflow-hidden rounded-lg border border-border/65 bg-background/20 p-2 sm:p-3 md:p-5"
        style={{
          boxShadow:
            "0 2px 12px hsl(var(--book-shadow) / 0.08), inset 0 -1px 0 hsl(var(--border) / 0.7), inset 0 0 0 0.5px hsl(var(--background) / 0.6)",
        }}
      >
        {/* Image container */}
        <div
          className="relative w-full flex-shrink-0 overflow-hidden rounded-md"
          style={{
            height: "100%",
            border: "2px solid hsl(var(--border) / 0.55)",
            boxShadow:
              "0 4px 24px hsl(var(--book-shadow) / 0.12), inset 0 0 0 1px hsl(var(--background) / 0.35)",
          }}
        >
          {image}
        </div>

        {/* Title */}
        <div className="pb-2 pt-3 sm:pb-3 sm:pt-5 md:pb-4 md:pt-6 lg:pt-7">
          {title}
        </div>

        {/* Body text */}
        <div className="book-scrollbar min-h-0 overflow-y-auto p-2 pr-1 pb-1 sm:p-6 sm:pt-4 sm:pb-1">
          {body}
        </div>

        {/* Bottom decorative divider */}
        <div className="flex min-h-[24px] flex-shrink-0 items-center justify-center gap-2 pt-2">
          <div
            className="h-[2px] w-12"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(var(--book-gold) / 0.9), hsl(var(--book-gold)))",
            }}
          />
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: "hsl(var(--book-gold))" }}
          />
          <div
            className="h-[2px] w-12"
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--book-gold)), hsl(var(--book-gold) / 0.9), transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export { SECTION_TINTS, getSectionBackground };
export default PageLayout;
