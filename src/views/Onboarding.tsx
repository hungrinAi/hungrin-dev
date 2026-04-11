'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Logo } from '@/src/components/brand';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';
import { ROUTES, STORAGE_KEYS } from '@/src/lib/constants';

const STEPS = [
  { id: 1, label: 'Restaurant' },
  { id: 2, label: 'Platforms' },
  { id: 3, label: 'AI Promos' },
  { id: 4, label: "You're Live!" },
];

// Left panel slides — independent marketing carousel
const LEFT_SLIDES = [
  {
    robot: '/images/robot-thumbsup.jpeg',
    badge: 'AI-Powered Growth',
    title: 'Grow Your Restaurant Orders Automatically',
    subtitle: 'Hungrin uses AI to boost your sales, create promotions and bring you more customers — all from one simple dashboard.',
    tip: { label: 'Result', text: 'Restaurants using Hungrin see an average 3× more promo conversions within the first month.' },
  },
  {
    robot: '/images/robot-thinking.jpeg',
    badge: 'Smart Analysis',
    title: 'AI That Learns Your Restaurant\'s Patterns',
    subtitle: 'Connect your Uber Eats, Deliveroo or Just Eat data and watch Hungrin analyse your peak hours, slow days, and best-selling items.',
    tip: { label: 'Did you know', text: 'Hungrin identifies your top 3 revenue opportunities within 24 hours of connecting your data.' },
  },
  {
    robot: '/images/robot-happy.jpeg',
    badge: 'Promo Automation',
    title: 'Ready-to-Launch Promotions in Seconds',
    subtitle: 'No marketing experience needed. Hungrin generates promotions tailored to your cuisine, location, and customer behaviour — ready to copy straight into your platform.',
    tip: { label: 'AI Insight', text: 'Rainy days see 38% fewer orders. Hungrin auto-suggests a deal before the weather hits.' },
  },
  {
    robot: '/images/robot-burger.jpeg',
    badge: 'Real Results',
    title: 'Join 500+ Restaurants Already Growing',
    subtitle: 'From burger joints to Indian restaurants, Hungrin works across every cuisine type and every major delivery platform in the UK.',
    tip: { label: 'Community', text: 'Over 500 restaurants trust Hungrin to run their promotions and grow their customer base.' },
  },
];

const RESTAURANT_TYPES = [
  { label: 'Burger', emoji: '🍔' },
  { label: 'Pizza', emoji: '🍕' },
  { label: 'Indian', emoji: '🍛' },
  { label: 'Chinese', emoji: '🥡' },
  { label: 'Italian', emoji: '🍝' },
  { label: 'Thai', emoji: '🍜' },
  { label: 'Turkish', emoji: '🥙' },
  { label: 'Sushi', emoji: '🍱' },
  { label: 'Mexican', emoji: '🌮' },
  { label: 'Mediterranean', emoji: '🫒' },
  { label: 'Kebab', emoji: '🍢' },
  { label: 'Vegan', emoji: '🥗' },
  { label: 'Caribbean', emoji: '🍗' },
  { label: 'Korean', emoji: '🍖' },
  { label: 'Fast Food', emoji: '🍟' },
  { label: 'Chicken', emoji: '🐔' },
];

const AVG_ORDERS = ['0 – 25', '25 – 50', '50 – 100', '100+'];

const PLATFORMS = [
  {
    id: 'uber',
    name: 'Uber Eats',
    desc: 'Connect to sync your Uber Eats order history',
    bg: 'bg-black',
    text: 'text-white',
    emoji: '🛵',
  },
  {
    id: 'deliveroo',
    name: 'Deliveroo',
    desc: 'Connect to sync your Deliveroo order history',
    bg: 'bg-[#00CCBC]',
    text: 'text-white',
    emoji: '🦘',
  },
  {
    id: 'justeat',
    name: 'Just Eat',
    desc: 'Connect to sync your Just Eat order history',
    bg: 'bg-[#FF8000]',
    text: 'text-white',
    emoji: '🍽️',
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [slide, setSlide] = useState(0);
  const [form, setForm] = useState({
    restaurantName: '',
    cityPostcode: '',
    restaurantType: '',
    avgOrdersPerDay: '',
    platforms: [] as string[],
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const togglePlatform = (id: string) => {
    setForm(prev => {
      const updated = prev.platforms.includes(id)
        ? prev.platforms.filter(x => x !== id)
        : [...prev.platforms, id];
      if (updated.length > 0) {
        setFieldErrors(e => ({ ...e, platforms: '' }));
      }
      return { ...prev, platforms: updated };
    });
  };

  /** Returns true if the current step is valid. */
  const validateStep = (): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!form.restaurantName.trim()) errors.restaurantName = 'Restaurant name is required';
      if (!form.cityPostcode.trim()) errors.cityPostcode = 'City or postcode is required';
      if (!form.restaurantType) errors.restaurantType = 'Please select a cuisine type';
      if (!form.avgOrdersPerDay) errors.avgOrdersPerDay = 'Please select your average daily orders';
    }

    if (step === 2) {
      if (form.platforms.length === 0) errors.platforms = 'Please select at least one delivery platform';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinue = () => {
    if (validateStep()) setStep(s => s + 1);
  };

  const currentSlide = LEFT_SLIDES[slide];
  const progress = ((step - 1) / (STEPS.length - 1)) * 100;
  const nextSlide = () => setSlide(s => (s + 1) % LEFT_SLIDES.length);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── Left Panel (independent marketing carousel) ── */}
      <div
        className="hidden lg:flex lg:w-[42%] xl:w-[38%] bg-gradient-to-br from-[#1a4d3a] via-[#23664f] to-[#2d7a5f] flex-col justify-between p-10 xl:p-14 relative overflow-hidden shrink-0 cursor-pointer select-none"
        onClick={nextSlide}
        title="Click to see more"
      >
        {/* Background decoration */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute bottom-20 -left-16 w-56 h-56 rounded-full bg-white/5" />
        <div className="absolute top-1/2 right-0 w-32 h-32 rounded-full bg-white/5" />

        {/* Logo */}
        <div className="relative z-10">
          <Logo className="[&_span]:text-white" />
        </div>

        {/* Centered robot image + tagline */}
        <div className="relative z-10 flex flex-col items-center gap-7 flex-1 justify-center py-8">
          {/* Robot image */}
          <div className="relative">
            <div className="w-48 h-48 xl:w-56 xl:h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 transition-all duration-500">
              <Image
                key={currentSlide.robot}
                src={currentSlide.robot}
                alt={currentSlide.badge}
                width={224}
                height={224}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -inset-2 rounded-3xl border-2 border-white/15 animate-pulse pointer-events-none" />
            {/* Click hint */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
              Click to explore ›
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center space-y-3 max-w-xs">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
              <span className="text-white/90 text-xs font-bold">{currentSlide.badge}</span>
            </div>
            <h2 className="text-2xl xl:text-3xl font-black text-white leading-tight transition-all duration-300">
              {currentSlide.title}
            </h2>
            <p className="text-white/65 text-sm leading-relaxed">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Tip card */}
          <div className="bg-white/10 backdrop-blur rounded-2xl px-5 py-4 max-w-xs border border-white/15 w-full">
            <p className="text-[11px] text-white/50 uppercase tracking-widest font-bold mb-1">
              {currentSlide.tip.label}
            </p>
            <p className="text-white/80 text-xs leading-relaxed">{currentSlide.tip.text}</p>
          </div>
        </div>

        {/* Clickable dots */}
        <div className="relative z-10 flex items-center gap-2 justify-center">
          {LEFT_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setSlide(i); }}
              className={cn(
                "rounded-full transition-all duration-300 focus:outline-none",
                i === slide ? "w-8 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-border-light lg:px-10">
          {/* Mobile logo */}
          <div className="lg:hidden">
            <Logo />
          </div>
          {/* Step counter */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-text-muted">
            <span className="text-g-dark text-sm">Step {step}</span>
            <span>of {STEPS.length}</span>
          </div>
          <Link
            href={ROUTES.LOGIN}
            className="ml-auto inline-flex items-center rounded-full border border-border-light bg-white px-4 py-2 text-xs font-bold text-text-dark shadow-sm transition-all hover:border-g-dark hover:text-g-dark"
          >
            Already have an account? Log in
          </Link>
        </header>

        {/* Progress bar */}
        <div className="h-1 bg-border-light">
          <div
            className="h-full bg-gradient-to-r from-[#23664f] to-[#2d7a5f] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step breadcrumb */}
        <div className="px-6 lg:px-10 pt-6 pb-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.id}>
                <div className="flex items-center gap-2 shrink-0">
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all",
                    step > s.id ? "bg-g-dark text-white" :
                    step === s.id ? "bg-g-dark text-white shadow-[0_0_0_4px_#d1f0e4]" :
                    "bg-gray-100 text-gray-400"
                  )}>
                    {step > s.id ? <Check className="w-3.5 h-3.5" /> : s.id}
                  </div>
                  <span className={cn(
                    "text-[11px] font-bold whitespace-nowrap transition-colors",
                    step === s.id ? "text-g-dark" : "text-text-muted"
                  )}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn(
                    "flex-1 min-w-[20px] max-w-[60px] h-0.5 rounded-full transition-all",
                    step > s.id ? "bg-g-dark" : "bg-gray-100"
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form content */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-10 py-6">
          <div className="max-w-xl">

            {/* Step 1 — Restaurant Details */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-text-dark">Restaurant Details</h1>
                  <p className="text-sm text-text-muted mt-1">Tell us a bit about your business.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-text-dark">Restaurant Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Burger Palace"
                      value={form.restaurantName}
                      onChange={e => {
                        setForm(p => ({ ...p, restaurantName: e.target.value }));
                        if (e.target.value.trim()) setFieldErrors(er => ({ ...er, restaurantName: '' }));
                      }}
                      className={cn(
                        "w-full bg-[#f6fdf9] border rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 transition-all placeholder:text-gray-300",
                        fieldErrors.restaurantName
                          ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                          : "border-border-light focus:border-g-dark focus:ring-[#d1f0e4]"
                      )}
                    />
                    {fieldErrors.restaurantName && (
                      <p className="text-[10px] font-bold text-red-500">{fieldErrors.restaurantName}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-text-dark">City / Postcode</label>
                    <input
                      type="text"
                      placeholder="e.g. London E1 6RF"
                      value={form.cityPostcode}
                      onChange={e => {
                        setForm(p => ({ ...p, cityPostcode: e.target.value }));
                        if (e.target.value.trim()) setFieldErrors(er => ({ ...er, cityPostcode: '' }));
                      }}
                      className={cn(
                        "w-full bg-[#f6fdf9] border rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 transition-all placeholder:text-gray-300",
                        fieldErrors.cityPostcode
                          ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                          : "border-border-light focus:border-g-dark focus:ring-[#d1f0e4]"
                      )}
                    />
                    {fieldErrors.cityPostcode && (
                      <p className="text-[10px] font-bold text-red-500">{fieldErrors.cityPostcode}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-text-dark">Cuisine Type</label>
                  <div className="flex flex-wrap gap-2">
                    {RESTAURANT_TYPES.map(t => (
                      <button
                        key={t.label}
                        type="button"
                        onClick={() => {
                          setForm(p => ({ ...p, restaurantType: t.label }));
                          setFieldErrors(e => ({ ...e, restaurantType: '' }));
                        }}
                        className={cn(
                          "flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold border-2 transition-all",
                          form.restaurantType === t.label
                            ? "bg-g-dark text-white border-g-dark shadow-lg shadow-g-dark/20"
                            : "bg-white text-text-mid border-border-light hover:border-g-dark/40 hover:text-g-dark"
                        )}
                      >
                        <span>{t.emoji}</span> {t.label}
                      </button>
                    ))}
                  </div>
                  {fieldErrors.restaurantType && (
                    <p className="text-[10px] font-bold text-red-500">{fieldErrors.restaurantType}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-text-dark">Average Orders Per Day</label>
                  <div className="grid grid-cols-4 gap-2">
                    {AVG_ORDERS.map(o => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => {
                          setForm(p => ({ ...p, avgOrdersPerDay: o }));
                          setFieldErrors(e => ({ ...e, avgOrdersPerDay: '' }));
                        }}
                        className={cn(
                          "py-3 rounded-2xl text-xs font-bold border-2 transition-all text-center",
                          form.avgOrdersPerDay === o
                            ? "bg-g-dark text-white border-g-dark shadow-lg shadow-g-dark/20"
                            : "bg-white text-text-mid border-border-light hover:border-g-dark/40 hover:text-g-dark"
                        )}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                  {fieldErrors.avgOrdersPerDay && (
                    <p className="text-[10px] font-bold text-red-500">{fieldErrors.avgOrdersPerDay}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2 — Connect Platforms */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-text-dark">Connect Platforms</h1>
                  <p className="text-sm text-text-muted mt-1">Connect your accounts to sync sales data. Select all that apply.</p>
                </div>

                <div className="bg-[#f6fdf9] border border-[#d1f0e4] rounded-2xl px-4 py-3 flex items-center gap-3">
                  <span className="text-lg">🔒</span>
                  <p className="text-xs text-text-mid leading-relaxed">
                    Your data is <strong className="text-text-dark">100% secure</strong>. We only read order history — never modify your account.
                  </p>
                </div>

                <div className="space-y-3">
                  {PLATFORMS.map(p => {
                    const selected = form.platforms.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => togglePlatform(p.id)}
                        className={cn(
                          "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group",
                          selected
                            ? "border-g-dark bg-[#f0faf5] shadow-sm"
                            : "border-border-light bg-white hover:border-g-dark/30 hover:shadow-sm"
                        )}
                      >
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-all",
                          p.bg
                        )}>
                          {p.emoji}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-bold text-text-dark">{p.name}</p>
                          <p className="text-xs text-text-muted">{p.desc}</p>
                        </div>
                        <div className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                          selected ? "bg-g-dark border-g-dark" : "border-gray-200 group-hover:border-g-dark/40"
                        )}>
                          {selected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {form.platforms.length > 0 ? (
                  <div className="bg-[#f0faf5] border border-[#d1f0e4] rounded-2xl p-4 flex items-center gap-3">
                    <span className="text-xl">✅</span>
                    <p className="text-xs font-bold text-g-dark">
                      {form.platforms.length} platform{form.platforms.length > 1 ? 's' : ''} selected — great choice!
                    </p>
                  </div>
                ) : fieldErrors.platforms ? (
                  <p className="text-[10px] font-bold text-red-500">{fieldErrors.platforms}</p>
                ) : null}
              </div>
            )}

            {/* Step 3 — AI Promos */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-text-dark">Your AI Promotion</h1>
                  <p className="text-sm text-text-muted mt-1">Hungrin has prepared your first smart promotion.</p>
                </div>

                {/* Promo preview card */}
                <div className="relative bg-gradient-to-br from-[#1a4d3a] to-[#2d7a5f] rounded-3xl p-6 overflow-hidden">
                  <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full" />
                  <div className="absolute -left-4 bottom-0 w-24 h-24 bg-white/10 rounded-full" />
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl shrink-0">🍔</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-orange-400 text-white text-[10px] font-black px-2 py-0.5 rounded-full">🔥 HOT DEAL</span>
                        <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">High conversion</span>
                      </div>
                      <p className="text-white font-black text-lg leading-tight">Burger Bundle!</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-white font-black text-2xl">£12.99</span>
                        <span className="text-white/50 text-sm line-through">£16.99</span>
                      </div>
                      <p className="text-white/60 text-xs mt-1">Only 7 slots left today · Auto-Monday Traffic</p>
                    </div>
                  </div>
                  <button className="relative z-10 mt-4 w-full py-3 bg-white text-g-dark rounded-2xl text-sm font-black hover:bg-g-pale transition-all">
                    Launch This Promotion →
                  </button>
                </div>

                {/* Platform badges */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-text-dark">This promo will be pushed to:</p>
                  <div className="flex gap-2 flex-wrap">
                    {['🛵 Uber Eats', '🦘 Deliveroo', '🍽️ Just Eat'].map(p => (
                      <span key={p} className="bg-[#f6fdf9] border border-[#d1f0e4] text-g-dark text-xs font-bold px-3 py-1.5 rounded-full">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Avg uplift', val: '+18%' },
                    { label: 'Conversion rate', val: '45%' },
                    { label: 'Restaurants using', val: '500+' },
                  ].map(s => (
                    <div key={s.label} className="bg-[#f6fdf9] border border-[#d1f0e4] rounded-2xl p-3 text-center">
                      <p className="text-lg font-black text-g-dark">{s.val}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4 — You're Live */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="flex flex-col items-center text-center gap-4 py-4">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#d1f0e4]">
                      <Image
                        src="/images/robot-happy.jpeg"
                        alt="Hungrin is live"
                        width={112}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-g-dark rounded-full flex items-center justify-center border-2 border-white">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-[#f0faf5] border border-[#d1f0e4] rounded-full px-5 py-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-g-dark animate-pulse" />
                    <span className="text-sm font-black text-g-dark">You're Live!</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-text-dark">Hungrin is active</h1>
                    <p className="text-sm text-text-muted mt-2 max-w-sm">
                      Your AI assistant is now monitoring your restaurant and will start generating promotions automatically.
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {[
                    { icon: '🤖', text: 'AI is monitoring your promotions in real-time' },
                    { icon: '📊', text: 'Sales insights will appear in your dashboard' },
                    { icon: '🎯', text: 'Promotions update automatically based on trends' },
                    { icon: '📱', text: 'You\'ll receive alerts when promos go live' },
                  ].map(f => (
                    <div key={f.text} className="flex items-center gap-3 bg-[#f6fdf9] border border-[#d1f0e4] rounded-2xl px-4 py-3">
                      <span className="text-xl shrink-0">{f.icon}</span>
                      <p className="text-sm font-medium text-text-dark">{f.text}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Setup', val: '✓ Done' },
                    { label: 'AI Status', val: '🟢 Live' },
                    { label: 'Promos', val: '🎯 Ready' },
                  ].map(s => (
                    <div key={s.label} className="bg-white border border-border-light rounded-2xl p-3 text-center shadow-sm">
                      <p className="text-sm font-black text-text-dark">{s.val}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="px-6 lg:px-10 py-5 border-t border-border-light bg-white flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              onClick={() => { setFieldErrors({}); setStep(s => s - 1); }}
              className="flex items-center gap-2 text-sm font-bold text-text-mid hover:text-g-dark transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <Link href={ROUTES.HOME} className="text-xs text-text-muted hover:text-g-dark transition-all">
              ← Back to home
            </Link>
          )}

          <div className="flex items-center gap-3">
            {step < STEPS.length && (
              <span className="text-xs text-text-muted hidden sm:block">
                {STEPS.length - step} step{STEPS.length - step !== 1 ? 's' : ''} remaining
              </span>
            )}
            {step < STEPS.length ? (
              <Button
                onClick={handleContinue}
                className="bg-gradient-to-r from-[#23664f] to-[#2d7a5f] text-white px-6"
              >
                Continue <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={() => router.push(ROUTES.DASHBOARD)}
                className="bg-gradient-to-r from-[#23664f] to-[#2d7a5f] text-white px-6"
              >
                Go to Dashboard <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
