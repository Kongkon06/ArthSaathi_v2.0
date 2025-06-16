import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Mother of 2",
      location: "San Francisco, CA",
      rating: 5,
      quote: "FamilyFinance transformed how we think about money. The AI assistant helped us save $2,400 in our first month, and my kids are finally learning about budgeting through the interactive lessons.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      avatarBg: "bg-gradient-to-br from-blue-400 to-indigo-500"
    },
    {
      name: "Marcus Johnson",
      role: "Father of 3",
      location: "Austin, TX",
      rating: 5,
      quote: "The investment recommendations are spot-on. We've seen a 12% return in 6 months, and the family collaboration features have made financial planning a fun activity for everyone.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      avatarBg: "bg-gradient-to-br from-purple-400 to-pink-500"
    },
    {
      name: "Emily Rodriguez",
      role: "Single Parent",
      location: "Miami, FL",
      rating: 5,
      quote: "As a single mom, I needed something simple but powerful. The smart savings analytics showed me where I was overspending, and now I'm on track to buy our first home.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      avatarBg: "bg-gradient-to-br from-green-400 to-emerald-500"
    },
    {
      name: "David Kim",
      role: "Tech Professional",
      location: "Seattle, WA",
      rating: 5,
      quote: "The automated savings features and detailed analytics give me complete control over our family's financial future. It's like having a personal financial advisor available 24/7.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
      avatarBg: "bg-gradient-to-br from-orange-400 to-amber-500"
    },
    {
      name: "Lisa Thompson",
      role: "Small Business Owner",
      location: "Denver, CO",
      rating: 5,
      quote: "Managing both business and family finances was overwhelming until FamilyFinance. The intelligent categorization and forecasting have been game-changers for our planning.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
      bgColor: "bg-gradient-to-br from-teal-50 to-cyan-50",
      avatarBg: "bg-gradient-to-br from-teal-400 to-cyan-500"
    },
    {
      name: "Robert Martinez",
      role: "Father of 4",
      location: "Phoenix, AZ",
      rating: 5,
      quote: "With four kids, budgeting felt impossible. FamilyFinance's family-focused tools helped us organize everything and even start college savings funds for each child.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      bgColor: "bg-gradient-to-br from-rose-50 to-red-50",
      avatarBg: "bg-gradient-to-br from-rose-400 to-red-500"
    }
  ];

  const partners = [
    { name: "JPMorgan Chase", logo: "JP", color: "from-blue-500 to-blue-600" },
    { name: "Wells Fargo", logo: "WF", color: "from-red-500 to-red-600" },
    { name: "Bank of America", logo: "BA", color: "from-blue-600 to-indigo-600" },
    { name: "Goldman Sachs", logo: "GS", color: "from-gray-700 to-gray-800" },
    { name: "Vanguard", logo: "VG", color: "from-red-600 to-red-700" },
    { name: "Fidelity", logo: "FD", color: "from-green-600 to-green-700" }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Header */}
        <div className={`text-center max-w-4xl mx-auto mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-block mb-4">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Our happy clients say about us
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Trusted by families 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600"> nationwide</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Generative business intelligence drives efficiencies throughout your operations. From 
            forecasting revenue to analyzing marketing attribution, we give you insights so you 
            can make better decisions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="group border-0 shadow-sm hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-2 overflow-hidden">
                <CardContent className="p-8 h-full flex flex-col">
                  {/* Quote */}
                  <div className="flex-1 mb-6">
                    <p className="text-gray-700 leading-relaxed text-sm mb-4 line-clamp-4">
                      {testimonial.quote}
                    </p>
                  </div>
                  
                  {/* Profile */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full ${testimonial.avatarBg} p-0.5 shadow-lg`}>
                        <img 
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                      <div className="text-xs text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </Card>
            </div>
          ))}
        </div>

        {/* Partner Logos */}
        <div className={`text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          <p className="text-gray-500 mb-12 text-lg">Partnered with leading financial institutions</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="group relative transition-all duration-300 hover:scale-110"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${partner.color} rounded-2xl shadow-lg flex items-center justify-center font-bold text-white border-0 hover:shadow-xl transition-all duration-300 group-hover:rotate-3`}>
                  {partner.logo}
                </div>
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;