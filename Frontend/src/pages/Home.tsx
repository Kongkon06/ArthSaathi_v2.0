import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { CartesianGrid, XAxis } from "recharts";
import { Area, AreaChart } from "recharts";
import { useState, useRef, useEffect } from "react";

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

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const cards = [
  {
    id: 1,
    title: "Total Blance",
    blance: "₹ 1,00,000",
    month: "+ 10% ",
  },
  {
    id: 2,
    title: "Monthly Expenses",
    blance: "₹ 40,000",
    month: "- 2.5% ",
  },
  {
    id: 3,
    title: "Monthly Investment",
    blance: "₹ 2,000",
    month: "+ 15.8% ",
  },
  {
    id: 4,
    title: "Swing Rate",
    blance: "₹ 400",
    month: "+ 20.5% ",
  },
];

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  // ... rest of chart data ...
  { date: "2024-06-30", desktop: 446, mobile: 400 },
];

// Sample AI responses for the chat
const sampleResponses = [
  "Based on your spending patterns, you could save ₹5,000 more per month by reducing discretionary expenses.",
  "Your investment portfolio is showing healthy growth. Consider increasing your SIP by ₹500 to maximize returns.",
  "I notice your emergency fund is below the recommended 6-month expenses. Would you like me to suggest a savings plan?",
  "Your mutual fund investments are performing well! The Growth Plus Equity Fund has given 12% returns in the last year.",
  "Based on your financial goals, you're on track to reach your house down payment target by December 2025."
];

// Chat message component
const ChatMessage : React.FC<ChatMessageProps> = ({ message, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
    <div className="flex items-start gap-2.5 max-w-[80%]">
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8"></path>
            <rect width="16" height="12" x="4" y="8" rx="2"></rect>
            <path d="M2 14h2"></path>
            <path d="M20 14h2"></path>
            <path d="M15 13v2"></path>
            <path d="M9 13v2"></path>
          </svg>
        </div>
      )}
      <div className={`p-3 rounded-lg ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
        <p className="text-sm">{message}</p>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
          <span className="text-xs font-medium">SG</span>
        </div>
      )}
    </div>
  </div>
);

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Investment",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
};

// AI Chat Component
const AIChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi Sourabh! I'm your AI financial assistant. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);
  
  const handleSendMessage = () => {
    if (input.trim() === "") return;
    
    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput("");
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    handleSendMessage();
  }
};
  
  if (!isOpen) {
    return (
      <Button 
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50 flex items-center justify-center"
        onClick={() => setIsOpen(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8V4H8"></path>
          <rect width="16" height="12" x="4" y="8" rx="2"></rect>
          <path d="M2 14h2"></path>
          <path d="M20 14h2"></path>
          <path d="M15 13v2"></path>
          <path d="M9 13v2"></path>
        </svg>
      </Button>
    );
  }
  
  return (
    <Card className="fixed bottom-6 right-6 w-80 md:w-96 shadow-xl z-50 border border-gray-200">
      <CardHeader className="p-4 pb-2 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8V4H8"></path>
                <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                <path d="M2 14h2"></path>
                <path d="M20 14h2"></path>
                <path d="M15 13v2"></path>
                <path d="M9 13v2"></path>
              </svg>
            </div>
            <div>
              <CardTitle className="text-md">ArthSaathi AI</CardTitle>
              <CardDescription className="text-xs">Financial Assistant</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-80 overflow-y-auto p-4 pt-3">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.text} isUser={message.isUser} />
        ))}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="p-4 pt-2 border-t">
        <div className="relative w-full flex items-center">
          <Input
            placeholder="Ask about your finances..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pr-10 rounded-full"
          />
          <Button 
            onClick={handleSendMessage} 
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full p-0"
            disabled={input.trim() === ""}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"></path>
              <path d="M22 2 11 13"></path>
            </svg>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

function Home() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  const [timeRange, setTimeRange] = React.useState("90d");

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
    <div className="m-4">
      {/* Greeting Section */}
      <div className="flex flex-col items-start gap-1">
        <p className="text-[24px] font-medium text-[#393939]">
          Hello Sourabh Ghosh!
        </p>
        <p className="text-[16px] text-[#4B4B4B]">
          Every small step brings you closer to your big dreams.
        </p>
      </div>
      
      {/* Cards Section */}
      <div className="mt-4">
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr", // 1 column on extra-small screens
              sm: "1fr 1fr", // 2 columns on small screens
              md: "1fr 1fr 1fr 1fr", // 3 columns on medium screens and above
            },
            gap: 4,
          }}
        >
          {cards.map((card, index) => (
            <Card
              key={card.id}
              style={{
                transition: "0.3s",
                transform: "scale(1)",
                boxShadow: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 15px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <CardActionArea
                onClick={() => setSelectedCard(index)}
                data-active={selectedCard === index ? "" : undefined}
                sx={{
                  height: "100%",
                  "&[data-active]": {
                    backgroundColor: "action.selected",
                    "&:hover": {
                      backgroundColor: "action.selectedHover",
                    },
                  },
                }}
              >
<Box sx={{ width: "100%", gap: 2, display: "flex", flexDirection: "column" }}>
  <Typography variant="h5" component="div">
    <div className="mt-2">{card.title}</div>
  </Typography>
  <Typography variant="h5" color="text.secondary">
    <div className="font-bold text-3xl">{card.blance}</div>
  </Typography>
  <Typography variant="body2" color="text.secondary">
    <div className="text-sm">{card.month} from last month</div>
  </Typography>
</Box>

              </CardActionArea>
            </Card>
          ))}
        </Box>
      </div>

      {/* Chart Section */}
      <div className="mt-4">
        <div className="border border-gray-200 rounded-lg">
          <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
              <div className="grid flex-1 gap-1 text-center sm:text-left">
                <CardTitle>Area Chart - Interactive</CardTitle>
                <CardDescription>
                  Showing total visitors for the last 3 months
                </CardDescription>
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger
                  className="w-[160px] rounded-lg sm:ml-auto"
                  aria-label="Select a value"
                >
                  <SelectValue placeholder="Last 3 months" />
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
                className="aspect-auto h-[250px] w-full"
              >
                <AreaChart data={filteredData}>
                  <defs>
                    <linearGradient
                      id="fillDesktop"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--color-desktop)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-desktop)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-mobile)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-mobile)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
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
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => {
                          return new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          });
                        }}
                        indicator="dot"
                      />
                    }
                  />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="url(#fillMobile)"
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="url(#fillDesktop)"
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* AI Chatbox Component */}
      <AIChatBox />
    </div>
  );
}

export default Home;