import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardHeader, CardContent } from '@/src/components/ui/Card';
import { InsightsData } from '@/src/types';

interface SalesTrendsProps {
  data: InsightsData['salesTrend'];
}

export function SalesTrends({ data }: SalesTrendsProps) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <h3 className="text-lg font-bold text-text-dark">Sales Trends</h3>
        <p className="text-xs text-text-muted">Daily sales performance for the current week</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8aa89e' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8aa89e' }} />
              <Tooltip cursor={{ fill: '#f8fdfb' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="sales" fill="#3a9470" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
