import { useState, useCallback } from "react";
import BookCover from "./BookCover";
import TitlePage from "./TitlePage";
import BackCover from "./BackCover";
import BookSpread from "./BookSpread";
import BookNavigation from "./BookNavigation";
import { getSpreadPages, BOOK_META } from "@/data/bookData";
import { useToast } from "@/hooks/use-toast";

const BookViewer = () => {
  const spreads = getSpreadPages();
  // 0=cover, 1=title, 2..26=story spreads, 27=back cover
  const totalSpreads = 2 + spreads.length + 1;
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const { toast } = useToast();

  const handlePrev = useCallback(() => {
    setCurrentSpread((s) => Math.max(0, s - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSpread((s) => Math.min(totalSpreads - 1, s + 1));
  }, [totalSpreads]);

  const handleDownloadPdf = useCallback(async () => {
    setIsGeneratingPdf(true);
    toast({ title: "Generating PDF...", description: "This may take a moment." });

    try {
      const { generateBookPdf } = await import("@/lib/pdfGenerator");
      await generateBookPdf();
      toast({ title: "PDF Downloaded!", description: "Your book has been saved." });
    } catch (err) {
      console.error("PDF generation error:", err);
      toast({
        title: "PDF Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  }, [toast]);

  // Keyboard navigation
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

    return (
      <BookSpread
        left={spread.left}
        right={spread.right}
        spreadIndex={spreadIndex}
      />
    );
  };

  return (
    <div
      className="flex flex-col h-screen bg-background"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header */}
      <header className="flex items-center justify-center px-4 py-2 border-b border-border bg-card">
        <h1 className="font-display text-sm md:text-base text-foreground truncate">
          {BOOK_META.title} — <span className="italic text-book-gold">{BOOK_META.subtitle}</span>
        </h1>
      </header>

      {/* Book content area */}
      <div className="flex-1 flex items-center justify-center p-2 md:p-6 overflow-hidden">
        <div
          className="w-full max-w-6xl rounded-lg overflow-hidden shadow-xl border border-border/50"
          style={{
            aspectRatio: "16 / 10",
            maxHeight: "calc(100vh - 120px)",
            boxShadow: "0 20px 60px hsl(var(--book-shadow) / 0.2), 0 4px 20px hsl(var(--book-shadow) / 0.1)",
          }}
        >
          {renderCurrentView()}
        </div>
      </div>

      {/* Navigation */}
      <BookNavigation
        currentSpread={currentSpread}
        totalSpreads={totalSpreads}
        onPrev={handlePrev}
        onNext={handleNext}
        onDownloadPdf={handleDownloadPdf}
        isGeneratingPdf={isGeneratingPdf}
      />
    </div>
  );
};

export default BookViewer;
