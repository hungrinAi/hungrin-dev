import { useState } from 'react';
import { useNotifications } from '@/contexts/NotificationsContext';
import { PLANS } from '../components/UpdatePlanModal';

export function useBillingState() {
  const { addNotification } = useNotifications();

  const [currentPlanId, setCurrentPlanId] = useState('growth');
  const [cancelled, setCancelled] = useState(false);
  const [cardLast4, setCardLast4] = useState('4242');
  const [addedOns, setAddedOns] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  const currentPlan = PLANS.find(p => p.id === currentPlanId) ?? PLANS[1];

  const handlePlanConfirmed = (planId: string) => {
    setCurrentPlanId(planId);
    const plan = PLANS.find(p => p.id === planId);
    addNotification({
      type: 'success',
      title: 'Plan updated',
      message: `You're now on the ${plan?.name} plan at ${plan?.price}/month.`,
    });
  };

  const handleCancelConfirmed = () => {
    setCancelled(true);
    addNotification({
      type: 'warning',
      title: 'Plan cancelled',
      message: 'Your plan will stay active until May 20, 2025. No further charges.',
    });
  };

  const handlePaymentConfirmed = (last4: string) => {
    setCardLast4(last4);
    addNotification({
      type: 'success',
      title: 'Payment method updated',
      message: `Your card ending in ${last4} is now active.`,
    });
  };

  const handleAddOnConfirmed = (addonName: string) => {
    setAddedOns(prev => new Set([...prev, addonName]));
    addNotification({
      type: 'success',
      title: 'Add-on activated',
      message: `${addonName} has been added to your subscription.`,
    });
  };

  const handleContactConfirmed = () => {
    addNotification({
      type: 'success',
      title: 'Message sent',
      message: 'Our billing team will reply within 1 business day.',
    });
  };

  const handleReactivate = () => setCancelled(false);

  return {
    currentPlanId,
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
  };
}
