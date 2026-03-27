import { BOOK_META } from "@/data/bookData";

interface BookCoverProps {
  coverImage?: string;
}

const BookCover = ({ coverImage }: BookCoverProps) => {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(220 30% 10%) 0%, hsl(220 25% 18%) 50%, hsl(38 50% 25%) 100%)",
      }}
    >
      {coverImage && (
        <img
          src={coverImage}
          alt="Book Cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Lighter gradient overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to top,
            hsl(228 45% 6% / 0.92) 0%,
            hsl(228 45% 6% / 0.7) 20%,
            hsl(228 45% 6% / 0.5) 40%,
            hsl(228 45% 6% / 0.55) 55%,
            hsl(228 45% 6% / 0.45) 70%,
            hsl(228 45% 6% / 0.65) 100%
          )`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-10 py-16 max-w-2xl w-full h-full">
        {/* Top spacer */}
        <div className="flex-1" />

        {/* Title — single combined line */}
        <h1
          className="font-display text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight tracking-tight"
          style={{
            color: "hsl(40 30% 95%)",
            textShadow: "0 3px 24px rgba(0,0,0,0.9), 0 6px 48px rgba(0,0,0,0.6)",
          }}
        >
          {BOOK_META.title} — {BOOK_META.subtitle}
        </h1>

        {/* Divider */}
        <div className="w-20 h-0.5 my-6" style={{ background: "hsl(38 70% 55%)" }} />

        {/* Subtitle */}
        <p
          className="font-display text-base md:text-lg lg:text-xl italic"
          style={{
            color: "hsl(38 70% 65%)",
            textShadow: "0 2px 12px rgba(0,0,0,0.8)",
          }}
        >
          {BOOK_META.fullSubtitle}
        </p>

        {/* Bottom spacer */}
        <div className="flex-1" />

        {/* Author at bottom */}
        <p
          className="font-ui text-xs md:text-sm tracking-widest uppercase"
          style={{
            color: "hsl(38 60% 70%)",
            textShadow: "0 1px 8px rgba(0,0,0,0.7)",
          }}
        >
          {BOOK_META.author}
        </p>
      </div>
    </div>
  );
};

export default BookCover;
