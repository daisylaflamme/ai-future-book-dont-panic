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
      className={`relative flex flex-col h-full p-5 md:p-7 lg:p-8 ${
        side === "left" ? "border-r border-border/20" : ""
      }`}
      style={{
        backgroundImage: `url(${pageBackground})`,
        backgroundSize: "cover",
        backgroundPosition: side === "left" ? "left center" : "right center",
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

      {/* Decorative divider */}
      <div className="flex-shrink-0 flex justify-center pt-3">
        <div className="w-12 h-px" style={{ background: "linear-gradient(90deg, transparent, #C4B99A, transparent)" }} />
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
