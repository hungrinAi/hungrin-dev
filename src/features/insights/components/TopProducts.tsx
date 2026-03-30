import React from 'react';
import { Card, CardHeader, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { InsightsData } from '@/src/types';

interface TopProductsProps {
  products: InsightsData['topProducts'];
}

export function TopProducts({ products }: TopProductsProps) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <h3 className="text-lg font-bold text-text-dark">Top Performing Products</h3>
        <p className="text-xs text-text-muted">Best-selling items this week</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border-light text-text-muted text-[10px] font-bold uppercase tracking-wider">
                <th className="pb-3 pl-4">Product Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Sales</th>
                <th className="pb-3">Revenue</th>
                <th className="pb-3 pr-4 text-right">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {products.map((p, i) => (
                <tr key={i} className="hover:bg-g-faint transition-colors group">
                  <td className="py-4 pl-4 font-bold text-text-dark">{p.name}</td>
                  <td className="py-4">
                    <Badge variant="secondary">{p.category}</Badge>
                  </td>
                  <td className="py-4 text-text-mid">{p.sales}</td>
                  <td className="py-4 text-text-dark font-bold">£{p.revenue}</td>
                  <td className="py-4 pr-4 text-right">
                    <span className="text-emerald-600 font-bold text-xs">{p.growth}</span>
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
