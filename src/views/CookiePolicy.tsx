'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/src/components/brand';

const cookieTypes = [
  {
    name: 'Strictly Necessary',
    canDisable: false,
    description: 'These cookies are essential for Hungrin to function. They keep you signed in, maintain your session, and enable core security features. You cannot opt out of these.',
    examples: ['auth_session', 'csrf_token', 'cookie_consent'],
  },
  {
    name: 'Functional',
    canDisable: true,
    description: 'These remember your preferences — such as your selected restaurant, dashboard layout, and notification settings — so you do not have to reconfigure them each visit.',
    examples: ['user_prefs', 'sidebar_state', 'selected_restaurant'],
  },
  {
    name: 'Analytics',
    canDisable: true,
    description: 'We use analytics cookies (via a self-hosted Plausible instance) to understand which features are used and where users encounter friction. No personal data is shared with third parties.',
    examples: ['_plausible', 'page_view_session'],
  },
  {
    name: 'Marketing',
    canDisable: true,
    description: 'If you arrived via a marketing link (e.g. a Google ad or partner referral), a short-lived cookie records that source so we know which channels are effective. No cross-site tracking is used.',
    examples: ['utm_source', 'referral_partner'],
  },
];

const sections = [
  {
    title: 'What Are Cookies?',
    body: `Cookies are small text files stored on your device when you visit a website. They help websites remember information about your visit — like whether you are logged in or what preferences you have set.

Hungrin uses cookies and similar technologies (local storage, session storage) to operate the platform and improve your experience.`,
  },
  {
    title: 'How Long Do Cookies Last?',
    body: `Session cookies are deleted when you close your browser. Persistent cookies remain on your device for a set period:
• Authentication cookies: 30 days (or 7 days if you do not tick "Stay signed in")
• Preference cookies: 1 year
• Analytics cookies: 30 days rolling
• Marketing cookies: 90 days`,
  },
  {
    title: 'Managing Your Cookie Preferences',
    body: `You can control cookies in several ways:
• Use the cookie banner shown on your first visit to accept or reject optional categories
• Update your preferences at any time in Settings → Notifications
• Use your browser settings to block or delete cookies (note: blocking strictly necessary cookies will break sign-in)

Opting out of analytics and marketing cookies does not affect the core Hungrin experience.`,
  },
  {
    title: 'Third-Party Cookies',
    body: `Hungrin does not load third-party advertising or social media trackers. The only third-party cookies that may be set are from delivery platform OAuth flows (Uber Eats, Deliveroo, Just Eat) during the connection step — these are managed by those platforms under their own cookie policies.`,
  },
  {
    title: 'Changes to This Policy',
    body: `We may update this Cookie Policy if we change the technologies we use. Updates will be reflected on this page with a revised "last updated" date.`,
  },
  {
    title: 'Contact',
    body: `Hungrin AI Ltd · 20 Eastbourne Terrace, London W2 6LG
Email: privacy@hungrin.com`,
  },
];

export function CookiePolicy() {
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
          <h1 className="text-3xl sm:text-4xl font-black text-text-dark">Cookie Policy</h1>
          <p className="text-sm text-text-muted">Last updated: 1 April 2026 · Effective: 1 April 2026</p>
        </div>

        <div className="bg-[#f0faf5] border border-[#d1f0e4] rounded-2xl px-5 py-4 text-sm text-text-mid leading-relaxed">
          This Cookie Policy explains what cookies Hungrin uses, why, and how you can manage your preferences. We keep our cookie use minimal and never use cross-site tracking.
        </div>

        {/* Cookie type table */}
        <section className="space-y-4">
          <h2 className="text-base font-black text-text-dark">Types of Cookies We Use</h2>
          <div className="space-y-3">
            {cookieTypes.map(c => (
              <div key={c.name} className="bg-white rounded-2xl border border-border-light p-5 sm:p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <h3 className="font-black text-text-dark">{c.name}</h3>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    c.canDisable
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-g-pale text-g-dark border border-g-dark/20'
                  }`}>
                    {c.canDisable ? 'Optional' : 'Required'}
                  </span>
                </div>
                <p className="text-sm text-text-mid leading-relaxed">{c.description}</p>
                <div className="flex flex-wrap gap-2">
                  {c.examples.map(e => (
                    <code key={e} className="text-[11px] bg-g-faint border border-border-light rounded-lg px-2 py-1 font-mono text-text-mid">{e}</code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* General sections */}
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
            <Link href="/terms" className="font-bold hover:text-g-dark transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
