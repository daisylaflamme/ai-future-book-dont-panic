import type { Story } from "@/data/bookData";

interface StoryPageProps {
  story: Story;
  pageNumber: number;
  side: "left" | "right";
}

const sectionGradients: Record<string, string> = {
  "near-future": `
    linear-gradient(160deg, hsl(40 35% 97%) 0%, hsl(38 28% 95%) 30%, hsl(35 30% 92%) 100%),
    radial-gradient(ellipse at 20% 80%, hsl(38 40% 92% / 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, hsl(45 50% 94% / 0.4) 0%, transparent 50%)
  `,
  "expanding-world": `
    linear-gradient(160deg, hsl(210 20% 97%) 0%, hsl(220 15% 95%) 30%, hsl(200 18% 93%) 100%),
    radial-gradient(ellipse at 30% 70%, hsl(210 30% 94% / 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 20%, hsl(38 30% 94% / 0.3) 0%, transparent 50%)
  `,
  "far-future": `
    linear-gradient(160deg, hsl(260 15% 97%) 0%, hsl(250 12% 95%) 30%, hsl(270 10% 93%) 100%),
    radial-gradient(ellipse at 20% 80%, hsl(260 20% 94% / 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, hsl(38 25% 94% / 0.3) 0%, transparent 50%)
  `,
};

const StoryPage = ({ story, pageNumber, side }: StoryPageProps) => {
  const bg = sectionGradients[story.section] || sectionGradients["near-future"];

  return (
    <div
      className={`flex flex-col h-full p-4 md:p-5 lg:p-6 ${side === "left" ? "border-r border-border/30" : ""}`}
      style={{ backgroundImage: bg }}
    >
      {/* Illustration — object-contain to prevent stretching */}
      <div
        className="relative w-full flex-shrink-0 mb-5 rounded-lg overflow-hidden flex items-center justify-center"
        style={{
          height: "40%",
          background: "hsl(220 15% 95% / 0.3)",
          boxShadow: "0 3px 16px hsl(var(--book-shadow) / 0.08)",
        }}
      >
        {story.imageUrl ? (
          <img
            src={story.imageUrl}
            alt={story.title}
            className="w-full h-full object-cover rounded"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-book-warm">
            <span className="text-lg text-muted-foreground/40">📖</span>
          </div>
        )}
      </div>

      {/* Story content */}
      <div className="flex-1 flex flex-col justify-between min-h-0 overflow-hidden">
        <div className="overflow-y-auto pr-1">
          <h3 className="font-display text-sm md:text-base lg:text-lg font-semibold text-foreground mb-2 leading-snug">
            {story.title}
          </h3>
          <p className="font-body text-[11px] md:text-xs lg:text-[13px] leading-[1.75] text-foreground/80 whitespace-pre-line">
            {story.text}
          </p>
        </div>

        {/* Page number — always visible */}
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
