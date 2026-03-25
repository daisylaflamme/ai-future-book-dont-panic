import { BOOK_META } from "@/data/bookData";

interface BookCoverProps {
  coverImage?: string;
}

const BookCover = ({ coverImage }: BookCoverProps) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg shadow-2xl"
      style={{
        background: "linear-gradient(135deg, hsl(220 30% 12%) 0%, hsl(220 25% 20%) 40%, hsl(38 60% 35%) 100%)",
        minHeight: "70vh",
      }}
    >
      {coverImage ? (
        <img
          src={coverImage}
          alt="Book Cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(circle at 30% 50%, hsl(200 60% 40% / 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 50%, hsl(38 70% 50% / 0.3) 0%, transparent 50%)",
          }}
        />
      )}

      <div className="relative z-10 text-center px-8 py-12 max-w-2xl">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
          style={{ color: "hsl(40 30% 92%)", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
        >
          {BOOK_META.title}
        </h1>
        <p className="font-display text-xl md:text-2xl lg:text-3xl italic mb-6"
          style={{ color: "hsl(38 70% 65%)", textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}
        >
          — {BOOK_META.subtitle}
        </p>
        <div className="w-24 h-0.5 mx-auto mb-6" style={{ background: "hsl(38 70% 55%)" }} />
        <p className="font-body text-base md:text-lg mb-3"
          style={{ color: "hsl(40 20% 80%)" }}
        >
          {BOOK_META.fullSubtitle}
        </p>
        <p className="font-ui text-sm md:text-base tracking-wider uppercase mt-8"
          style={{ color: "hsl(38 60% 70%)" }}
        >
          {BOOK_META.author}
        </p>
      </div>
    </div>
  );
};

export default BookCover;
