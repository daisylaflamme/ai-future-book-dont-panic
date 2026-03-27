import type { Story } from "@/data/bookData";

interface StoryPageProps {
  story: Story;
  pageNumber: number;
  side: "left" | "right";
}

const StoryPage = ({ story, pageNumber, side }: StoryPageProps) => {
  return (
    <div
      className={`flex flex-col h-full p-5 md:p-6 lg:p-7 ${side === "left" ? "border-r border-border/30" : ""}`}
      style={{
        background: `
          linear-gradient(160deg, hsl(40 35% 97%) 0%, hsl(38 28% 95%) 30%, hsl(35 30% 92%) 100%)
        `,
        backgroundImage: `
          linear-gradient(160deg, hsl(40 35% 97%) 0%, hsl(38 28% 95%) 30%, hsl(35 30% 92%) 100%),
          radial-gradient(ellipse at 20% 80%, hsl(210 30% 95% / 0.3) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, hsl(38 40% 92% / 0.4) 0%, transparent 50%)
        `,
      }}
    >
      {/* Illustration */}
      <div
        className="relative w-full flex-shrink-0 mb-3 rounded-lg overflow-hidden"
        style={{
          height: "42%",
          boxShadow: "0 3px 16px hsl(var(--book-shadow) / 0.1)",
        }}
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
        <div className="overflow-y-auto pr-1">
          <h3 className="font-display text-sm md:text-base lg:text-lg font-semibold text-foreground mb-2 leading-snug">
            {story.title}
          </h3>
          <p className="font-body text-[11px] md:text-xs lg:text-[13px] leading-[1.7] text-foreground/80 whitespace-pre-line">
            {story.text}
          </p>
        </div>

        {/* Page number */}
        <div className="mt-2 pt-1 flex-shrink-0">
          <p className="font-ui text-[9px] md:text-[10px] text-muted-foreground/50 text-center italic tracking-wider">
            — {pageNumber} —
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
