'use client';

import React, { useState } from 'react';
import { Search, Filter, ChevronRight, Mail, Phone, X } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { CustomerSummary } from '@/src/types';
import { cn } from '@/src/lib/utils';

const STATUS_FILTERS = ['All', 'Active', 'Inactive'] as const;
type StatusFilter = typeof STATUS_FILTERS[number];

interface CustomerTableProps {
  customers: CustomerSummary['customers'];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}

export function CustomerTable({ customers, selectedId, onSelect }: CustomerTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = customers.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Active' && c.status === 'active') ||
      (statusFilter === 'Inactive' && c.status !== 'active');
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 border-b border-border-light">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input
              placeholder="Search customers by name or email..."
              className="pl-10 h-10"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(f => !f)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 border rounded-xl text-xs font-bold transition-all shrink-0",
              showFilters
                ? "bg-g-dark text-white border-g-dark"
                : "bg-g-faint border-border-light text-text-mid hover:bg-g-pale"
            )}
          >
            <Filter className="w-4 h-4" /> Filter
            {statusFilter !== 'All' && (
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
            )}
          </button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="flex items-center gap-2 pb-1">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider mr-1">Status:</span>
            {STATUS_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all",
                  statusFilter === f
                    ? "bg-g-dark text-white border-g-dark"
                    : "bg-white border-border-light text-text-mid hover:border-g-dark/40"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border-light text-text-muted text-[10px] font-bold uppercase tracking-wider">
                <th className="py-4 pl-6">Customer</th>
                <th className="py-4">Contact</th>
                <th className="py-4">Orders</th>
                <th className="py-4">Total Spent</th>
                <th className="py-4">Status</th>
                <th className="py-4">Last Order</th>
                <th className="py-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-sm text-text-muted">
                    No customers match your search.
                  </td>
                </tr>
              ) : filtered.map((customer) => (
                <tr
                  key={customer.id}
                  onClick={() => onSelect?.(customer.id)}
                  className={cn(
                    "transition-colors cursor-pointer group",
                    selectedId === customer.id ? "bg-g-pale" : "hover:bg-g-faint"
                  )}
                >
                  <td className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-g-pale text-g-dark font-bold flex items-center justify-center">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-bold text-text-dark">{customer.name}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs text-text-mid">
                        <Mail className="w-3 h-3" /> {customer.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-text-muted">
                        <Phone className="w-3 h-3" /> {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-text-mid">{customer.totalOrders} orders</td>
                  <td className="py-4 text-text-dark font-bold">£{customer.totalSpent}</td>
                  <td className="py-4">
                    <Badge variant={customer.status === 'active' ? 'success' : 'secondary'}>
                      {customer.status}
                    </Badge>
                  </td>
                  <td className="py-4 text-text-muted text-xs">{customer.lastOrder}</td>
                  <td className="py-4 pr-6 text-right">
                    <button
                      onClick={(e) => { e.stopPropagation(); onSelect?.(customer.id); }}
                      className={cn(
                        "p-2 rounded-lg transition-all",
                        selectedId === customer.id
                          ? "bg-g-dark text-white"
                          : "hover:bg-white text-text-muted hover:text-g-dark"
                      )}
                    >
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
