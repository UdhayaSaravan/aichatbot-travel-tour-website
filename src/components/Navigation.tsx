
import React from 'react';
import { Home, Info, Wrench, LogIn } from 'lucide-react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <NavigationMenu className="w-full bg-white shadow-sm">
      <NavigationMenuList className="flex justify-center space-x-8 py-4">
        <NavigationMenuItem>
          <Link to="/" className="flex flex-col items-center hover:text-primary-accent transition-colors">
            <Home className="mb-1" />
            <span className="text-sm">Home</span>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/about" className="flex flex-col items-center hover:text-primary-accent transition-colors">
            <Info className="mb-1" />
            <span className="text-sm">About Us</span>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/services" className="flex flex-col items-center hover:text-primary-accent transition-colors">
            <Wrench className="mb-1" />
            <span className="text-sm">Services</span>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/login" className="flex flex-col items-center hover:text-primary-accent transition-colors">
            <LogIn className="mb-1" />
            <span className="text-sm">Login</span>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
