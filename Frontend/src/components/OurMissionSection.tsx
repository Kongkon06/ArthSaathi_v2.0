import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronRight,
  TrendingUp,
  BookOpen,
  Target,
  BarChart3,
  Users
} from "lucide-react";

const OurMissionSection = () => {
  const stats = [
    {
      value: "65%",
      label: "Reduction in financial stress",
      color: "text-family-blue"
    },
    {
      value: "40%", 
      label: "Increase in savings rate",
      color: "text-family-blue"
    },
    {
      value: "3x",
      label: "Financial literacy improvement", 
      color: "text-family-blue"
    },
    {
      value: "85%",
      label: "User satisfaction",
      color: "text-family-blue"
    }
  ];

  const features = [
    {
      title: "Comprehensive financial education modules",
      icon: BookOpen
    },
    {
      title: "Data-driven personalized recommendations", 
      icon: BarChart3
    },
    {
      title: "Goal-based savings and investment planning",
      icon: Target
    },
    {
      title: "Interactive budgeting and expense tracking",
      icon: TrendingUp
    },
    {
      title: "Family-focused financial wellness metrics",
      icon: Users
    }
  ];

  return (
    <section id="OurMission" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-family-blue/10 text-family-blue px-6 py-3 rounded-full text-sm font-semibold mb-8">
            Our Mission
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-trust-navy mb-8">
            Addressing Financial Challenges
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Our platform is designed to address the unique financial challenges faced by middle-class 
            families today, providing tools and resources that promote financial well-being and stability.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 border-0 bg-gray-50 hover:bg-white hover:-translate-y-1"
            >
              <CardContent className="p-8 text-center">
                <div className={`text-4xl md:text-5xl font-display font-bold mb-4 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-family-blue mb-6">
                Improving Financial Resilience
              </h3>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Our platform has been developed in consultation with financial experts, economists, and family 
                  counselors to address the specific needs of middle-class households.
                </p>
                <p>
                  By combining education, practical tools, and personalized insights, we're helping families build 
                  financial resilience and work toward long-term prosperity.
                </p>
              </div>
            </div>
          </div>

          {/* Right Features List */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-family-blue/10 rounded-lg flex items-center justify-center group-hover:bg-family-blue group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-family-blue group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-trust-navy group-hover:text-family-blue transition-colors duration-300">
                    {feature.title}
                  </h4>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-family-blue group-hover:translate-x-1 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMissionSection;