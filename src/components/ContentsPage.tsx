import { stories, BOOK_META } from "@/data/bookData";

interface ContentsPageProps {
  onNavigateToStory: (storyId: number) => void;
}

const ContentsPage = ({ onNavigateToStory }: ContentsPageProps) => {
  const sections = BOOK_META.sections;

  return (
    <div className="w-full h-full flex items-center justify-center bg-book-page p-8 md:p-12 overflow-y-auto">
      <div className="w-full max-w-lg">
        <div className="w-16 h-0.5 mx-auto mb-8 bg-book-gold" />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          Contents
        </h2>

        {sections.map((section) => {
          const sectionStories = stories.filter((s) => s.section === section.id);
          return (
            <div key={section.id} className="mb-8">
              <h3 className="font-display text-sm md:text-base font-semibold text-book-gold mb-3 tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-1.5">
                {sectionStories.map((story) => (
                  <li key={story.id}>
                    <button
                      onClick={() => onNavigateToStory(story.id)}
                      className="w-full text-left flex items-baseline gap-2 group bg-transparent border-none cursor-pointer px-0 py-0.5 hover:opacity-80 transition-opacity"
                    >
                      <span className="font-body text-xs md:text-sm text-muted-foreground min-w-[1.5rem]">
                        {story.id}.
                      </span>
                      <span className="font-body text-xs md:text-sm text-foreground group-hover:text-book-gold transition-colors">
                        {story.title}
                      </span>
                      <span className="flex-1 border-b border-dotted border-border/50 mb-1 min-w-[1rem]" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <div className="w-16 h-0.5 mx-auto mt-8 bg-book-gold" />
      </div>
    </div>
  );
};

export default ContentsPage;
