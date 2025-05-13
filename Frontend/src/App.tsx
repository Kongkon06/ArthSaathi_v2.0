import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/Home";
import Budget from "./pages/Budget";
import Expenses from "./pages/Expenses";
import Learn from "./pages/Learn";
import Investment from "./pages/Investment";
import Accounts from "./pages/Accounts";
import Settings from "./pages/Settings";

const App = () => {
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
            <Route path="/budget" element={<Budget />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </>
      ) : (
        <div className="min-h-screen flex bg-white lg:bg-[#F3F3F3]">
          <Sidebar
            isExpanded={isSidebarExpanded}
            toggleSidebar={toggleSidebar}
          />
          <div
            className={`flex ${
              isSidebarExpanded ? "ml-[270px]" : "ml-24"
            } lg:bg-[#F3F3F3] bg-white transition-all duration-300`}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/budget" element={<Budget />} />
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

export default App;
