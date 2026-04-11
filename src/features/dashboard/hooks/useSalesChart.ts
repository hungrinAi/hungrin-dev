import { useState } from 'react';
import type { DashboardStats, SalesPeriod } from '../types';

const PERIODS: SalesPeriod[] = ['This Week', '7 Days', '30 Days'];

export function useSalesChart(stats?: DashboardStats) {
  const [activePeriod, setActivePeriod] = useState<SalesPeriod>('This Week');

  const chartData =
    stats?.salesDataByPeriod?.[activePeriod] ?? stats?.salesData ?? [];

  const totalSales = chartData.reduce((sum, d) => sum + d.sales, 0);
  const todaySales = chartData[chartData.length - 1]?.sales ?? 0;

  return { activePeriod, setActivePeriod, chartData, totalSales, todaySales, PERIODS };
}
