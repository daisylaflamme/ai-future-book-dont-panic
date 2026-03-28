import StoryPage from "./StoryPage";
import type { Story } from "@/data/bookData";

interface BookSpreadProps {
  left: Story;
  right: Story;
  spreadIndex: number;
  sectionTitle?: string;
}

const BookSpread = ({ left, right, spreadIndex, sectionTitle }: BookSpreadProps) => {
  const leftPageNum = spreadIndex * 2 + 1;
  const rightPageNum = spreadIndex * 2 + 2;

  return (
    <div className="relative grid h-full min-h-0 w-full grid-cols-1 grid-rows-1 items-stretch md:grid-cols-2">
      {/* Left page */}
      <div className="h-full min-h-0">
        <StoryPage story={left} pageNumber={leftPageNum} side="left" />
      </div>

      {/* Book spine - desktop only */}
      <div
        className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, hsl(var(--book-spine)) 10%, hsl(var(--book-spine)) 90%, transparent)",
          boxShadow:
            "-2px 0 8px hsl(var(--book-shadow) / 0.1), 2px 0 8px hsl(var(--book-shadow) / 0.1)",
        }}
      />

      {/* Right page */}
      <div className="h-full min-h-0">
        <StoryPage story={right} pageNumber={rightPageNum} side="right" />
      </div>
    </div>
  );
};

export default BookSpread;
