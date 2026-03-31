import { useState, useCallback, useMemo } from "react";
import BookCover from "./BookCover";
import TitlePage from "./TitlePage";
import ContentsPage from "./ContentsPage";
import BackCover from "./BackCover";
import BookSpread from "./BookSpread";
import SingleStoryPage from "./SingleStoryPage";
import BookNavigation from "./BookNavigation";
import { getSpreadPages, stories, BOOK_META } from "@/data/bookData";
import { storyImages, coverImage } from "@/data/bookImages";
import { useToast } from "@/hooks/use-toast";
import { useSwipe } from "@/hooks/use-swipe";
import { useLayoutMode } from "@/hooks/use-layout-mode";

const BookViewer = () => {
  useMemo(() => {
    stories.forEach((story) => {
      if (storyImages[story.id]) {
        story.imageUrl = storyImages[story.id];
      }
    });
  }, []);

  const layoutMode = useLayoutMode();
  const spreads = getSpreadPages();

  // In spread mode: cover, title, contents, spreads..., back-cover
  // In single mode: cover, title, contents, story1, story2, ..., back-cover
  const totalPages = layoutMode === "spread"
    ? 3 + spreads.length + 1
    : 3 + stories.length + 1;

  const [currentPage, setCurrentPage] = useState(0);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const { toast } = useToast();

  const handlePrev = useCallback(() => {
    setCurrentPage((s) => Math.max(0, s - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((s) => Math.min(totalPages - 1, s + 1));
  }, [totalPages]);

  const handleGoToCover = useCallback(() => {
    setCurrentPage(0);
  }, []);

  const handleGoToContents = useCallback(() => {
    setCurrentPage(2);
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

  const handleNavigateToStory = useCallback((storyId: number) => {
    if (layoutMode === "spread") {
      const spreadIdx = spreads.findIndex(
        (sp) => sp.left.id === storyId || sp.right.id === storyId
      );
      if (spreadIdx >= 0) {
        setCurrentPage(spreadIdx + 3);
      }
    } else {
      const storyIdx = stories.findIndex((s) => s.id === storyId);
      if (storyIdx >= 0) {
        setCurrentPage(storyIdx + 3);
      }
    }
  }, [layoutMode, spreads]);

  const swipeHandlers = useSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev,
  });

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    },
    [handlePrev, handleNext]
  );

  const renderCurrentView = () => {
    if (currentPage === 0) return <BookCover />;
    if (currentPage === 1) return <TitlePage />;
    if (currentPage === 2) return <ContentsPage onNavigateToStory={handleNavigateToStory} />;
    if (currentPage === totalPages - 1) return <BackCover />;

    if (layoutMode === "spread") {
      const spreadIndex = currentPage - 3;
      const spread = spreads[spreadIndex];
      if (!spread) return null;

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
    } else {
      // Single page mode
      const storyIndex = currentPage - 3;
      const story = stories[storyIndex];
      if (!story) return null;
      return <SingleStoryPage story={story} pageIndex={storyIndex} />;
    }
  };

  const getSectionTitle = (section: string) => {
    const s = BOOK_META.sections.find(sec => sec.id === section);
    return s ? s.title : undefined;
  };

  const getLabel = () => {
    if (currentPage === 0) return "Cover";
    if (currentPage === 1) return "Title";
    if (currentPage === 2) return "Contents";
    if (currentPage === totalPages - 1) return "Back Cover";
    if (layoutMode === "spread") {
      return `${currentPage - 2} / ${totalPages - 4}`;
    }
    return `${currentPage - 2} / ${totalPages - 4}`;
  };

  return (
    <div
      className="flex flex-col h-[100dvh] bg-background touch-pan-y"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header */}
      <header className="flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 border-b border-border bg-card flex-shrink-0">
        <button
          onClick={handleGoToCover}
          className="font-display text-xs sm:text-sm md:text-base text-foreground truncate hover:text-accent transition-colors cursor-pointer bg-transparent border-none px-2 py-1"
        >
          {BOOK_META.title} — <span className="italic text-accent">{BOOK_META.subtitle}</span>
        </button>
      </header>

      {/* Book content area with swipe */}
      <div
        className="flex-1 flex items-center justify-center p-1.5 sm:p-2 md:p-6 overflow-hidden min-h-0"
        {...swipeHandlers}
      >
        <div
          className={`w-full rounded-lg overflow-hidden shadow-xl border border-border/50 ${
            layoutMode === "spread" ? "max-w-6xl" : "max-w-lg sm:max-w-xl md:max-w-2xl"
          }`}
          style={{
            aspectRatio: layoutMode === "spread" ? "16 / 10" : "3 / 4",
            maxHeight: "calc(100dvh - 100px)",
            boxShadow: "0 20px 60px hsl(var(--book-shadow) / 0.2)",
          }}
        >
          {renderCurrentView()}
        </div>
      </div>

      {/* Navigation */}
      <BookNavigation
        currentSpread={currentPage}
        totalSpreads={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
        onGoToCover={handleGoToCover}
        onGoToContents={handleGoToContents}
        onDownloadPdf={handleDownloadPdf}
        isGeneratingPdf={isGeneratingPdf}
      />
    </div>
  );
};

export default BookViewer;
