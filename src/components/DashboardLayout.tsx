import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Plane, Bookmark, MessageSquare, User, Sun, Moon } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import CopilotPanel from '../components/CopilotPanel';
import { useEffect, useState } from 'react';

export default function DashboardLayout() {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('light') ? false : true;
  });

  useEffect(() => {
    const isLight = localStorage.getItem('theme') === 'light';
    if (isLight) {
      setIsDark(false);
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const mobileNavItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: Plane, label: 'Trips', path: '/dashboard/trips' },
    { icon: Bookmark, label: 'Saved', path: '/dashboard/saved' },
    { icon: MessageSquare, label: 'Copilot', path: '/dashboard/copilot' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
  ];

  return (
    <div className="flex h-screen bg-tertiary text-secondary overflow-hidden selection:bg-primary/30">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col relative pb-16 lg:pb-0">
        {/* Mobile Top Bar */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-neutral-light bg-tertiary/90 backdrop-blur-md z-40 sticky top-0">
          <div className="flex items-center space-x-2">
            <Plane className="w-5 h-5 text-primary" />
            <span className="font-serif font-medium tracking-wide">TripCo</span>
          </div>
          <button onClick={toggleTheme} className="text-secondary/60 hover:text-primary transition-colors p-2 rounded-full hover:bg-neutral/50">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
        
        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 w-full bg-neutral/90 backdrop-blur-md border-t border-neutral-light flex items-center justify-around px-2 py-3 z-50">
          {mobileNavItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => 
                `flex flex-col items-center justify-center space-y-1 w-14 transition-colors ${
                  isActive ? 'text-primary' : 'text-secondary/50 hover:text-secondary'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium truncate w-full text-center">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </main>
      <CopilotPanel />
    </div>
  );
}
