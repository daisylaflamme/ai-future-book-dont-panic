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

const PageLayout = ({ section, side, pageNumber, image, title, body }: PageLayoutProps) => {
  const bg = getSectionBackground(section);

  return (
    <div
      className={`relative flex flex-col justify-between h-full p-5 md:p-7 lg:p-8 ${
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
        className="flex flex-col rounded-lg p-4 md:p-5"
        style={{
          border: "1.5px solid hsl(220 20% 85% / 0.5)",
          boxShadow: "0 2px 12px hsl(220 30% 50% / 0.06), inset 0 0 0 0.5px hsl(0 0% 100% / 0.4)",
          background: "hsl(0 0% 100% / 0.15)",
          maxHeight: "calc(100% - 28px)",
          flex: "1 1 0",
          minHeight: 0,
        }}
      >
        {/* Image container */}
        <div
          className="relative w-full flex-shrink-0 rounded-md overflow-hidden"
          style={{
            height: "38%",
            border: "3px solid hsl(220 15% 88% / 0.6)",
            boxShadow: "0 4px 24px hsl(220 30% 30% / 0.08), inset 0 0 0 1px hsl(0 0% 100% / 0.3)",
          }}
        >
          {image}
        </div>

        {/* Title */}
        <div className="pt-5 md:pt-6 lg:pt-7 pb-3 md:pb-4">
          {title}
        </div>

        {/* Body text */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          {body}
        </div>

        {/* Bold decorative divider */}
        <div className="flex-shrink-0 flex items-center justify-center gap-2 pt-4">
          <div className="w-8 h-[1.5px]" style={{ background: "linear-gradient(90deg, transparent, #9B8E7A)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#B0A48E" }} />
          <div className="w-8 h-[1.5px]" style={{ background: "linear-gradient(90deg, #9B8E7A, transparent)" }} />
        </div>
      </div>

      {/* Page number */}
      <div className="flex-shrink-0 pt-2">
        <p className="font-body text-[10px] md:text-[11px] text-foreground/35 text-center tracking-wider">
          {pageNumber}
        </p>
      </div>
    </div>
  );
};

export { SECTION_TINTS, getSectionBackground };
export default PageLayout;
