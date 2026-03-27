import type { Story } from "@/data/bookData";

interface StoryPageProps {
  story: Story;
  pageNumber: number;
  side: "left" | "right";
}

const sectionGradients: Record<string, string> = {
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

const StoryPage = ({ story, pageNumber, side }: StoryPageProps) => {
  const bg = sectionGradients[story.section] || sectionGradients["near-future"];

  return (
    <div
      className={`flex flex-col h-full p-4 md:p-5 lg:p-6 ${side === "left" ? "border-r border-border/30" : ""}`}
      style={{ backgroundImage: bg }}
    >
      {/* Illustration */}
      <div
        className="relative w-full flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center"
        style={{
          height: "38%",
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

      {/* Story content — fills remaining space, vertically distributed */}
      <div className="flex-1 flex flex-col min-h-0 mt-3">
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col justify-start pt-2">
          <h3 className="font-display text-sm md:text-base lg:text-lg font-semibold text-foreground mb-3 leading-snug">
            {story.title}
          </h3>
          <div className="font-body text-[11px] md:text-xs lg:text-[13px] leading-[1.9] text-foreground/80 space-y-2">
            {story.text.split("\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Page number — pinned to bottom */}
      <div className="flex-shrink-0 pt-2">
        <p className="font-ui text-[10px] md:text-[11px] text-muted-foreground/60 text-center tracking-wider">
          — {pageNumber} —
        </p>
      </div>
    </div>
  );
};

export default StoryPage;
