'use client';

import React, { useState } from 'react';
import { Check, ArrowRight, Star } from 'lucide-react';
import { Logo } from '@/src/components/Logo';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { cn } from '@/src/lib/utils';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      price: isAnnual ? '0' : '0',
      desc: 'Perfect for small restaurants just starting with AI.',
      features: ['Up to 100 orders/mo', 'Basic AI insights', '1 Delivery platform', 'Email support'],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Growth',
      price: isAnnual ? '49' : '59',
      desc: 'Everything you need to scale your restaurant.',
      features: ['Unlimited orders', 'Advanced AI Assistant', 'All delivery platforms', 'Priority support', 'Custom promotions'],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Pro',
      price: isAnnual ? '99' : '119',
      desc: 'For multi-location restaurants and chains.',
      features: ['Multi-location support', 'Dedicated account manager', 'Custom AI models', 'API access', 'White-label reports'],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#eaf6f0] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <Logo className="mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl font-black text-text-dark tracking-tight">
            Simple, Transparent <span className="text-g-dark">Pricing</span>
          </h1>
          <p className="text-lg text-text-mid max-w-2xl mx-auto">
            Choose the plan that's right for your restaurant. No hidden fees, cancel anytime.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 pt-8">
            <span className={cn("text-sm font-bold", !isAnnual ? "text-text-dark" : "text-text-muted")}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-7 bg-white border border-border-light rounded-full relative p-1 transition-all"
            >
              <div className={cn(
                "w-5 h-5 bg-g-dark rounded-full transition-all",
                isAnnual ? "translate-x-7" : "translate-x-0"
              )} />
            </button>
            <span className={cn("text-sm font-bold", isAnnual ? "text-text-dark" : "text-text-muted")}>
              Yearly <span className="text-g-dark ml-1 text-[10px] bg-g-pale px-2 py-0.5 rounded-full">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn(
              "p-8 flex flex-col relative",
              plan.popular ? "border-g-dark border-2 shadow-xl scale-105 z-10" : ""
            )}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-g-dark text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-current" /> Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-black text-text-dark mb-2">{plan.name}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{plan.desc}</p>
              </div>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-black text-text-dark">£{plan.price}</span>
                <span className="text-text-muted text-sm font-bold">/month</span>
              </div>
              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 text-sm text-text-mid font-medium">
                    <Check className="w-5 h-5 text-g-dark shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <Button 
                variant={plan.popular ? 'primary' : 'outline'} 
                className="w-full py-4 text-base"
              >
                {plan.cta} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-text-mid text-sm font-bold">
            Need a custom solution? <button className="text-g-dark underline hover:text-g-mid ml-1">Contact our team</button>
          </p>
        </div>
      </div>
    </div>
  );
}
