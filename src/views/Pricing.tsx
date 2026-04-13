'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Send, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';
import {
  PRICING_PLANS,
  usePricingChat,
  useContactSales,
  PricingCard,
  FeatureTable,
  AiChatPanel,
  ContactSalesModal,
  PricingSidebar,
} from '@/features/pricing';

export default function Pricing() {
  const router = useRouter();
  const { chatInput, setChatInput, aiMessages, showChat, sendChat, clearChat } = usePricingChat();
  const contactSales = useContactSales();

  return (
    <AppLayout title="Pricing" subtitle="Choose a plan that fits your business needs.">
      <div className="flex gap-6 min-h-0">
        <div className="flex-1 min-w-0 space-y-6 pb-24">

          {showChat && aiMessages.length > 0 && (
            <AiChatPanel messages={aiMessages} onClose={clearChat} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
            {PRICING_PLANS.map(plan => (
              <PricingCard
                key={plan.name}
                plan={plan}
                onSelect={() => router.push(ROUTES.ONBOARDING)}
              />
            ))}
          </div>

          <FeatureTable />
        </div>

        <div className="w-72 shrink-0 hidden lg:flex flex-col gap-4">
          <PricingSidebar />
        </div>
      </div>

      {/* Sticky chat bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-border-light px-6 py-3 flex items-center gap-3 z-10">
        <input
          type="text"
          placeholder="Ask the AI to compare plans…"
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendChat()}
          className="flex-1 bg-g-faint border border-border-light rounded-xl px-4 py-2 text-sm outline-none focus:border-g-dark transition-all"
        />
        <Button size="sm" className="gap-1.5 shrink-0" onClick={() => sendChat()}>
          <MessageCircle className="w-3.5 h-3.5" /> Ask Now
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 shrink-0 hidden sm:flex"
          onClick={() => router.push('/support')}
        >
          <HelpCircle className="w-3.5 h-3.5" /> AI FAQs
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 shrink-0 hidden sm:flex"
          onClick={contactSales.open}
        >
          <Phone className="w-3.5 h-3.5" /> Contact Sales
        </Button>
        <button
          onClick={() => sendChat()}
          className="bg-g-dark text-white p-2 rounded-xl hover:bg-g-mid transition-all shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      <ContactSalesModal open={contactSales.isOpen} onClose={contactSales.close} />
    </AppLayout>
  );
}
