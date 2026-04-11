'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';

const inputCls = (error?: string) =>
  cn(
    'w-full bg-g-faint border rounded-xl px-4 py-3 text-sm outline-none transition-all focus:ring-2 placeholder:text-text-muted/50',
    error
      ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
      : 'border-border-light focus:border-g-dark focus:ring-[#d1f0e4]'
  );

export function ContactForm() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ subject?: string; message?: string }>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { subject?: string; message?: string } = {};
    if (!subject.trim()) {
      errs.subject = 'Subject is required';
    } else if (subject.trim().length < 5) {
      errs.subject = 'Subject must be at least 5 characters';
    }
    if (!message.trim()) {
      errs.message = 'Message is required';
    } else if (message.trim().length < 20) {
      errs.message = 'Please provide more detail (at least 20 characters)';
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
        <div className="w-14 h-14 rounded-full bg-g-pale flex items-center justify-center">
          <Send className="w-6 h-6 text-g-dark" />
        </div>
        <div>
          <p className="font-bold text-text-dark">Message sent!</p>
          <p className="text-sm text-text-muted mt-1">We'll get back to you within 24 hours.</p>
        </div>
        <button
          type="button"
          onClick={() => { setSent(false); setSubject(''); setMessage(''); setErrors({}); }}
          className="text-xs font-bold text-g-dark hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="space-y-1">
        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={subject}
          onChange={e => { setSubject(e.target.value); setErrors(p => ({ ...p, subject: '' })); }}
          placeholder="e.g. Problem with promotions"
          className={inputCls(errors.subject)}
        />
        {errors.subject && <p className="text-[10px] text-red-500 font-medium">{errors.subject}</p>}
      </div>
      <div className="space-y-1">
        <label className="text-xs font-bold text-text-dark uppercase tracking-wider">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={e => { setMessage(e.target.value); setErrors(p => ({ ...p, message: '' })); }}
          placeholder="Describe your issue in as much detail as possible…"
          className={inputCls(errors.message) + ' resize-none'}
        />
        {errors.message && <p className="text-[10px] text-red-500 font-medium">{errors.message}</p>}
      </div>
      <Button type="submit" className="w-full gap-2">
        Send Message <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}
