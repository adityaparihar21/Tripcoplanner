import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Plane, Bookmark, MessageSquare, Image, Settings } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Plane, label: 'My Trips', path: '/dashboard/trips' },
    { icon: Bookmark, label: 'Saved', path: '/dashboard/saved' },
    { icon: MessageSquare, label: 'Copilot', path: '/dashboard/copilot' },
    { icon: Image, label: 'Memories', path: '/dashboard/memories' },
  ];

  return (
    <div className="w-64 bg-tertiary border-r border-neutral h-screen sticky top-0 flex flex-col pt-6 hidden lg:flex">
      <div className="px-6 mb-10 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-neutral flex items-center justify-center">
          <Plane className="w-4 h-4 text-primary" />
        </div>
        <span className="text-xl font-serif tracking-wide font-medium">TripCo</span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
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
          <div className="w-8 h-8 rounded-full bg-neutral-light overflow-hidden">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="User" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Alex Chen</span>
            <span className="text-xs text-secondary/40">Pro Member</span>
          </div>
        </div>
      </div>
    </div>
  );
}
