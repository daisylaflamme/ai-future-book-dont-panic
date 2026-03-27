import { BOOK_META } from "@/data/bookData";

interface BookCoverProps {
  coverImage?: string;
}

const BookCover = ({ coverImage }: BookCoverProps) => {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg shadow-2xl"
      style={{
        background: "linear-gradient(135deg, hsl(220 30% 12%) 0%, hsl(220 25% 20%) 40%, hsl(38 60% 35%) 100%)",
        minHeight: "70vh",
      }}
    >
      {coverImage && (
        <img
          src={coverImage}
          alt="Book Cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(15,18,30,0.85) 0%, rgba(15,18,30,0.4) 40%, rgba(15,18,30,0.2) 60%, rgba(15,18,30,0.6) 100%)",
        }}
      />

      <div className="relative z-10 text-center px-8 py-12 max-w-2xl">
        <h1
          className="font-display text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4"
          style={{ color: "hsl(40 30% 95%)", textShadow: "0 2px 20px rgba(0,0,0,0.7)" }}
        >
          {BOOK_META.title}
        </h1>
        <p
          className="font-display text-lg md:text-xl lg:text-2xl italic mb-6"
          style={{ color: "hsl(38 70% 65%)", textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
        >
          — {BOOK_META.subtitle}
        </p>
        <div className="w-24 h-0.5 mx-auto mb-6" style={{ background: "hsl(38 70% 55%)" }} />
        <p
          className="font-body text-sm md:text-base mb-3"
          style={{ color: "hsl(40 20% 85%)", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
        >
          {BOOK_META.fullSubtitle}
        </p>
        <p
          className="font-ui text-xs md:text-sm tracking-wider uppercase mt-8"
          style={{ color: "hsl(38 60% 70%)", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
        >
          {BOOK_META.author}
        </p>
      </div>
    </div>
  );
};

export default BookCover;
