'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, Check, Link2, Sparkles, Store } from 'lucide-react';
import { Logo } from '@/src/components/Logo';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';

const STEPS = [
  { id: 1, label: 'Restaurant Details', icon: Store },
  { id: 2, label: 'Connect Platforms', icon: Link2 },
  { id: 3, label: 'AI Promos', icon: Sparkles },
  { id: 4, label: "You're Live!", icon: Check },
];

const RESTAURANT_TYPES = ['Burger', 'Pizza', 'Indian', 'Asian', 'Chinese'];
const AVG_ORDERS = ['0 – 25', '25 – 50', '50 – 100', '100+'];

const PLATFORMS = [
  { id: 'deliveroo', name: 'Deliveroo', color: 'bg-[#00CCBC] text-white', letter: 'D' },
  { id: 'uber', name: 'Uber Eats', color: 'bg-black text-white', letter: 'U' },
  { id: 'justeat', name: 'Just Eat', color: 'bg-[#FF8000] text-white', letter: 'J' },
];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    restaurantName: '',
    restaurantType: '',
    avgOrdersPerDay: '',
    platforms: [] as string[],
    promoGoal: '',
  });

  const togglePlatform = (p: string) => {
    setForm(prev => ({
      ...prev,
      platforms: prev.platforms.includes(p)
        ? prev.platforms.filter(x => x !== p)
        : [...prev.platforms, p],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6fcfb] via-[#eef7f1] to-white">
      {/* Header */}
      <header className="border-b border-border-light/70 bg-white/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <Link
            href="/login"
            className="inline-flex items-center rounded-full border border-border-light bg-white px-4 py-2 text-xs font-bold text-text-dark shadow-sm transition-all hover:border-g-dark hover:text-g-dark"
          >
            Already have an account? Log in
          </Link>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl mb-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-g-pale px-3 py-2 text-xs font-bold text-g-dark">
                Step {step} of {STEPS.length}
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-text-dark leading-tight">
                Set up your restaurant in minutes with a beautiful onboarding flow.
              </h1>
              <p className="max-w-xl text-sm text-text-muted">
                Guide your restaurant through a clean step-by-step setup, connect delivery platforms, and launch AI-powered promos without the clutter.
              </p>
            </div>
            <div className="rounded-[1.75rem] bg-[#f0faf5] p-6 border border-g-pale shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] font-black text-g-dark mb-4">Why Hungrin</p>
              <div className="space-y-3 text-sm text-text-dark">
                <div className="rounded-2xl bg-white border border-border-light px-4 py-3">
                  Fast setup with smart defaults and low friction.
                </div>
                <div className="rounded-2xl bg-white border border-border-light px-4 py-3">
                  Connect Deliveroo, Uber Eats and Just Eat in one place.
                </div>
                <div className="rounded-2xl bg-white border border-border-light px-4 py-3">
                  AI promos ready to launch as soon as you’re live.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className="flex items-center gap-1.5">
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  step > s.id
                    ? "bg-g-dark text-white"
                    : step === s.id
                      ? "bg-g-dark text-white ring-4 ring-g-pale"
                      : "bg-white border border-border-light text-text-muted"
                )}>
                  {step > s.id ? <Check className="w-3.5 h-3.5" /> : s.id}
                </div>
                <span className={cn(
                  "text-[10px] font-bold hidden sm:block whitespace-nowrap",
                  step === s.id ? "text-g-dark" : "text-text-muted"
                )}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn(
                  "h-0.5 w-6 sm:w-10 rounded-full transition-all",
                  step > s.id ? "bg-g-dark" : "bg-border-light"
                )} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white/95 rounded-[2rem] border border-border-light shadow-2xl w-full max-w-4xl p-8 lg:p-10 space-y-6">

          {/* Step 1 — Restaurant Details */}
          {step === 1 && (
            <>
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-black text-text-dark">Tell Us About Your Restaurant</h2>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Hungrin uses AI to analyse your sales and automatically create promotions that bring in more customers.
                  </p>
                </div>
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image src="/images/robot-thumbsup.jpeg" alt="" width={80} height={80} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-text-dark">Restaurant Name</label>
                <input
                  type="text"
                  placeholder="e.g. Burger Palace"
                  value={form.restaurantName}
                  onChange={e => setForm(p => ({ ...p, restaurantName: e.target.value }))}
                  className="w-full bg-g-faint border border-border-light rounded-xl px-4 py-2.5 text-sm outline-none focus:border-g-dark focus:ring-2 focus:ring-g-pale transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-text-dark">Restaurant Type</label>
                <div className="flex flex-wrap gap-2">
                  {RESTAURANT_TYPES.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm(p => ({ ...p, restaurantType: t }))}
                      className={cn(
                        "px-4 py-2 rounded-full text-xs font-bold border transition-all",
                        form.restaurantType === t
                          ? "bg-g-dark text-white border-g-dark"
                          : "bg-g-faint text-text-mid border-border-light hover:border-g-dark hover:text-g-dark"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-text-dark">Average Orders Per Day</label>
                <div className="grid grid-cols-4 gap-2">
                  {AVG_ORDERS.map(o => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setForm(p => ({ ...p, avgOrdersPerDay: o }))}
                      className={cn(
                        "py-2 rounded-xl text-xs font-bold border transition-all text-center",
                        form.avgOrdersPerDay === o
                          ? "bg-g-dark text-white border-g-dark"
                          : "bg-g-faint text-text-mid border-border-light hover:border-g-dark hover:text-g-dark"
                      )}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 2 — Connect Platforms */}
          {step === 2 && (
            <>
              <div>
                <h2 className="text-xl font-black text-text-dark">Connect Your Delivery Platforms</h2>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  Hungrin integrates directly with your delivery platforms so we can analyse your sales.
                </p>
              </div>
              <p className="text-[10px] text-text-muted bg-g-faint border border-border-light rounded-xl px-3 py-2">
                Your data is secure. Long-tap integration. Takes 2 minutes.
              </p>
              <div className="space-y-3">
                {PLATFORMS.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePlatform(p.id)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left",
                      form.platforms.includes(p.id)
                        ? "border-g-dark bg-g-pale"
                        : "border-border-light bg-white hover:border-g-dark/30"
                    )}
                  >
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0", p.color)}>
                      {p.letter}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-text-dark">{p.name}</p>
                      <p className="text-xs text-text-muted">Connect to import orders automatically</p>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                      form.platforms.includes(p.id) ? "bg-g-dark border-g-dark" : "border-border-light"
                    )}>
                      {form.platforms.includes(p.id) && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 3 — AI Promos */}
          {step === 3 && (
            <>
              <div>
                <h2 className="text-xl font-black text-text-dark">Let AI Optimise Your Promotions</h2>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  Here's an example of a promotion Hungrin will auto-generate for you.
                </p>
              </div>
              {/* Sample promo card */}
              <div className="bg-g-faint border border-border-light rounded-2xl p-4 flex gap-4 items-center">
                <div className="w-14 h-14 bg-g-pale rounded-xl flex items-center justify-center text-3xl shrink-0">🍔</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-text-dark">Burger Bundle!</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-base font-black text-g-dark">£12.99</span>
                    <span className="text-xs text-text-muted line-through">£16.99</span>
                    <span className="text-[10px] font-bold bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">High conversion</span>
                  </div>
                  <p className="text-[10px] text-text-muted mt-0.5">Auto-Monday Traffic · Only 7 slots left today</p>
                </div>
              </div>
              <button className="w-full py-3 bg-g-dark text-white rounded-xl text-sm font-bold hover:bg-g-mid transition-all">
                Launch Promotion →
              </button>
              <div className="flex flex-wrap gap-4 pt-2">
                {['Trusted · 500+ Restaurants', 'Deliveroo', 'Uber Eats', 'JUST EAT'].map(t => (
                  <span key={t} className="text-[10px] font-bold text-text-muted">{t}</span>
                ))}
              </div>
            </>
          )}

          {/* Step 4 — You're Live */}
          {step === 4 && (
            <>
              <div className="text-center space-y-3">
                <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden">
                  <Image src="/images/robot-thumbsup.jpeg" alt="" width={80} height={80} className="w-full h-full object-cover" />
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-g-pale border border-g-dark/20 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-g-dark animate-pulse" />
                  <span className="text-xs font-bold text-g-dark">You're Live!</span>
                </div>
                <h2 className="text-xl font-black text-text-dark">Hungrin is now optimising your restaurant's promotions.</h2>
              </div>
              <div className="space-y-2 py-2">
                {[
                  'AI monitoring your promotions',
                  'Promotions update automatically',
                  'Insights appear in your dashboard',
                ].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-text-mid font-medium">
                    <Check className="w-4 h-4 text-g-dark shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            {step > 1 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-2 text-sm font-bold text-text-mid hover:text-g-dark transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <Link href="/demo" className="text-xs text-text-muted hover:text-g-dark transition-all underline">
                Book Demo
              </Link>
            )}
            {step < 4 ? (
              <Button onClick={() => setStep(s => s + 1)}>
                Continue <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={() => router.push('/dashboard')}>
                Go to Dashboard <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>

        <p className="text-xs text-text-muted mt-5">Step {step} of {STEPS.length}</p>
      </div>
    </div>
  );
}
