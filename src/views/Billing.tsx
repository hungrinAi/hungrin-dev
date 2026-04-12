'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Check, CreditCard, MessageCircle, Plus, ToggleLeft, ToggleRight, XCircle } from 'lucide-react';
import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  useBillingModals,
  useBillingState,
  UpdatePlanModal,
  CancelPlanModal,
  UpdatePaymentModal,
  AddOnModal,
  ContactModal,
  BILLING_HISTORY,
  PLAN_FEATURES,
  SUBSCRIPTION_EXTRAS,
  BILLING_PAGES_TOTAL,
} from '@/features/billing';

export default function Billing() {
  const [weatherInsights, setWeatherInsights] = useState(true);
  const { activeModal, addOnTarget, open, close } = useBillingModals();
  const {
    currentPlan,
    cancelled,
    cardLast4,
    addedOns,
    page,
    setPage,
    handlePlanConfirmed,
    handleCancelConfirmed,
    handlePaymentConfirmed,
    handleAddOnConfirmed,
    handleContactConfirmed,
    handleReactivate,
  } = useBillingState();

  return (
    <AppLayout
      title={
        <span className="flex items-center gap-1.5 text-sm font-bold">
          <Link href="/settings" className="text-text-muted hover:text-g-dark transition-all flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" /> Settings
          </Link>
          <span className="text-border-light">/</span>
          <span className="text-text-dark">Billing</span>
        </span>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Current Plan Card */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-1">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Current Plan</p>
                  {cancelled && (
                    <span className="text-[9px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <XCircle className="w-2.5 h-2.5" /> Cancelled
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-black text-text-dark">{currentPlan.name} Plan</h2>
                <p className="text-2xl font-black text-g-dark mt-1">
                  {currentPlan.price}
                  <span className="text-sm font-bold text-text-muted">/month</span>
                </p>
              </div>
              {!cancelled && (
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" onClick={() => open('updatePlan')}>Update Plan</Button>
                  <Button variant="outline" size="sm" onClick={() => open('cancelPlan')}>Cancel Plan</Button>
                </div>
              )}
              {cancelled && (
                <Button size="sm" onClick={() => { handleReactivate(); open('updatePlan'); }}>
                  Reactivate
                </Button>
              )}
            </div>
            <div className="mt-4 space-y-2">
              {PLAN_FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs text-text-mid font-medium">
                  <Check className="w-3.5 h-3.5 text-g-dark shrink-0" /> {f}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-text-muted mt-4 border-t border-border-light pt-3">
              {cancelled
                ? 'Active until May 20, 2025 · No further charges'
                : <><span>Auto-renews on May 20, 2025 · </span><button className="text-g-dark underline hover:no-underline" onClick={() => open('contact')}>Contact us</button></>
              }
            </p>
          </Card>

          {/* Billing History */}
          <Card className="overflow-hidden">
            <div className="px-6 py-4 border-b border-border-light">
              <h3 className="text-sm font-bold text-text-dark">Billing History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-g-faint border-b border-border-light">
                    <th className="px-3 md:px-6 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider">Date</th>
                    <th className="px-3 md:px-6 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider">Description</th>
                    <th className="px-3 md:px-6 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider hidden sm:table-cell">Status</th>
                    <th className="px-3 md:px-6 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {BILLING_HISTORY.map((row, i) => (
                    <tr key={i} className="hover:bg-g-faint/50 transition-colors">
                      <td className="px-3 md:px-6 py-3 text-xs text-text-muted whitespace-nowrap">{row.date}</td>
                      <td className="px-3 md:px-6 py-3 text-xs font-medium text-text-dark">{currentPlan.name} Plan</td>
                      <td className="px-3 md:px-6 py-3 hidden sm:table-cell">
                        <span className="text-[10px] font-bold bg-g-pale text-g-dark px-2 py-0.5 rounded-full">{row.status}</span>
                      </td>
                      <td className="px-3 md:px-6 py-3 text-xs font-bold text-text-dark text-right whitespace-nowrap">{currentPlan.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-g-faint border-t border-border-light flex items-center justify-between">
              <p className="text-xs text-text-muted">Page <strong>{page}</strong> of {BILLING_PAGES_TOTAL}</p>
              <div className="flex gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-[10px] font-bold bg-white border border-border-light rounded-lg text-text-muted hover:bg-g-pale transition-all disabled:opacity-40"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => setPage(p => Math.min(BILLING_PAGES_TOTAL, p + 1))}
                  disabled={page === BILLING_PAGES_TOTAL}
                  className="px-3 py-1.5 text-[10px] font-bold bg-white border border-border-light rounded-lg text-text-mid hover:bg-g-pale transition-all disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">

          {/* Payment Method */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-text-dark">Payment Method</h3>
            <div className="flex items-center gap-4 p-4 bg-g-faint rounded-xl border border-border-light">
              <div className="w-10 h-8 bg-blue-600 rounded flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-text-dark">Visa ···· {cardLast4}</p>
                <p className="text-[10px] text-text-muted">Expires 12/29</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0" onClick={() => open('updatePayment')}>Update</Button>
            </div>
            <p className="text-[10px] text-text-muted flex items-center gap-1.5">
              <span className="text-g-dark">🔒</span> Payment data is encrypted &amp; securely stored.
            </p>
          </Card>

          {/* Subscription Extras */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-text-dark">Subscription Extras</h3>
            <div className="space-y-3">
              {SUBSCRIPTION_EXTRAS.map((extra) => {
                const isAdded = addedOns.has(extra.label);
                return (
                  <div key={extra.label} className="flex items-start justify-between gap-3 p-3 bg-g-faint rounded-xl border border-border-light">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-text-dark flex items-center gap-1.5">
                        {extra.label}
                        {isAdded && <Check className="w-3 h-3 text-g-dark" />}
                      </p>
                      <p className="text-[10px] text-text-muted mt-0.5">{extra.desc}</p>
                    </div>
                    {isAdded ? (
                      <span className="shrink-0 text-[10px] font-bold text-g-dark bg-g-pale border border-g-dark/20 px-2.5 py-1.5 rounded-lg">
                        Active
                      </span>
                    ) : (
                      <button
                        onClick={() => open('addOn', extra.label)}
                        className="shrink-0 text-[10px] font-bold text-g-dark bg-g-pale border border-g-dark/20 px-2.5 py-1.5 rounded-lg hover:bg-g-dark hover:text-white transition-all whitespace-nowrap flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add {extra.price}
                      </button>
                    )}
                  </div>
                );
              })}

              <div className="flex items-start justify-between gap-3 p-3 bg-g-faint rounded-xl border border-border-light">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-text-dark">Menu Enhancements</p>
                  <p className="text-[10px] text-text-muted mt-0.5">Coming soon</p>
                </div>
                <span className="shrink-0 text-[10px] font-bold text-text-muted bg-gray-100 px-2.5 py-1.5 rounded-lg whitespace-nowrap">Coming Soon</span>
              </div>

              <div className="flex items-start justify-between gap-3 p-3 bg-g-faint rounded-xl border border-border-light">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-text-dark">Weather Insights</p>
                  <p className="text-[10px] text-text-muted mt-0.5">Enable advanced weather-based deals</p>
                </div>
                <button
                  onClick={() => setWeatherInsights(w => !w)}
                  className="shrink-0 transition-all active:scale-95"
                >
                  {weatherInsights
                    ? <ToggleRight className="w-8 h-8 text-g-dark" />
                    : <ToggleLeft className="w-8 h-8 text-text-muted" />
                  }
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Help Banner */}
      <div className="bg-gradient-to-r from-g-pale to-[#d4f0e0] border border-border-light rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[#0d3d2c]">
            <Image src="/images/robot-thinking.jpeg" alt="" width={48} height={48} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold text-text-dark">Need help with your billing?</p>
            <p className="text-xs text-text-muted">Contact support or email us at billing@hungrin.com</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 shrink-0" onClick={() => open('contact')}>
          <MessageCircle className="w-3.5 h-3.5" /> Contact Support
        </Button>
      </div>

      {/* Modals */}
      <UpdatePlanModal
        open={activeModal === 'updatePlan'}
        onClose={close}
        currentPlanId={currentPlan.id}
        onConfirmed={(planId) => { handlePlanConfirmed(planId); close(); }}
      />
      <CancelPlanModal
        open={activeModal === 'cancelPlan'}
        onClose={close}
        onConfirmed={() => { handleCancelConfirmed(); close(); }}
      />
      <UpdatePaymentModal
        open={activeModal === 'updatePayment'}
        onClose={close}
        onConfirmed={(last4) => { handlePaymentConfirmed(last4); close(); }}
      />
      <AddOnModal
        open={activeModal === 'addOn'}
        onClose={close}
        addonName={addOnTarget}
        onConfirmed={(name) => { handleAddOnConfirmed(name); close(); }}
      />
      <ContactModal
        open={activeModal === 'contact'}
        onClose={close}
        onConfirmed={() => { handleContactConfirmed(); close(); }}
      />
    </AppLayout>
  );
}
