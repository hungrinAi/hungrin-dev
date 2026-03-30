import React from 'react';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { useApi } from '@/src/hooks/useApi';
import { customerService } from '@/src/services';
import { CustomerStats } from '@/src/features/customers/components/CustomerStats';
import { CustomerTable } from '@/src/features/customers/components/CustomerTable';

export default function Customers() {
  const { data: summary, loading, error } = useApi(customerService.getAll);

  if (loading) return <div className="p-8 text-text-muted">Loading customers...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!summary) return null;

  return (
    <AppLayout 
      title="Customers" 
      subtitle="View and manage your restaurant's customer base and loyalty."
    >
      <div className="space-y-6">
        <CustomerStats summary={summary} />
        <CustomerTable customers={summary.customers} />
      </div>
    </AppLayout>
  );
}
