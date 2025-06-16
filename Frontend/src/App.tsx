import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// Landing page components
import Landingpage from "./pages/Landingpage";
import NotFound from "./pages/NotFound";

// Main app components
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";
import Learn from "./pages/Learn";
import Investment from "./pages/Investment";
import Accounts from "./pages/Accounts";
import Settings from "./pages/settings/Settings";

const queryClient = new QueryClient();

// Main App Layout Component
const AppLayout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div>
      {isMobile ? (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </>
      ) : (
        <div className="w-full min-h-screen flex bg-white lg:bg-[#F3F3F3]">
          <Sidebar
            isExpanded={isSidebarExpanded}
            toggleSidebar={toggleSidebar}
          />
          <div
            className={`flex w-full ${
              isSidebarExpanded ? "ml-[270px]" : "ml-24"
            } lg:bg-[#F3F3F3] bg-white transition-all duration-300`}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/investment" element={<Investment />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

// Authentication state management
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on app load
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleSignIn = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };


  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Landing page route */}
          <Route 
            path="/landing" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Landingpage onSignIn={handleSignIn} />
            } 
          />
          
          {/* Main app routes */}
          <Route 
            path="/dashboard/*" 
            element={
              isAuthenticated ? 
              <AppLayout /> : 
              <Navigate to="/landing" replace />
            } 
          />
          
          {/* Root redirect */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Navigate to="/landing" replace />
            } 
          />
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;