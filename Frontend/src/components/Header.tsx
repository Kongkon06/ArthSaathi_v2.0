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
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#6366f1]/10 via-[#8b5cf6]/10 to-[#a855f7]/10 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">AS</span>
            </div>
            <span className="font-display font-bold text-xl text-white">ArthSaathi</span>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#about" 
                  className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white/90 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white")}
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#features" 
                  className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white/90 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white")}
                >
                  Features
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#testimonials" 
                  className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white/90 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white")}
                >
                  Testimonials
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  href="#contact" 
                  className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white/90 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white")}
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="text-white border-white/30 hover:bg-white hover:text-[#6366f1] transition-all duration-200">
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gradient-to-r from-[#6366f1]/95 via-[#8b5cf6]/95 to-[#a855f7]/95 backdrop-blur-md border-b border-white/20 shadow-lg">
            <nav className="flex flex-col space-y-4 p-6">
              <a href="#about" className="text-white/90 hover:text-white transition-colors duration-200 py-2">About</a>
              <a href="#features" className="text-white/90 hover:text-white transition-colors duration-200 py-2">Features</a>
              <a href="#testimonials" className="text-white/90 hover:text-white transition-colors duration-200 py-2">Testimonials</a>
              <a href="#contact" className="text-white/90 hover:text-white transition-colors duration-200 py-2">Contact</a>
              <div className="pt-4">
                <Button variant="outline" className="w-full text-white border-white/30 hover:bg-white hover:text-[#6366f1]">
                  Sign In
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