interface SectionDividerProps {
  title: string;
  subtitle?: string;
}

const SectionDivider = ({ title, subtitle }: SectionDividerProps) => {
  return (
    <div
      className="w-full h-full flex items-center justify-center p-8 md:p-16"
      style={{
        background: "linear-gradient(135deg, hsl(220 30% 12%) 0%, hsl(220 25% 20%) 50%, hsl(38 40% 30%) 100%)",
      }}
    >
      <div className="text-center max-w-lg">
        <div className="w-16 h-0.5 mx-auto mb-8" style={{ background: "hsl(38 70% 55%)" }} />
        <h2
          className="font-display text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-4"
          style={{ color: "hsl(40 30% 92%)" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="font-body text-sm md:text-base" style={{ color: "hsl(38 60% 70%)" }}>
            {subtitle}
          </p>
        )}
        <div className="w-16 h-0.5 mx-auto mt-8" style={{ background: "hsl(38 70% 55%)" }} />
      </div>
    </div>
  );
};

export default SectionDivider;
