import React from 'react';
import { Search, Filter, ChevronRight, Mail, Phone } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { CustomerSummary } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface CustomerTableProps {
  customers: CustomerSummary['customers'];
}

export function CustomerTable({ customers }: CustomerTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between border-b border-border-light">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input 
              placeholder="Search customers by name or email..." 
              className="pl-10 h-10"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-g-faint border border-border-light rounded-xl text-xs font-bold text-text-mid hover:bg-g-pale transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
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
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-g-faint transition-colors group">
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
