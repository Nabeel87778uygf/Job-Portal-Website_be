const stats = [
  { value: "10K+", label: "Active Jobs" },
  { value: "8K+", label: "Companies" },
  { value: "50K+", label: "Job Seekers" },
  { value: "95%", label: "Success Rate" },
];

const StatsSection = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-cta mb-2">{stat.value}</div>
              <div className="text-primary-foreground/70 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
