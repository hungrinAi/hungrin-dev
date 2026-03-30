import React, { useState } from 'react';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { Button } from '@/src/components/ui/Button';
import { useApi } from '@/src/hooks/useApi';
import { orderService } from '@/src/services';
import { OrderStatsPills } from '@/src/features/orders/components/OrderStatsPills';
import { CsvUploadCard } from '@/src/features/orders/components/CsvUploadCard';
import { OrderTable } from '@/src/features/orders/components/OrderTable';
import { OrderDetailPanel } from '@/src/features/orders/components/OrderDetailPanel';

export default function Orders() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: summary, loading, error } = useApi(orderService.getAll);

  const orders = summary?.orders;
  const selectedOrder = orders?.find(o => o.id === selectedId) || orders?.[0];

  if (loading) return <div className="p-8 text-text-muted">Loading orders...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!summary) return null;

  return (
    <AppLayout 
      title="Orders" 
      subtitle="Manage incoming orders, track deliveries, and upload reports."
    >
      <div className="flex h-full min-h-0 -m-8">
        {/* Left Panel: List */}
        <div className="flex-1 flex flex-col border-r border-border-light overflow-hidden">
          <div className="p-6 space-y-6 overflow-y-auto">
            <OrderStatsPills summary={summary} />
            <CsvUploadCard />
            <OrderTable 
              orders={orders || []} 
              selectedId={selectedId} 
              onSelect={setSelectedId} 
            />
          </div>

          {/* Chat Bar */}
          <div className="p-4 border-t border-border-light bg-white flex items-center gap-2 mt-auto">
            <input type="text" placeholder="Ask the AI for order assistance…" className="flex-1 bg-transparent border-none outline-none text-sm px-2" />
            <Button size="sm">Send</Button>
          </div>
        </div>

        {/* Right Panel: Detail */}
        {selectedOrder && (
          <OrderDetailPanel order={selectedOrder} />
        )}
      </div>
    </AppLayout>
  );
}
