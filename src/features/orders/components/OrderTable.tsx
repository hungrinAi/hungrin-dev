import React from 'react';
import { Card } from '@/src/components/ui/Card';
import { PlatformBadge } from '@/src/components/ui/PlatformBadge';
import { cn } from '@/src/lib/utils';
import { OrderSummary } from '@/src/types';

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
      {/* Horizontal scroll on mobile, vertical scroll when list is long */}
      <div className="overflow-x-auto">
        <div className="max-h-[360px] overflow-y-auto">
          <table className="w-full text-left border-collapse" style={{ minWidth: 360 }}>
            <thead className="sticky top-0 z-10">
              <tr className="bg-g-faint border-b border-border-light">
                <th className="px-4 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider whitespace-nowrap w-[110px]">
                  Order ID
                </th>
                <th className="px-4 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider whitespace-nowrap">
                  Customer
                </th>
                <th className="px-4 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider whitespace-nowrap w-[70px]">
                  Total
                </th>
                <th className="px-4 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider whitespace-nowrap w-[90px]">
                  Status
                </th>
                <th className="px-4 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider whitespace-nowrap w-[80px]">
                  Platform
                </th>
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
                      'hover:bg-g-faint transition-colors cursor-pointer',
                      selectedId === o.id ? 'bg-g-pale' : ''
                    )}
                  >
                    {/* Order ID */}
                    <td className="px-4 py-3 text-xs font-bold text-text-muted whitespace-nowrap w-[110px]">
                      {o.id}
                    </td>

                    {/* Customer */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-g-dark text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {o.initials}
                        </div>
                        <span className="text-xs font-bold text-text-dark truncate max-w-[100px]">
                          {o.customerName}
                        </span>
                      </div>
                    </td>

                    {/* Total */}
                    <td className="px-4 py-3 text-xs font-bold text-text-dark whitespace-nowrap w-[70px]">
                      £{o.total}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 w-[90px]">
                      <span className={cn(
                        'inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap',
                        done
                          ? 'bg-g-pale text-g-dark'
                          : 'bg-yellow-50 text-yellow-700'
                      )}>
                        {done ? 'completed' : o.status}
                      </span>
                    </td>

                    {/* Platform */}
                    <td className="px-4 py-3 w-[48px]">
                      <PlatformBadge platform={o.deliveryPlatform} size={28} />
                    </td>
                  </tr>
                );
              })}

              {(!orders || orders.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-xs text-text-muted">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
