'use client';

import React, { useRef, useState } from 'react';
import { Mail, ShieldCheck, FileText, Zap, Upload, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import type { OnboardingForm } from '../types';

const fieldCls = (error?: string) =>
  cn(
    'w-full bg-[#f6fdf9] border rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 transition-all placeholder:text-gray-300',
    error
      ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
      : 'border-border-light focus:border-g-dark focus:ring-[#d1f0e4]',
  );

interface Step3EmailProps {
  form: OnboardingForm;
  errors: Record<string, string>;
  onUpdate: <K extends keyof OnboardingForm>(key: K, value: OnboardingForm[K]) => void;
  onClearError: (key: string) => void;
  onSkip: () => void;
}

export function Step3Email({ form, errors, onUpdate, onClearError, onSkip }: Step3EmailProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [csvFileName, setCsvFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFileName(file.name);
      onUpdate('csvFileName', file.name);
      onClearError('csvFileName');
    }
  };

  const removeFile = () => {
    setCsvFileName('');
    onUpdate('csvFileName', '');
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-text-dark">Import Your Sales Data</h1>
        <p className="text-sm text-text-muted mt-1">
          Help Hungrin build smarter promotions by sharing your sales history.
        </p>
      </div>

      {/* Benefits */}
      <div className="space-y-3">
        {[
          { icon: Zap,      color: 'bg-[#eaf6f0] text-g-dark',   title: 'Smarter AI promotions',       desc: 'More data = better predictions for your busiest times and top dishes.' },
          { icon: FileText, color: 'bg-orange-50 text-orange-500', title: 'Automatic data import',       desc: 'Email parsing keeps your dashboard up to date without manual uploads.' },
          { icon: Mail,     color: 'bg-blue-50 text-blue-600',    title: 'Works with all 3 platforms',  desc: 'Uber Eats, Deliveroo and Just Eat all send CSV order summaries by email.' },
        ].map(({ icon: Icon, color, title, desc }) => (
          <div key={title} className="flex items-start gap-3">
            <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', color)}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-text-dark">{title}</p>
              <p className="text-xs text-text-muted mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Option A: Email parsing ── */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-text-dark uppercase tracking-wider">Option A — Connect Email</p>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-text-dark">
            Email address for order parsing
          </label>
          <input
            type="email"
            placeholder="e.g. orders@yourrestaurant.com"
            value={form.emailForParsing}
            onChange={e => {
              onUpdate('emailForParsing', e.target.value);
              if (e.target.value.trim()) onClearError('emailForParsing');
            }}
            className={fieldCls(errors.emailForParsing)}
          />
          {errors.emailForParsing && (
            <p className="text-[10px] font-bold text-red-500">{errors.emailForParsing}</p>
          )}
          <p className="text-[11px] text-text-muted">
            The email that receives order reports from your delivery platforms.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            onUpdate('emailConsent', !form.emailConsent);
            if (!form.emailConsent) onClearError('emailConsent');
          }}
          className={cn(
            'w-full flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all',
            form.emailConsent
              ? 'border-g-dark bg-[#f0faf5]'
              : 'border-border-light bg-white hover:border-g-dark/30',
          )}
        >
          <div className={cn(
            'w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all',
            form.emailConsent ? 'bg-g-dark border-g-dark' : 'border-gray-300',
          )}>
            {form.emailConsent && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-text-dark">
              Allow Hungrin to read my order confirmation emails
            </p>
            <p className="text-[11px] text-text-muted mt-0.5">
              Only order data is read — never personal emails. Revoke access anytime in settings.
            </p>
          </div>
        </button>
        {errors.emailConsent && (
          <p className="text-[10px] font-bold text-red-500">{errors.emailConsent}</p>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border-light" />
        <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">or</span>
        <div className="flex-1 h-px bg-border-light" />
      </div>

      {/* ── Option B: CSV Upload ── */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-text-dark uppercase tracking-wider">Option B — Upload a CSV</p>

        {csvFileName ? (
          <div className="flex items-center gap-3 bg-[#f0faf5] border border-[#d1f0e4] rounded-2xl px-4 py-3">
            <FileText className="w-4 h-4 text-g-dark shrink-0" />
            <p className="text-sm font-bold text-g-dark flex-1 truncate">{csvFileName}</p>
            <button type="button" onClick={removeFile} className="text-text-muted hover:text-red-500 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full border-2 border-dashed border-border-light rounded-2xl p-5 flex flex-col items-center gap-2 hover:border-g-dark hover:bg-g-faint transition-all"
          >
            <Upload className="w-5 h-5 text-text-muted" />
            <p className="text-sm font-bold text-text-dark">Upload CSV file</p>
            <p className="text-[11px] text-text-muted">Export your order history from Uber Eats / Deliveroo / Just Eat</p>
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Security note */}
      <div className="bg-[#f6fdf9] border border-[#d1f0e4] rounded-2xl px-4 py-3 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-g-dark shrink-0" />
        <p className="text-xs text-text-mid leading-relaxed">
          <strong className="text-text-dark">100% private & GDPR compliant.</strong> We never store emails — only the order data extracted from them.
        </p>
      </div>

      {/* Skip */}
      <button
        type="button"
        onClick={onSkip}
        className="w-full text-center text-xs text-text-muted hover:text-g-dark transition-colors py-1"
      >
        Skip for now — I&apos;ll set this up in my dashboard later →
      </button>
    </div>
  );
}
