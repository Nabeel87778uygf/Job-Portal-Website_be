import { UserPlus, Search, FileText, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up in seconds and build your professional profile to stand out.",
  },
  {
    icon: Search,
    title: "Search Jobs",
    description: "Browse thousands of openings filtered by your preferences and skills.",
  },
  {
    icon: FileText,
    title: "Apply Easily",
    description: "Submit applications with one click using your saved resume and profile.",
  },
  {
    icon: PartyPopper,
    title: "Get Hired",
    description: "Connect with employers, ace interviews, and land your dream role.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">How It Works</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Four simple steps to your next career opportunity.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-border" />

          {steps.map((step, i) => (
            <div key={step.title} className="text-center relative">
              <div className="relative z-10 w-24 h-24 mx-auto rounded-3xl bg-accent/10 flex items-center justify-center mb-6 border-4 border-background">
                <step.icon className="h-10 w-10 text-accent" />
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-cta text-cta-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground max-w-[220px] mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
