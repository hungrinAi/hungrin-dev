'use client';

import React, { useState, useRef } from 'react';
import { MessageCircle, Zap, ExternalLink } from 'lucide-react';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { Card } from '@/src/components/ui/Card';
import { LifeBuoy } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { FAQS, CHANNELS, FaqItem, ContactForm, LiveChatModal } from '@/src/features/support';

export default function Support() {
  const [liveChatOpen, setLiveChatOpen] = useState(false);
  const faqRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleChannelClick = (id: string) => {
    if (id === 'chat') setLiveChatOpen(true);
    if (id === 'email') contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (id === 'docs') faqRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
              onClick={() => handleChannelClick(c.id)}
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
                onClick={(e) => { e.stopPropagation(); handleChannelClick(c.id); }}
                className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-g-dark hover:underline"
              >
                {c.action} <ExternalLink className="w-3 h-3" />
              </button>
            </Card>
          ))}
        </div>

        {/* Two-column: FAQ + Contact form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="space-y-4" ref={faqRef}>
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

          <div className="space-y-4" ref={contactRef}>
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

      <LiveChatModal open={liveChatOpen} onClose={() => setLiveChatOpen(false)} />
    </AppLayout>
  );
}
