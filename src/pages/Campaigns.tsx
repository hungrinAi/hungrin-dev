import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  ChevronLeft,
  ChevronRight,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { useApi } from '@/src/hooks/useApi';
import { campaignService } from '@/src/services';
import { cn } from '@/src/lib/utils';

export default function Campaigns() {
  const [filter, setFilter] = useState('All');
  const { data: campaigns, loading, error } = useApi(campaignService.getAll);

  if (loading) return <div className="p-8 text-text-muted">Loading campaigns...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <AppLayout 
      title="Campaigns" 
      subtitle="Win back customers, increase orders, and drive revenue with targeted campaigns."
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex bg-g-faint p-1 rounded-xl border border-border-light">
          {['All', 'Active', 'Paused', 'Ended'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-semibold transition-all",
                filter === f ? "bg-g-dark text-white shadow-md" : "text-text-mid hover:bg-g-pale hover:text-g-dark"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4" /> New Campaign
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <Card className="overflow-hidden">
        <div className="p-5 border-b border-border-light flex items-center gap-4">
          <div className="flex-1 flex items-center gap-3 bg-g-faint border border-border-light rounded-xl px-4 py-2.5">
            <Search className="w-4 h-4 text-text-muted" />
            <input type="text" placeholder="Search campaigns…" className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
          <select className="bg-white border border-border-light rounded-xl px-4 py-2.5 text-sm outline-none">
            <option>All Types</option>
            <option>Food Promo</option>
            <option>Seasonal</option>
            <option>Loyalty</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-g-faint border-b border-border-light">
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Orders</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Date</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {campaigns?.map((c) => (
                <tr key={c.id} className="hover:bg-g-faint transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-10 bg-g-pale rounded-lg flex items-center justify-center text-2xl shrink-0">{c.emoji}</div>
                      <div>
                        <p className="text-sm font-bold text-text-dark mb-0.5">{c.name}</p>
                        <p className="text-[10px] text-text-muted flex items-center gap-1"><Zap className="w-3 h-3" /> {c.meta}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
                      c.status === 'Active' ? "bg-g-pale text-g-dark" : 
                      c.status === 'Paused' ? "bg-yellow-50 text-yellow-700" : "bg-gray-100 text-gray-500"
                    )}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-text-dark">{c.orders}</td>
                  <td className="px-6 py-4 text-sm font-bold text-text-dark">{c.revenue}</td>
                  <td className="px-6 py-4 text-xs text-text-muted leading-tight">{c.startDate} –<br />{c.endDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-text-muted hover:text-g-dark hover:bg-g-pale rounded-lg transition-all"><MoreHorizontal className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-5 bg-g-faint border-t border-border-light flex items-center justify-between">
          <div className="text-xs text-text-muted">Page <strong className="text-text-dark">1</strong> of 2</div>
          <div className="flex items-center gap-2">
            <button disabled className="p-2 border border-border-light rounded-lg bg-white text-text-muted disabled:opacity-40"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-8 h-8 rounded-lg bg-g-dark text-white text-xs font-bold">1</button>
            <button className="w-8 h-8 rounded-lg bg-white border border-border-light text-text-mid text-xs font-bold hover:bg-g-pale">2</button>
            <button className="p-2 border border-border-light rounded-lg bg-white text-text-mid hover:bg-g-pale"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </Card>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-[#e8f8f0] via-[#d0eedd] to-[#c0e8d4] rounded-2xl border border-border-light p-8 flex items-center justify-between relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-text-dark mb-1">Create Targeted Campaigns</h3>
          <p className="text-sm text-text-mid mb-6">Promote your <strong>best offers like a pro</strong></p>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2">
            {['Increase repeat orders', 'Fill slow times', 'Boost online reviews', 'Maximize revenue'].map(c => (
              <div key={c} className="flex items-center gap-2 text-sm text-text-mid font-medium">
                <CheckCircle2 className="w-4 h-4 text-g-dark" /> {c}
              </div>
            ))}
          </div>
        </div>
        <div className="text-8xl animate-bob hidden lg:block">🤖</div>
      </div>
    </AppLayout>
  );
}
