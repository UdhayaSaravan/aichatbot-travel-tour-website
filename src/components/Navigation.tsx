
import React from 'react';
import { Home, Info, List, LogIn, Plane, User } from 'lucide-react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const { isLoggedIn, userEmail, setIsLoggedIn, setUserEmail } = useUser();
  const emailInitial = userEmail ? userEmail[0].toUpperCase() : '';
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    navigate('/');
  };

  const navigateToAccount = () => {
    navigate('/account');
  };

  return (
    <NavigationMenu className="w-full bg-primary/10 shadow-sm fixed top-0 left-0 z-50">
      <div className="w-full container mx-auto flex justify-end items-center py-4">
        <Link to="/" className="mr-auto flex items-center space-x-2 text-primary hover:text-primary-accent transition-colors">
          <Plane className="h-6 w-6" />
          <span className="text-xl font-semibold">VacationVibes</span>
        </Link>

        <NavigationMenuList className="flex items-center space-x-6 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md ml-4">
          <NavigationMenuItem>
            <Link to="/" className="flex items-center hover:text-primary-accent transition-colors">
              <Home className="mr-2" />
              <span>Home</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/services" className="flex items-center hover:text-primary-accent transition-colors">
              <List className="mr-2" />
              <span>Services</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/about" className="flex items-center hover:text-primary-accent transition-colors">
              <Info className="mr-2" />
              <span>About Us</span>
            </Link>
          </NavigationMenuItem>

          {isLoggedIn ? (
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {emailInitial}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={navigateToAccount}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem>
              <Link to="/login" className="flex items-center hover:text-primary-accent transition-colors">
                <LogIn className="mr-2" />
                <span>Login</span>
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
};

export default Navigation;
