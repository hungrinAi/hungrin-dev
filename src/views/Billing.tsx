'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Check, CreditCard, MessageCircle, Plus, ToggleLeft, ToggleRight } from 'lucide-react';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';

const billingHistory = [
  { date: 'April 20, 2024', description: 'Growth Plan', status: 'Paid', amount: '£99' },
  { date: 'March 20, 2024', description: 'Growth Plan', status: 'Paid', amount: '£99' },
  { date: 'February 20, 2024', description: 'Growth Plan', status: 'Paid', amount: '£99' },
  { date: 'January 20, 2024', description: 'Growth Plan', status: 'Paid', amount: '£99' },
];

export default function Billing() {
  const [weatherInsights, setWeatherInsights] = useState(true);

  return (
    <AppLayout
      title={
        <span className="flex items-center gap-2 text-base font-bold">
          <Link href="/settings" className="text-text-muted hover:text-g-dark transition-all flex items-center gap-1 text-sm">
            <ChevronLeft className="w-4 h-4" /> Billing
          </Link>
        </span>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Current Plan */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-1">
              <div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Current Plan</p>
                <h2 className="text-xl font-black text-text-dark">Growth Plan</h2>
                <p className="text-2xl font-black text-g-dark mt-1">£99<span className="text-sm font-bold text-text-muted">/month</span></p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm">Update Plan</Button>
                <Button variant="outline" size="sm">Cancel Plan</Button>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {[
                'Connect unlimited delivery platforms',
                'Run unlimited promotions',
                'Real-time sales insights dashboard',
                'Targeted campaigns',
                'Priority support',
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs text-text-mid font-medium">
                  <Check className="w-3.5 h-3.5 text-g-dark shrink-0" /> {f}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-text-muted mt-4 border-t border-border-light pt-3">
              Auto-renews on May 20, 2024 · <button className="text-g-dark underline">Contact us</button>
            </p>
          </Card>

          {/* Billing History */}
          <Card className="overflow-hidden">
            <div className="px-6 py-4 border-b border-border-light">
              <h3 className="text-sm font-bold text-text-dark">Billing History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-g-faint border-b border-border-light">
                    <th className="px-3 md:px-6 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider">Date</th>
                    <th className="px-3 md:px-6 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider">Description</th>
                    <th className="px-3 md:px-6 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider hidden sm:table-cell">Status</th>
                    <th className="px-3 md:px-6 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {billingHistory.map((row, i) => (
                    <tr key={i} className="hover:bg-g-faint/50 transition-colors">
                      <td className="px-3 md:px-6 py-3 text-xs text-text-muted whitespace-nowrap">{row.date}</td>
                      <td className="px-3 md:px-6 py-3 text-xs font-medium text-text-dark">{row.description}</td>
                      <td className="px-3 md:px-6 py-3 hidden sm:table-cell">
                        <span className="text-[10px] font-bold bg-g-pale text-g-dark px-2 py-0.5 rounded-full">{row.status}</span>
                      </td>
                      <td className="px-3 md:px-6 py-3 text-xs font-bold text-text-dark text-right whitespace-nowrap">{row.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-g-faint border-t border-border-light flex items-center justify-between">
              <p className="text-xs text-text-muted">Page <strong>1</strong> of 4</p>
              <div className="flex gap-1">
                <button className="px-3 py-1.5 text-[10px] font-bold bg-white border border-border-light rounded-lg text-text-muted hover:bg-g-pale transition-all">← Previous</button>
                <button className="px-3 py-1.5 text-[10px] font-bold bg-white border border-border-light rounded-lg text-text-mid hover:bg-g-pale transition-all">Next →</button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">

          {/* Payment Method */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-text-dark">Payment Method</h3>
            <div className="flex items-center gap-4 p-4 bg-g-faint rounded-xl border border-border-light">
              <div className="w-10 h-8 bg-blue-600 rounded flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-text-dark">Visa ···· 4242</p>
                <p className="text-[10px] text-text-muted">Expires 12/29</p>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>
            <p className="text-[10px] text-text-muted flex items-center gap-1.5">
              <span className="text-g-dark">🔒</span> Payment data is encrypted & securely stored.
            </p>
          </Card>

          {/* Subscription Extras */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-text-dark">Subscription Extras</h3>
            <div className="space-y-3">
              {[
                { label: 'SMS Marketing', desc: 'Send promos to your customers via SMS', price: '£5/mo', action: 'add' },
                { label: 'Customer Loyalty', desc: 'Reward customers with loyalty programs', price: '£5/mo', action: 'add' },
                { label: 'Menu Enhancements', desc: 'Coming soon', price: null, action: 'soon' },
              ].map((extra) => (
                <div key={extra.label} className="flex items-start justify-between gap-3 p-3 bg-g-faint rounded-xl border border-border-light">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-text-dark">{extra.label}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">{extra.desc}</p>
                  </div>
                  {extra.action === 'add' && (
                    <button className="shrink-0 text-[10px] font-bold text-g-dark bg-g-pale border border-g-dark/20 px-2.5 py-1.5 rounded-lg hover:bg-g-dark hover:text-white transition-all whitespace-nowrap flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Add {extra.price}
                    </button>
                  )}
                  {extra.action === 'soon' && (
                    <span className="shrink-0 text-[10px] font-bold text-text-muted bg-gray-100 px-2.5 py-1.5 rounded-lg whitespace-nowrap">Coming Soon</span>
                  )}
                </div>
              ))}
              {/* Weather Insights with toggle */}
              <div className="flex items-start justify-between gap-3 p-3 bg-g-faint rounded-xl border border-border-light">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-text-dark">Weather Insights</p>
                  <p className="text-[10px] text-text-muted mt-0.5">Enable advanced weather-based deals</p>
                </div>
                <button
                  onClick={() => setWeatherInsights(!weatherInsights)}
                  className="shrink-0 transition-all"
                >
                  {weatherInsights
                    ? <ToggleRight className="w-8 h-8 text-g-dark" />
                    : <ToggleLeft className="w-8 h-8 text-text-muted" />
                  }
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Help Banner */}
      <div className="mt-2 bg-gradient-to-r from-g-pale to-[#d4f0e0] border border-border-light rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
            <Image src="/images/robot-thinking.jpeg" alt="" width={48} height={48} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold text-text-dark">Need help with your billing?</p>
            <p className="text-xs text-text-muted">Contact Support or email us at billing@hungrin.com</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <MessageCircle className="w-3.5 h-3.5" /> Book Demo
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
