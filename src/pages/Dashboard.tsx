import React from 'react';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { useApi } from '@/src/hooks/useApi';
import { dashboardService } from '@/src/services';
import { StatsGrid } from '@/src/features/dashboard/components/StatsGrid';
import { SalesChart } from '@/src/features/dashboard/components/SalesChart';
import { PromoCard } from '@/src/features/dashboard/components/PromoCard';
import { AiAssistant } from '@/src/features/dashboard/components/AiAssistant';
import { useAuth } from '@/src/context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { data: stats, loading, error } = useApi(dashboardService.getStats);

  if (loading) return <div className="p-8 text-text-muted">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  const displayName = user?.displayName || 'Sarah';

  return (
    <AppLayout 
      title={<span>Welcome back, <strong className="text-g-dark">{displayName}!</strong></span>} 
      subtitle="Hungrin only makes money when you do—cancel anytime."
    >
      <div className="space-y-6">
        <StatsGrid stats={stats} />
        <SalesChart stats={stats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PromoCard stats={stats} />
          <AiAssistant stats={stats} />
        </div>
      </div>
    </AppLayout>
  );
 }
