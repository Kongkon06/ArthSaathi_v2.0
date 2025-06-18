import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Award,
  Download,
  Star,
  Users,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";

const ExtensionSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-300/30 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Mobile App
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-trust-navy mb-6">
            Transform Your Family Financial Future with Our{" "}
            <span className="text-family-blue">Smart Finnancial App!</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Take control of your finances, eliminate unnecessar expenses, and build wealth with expert guidance for investment strategy at your fingertips.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Mobile Mockup - Main Feature */}
          <Card className="lg:col-span-8 group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden hover:-translate-y-1">
            <CardContent className="p-8 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                <div className="space-y-6">
                  <div>
                    <Badge variant="secondary" className="mb-4 bg-family-blue/10 text-family-blue hover:bg-family-blue/20">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Mobile First
                    </Badge>
                    <h3 className="text-2xl font-display font-bold text-trust-navy mb-4">
                      Financial Health Dashboard
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Monitor your family financial health, track finances, and manage investments all from your mobile device with our intuitive user-centric interface.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-success-green/10 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-success-green" />
                      </div>
                      <span className="text-sm font-medium">Real-time finances tracking</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-family-blue/10 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-family-blue" />
                      </div>
                      <span className="text-sm font-medium">Secure Authentication</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-family-orange/10 rounded-full flex items-center justify-center">
                        <Zap className="w-4 h-4 text-family-orange" />
                      </div>
                      <span className="text-sm font-medium">AI-powered insights</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Mockup Placeholder */}
                <div className="relative group-hover:scale-105 transition-transform duration-500">
                  <div className="relative w-64 h-[500px] mx-auto">
                    {/* Phone Frame */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                      {/* Screen */}
                      <div className="w-full h-full bg-gradient-to-b from-yellow-400 via-orange-400 to-red-400 rounded-[2rem] p-4 overflow-hidden">
                        {/* Status Bar */}
                        <div className="flex justify-between items-center mb-4 text-white text-xs">
                          <span>9:41</span>
                          <div className="flex gap-1">
                            <div className="w-4 h-2 bg-white rounded-sm"></div>
                            <div className="w-4 h-2 bg-white rounded-sm"></div>
                            <div className="w-4 h-2 bg-white rounded-sm"></div>
                          </div>
                        </div>
                        
                        {/* App Content */}
                        <div className="space-y-4">
                          {/* Header */}
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-white text-sm opacity-80">financial health</div>
                              <div className="text-white text-2xl font-bold">64/100</div>
                            </div>
                            <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                          </div>
                          
                          {/* Chart Area */}
                          <div className="h-20 bg-white/10 rounded-lg flex items-end p-2">
                            {[...Array(12)].map((_, i) => (
                              <div 
                                key={i} 
                                className="flex-1 bg-white/40 rounded-sm mx-0.5" 
                                style={{ height: `${Math.random() * 60 + 20}%` }}
                              ></div>
                            ))}
                          </div>
                          
                          {/* Cards */}
                          <div className="space-y-3">
                            <div className="bg-gray-900 rounded-lg p-3 text-white">
                              <div className="flex justify-between items-center">
                                <span className="text-sm opacity-80">total assets</span>
                                <span className="text-lg font-bold">$14,200</span>
                              </div>
                            </div>
                            
                            <div className="bg-gray-200 rounded-lg p-3">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">budgets</span>
                                <span className="text-sm text-gray-600">april</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-bold">$1,600/2000</span>
                                <span className="text-sm font-medium">80%</span>
                              </div>
                              <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                                <div className="bg-family-blue h-2 rounded-full" style={{ width: '80%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Editor's Choice Card */}
          <Card className="lg:col-span-4 group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden hover:-translate-y-1">
            <CardContent className="p-8 h-full flex flex-col justify-center text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-800/90 group-hover:from-gray-900/95 group-hover:to-gray-800/95 transition-all duration-300"></div>
              <div className="relative z-10 space-y-6">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-yellow-400" />
                    <Award className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2">Editor's Choice</h3>
                  <p className="text-white/80 mb-1">PlayStore</p>
                </div>
                
                <div className="space-y-4">
                  <p className="text-white/90 leading-relaxed">
                    Unlock the power of AI to revolutionize the way you get insights from your finances.
                  </p>
                  
                  <p className="text-sm text-white/80">
                    Our intuitive app empowers you to effortlessly track user finances, set achievable financial goals, and receive personalized investment recommendations and strategy.
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>4.9</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>50K+</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Download CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-blue-300 hover:bg-blue-400/90 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Download App
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExtensionSection;