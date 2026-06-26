import { User, Settings, CreditCard, Shield, LogOut, ChevronRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export default function Profile() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || user?.email?.split('@')[0] || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleUpdateProfile = async () => {
    if (!supabase) return;
    setIsLoading(true);
    try {
      const updates: any = { data: { full_name: fullName } };
      
      if (password) {
        if (password !== confirmPassword) {
          toast.error("Passwords don't match");
          setIsLoading(false);
          return;
        }
        updates.password = password;
      }

      const { error } = await supabase.auth.updateUser(updates);
      if (error) throw error;
      
      toast.success("Profile updated successfully");
      setPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-tertiary p-6 md:p-10 relative">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-serif text-secondary">Profile</h1>
        </div>

        <div className="bg-neutral rounded-3xl border border-neutral-light p-6 md:p-8 mb-8 flex items-center space-x-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10"></div>
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-neutral-light overflow-hidden shrink-0 border-4 border-tertiary flex items-center justify-center">
            {user?.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="User" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-secondary/60" />
            )}
          </div>
          <div className="flex-1 truncate">
            <h2 className="text-2xl font-serif text-secondary mb-1 truncate">
              {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Guest'}
            </h2>
            <p className="text-secondary/60 mb-2 truncate">{user?.email || 'Not signed in'}</p>
            <div className="inline-flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
              <span>{user ? 'Pro Member' : 'Free Member'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-10">
          <h3 className="text-sm font-medium text-secondary/60 uppercase tracking-wider mb-2 px-2">User Account</h3>
          
          <div className="bg-neutral border border-neutral-light rounded-2xl p-6 space-y-4">
            <h4 className="font-medium text-secondary flex items-center mb-2"><User className="w-4 h-4 mr-2" /> Account Details</h4>
            <div>
              <label className="block text-sm text-secondary/60 mb-1">Name</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-tertiary border border-neutral-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm text-secondary/60 mb-1">Email</label>
              <input 
                type="email" 
                value={user?.email || ''} 
                disabled 
                className="w-full bg-tertiary border border-neutral-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors opacity-70 cursor-not-allowed" 
              />
            </div>

            <h4 className="font-medium text-secondary flex items-center mt-6 mb-2"><Shield className="w-4 h-4 mr-2" /> Change Password</h4>
            <div>
              <label className="block text-sm text-secondary/60 mb-1">New Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current"
                className="w-full bg-tertiary border border-neutral-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors" 
              />
            </div>
            {password && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <label className="block text-sm text-secondary/60 mb-1 mt-4">Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full bg-tertiary border border-neutral-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors" 
                />
              </motion.div>
            )}

            <div className="pt-4 flex justify-end">
              <button 
                onClick={handleUpdateProfile}
                disabled={isLoading}
                className="bg-primary text-tertiary px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors flex items-center disabled:opacity-50"
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={handleSignOut}
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
