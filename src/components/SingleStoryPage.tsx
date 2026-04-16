import type { Story } from "@/data/bookData";
import PageLayout from "./PageLayout";
import StoryImage from "./StoryImage";
import { useState } from "react";

interface SingleStoryPageProps {
  story: Story;
  pageIndex: number;
}

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

const SingleStoryPage = ({ story, pageIndex }: SingleStoryPageProps) => {
  const [showFull, setShowFull] = useState(false);

  return (
    <>
      <PageLayout
        section={story.section}
        side="left"
        pageNumber={pageIndex + 1}
        image={
          story.imageUrl ? (
            <StoryImage src={story.imageUrl} alt={story.title} onZoom={() => setShowFull(true)} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-book-warm">
              <span className="text-lg text-muted-foreground/40">📖</span>
            </div>
          )
        }
        title={
          <h3 className="font-display text-base sm:text-lg md:text-xl font-semibold text-foreground text-center leading-snug tracking-wide">
            {story.title}
          </h3>
        }
        body={
          <div
            className="font-body text-xs sm:text-[13px] md:text-sm text-foreground/75"
            style={{ lineHeight: 1.7 }}
          >
            {renderStoryText(story.text)}
          </div>
        }
      />

      {showFull && story.imageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in cursor-zoom-out"
          onClick={() => setShowFull(false)}
        >
          <img
            src={story.imageUrl}
            alt={story.title}
            className="max-w-[90vw] max-h-[85vh] rounded-xl object-contain shadow-2xl animate-scale-in"
          />
        </div>
      )}
    </>
  );
};

export default SingleStoryPage;
