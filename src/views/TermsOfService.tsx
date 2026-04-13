'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/src/components/brand';

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `By creating an account or using Hungrin, you agree to these Terms of Service. If you are using Hungrin on behalf of a business, you represent that you have authority to bind that business to these terms.`,
  },
  {
    title: '2. Description of Service',
    body: `Hungrin is an AI-powered restaurant growth platform that connects to third-party delivery platforms (Uber Eats, Deliveroo, Just Eat) to sync order data and generate promotional recommendations. We provide dashboards, analytics, and AI-generated marketing suggestions.`,
  },
  {
    title: '3. Account Registration',
    body: `You must provide accurate and complete information when registering. You are responsible for maintaining the security of your account credentials. Notify us immediately at support@hungrin.com if you suspect unauthorised access.

You must be at least 18 years old to use Hungrin. One account per restaurant owner is permitted unless you purchase a multi-location plan.`,
  },
  {
    title: '4. Acceptable Use',
    body: `You agree not to:
• Use Hungrin for any unlawful purpose
• Attempt to reverse-engineer or copy the platform
• Upload malicious content or interfere with platform security
• Misrepresent your restaurant, cuisine, or promotional offers
• Share account credentials with unauthorised third parties

Violation of these terms may result in immediate account suspension.`,
  },
  {
    title: '5. Third-Party Platform Connections',
    body: `Connecting your Uber Eats, Deliveroo, or Just Eat accounts grants Hungrin read-only access to your order history. We do not modify your delivery platform accounts. You remain subject to each platform's own terms of service.`,
  },
  {
    title: '6. Subscription and Billing',
    body: `Hungrin offers a free tier and paid plans billed monthly or annually. Paid subscriptions renew automatically. You may cancel at any time; cancellation takes effect at the end of your current billing period.

No refunds are issued for partial months. Failed payments result in a 7-day grace period before account downgrade.`,
  },
  {
    title: '7. Intellectual Property',
    body: `Hungrin owns all rights to the platform, its code, design, and AI models. Your restaurant data and promotional content remain your property. You grant Hungrin a licence to process your data solely to provide the service.`,
  },
  {
    title: '8. Disclaimers and Limitation of Liability',
    body: `Hungrin is provided "as is". We do not guarantee specific sales uplifts or promotional outcomes. AI recommendations are suggestions only — you are responsible for the promotions you choose to run.

To the maximum extent permitted by law, Hungrin's liability is limited to the fees you paid in the 12 months preceding a claim.`,
  },
  {
    title: '9. Termination',
    body: `Either party may terminate at any time. Upon termination, your data is deleted within 30 days. Clauses on intellectual property, limitation of liability, and governing law survive termination.`,
  },
  {
    title: '10. Governing Law',
    body: `These terms are governed by the laws of England and Wales. Disputes shall be resolved in the courts of England and Wales.`,
  },
  {
    title: '11. Changes to Terms',
    body: `We may update these terms with 14 days' notice by email. Continued use after that date constitutes acceptance. If you disagree, you may cancel your account before the effective date.`,
  },
  {
    title: '12. Contact',
    body: `Hungrin AI Ltd · 20 Eastbourne Terrace, London W2 6LG
Email: legal@hungrin.com`,
  },
];

export function TermsOfService() {
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
          <h1 className="text-3xl sm:text-4xl font-black text-text-dark">Terms of Service</h1>
          <p className="text-sm text-text-muted">Last updated: 1 April 2026 · Effective: 1 April 2026</p>
        </div>

        <div className="bg-[#f0faf5] border border-[#d1f0e4] rounded-2xl px-5 py-4 text-sm text-text-mid leading-relaxed">
          Please read these Terms of Service carefully before using Hungrin. By accessing or using our platform, you agree to be bound by these terms.
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
            <Link href="/privacy" className="font-bold hover:text-g-dark transition-colors">Privacy</Link>
            <Link href="/cookies" className="font-bold hover:text-g-dark transition-colors">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
