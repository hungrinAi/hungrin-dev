import { useState, useEffect } from 'react';
import { useNotifications } from '@/contexts/NotificationsContext';
import type { Order } from '../types';

export function useOrdersView(orders: Order[] | undefined) {
  const { addNotification } = useNotifications();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    if (orders) {
      const ids = orders.filter(o => o.status === 'completed').map(o => o.id);
      setCompletedIds(new Set(ids));
    }
  }, [orders]);

  const handleCompleted = (id: string) => {
    setCompletedIds(prev => new Set([...prev, id]));
    const order = orders?.find(o => o.id === id);
    if (order) {
      addNotification({
        type: 'success',
        title: 'Order completed',
        message: `Order ${order.id} for ${order.customerName} marked as delivered.`,
      });
    }
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    addNotification({
      type: 'info',
      title: 'AI Assistant',
      message: `Processing: "${chatInput.trim()}"`,
    });
    setChatInput('');
  };

  const selectedOrder = orders?.find(o => o.id === selectedId) || orders?.[0];

  return {
    selectedId,
    setSelectedId,
    completedIds,
    chatInput,
    setChatInput,
    selectedOrder,
    handleCompleted,
    handleChatSend,
  };
}
