'use client';

import React, { useState, useEffect } from 'react';
import { PageLoading } from '@/src/components/ui/Loading';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { Button } from '@/src/components/ui/Button';
import { useOrders } from '@/src/features/orders';
import { OrderStatsPills } from '@/src/features/orders/components/OrderStatsPills';
import { CsvUploadCard } from '@/src/features/orders/components/CsvUploadCard';
import { OrderTable } from '@/src/features/orders/components/OrderTable';
import { OrderDetailPanel } from '@/src/features/orders/components/OrderDetailPanel';
import { useNotifications } from '@/src/contexts/NotificationsContext';
import { ArrowLeft, Send } from 'lucide-react';

// Inner component — rendered inside AppLayout so NotificationsProvider is available
function OrdersContent() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [chatInput, setChatInput] = useState('');
  const { data: summary, loading, error } = useOrders();
  const { addNotification } = useNotifications();

  // Initialize completedIds from orders that are already completed
  useEffect(() => {
    if (summary?.orders) {
      const ids = summary.orders
        .filter(o => o.status === 'completed')
        .map(o => o.id);
      setCompletedIds(new Set(ids));
    }
  }, [summary?.orders]);

  const handleCompleted = (id: string) => {
    setCompletedIds(prev => new Set([...prev, id]));
    const order = summary?.orders.find(o => o.id === id);
    if (order) {
      addNotification({
        type: 'success',
        title: 'Order completed',
        message: `Order ${order.id} for ${order.customerName} marked as delivered.`,
      });
    }
  };

  const orders = summary?.orders;
  const selectedOrder = orders?.find(o => o.id === selectedId) || orders?.[0];

  if (loading) return <PageLoading message="Loading orders" />;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!summary) return null;

  const showDetail = !!selectedId;

  return (
    <div className="flex h-full min-h-0 -m-4 md:-m-6 lg:-m-8">
      {/* Left Panel */}
      <div className={`${showDetail ? 'hidden md:flex' : 'flex'} flex-1 flex-col border-r border-border-light overflow-hidden`}>
        <div className="p-4 md:p-6 space-y-4 md:space-y-6 overflow-y-auto">
          <OrderStatsPills summary={summary} />
          <CsvUploadCard />
          <OrderTable
            orders={orders || []}
            selectedId={selectedId}
            onSelect={setSelectedId}
            completedIds={completedIds}
          />
        </div>

        {/* Chat bar */}
        <div className="p-4 border-t border-border-light bg-white flex items-center gap-2 mt-auto shrink-0">
          <input
            type="text"
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && chatInput.trim()) {
                setChatInput('');
                addNotification({ type: 'info', title: 'AI Assistant', message: `Processing: "${chatInput.trim()}"` });
              }
            }}
            placeholder="Ask the AI for order assistance…"
            className="flex-1 bg-transparent border-none outline-none text-sm px-2"
          />
          <Button
            size="sm"
            onClick={() => {
              if (chatInput.trim()) {
                addNotification({ type: 'info', title: 'AI Assistant', message: `Processing: "${chatInput.trim()}"` });
                setChatInput('');
              }
            }}
          >
            <Send className="w-3.5 h-3.5 mr-1" /> Send
          </Button>
        </div>
      </div>

      {/* Right Panel */}
      {selectedOrder && (
        <div className={`${showDetail ? 'flex' : 'hidden md:flex'} flex-col w-full md:w-[340px] bg-white overflow-hidden`}>
          <div className="md:hidden px-4 py-3 border-b border-border-light">
            <button
              onClick={() => setSelectedId(null)}
              className="flex items-center gap-2 text-sm font-semibold text-g-dark hover:text-g-mid transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Orders
            </button>
          </div>
          <OrderDetailPanel
            order={selectedOrder}
            isCompleted={completedIds.has(selectedOrder.id)}
            onCompleted={handleCompleted}
          />
        </div>
      )}
    </div>
  );
}

export default function Orders() {
  return (
    <AppLayout
      title="Orders"
      subtitle="Manage incoming orders, track deliveries, and upload reports."
    >
      <OrdersContent />
    </AppLayout>
  );
}
