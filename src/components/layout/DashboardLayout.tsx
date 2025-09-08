import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header onMenuClick={toggleMobileMenu} showMenuButton={true} />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 h-[calc(100vh-73px)] bg-card border-r border-border sticky top-[73px]">
          <div className="flex-1 p-6">
            <Navigation />
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
            <div className="fixed left-0 top-0 h-full w-80 bg-card border-r border-border">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-semibold">Navigation</h2>
                <Button variant="ghost" size="sm" onClick={closeMobileMenu}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-6">
                <Navigation onItemClick={closeMobileMenu} />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};