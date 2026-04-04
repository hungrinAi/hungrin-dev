import React from 'react';
import { Link } from 'react-router-dom';
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
  return (
    <div className="min-h-screen bg-[#eaf6f0] selection:bg-g-pale selection:text-g-dark">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-10">
          {['Features', 'Pricing', 'About', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-bold text-text-mid hover:text-g-dark transition-all">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-bold text-text-dark hover:text-g-dark transition-all">Log in</Link>
          <Link to="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

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
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">Get Started Free <ArrowRight className="w-5 h-5 ml-2" /></Button>
            </Link>
            <Link to="/demo">
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
          <Card className="relative z-10 p-2 bg-white/80 backdrop-blur border-2 border-white shadow-2xl">
            <img 
              src="https://picsum.photos/seed/restaurant-dashboard/1200/800" 
              alt="Dashboard Preview" 
              className="rounded-xl w-full h-auto shadow-sm"
              referrerPolicy="no-referrer"
            />
          </Card>
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
              <Link to="/register">
                <Button size="lg" className="bg-white text-g-dark hover:bg-g-pale w-full sm:w-auto">Get Started Free</Button>
              </Link>
              <Link to="/demo">
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
