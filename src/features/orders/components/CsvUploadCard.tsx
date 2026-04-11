'use client';

import React, { useState, useRef } from 'react';
import { Upload, CheckCircle2, X } from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { cn } from '@/src/lib/utils';

const FILTERS = ['All', 'Pending', 'Completed'];

export function CsvUploadCard() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file.name);
    setUploaded(true);
    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  const clearUpload = () => {
    setUploadedFile(null);
    setUploaded(false);
  };

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-text-dark">Reports & CSV Upload</h3>
        <div className="flex gap-1 bg-g-faint p-1 rounded-lg border border-border-light">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-3 py-1 text-[10px] font-bold rounded-md transition-all",
                activeFilter === f ? "bg-g-dark text-white shadow-sm" : "text-text-muted hover:text-text-dark"
              )}
            >
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

        {uploaded && uploadedFile ? (
          <div className="border-2 border-g-dark/30 rounded-xl p-6 text-center bg-g-faint space-y-2">
            <CheckCircle2 className="w-6 h-6 text-g-dark mx-auto" />
            <p className="text-[10px] font-bold text-g-dark uppercase tracking-wider">Uploaded!</p>
            <p className="text-[9px] text-text-muted truncate px-2">{uploadedFile}</p>
            <button
              onClick={clearUpload}
              className="text-[9px] font-bold text-text-muted hover:text-text-dark flex items-center gap-1 mx-auto"
            >
              <X className="w-3 h-3" /> Clear
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-border-light rounded-xl p-6 text-center bg-g-faint hover:bg-g-pale transition-all cursor-pointer group"
          >
            <Upload className="w-6 h-6 text-text-muted mx-auto mb-2 group-hover:text-g-dark" />
            <p className="text-[10px] font-bold text-g-dark uppercase tracking-wider">Upload CSV</p>
            <p className="text-[9px] text-text-muted mt-1">Max 10MB · .csv only</p>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleFile}
      />
    </Card>
  );
}
