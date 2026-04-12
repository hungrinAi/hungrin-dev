import React from 'react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { OrderSummary } from '@/types';

interface OrderTableProps {
  orders: OrderSummary['orders'];
  selectedId: string | null;
  onSelect: (id: string) => void;
  completedIds?: Set<string>;
}

export function OrderTable({ orders, selectedId, onSelect, completedIds }: OrderTableProps) {
  const isCompleted = (o: OrderSummary['orders'][0]) =>
    completedIds ? completedIds.has(o.id) : o.status === 'completed';

  return (
    <Card className="overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-g-faint border-b border-border-light">
            <th className="px-4 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider">Order ID</th>
            <th className="px-4 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider">Customer</th>
            <th className="px-4 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider">Total</th>
            <th className="px-4 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider">Delivery</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-light">
          {orders?.map((o) => {
            const done = isCompleted(o);
            return (
              <tr
                key={o.id}
                onClick={() => onSelect(o.id)}
                className={cn(
                  "hover:bg-g-faint transition-colors cursor-pointer",
                  selectedId === o.id ? "bg-g-pale" : ""
                )}
              >
                <td className="px-4 py-4 text-xs font-bold text-text-muted">{o.id}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-g-dark text-white text-[10px] font-bold flex items-center justify-center shrink-0">{o.initials}</div>
                    <span className="text-xs font-bold text-text-dark truncate max-w-[80px]">{o.customerName}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-xs font-bold text-text-dark">£{o.total}</td>
                <td className="px-4 py-4">
                  <span className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold",
                    done ? "bg-g-pale text-g-dark" : "bg-yellow-50 text-yellow-700"
                  )}>
                    {done ? 'completed' : o.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className={cn(
                    "inline-block px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter",
                    o.deliveryPlatform === 'uber' ? "bg-black text-white" : "bg-[#00ccbc] text-white"
                  )}>
                    {o.deliveryPlatform}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
