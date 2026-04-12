'use client';

import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { DashboardStats } from '@/types';
import { useSalesChart } from '../hooks/useSalesChart';

interface SalesChartProps {
  stats?: DashboardStats;
}

export function SalesChart({ stats }: SalesChartProps) {
  const { activePeriod, setActivePeriod, chartData, totalSales, todaySales, PERIODS } =
    useSalesChart(stats);

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-text-dark flex items-center gap-2">
            Sales Performance <span className="text-text-muted text-xs font-normal">ℹ️</span>
          </h2>
          <p className="text-xs text-text-muted">Sales performance — {activePeriod.toLowerCase()}</p>
        </div>
        <div className="overflow-x-auto no-scrollbar shrink-0">
          <div className="flex gap-2 w-max">
            {PERIODS.map((t) => (
              <button
                key={t}
                onClick={() => setActivePeriod(t)}
                className={cn(
                  'px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap',
                  activePeriod === t
                    ? 'bg-white border-border-light shadow-sm text-text-dark'
                    : 'bg-g-faint border-transparent text-text-mid hover:bg-g-pale'
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3a9470" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3a9470" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#8aa89e' }} dy={10} />
              <YAxis orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#8aa89e' }} tickFormatter={(v) => `£${v}`} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} formatter={(v) => [`£${v}`, 'Sales']} />
              <Area type="monotone" dataKey="sales" stroke="#3a9470" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border-light">
          <div className="flex items-baseline gap-4">
            <span className="text-xl font-bold text-text-dark">£{totalSales.toLocaleString()}</span>
            <span className="text-xs text-text-muted">{activePeriod.toLowerCase()}</span>
            <span className="text-lg font-bold text-text-dark ml-4">£{todaySales}</span>
            <span className="text-xs text-text-muted">latest</span>
          </div>
          <div className="text-g-dark font-bold text-sm flex items-center gap-2">
            + 34% weather effect ☀️ ⛅ 🌧️ ☁️
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
