import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeatureSection";
import OurMissionSection from "@/components/OurMissionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { gsap } from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


interface LandingpageProps {
  onSignIn: () => void;
}

const Landingpage = ({ onSignIn }: LandingpageProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.registerPlugin(ScrollSmoother); // ✅ register plugin first

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
    });

    return () => smoother.kill();
  }, []);

  const handleSignIn = () => {
    onSignIn();
    navigate("/dashboard");
  };

  return (
    <div id="smooth-wrapper" className="min-h-screen">
      <Header />
      <div id="smooth-content">
        <HeroSection />
        <FeaturesSection />
        <OurMissionSection />
        <TestimonialsSection />
        <Footer />
      </div>
    </div>
  );
};

export default Landingpage;
