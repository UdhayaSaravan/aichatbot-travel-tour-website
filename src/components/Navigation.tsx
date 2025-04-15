
import React from 'react';
import { Home, Info, Wrench, LogIn, Plane } from 'lucide-react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Link } from 'react-router-dom';

const Navigation = () => {
  // This is a simple mock of authentication state - in a real app, this would come from your auth provider
  const isLoggedIn = false;
  const userName = "John Doe"; // This would come from your auth state

  return (
    <NavigationMenu className="w-full bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Website name and logo on the left */}
        <Link to="/" className="flex items-center space-x-2 text-primary hover:text-primary-accent transition-colors">
          <Plane className="h-6 w-6" />
          <span className="text-xl font-semibold">VacationVibes</span>
        </Link>

        {/* Navigation items on the right */}
        <NavigationMenuList className="flex space-x-8">
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
            {isLoggedIn ? (
              <div className="flex items-center text-primary">
                <span className="text-sm">Welcome, {userName}</span>
              </div>
            ) : (
              <Link to="/login" className="flex flex-col items-center hover:text-primary-accent transition-colors">
                <LogIn className="mb-1" />
                <span className="text-sm">Login</span>
              </Link>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
};

export default Navigation;
