import type { Story } from "@/data/bookData";

interface StoryPageProps {
  story: Story;
  pageNumber: number;
  side: "left" | "right";
}

const StoryPage = ({ story, pageNumber, side }: StoryPageProps) => {
  return (
    <div
      className={`flex flex-col h-full p-3 md:p-5 lg:p-6 ${side === "left" ? "border-r border-border/50" : ""}`}
      style={{
        background: "linear-gradient(180deg, hsl(40 35% 97%) 0%, hsl(35 30% 94%) 100%)",
      }}
    >
      {/* Illustration */}
      <div
        className="relative w-full flex-shrink-0 mb-2 md:mb-3 rounded-md overflow-hidden"
        style={{ height: "50%", boxShadow: "0 2px 12px hsl(var(--book-shadow) / 0.1)" }}
      >
        {story.imageUrl ? (
          <img
            src={story.imageUrl}
            alt={story.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-book-warm">
            <div className="text-center text-muted-foreground/40">
              <span className="text-lg">📖</span>
              <p className="font-ui text-xs mt-1">Illustration</p>
            </div>
          </div>
        )}
      </div>

      {/* Story content */}
      <div className="flex-1 flex flex-col justify-between min-h-0 overflow-hidden">
        <div className="overflow-y-auto">
          <h3 className="font-display text-sm md:text-base lg:text-lg font-semibold text-foreground mb-1.5 leading-tight">
            {story.title}
          </h3>
          <p className="font-body text-[10px] md:text-xs lg:text-sm leading-relaxed text-foreground/85 whitespace-pre-line">
            {story.text}
          </p>
        </div>

        {/* Page number */}
        <div className="mt-1 pt-1 flex-shrink-0">
          <p className="font-ui text-[9px] md:text-xs text-muted-foreground text-center">
            {pageNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
