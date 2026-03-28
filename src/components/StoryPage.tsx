import type { Story } from "@/data/bookData";
import PageLayout from "./PageLayout";
import { useState } from "react";

interface StoryPageProps {
  story: Story;
  pageNumber: number;
  side: "left" | "right";
}

/**
 * Parse story text to separate regular paragraphs from "Milo's Note:" blocks.
 * Milo's Note gets italic Libre Baskerville styling with muted color.
 */
const renderStoryText = (text: string) => {
  const paragraphs = text.split("\n").filter((p) => p.trim());

  return paragraphs.map((para, i) => {
    if (para.trim().startsWith("Milo's Note:")) {
      const noteContent = para.trim().replace("Milo's Note:", "").trim();
      return (
        <p key={i} className="mt-4 mb-2">
          <span className="font-bold" style={{ color: "#1B2A4A" }}>Milo's Note:</span>{" "}
          <span style={{ color: "#1B2A4A" }}>{noteContent}</span>
        </p>
      );
    }
    return <p key={i} className="mb-3">{para}</p>;
  });
};

const StoryPage = ({ story, pageNumber, side }: StoryPageProps) => {
  const [showFull, setShowFull] = useState(false);

  return (
    <>
      <PageLayout
        section={story.section}
        side={side}
        pageNumber={pageNumber}
        image={
          story.imageUrl ? (
            <div
              className="relative w-full h-full"
            >
              <img
                src={story.imageUrl}
                alt={story.title}
                className="w-full h-full object-cover hidden md:block md:cursor-zoom-in"
                loading="lazy"
                onClick={() => setShowFull(true)}
              />
              <img
                src={story.imageUrl}
                alt={story.title}
                className="w-full h-full object-cover md:hidden"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-book-warm">
              <span className="text-lg text-muted-foreground/40">📖</span>
            </div>
          )
        }
        title={
          <h3 className="font-display text-base md:text-lg lg:text-xl font-semibold text-foreground text-center leading-snug tracking-wide">
            {story.title}
          </h3>
        }
        body={
          <div
            className="font-body text-[11px] md:text-xs lg:text-[13px] text-foreground/75"
            style={{ lineHeight: 1.7 }}
          >
            {renderStoryText(story.text)}
          </div>
        }
      />

      {/* Desktop-only fullsize image overlay on hover */}
      {showFull && story.imageUrl && (
        <div
          className="hidden md:flex fixed inset-0 z-50 items-center justify-center bg-black/60 animate-fade-in cursor-zoom-out"
          onClick={() => setShowFull(false)}
        >
          <img
            src={story.imageUrl}
            alt={story.title}
            className="max-w-[85vw] max-h-[85vh] rounded-xl object-contain shadow-2xl animate-scale-in"
            style={{
              boxShadow: "0 20px 60px hsl(var(--book-shadow) / 0.4)",
            }}
          />
        </div>
      )}
    </>
  );
};

export default StoryPage;
