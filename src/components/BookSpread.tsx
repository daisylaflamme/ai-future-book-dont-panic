import StoryPage from "./StoryPage";
import type { Story } from "@/data/bookData";

interface BookSpreadProps {
  left: Story;
  right: Story;
  spreadIndex: number;
}

const BookSpread = ({ left, right, spreadIndex }: BookSpreadProps) => {
  const leftPageNum = spreadIndex * 2 + 1;
  const rightPageNum = spreadIndex * 2 + 2;

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 relative">
      {/* Left page */}
      <StoryPage story={left} pageNumber={leftPageNum} side="left" />

      {/* Book spine - desktop only */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, hsl(var(--book-spine)) 10%, hsl(var(--book-spine)) 90%, transparent)",
          boxShadow: "-2px 0 8px hsl(var(--book-shadow) / 0.1), 2px 0 8px hsl(var(--book-shadow) / 0.1)",
        }}
      />

      {/* Right page */}
      <StoryPage story={right} pageNumber={rightPageNum} side="right" />
    </div>
  );
};

export default BookSpread;
