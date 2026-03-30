import { useState, useCallback, useMemo } from "react";
import BookCover from "./BookCover";
import TitlePage from "./TitlePage";
import ContentsPage from "./ContentsPage";
import BackCover from "./BackCover";
import BookSpread from "./BookSpread";
import SectionDivider from "./SectionDivider";
import BookNavigation from "./BookNavigation";
import { getSpreadPages, stories, BOOK_META } from "@/data/bookData";
import { storyImages, coverImage } from "@/data/bookImages";
import { useToast } from "@/hooks/use-toast";

const BookViewer = () => {
  useMemo(() => {
    stories.forEach((story) => {
      if (storyImages[story.id]) {
        story.imageUrl = storyImages[story.id];
      }
    });
  }, []);

  const spreads = getSpreadPages();
  // Pages: cover, title, contents, spreads..., back-cover
  const totalSpreads = 3 + spreads.length + 1; // cover + title + contents + story spreads + back cover
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const { toast } = useToast();

  const handlePrev = useCallback(() => {
    setCurrentSpread((s) => Math.max(0, s - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSpread((s) => Math.min(totalSpreads - 1, s + 1));
  }, [totalSpreads]);

  const handleGoToCover = useCallback(() => {
    setCurrentSpread(0);
  }, []);

  const handleDownloadPdf = useCallback(async () => {
    setIsGeneratingPdf(true);
    toast({ title: "Generating PDF...", description: "This may take a moment." });
    try {
      const { generateBookPdf } = await import("@/lib/pdfGenerator");
      await generateBookPdf();
      toast({ title: "PDF Downloaded!", description: "Your book has been saved." });
    } catch (err) {
      console.error("PDF generation error:", err);
      toast({ title: "PDF Error", description: "Failed to generate PDF.", variant: "destructive" });
    } finally {
      setIsGeneratingPdf(false);
    }
  }, [toast]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    },
    [handlePrev, handleNext]
  );

  const renderCurrentView = () => {
    if (currentSpread === 0) return <BookCover />;
    if (currentSpread === 1) return <TitlePage />;
    if (currentSpread === totalSpreads - 1) return <BackCover />;
    const spreadIndex = currentSpread - 2;
    const spread = spreads[spreadIndex];
    if (!spread) return null;

    // Check if this spread starts a new section
    const leftSection = spread.left.section;
    const prevSpread = spreadIndex > 0 ? spreads[spreadIndex - 1] : null;
    const isNewSection = spreadIndex === 0 || (prevSpread && prevSpread.right.section !== leftSection);

    return (
      <BookSpread
        left={spread.left}
        right={spread.right}
        spreadIndex={spreadIndex}
        sectionTitle={isNewSection ? getSectionTitle(leftSection) : undefined}
      />
    );
  };

  const getSectionTitle = (section: string) => {
    const s = BOOK_META.sections.find(sec => sec.id === section);
    return s ? s.title : undefined;
  };

  return (
    <div className="flex flex-col h-screen bg-background" onKeyDown={handleKeyDown} tabIndex={0}>
      <header className="flex items-center justify-center px-4 py-2 border-b border-border bg-card">
        <button
          onClick={handleGoToCover}
          className="font-display text-sm md:text-base text-foreground truncate hover:text-accent transition-colors cursor-pointer bg-transparent border-none"
        >
          {BOOK_META.title} — <span className="italic text-accent">{BOOK_META.subtitle}</span>
        </button>
      </header>
      <div className="flex-1 flex items-center justify-center p-2 md:p-6 overflow-hidden">
        <div
          className="w-full max-w-6xl rounded-lg overflow-hidden shadow-xl border border-border/50"
          style={{
            aspectRatio: "16 / 10",
            maxHeight: "calc(100vh - 120px)",
            boxShadow: "0 20px 60px hsl(var(--book-shadow) / 0.2)",
          }}
        >
          {renderCurrentView()}
        </div>
      </div>
      <BookNavigation
        currentSpread={currentSpread}
        totalSpreads={totalSpreads}
        onPrev={handlePrev}
        onNext={handleNext}
        onGoToCover={handleGoToCover}
        onDownloadPdf={handleDownloadPdf}
        isGeneratingPdf={isGeneratingPdf}
      />
    </div>
  );
};

export default BookViewer;
