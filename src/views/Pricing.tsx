'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Check, Star, Send, MessageCircle, HelpCircle, Phone } from 'lucide-react';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';

const plans = [
  {
    name: 'Starter',
    price: '19',
    desc: 'Ideal for new small businesses',
    features: [
      'Manage customer data and orders',
      'Basic AI insights',
      'Limited campaigns',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    price: '49',
    desc: 'Perfect for growing businesses ready to expand',
    features: [
      'All Starter features plus:',
      'Advanced AI insights',
      'Targeted campaigns',
      'Priority support',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Pro',
    price: '99',
    desc: 'Best for established businesses with high demands',
    features: [
      'All Growth features',
      'Custom AI solutions',
      'Exclusive promotions',
    ],
    cta: 'Get Started',
    popular: false,
  },
];

const featureRows = [
  { label: 'Manage Customer data and orders', starter: true, growth: true, pro: true },
  { label: 'AI Insights', starter: 'Basic', growth: 'Advanced', pro: true },
  { label: 'Campaigns', starter: 'Limited', growth: 'Targeted', pro: true },
  { label: 'Online Review Management', starter: false, growth: true, pro: true },
  { label: 'Priority Support', starter: false, growth: true, pro: true },
  { label: 'Delivery Optimisation', starter: false, growth: false, pro: true },
];

export default function Pricing() {
  const [chatInput, setChatInput] = useState('');

  return (
    <AppLayout
      title="Pricing"
      subtitle="Choose a plan that fits your business needs."
    >
      <div className="flex gap-6 min-h-0">
        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-6 pb-24">
          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card key={plan.name} className={cn(
                "p-6 flex flex-col relative",
                plan.popular ? "border-g-dark border-2 shadow-xl" : ""
              )}>
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-g-dark text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full flex items-center gap-1.5">
                    <Star className="w-3 h-3 fill-current" /> Most Popular
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-base font-black text-text-dark">{plan.name}</h3>
                  <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{plan.desc}</p>
                </div>
                <div className="mb-5 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-text-dark">£{plan.price}</span>
                  <span className="text-text-muted text-xs font-bold">/month</span>
                </div>
                <div className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-text-mid font-medium">
                      <Check className="w-4 h-4 text-g-dark shrink-0 mt-0.5" />
                      {f}
                    </div>
                  ))}
                </div>
                <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full text-sm">
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>

          {/* Compare Features */}
          <Card className="overflow-hidden">
            <div className="px-6 py-4 border-b border-border-light">
              <h3 className="text-sm font-bold text-text-dark">Compare Features</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-g-faint border-b border-border-light">
                    <th className="px-6 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider w-1/2">Feature</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider text-center">Starter</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-g-dark uppercase tracking-wider text-center">Growth</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider text-center">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {featureRows.map((row) => (
                    <tr key={row.label} className="hover:bg-g-faint/50 transition-colors">
                      <td className="px-6 py-3 text-xs font-medium text-text-dark">{row.label}</td>
                      {[row.starter, row.growth, row.pro].map((val, i) => (
                        <td key={i} className="px-4 py-3 text-center">
                          {val === true ? (
                            <Check className="w-4 h-4 text-g-dark mx-auto" />
                          ) : val === false ? (
                            <span className="text-text-muted text-xs">—</span>
                          ) : (
                            <span className={cn(
                              "text-[10px] font-bold px-2 py-0.5 rounded-full",
                              i === 1 ? "bg-g-pale text-g-dark" : "bg-gray-100 text-text-mid"
                            )}>{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* AI Recommendations Panel */}
        <div className="w-72 shrink-0 hidden lg:flex flex-col gap-4">
          <Card className="p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-border-light pb-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                <Image src="/images/robot-thumbsup.jpeg" alt="AI" width={32} height={32} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-sm font-bold text-text-dark">AI Recommendations</h3>
            </div>
            <div className="w-full h-28 rounded-xl overflow-hidden">
              <Image src="/images/robot-happy.jpeg" alt="AI" width={280} height={112} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs text-text-muted leading-relaxed">Find the best plan for your business.</p>
            <div className="bg-g-pale border border-g-dark/20 rounded-xl p-3 space-y-1">
              <p className="text-xs font-bold text-g-dark flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Best choice for you:
              </p>
              <p className="text-sm font-black text-text-dark">Growth Plan</p>
            </div>
            <p className="text-xs text-text-muted">Based on your current needs:</p>
            <div className="space-y-2">
              {[
                '→ Growth Plan',
                '✓ Advanced AI insights',
                '✓ Targeted campaigns',
                '✓ Priority support',
              ].map((item) => (
                <p key={item} className={cn(
                  "text-xs font-medium",
                  item.startsWith('→') ? "text-g-dark font-bold" : "text-text-mid"
                )}>{item}</p>
              ))}
            </div>
            <p className="text-[10px] text-text-muted leading-relaxed border-t border-border-light pt-3">
              Upgrade to accelerate your growth and maximise your success.
            </p>
          </Card>
        </div>
      </div>

      {/* Sticky bottom chat bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-border-light px-6 py-3 flex items-center gap-3 z-10">
        <input
          type="text"
          placeholder="Ask the AI to compare plans…"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          className="flex-1 bg-g-faint border border-border-light rounded-xl px-4 py-2 text-sm outline-none focus:border-g-dark transition-all"
        />
        <Button size="sm" className="gap-1.5 shrink-0">
          <MessageCircle className="w-3.5 h-3.5" /> Ask Now
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5 shrink-0 hidden sm:flex">
          <HelpCircle className="w-3.5 h-3.5" /> AI FAQs
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5 shrink-0 hidden sm:flex">
          <Phone className="w-3.5 h-3.5" /> Contact Sales
        </Button>
        <button className="bg-g-dark text-white p-2 rounded-xl hover:bg-g-mid transition-all shrink-0">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </AppLayout>
  );
}
