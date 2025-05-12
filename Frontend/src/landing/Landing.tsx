import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight, 
  BarChart2, 
  PiggyBank, 
  BookOpen, 
  Users, 
  Shield, 
  TrendingUp, 
  ArrowRight,
  CheckCircle,
  Icon,
  ChevronDown
} from "lucide-react";

const FeatureCard = ({ title, description }:any) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center relative overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Background glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-emerald-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
      
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-600/20 to-emerald-600/20 p-4 rounded-full mb-4 transform transition-transform group-hover:scale-110 duration-300">
          <ChevronRight className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

// Statistic card component
const StatisticCard = ({ value, label }:any) => {
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
    <div className="relative transition-all duration-300 hover:-translate-y-1">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-emerald-600/30 rounded-xl blur-md opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
        <div className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">{count}{value.slice(-1)}</div>
        <div className="text-gray-600 dark:text-gray-300">{label}</div>
      </div>
    </div>
  );
};

// Testimonial card component
const TestimonialCard = ({ image, quote, name, title }:any) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-blue-100 dark:border-blue-900">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <svg className="h-8 w-8 text-blue-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
        </svg>
        <p className="text-gray-600 dark:text-gray-300 italic mb-4">{quote}</p>
        <h4 className="font-semibold text-gray-800 dark:text-white">{name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      </div>
    </div>
  );
};

// FAQ item component
const FAQItem = ({ question, answer }:any) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button 
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">{question}</h3>
        <ChevronDown className={`w-5 h-5 text-primary transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <div className={`mt-2 text-gray-600 dark:text-gray-300 overflow-hidden transition-all ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <p className="pb-4">{answer}</p>
      </div>
    </div>
  );
};

const Landingpage = () => {
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
  
  const testimonials = [
    {
      image: "/api/placeholder/80/80",
      quote: "This platform transformed how our family manages finances. We've seen substantial growth in our savings since using it.",
      name: "Priya Sharma",
      title: "Parent & Teacher"
    },
    {
      image: "/api/placeholder/80/80",
      quote: "The tools are intuitive and the insights are incredibly helpful. My family is finally on track financially.",
      name: "Rajesh Kumar",
      title: "IT Professional"
    },
    {
      image: "/api/placeholder/80/80",
      quote: "We've implemented this solution across our district and seen remarkable improvements in family financial stability.",
      name: "Rahul Suresh Javir",
      title: "District Commissioner, Dhemaji"
    }
  ];
  
  const faqs = [
    {
      question: "How does the platform help with budgeting?",
      answer: "Our platform provides intuitive tools to create personalized budgets based on your income, expenses, and financial goals. It offers real-time tracking, categorizes expenses automatically, and sends alerts when you approach spending limits."
    },
    {
      question: "Is my financial data secure?",
      answer: "Absolutely. We employ bank-level security measures including 256-bit encryption, two-factor authentication, and regular security audits. Your data is stored in secure, encrypted databases and is never shared with third parties without your explicit permission."
    },
    {
      question: "Can multiple family members access the account?",
      answer: "Yes, our platform is designed for family collaboration. You can create multiple user profiles with customized access levels, allowing family members to track their individual spending while contributing to shared financial goals."
    },
    {
      question: "What financial education resources are available?",
      answer: "We offer a comprehensive library of educational content including interactive courses, webinars, articles, and age-appropriate learning modules for children. Topics range from basic budgeting to advanced investment strategies."
    },
    {
      question: "How personalized are the insights and recommendations?",
      answer: "Our AI-powered analytics engine analyzes your spending patterns, income fluctuations, and financial behaviors to provide highly personalized insights and actionable recommendations specific to your family's needs and goals."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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
          
          {/* Floating Elements */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: Math.random() * 90,
                top: Math.random() * 100,
                background: `rgba(${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, 255, 0.08)`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-block px-6 py-2 mb-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-medium text-sm">
              Redefining Family Finance
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 leading-tight max-w-4xl mx-auto">
              Financial Wellness for Every Family
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Empowering middle-class families with data-driven insights and personalized strategies for financial security and growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#signup" 
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-medium text-white hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Sign Up for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a 
                href="#features" 
                className="inline-flex items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-700 px-8 py-4 text-base font-medium text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
          
          {/* Dashboard Preview */}
          <div className="max-w-5xl mx-auto relative">
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

      {/* About Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden" id="about">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <svg className="absolute top-0 right-0 h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="80" cy="20" r="20" fill="rgba(59, 130, 246, 0.3)" />
            <circle cx="95" cy="60" r="30" fill="rgba(16, 185, 129, 0.3)" />
          </svg>
          
          {/* Floating elements */}
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
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-6 py-2 mb-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-medium text-sm">
              Our Mission
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
              Addressing Financial Challenges
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Our platform is designed to address the unique financial challenges faced by middle-class families today, providing tools and resources that promote financial well-being and stability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {statistics.map((stat, index) => (
              <StatisticCard 
                key={index} 
                value={stat.value} 
                label={stat.label}
              />
            ))}
          </div>

          <div className="relative rounded-2xl overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl blur-lg opacity-20"></div>
            
            <div className="relative flex flex-col md:flex-row bg-gray-800 dark:bg-gray-700 rounded-2xl p-8 md:p-12 overflow-hidden">
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
                  <p className="mb-4 text-gray-300">
                    Our platform has been developed in consultation with financial experts, economists, and family counselors to address the specific needs of middle-class households.
                  </p>
                  <p className="text-gray-300">
                    By combining education, practical tools, and personalized insights, we're helping families build financial resilience and work toward long-term prosperity.
                  </p>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg relative overflow-hidden h-full">
                  {/* Subtle corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-full"></div>
                  
                  <div className="space-y-4 relative text-gray-600 dark:text-gray-300">
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
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-emerald-500/20 flex items-center justify-center mr-3">
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

      {/* Features Section - REDESIGNED */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden" id="features">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 -z-10">
          <svg width="100%" height="100%" className="opacity-5">
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots)"/>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-6 py-2 mb-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-medium text-sm">
              Features
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
              Key Platform Features
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Our comprehensive suite of tools is designed to address every aspect of family financial management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index} 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description}
              />
            ))}
          </div>
          </div>
         {/* Feature Spotlight */}
<div className="mt-12 bg-white dark:bg-gray-700 rounded-2xl shadow-xl overflow-hidden">
  <div className="grid grid-cols-1 md:grid-cols-2">
    {/* Left side - Feature details */}
    <div className="p-8 md:p-12 flex flex-col justify-center">
      <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 p-3 rounded-full inline-flex items-center justify-center w-12 h-12 mb-6">
        <BarChart2 className="w-6 h-6" />
      </div>
      <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
        Advanced Analytics Dashboard
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Our intuitive analytics dashboard provides comprehensive insights into your financial health. Track spending patterns, monitor budget adherence, and identify opportunities for improvement.
      </p>
      <ul className="space-y-3 mb-8">
        {[
          "Real-time expense categorization",
          "Visual budget tracking",
          "Personalized savings recommendations",
          "Financial trend analysis"
        ].map((item, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-300">{item}</span>
          </li>
        ))}
      </ul>
      <Link to="/features/analytics" className="inline-flex items-center text-primary font-medium hover:underline">
        Learn more about our analytics <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
    {/* Right side - Feature preview */}
    <div className="relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 mix-blend-overlay"></div>
      {/* Feature image or mockup */}
      <div className="h-full bg-gray-100 dark:bg-gray-600 p-8 flex items-center justify-center">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="h-8 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex items-center px-4">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="p-6">
            <div className="w-full h-40 bg-gray-200 dark:bg-gray-600 rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</section>
</div>
);
};

export default Landingpage;