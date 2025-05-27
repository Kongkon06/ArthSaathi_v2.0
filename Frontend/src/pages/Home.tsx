import React, { useState, useRef, useEffect } from "react";
import { CartesianGrid, XAxis, YAxis } from "recharts";
import { Area, AreaChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  CreditCard, 
  PiggyBank, 
  BarChart3,
  MessageCircle,
  X,
  Send,
  Bot,
  User
} from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

interface FinancialCard {
  id: number;
  title: string;
  balance: string;
  change: string;
  changePercent: number;
  icon: React.ComponentType<any>;
  type: 'positive' | 'negative';
}

const cards: FinancialCard[] = [
  {
    id: 1,
    title: "Total Balance",
    balance: "₹1,00,000",
    change: "+ ₹9,091",
    changePercent: 10,
    icon: Wallet,
    type: 'positive'
  },
  {
    id: 2,
    title: "Monthly Expenses",
    balance: "₹40,000",
    change: "- ₹1,020",
    changePercent: -2.5,
    icon: CreditCard,
    type: 'negative'
  },
  {
    id: 3,
    title: "Monthly Investment",
    balance: "₹2,000",
    change: "+ ₹274",
    changePercent: 15.8,
    icon: PiggyBank,
    type: 'positive'
  },
  {
    id: 4,
    title: "Savings Rate",
    balance: "₹400",
    change: "+ ₹68",
    changePercent: 20.5,
    icon: BarChart3,
    type: 'positive'
  },
];

// Generate more realistic chart data
const generateChartData = () => {
  const data = [];
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-06-30');
  
  let currentInvestment = 15000;
  let currentExpenses = 35000;
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 7)) {
    // Add some realistic variance
    const investmentChange = (Math.random() - 0.5) * 2000;
    const expenseChange = (Math.random() - 0.5) * 3000;
    
    currentInvestment = Math.max(10000, currentInvestment + investmentChange);
    currentExpenses = Math.max(20000, currentExpenses + expenseChange);
    
    data.push({
      date: d.toISOString().split('T')[0],
      investment: Math.round(currentInvestment),
      expenses: Math.round(currentExpenses),
    });
  }
  
  return data;
};

const chartData = generateChartData();

// Enhanced AI responses with more context
const sampleResponses = [
  "Based on your spending patterns, you could save ₹5,000 more per month by reducing discretionary expenses like dining out and entertainment.",
  "Your investment portfolio is showing healthy growth of 15.8%! Consider increasing your SIP by ₹500 to maximize compound returns.",
  "I notice your emergency fund might be below the recommended 6-month expenses (₹2,40,000). Would you like me to create a savings plan?",
  "Great news! Your mutual fund investments are outperforming the market. The Growth Plus Equity Fund has delivered 12% returns this year.",
  "You're on track to reach your house down payment goal by December 2025. Keep up the excellent saving habits!",
  "Consider diversifying your portfolio with some debt funds to balance risk. Your current equity allocation seems high at 80%.",
  "Your monthly expenses have decreased by 2.5% - that's excellent cost management! This gives you room for higher investments."
];

// Enhanced Chat message component
const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className="flex items-start gap-3 max-w-[85%]">
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
          <Bot size={16} />
        </div>
      )}
      <div className={`p-3 rounded-2xl shadow-sm ${
        isUser 
          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md' 
          : 'bg-gray-50 border border-gray-100 rounded-bl-md'
      }`}>
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
          <User size={16} />
        </div>
      )}
    </div>
  </div>
);

const chartConfig = {
  investment: {
    label: "Investment",
    color: "hsl(217, 91%, 60%)",
  },
  expenses: {
    label: "Expenses", 
    color: "hsl(0, 84%, 60%)",
  },
};

// Enhanced AI Chat Component
const AIChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi Sourabh! I'm ArthSaathi, your AI financial assistant. I can help you analyze your spending, suggest investments, and optimize your financial goals. What would you like to know?", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);
  
  const handleSendMessage = () => {
    if (input.trim() === "") return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput("");
    setIsTyping(true);
    
    // Simulate realistic AI response delay
    setTimeout(() => {
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  if (!isOpen) {
    return (
      <Button 
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-xl z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle size={24} />
      </Button>
    );
  }
  
  return (
    <Card className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] shadow-2xl z-50 border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="p-4 pb-3 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot size={20} />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">ArthSaathi AI</CardTitle>
              <CardDescription className="text-blue-100 text-sm">
                Financial Assistant • Online
              </CardDescription>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(false)} 
            className="h-8 w-8 text-white hover:bg-white/20"
          >
            <X size={18} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-1" style={{ height: 'calc(100% - 140px)' }}>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.text} isUser={message.isUser} />
        ))}
        
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="flex items-start gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                <Bot size={16} />
              </div>
              <div className="bg-gray-50 border border-gray-100 p-3 rounded-2xl rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      
      <CardFooter className="p-4 border-t bg-gray-50 rounded-b-lg">
        <div className="relative w-full flex items-center">
          <Input
            placeholder="Ask about your finances..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pr-12 rounded-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage} 
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full p-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={input.trim() === "" || isTyping}
          >
            <Send size={14} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

function Home() {
  const [selectedCard, setSelectedCard] = useState(0);
  const [timeRange, setTimeRange] = useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4" >
      {/* Enhanced Greeting Section */}
      <div className="mb-8 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Hello Sourabh Ghosh! 👋
            </h1>
            <p className="text-lg text-gray-600">
              Every small step brings you closer to your big dreams.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              SG
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Card
              key={card.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm ${
                selectedCard === index 
                  ? 'ring-2 ring-blue-500 shadow-lg transform -translate-y-1' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedCard(index)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${
                    card.type === 'positive' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <IconComponent 
                      size={24} 
                      className={card.type === 'positive' ? 'text-green-600' : 'text-red-600'} 
                    />
                  </div>
                  <Badge 
                    variant={card.type === 'positive' ? 'default' : 'destructive'}
                    className="flex items-center gap-1"
                  >
                    {card.type === 'positive' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {Math.abs(card.changePercent)}%
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.balance}</p>
                  <p className={`text-sm flex items-center gap-1 ${
                    card.type === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.change} from last month
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enhanced Chart Section */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-6 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle className="text-xl font-bold">Financial Overview</CardTitle>
            <CardDescription className="text-base">
              Track your investment vs expenses over time
            </CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px] rounded-lg">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[350px] w-full"
          >
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillInvestment" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-investment)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-investment)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-expenses)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-expenses)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      });
                    }}
                    formatter={(value) => [`₹${value.toLocaleString()}`, ""]}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="expenses"
                type="monotone"
                fill="url(#fillExpenses)"
                stroke="var(--color-expenses)"
                strokeWidth={2}
                stackId="a"
              />
              <Area
                dataKey="investment"
                type="monotone"
                fill="url(#fillInvestment)"
                stroke="var(--color-investment)"
                strokeWidth={2}
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* AI Chatbox Component */}
      <AIChatBox />
    </div>
  );
}

export default Home;