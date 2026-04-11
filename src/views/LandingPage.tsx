'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Play,
} from 'lucide-react';
import { Logo, HungrinIcon } from '@/src/components/brand';
import { PublicNav } from '@/src/components/layout/PublicNav';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#eaf6f0] selection:bg-g-pale selection:text-g-dark">
      <PublicNav />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16 sm:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border-light rounded-full text-xs font-bold text-g-dark shadow-sm">
            <Sparkles className="w-4 h-4" /> AI-Powered Restaurant Growth
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-text-dark leading-[1.05] tracking-tight">
            Grow Your <span className="text-g-dark">Restaurant</span><br />
            Orders <span className="text-g-dark">Automatically</span>
          </h1>
          <p className="text-lg text-text-mid max-w-lg leading-relaxed">
            Hungrin uses AI to boost your restaurant sales, create promotions and bring you more customers — all from one simple dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/demo">
              <Button
                type="button"
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-[#23664f] to-[#2d7a5f] text-white hover:from-[#1f5745] hover:to-[#255746]"
              >
                Book a Demo <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-2">
            {['No credit card required', 'Works with Uber Eats, Deliveroo & Just Eat', 'Cancel anytime'].map(f => (
              <div key={f} className="flex items-center gap-2 text-sm text-text-mid font-medium">
                <CheckCircle2 className="w-4 h-4 text-g-dark shrink-0" /> {f}
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Mockup */}
        <div className="relative">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-g-pale rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-g-pale rounded-full blur-3xl opacity-50" />
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-2 border-white bg-white">
            {/* Browser chrome */}
            <div className="bg-[#f0f0f0] px-3 py-2 flex items-center gap-2 border-b border-gray-200">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 bg-white rounded-md px-3 py-0.5 text-[10px] text-gray-400 font-medium text-center">
                app.hungrin.com
              </div>
            </div>
            {/* App UI */}
            <div className="flex" style={{ height: 340 }}>
              {/* Mini sidebar */}
              <div className="w-[88px] bg-white border-r border-gray-100 flex flex-col py-3 px-2 shrink-0">
                <div className="flex items-center gap-1 px-1 mb-4">
                  <HungrinIcon size={18} />
                  <span className="text-[9px] font-black text-[#2d7a5f]">Hungrin</span>
                </div>
                <div className="space-y-0.5 flex-1">
                  {[
                    { label: 'Overview', active: false },
                    { label: 'Orders', active: true },
                    { label: 'Promotions', active: false },
                    { label: 'Customers', active: false },
                    { label: 'Insights', active: false },
                  ].map(item => (
                    <div key={item.label} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg ${item.active ? 'bg-[#eaf6f0]' : ''}`}>
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.active ? 'bg-[#2d7a5f]' : 'bg-gray-200'}`} />
                      <span className={`text-[8px] font-semibold ${item.active ? 'text-[#2d7a5f]' : 'text-gray-400'}`}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Main content */}
              <div className="flex-1 bg-[#f5faf7] p-3 overflow-hidden flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-black text-gray-800 leading-tight">Restaurant Dashboard</p>
                    <p className="text-[8px] text-gray-400">Nearest Restaurant of Nation</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-2.5 py-2 max-w-[130px] flex items-start gap-1.5">
                    <div className="w-4 h-4 bg-[#eaf6f0] rounded-md flex items-center justify-center shrink-0">
                      <span className="text-[7px]">🤖</span>
                    </div>
                    <p className="text-[7px] text-gray-600 leading-tight">
                      <span className="font-bold text-gray-800">AI tip:</span> Run a lunch promo — orders drop 38% on rainy Wednesdays.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: 'New Orders Today', value: '£780', badge: '+22% ↑' },
                    { label: 'Weekly Orders', value: '+34', badge: '+18% ↑' },
                    { label: 'Total Online', value: '285', badge: 'Active', green: true },
                  ].map(stat => (
                    <div key={stat.label} className="bg-white rounded-xl p-2.5 border border-gray-100">
                      <p className="text-[7px] text-gray-400 font-medium">{stat.label}</p>
                      <p className="text-[13px] font-black text-gray-800 mt-0.5">{stat.value}</p>
                      <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${stat.green ? 'bg-[#eaf6f0] text-[#2d7a5f]' : 'text-[#2d7a5f]'}`}>{stat.badge}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-2.5 flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[7px] font-semibold text-gray-500">Sales Performance · This Week</p>
                    <p className="text-[8px] font-black text-[#2d7a5f]">£4,230</p>
                  </div>
                  <svg viewBox="0 0 240 60" className="w-full" style={{ height: 60 }} preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2d7a5f" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#2d7a5f" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0 52 C20 50, 40 44, 60 40 C80 36, 100 38, 120 32 C140 26, 160 22, 180 18 C200 14, 220 10, 240 8" fill="none" stroke="#2d7a5f" strokeWidth="2" strokeLinecap="round" />
                    <path d="M0 52 C20 50, 40 44, 60 40 C80 36, 100 38, 120 32 C140 26, 160 22, 180 18 C200 14, 220 10, 240 8 L240 60 L0 60 Z" fill="url(#chartFill)" />
                  </svg>
                </div>
                <div className="bg-[#2d7a5f] rounded-xl px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-orange-400 text-white text-[7px] font-black px-1.5 py-0.5 rounded-md">🔥 Promo</span>
                    <div>
                      <p className="text-[8px] font-black text-white">Burger Bundle</p>
                      <p className="text-[7px] text-[#a8dfc9]">Only 7 slots left today</p>
                    </div>
                  </div>
                  <p className="text-[12px] font-black text-white">£12.99</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="bg-white py-12 sm:py-16 border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-xl font-black text-text-dark mb-10 tracking-tight">
            Access Your Hungrin Pages
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: '/dashboard', emoji: '📊', label: 'Dashboard', sub: 'View your sales & orders', bg: 'bg-[#eaf6f0]' },
              { href: '/promotions', emoji: '🎯', label: 'AI Promotions', sub: 'Create smart promotions', bg: 'bg-red-50' },
              { href: '/orders', emoji: '📂', label: 'CSV Upload', sub: 'Upload sales data', bg: 'bg-yellow-50' },
              { href: '/onboarding', emoji: '🚀', label: 'Get Started', sub: 'Set up your restaurant', bg: 'bg-orange-50' },
            ].map(({ href, emoji, label, sub, bg }) => (
              <Link
                key={label}
                href={href}
                className={`${bg} border border-border-light rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all group`}
              >
                <span className="text-3xl">{emoji}</span>
                <div>
                  <p className="text-sm font-bold text-text-dark group-hover:text-g-dark transition-colors">{label}</p>
                  <p className="text-[11px] text-text-muted mt-0.5">{sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-text-dark tracking-tight">
              Everything You Need <span className="text-g-dark">To Grow</span>
            </h2>
            <p className="text-lg text-text-mid max-w-2xl mx-auto">
              Our AI-powered platform handles your marketing so you can focus on what you do best — great food.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Growth Assistant — robot image */}
            <Card className="p-8 hover:shadow-lg transition-all group border border-border-light">
              <div className="w-14 h-14 bg-white rounded-2xl mb-6 group-hover:scale-110 transition-all shadow-sm border border-border-light overflow-hidden">
                <Image src="/images/robot-thumbsup.jpeg" alt="AI Growth Assistant" width={56} height={56} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-text-dark mb-3">AI Growth Assistant</h3>
              <p className="text-text-mid leading-relaxed text-sm">Hungrin automatically creates promotions tailored to your customers using smart criteria, date, and behaviour patterns.</p>
            </Card>

            {[
              {
                icon: '🎯',
                title: 'Promo Automation',
                desc: 'Set up campaigns and let Hungrin handle the scheduling, promotion blasting, and ensure you make money on automation.',
                bg: 'bg-red-50',
              },
              {
                icon: '📊',
                title: 'Real-Time Insights',
                desc: 'Fascinating sales data and impact — understand your customers and spot recommendations to grow your sustainability.',
                bg: 'bg-blue-50',
              },
              {
                icon: '🌤️',
                title: 'Weather Sales Insights',
                desc: 'Hungrin uses live weather data to suggest timely promotions and help you attract order-free customers on slow days.',
                bg: 'bg-yellow-50',
              },
            ].map((f, i) => (
              <Card key={i} className="p-8 hover:shadow-lg transition-all group border border-border-light">
                <div className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-all`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-3">{f.title}</h3>
                <p className="text-text-mid leading-relaxed text-sm">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations / Platforms Section */}
      <section id="integrations" className="bg-[#eaf6f0] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-text-dark leading-tight">
              <strong>Works With Your</strong> Delivery<br />Platforms
            </h2>
            <p className="text-lg text-text-mid leading-relaxed max-w-md">
              Hungrin integrates with popular delivery services so you can manage everything without switching systems.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Deliveroo', dot: 'bg-[#00CCBC]' },
                { label: 'Uber Eats', dot: 'bg-black' },
                { label: 'Just Eat', dot: 'bg-[#FF8000]' },
              ].map(p => (
                <div key={p.label} className="flex items-center gap-2 bg-white border border-border-light rounded-full px-5 py-2.5 shadow-sm">
                  <div className={`w-2.5 h-2.5 rounded-full ${p.dot}`} />
                  <span className="text-sm font-bold text-text-dark">{p.label}</span>
                </div>
              ))}
            </div>
            <Link href="/onboarding">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#23664f] to-[#2d7a5f] text-white hover:from-[#1f5745] hover:to-[#255746]"
              >
                Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Integrations Mockup */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-white bg-white">
              <div className="bg-[#f0f0f0] px-3 py-2 flex items-center gap-2 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 bg-white rounded-md px-3 py-0.5 text-[10px] text-gray-400 font-medium text-center">
                  app.hungrin.com/integrations
                </div>
              </div>
              <div className="flex" style={{ height: 260 }}>
                <div className="w-[80px] bg-white border-r border-gray-100 flex flex-col py-3 px-2 shrink-0">
                  <div className="flex items-center gap-1 px-1 mb-4">
                    <HungrinIcon size={16} />
                    <span className="text-[8px] font-black text-[#2d7a5f]">Hungrin</span>
                  </div>
                  {['Overview', 'Orders', 'Promotions', 'Customers', 'Insights'].map((item, i) => (
                    <div key={item} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg ${i === 1 ? 'bg-[#eaf6f0]' : ''}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-[#2d7a5f]' : 'bg-gray-200'}`} />
                      <span className={`text-[7px] font-semibold ${i === 1 ? 'text-[#2d7a5f]' : 'text-gray-400'}`}>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex-1 p-4 bg-[#f5faf7]">
                  <p className="text-[11px] font-black text-gray-800 mb-3">Connected Platforms</p>
                  <div className="space-y-2">
                    {[
                      { name: 'Deliveroo', dot: 'bg-[#00CCBC]', text: 'text-[#00CCBC]' },
                      { name: 'Uber Eats', dot: 'bg-black', text: 'text-gray-800' },
                      { name: 'Just Eat', dot: 'bg-[#FF8000]', text: 'text-[#FF8000]' },
                    ].map(p => (
                      <div key={p.name} className="bg-white rounded-xl px-3 py-2 flex items-center justify-between border border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${p.dot}`} />
                          <span className={`text-[9px] font-bold ${p.text}`}>{p.name}</span>
                        </div>
                        <span className="text-[8px] font-bold bg-[#eaf6f0] text-[#2d7a5f] px-2 py-0.5 rounded-full">Live</span>
                      </div>
                    ))}
                    <div className="bg-[#2d7a5f] rounded-xl px-3 py-2.5 flex items-center gap-2 mt-1">
                      <span className="text-base">🔄</span>
                      <div>
                        <p className="text-[9px] font-black text-white">Sync orders in real-time</p>
                        <p className="text-[8px] text-[#a8dfc9]">No manual entry needed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="bg-g-dark rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Ready To Boost Your<br />Restaurant Sales?
            </h2>
            <p className="text-lg text-white/70 max-w-xl mx-auto font-medium">
              No contract. No setup fees. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/onboarding">
                <Button
                  type="button"
                  size="lg"
                  className="bg-white text-g-dark hover:bg-g-pale w-full sm:w-auto font-bold"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10 hover:border-white w-full sm:w-auto flex items-center gap-2">
                  <Play className="w-4 h-4 fill-current" /> Book a Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-border-light flex flex-col md:flex-row items-center justify-between gap-8">
        <Logo />
        <p className="text-sm text-text-muted font-medium">© 2026 Hungrin AI. All rights reserved.</p>
        <div className="flex gap-8">
          {['Privacy', 'Terms', 'Cookies'].map(l => (
            <a key={l} href="#" className="text-sm font-bold text-text-mid hover:text-g-dark transition-all">{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
