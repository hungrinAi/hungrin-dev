'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, CheckCircle2, Utensils } from 'lucide-react';
import { Logo } from '@/components/brand';
import { Button } from '@/components/ui/Button';
import { BackButton } from '@/components/ui/BackButton';
import { useForm } from '@/hooks/useForm';
import { composeValidators, required, email, minLength, strongPassword } from '@/lib/validators';
import { ROUTES, STORAGE_KEYS } from '@/lib/constants';

interface AuthPageProps {
  mode: 'login' | 'register';
}

const loginRules = {
  email: composeValidators(required(), email()),
  password: required('Password is required'),
};

const registerRules = {
  restaurantName: composeValidators(required('Restaurant name is required'), minLength(2)),
  email: composeValidators(required(), email()),
  password: composeValidators(required(), strongPassword),
};

const FieldWrapper = ({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) => (
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
    {children}
  </div>
);

const inputClass = (error?: string) =>
  `w-full bg-g-faint border ${error ? 'border-red-500 focus:border-red-500' : 'border-border-light focus:border-g-dark'} rounded-xl pl-12 pr-4 py-3.5 text-sm outline-none transition-all`;

export default function AuthPage({ mode }: AuthPageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const loginForm = useForm({
    initialValues: { email: '', password: '' },
    rules: loginRules,
  });

  const registerForm = useForm({
    initialValues: { restaurantName: '', email: '', password: '' },
    rules: registerRules,
  });

  const form = mode === 'login' ? loginForm : registerForm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.validateAll()) return;

    setLoading(true);
    try {
      if (mode === 'login') {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: loginForm.values.email,
            password: loginForm.values.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || 'Login failed');
          return;
        }

        localStorage.setItem(STORAGE_KEYS.LOGGED_IN, 'true');
        localStorage.setItem('hungrin_user', JSON.stringify(data.user));
        router.push(ROUTES.DASHBOARD);

      } else {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: registerForm.values.restaurantName,
            email: registerForm.values.email,
            password: registerForm.values.password,
            restaurantName: registerForm.values.restaurantName,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || 'Registration failed');
          return;
        }

        localStorage.setItem(STORAGE_KEYS.LOGGED_IN, 'true');
        localStorage.setItem('hungrin_user', JSON.stringify(data.user));
        router.push(ROUTES.DASHBOARD);
      }
    } catch (error) {
      alert('Something went wrong. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eaf6f0] flex">
      {/* Left Panel */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-24 py-12 bg-white">
        <div className="max-w-md w-full mx-auto space-y-10">
          <div className="flex flex-col gap-6">
            <BackButton href="/" label="Back to home" />
            <Logo />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black text-text-dark tracking-tight">
              {mode === 'login' ? 'Welcome back!' : 'Create your account'}
            </h1>
            <p className="text-text-mid font-medium">
              {mode === 'login'
                ? 'Log in to manage your restaurant growth.'
                : 'Join 1,000+ restaurants scaling with Hungrin.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {mode === 'register' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-dark uppercase tracking-wider">
                  Restaurant Name
                </label>
                <FieldWrapper icon={Utensils}>
                  <input
                    type="text"
                    placeholder="Sarah's Burger Shack"
                    className={inputClass(registerForm.errors.restaurantName)}
                    value={registerForm.values.restaurantName}
                    onChange={registerForm.handleChange('restaurantName')}
                    onBlur={registerForm.handleBlur('restaurantName')}
                    autoComplete="organization"
                  />
                </FieldWrapper>
                {registerForm.errors.restaurantName && (
                  <p className="text-[10px] font-bold text-red-500 pl-1">
                    {registerForm.errors.restaurantName}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-dark uppercase tracking-wider">
                Email Address
              </label>
              <FieldWrapper icon={Mail}>
                <input
                  type="email"
                  placeholder="name@restaurant.com"
                  className={inputClass(form.errors.email)}
                  value={form.values.email}
                  onChange={form.handleChange('email')}
                  onBlur={form.handleBlur('email')}
                  autoComplete="email"
                />
              </FieldWrapper>
              {form.errors.email && (
                <p className="text-[10px] font-bold text-red-500 pl-1">{form.errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-dark uppercase tracking-wider">
                Password
              </label>
              <FieldWrapper icon={Lock}>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={inputClass(form.errors.password)}
                  value={form.values.password}
                  onChange={form.handleChange('password')}
                  onBlur={form.handleBlur('password')}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
              </FieldWrapper>
              {form.errors.password ? (
                <p className="text-[10px] font-bold text-red-500 pl-1">{form.errors.password}</p>
              ) : mode === 'register' ? (
                <p className="text-[10px] text-text-muted pl-1">
                  Min 8 characters, one uppercase, one number.
                </p>
              ) : null}
            </div>

            <Button type="submit" className="w-full py-4 text-base mt-2" disabled={loading}>
              {loading ? 'Processing…' : mode === 'login' ? 'Log In' : 'Create Account'}
              {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
            </Button>
          </form>

          <p className="text-center text-sm text-text-mid font-medium">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <Link
              href={mode === 'login' ? ROUTES.REGISTER : ROUTES.LOGIN}
              className="text-g-dark font-bold ml-1 hover:underline"
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden lg:flex flex-1 bg-g-dark p-20 flex-col justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
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
              'Real-time growth analytics',
            ].map((f) => (
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