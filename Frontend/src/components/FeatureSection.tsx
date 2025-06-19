import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Zap,
  Plus,
  Target,
  BookOpen,
  Circle,
  TrendingUp,
  Brain,
  DollarSign,
  PieChart,
  GraduationCap,
  Users,
  BarChart3
} from "lucide-react";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-300/10 text-blue-500 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Features
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-trust-navy mb-6">
            Exploring the Comprehensive Set of{" "}
            <span className="text-blue-400">Advanced Features</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            A Deep Dive into the Tools and Insights that Will Revolutionize Your Financial Management, 
            Enabling Informed Decision-Making and Empowering Financial Success
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          {/* AI Investment Strategies - Large Card */}
          <Card className="lg:col-span-5 group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden hover:-translate-y-1">
            <CardContent className="p-8 h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-trust-navy">
                    AI Investment Strategies
                  </h3>
                </div>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                 Personalized investment recommendations tailored to your family's goals, risk tolerance, and timeline.
                </p>
                
                {/* AI Investment Recommendations */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <h4 className="font-semibold text-trust-navy">Investment Recommendations</h4>
                      <div className="ml-auto bg-blue-400 text-white rounded-full w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">AI-powered suggestions based on your profile</p>
                  </div>
                  
                  {/* Investment Strategy Card */}
                  <div className="relative group-hover:scale-105 transition-transform duration-500">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-2">
                          <PieChart className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold text-trust-navy">Conservative Portfolio</span>
                        </div>
                        <div className="text-green-600 font-semibold text-sm">+8.2% Expected</div>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Bonds</span>
                          <span className="text-sm font-medium">60%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Stocks</span>
                          <span className="text-sm font-medium">30%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">REITs</span>
                          <span className="text-sm font-medium">10%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-500 mb-1">Risk Level: Low</div>
                        <div className="text-sm font-semibold text-trust-navy">Perfect for Family Goals</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Education Hub - Large Card */}
          <Card className="lg:col-span-7 group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden hover:-translate-y-1">
            <CardContent className="p-8 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-2xl font-display font-bold text-trust-navy">
                  Financial Education Hub
                </h3>
              </div>
              <p className="text-muted-foreground mb-8 leading-relaxed">
               Interactive lessons, articles, and videos designed for both parents and children.
              </p>
              
              {/* Education Content Grid */}
              <div className="bg-gray-50 rounded-xl p-6 group-hover:bg-gray-100 transition-colors duration-300">
                <h4 className="font-semibold text-trust-navy mb-4">Learning Modules</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { 
                      title: "Budgeting Basics", 
                      type: "Interactive Course", 
                      duration: "15 min", 
                      level: "Beginner",
                      icon: <DollarSign className="w-4 h-4" />,
                      progress: 75,
                      audience: "Parents"
                    },
                    { 
                      title: "Money for Kids", 
                      type: "Video Series", 
                      duration: "8 min", 
                      level: "Kids 8-12",
                      icon: <Users className="w-4 h-4" />,
                      progress: 30,
                      audience: "Children"
                    },
                    { 
                      title: "Investment 101", 
                      type: "Article + Quiz", 
                      duration: "20 min", 
                      level: "Intermediate",
                      icon: <TrendingUp className="w-4 h-4" />,
                      progress: 0,
                      audience: "Parents"
                    },
                    { 
                      title: "Saving Challenges", 
                      type: "Interactive Game", 
                      duration: "10 min", 
                      level: "All Ages",
                      icon: <Target className="w-4 h-4" />,
                      progress: 90,
                      audience: "Family"
                    }
                  ].map((course, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            {course.icon}
                          </div>
                          <div>
                            <div className="font-medium text-trust-navy text-sm">{course.title}</div>
                            <div className="text-xs text-muted-foreground">{course.type}</div>
                          </div>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">{course.audience}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground">{course.duration} • {course.level}</span>
                        <span className="text-xs font-medium text-green-600">{course.progress}% Complete</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-green-500 h-1.5 rounded-full transition-all duration-300" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Smart Savings Analytics - Medium Card */}
          <Card className="lg:col-span-5 group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden hover:-translate-y-1">
            <CardContent className="p-8 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-2xl font-display font-bold text-trust-navy">
                 Smart Savings Analytics
                </h3>
              </div>
              <p className="text-muted-foreground mb-8 leading-relaxed">
              Track expenses automatically and discover personalized ways to save more money each month.
              </p>
              
              {/* Savings Analytics */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-4 group-hover:bg-gray-100 transition-colors duration-300">
                  <h4 className="font-semibold text-purple-600 mb-4">Savings Goals & Analytics</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-blue-400" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Emergency Fund</span>
                          <span className="text-sm text-green-600 font-semibold">+$200/mo</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">$6,500 / Goal: $10,000</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-green-400" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Education Fund</span>
                          <span className="text-sm text-green-600 font-semibold">+$800/mo</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">$18,000 / Goal: $40,000</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Circle className="w-5 h-5 text-orange-400" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Vacation Fund</span>
                          <span className="text-sm text-green-600 font-semibold">+$150/mo</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-400 h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">$4,000 / Goal: $5,000</div>
                      </div>
                    </div>
                  </div>

                  {/* Savings Insights */}
                  <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
                    <h5 className="font-medium text-trust-navy mb-3 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-500" />
                      AI Savings Insights
                    </h5>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">• You could save $85/mo by switching to a different phone plan</div>
                      <div className="text-sm text-gray-600">• Meal planning could reduce food costs by $120/mo</div>
                      <div className="text-sm text-gray-600">• Your energy usage is 15% above average</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Financial Assistant - Medium Card */}
          <Card className="lg:col-span-4 group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden hover:-translate-y-1">
            <CardContent className="p-8 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-display font-bold text-trust-navy">
                  AI Financial Assistant
                </h3>
              </div>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Get instant, personalized financial advice through our intelligent chat assistant.
              </p>
              
              {/* Chat Interface Mockup */}
              <div className="bg-gray-50 rounded-xl p-4 group-hover:bg-gray-100 transition-colors duration-300">
                <div className="space-y-4">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white rounded-lg px-4 py-2 max-w-xs text-sm">
                      How can I save more for my child's education?
                    </div>
                  </div>
                  
                  {/* AI Response */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Brain className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="bg-white rounded-lg px-4 py-3 shadow-sm max-w-xs text-sm">
                      <div className="font-medium text-trust-navy mb-2">ArthSaathi AI</div>
                      <div className="text-gray-700">
                        Based on your spending pattern, I suggest:
                        <br/>• Switch to a 529 education plan
                        <br/>• Reduce dining out by $150/mo
                        <br/>• Automate savings of $200/mo
                      </div>
                    </div>
                  </div>
                  
                  {/* Typing Indicator */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500 mb-2">Quick Actions:</div>
                  <div className="flex flex-wrap gap-2">
                    <button className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                      Budget Review
                    </button>
                    <button className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                      Investment Tips
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Card - Smaller Card */}
          <Card className="lg:col-span-3 group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-blue-600 to-blue-400 text-white overflow-hidden hover:-translate-y-1">
            <CardContent className="p-8 h-full flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-blue-400/80 group-hover:from-blue-600/90 group-hover:to-blue-400/90 transition-all duration-300"></div>
              <div className="relative z-10">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
                    <Zap className="w-4 h-4" />
                    Smart Family Finance
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">
                    Tranform your Financial Journey with ArthSaathi
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      className="bg-white text-blue-600 hover:bg-white/90 font-semibold group-hover:scale-105 transition-transform duration-300"
                    >
                      Get Started
                    </Button>
                   
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;