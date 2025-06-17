import { useEffect } from "react";
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

const Landingpage = () => {

  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
    });

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!target) return;

      const hash = target.getAttribute("href");
      if (!hash || hash === "#") return;

      const el = document.querySelector(hash);
      if (el) {
        e.preventDefault();
        smoother.scrollTo(el, true); // true = smooth scroll
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      smoother.kill();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <div id="smooth-wrapper" className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <Header />
      </div>
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
