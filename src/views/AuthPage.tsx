'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle2,
  Utensils
} from 'lucide-react';
import { Logo } from '@/src/components/Logo';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';

interface AuthPageProps {
  mode: 'login' | 'register';
}

export default function AuthPage({ mode }: AuthPageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('hungrinLoggedIn', 'true');
      }
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#eaf6f0] flex">
      {/* Left Panel: Form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-24 py-12 bg-white">
        <div className="max-w-md w-full mx-auto space-y-10">
          <Logo />
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-text-dark tracking-tight">
              {mode === 'login' ? 'Welcome back!' : 'Create your account'}
            </h1>
            <p className="text-text-mid font-medium">
              {mode === 'login' ? 'Log in to manage your restaurant growth.' : 'Join 1,000+ restaurants scaling with Hungrin.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'register' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Restaurant Name</label>
                <div className="relative">
                  <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input 
                    required 
                    type="text" 
                    placeholder="Sarah's Burger Shack" 
                    className="w-full bg-g-faint border border-border-light rounded-xl pl-12 pr-4 py-3.5 text-sm outline-none focus:border-g-dark transition-all" 
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input 
                  required 
                  type="email" 
                  placeholder="name@restaurant.com" 
                  className="w-full bg-g-faint border border-border-light rounded-xl pl-12 pr-4 py-3.5 text-sm outline-none focus:border-g-dark transition-all" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input 
                  required 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-g-faint border border-border-light rounded-xl pl-12 pr-4 py-3.5 text-sm outline-none focus:border-g-dark transition-all" 
                />
              </div>
            </div>

            <Button type="submit" className="w-full py-4 text-base" disabled={loading}>
              {loading ? 'Processing...' : mode === 'login' ? 'Log In' : 'Create Account'}
              {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
            </Button>
          </form>

          <p className="text-center text-sm text-text-mid font-medium">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <Link 
              href={mode === 'login' ? '/register' : '/login'} 
              className="text-g-dark font-bold ml-1 hover:underline"
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel: Content */}
      <div className="hidden lg:flex flex-1 bg-g-dark p-20 flex-col justify-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="relative z-10 space-y-12 max-w-lg">
          <div className="space-y-6">
            <h2 className="text-5xl font-black leading-tight">
              Scale your restaurant <br /> like a pro.
            </h2>
            <p className="text-xl text-g-pale/80 font-medium leading-relaxed">
              Hungrin helps you automate your marketing and focus on what you do best—making great food.
            </p>
          </div>

          <div className="space-y-6">
            {[
              'Increase repeat orders by up to 30%',
              'Automated weather-based promotions',
              'Works with all major delivery platforms',
              'Real-time growth analytics'
            ].map(f => (
              <div key={f} className="flex items-center gap-4 text-lg font-bold">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
