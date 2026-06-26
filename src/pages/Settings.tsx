import { Settings as SettingsIcon, User, Bell } from 'lucide-react';

export default function Settings() {
  return (
    <div className="flex-1 overflow-y-auto bg-tertiary p-6 md:p-10">
      <h1 className="text-3xl font-serif mb-8 flex items-center"><SettingsIcon className="w-8 h-8 mr-3 text-primary" /> Settings</h1>
      
      <div className="max-w-2xl space-y-6">
        <div className="bg-neutral p-6 rounded-2xl border border-neutral-light">
          <h2 className="text-lg font-medium mb-4 flex items-center"><User className="w-5 h-5 mr-2 text-secondary/60" /> Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-secondary/60 mb-1">Name</label>
              <input type="text" defaultValue="Alex Chen" className="w-full bg-tertiary border border-neutral-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors" />
            </div>
            <div>
              <label className="block text-sm text-secondary/60 mb-1">Email</label>
              <input type="email" defaultValue="alex@example.com" className="w-full bg-tertiary border border-neutral-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors" />
            </div>
            <button className="bg-primary text-tertiary px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors">Save Changes</button>
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
      </div>
    </div>
  );
}
