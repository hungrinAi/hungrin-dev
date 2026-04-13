'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { FEATURE_ROWS } from '../data/constants';

export function FeatureTable() {
  return (
    <Card className="overflow-hidden">
      <div className="px-6 py-4 border-b border-border-light">
        <h3 className="text-sm font-bold text-text-dark">Compare Features</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-g-faint border-b border-border-light">
              <th className="px-6 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider w-1/2">
                Feature
              </th>
              <th className="px-4 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider text-center">
                Starter
              </th>
              <th className="px-4 py-3 text-[10px] font-bold text-g-dark uppercase tracking-wider text-center">
                Growth
              </th>
              <th className="px-4 py-3 text-[10px] font-bold text-text-muted uppercase tracking-wider text-center">
                Pro
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {FEATURE_ROWS.map(row => (
              <tr key={row.label} className="hover:bg-g-faint/50 transition-colors">
                <td className="px-6 py-3 text-xs font-medium text-text-dark">{row.label}</td>
                {[row.starter, row.growth, row.pro].map((val, i) => (
                  <td key={i} className="px-4 py-3 text-center">
                    {val === true ? (
                      <Check className="w-4 h-4 text-g-dark mx-auto" />
                    ) : val === false ? (
                      <span className="text-text-muted text-xs">—</span>
                    ) : (
                      <span
                        className={cn(
                          'text-[10px] font-bold px-2 py-0.5 rounded-full',
                          i === 0 ? 'bg-gray-100 text-text-mid' : 'bg-g-pale text-g-dark',
                        )}
                      >
                        {val}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
