'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Play
} from 'lucide-react';
import { Logo } from '@/src/components/brand';
import { Button } from '@/src/components/ui/Button';
import { BackButton } from '@/src/components/ui/BackButton';
import { Card } from '@/src/components/ui/Card';

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#eaf6f0] flex items-center justify-center p-6">
        <Card className="max-w-md w-full p-12 text-center space-y-8">
          <div className="w-20 h-20 bg-g-pale rounded-full flex items-center justify-center text-g-dark mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-text-dark tracking-tight">Demo Booked!</h1>
            <p className="text-text-mid font-medium">
              We've received your request. One of our growth experts will contact you shortly to confirm your demo.
            </p>
          </div>
          <Link href="/">
            <Button variant="outline" className="w-full py-4">Back to Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaf6f0] py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <div className="flex flex-col gap-4">
            <BackButton href="/" label="Back to home" />
            <Logo />
          </div>
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border-light rounded-full text-xs font-bold text-g-dark shadow-sm">
              <Sparkles className="w-4 h-4" /> Personalized Product Tour
            </div>
            <h1 className="text-5xl font-black text-text-dark leading-tight tracking-tight">
              See how Hungrin can <br />
              <span className="text-g-dark">grow your restaurant.</span>
            </h1>
            <p className="text-xl text-text-mid leading-relaxed max-w-lg">
              Book a 15-minute demo with our team to see the platform in action and learn how we can help you scale.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: Calendar, title: 'Flexible Scheduling', desc: 'Choose a time that works best for you.' },
              { icon: Clock, title: 'Quick 15-min Tour', desc: 'We value your time. Short and impactful.' },
              { icon: Users, title: 'Expert Guidance', desc: 'Talk to a restaurant growth specialist.' },
            ].map((f, i) => (
              <div key={i} className="flex gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-g-dark shadow-sm border border-border-light shrink-0">
                  <f.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-dark">{f.title}</h3>
                  <p className="text-sm text-text-mid font-medium">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card className="p-10 shadow-2xl border-2 border-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-dark uppercase tracking-wider">First Name</label>
                <input required type="text" placeholder="John" className="w-full bg-g-faint border border-border-light rounded-xl px-4 py-3.5 text-sm outline-none focus:border-g-dark transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Last Name</label>
                <input required type="text" placeholder="Doe" className="w-full bg-g-faint border border-border-light rounded-xl px-4 py-3.5 text-sm outline-none focus:border-g-dark transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Work Email</label>
              <input required type="email" placeholder="john@restaurant.com" className="w-full bg-g-faint border border-border-light rounded-xl px-4 py-3.5 text-sm outline-none focus:border-g-dark transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Restaurant Name</label>
              <input required type="text" placeholder="Sarah's Burger Shack" className="w-full bg-g-faint border border-border-light rounded-xl px-4 py-3.5 text-sm outline-none focus:border-g-dark transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Monthly Orders</label>
              <select className="w-full bg-g-faint border border-border-light rounded-xl px-4 py-3.5 text-sm outline-none focus:border-g-dark transition-all appearance-none cursor-pointer">
                <option>0 - 100 orders</option>
                <option>100 - 500 orders</option>
                <option>500 - 1,000 orders</option>
                <option>1,000+ orders</option>
              </select>
            </div>
            <Button type="submit" className="w-full py-4 text-base flex items-center justify-center gap-2">
              <Play className="w-4 h-4 fill-current" /> Book My Demo <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-center text-[10px] text-text-muted font-medium">
              By clicking "Book My Demo", you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
