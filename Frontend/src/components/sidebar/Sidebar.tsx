import { useState, useEffect, useRef, useCallback, type JSX } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Users, 
  CircleDollarSign, 
  HandCoins, 
  Bitcoin, 
  BookOpen, 
  Settings, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  FileText,
  ChevronDown,
  X,
  Bell,
  Moon,
  Sun,
  User,
 // CreditCard,
  TrendingUp,
  PieChart,
  Calendar,
  HelpCircle
} from "lucide-react";
import { cn } from "../../lib/utils";

interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

interface MenuItem {
  id: string;
  name: string;
  icon: JSX.Element;
  link: string;
  hasSubmenu?: boolean;
  submenuItems?: SubMenuItem[];
  badge?: string;
  disabled?: boolean;
}

interface SubMenuItem {
  name: string;
  link: string;
  icon: JSX.Element;
  accent?: boolean;
  badge?: string;
}

const Sidebar = ({ isExpanded, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close submenu when sidebar is collapsed
  useEffect(() => {
    if (!isExpanded) {
      setActiveSubmenu(null);
      setShowUserMenu(false);
    }
  }, [isExpanded]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        if (isExpanded && searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
      // Escape to close search or menus
      if (event.key === 'Escape') {
        setSearchQuery("");
        setActiveSubmenu(null);
        setShowUserMenu(false);
        searchInputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);


  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
    // You can implement actual dark mode logic here
    document.documentElement.classList.toggle('dark');
  }, []);

  const handleLogout = useCallback(() => {
    // Implement logout logic here
    console.log('Logging out...');
    navigate('/login');
  }, [navigate]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const menuItems: MenuItem[] = [
    {
      id: "home",
      name: "Dashboard",
      icon: <Home size={20} />,
      link: "/",
    },
    {
      id: "accounts",
      name: "Accounts",
      icon: <Users size={20} />,
      link: "/accounts",
      hasSubmenu: true,
      submenuItems: [
        { 
          name: "All Accounts", 
          link: "/accounts", 
          icon: <FileText size={16} />,
          badge: "3"
        },

        {
          name: "Account Settings",
          link: "/account-settings",
          icon: <Settings size={16} />,
        },
      ],
    },
    {
      id: "budget",
      name: "Budget",
      icon: <CircleDollarSign size={20} />,
      link: "/budget",
      badge: "New",
    },
    {
      id: "expenses",
      name: "Expenses",
      icon: <HandCoins size={20} />,
      link: "/expenses",
    },
    {
      id: "investments",
      name: "Investments",
      icon: <Bitcoin size={20} />,
      link: "/investment",
      hasSubmenu: true,
      submenuItems: [
        { 
          name: "Advisor", 
          link: "/investment", 
          icon: <PieChart size={16} /> 
        },
        { 
          name: "Analytics", 
          link: "/analytics", 
          icon: <TrendingUp size={16} /> 
        }
        
      ],
    },
    {
      id: "calendar",
      name: "Calendar",
      icon: <Calendar size={20} />,
      link: "/calendar",
    },
    {
      id: "learn",
      name: "Learning Hub",
      icon: <BookOpen size={20} />,
      link: "/learn",
    },
    {
      id: "help",
      name: "Help & Support",
      icon: <HelpCircle size={20} />,
      link: "/help",
    },
    {
      id: "settings",
      name: "Settings",
      icon: <Settings size={20} />,
      link: "/settings",
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.submenuItems?.some(subItem => 
      subItem.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  };

  const contentVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 }
  };

  return (
    <div className="relative h-full">
      <motion.div
        variants={sidebarVariants}
        animate={isExpanded ? "expanded" : "collapsed"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed h-full bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border-r border-slate-200 dark:border-slate-800 shadow-lg flex flex-col backdrop-blur-sm"
      >
        {/* Sidebar Header with Toggle */}
        <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                transition={{ delay: 0.1 }}
                className="font-bold text-lg text-slate-900 dark:text-white"
              >
                Arth<span className="text-blue-600 dark:text-blue-400">Saathi</span>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            onClick={toggleSidebar}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md",
              !isExpanded && "mx-auto"
            )}
          >
            {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </motion.button>
        </div>

        {/* User Profile */}
        <div className={cn("p-4 relative", !isExpanded && "flex justify-center")}>
          <div 
            className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-2 transition-colors"
            onClick={() => isExpanded && setShowUserMenu(!showUserMenu)}
          >
            <div className="relative">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="https://image.lexica.art/full_webp/0141d1f8-c79e-45da-8644-08f40a167e2f"
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 shadow-sm"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  transition={{ delay: 0.2 }}
                  className="flex-1"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm text-slate-900 dark:text-white">Deepmoina</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                        deepmoina34@gmail.com
                      </p>
                    </div>
                    <ChevronDown size={16} className={cn(
                      "text-slate-400 transition-transform duration-200",
                      showUserMenu && "rotate-180"
                    )} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu Dropdown */}
          <AnimatePresence>
            {isExpanded && showUserMenu && (
              <motion.div
                ref={userMenuRef}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-4 right-4 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-2 z-50"
              >
                <Link 
                  to="/profile" 
                  className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <User size={16} />
                  <span>View Profile</span>
                </Link>
                <button 
                  onClick={toggleDarkMode}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors w-full text-left"
                >
                  {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                <Link 
                  to="/notifications" 
                  className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Bell size={16} />
                  <span>Notifications</span>
                  <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Bar */}
        <div className={cn("px-4 mb-4", !isExpanded && "flex justify-center")}>
          {isExpanded ? (
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search... (Ctrl+K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-700 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ) : (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              <Search size={18} />
            </motion.button>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="flex-grow overflow-y-auto px-3 py-2 space-y-1 ">
          <AnimatePresence>
            {filteredMenuItems.map((item, index) => {
              const isActiveParent =
                location.pathname === item.link ||
                (item.hasSubmenu &&
                  item.submenuItems?.some(
                    (subItem) => location.pathname === subItem.link
                  ));

              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div
                    className="relative"
                    onMouseEnter={() => !isExpanded && setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <motion.button
                      onClick={() => {
                        if (item.hasSubmenu && isExpanded) {
                          setActiveSubmenu(activeSubmenu === item.id ? null : item.id);
                        } else {
                          navigate(item.link);
                        }
                      }}
                      whileHover={{ x: isExpanded ? 4 : 0 }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 relative overflow-hidden",
                        isActiveParent 
                          ? "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-600 dark:text-blue-400 font-medium shadow-sm border border-blue-200 dark:border-blue-800" 
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50",
                        !isExpanded && "justify-center",
                        item.disabled && "opacity-50 cursor-not-allowed"
                      )}
                      disabled={item.disabled}
                    >
                      <span className={cn(
                        "flex-shrink-0 transition-colors",
                        isActiveParent && "text-blue-600 dark:text-blue-400"
                      )}>
                        {item.icon}
                      </span>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            variants={contentVariants}
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            className="flex items-center justify-between flex-grow"
                          >
                            <span className="text-sm">{item.name}</span>
                            <div className="flex items-center gap-2">
                              {item.badge && (
                                <span className={cn(
                                  "px-2 py-0.5 text-xs rounded-full font-medium",
                                  item.badge === "New" 
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                                )}>
                                  {item.badge}
                                </span>
                              )}
                              {item.hasSubmenu && (
                                <motion.div
                                  animate={{ rotate: activeSubmenu === item.id ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronDown size={16} className="text-slate-400" />
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>

                    {/* Tooltip for collapsed sidebar */}
                    <AnimatePresence>
                      {!isExpanded && hoveredItem === item.name && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="absolute left-full ml-3 z-50 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-lg rounded-lg px-3 py-2 text-sm whitespace-nowrap"
                        >
                          {item.name}
                          {item.badge && (
                            <span className="ml-2 px-1.5 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submenu */}
                    <AnimatePresence>
                      {isExpanded && activeSubmenu === item.id && item.submenuItems && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pl-6 pr-2 py-2 space-y-1">
                            {item.submenuItems.map((subItem, subIndex) => (
                              <motion.div
                                key={subItem.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIndex * 0.05 }}
                              >
                                <Link
                                  to={subItem.link}
                                  className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 relative",
                                    location.pathname === subItem.link
                                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
                                    subItem.accent && "text-blue-600 dark:text-blue-400 font-medium"
                                  )}
                                >
                                  <span className={cn(
                                    "transition-colors",
                                    subItem.accent && "text-blue-600 dark:text-blue-400"
                                  )}>
                                    {subItem.icon}
                                  </span>
                                  <span className="flex-grow">{subItem.name}</span>
                                  {subItem.badge && (
                                    <span className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full">
                                      {subItem.badge}
                                    </span>
                                  )}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* No results message */}
          {filteredMenuItems.length === 0 && searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-8 text-center text-slate-500 dark:text-slate-400"
            >
              <Search size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No results found for "{searchQuery}"</p>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-slate-200 dark:border-slate-800 p-4">
          <motion.button
            onClick={handleLogout}
            whileHover={{ x: isExpanded ? 4 : 0 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium",
              !isExpanded && "justify-center"
            )}
          >
            <LogOut size={20} />
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="text-sm"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

Sidebar.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;