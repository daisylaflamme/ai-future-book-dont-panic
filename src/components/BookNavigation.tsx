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
    if (currentSpread === 0) return "Front Cover";
    if (currentSpread === 1) return "Title Page";
    if (currentSpread === 2) return "Contents";
    if (currentSpread === totalSpreads - 1) return "Back Cover";
    return `Spread ${currentSpread - 2} of ${totalSpreads - 4}`;
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-card border-t border-border">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onGoToCover}
          disabled={currentSpread === 0}
          className="font-ui gap-1"
          title="Go to Cover"
        >
          <Home className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onGoToContents}
          disabled={currentSpread === 2}
          className="font-ui gap-1"
          title="Go to Contents"
        >
          <List className="w-4 h-4" />
        </Button>
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
      </div>

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
