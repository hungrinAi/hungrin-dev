'use client';

import React from 'react';
import { PageLoading } from '@/components/ui/Loading';
import { AppLayout } from '@/components/layout/AppLayout';
import { useInsights, SalesTrends, CustomerSegments, AiRecommendations, TopProducts } from '@/features/insights';

export default function Insights() {
  const { data: insights, loading, error } = useInsights();

  if (loading) return <PageLoading message="Loading insights" />;
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
