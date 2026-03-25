import type { Story } from "@/data/bookData";

interface StoryPageProps {
  story: Story;
  pageNumber: number;
  side: "left" | "right";
}

const StoryPage = ({ story, pageNumber, side }: StoryPageProps) => {
  return (
    <div className={`flex flex-col h-full bg-book-page p-4 md:p-6 lg:p-8 ${side === "left" ? "border-r border-border/50" : ""}`}>
      {/* Illustration */}
      <div className="relative w-full flex-shrink-0 mb-3 md:mb-4 rounded-md overflow-hidden bg-book-warm"
        style={{ height: "55%" }}
      >
        {story.imageUrl ? (
          <img
            src={story.imageUrl}
            alt={story.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-muted-foreground/40">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-muted/50 flex items-center justify-center">
                <span className="text-lg">📖</span>
              </div>
              <p className="font-ui text-xs">Illustration</p>
            </div>
          </div>
        )}
      </div>

      {/* Story content */}
      <div className="flex-1 flex flex-col justify-between min-h-0">
        <div>
          <h3 className="font-display text-base md:text-lg lg:text-xl font-semibold text-foreground mb-2 leading-tight">
            {story.title}
          </h3>
          <p className="font-body text-xs md:text-sm leading-relaxed text-foreground/85">
            {story.text}
          </p>
        </div>

        {/* Page number */}
        <div className="mt-2 pt-2">
          <p className="font-ui text-xs text-muted-foreground text-center">
            {pageNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
