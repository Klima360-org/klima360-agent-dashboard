import { Home, Users, UserPlus, BarChart3, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  {
    icon: Home,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: UserPlus,
    label: 'Add Farmer',
    href: '/farmer/register',
  },
  {
    icon: Users,
    label: 'My Farmers',
    href: '/farmers',
  },
  {
    icon: BarChart3,
    label: 'Analytics',
    href: '/analytics',
  },
];

interface NavigationProps {
  className?: string;
  onItemClick?: () => void;
}

export const Navigation = ({ className, onItemClick }: NavigationProps) => {
  const location = useLocation();

  return (
    <nav className={cn("space-y-2", className)}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={onItemClick}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};