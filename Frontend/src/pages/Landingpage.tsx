import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const partners = [
  "facebook",
  "Upwork",
  "Spotify",
  "airbnb",
  "amazon",
  "slack",
  "Walmart",
  "NETFLIX",
];

const testimonials = [
  {
    name: "Michael Red",
    title: "Financial Expert",
    review:
      "The platform has revolutionized how I manage my finances. I can access real-time data and valuable insights to make informed decisions!",
    rating: 5,
    avatar: "/testimonials/avatar1.png",
  },
  {
    name: "Zoey Lica",
    title: "UI/UX Researcher",
    review:
      "This platform is so visually appealing and easy to use. I love the integrated budgeting tools and notifications!",
    rating: 5,
    avatar: "/testimonials/avatar2.png",
  },
  {
    name: "Zach Son",
    title: "Business Analyst",
    review:
      "I’ve never felt more in control of my money. The streamlined transaction tracking is a game-changer.",
    rating: 5,
    avatar: "/testimonials/avatar3.png",
  },
];

const features = [
  {
    icon: (
      <svg width="38" height="38" fill="none">
        <circle cx="19" cy="19" r="19" fill="#e9f3ff" />
        <path d="M12 23l7-7 7 7" stroke="#3366FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Multi-Account Integration",
    description:
      "Effortlessly manage multiple accounts—personal, business, or investment—under one roof.",
  },
  {
    icon: (
      <svg width="38" height="38" fill="none">
        <circle cx="19" cy="19" r="19" fill="#f1eaff" />
        <path d="M19 10v18M10 19h18" stroke="#A259FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Notifications and Alerts",
    description:
      "Receive instant alerts for unusual account activity, upcoming bills, and goal tracking.",
  },
  {
    icon: (
      <svg width="38" height="38" fill="none">
        <circle cx="19" cy="19" r="19" fill="#eaffea" />
        <path d="M14 19l5 5 5-5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Privacy and Security",
    description:
      "Advanced encryption and security protocols keep your data safe and private.",
  },
];

const pricingPlans = [
  {
    name: "Basic Plan",
    price: "$9.99",
    period: "/Month",
    features: [
      "Expense tracking and categorization",
      "Budget planning",
      "Customer Support",
    ],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "/Month",
    features: [
      "All features of the Basic Plan",
      "Comprehensive financial management",
      "Multi-account analysis",
      "Investment analytics",
      "Customer Support",
    ],
    highlighted: true,
    tag: "Most Popular",
  },
  {
    name: "Business Plan",
    price: "$19.99",
    period: "/Month",
    features: [
      "Expense tracking & categorization",
      "Financial reporting",
      "Customer Support",
    ],
    highlighted: false,
  },
];

export default function Landingpage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-[#2D3B8C] to-[#F6F7FB] w-full min-h-screen text-gray-900">
      {/* Navigation */}
      <header className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
            <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="14" fill="#fff"/><path d="M7 14l7-7 7 7" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <span className="font-extrabold text-xl tracking-tight text-white">Finanzen</span>
        </div>
        <nav className="hidden md:flex gap-8 text-white font-medium">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#about" className="hover:underline">About Us</a>
          <a href="#services" className="hover:underline">Services</a>
          <a href="#contact" className="hover:underline">Contact Us</a>
        </nav>
        <div className="flex gap-3">
          <Button variant="ghost" className="text-white border-white" onClick={() => navigate("/login")}>Log In</Button>
          <Button className="bg-white text-blue-700 font-semibold" onClick={() => navigate("/signup")}>Sign Up</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="mb-3">
          <span className="px-4 py-1 rounded-full bg-white/10 border border-white/30 text-white text-xs font-medium tracking-wide">Financial Control Platform</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-white to-blue-300 bg-clip-text text-transparent mb-4">
          Expert Guidance to Optimize<br />Your Financial Growth and Security
        </h1>
        <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
          Our expert guidance will optimize your financial portfolio and lay the foundation for a secure and prosperous future.
        </p>
        <div className="flex justify-center gap-4 mb-12">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl px-8 py-3" onClick={() => navigate("/signup")}>
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white/40 text-lg font-semibold rounded-xl px-8 py-3" onClick={() => navigate("/demo")}>
            Try Demo
          </Button>
        </div>
        <div className="w-full max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden border border-white/10 bg-white/70 backdrop-blur-md">
          {/* Replace with actual illustration or dashboard image */}
          <img src="/landing/hero-dashboard.png" alt="Financial Dashboard Preview" className="w-full h-auto" />
        </div>
      </section>

      {/* Features Overview */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center bg-white rounded-2xl shadow p-8">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="font-bold text-xl mb-2 text-gray-900 text-center">{feature.title}</h3>
            <p className="text-gray-600 text-center">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Advanced Features Section */}
      <section className="bg-white py-20 px-6" id="features">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <span className="uppercase text-blue-600 font-bold text-xs mb-2 tracking-widest">Features</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-gray-900">
            Exploring the Comprehensive Set of <span className="text-blue-600">Advanced Features</span>
          </h2>
          <p className="text-gray-600">A deep dive into the tools and insights that will transform your financial management, enabling informed decision-making and empowering financial success.</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Multi-Account Integration */}
          <div className="bg-gray-50 rounded-2xl shadow p-8 flex flex-col gap-4">
            <h4 className="font-semibold text-lg mb-2">Multi-Account Integration</h4>
            <div className="flex-1">
              <img src="/landing/card-sample.png" alt="Card Integration" className="rounded-lg shadow" />
            </div>
            <p className="text-gray-600 mt-2">Add and manage all your cards and accounts in one place, with a secure and seamless experience.</p>
          </div>
          {/* Simplified Transaction Tracking */}
          <div className="bg-gray-50 rounded-2xl shadow p-8 flex flex-col gap-4">
            <h4 className="font-semibold text-lg mb-2">Simplified Transaction Tracking</h4>
            <div className="flex-1">
              <img src="/landing/transaction-history.png" alt="Transaction History" className="rounded-lg shadow" />
            </div>
            <p className="text-gray-600 mt-2">Track all your transactions and finances in a single view, helping you understand where your money is going.</p>
          </div>
        </div>

        {/* Streamlined Budgeting & Savings */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-gray-50 rounded-2xl shadow p-8 flex flex-col gap-4">
            <h4 className="font-semibold text-lg mb-2">Streamlined Budgeting</h4>
            <img src="/landing/budget.png" alt="Budgeting" className="rounded-lg shadow" />
            <p className="text-gray-600 mt-2">Achieve your savings goals faster with advanced budgeting tools, insightful reports, and spending analysis.</p>
          </div>
          <div className="bg-blue-100 rounded-2xl shadow p-8 flex flex-col gap-4 items-center justify-center text-center">
            <h4 className="font-semibold text-lg mb-2">Feel the next level of financing app with Finanzen</h4>
            <Button className="bg-blue-600 text-white mt-4 px-8 py-3 text-lg rounded-xl" onClick={() => navigate("/signup")}>
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Partners/Clients Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 flex flex-wrap items-center justify-center gap-8 grayscale">
        {partners.map((partner) => (
          <span key={partner} className="text-2xl font-extrabold text-gray-400 opacity-80">{partner}</span>
        ))}
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-white" id="pricing">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span className="uppercase text-blue-600 font-bold text-xs mb-2 tracking-widest">Pricing</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-gray-900">
            Customize Your Financial Destiny with <span className="text-blue-600">Transparent Pricing Plans</span>
          </h2>
          <p className="text-gray-600">Explore a diverse range of pricing options tailored to your financial goals and achieve unprecedented control over your prosperity.</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl shadow-lg p-8 flex flex-col items-center bg-white border-2 ${
                plan.highlighted
                  ? "border-blue-600 scale-105 z-10"
                  : "border-gray-100"
              }`}
            >
              {plan.tag && (
                <span className="mb-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                  {plan.tag}
                </span>
              )}
              <h3 className="font-bold text-xl mb-2">{plan.name}</h3>
              <div className="text-4xl font-extrabold mb-2 text-blue-700">{plan.price}</div>
              <div className="text-gray-400 mb-4">{plan.period}</div>
              <ul className="mb-6 text-gray-600 space-y-2 text-center">
                {plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <Button
                className={`w-full px-6 py-2 rounded-xl ${plan.highlighted ? "bg-blue-600 text-white" : "bg-gray-100 text-blue-700"}`}
                onClick={() => navigate("/signup")}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto px-6 py-20" id="testimonials">
        <div className="text-center mb-10">
          <span className="uppercase text-blue-600 font-bold text-xs mb-2 tracking-widest">Showcasing</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-gray-900">
            Showcasing Remarkable <span className="text-blue-600">Success Stories by Our Users</span>
          </h2>
          <p className="text-gray-600">Highlighting the extraordinary achievements and inspirational transformations experienced by our cherished users.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-blue-100" />
              <h4 className="font-bold text-lg">{t.name}</h4>
              <p className="text-xs text-gray-400 mb-1">{t.title}</p>
              <div className="flex items-center mb-2">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} width="18" height="18" fill="#FFD700" className="inline-block"><polygon points="9,1 11,7 17,7 12,11 14,17 9,13 4,17 6,11 1,7 7,7" /></svg>
                ))}
              </div>
              <p className="text-gray-600 text-center">{t.review}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Experience the Future of Money Management
          </h2>
          <p className="text-white/80 mb-8">
            Your ultimate partner in comprehensive money control and financial mastery. Propel yourself towards prosperity and security!
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl" onClick={() => navigate("/signup")}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/60 font-semibold px-8 py-3 rounded-xl" onClick={() => navigate("/demo")}>
              Try Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 mt-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <div className="flex items-center gap-2 mb-3 md:mb-0">
            <span className="font-extrabold text-lg text-gray-900">Finanzen</span>
            <span className="text-gray-400 text-sm">&copy; Finanzen 2023. All Rights Reserved</span>
          </div>
          <nav className="flex gap-6 text-gray-500 text-sm">
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#services" className="hover:text-blue-600">Services</a>
            <a href="#contact" className="hover:text-blue-600">Contact Us</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}