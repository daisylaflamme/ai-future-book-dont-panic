import { ChevronLeft, ChevronRight, Download, Home, List } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookNavigationProps {
  currentSpread: number;
  totalSpreads: number;
  onPrev: () => void;
  onNext: () => void;
  onGoToCover: () => void;
  onGoToContents: () => void;
  onDownloadPdf: () => void;
  isGeneratingPdf: boolean;
}

const BookNavigation = ({
  currentSpread,
  totalSpreads,
  onPrev,
  onNext,
  onGoToCover,
  onGoToContents,
  onDownloadPdf,
  isGeneratingPdf,
}: BookNavigationProps) => {
  const getLabel = () => {
    if (currentSpread === 0) return "Cover";
    if (currentSpread === 1) return "Title";
    if (currentSpread === 2) return "Contents";
    if (currentSpread === totalSpreads - 1) return "Back Cover";
    return `${currentSpread - 2} / ${totalSpreads - 4}`;
  };

  return (
    <div className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 bg-card border-t border-border flex-shrink-0 safe-area-bottom">
      <div className="flex items-center gap-0.5 sm:gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onGoToCover}
          disabled={currentSpread === 0}
          className="font-ui gap-1 min-w-[44px] min-h-[44px] p-2"
          title="Go to Cover"
        >
          <Home className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onGoToContents}
          disabled={currentSpread === 2}
          className="font-ui gap-1 min-w-[44px] min-h-[44px] p-2"
          title="Go to Contents"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onPrev}
          disabled={currentSpread === 0}
          className="font-ui gap-1 min-w-[44px] min-h-[44px] p-2"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline text-xs">Prev</span>
        </Button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <span className="font-ui text-[10px] sm:text-xs text-muted-foreground">
          {getLabel()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={onDownloadPdf}
          disabled={isGeneratingPdf}
          className="font-ui gap-1 min-w-[44px] min-h-[44px] p-2 text-xs"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">
            {isGeneratingPdf ? "Generating..." : "PDF"}
          </span>
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onNext}
        disabled={currentSpread === totalSpreads - 1}
        className="font-ui gap-1 min-w-[44px] min-h-[44px] p-2"
      >
        <span className="hidden sm:inline text-xs">Next</span>
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default BookNavigation;
