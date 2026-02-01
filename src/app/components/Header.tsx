import { Button } from "@/app/components/ui/button";
import { GraduationCap, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";

interface HeaderProps {
  showAuth?: boolean;
  showUserMenu?: boolean;
}

export default function Header({ showAuth = false, showUserMenu = false }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-blue-900">
            Visa Agency Marketplace
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {showAuth && (
            <>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/login-type-selection")}
                className="font-semibold"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate("/role-selection")}
                className="bg-blue-800 hover:bg-blue-900 font-semibold"
              >
                Get Started
              </Button>
            </>
          )}
          
          {showUserMenu && (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarFallback className="bg-blue-800 text-white font-semibold">
                        AJ
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <p className="font-semibold">Alex Johnson</p>
                      <p className="text-xs text-gray-600">alex.j@email.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/apply-visa")}>
                    My Applications
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/")} className="text-red-600">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
}