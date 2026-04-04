import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { InsightsData } from '@/src/types';

interface AiRecommendationsProps {
  recommendations: InsightsData['recommendations'];
}

export function AiRecommendations({ recommendations }: AiRecommendationsProps) {
  return (
    <Card className="bg-gradient-to-br from-[#e8f8f0] to-white border-g-dark/10">
      <CardHeader className="flex flex-row items-center gap-2">
        <div className="w-8 h-8 bg-g-dark text-white rounded-lg flex items-center justify-center">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-dark">AI Recommendations</h3>
          <p className="text-xs text-text-muted">Personalized growth strategies</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, i) => (
          <div key={i} className="p-4 bg-white rounded-xl border border-border-light shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-g-dark uppercase tracking-wider">{rec.category}</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {rec.impact} Impact
              </span>
            </div>
            <h4 className="text-sm font-bold text-text-dark mb-1">{rec.title}</h4>
            <p className="text-xs text-text-muted mb-4">{rec.description}</p>
            <Button variant="outline" className="w-full py-2 text-xs flex items-center justify-center gap-2">
              Implement Now <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
