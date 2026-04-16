import { useState } from "react";
import { Loader2 } from "lucide-react";

interface StoryImageProps {
  src: string;
  alt: string;
  onZoom?: () => void;
}

const StoryImage = ({ src, alt, onZoom }: StoryImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full cursor-zoom-in" onClick={onZoom}>
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted/40">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default StoryImage;
