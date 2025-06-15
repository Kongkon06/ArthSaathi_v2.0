import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeatureSection";
import OurMissionSection from "@/components/OurMissionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <OurMissionSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;