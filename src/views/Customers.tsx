'use client';

import React, { useState } from 'react';
import { InlineLoading } from '@/src/components/ui/Loading';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { useApi } from '@/src/hooks/useApi';
import { customerService } from '@/src/services';
import { CustomerStats } from '@/src/features/customers/components/CustomerStats';
import { CustomerTable } from '@/src/features/customers/components/CustomerTable';
import { CustomerDetailPanel } from '@/src/features/customers/components/CustomerDetailPanel';
import { ArrowLeft } from 'lucide-react';

export default function Customers() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: summary, loading, error } = useApi(customerService.getAll);

  if (loading) return <InlineLoading message="Loading customers" />;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!summary) return null;

  const selectedCustomer = summary.customers.find(c => c.id === selectedId);
  const showDetail = !!selectedId && !!selectedCustomer;

  return (
    <AppLayout
      title="Customers"
      subtitle="View and manage your restaurant's customer base and loyalty."
    >
      <div className="flex h-full min-h-0 -m-4 md:-m-6 lg:-m-8">
        {/* Left Panel */}
        <div className={`${showDetail ? 'hidden md:flex' : 'flex'} flex-1 flex-col overflow-hidden`}>
          <div className="p-4 md:p-6 space-y-4 md:space-y-6 overflow-y-auto">
            <CustomerStats summary={summary} />
            <CustomerTable
              customers={summary.customers}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </div>

        {/* Right Panel: Customer Detail */}
        {showDetail && (
          <div className={`${showDetail ? 'flex' : 'hidden md:flex'} flex-col w-full md:w-[360px] bg-white border-l border-border-light overflow-hidden`}>
            {/* Mobile back button */}
            <div className="md:hidden px-4 py-3 border-b border-border-light shrink-0">
              <button
                onClick={() => setSelectedId(null)}
                className="flex items-center gap-2 text-sm font-semibold text-g-dark hover:text-g-mid transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Customers
              </button>
            </div>
            <CustomerDetailPanel
              customer={selectedCustomer}
              onClose={() => setSelectedId(null)}
            />
          </div>
        )}
      </div>
    </AppLayout>
  );
}
