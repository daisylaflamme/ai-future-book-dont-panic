import type { Story } from "@/data/bookData";
import PageLayout from "./PageLayout";

interface StoryPageProps {
  story: Story;
  pageNumber: number;
  side: "left" | "right";
}

/**
 * Parse story text to separate regular paragraphs from "Milo's Note:" blocks.
 * Milo's Note gets special bold+italic styling like the mockup.
 */
const renderStoryText = (text: string) => {
  const paragraphs = text.split("\n").filter((p) => p.trim());

  return paragraphs.map((para, i) => {
    // Check if this paragraph starts with "Milo's Note:"
    if (para.trim().startsWith("Milo's Note:")) {
      const noteContent = para.trim().replace("Milo's Note:", "").trim();
      return (
        <p key={i} className="mt-1">
          <span className="font-bold text-foreground/90">Milo's Note:</span>{" "}
          <span>{noteContent}</span>
        </p>
      );
    }
    return <p key={i}>{para}</p>;
  });
};

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
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-book-warm">
            <span className="text-lg text-muted-foreground/40">📖</span>
          </div>
        )
      }
      title={
        <h3 className="font-display text-base md:text-lg lg:text-xl font-bold text-foreground text-center leading-snug">
          {story.title}
        </h3>
      }
      body={
        <div className="font-body text-[11px] md:text-xs lg:text-[13px] text-foreground/75">
          {renderStoryText(story.text)}
        </div>
      }
    />
  );
};

export default StoryPage;
