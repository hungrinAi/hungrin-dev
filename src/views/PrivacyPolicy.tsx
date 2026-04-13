'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/src/components/brand';

const sections = [
  {
    title: '1. Information We Collect',
    body: `We collect information you provide directly when you create an account, connect delivery platforms, or contact us. This includes your name, email address, restaurant details, and order data synced from connected platforms (Uber Eats, Deliveroo, Just Eat).

We also automatically collect usage data such as pages visited, features used, device type, and IP address to improve our service.`,
  },
  {
    title: '2. How We Use Your Information',
    body: `We use your data to:
• Provide and operate the Hungrin platform
• Generate AI-powered promotional recommendations
• Analyse sales trends and insights for your restaurant
• Send service notifications and product updates (you can opt out)
• Improve and develop new features
• Comply with legal obligations

We never sell your personal data to third parties.`,
  },
  {
    title: '3. Data Sharing',
    body: `We share data only with:
• Delivery platforms you explicitly connect (read-only access to order history)
• Cloud infrastructure providers (AWS, Vercel) that host Hungrin
• Analytics tools used solely to improve the product
• Law enforcement when legally required

All third-party providers are bound by data processing agreements.`,
  },
  {
    title: '4. Data Retention',
    body: `We retain your data for as long as your account is active. When you close your account, we delete your personal data within 30 days, except where we are legally required to retain it longer (e.g. financial records for 7 years).`,
  },
  {
    title: '5. Your Rights',
    body: `Under UK GDPR you have the right to:
• Access the personal data we hold about you
• Correct inaccurate data
• Request deletion of your data ("right to be forgotten")
• Object to or restrict processing
• Data portability

To exercise these rights, email privacy@hungrin.com.`,
  },
  {
    title: '6. Security',
    body: `All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We use role-based access controls and conduct regular security reviews. We will notify you within 72 hours of any data breach that affects your personal data.`,
  },
  {
    title: '7. Cookies',
    body: `We use cookies to keep you signed in and to understand how you use Hungrin. See our Cookie Policy for full details.`,
  },
  {
    title: '8. Changes to This Policy',
    body: `We may update this policy from time to time. We'll notify you by email at least 14 days before any material change takes effect.`,
  },
  {
    title: '9. Contact',
    body: `Hungrin AI Ltd · 20 Eastbourne Terrace, London W2 6LG
Email: privacy@hungrin.com
Data Controller registration: ICO reference ZB123456`,
  },
];

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-g-faint">
      {/* Nav */}
      <header className="border-b border-border-light bg-white sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/"><Logo /></Link>
          <Link href="/" className="text-sm font-bold text-text-mid hover:text-g-dark transition-colors">← Back</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        {/* Hero */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-g-dark uppercase tracking-widest">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-black text-text-dark">Privacy Policy</h1>
          <p className="text-sm text-text-muted">Last updated: 1 April 2026 · Effective: 1 April 2026</p>
        </div>

        <div className="bg-[#f0faf5] border border-[#d1f0e4] rounded-2xl px-5 py-4 text-sm text-text-mid leading-relaxed">
          Hungrin AI Ltd (&quot;Hungrin&quot;, &quot;we&quot;, &quot;us&quot;) is committed to protecting your privacy. This policy explains what data we collect, why, and how you can control it. It applies to all users of hungrin.com and the Hungrin dashboard.
        </div>

        <div className="space-y-8">
          {sections.map(s => (
            <section key={s.title} className="bg-white rounded-2xl border border-border-light p-6 sm:p-8 shadow-sm space-y-3">
              <h2 className="text-base font-black text-text-dark">{s.title}</h2>
              <p className="text-sm text-text-mid leading-relaxed whitespace-pre-line">{s.body}</p>
            </section>
          ))}
        </div>
      </main>

      <footer className="border-t border-border-light mt-16 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <span>© 2026 Hungrin AI. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/terms" className="font-bold hover:text-g-dark transition-colors">Terms</Link>
            <Link href="/cookies" className="font-bold hover:text-g-dark transition-colors">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
