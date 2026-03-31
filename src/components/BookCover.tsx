import appCover from "@/assets/app-cover.png";
import mobileCover from "@/assets/mobile-cover.png";
import { useLayoutMode } from "@/hooks/use-layout-mode";

const BookCover = () => {
  const layoutMode = useLayoutMode();
  const coverSrc = layoutMode === "single" ? mobileCover : appCover;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <img
        src={coverSrc}
        alt="Book Cover"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default BookCover;
