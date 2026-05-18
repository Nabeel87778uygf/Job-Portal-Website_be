import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {

  const navigate = useNavigate();

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="bg-card rounded-3xl border border-border p-10 md:p-16 text-center max-w-4xl mx-auto shadow-[var(--shadow-card)]">

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Take the Next Step?
          </h2>

          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Join thousands of professionals who found their perfect role through JobFlow.
            Your next opportunity is just a click away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            {/* Job Seeker */}
            <Button
              variant="cta"
              size="lg"
              className="rounded-xl text-base"
              onClick={() => navigate("/register")}
            >
              Get Started Free
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>

            {/* Employer */}
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl text-base"
              onClick={() => navigate("/register")}
            >
              For Employers
            </Button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;