import React from 'react';
import { Upload } from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { cn } from '@/src/lib/utils';

export function CsvUploadCard() {
  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-text-dark">Reports & CSV Upload</h3>
        <div className="flex gap-1 bg-g-faint p-1 rounded-lg border border-border-light">
          {['All', 'Pending', 'Completed'].map((f, i) => (
            <button key={f} className={cn("px-3 py-1 text-[10px] font-bold rounded-md transition-all", i === 0 ? "bg-g-dark text-white shadow-sm" : "text-text-muted hover:text-text-dark")}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center">
        <div className="space-y-3">
          <p className="text-xs text-text-muted leading-relaxed">Import order reports from delivery platforms like:</p>
          <div className="space-y-2">
            {['Uber Eats', 'Deliveroo', 'Just Eat'].map(p => (
              <div key={p} className="flex items-center justify-between text-xs text-text-mid font-medium">
                <span>{p}</span>
                <div className="w-5 h-5 bg-g-faint rounded flex items-center justify-center text-[10px] border border-border-light">{p[0]}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-2 border-dashed border-border-light rounded-xl p-6 text-center bg-g-faint hover:bg-g-pale transition-all cursor-pointer group">
          <Upload className="w-6 h-6 text-text-muted mx-auto mb-2 group-hover:text-g-dark" />
          <p className="text-[10px] font-bold text-g-dark uppercase tracking-wider">Upload CSV</p>
          <p className="text-[9px] text-text-muted mt-1">Max 10MB · .csv only</p>
        </div>
      </div>
    </Card>
  );
}
