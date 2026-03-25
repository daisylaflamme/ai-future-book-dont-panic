import { BOOK_META } from "@/data/bookData";

const TitlePage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-book-page p-8 md:p-16">
      <div className="text-center max-w-lg">
        <div className="w-16 h-0.5 mx-auto mb-12 bg-book-gold" />
        <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
          {BOOK_META.title}
        </h1>
        <p className="font-display text-lg md:text-xl italic text-book-gold mb-8">
          — {BOOK_META.subtitle}
        </p>
        <p className="font-body text-sm md:text-base text-muted-foreground mb-12">
          {BOOK_META.fullSubtitle}
        </p>
        <div className="w-8 h-0.5 mx-auto mb-12 bg-border" />
        <p className="font-ui text-xs md:text-sm tracking-widest uppercase text-muted-foreground">
          Written by
        </p>
        <p className="font-display text-base md:text-lg text-foreground mt-2">
          {BOOK_META.authorLong}
        </p>
        <div className="w-16 h-0.5 mx-auto mt-12 bg-book-gold" />
      </div>
    </div>
  );
};

export default TitlePage;
