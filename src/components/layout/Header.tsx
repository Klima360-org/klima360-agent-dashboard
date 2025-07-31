import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

interface HeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export const Header = ({
  onMenuClick,
  showMenuButton = false,
}: HeaderProps) => {
  const { agent, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <header className="bg-card border-b border-border shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showMenuButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMenuClick}
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}

            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="Logo"
                className="w-20 h-full object-cover logo"
              />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && agent ? (
              <>
                <div className="hidden sm:block text-sm text-muted-foreground">
                  Welcome,{" "}
                  <span className="font-medium text-foreground">
                    {agent.name}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : isLanding ? (
              <Link to="/login">
                <Button variant="default" size="sm">
                  Agent Login
                </Button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};
