import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Mother of 2",
      location: "San Francisco, CA",
      rating: 5,
      quote: "FamilyFinance transformed how we think about money. The AI assistant helped us save $2,400 in our first month, and my kids are finally learning about budgeting through the interactive lessons.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Marcus Johnson",
      role: "Father of 3",
      location: "Austin, TX",
      rating: 5,
      quote: "The investment recommendations are spot-on. We've seen a 12% return in 6 months, and the family collaboration features have made financial planning a fun activity for everyone.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Single Parent",
      location: "Miami, FL",
      rating: 5,
      quote: "As a single mom, I needed something simple but powerful. The smart savings analytics showed me where I was overspending, and now I'm on track to buy our first home.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const partners = [
    { name: "JPMorgan Chase", logo: "JP" },
    { name: "Wells Fargo", logo: "WF" },
    { name: "Bank of America", logo: "BA" },
    { name: "Goldman Sachs", logo: "GS" },
    { name: "Vanguard", logo: "VG" },
    { name: "Fidelity", logo: "FD" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Testimonials */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-trust-navy mb-6">
            Trusted by families 
            <span className="text-primary"> nationwide</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            See how FamilyFinance is helping real families achieve their financial goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-trust-navy">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partner Logos */}
        <div className="text-center">
          <p className="text-muted-foreground mb-8">Partnered with leading financial institutions</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold text-trust-navy border hover:shadow-md transition-shadow duration-200"
              >
                {partner.logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
