import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookNavigationProps {
  currentSpread: number;
  totalSpreads: number;
  onPrev: () => void;
  onNext: () => void;
  onDownloadPdf: () => void;
  isGeneratingPdf: boolean;
}

const BookNavigation = ({
  currentSpread,
  totalSpreads,
  onPrev,
  onNext,
  onDownloadPdf,
  isGeneratingPdf,
}: BookNavigationProps) => {
  // spread 0 = cover, 1 = title, 2..26 = stories (25 spreads), 27 = back cover
  const getLabel = () => {
    if (currentSpread === 0) return "Front Cover";
    if (currentSpread === 1) return "Title Page";
    if (currentSpread === totalSpreads - 1) return "Back Cover";
    return `Spread ${currentSpread - 1} of ${totalSpreads - 3}`;
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-card border-t border-border">
      <Button
        variant="ghost"
        size="sm"
        onClick={onPrev}
        disabled={currentSpread === 0}
        className="font-ui gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      <div className="flex items-center gap-4">
        <span className="font-ui text-xs text-muted-foreground">
          {getLabel()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={onDownloadPdf}
          disabled={isGeneratingPdf}
          className="font-ui gap-1"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">
            {isGeneratingPdf ? "Generating..." : "Download PDF"}
          </span>
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onNext}
        disabled={currentSpread === totalSpreads - 1}
        className="font-ui gap-1"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default BookNavigation;
