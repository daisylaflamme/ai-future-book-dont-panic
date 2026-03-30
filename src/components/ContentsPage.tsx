import { stories, BOOK_META } from "@/data/bookData";

interface ContentsPageProps {
  onNavigateToStory: (storyId: number) => void;
}

const ContentsPage = ({ onNavigateToStory }: ContentsPageProps) => {
  const sections = BOOK_META.sections;

  return (
    <div className="w-full h-full bg-book-page overflow-y-auto book-scrollbar">
      <div className="w-full max-w-xl mx-auto px-8 md:px-12 py-10 md:py-14">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-10 italic">
          Contents
        </h2>

        {sections.map((section) => {
          const sectionStories = stories.filter((s) => s.section === section.id);
          return (
            <div key={section.id} className="mb-6">
              <h3 className="font-display text-sm md:text-base font-semibold text-book-gold mb-4 tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-2 pl-4">
                {sectionStories.map((story) => (
                  <li key={story.id}>
                    <button
                      onClick={() => onNavigateToStory(story.id)}
                      className="w-full text-left flex items-baseline gap-3 group bg-transparent border-none cursor-pointer px-0 py-0.5 hover:opacity-80 transition-opacity"
                    >
                      <span className="font-body text-xs md:text-sm text-muted-foreground min-w-[1.5rem] text-right">
                        {story.id}.
                      </span>
                      <span className="font-body text-xs md:text-sm text-foreground group-hover:text-book-gold transition-colors">
                        {story.title}
                      </span>
                      <span className="flex-1 border-b border-dotted border-border/40 mb-1 min-w-[2rem]" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentsPage;
