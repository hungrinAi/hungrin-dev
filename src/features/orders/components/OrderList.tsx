import React from 'react';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { OrderSummary } from '@/types';
import { cn } from '@/lib/utils';

interface OrderListProps {
  orders: OrderSummary['orders'];
}

export function OrderList({ orders }: OrderListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between border-b border-border-light">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input 
              placeholder="Search orders by ID or customer..." 
              className="pl-10 h-10"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-g-faint border border-border-light rounded-xl text-xs font-bold text-text-mid hover:bg-g-pale transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
        <div className="flex gap-2">
          {['All', 'Pending', 'Preparing', 'Ready', 'Completed'].map((s, i) => (
            <button 
              key={s}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
                i === 0 ? "bg-g-dark text-white shadow-sm" : "bg-g-faint text-text-muted hover:bg-g-pale"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border-light text-text-muted text-[10px] font-bold uppercase tracking-wider">
                <th className="py-4 pl-6">Order ID</th>
                <th className="py-4">Customer</th>
                <th className="py-4">Items</th>
                <th className="py-4">Total</th>
                <th className="py-4">Status</th>
                <th className="py-4">Time</th>
                <th className="py-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-g-faint transition-colors group">
                  <td className="py-4 pl-6 font-bold text-text-dark">{order.id}</td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-text-dark">{order.customer}</span>
                      <span className="text-[10px] text-text-muted">Table {Math.floor(Math.random() * 20) + 1}</span>
                    </div>
                  </td>
                  <td className="py-4 text-text-mid">{order.items.length} items</td>
                  <td className="py-4 text-text-dark font-bold">£{order.total}</td>
                  <td className="py-4">
                    <Badge variant={
                      order.status === 'completed' ? 'success' : 
                      order.status === 'pending' ? 'warning' : 
                      'secondary'
                    }>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-4 text-text-muted text-xs">{order.createdAt}</td>
                  <td className="py-4 pr-6 text-right">
                    <button className="p-2 hover:bg-white rounded-lg transition-all text-text-muted hover:text-g-dark">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
