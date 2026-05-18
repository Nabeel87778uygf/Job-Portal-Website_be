import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CityFilter from '../components/CityFilter'

const HeroSection = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (customKeyword?: string) => {
    const searchKey = customKeyword ?? keyword;

    if (!searchKey && !location) return;

    try {
      setLoading(true);

      navigate(
        `/jobs?keyword=${searchKey}&location=${location}`
      );

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTagClick = (tag) => {
    setKeyword(tag);
    handleSearch(tag);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">


      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)", opacity: 0.92 }}
      />


      <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">

          <span className="inline-block bg-cta/20 text-cta px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            10,000+ Jobs Available
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
            Find Your <span className="text-cta">Dream Job</span> Today
          </h1>

          <p className="text-primary-foreground/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Connect with top companies and discover opportunities that match your skills, experience, and career goals.
          </p>


          <div className="bg-card/10 backdrop-blur-md rounded-2xl p-2 md:p-3 border border-primary-foreground/10">

            <div className="flex flex-col md:flex-row gap-2 md:gap-3">


              <div className="flex-1 flex items-center gap-3 bg-background rounded-xl px-4 py-3">
                <Search className="h-5 w-5 text-muted-foreground shrink-0" />

                <input
                  type="text"
                  placeholder="Job title, keyword, or company"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
                />
              </div>


              <div className="flex-1 flex items-center gap-3 bg-background rounded-xl px-4 py-3">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />

                <CityFilter
                  location={location}
                  setLocation={setLocation}
                />
              </div>


              <Button
                variant="hero"
                size="lg"
                onClick={() => handleSearch()}
                disabled={loading}
                className="rounded-xl px-8"
              >
                {loading ? "Searching..." : "Search Jobs"}
              </Button>

            </div>
          </div>


          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">

            <span className="text-primary-foreground/50">Popular:</span>

            {[
              "Frontend Developer",
              "Product Manager",
              "UX Designer",
              "Data Analyst"
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="text-primary-foreground/70 hover:text-cta transition-colors underline underline-offset-4 decoration-primary-foreground/20 hover:decoration-cta"
              >
                {tag}
              </button>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;