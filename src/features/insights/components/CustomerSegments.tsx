import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardHeader, CardContent } from '@/src/components/ui/Card';
import { InsightsData } from '@/src/types';

interface CustomerSegmentsProps {
  data: InsightsData['customerSegments'];
}

const COLORS = ['#3a9470', '#8fd4b0', '#c8edd8', '#e8f8f0'];

export function CustomerSegments({ data }: CustomerSegmentsProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-bold text-text-dark">Customer Segments</h3>
        <p className="text-xs text-text-muted">Breakdown by customer type</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
