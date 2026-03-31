import { BOOK_META } from "@/data/bookData";

interface BackCoverProps {
  coverImage?: string;
}

const BackCover = ({ coverImage }: BackCoverProps) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg"
      style={{
        background: "linear-gradient(135deg, hsl(220 25% 15%) 0%, hsl(220 20% 22%) 60%, hsl(38 40% 25%) 100%)",
      }}
    >
      {coverImage && (
        <img src={coverImage} alt="Back Cover" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      )}
      <div className="absolute inset-0 opacity-10"
        style={{ background: "radial-gradient(circle at 50% 30%, hsl(38 70% 50% / 0.2) 0%, transparent 60%)" }}
      />
      <div className="relative z-10 max-w-xl px-8 py-12 text-center">
        <div className="w-16 h-0.5 mx-auto mb-8" style={{ background: "hsl(38 70% 55%)" }} />
        {BOOK_META.backCoverText.split("\n\n").map((paragraph, i) => (
          <p key={i} className="font-body text-sm md:text-base leading-relaxed mb-4"
            style={{ color: "hsl(40 15% 78%)" }}
          >
            {paragraph}
          </p>
        ))}
        <div className="w-16 h-0.5 mx-auto mt-8 mb-6" style={{ background: "hsl(38 70% 55%)" }} />
        <p className="font-ui text-xs tracking-widest uppercase"
          style={{ color: "hsl(38 50% 60%)" }}
        >
          {BOOK_META.author}
        </p>
      </div>
    </div>
  );
};

export default BackCover;
