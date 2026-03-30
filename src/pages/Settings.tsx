import React from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Trash2, 
  Save,
  Settings as SettingsIcon,
  CreditCard
} from 'lucide-react';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { Card, CardHeader, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';

export default function Settings() {
  return (
    <AppLayout 
      title="Settings" 
      subtitle="Manage your account, restaurant profile, and platform integrations."
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation */}
        <div className="lg:col-span-1 space-y-1">
          {[
            { icon: User, label: 'Profile' },
            { icon: Bell, label: 'Notifications' },
            { icon: Shield, label: 'Security' },
            { icon: CreditCard, label: 'Billing' },
            { icon: Globe, label: 'Integrations' },
          ].map((item, i) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                i === 0 ? "bg-g-dark text-white shadow-md" : "text-text-mid hover:bg-g-faint hover:text-g-dark"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-text-dark">Restaurant Profile</h3>
              <p className="text-xs text-text-muted">Update your restaurant's public information.</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Restaurant Name</label>
                  <input type="text" defaultValue="Sarah's Burger Shack" className="w-full bg-g-faint border border-border-light rounded-xl px-4 py-3 text-sm outline-none focus:border-g-dark transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Email Address</label>
                  <input type="email" defaultValue="sarah@burgershack.com" className="w-full bg-g-faint border border-border-light rounded-xl px-4 py-3 text-sm outline-none focus:border-g-dark transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Phone Number</label>
                  <input type="text" defaultValue="+44 7421 892 102" className="w-full bg-g-faint border border-border-light rounded-xl px-4 py-3 text-sm outline-none focus:border-g-dark transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Location</label>
                  <input type="text" defaultValue="London, UK" className="w-full bg-g-faint border border-border-light rounded-xl px-4 py-3 text-sm outline-none focus:border-g-dark transition-all" />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button>
                  <Save className="w-4 h-4" /> Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-text-dark">Connected Platforms</h3>
              <p className="text-xs text-text-muted">Manage your delivery platform integrations.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Uber Eats', status: 'Connected', icon: 'U' },
                { name: 'Deliveroo', status: 'Connected', icon: 'D' },
                { name: 'Just Eat', status: 'Not Connected', icon: 'J' },
              ].map((p, i) => (
                <div key={p.name} className="flex items-center justify-between p-4 bg-g-faint rounded-xl border border-border-light">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-border-light rounded-lg flex items-center justify-center font-black text-xs">{p.icon}</div>
                    <div>
                      <p className="text-sm font-bold text-text-dark">{p.name}</p>
                      <p className={cn("text-[10px] font-bold", p.status === 'Connected' ? "text-g-dark" : "text-text-muted")}>{p.status}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {p.status === 'Connected' ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-red-100 bg-red-50/30">
            <CardHeader>
              <h3 className="text-lg font-bold text-red-600">Danger Zone</h3>
              <p className="text-xs text-red-500">Irreversible actions for your account.</p>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-text-dark">Delete Account</p>
                <p className="text-xs text-text-muted">Permanently delete your account and all restaurant data.</p>
              </div>
              <Button variant="danger" size="sm">
                <Trash2 className="w-4 h-4" /> Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
