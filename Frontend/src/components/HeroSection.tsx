import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import demoVideo from "../assets/demo.mp4";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return;
      const rect = videoRef.current.getBoundingClientRect();
      // If the video is out of view (scrolled past), pause it
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-32 overflow-hidden">
      {/* Background gradient - Blue gradient with neutral blending */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e40af] via-[#059669] to-[#10b981] opacity-90"></div>
      
      {/* Additional overlay for neutral blending with white and gray tones */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-800/20 via-transparent to-white/10"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-3xl opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="text-center space-y-16">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto space-y-10 mt-16">
            {/* Brand Name with Reveal Effect */}
            <div className="overflow-hidden">
              <h1 className={`text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-tight transition-all duration-1000 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}>
                ArthSaathi
              </h1>
            </div>
            
            {/* Tagline with Delayed Reveal */}
            <div className="overflow-hidden">
              <p className={`text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ease-out delay-300 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}>
                Smart Financial Planning for Middle-class Families
              </p>
            </div>

            {/* CTA Buttons with Staggered Animation */}
            <div className={`flex justify-center items-center transition-all duration-1000 ease-out delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}>
              <Button 
                size="lg" 
                className="bg-white text-[#456fe8] hover:bg-white/90 font-semibold px-12 py-6 text-xl rounded-xl hover:scale-105 transition-all duration-300 ease-out shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Product Mockup Video Section */}
          <div className={`max-w-5xl mx-auto transition-all duration-1000 ease-out delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}>
            <div className="relative">
              {/* Video Placeholder */}
              <div className="relative aspect-video bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-visible shadow-2xl">
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-contain rounded-2xl"
                  src={demoVideo}
                  controls
                  autoPlay
                  muted
                  poster="/video-poster.png" // Optional: placeholder image
                />
                {/* Optionally, keep overlay for fallback or remove below */}
                {/*
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                      <Play className="h-8 w-8 text-white ml-1" /> 
                    </div>
                    <p className="text-white/80 text-lg font-medium">Product Demo Video</p>
                    <p className="text-white/60 text-sm">See ArthSaathi in action</p>
                  </div>
                </div>
                */}
                
                {/* Simulated Interface Preview 
                <div className="absolute inset-4 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="text-white/60 text-xs">ArthSaathi Dashboard</div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-white/20 rounded w-3/4"></div>
                      <div className="h-2 bg-white/15 rounded w-1/2"></div>
                      <div className="h-2 bg-white/10 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>*/}
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-trust-navy">Savings: ₹2,45,000</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-center">
                  <div className="text-xl font-bold text-[#456fe8]">AI Score: 92</div>
                  <div className="text-xs text-muted-foreground">Financial Health</div>
                </div>
              </div>
            </div>
          </div>

         
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80 transition-all duration-1000 ease-out delay-1200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}>
           
            
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;