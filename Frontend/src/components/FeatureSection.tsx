import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Zap,
  Plus,
  Target,
  BookOpen,
  Circle
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
          {/* Multi-Account Integration - Large Card */}
          <Card className="lg:col-span-5 group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden hover:-translate-y-1">
            <CardContent className="p-8 h-full">
              <div className="flex flex-col h-full">
                <h3 className="text-2xl font-display font-bold text-trust-navy mb-4">
                  Multi-Account Integration
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Unify your financial world in one place. Connect and manage multiple financial accounts, 
                  whether they are personal, business, or investment accounts.
                </p>
                
                {/* Credit Card Section */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <h4 className="font-semibold text-trust-navy">My cards</h4>
                      <div className="ml-auto bg-blue-400 text-white rounded-full w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Plus className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Add and update your card detail</p>
                  </div>
                  
                  {/* Credit Card Mockup */}
                  <div className="relative group-hover:scale-105 transition-transform duration-500">
                    <div className="bg-gradient-to-br from-family-blue to-primary rounded-2xl p-6 text-white shadow-lg">
                      <div className="flex justify-between items-start mb-8">
                        <div className="w-12 h-8 bg-white/20 rounded backdrop-blur-sm"></div>
                        <div className="w-8 h-6 bg-white/30 rounded-full"></div>
                      </div>
                      <div className="font-mono text-xl tracking-wider mb-4">3254 8678 4234 7628</div>
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-xs opacity-80 mb-1">Card Holder Name</div>
                          <div className="font-semibold">Lee Saaba</div>
                        </div>
                        <div>
                          <div className="text-xs opacity-80 mb-1">Expiry Date</div>
                          <div className="font-semibold">08/24</div>
                        </div>
                        <div className="text-xl font-bold">VISA</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Simplified Transaction Tracking - Large Card */}
          <Card className="lg:col-span-7 group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden hover:-translate-y-1">
            <CardContent className="p-8 h-full">
              <h3 className="text-2xl font-display font-bold text-trust-navy mb-4">
                Simplified Transaction Tracking
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Say goodbye to the hassle of manually categorizing expenses. Our platform automates expense tracking, 
                helping you understand where your money is going.
              </p>
              
              {/* Transaction History Table */}
              <div className="bg-gray-50 rounded-xl p-6 group-hover:bg-gray-100 transition-colors duration-300">
                <h4 className="font-semibold text-trust-navy mb-4">Transaction History</h4>
                <div className="space-y-3">
                  {[
                    { name: "Anastasia", id: "PVB-072412", date: "Sep 29, 2023", status: "Completed", amount: "$12,200", color: "bg-green-100 text-green-600" },
                    { name: "Daniel", id: "DEW-032015", date: "Sep 16, 2023", status: "Pending", amount: "$6,640", color: "bg-orange-100 text-orange-600" },
                    { name: "Monica", id: "MHI-072509", date: "Oct 23, 2023", status: "Completed", amount: "$23,450", color: "bg-green-100 text-green-600" },
                    { name: "Anastasia", id: "PVB-072412", date: "Sep 29, 2023", status: "Completed", amount: "$12,200", color: "bg-green-100 text-green-600" }
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-600">{transaction.name[0]}</span>
                        </div>
                        <div>
                          <div className="font-medium text-trust-navy">{transaction.name}</div>
                          <div className="text-sm text-muted-foreground">{transaction.id}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">{transaction.date}</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${transaction.color} inline-block`}>
                          {transaction.status}
                        </div>
                      </div>
                      <div className="font-semibold text-trust-navy">{transaction.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Streamlined Budgeting - Medium Card */}
          <Card className="lg:col-span-5 group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden hover:-translate-y-1">
            <CardContent className="p-8 h-full">
              <h3 className="text-2xl font-display font-bold text-trust-navy mb-4">
                Streamlined Budgeting
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Achieve financial discipline with our budgeting tools. Set, track, and manage your budgets effortlessly, 
                helping you stay on top of your expenses and savings targets.
              </p>
              
              {/* Budget Categories */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-4 group-hover:bg-gray-100 transition-colors duration-300">
                  <h4 className="font-semibold text-indigo-500 mb-4">Savings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-blue-400" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Monthly savings: $200.00</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">$6,000 / Target: $40,000</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-green-400" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Education</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Monthly savings: $800 / Target: $40,000</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Circle className="w-5 h-5 text-orange-300" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Emergency Fund</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-400 h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Card - Medium Card */}
          <Card className="lg:col-span-7 group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-family-blue to-primary text-white overflow-hidden hover:-translate-y-1">
            <CardContent className="p-8 h-full flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-family-blue/80 to-primary/80 group-hover:from-family-blue/90 group-hover:to-primary/90 transition-all duration-300"></div>
              <div className="relative z-10">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
                    <Zap className="w-4 h-4" />
                    Finance Finance Finance Finance
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-6">
                    Feel the next level of financing app with ArthSaathi
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      className="bg-white text-blue-300 hover:bg-white/90 font-semibold group-hover:scale-105 transition-transform duration-300"
                    >
                      Get Started
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-white/30 text-white hover:bg-white/10 hover:border-white group-hover:scale-105 transition-transform duration-300"
                    >
                      Try Demo
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
