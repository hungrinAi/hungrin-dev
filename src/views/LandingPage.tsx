'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  Zap,
  Globe,
  Shield,
  Clock,
  Play
} from 'lucide-react';
import { Logo } from '@/src/components/Logo';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';

export default function LandingPage() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoggedIn(localStorage.getItem('hungrinLoggedIn') === 'true');
    }
  }, []);

  const handleDashboardClick = () => {
    router.push(loggedIn ? '/dashboard' : '/login');
  };

  return (
    <div className="min-h-screen bg-[#eaf6f0] selection:bg-g-pale selection:text-g-dark">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border-light shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: 'Features', href: '#features' },
              { label: 'Integrations', href: '#integrations' },
              { label: 'Onboarding', href: '/onboarding' },
              { label: 'Pricing', href: '#pricing' },
            ].map(l => (
              <Link
                key={l.label}
                href={l.href}
                className="relative px-4 py-2 text-sm font-semibold text-text-mid hover:text-g-dark transition-colors rounded-lg hover:bg-g-faint group"
              >
                {l.label}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-g-dark rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              size="sm"
              className="gap-1.5 bg-gradient-to-r from-[#23664f] to-[#2d7a5f] text-white hover:from-[#1f5745] hover:to-[#255746]"
              onClick={handleDashboardClick}
            >
              Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border-light rounded-full text-xs font-bold text-g-dark shadow-sm">
            <Sparkles className="w-4 h-4" /> AI-Powered Restaurant Growth
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-text-dark leading-[1.1] tracking-tight">
            Grow your restaurant <br />
            <span className="text-g-dark">with AI.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-mid max-w-lg leading-relaxed">
            Win back customers, increase orders, and drive revenue with targeted campaigns. No contracts, cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-[#23664f] to-[#2d7a5f] text-white hover:from-[#1f5745] hover:to-[#255746]"
              onClick={handleDashboardClick}
            >
              Open Dashboard <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center gap-2">
                <Play className="w-4 h-4 fill-current" /> Book a Demo
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4">
            {['No credit card required', 'Works with Uber Eats, Deliveroo', 'Cancel anytime'].map(f => (
              <div key={f} className="flex items-center gap-2 text-sm text-text-mid font-medium">
                <CheckCircle2 className="w-4 h-4 text-g-dark" /> {f}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-g-pale rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-g-pale rounded-full blur-3xl opacity-50" />
          {/* Dashboard preview mockup */}
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
                <div className="flex items-center gap-1.5 px-1 mb-4">
                  <div className="w-5 h-5 grid grid-cols-2 gap-0.5 shrink-0">
                    {[0,1,2,3].map(i => <div key={i} className="bg-[#2d7a5f] rounded-[2px]" />)}
                  </div>
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
                {/* Header row */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-black text-gray-800 leading-tight">Restaurant Dashboard</p>
                    <p className="text-[8px] text-gray-400">Nearest Restaurant of Nation</p>
                  </div>
                  {/* AI tip tooltip */}
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-2.5 py-2 max-w-[130px] flex items-start gap-1.5">
                    <div className="w-4 h-4 bg-[#eaf6f0] rounded-md flex items-center justify-center shrink-0">
                      <span className="text-[7px]">🤖</span>
                    </div>
                    <p className="text-[7px] text-gray-600 leading-tight">
                      <span className="font-bold text-gray-800">AI tip:</span> Run a lunch promo — orders drop 38% on rainy Wednesdays.
                    </p>
                  </div>
                </div>
                {/* Stats row */}
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
                {/* Chart */}
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
                {/* Promo banner */}
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

      {/* Features Section */}
      <section id="features" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-text-dark tracking-tight">
              Everything you need to <span className="text-g-dark">scale.</span>
            </h2>
            <p className="text-lg text-text-mid max-w-2xl mx-auto">
              Our AI-powered platform helps you manage every aspect of your restaurant's growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: 'Growth Analytics', desc: 'Track your performance with real-time data and AI-driven insights.' },
              { icon: Zap, title: 'Automated Promos', desc: 'Launch targeted promotions that actually convert, powered by AI.' },
              { icon: Globe, title: 'Multi-Platform', desc: 'Works seamlessly with Uber Eats, Deliveroo, and Just Eat.' },
              { icon: Shield, title: 'Secure & Reliable', desc: 'Your data is safe with us. Enterprise-grade security for your restaurant.' },
              { icon: Clock, title: 'Save Time', desc: 'Let our AI handle the marketing so you can focus on the food.' },
              { icon: Sparkles, title: 'AI Assistant', desc: 'A dedicated AI growth assistant ready to help you 24/7.' },
            ].map((f, i) => (
              <Card key={i} className="p-8 hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-g-faint rounded-2xl flex items-center justify-center text-g-dark mb-6 group-hover:scale-110 transition-all">
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-3">{f.title}</h3>
                <p className="text-text-mid leading-relaxed text-sm">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-g-dark rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Ready to grow your <br /> restaurant today?
            </h2>
            <p className="text-lg text-g-pale/80 max-w-2xl mx-auto font-medium">
              Join 1,000+ restaurants using Hungrin to boost their sales and win back customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                type="button"
                size="lg"
                className="bg-white text-g-dark hover:bg-g-pale w-full sm:w-auto"
                onClick={handleDashboardClick}
              >
                Open Dashboard
              </Button>
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
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-border-light flex flex-col md:flex-row items-center justify-between gap-8">
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
