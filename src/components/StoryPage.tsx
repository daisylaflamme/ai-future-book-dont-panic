import type { Story } from "@/data/bookData";
import PageLayout from "./PageLayout";

interface StoryPageProps {
  story: Story;
  pageNumber: number;
  side: "left" | "right";
}

const StoryPage = ({ story, pageNumber, side }: StoryPageProps) => {
  return (
    <PageLayout
      section={story.section}
      side={side}
      pageNumber={pageNumber}
      image={
        story.imageUrl ? (
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
        )
      }
      title={
        <h3 className="font-display text-sm md:text-base lg:text-lg font-semibold text-foreground leading-snug">
          {story.title}
        </h3>
      }
      body={
        <div className="font-body text-[11px] md:text-xs lg:text-[13px] text-foreground/80">
          {story.text.split("\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      }
    />
  );
};

export default StoryPage;
