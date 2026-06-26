import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Plane, Bookmark, MessageSquare } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import CopilotPanel from '../components/CopilotPanel';

export default function DashboardLayout() {
  const mobileNavItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: Plane, label: 'Trips', path: '/dashboard/trips' },
    { icon: Bookmark, label: 'Saved', path: '/dashboard/saved' },
    { icon: MessageSquare, label: 'Copilot', path: '/dashboard/copilot' },
  ];

  return (
    <div className="flex h-screen bg-tertiary text-secondary overflow-hidden selection:bg-primary/30">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col relative pb-16 lg:pb-0">
        <Outlet />
        
        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 w-full bg-neutral/90 backdrop-blur-md border-t border-neutral-light flex items-center justify-around px-2 py-3 z-50">
          {mobileNavItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => 
                `flex flex-col items-center justify-center space-y-1 w-16 transition-colors ${
                  isActive ? 'text-primary' : 'text-secondary/50 hover:text-secondary'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </main>
      <CopilotPanel />
    </div>
  );
}
