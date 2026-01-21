import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, FileText, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'home', label: 'Início', icon: Home, route: '/home' },
  { id: 'search', label: 'Busca', icon: Search, route: '/search' },
  { id: 'orders', label: 'Pedidos', icon: FileText, route: '/orders' },
  { id: 'profile', label: 'Perfil', icon: User, route: '/auth' },
];

export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (route: string) => {
    if (route === '/home') {
      return location.pathname === '/home' || location.pathname.startsWith('/restaurant/') && !location.pathname.includes('dashboard');
    }
    return location.pathname === route || location.pathname.startsWith(route);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border safe-bottom z-50">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const active = isActive(item.route);
          return (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.route)}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <item.icon
                  className={cn(
                    "w-6 h-6 transition-colors",
                    active ? "text-primary" : "text-muted-foreground"
                  )}
                />
                {item.id === 'orders' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-1 transition-colors",
                  active ? "text-primary font-medium" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
