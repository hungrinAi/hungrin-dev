import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart2, 
  Megaphone, 
  Users, 
  Package, 
  Settings, 
  CreditCard,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Logo } from '../Logo';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Megaphone, label: 'Campaigns', path: '/campaigns' },
  { icon: BarChart2, label: 'Insights', path: '/insights' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: Package, label: 'Orders', path: '/orders' },
  { icon: CreditCard, label: 'Billing', path: '/billing' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-white border-r border-border-light flex flex-col py-6 shrink-0">
      <div className="px-6 mb-8">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all border-l-4",
                isActive 
                  ? "bg-g-pale text-g-dark border-g-dark" 
                  : "text-text-mid border-transparent hover:bg-g-faint hover:text-g-dark"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-auto">
        <Link 
          to="/demo" 
          className="w-full bg-g-dark text-white py-3 rounded-xl font-semibold text-sm text-center block hover:bg-g-mid transition-all"
        >
          Book Demo
        </Link>
      </div>
    </aside>
  );
};
