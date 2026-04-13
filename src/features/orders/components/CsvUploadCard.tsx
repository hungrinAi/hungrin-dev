'use client';

import React, { useState, useRef } from 'react';
import {
  Upload, CheckCircle2, X, Mail, Link2,
  RefreshCw, AlertCircle, Clock, FileText,
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';
import {
  MOCK_REPORTS, PLATFORM_COLOR, HOW_IT_WORKS,
} from '../data/constants';
import type { CsvReport, ReportFilter, UploadTab } from '../data/constants';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ConnectedInbox {
  email: string;
  lastSync: string;
  nextSync: string;
  reports: number;
}

export function CsvUploadCard() {
  const [activeFilter, setActiveFilter] = useState<ReportFilter>('All');
  const [reports, setReports] = useState<CsvReport[]>(MOCK_REPORTS);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const [activeTab, setActiveTab] = useState<UploadTab>('csv');
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState<ConnectedInbox | null>(null);
  const [syncing, setSyncing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = activeFilter === 'All' ? reports : reports.filter(r => r.status === activeFilter);
  const counts: Record<ReportFilter, number> = {
    All:       reports.length,
    Pending:   reports.filter(r => r.status === 'Pending').length,
    Completed: reports.filter(r => r.status === 'Completed').length,
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file.name);
    setUploaded(true);
    const newReport: CsvReport = {
      id: Date.now().toString(),
      name: file.name,
      platform: 'Manual Upload',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      size: `${Math.round(file.size / 1024)} KB`,
      status: 'Pending',
    };
    setReports(prev => [newReport, ...prev]);
    e.target.value = '';
  };

  const handleConnect = () => {
    if (!EMAIL_RE.test(emailInput.trim())) { setEmailError('Enter a valid email address'); return; }
    setEmailError('');
    setConnecting(true);
    setTimeout(() => {
      setConnected({ email: emailInput.trim(), lastSync: 'Just now', nextSync: 'In 1 hour', reports: 3 });
      setConnecting(false);
    }, 1800);
  };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setConnected(prev => prev ? { ...prev, lastSync: 'Just now', reports: prev.reports + 1 } : prev);
      setSyncing(false);
    }, 1500);
  };

  return (
    <Card className="p-5 space-y-4">

      {/* ── Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-sm font-bold text-text-dark">Reports & Data Import</h3>
        <div className="flex gap-1 bg-g-faint p-1 rounded-xl border border-border-light">
          {(['email', 'csv'] as UploadTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all whitespace-nowrap",
                activeTab === tab
                  ? "bg-white text-g-dark shadow-sm border border-border-light"
                  : "text-text-muted hover:text-text-dark"
              )}
            >
              {tab === 'csv' ? <Upload className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
              {tab === 'csv' ? 'Manual Upload' : 'Link Inbox'}
              {tab === 'email' && connected && (
                <span className="w-1.5 h-1.5 rounded-full bg-g-dark animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── CSV tab ── */}
      {activeTab === 'csv' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center">
          <div className="space-y-3">
            <p className="text-xs text-text-muted leading-relaxed">Import order reports from delivery platforms:</p>
            <div className="space-y-2">
              {Object.keys(PLATFORM_COLOR).map(p => (
                <div key={p} className="flex items-center justify-between text-xs text-text-mid font-medium">
                  <span>{p}</span>
                  <div className={cn("w-5 h-5 rounded flex items-center justify-center text-[10px] font-black", PLATFORM_COLOR[p])}>
                    {p[0]}
                  </div>
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
                onClick={() => { setUploadedFile(null); setUploaded(false); }}
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
              <Upload className="w-6 h-6 text-text-muted mx-auto mb-2 group-hover:text-g-dark transition-colors" />
              <p className="text-[10px] font-bold text-g-dark uppercase tracking-wider">Upload CSV</p>
              <p className="text-[9px] text-text-muted mt-1">Max 10MB · .csv only</p>
            </div>
          )}
        </div>
      )}

      {/* ── Email Inbox tab ── */}
      {activeTab === 'email' && (
        <div className="space-y-4">
          {!connected ? (
            <>
              <div className="flex items-start gap-3 p-3 bg-[#fffbeb] border border-amber-200 rounded-xl">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-700 leading-relaxed">
                  Connect the email address where Uber Eats, Deliveroo, and Just Eat send your weekly CSV reports.
                </p>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-bold text-text-dark">Restaurant Email Address</label>
                <div className="flex items-center gap-2 bg-g-faint border border-border-light rounded-xl px-3 py-2.5 focus-within:border-g-dark transition-all">
                  <Mail className="w-3.5 h-3.5 text-text-muted shrink-0" />
                  <input
                    type="email"
                    placeholder="orders@yourrestaurant.com"
                    value={emailInput}
                    onChange={e => { setEmailInput(e.target.value); setEmailError(''); }}
                    onKeyDown={e => e.key === 'Enter' && handleConnect()}
                    className="flex-1 bg-transparent border-none outline-none text-sm min-w-0"
                  />
                </div>
                <Button
                  size="sm"
                  onClick={handleConnect}
                  disabled={connecting}
                  className="w-full gap-1.5 mt-2"
                >
                  {connecting
                    ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Connecting…</>
                    : <><Link2 className="w-3.5 h-3.5" /> Connect Inbox</>
                  }
                </Button>
                {emailError && <p className="text-[10px] text-red-500 font-medium">{emailError}</p>}
              </div>
              <div className="space-y-2 pt-1">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">How it works</p>
                {HOW_IT_WORKS.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-text-mid">
                    <span className="w-4 h-4 rounded-full bg-g-pale text-g-dark text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {s}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-g-pale rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-g-dark" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-dark flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-g-dark animate-pulse" /> Connected
                    </p>
                    <p className="text-[10px] text-text-muted">{connected.email}</p>
                  </div>
                </div>
                <button onClick={() => { setConnected(null); setEmailInput(''); }} className="text-[10px] font-bold text-red-500 hover:text-red-700 transition-colors">
                  Disconnect
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Reports found', val: connected.reports },
                  { label: 'Last sync',     val: connected.lastSync },
                  { label: 'Next sync',     val: connected.nextSync },
                ].map(s => (
                  <div key={s.label} className="bg-g-faint border border-border-light rounded-xl p-3 text-center">
                    <p className="text-sm font-black text-text-dark">{s.val}</p>
                    <p className="text-[9px] text-text-muted mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full gap-2" onClick={handleSync} disabled={syncing}>
                <RefreshCw className={cn("w-3.5 h-3.5", syncing && "animate-spin")} />
                {syncing ? 'Syncing…' : 'Sync Now'}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ── Filter + Report list ── */}
      <div className="space-y-3 pt-1 border-t border-border-light">
        {/* Filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {(['All', 'Pending', 'Completed'] as ReportFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border",
                activeFilter === f
                  ? f === 'Pending'
                    ? "bg-amber-50 border-amber-300 text-amber-700"
                    : f === 'Completed'
                    ? "bg-[#f0fdf4] border-[#bbf7d0] text-g-dark"
                    : "bg-g-faint border-g-dark/20 text-g-dark"
                  : "bg-white border-border-light text-text-muted hover:text-text-dark hover:border-border-mid"
              )}
            >
              {f === 'Pending'   && <Clock className="w-3 h-3" />}
              {f === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
              {f}
              <span className={cn(
                "text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center",
                activeFilter === f
                  ? f === 'Pending'   ? "bg-amber-200 text-amber-800"
                  : f === 'Completed' ? "bg-g-pale text-g-dark"
                  :                     "bg-g-dark/10 text-g-dark"
                  : "bg-g-faint text-text-muted"
              )}>
                {counts[f]}
              </span>
            </button>
          ))}
        </div>

        {/* Report rows */}
        <div className="space-y-1.5">
          {filtered.length === 0 ? (
            <p className="text-xs text-text-muted text-center py-4">No reports found.</p>
          ) : (
            filtered.map((r) => (
              <div key={r.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-g-faint border border-border-light hover:border-border-mid transition-all">
                <div className="w-7 h-7 rounded-lg bg-white border border-border-light flex items-center justify-center shrink-0 shadow-sm">
                  <FileText className="w-3.5 h-3.5 text-text-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-text-dark truncate">{r.name}</p>
                  <p className="text-[10px] text-text-muted">{r.platform} · {r.date} · {r.size}</p>
                </div>
                <span className={cn(
                  "shrink-0 flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded-full",
                  r.status === 'Completed'
                    ? "bg-[#f0fdf4] text-g-dark border border-[#bbf7d0]"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                )}>
                  {r.status === 'Completed'
                    ? <CheckCircle2 className="w-2.5 h-2.5" />
                    : <Clock className="w-2.5 h-2.5" />
                  }
                  {r.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFile} />
    </Card>
  );
}
