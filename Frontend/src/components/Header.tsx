import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
              <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full"></div>
              </div>
            </div>
            <span className="font-semibold text-xl text-gray-900">ArthSaathi</span>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#features" 
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:text-gray-900 font-medium px-4 py-2 h-auto"
                  )}
                >
                  Features
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#OurMission" 
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:text-gray-900 font-medium px-4 py-2 h-auto"
                  )}
                >
                  Mission
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#Testimonial" 
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:text-gray-900 font-medium px-4 py-2 h-auto"
                  )}
                >
                  Testimonial
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#Contact" 
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-50 focus:text-gray-900 font-medium px-4 py-2 h-auto"
                  )}
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium px-4 py-2 h-auto"
               onClick={() => {

                // Handle sign in - this could trigger a modal or redirect

                window.location.href = '/dashboard';

              }}
            >
              Sign In
            </Button>
            <Button 
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-4 py-2 h-auto rounded-md shadow-sm"
                onClick={() => {

                // Handle sign up - this could trigger a modal or redirect

                window.location.href = '/dashboard';

              }}
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-lg">
            <nav className="flex flex-col space-y-1 p-4">
              <a 
                href="#features" 
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 py-3 px-3 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#OurMission" 
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 py-3 px-3 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Mission
              </a>
              <a 
                href="#Testimonial" 
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 py-3 px-3 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonial
              </a>
              <a 
                href="#Contact" 
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 py-3 px-3 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="pt-4 space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium justify-start"
                    onClick={() => {

                    window.location.href = '/dashboard';

                    setIsMenuOpen(false);

                  }}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium"
                   onClick={() => {

                    window.location.href = '/dashboard';

                    setIsMenuOpen(false);

                  }}
                >
                  Sign Up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;