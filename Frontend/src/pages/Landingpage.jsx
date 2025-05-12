import React, { useState, useEffect } from "react";
// Importing icons from Lucide React
import { ChevronRight, BarChart2, PiggyBank, BookOpen, Users, Shield, TrendingUp, ArrowRight, Play } from "lucide-react";

// Feature card component without animation
const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center relative overflow-hidden group"
    >
      {/* Background glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-emerald-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
      
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-600/20 to-emerald-600/20 p-4 rounded-full mb-4 transform transition-transform group-hover:scale-110 duration-300">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

// Statistic card component without animation
const StatisticCard = ({ value, label, delay }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value.substring(0, value.length - 1));
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start > end) start = end;
      setCount(Math.floor(start));
      if (start === end) clearInterval(timer);
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-emerald-600/30 rounded-xl blur-md opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
        <div className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">{count}{value.slice(-1)}</div>
        <div className="text-muted-foreground text-white">{label}</div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const features = [
    {
      icon: BarChart2,
      title: "Expense Tracking & Analytics",
      description: "Comprehensive tools for tracking expenses with detailed analytics and visualizations.",
    },
    {
      icon: PiggyBank,
      title: "Budget Management",
      description: "Intuitive budget planning tools to help families establish and maintain financial goals.",
    },
    {
      icon: BookOpen,
      title: "Financial Education",
      description: "Interactive learning resources to improve financial literacy for all family members.",
    },
    {
      icon: Users,
      title: "Family-Focused Design",
      description: "Tailored specifically for middle-class families with features designed for their unique needs.",
    },
    {
      icon: Shield,
      title: "Data-Driven Insights",
      description: "Personalized recommendations based on spending patterns and financial behaviors.",
    },
    {
      icon: TrendingUp,
      title: "Long-term Planning",
      description: "Tools for setting and tracking long-term financial goals including savings and investments.",
    },
  ];

  const statistics = [
    { value: "65%", label: "Reduction in financial stress" },
    { value: "40%", label: "Increase in savings rate" },
    { value: "3x", label: "Financial literacy improvement" },
    { value: "85%", label: "User satisfaction" },
  ];

  return (
    <div className="min-h-screen">
      {/* Your existing content here */}
      {/* Modern Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
                <stop offset="100%" stopColor="rgba(16, 185, 129, 0.1)" />
              </linearGradient>
            </defs>
            <path fill="url(#grad1)" d="M0 0 Q 50 50 100 0 V100 H0 Z" />
          </svg>
          
          {/* Floating Elements - Static version without animations */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 100}%`,
                background: `rgba(${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, 255, 0.08)`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
          <div className="flex flex-col items-center text-center mb-12">
            <div
              className="inline-block px-6 py-2 mb-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-medium text-sm"
            >
              Redefining Family Finance
            </div>
            
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 leading-tight max-w-4xl mx-auto"
            >
              Financial Wellness for Every Family
            </h1>
            
            <p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              Empowering middle-class families with data-driven insights and personalized strategies for financial security and growth.
            </p>
            
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a 
                href="#signup" 
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-medium text-white hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Sign Up for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a 
                href="#features" 
                className="inline-flex items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-700 px-8 py-4 text-base text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
          
          {/* Dashboard Preview */}
          <div
            className="max-w-5xl mx-auto relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl blur-lg opacity-30"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
              <div className="w-full h-12 bg-gray-100 dark:bg-gray-700 flex items-center px-4 border-b border-gray-200 dark:border-gray-600">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 p-6">
                <div className="col-span-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-64">
                  <div className="w-full h-8 mb-4 bg-blue-100 dark:bg-blue-900 rounded-md"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-600 rounded-md h-24 p-2">
                      <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-500 rounded mb-2"></div>
                      <div className="w-3/4 h-6 bg-blue-200 dark:bg-blue-700 rounded mb-2"></div>
                      <div className="w-full h-8 bg-gray-100 dark:bg-gray-500 rounded"></div>
                    </div>
                    <div className="bg-white dark:bg-gray-600 rounded-md h-24 p-2">
                      <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-500 rounded mb-2"></div>
                      <div className="w-3/4 h-6 bg-green-200 dark:bg-green-700 rounded mb-2"></div>
                      <div className="w-full h-8 bg-gray-100 dark:bg-gray-500 rounded"></div>
                    </div>
                    <div className="bg-white dark:bg-gray-600 rounded-md h-24 p-2">
                      <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-500 rounded mb-2"></div>
                      <div className="w-3/4 h-6 bg-yellow-200 dark:bg-yellow-700 rounded mb-2"></div>
                      <div className="w-full h-8 bg-gray-100 dark:bg-gray-500 rounded"></div>
                    </div>
                    <div className="bg-white dark:bg-gray-600 rounded-md h-24 p-2">
                      <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-500 rounded mb-2"></div>
                      <div className="w-3/4 h-6 bg-purple-200 dark:bg-purple-700 rounded mb-2"></div>
                      <div className="w-full h-8 bg-gray-100 dark:bg-gray-500 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 h-32">
                    <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-500 rounded mb-2"></div>
                    <div className="w-full h-20 bg-primary/20 rounded-md mt-2"></div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 h-32">
                    <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-500 rounded mb-2"></div>
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                    <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                    <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              className="w-full h-12 text-white dark:text-gray-900"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* About Section - REDESIGNED */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden" id="about">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <svg className="absolute top-0 right-0 h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="80" cy="20" r="20" fill="rgba(59, 130, 246, 0.3)" />
            <circle cx="95" cy="60" r="30" fill="rgba(16, 185, 129, 0.3)" />
          </svg>
          
          {/* Static version of floating elements */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 80 + 40,
                height: Math.random() * 80 + 40,
                right: `${Math.random() * 40}%`,
                top: `${Math.random() * 100}%`,
                background: `rgba(${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, 255, 0.05)`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div 
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block px-6 py-2 mb-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-medium text-sm">
              Our Mission
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
              Addressing Financial Challenges
            </h2>
            <p className="text-muted-foreground text-lg dark:text-gray-300">
              Our platform is designed to address the unique financial challenges faced by middle-class families today, providing tools and resources that promote financial well-being and stability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {statistics.map((stat, index) => (
              <StatisticCard 
                key={index} 
                value={stat.value} 
                label={stat.label} 
                delay={0.1 * index}
              />
            ))}
          </div>

          <div 
            className="relative rounded-2xl overflow-hidden"
          >
            {/* Gradient border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl blur-lg opacity-20"></div>
            
            <div className="relative flex flex-col md:flex-row bg-accent rounded-2xl p-8 md:p-12 overflow-hidden">
              {/* Background pattern */}
              <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
              
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
                    Improving Financial Resilience
                  </h3>
                  <p className="mb-4 text-white/70 dark:text-gray-300">
                    Our platform has been developed in consultation with financial experts, economists, and family counselors to address the specific needs of middle-class households.
                  </p>
                  <p className="text-white/70 dark:text-gray-300">
                    By combining education, practical tools, and personalized insights, we're helping families build financial resilience and work toward long-term prosperity.
                  </p>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div 
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg relative overflow-hidden h-full"
                >
                  {/* Subtle corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-full"></div>
                  
                  <div className="space-y-4 relative text-white/70 dark:text-gray-300">
                    {[
                      "Comprehensive financial education modules",
                      "Data-driven personalized recommendations",
                      "Goal-based savings and investment planning",
                      "Interactive budgeting and expense tracking",
                      "Family-focused financial wellness metrics"
                    ].map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-start"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-emerald-500/20 flex items-center justify-center mr-3 transform transition-transform group-hover:scale-110 duration-300">
                          <ChevronRight className="h-5 w-5 text-primary" />
                        </div>
                        <p className="pt-2">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section  */}
      <section className="py-20 relative overflow-hidden">
        {/* Background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-emerald-600/10"></div>
        
        {/* Abstract shapes */}
        <svg className="absolute top-0 left-0 h-full w-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="10" cy="10" r="5" fill="rgba(59, 130, 246, 0.3)" />
          <circle cx="40" cy="20" r="8" fill="rgba(16, 185, 129, 0.3)" />
          <circle cx="70" cy="50" r="10" fill="rgba(59, 130, 246, 0.2)" />
          <circle cx="20" cy="70" r="7" fill="rgba(16, 185, 129, 0.2)" />
          <circle cx="90" cy="90" r="6" fill="rgba(59, 130, 246, 0.3)" />
        </svg>
        
        <div className="container mx-auto px-4 relative z-10">
          <div 
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block px-6 py-2 mb-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-medium text-sm">
              Results
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
              Measurable Impact
            </h2>
            <p className="text-muted-foreground text-lg">
              Our platform delivers meaningful results that contribute to long-term financial stability
            </p>
          </div>
      
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat Card 1 */}
            <div 
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 text-center"
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">94%</h3>
              <p className="text-xl font-medium mb-1 text-white">Cost Reduction</p>
              <p className="text-muted-foreground">Compared to traditional financial services</p>
            </div>
            
            {/* Stat Card 2 */}
            <div 
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 text-center"
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-500">2.5x</h3>
              <p className="text-xl font-medium mb-1 text-white">ROI Increase</p>
              <p className="text-muted-foreground">For Families using our platform</p>
            </div>
            
            {/* Stat Card 3 */}
            <div 
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 text-center"
            >
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-500">10K+</h3>
              <p className="text-xl font-medium mb-1 text-white">Active Families</p>
              <p className="text-muted-foreground">Across 5+ Districts </p>
            </div>
          </div>
      
          {/* Testimonial */}
          <div 
            className="mt-20 bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <img src="/api/placeholder/96/96" alt="Customer testimonial" className="w-full h-full object-cover" />
              </div>
              <div>
                <svg className="h-8 w-8 text-blue-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <p className="text-lg italic mb-4 text-white/80">The platform transformed our middle-class families regarding financial management. We've seen substantial growth and stability since implementing the solution across our Dhemaji District.</p>
                <div>
                  <h4 className="font-semibold text-white">Rahul Suresh Javir</h4>
                  <p className="text-sm text-muted-foreground text-white">District Commissioner, Dhemaji</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Features Section */}
<section className="py-20 relative overflow-hidden" id="features">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-emerald-50/50 dark:from-gray-900 dark:to-gray-800 -z-10"></div>
  
  {/* Pattern overlay */}
  <div className="absolute inset-0 opacity-10 -z-5">
    <svg width="100%" height="100%">
      <pattern id="hexagons" width="50" height="50" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
        <path d="M25,0 L50,15 L50,40 L25,55 L0,40 L0,15 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#hexagons)"/>
    </svg>
  </div>
  
  {/* Floating Elements */}
  {[...Array(6)].map((_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-gradient-to-r from-blue-600/10 to-emerald-600/10"
      style={{
        width: Math.random() * 120 + 50,
        height: Math.random() * 120 + 50,
        left: `${Math.random() * 90}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [Math.random() * 30, Math.random() * -30, Math.random() * 30],
        x: [Math.random() * 30, Math.random() * -30, Math.random() * 30],
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.7, 0.5],
      }}
      transition={{
        duration: 15 + Math.random() * 10,
        repeat: Infinity,
        repeatType: "mirror",
      }}
    />
  ))}

  <div className="container mx-auto px-4 relative z-10">
    <motion.div 
      className="text-center max-w-3xl mx-auto mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="inline-block px-6 py-2 mb-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-medium text-sm">
        Features
      </div>
      <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
        Key Platform Features
      </h2>
      <p className="text-muted-foreground text-lg dark:text-gray-300">
        Our comprehensive suite of tools is designed to address every aspect of family financial management
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <FeatureCard 
          key={index} 
          icon={feature.icon} 
          title={feature.title} 
          description={feature.description} 
          delay={0.1 * index}
        />
      ))}
    </div>
    
    {/* Feature showcase */}
    <motion.div 
      className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left side - Feature details */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 p-3 rounded-full inline-flex items-center justify-center w-12 h-12 mb-6">
            <BarChart2 className="w-6 h-6" />
          </div>
          
          <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
            Advanced Analytics Dashboard
          </h3>
          
          <p className="text-muted-foreground mb-6">
            Our intuitive analytics dashboard provides comprehensive insights into your financial health. Track spending patterns, monitor budget adherence, and identify opportunities for improvement.
          </p>
          
          <ul className="space-y-3 mb-8">
            {[
              "Real-time expense categorization",
              "Visual budget tracking",
              "Personalized savings recommendations",
              "Financial trend analysis"
            ].map((item, index) => (
              <motion.li 
                key={index} 
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
                viewport={{ once: true }}
              >
                <ChevronRight className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
          
          <Link 
            to="/features/analytics" 
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            Learn more about our analytics
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        {/* Right side - Feature preview */}
        <div className="relative">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 mix-blend-overlay"></div>
          
          {/* Feature image or mockup */}
          <div className="h-full bg-gray-100 dark:bg-gray-700 p-8 flex items-center justify-center">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="h-8 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex items-center px-4">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              
              <div className="p-4">
                <div className="h-6 bg-blue-100 dark:bg-blue-900 rounded-md w-1/3 mb-4"></div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="h-24 bg-blue-50 dark:bg-blue-900/30 rounded-md"></div>
                  <div className="h-24 bg-emerald-50 dark:bg-emerald-900/30 rounded-md"></div>
                </div>
                <div className="h-32 bg-gray-50 dark:bg-gray-700 rounded-md mb-4"></div>
                <div className="flex space-x-2">
                  <div className="h-8 bg-blue-500 rounded-md w-1/4"></div>
                  <div className="h-8 bg-emerald-500 rounded-md w-1/4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded-md w-1/4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded-md w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>
</div>
);
};

export default LandingPage;