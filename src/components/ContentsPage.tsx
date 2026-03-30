import { stories, BOOK_META } from "@/data/bookData";
import pageBackground from "@/assets/page-background.png";

interface ContentsPageProps {
  onNavigateToStory: (storyId: number) => void;
}

const ContentsPage = ({ onNavigateToStory }: ContentsPageProps) => {
  const sections = BOOK_META.sections;
  const allSectionData = sections.map((section) => ({
    ...section,
    stories: stories.filter((s) => s.section === section.id),
  }));

  // Split: section 1 on left, sections 2 & 3 on right
  const leftSections = allSectionData.filter((s) => s.id === "near-future");
  const rightSections = allSectionData.filter((s) => s.id !== "near-future");

  const renderSection = (section: typeof allSectionData[0]) => (
    <div key={section.id} className="mb-5">
      <h3
        className="font-display text-[0.7rem] md:text-xs font-semibold mb-2.5 tracking-wide"
        style={{ color: "hsl(var(--book-gold))" }}
      >
        {section.title}
      </h3>
      <ul className="space-y-1 pl-2">
        {section.stories.map((story) => (
          <li key={story.id}>
            <button
              onClick={() => onNavigateToStory(story.id)}
              className="w-full text-left flex items-baseline gap-2 group bg-transparent border-none cursor-pointer px-0 py-px hover:opacity-80 transition-opacity"
            >
              <span className="font-body text-[0.6rem] md:text-[0.7rem] text-muted-foreground min-w-[1.2rem] text-right">
                {story.id}.
              </span>
              <span className="font-body text-[0.6rem] md:text-[0.7rem] text-foreground group-hover:text-book-gold transition-colors">
                {story.title}
              </span>
              <span className="flex-1 border-b border-dotted border-border/40 mb-0.5 min-w-[1rem]" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderPage = (
    side: "left" | "right",
    sectionList: typeof allSectionData,
    showTitle: boolean
  ) => (
    <div
      className={`relative flex h-full min-h-0 flex-col p-5 md:p-7 lg:p-8 ${
        side === "left" ? "border-r border-border/20" : ""
      }`}
      style={{
        backgroundImage: `url(${pageBackground})`,
        backgroundSize: "cover",
        backgroundPosition: side === "left" ? "left center" : "right center",
      }}
    >
      <div
        className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden rounded-lg border border-border/65 bg-background/20 p-4 md:p-5"
        style={{
          boxShadow:
            "0 2px 12px hsl(var(--book-shadow) / 0.08), inset 0 -1px 0 hsl(var(--border) / 0.7), inset 0 0 0 0.5px hsl(var(--background) / 0.6)",
        }}
      >
        {/* Scrollable content */}
        <div className="book-scrollbar min-h-0 flex-1 overflow-y-auto pr-1">
          {showTitle && (
            <h2 className="font-display text-lg md:text-xl font-bold text-foreground text-center mb-6 italic">
              Contents
            </h2>
          )}
          {sectionList.map(renderSection)}
        </div>

        {/* Bottom decorative divider */}
        <div className="flex min-h-[24px] flex-shrink-0 items-center justify-center gap-2 pt-2">
          <div
            className="h-[2px] w-12"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(var(--book-gold) / 0.9), hsl(var(--book-gold)))",
            }}
          />
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: "hsl(var(--book-gold))" }}
          />
          <div
            className="h-[2px] w-12"
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--book-gold)), hsl(var(--book-gold) / 0.9), transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative grid h-full min-h-0 w-full grid-cols-1 grid-rows-1 items-stretch md:grid-cols-2">
      {renderPage("left", leftSections, true)}

      {/* Book spine */}
      <div
        className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, hsl(var(--book-spine)) 10%, hsl(var(--book-spine)) 90%, transparent)",
          boxShadow:
            "-2px 0 8px hsl(var(--book-shadow) / 0.1), 2px 0 8px hsl(var(--book-shadow) / 0.1)",
        }}
      />

      {renderPage("right", rightSections, false)}
    </div>
  );
};

export default ContentsPage;
