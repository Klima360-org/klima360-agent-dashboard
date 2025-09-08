import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useClerk, useUser, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import logo from "@/assets/logo.png";

interface HeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export const Header = ({
  onMenuClick,
  showMenuButton = false,
}: HeaderProps) => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === "/";

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <header className="bg-card/75 border-b border-border shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left side */}
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

          {/* Right side */}
          <div className="flex items-center gap-4">
            <SignedIn>
              <div className="hidden sm:block text-sm text-muted-foreground">
                Welcome,{" "}
                <span className="font-medium text-foreground">
                  {user?.firstName || user?.username || "Agent"}
                </span>
              </div>
              <UserButton/>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </SignedIn>

            <SignedOut>
              {isLanding && (
                <Link to="/login">
                  <Button variant="default" size="sm">
                    Agent Login
                  </Button>
                </Link>
              )}
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
};
