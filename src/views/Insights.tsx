'use client';

import React from 'react';
import { InlineLoading } from '@/src/components/ui/Loading';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { useApi } from '@/src/hooks/useApi';
import { insightsService } from '@/src/services';
import { SalesTrends } from '@/src/features/insights/components/SalesTrends';
import { CustomerSegments } from '@/src/features/insights/components/CustomerSegments';
import { AiRecommendations } from '@/src/features/insights/components/AiRecommendations';
import { TopProducts } from '@/src/features/insights/components/TopProducts';

export default function Insights() {
  const { data: insights, loading, error } = useApi(insightsService.getInsights);

  if (loading) return <InlineLoading message="Loading insights" />;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!insights) return null;

  return (
    <AppLayout 
      title="Business Insights" 
      subtitle="AI-powered analysis of your restaurant's performance."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SalesTrends data={insights.salesTrend} />
          <CustomerSegments data={insights.customerSegments} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AiRecommendations recommendations={insights.recommendations} />
          <TopProducts products={insights.topProducts} />
        </div>
      </div>
    </AppLayout>
  );
}
