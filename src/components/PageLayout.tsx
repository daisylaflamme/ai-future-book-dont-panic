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
  return (
    <div
      className={`relative flex h-full flex-col p-5 md:p-7 lg:p-8 ${
        side === "left" ? "border-r border-border/20" : ""
      }`}
      style={{
        backgroundImage: `url(${pageBackground})`,
        backgroundSize: "cover",
        backgroundPosition: side === "left" ? "left center" : "right center",
      }}
    >
      {/* Content outline container */}
      <div
        className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border/55 bg-background/20 p-4 md:p-5"
        style={{
          boxShadow:
            "0 2px 12px hsl(var(--book-shadow) / 0.08), inset 0 0 0 0.5px hsl(var(--background) / 0.6)",
        }}
      >
        {/* Image container */}
        <div
          className="relative w-full flex-shrink-0 rounded-md overflow-hidden"
          style={{
            height: "38%",
            border: "2px solid hsl(var(--border) / 0.55)",
            boxShadow:
              "0 4px 24px hsl(var(--book-shadow) / 0.12), inset 0 0 0 1px hsl(var(--background) / 0.35)",
          }}
        >
          {image}
        </div>

        {/* Title */}
        <div className="pb-3 pt-5 md:pb-4 md:pt-6 lg:pt-7">
          {title}
        </div>

        {/* Body text */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 pb-2">
          {body}
        </div>

        {/* Bold decorative divider */}
        <div className="mt-auto flex flex-shrink-0 items-center justify-center gap-2 pb-1 pt-4">
          <div
            className="h-[1.5px] w-8"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--book-accent)))" }}
          />
          <div className="h-1.5 w-1.5 rounded-full bg-book-accent/75" />
          <div
            className="h-[1.5px] w-8"
            style={{ background: "linear-gradient(90deg, hsl(var(--book-accent)), transparent)" }}
          />
        </div>
      </div>
    </div>
  );
};

export { SECTION_TINTS, getSectionBackground };
export default PageLayout;
