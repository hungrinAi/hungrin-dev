import { useState } from 'react';

export type BillingModal =
  | 'updatePlan'
  | 'cancelPlan'
  | 'updatePayment'
  | 'addOn'
  | 'contact'
  | null;

export function useBillingModals() {
  const [activeModal, setActiveModal] = useState<BillingModal>(null);
  const [addOnTarget, setAddOnTarget] = useState<string>('');

  const open = (modal: Exclude<BillingModal, null>, addon?: string) => {
    if (addon) setAddOnTarget(addon);
    setActiveModal(modal);
  };
  const close = () => setActiveModal(null);

  return { activeModal, addOnTarget, open, close };
}
