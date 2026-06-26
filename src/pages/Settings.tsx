import { Settings as SettingsIcon, User, Bell, Shield, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export default function Settings() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || user?.email?.split('@')[0] || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="flex-1 overflow-y-auto bg-tertiary p-6 md:p-10">
      <h1 className="text-3xl font-serif mb-8 flex items-center"><SettingsIcon className="w-8 h-8 mr-3 text-primary" /> Settings</h1>
      
      <div className="max-w-2xl space-y-6">
        <div className="bg-neutral p-6 rounded-2xl border border-neutral-light">
          <h2 className="text-lg font-medium mb-4 flex items-center"><User className="w-5 h-5 mr-2 text-secondary/60" /> Account Details</h2>
          <div className="space-y-4">
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
          </div>
        </div>

        <div className="bg-neutral p-6 rounded-2xl border border-neutral-light">
          <h2 className="text-lg font-medium mb-4 flex items-center"><Shield className="w-5 h-5 mr-2 text-secondary/60" /> Security</h2>
          <div className="space-y-4">
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
              <div>
                <label className="block text-sm text-secondary/60 mb-1">Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full bg-tertiary border border-neutral-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors" 
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-neutral p-6 rounded-2xl border border-neutral-light">
          <h2 className="text-lg font-medium mb-4 flex items-center"><Bell className="w-5 h-5 mr-2 text-secondary/60" /> Notifications</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-5 h-5 rounded border border-primary bg-primary/20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-primary rounded-sm"></div>
              </div>
              <span className="text-sm group-hover:text-primary transition-colors">Itinerary updates</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-5 h-5 rounded border border-primary bg-primary/20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-primary rounded-sm"></div>
              </div>
              <span className="text-sm group-hover:text-primary transition-colors">Flight alerts</span>
            </label>
          </div>
        </div>

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
  );
}
