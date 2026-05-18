import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedJobs from "@/components/FeaturedJobs";
import Categories from "@/components/Categories";
import StatsSection from "@/components/StatsSection";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <HeroSection />

      <FeaturedJobs />

      <Categories />

      <StatsSection />

      <HowItWorks />

      <CTASection />

      <Footer />
    </div>
  );
};

export default Index;