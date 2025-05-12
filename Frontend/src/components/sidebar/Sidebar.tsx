import { useState, useEffect } from "react";
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
  Plus, 
  LogOut, 
  FileText,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { cn } from "../../lib/utils";


const Sidebar = ({ isExpanded, toggleSidebar }:any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);

  // Close submenu when sidebar is collapsed
  useEffect(() => {
    if (!isExpanded) {
      setActiveSubmenu(null);
    }
  }, [isExpanded]);

  const toggleSubmenu = (e:any, menuName:any) => {
    e.stopPropagation();
    setActiveSubmenu(activeSubmenu === menuName ? null : menuName);
  };

  const menuItems = [
    {
      name: "Home",
      icon: <Home size={20} />,
      link: "/",
    },
    {
      name: "Accounts",
      icon: <Users size={20} />,
      link: "/accounts",
      hasSubmenu: true,
      submenuItems: [
        { name: "All Accounts", link: "/all-account", icon: <FileText size={16} /> },
        {
          name: "Add New Account",
          link: "/add-new-account",
          icon: <Plus size={16} />,
          accent: true,
        },
      ],
    },
    {
      name: "Budget",
      icon: <CircleDollarSign size={20} />,
      link: "/budget",
    },
    {
      name: "Expenses",
      icon: <HandCoins size={20} />,
      link: "/expenses",
    },
    {
      name: "Investments",
      icon: <Bitcoin size={20} />,
      link: "/investment",
    },
    {
      name: "Learn",
      icon: <BookOpen size={20} />,
      link: "/learn",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      link: "/settings",
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative h-full">
      <motion.div
        initial={{ width: isExpanded ? 280 : 80 }}
        animate={{ width: isExpanded ? 280 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-sm flex flex-col"
      >
        {/* Sidebar Header with Toggle */}
        <div className="p-4 flex items-center justify-between">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="font-bold text-lg text-slate-900 dark:text-white"
            >
              Arth<span className="text-blue-600">Saathi</span>
            </motion.div>
          )}
          <button
            onClick={toggleSidebar}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors",
              !isExpanded && "mx-auto"
            )}
          >
            {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        {/* User Profile */}
        <div className={cn("p-4", !isExpanded && "flex justify-center")}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://image.lexica.art/full_webp/0141d1f8-c79e-45da-8644-08f40a167e2f"
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="font-medium text-sm text-slate-900 dark:text-white">Deepmoina</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[160px]">
                  deepmoina34@gmail.com
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className={cn("px-4 mb-2", !isExpanded && "flex justify-center")}>
          {isExpanded ? (
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ) : (
            <button className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Search size={18} />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="flex-grow overflow-y-auto px-2 py-2 space-y-1">
          {filteredMenuItems.map((item:any) => {
            const isActiveParent =
              location.pathname === item.link ||
              (item.hasSubmenu &&
                item.submenuItems?.some(
                  (subItem:any) => location.pathname === subItem.link
                ));

            return (
              <div key={item.name}>
                <div
                  className="relative"
                  onMouseEnter={() => !isExpanded && setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    onClick={() => navigate(item.link)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                      isActiveParent 
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium" 
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
                      !isExpanded && "justify-center"
                    )}
                  >
                    <span className={cn(
                      "flex-shrink-0",
                      isActiveParent && "text-blue-600 dark:text-blue-400"
                    )}>
                      {item.icon}
                    </span>
                    
                    {isExpanded && (
                      <span className="text-sm flex-grow">{item.name}</span>
                    )}
                    
                    {isExpanded && item.hasSubmenu && (
                      <button
                        onClick={(e) => toggleSubmenu(e, item.name)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {activeSubmenu === item.name ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>
                    )}
                  </button>

                  {/* Tooltip for collapsed sidebar */}
                  {!isExpanded && hoveredItem === item.name && (
                    <div className="absolute left-full ml-2 z-10 bg-white dark:bg-slate-800 shadow-md rounded-md px-3 py-1.5 text-sm whitespace-nowrap">
                      {item.name}
                    </div>
                  )}

                  {/* Submenu */}
                  <AnimatePresence>
                    {isExpanded && activeSubmenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-9 pr-2 py-1 space-y-1">
                          {item.submenuItems?.map((subItem:any) => (
                            <Link
                              key={subItem.name}
                              to={subItem.link}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                                location.pathname === subItem.link
                                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
                                subItem.accent && "text-blue-600 dark:text-blue-400"
                              )}
                            >
                              <span className={cn(
                                subItem.accent && "text-blue-600 dark:text-blue-400"
                              )}>
                                {subItem.icon}
                              </span>
                              <span>{subItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-slate-200 dark:border-slate-800 p-4">
          <button
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors",
              !isExpanded && "justify-center"
            )}
          >
            <LogOut size={20} />
            {isExpanded && <span className="text-sm font-medium">Logout</span>}
          </button>
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