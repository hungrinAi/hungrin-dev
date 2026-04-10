'use client';

import React from 'react';
import { X, Mail, Phone, ShoppingBag, Star, Clock, TrendingUp } from 'lucide-react';
import { Customer } from '@/src/types';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/lib/utils';

interface CustomerDetailPanelProps {
  customer: Customer;
  onClose?: () => void;
}

// Mock order history per customer
function getMockOrders(customerId: string) {
  const seed = customerId.charCodeAt(0) % 4;
  const sets = [
    [
      { id: '#1042', items: 'Burger Bundle x2, Fries', total: '£18.99', date: '2 days ago', platform: 'Uber Eats', status: 'completed' },
      { id: '#1031', items: 'Classic Cheeseburger, Coke', total: '£12.50', date: '1 week ago', platform: 'Deliveroo', status: 'completed' },
      { id: '#1019', items: 'Chicken Wings x3', total: '£15.00', date: '2 weeks ago', platform: 'Uber Eats', status: 'completed' },
    ],
    [
      { id: '#2087', items: 'Margherita Pizza, Garlic Bread', total: '£16.49', date: '3 days ago', platform: 'Just Eat', status: 'completed' },
      { id: '#2071', items: 'BBQ Ribs Special', total: '£22.99', date: '10 days ago', platform: 'Deliveroo', status: 'completed' },
    ],
    [
      { id: '#3055', items: 'Vegan Burger, Sweet Potato Fries', total: '£14.99', date: '1 day ago', platform: 'Uber Eats', status: 'completed' },
      { id: '#3044', items: 'Loaded Nachos, Margarita', total: '£19.50', date: '5 days ago', platform: 'Uber Eats', status: 'completed' },
      { id: '#3033', items: 'Steak Wrap, Side Salad', total: '£13.75', date: '3 weeks ago', platform: 'Just Eat', status: 'completed' },
      { id: '#3021', items: 'Fish & Chips', total: '£11.99', date: '1 month ago', platform: 'Deliveroo', status: 'cancelled' },
    ],
    [
      { id: '#4099', items: 'Family Feast Box', total: '£34.99', date: '4 days ago', platform: 'Deliveroo', status: 'completed' },
      { id: '#4085', items: 'Chicken Burger Meal x2', total: '£25.00', date: '2 weeks ago', platform: 'Just Eat', status: 'completed' },
    ],
  ];
  return sets[seed];
}

const platformColors: Record<string, string> = {
  'Uber Eats': 'bg-black text-white',
  'Deliveroo': 'bg-[#00CCBC] text-white',
  'Just Eat': 'bg-[#FF8000] text-white',
};

export function CustomerDetailPanel({ customer, onClose }: CustomerDetailPanelProps) {
  const orders = getMockOrders(customer.id);

  return (
    <div className="flex flex-col h-full bg-white border-l border-border-light overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-border-light flex items-start justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-g-pale text-g-dark font-black text-lg flex items-center justify-center shrink-0">
            {customer.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-text-dark">{customer.name}</p>
            <Badge variant={customer.status === 'active' ? 'success' : 'secondary'} className="mt-0.5">
              {customer.status}
            </Badge>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 text-text-muted hover:text-g-dark hover:bg-g-faint rounded-lg transition-all shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-border-light border-b border-border-light shrink-0">
        {[
          { label: 'Orders', value: customer.totalOrders, icon: ShoppingBag },
          { label: 'Spent', value: `£${customer.totalSpent}`, icon: TrendingUp },
          { label: 'Last Order', value: customer.lastOrder, icon: Clock },
        ].map((s, i) => (
          <div key={i} className="p-4 text-center">
            <p className="text-xs text-text-muted mb-1">{s.label}</p>
            <p className="text-sm font-bold text-text-dark leading-tight">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="px-5 py-4 border-b border-border-light space-y-2 shrink-0">
        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3">Contact</p>
        <div className="flex items-center gap-2 text-xs text-text-mid">
          <Mail className="w-3.5 h-3.5 text-text-muted shrink-0" /> {customer.email}
        </div>
        <div className="flex items-center gap-2 text-xs text-text-mid">
          <Phone className="w-3.5 h-3.5 text-text-muted shrink-0" /> {customer.phone}
        </div>
      </div>

      {/* Order History */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3">Order History</p>
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="p-3 bg-g-faint rounded-xl border border-border-light space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-text-dark">{order.id}</span>
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full",
                  order.status === 'completed' ? "bg-g-pale text-g-dark" : "bg-red-50 text-red-500"
                )}>{order.status}</span>
              </div>
              <p className="text-[11px] text-text-mid leading-relaxed">{order.items}</p>
              <div className="flex items-center justify-between">
                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", platformColors[order.platform] || "bg-gray-100 text-gray-600")}>
                  {order.platform}
                </span>
                <div className="text-right">
                  <p className="text-xs font-bold text-text-dark">{order.total}</p>
                  <p className="text-[10px] text-text-muted">{order.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border-light shrink-0 space-y-2">
        <button className="w-full py-2.5 bg-g-dark text-white rounded-xl text-xs font-bold hover:bg-g-mid transition-all flex items-center justify-center gap-2">
          <Star className="w-4 h-4" /> Send Win-Back Promo
        </button>
        <button className="w-full py-2.5 bg-g-faint border border-border-light text-text-mid rounded-xl text-xs font-bold hover:bg-g-pale hover:text-g-dark transition-all flex items-center justify-center gap-2">
          <Mail className="w-4 h-4" /> Send Email
        </button>
      </div>
    </div>
  );
}
