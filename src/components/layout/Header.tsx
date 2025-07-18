import { Clover, Leaf, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export const Header = ({ onMenuClick, showMenuButton = false }: HeaderProps) => {
  const { agent, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <header className="bg-card border-b border-border shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
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
              <img src="/apple-touch-icon.png" alt="Klima360" className="h-8 w-8" />
              <span className="text-xl font-bold text-primary">Klima360</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && agent ? (
              <>
                <div className="hidden sm:block text-sm text-muted-foreground">
                  Welcome, <span className="font-medium text-foreground">{agent.name}</span>
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