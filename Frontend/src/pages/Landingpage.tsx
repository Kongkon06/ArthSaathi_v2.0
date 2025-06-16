import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeatureSection";
import OurMissionSection from "@/components/OurMissionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";


interface LandingpageProps {
  onSignIn: () => void;
}

const Landingpage = ({ onSignIn }: LandingpageProps) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    onSignIn(); // Update authentication state
    navigate('/dashboard'); // Navigate to dashboard
  };

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <OurMissionSection />
      <TestimonialsSection />
      {/* <div className="flex justify-center my-8">
        <button
          onClick={handleSignIn}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </div> */}
      <Footer />
    </div>
  );
};

export default Landingpage;