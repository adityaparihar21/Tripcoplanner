import { User, Settings, CreditCard, Shield, LogOut, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: Settings, label: 'Account Settings', path: '/dashboard/settings' },
    { icon: CreditCard, label: 'Subscription & Billing', path: '/dashboard/billing' },
    { icon: Shield, label: 'Privacy & Security', path: '/dashboard/security' },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-tertiary p-6 md:p-10 relative">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-serif text-secondary">Profile</h1>
        </div>

        <div className="bg-neutral rounded-3xl border border-neutral-light p-6 md:p-8 mb-8 flex items-center space-x-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10"></div>
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-neutral-light overflow-hidden shrink-0 border-4 border-tertiary">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop" alt="User" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-serif text-secondary mb-1">Alex Chen</h2>
            <p className="text-secondary/60 mb-2">alex.chen@example.com</p>
            <div className="inline-flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
              <span>Pro Member</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <h3 className="text-sm font-medium text-secondary/60 uppercase tracking-wider mb-4 px-2">Account</h3>
          {menuItems.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={item.label}
              onClick={() => navigate(item.path)}
              className="bg-neutral border border-neutral-light rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-primary/50 hover:bg-neutral-light/50 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center text-secondary group-hover:text-primary transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-secondary">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-secondary/40 group-hover:text-primary transition-colors" />
            </motion.div>
          ))}
        </div>

        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate('/')}
          className="w-full bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 rounded-2xl p-4 flex items-center justify-center space-x-2 font-medium transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </motion.button>

        <div className="text-center mt-12 text-secondary/40 text-xs">
          <p>TripCo v1.0.0</p>
          <p className="mt-1">© 2026 TripCo. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
