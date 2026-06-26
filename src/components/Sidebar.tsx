import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Plane, Bookmark, MessageSquare, Image, Settings, Sun, Moon, User as UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const { user } = useAuth();
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

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Plane, label: 'My Trips', path: '/dashboard/trips' },
    { icon: Bookmark, label: 'Saved', path: '/dashboard/saved' },
    { icon: MessageSquare, label: 'Copilot', path: '/dashboard/copilot' },
    { icon: Image, label: 'Memories', path: '/dashboard/memories' },
  ];

  return (
    <div className="w-64 bg-tertiary border-r border-neutral h-screen sticky top-0 flex flex-col pt-6 hidden lg:flex">
      <div className="px-6 mb-10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-neutral flex items-center justify-center">
            <Plane className="w-4 h-4 text-primary" />
          </div>
          <span className="text-xl font-serif tracking-wide font-medium">TripCo</span>
        </div>
        <button onClick={toggleTheme} className="text-secondary/60 hover:text-primary transition-colors p-2 rounded-full hover:bg-neutral/50">
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto hide-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => 
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-neutral text-primary font-medium shadow-sm' 
                  : 'text-secondary/60 hover:text-secondary hover:bg-neutral/50'
              }`
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) => 
            `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              isActive 
                ? 'bg-neutral text-primary font-medium shadow-sm' 
                : 'text-secondary/60 hover:text-secondary hover:bg-neutral/50'
            }`
          }
        >
          <UserIcon className="w-5 h-5 shrink-0" />
          <span className="text-sm">Profile</span>
        </NavLink>
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) => 
            `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              isActive 
                ? 'bg-neutral text-primary font-medium shadow-sm' 
                : 'text-secondary/60 hover:text-secondary hover:bg-neutral/50'
            }`
          }
        >
          <Settings className="w-5 h-5 shrink-0" />
          <span className="text-sm">Settings</span>
        </NavLink>
        
        {/* User Profile Mini */}
        <div className="mt-4 flex items-center space-x-3 px-4 py-3 border-t border-neutral pt-6">
          <div className="w-8 h-8 rounded-full bg-neutral-light overflow-hidden flex items-center justify-center shrink-0">
            {user?.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="User" />
            ) : (
              <UserIcon className="w-4 h-4 text-secondary/60" />
            )}
          </div>
          <div className="flex flex-col truncate">
            <span className="text-sm font-medium truncate">{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Guest'}</span>
            <span className="text-xs text-secondary/40">{user ? 'Member' : 'Not signed in'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
