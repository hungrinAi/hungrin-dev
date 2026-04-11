'use client';

import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BookOpen,
  Zap,
  LifeBuoy,
  Send,
} from 'lucide-react';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';

// ─── FAQ data ────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'How do I connect my delivery platform?',
    a: 'Go to Onboarding → Platforms and click the platform you want to connect. Hungrin reads only your order history — it never modifies your account.',
  },
  {
    q: 'How does the AI generate promotions?',
    a: 'Hungrin analyses your order history, cuisine type, location, and local weather data to suggest promotions that are most likely to drive orders at low-traffic times.',
  },
  {
    q: 'Can I edit or reject an AI-generated promotion?',
    a: 'Yes. Every AI promotion is shown to you before it goes live. You can edit the offer, change the discount, or reject it entirely from the AI Promos page.',
  },
  {
    q: 'How do I upgrade or change my plan?',
    a: 'Head to Billing from your account menu. You can upgrade, downgrade, or cancel at any time — changes take effect at the start of your next billing cycle.',
  },
  {
    q: 'Is my restaurant data safe?',
    a: 'Yes. Hungrin connects to delivery platforms with read-only access. Your credentials are encrypted at rest and in transit. We never share your data with third parties.',
  },
  {
    q: 'What delivery platforms does Hungrin support?',
    a: 'Currently Uber Eats, Deliveroo, and Just Eat. More platforms are coming soon — reach out to support to request one.',
  },
];

// ─── Contact channels ─────────────────────────────────────────────────────────
const CHANNELS = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    desc: 'Chat with our team in real time.',
    action: 'Start Chat',
    badge: 'Fastest',
    badgeColor: 'bg-g-pale text-g-dark',
  },
  {
    icon: Mail,
    title: 'Email Support',
    desc: 'We respond within 24 hours.',
    action: 'Send Email',
    badge: null,
    badgeColor: '',
  },
  {
    icon: BookOpen,
    title: 'Help Docs',
    desc: 'Guides, walkthroughs and video tutorials.',
    action: 'Browse Docs',
    badge: null,
    badgeColor: '',
  },
];

// ─── FAQ accordion item ───────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border-light rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-g-faint transition-colors"
      >
        <span className="text-sm font-bold text-text-dark pr-4">{q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-g-dark shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm text-text-mid leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// ─── Contact form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
        <div className="w-14 h-14 rounded-full bg-g-pale flex items-center justify-center">
          <Send className="w-6 h-6 text-g-dark" />
        </div>
        <div>
          <p className="font-bold text-text-dark">Message sent!</p>
          <p className="text-sm text-text-muted mt-1">We'll get back to you within 24 hours.</p>
        </div>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-xs font-bold text-g-dark hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Subject</label>
        <input
          required
          type="text"
          placeholder="e.g. Problem with promotions"
          className="w-full bg-g-faint border border-border-light rounded-xl px-4 py-3 text-sm outline-none focus:border-g-dark focus:ring-2 focus:ring-[#d1f0e4] transition-all"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">Message</label>
        <textarea
          required
          rows={4}
          placeholder="Describe your issue in as much detail as possible…"
          className="w-full bg-g-faint border border-border-light rounded-xl px-4 py-3 text-sm outline-none focus:border-g-dark focus:ring-2 focus:ring-[#d1f0e4] transition-all resize-none"
        />
      </div>
      <Button type="submit" className="w-full">
        Send Message <Send className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Support() {
  return (
    <AppLayout title="Support" subtitle="Get help, read the docs, or contact our team">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header banner */}
        <div className="relative bg-gradient-to-br from-[#1a4d3a] via-[#23664f] to-[#2d7a5f] rounded-3xl px-8 py-10 overflow-hidden text-white">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute bottom-0 left-20 w-32 h-32 rounded-full bg-white/5" />
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center shrink-0">
              <LifeBuoy className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black leading-tight">How can we help?</h2>
              <p className="text-white/70 text-sm mt-1">
                Search our help docs, browse FAQs, or send us a message — we typically reply within a few hours.
              </p>
            </div>
          </div>
        </div>

        {/* Contact channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CHANNELS.map((c) => (
            <Card
              key={c.title}
              className="p-6 flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 bg-g-faint rounded-2xl flex items-center justify-center group-hover:bg-g-pale transition-colors">
                  <c.icon className="w-5 h-5 text-g-dark" />
                </div>
                {c.badge && (
                  <span className={cn('text-[10px] font-black px-2 py-1 rounded-full', c.badgeColor)}>
                    {c.badge}
                  </span>
                )}
              </div>
              <div>
                <p className="font-bold text-text-dark">{c.title}</p>
                <p className="text-xs text-text-muted mt-0.5">{c.desc}</p>
              </div>
              <button
                type="button"
                className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-g-dark hover:underline"
              >
                {c.action} <ExternalLink className="w-3 h-3" />
              </button>
            </Card>
          ))}
        </div>

        {/* Two-column: FAQ + Contact form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* FAQ */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-g-dark" />
              <h3 className="font-black text-text-dark">Frequently Asked Questions</h3>
            </div>
            <div className="space-y-2">
              {FAQS.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-g-dark" />
              <h3 className="font-black text-text-dark">Send Us a Message</h3>
            </div>
            <Card className="p-6">
              <ContactForm />
            </Card>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
