'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Send, Sparkles, Calendar, Tag, CheckCircle2, ArrowRight,
  Pencil, Check, X, Plus, Trash2, MessageSquare, History,
} from 'lucide-react';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { Card, CardHeader } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Modal } from '@/src/components/ui/Modal';
import { SuccessState } from '@/src/components/ui/SuccessState';
import { cn } from '@/src/lib/utils';
import { useNotifications } from '@/src/contexts/NotificationsContext';
import { usePromoChat, usePromoModals, QUICK_ACTIONS, PRICE_RE } from '@/src/features/promotions';
import type { PromoCardData } from '@/src/features/promotions';

export default function Promotions() {
  const router = useRouter();
  const { addNotification } = useNotifications();
  const {
    sessions, activeId, messages, input, setInput,
    scrollRef, handleSend, newSession, switchSession, renameSession, deleteSession,
  } = usePromoChat();
  const modals = usePromoModals();

  const [editErrors, setEditErrors] = useState<{ title?: string; price?: string }>({});
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const renameInputRef = useRef<HTMLInputElement>(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  useEffect(() => {
    if (renamingId && renameInputRef.current) renameInputRef.current.focus();
  }, [renamingId]);

  // Close history drawer on outside click
  const drawerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!historyOpen) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setHistoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [historyOpen]);

  const startRename = (id: string, currentName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRenamingId(id);
    setRenameValue(currentName);
  };

  const commitRename = () => {
    if (renamingId) { renameSession(renamingId, renameValue); setRenamingId(null); }
  };

  // Shared session list — used in both sidebar and mobile drawer
  const SessionList = ({ onSelect }: { onSelect?: () => void }) => (
    <div className="flex-1 overflow-y-auto divide-y divide-border-light">
      {sessions.map(s => (
        <div
          key={s.id}
          onClick={() => { if (renamingId !== s.id) { switchSession(s.id); onSelect?.(); } }}
          className={cn(
            'w-full text-left px-4 py-3 flex flex-col gap-0.5 group transition-colors relative cursor-pointer',
            activeId === s.id ? 'bg-g-pale' : 'hover:bg-g-faint/60'
          )}
        >
          <div className="flex items-center gap-2 pr-14">
            <MessageSquare className={cn('w-3 h-3 shrink-0', activeId === s.id ? 'text-g-dark' : 'text-text-muted')} />
            {renamingId === s.id ? (
              <input
                ref={renameInputRef}
                value={renameValue}
                onChange={e => setRenameValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') commitRename();
                  if (e.key === 'Escape') setRenamingId(null);
                  e.stopPropagation();
                }}
                onClick={e => e.stopPropagation()}
                className="flex-1 text-xs font-bold text-g-dark bg-white border border-g-dark/30 rounded px-1.5 py-0.5 outline-none min-w-0"
              />
            ) : (
              <p className={cn('text-xs font-bold truncate', activeId === s.id ? 'text-g-dark' : 'text-text-dark')}>
                {s.name}
              </p>
            )}
          </div>
          {renamingId !== s.id && (
            <p className="text-[10px] text-text-muted truncate pl-5">{s.preview}</p>
          )}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all">
            {renamingId === s.id ? (
              <>
                <button
                  onClick={e => { e.stopPropagation(); commitRename(); }}
                  className="p-1 rounded-md bg-g-pale text-g-dark hover:bg-g-dark hover:text-white transition-all"
                >
                  <Check className="w-3 h-3" />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); setRenamingId(null); }}
                  className="p-1 rounded-md hover:bg-gray-100 text-text-muted transition-all"
                >
                  <X className="w-3 h-3" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={e => startRename(s.id, s.name, e)}
                  className="p-1 rounded-md hover:bg-g-pale hover:text-g-dark text-text-muted transition-all"
                  title="Rename"
                >
                  <Pencil className="w-3 h-3" />
                </button>
                {sessions.length > 1 && (
                  <button
                    onClick={e => { e.stopPropagation(); deleteSession(s.id); }}
                    className="p-1 rounded-md hover:bg-red-50 hover:text-red-500 text-text-muted transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <AppLayout
      title="Promotions"
      subtitle="Create and manage AI-powered promotions to drive more orders."
    >
      {/* ── Mobile History Drawer overlay ── */}
      {historyOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" aria-hidden="true" />
      )}
      <div
        ref={drawerRef}
        className={cn(
          'fixed top-0 left-0 h-full w-72 max-w-[85vw] z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden',
          historyOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border-light">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-g-dark" />
            <p className="text-sm font-bold text-text-dark">Chat History</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { newSession(); setHistoryOpen(false); }}
              className="flex items-center gap-1 text-xs font-bold text-g-dark border border-g-dark/20 bg-g-pale px-2.5 py-1.5 rounded-xl hover:bg-g-dark hover:text-white transition-all"
            >
              <Plus className="w-3 h-3" /> New
            </button>
            <button
              onClick={() => setHistoryOpen(false)}
              className="p-1.5 rounded-lg hover:bg-g-faint text-text-muted hover:text-text-dark transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <SessionList onSelect={() => setHistoryOpen(false)} />
      </div>

      {/* ── Mobile top bar: History button + active session name ── */}
      <div className="lg:hidden flex items-center gap-2 mb-3">
        <button
          onClick={() => setHistoryOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border-light bg-white text-xs font-bold text-text-mid hover:bg-g-faint hover:text-g-dark transition-all shrink-0"
        >
          <History className="w-3.5 h-3.5" />
          History
        </button>
        {/* Active session chips */}
        <div className="flex gap-2 overflow-x-auto pb-0.5 no-scrollbar flex-1">
          {sessions.map(s => (
            <button
              key={s.id}
              onClick={() => switchSession(s.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all shrink-0',
                activeId === s.id
                  ? 'bg-g-dark text-white border-g-dark'
                  : 'bg-white text-text-mid border-border-light hover:bg-g-faint'
              )}
            >
              <MessageSquare className="w-3 h-3 shrink-0" />
              {s.name}
            </button>
          ))}
        </div>
        <button
          onClick={newSession}
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-dashed border-g-dark text-g-dark hover:bg-g-pale transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_260px] gap-4 lg:gap-5">

        {/* ── Sessions Panel — desktop only ── */}
        <Card className="hidden lg:flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-border-light flex items-center justify-between">
            <p className="text-xs font-bold text-text-dark">Chats</p>
            <button
              onClick={newSession}
              className="w-6 h-6 flex items-center justify-center rounded-lg bg-g-pale text-g-dark hover:bg-g-dark hover:text-white transition-all"
              title="New chat"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <SessionList />
        </Card>

        {/* ── Chat Interface ── */}
        <Card className="flex flex-col min-h-[500px] lg:h-[calc(100vh-12rem)]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Robot avatar — white bg + multiply blend to kill checkerboard */}
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-white border border-border-light">
                <Image
                  src="/images/robot-thinking.jpeg"
                  alt="AI Assistant"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-dark">AI Growth Assistant</h3>
                <p className="text-[10px] text-g-dark font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-g-dark animate-pulse" /> Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Mobile: open history */}
              <button
                onClick={() => setHistoryOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-border-light hover:bg-g-faint transition-all text-text-muted hover:text-g-dark"
                title="Chat history"
              >
                <History className="w-4 h-4" />
              </button>
              <button
                onClick={newSession}
                className="flex items-center gap-1.5 text-xs font-bold text-g-dark border border-g-dark/20 bg-g-pale hover:bg-g-dark hover:text-white px-3 py-1.5 rounded-xl transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Chat</span>
              </button>
            </div>
          </CardHeader>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-g-faint/30">
            {messages.map(m => (
              <div key={m.id} className={cn('flex gap-3 md:gap-4', m.role === 'user' ? 'flex-row-reverse' : '')}>
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 overflow-hidden border',
                  m.role === 'assistant' ? 'bg-white border-border-light' : 'bg-gray-200 border-transparent text-gray-600'
                )}>
                  {m.role === 'assistant'
                    ? <Image
                        src="/images/robot-happy.jpeg"
                        alt="AI"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                        style={{ mixBlendMode: 'multiply' }}
                      />
                    : 'U'}
                </div>
                <div className={cn('max-w-[80%] space-y-4', m.role === 'user' ? 'text-right' : '')}>
                  <div className={cn(
                    'p-4 rounded-2xl text-sm shadow-sm',
                    m.role === 'assistant' ? 'bg-white text-text-dark border border-border-light' : 'bg-g-dark text-white'
                  )}>
                    {m.content}
                  </div>
                  {m.type === 'promo-card' && m.data && (
                    <div className="bg-white p-5 rounded-2xl border border-border-light shadow-md max-w-sm ml-0 mr-auto space-y-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative">
                          {m.data.image
                            ? <Image src={m.data.image} alt={m.data.title} fill className="object-cover" />
                            : <div className="w-full h-full bg-g-pale flex items-center justify-center text-3xl">{m.data.emoji}</div>
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-bold text-text-dark">{m.data.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-lg font-bold text-g-dark">{m.data.price}</span>
                            <span className="text-xs text-text-muted line-through">{m.data.originalPrice}</span>
                          </div>
                          <p className="text-[10px] text-text-muted mt-1">Only {m.data.slots} slots left today.</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 py-2 text-xs" onClick={() => modals.openLaunch(m.data as PromoCardData)}>
                          Launch Now
                        </Button>
                        <Button variant="outline" className="flex-1 py-2 text-xs gap-1" onClick={() => modals.openEdit(m.data as PromoCardData)}>
                          <Pencil className="w-3 h-3" /> Edit Draft
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border-light bg-white">
            <div className="flex gap-2 bg-g-faint p-2 rounded-xl border border-border-light">
              <input
                type="text"
                placeholder="Ask me to create a promo for slow Tuesdays…"
                className="flex-1 bg-transparent border-none outline-none text-sm px-2"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button onClick={() => handleSend()} className="bg-g-dark text-white p-2 rounded-lg hover:bg-g-mid transition-all">
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
              {QUICK_ACTIONS.map(a => (
                <button
                  key={a}
                  onClick={() => handleSend(a)}
                  className="px-3 py-1.5 bg-white border border-border-light rounded-full text-[10px] font-bold text-text-mid hover:bg-g-pale hover:text-g-dark transition-all whitespace-nowrap"
                >
                  + {a}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* ── Right Sidebar ── */}
        <div className="space-y-5">
          <Card className="p-5 bg-gradient-to-br from-g-dark to-g-mid text-white border-none">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> AI Tips
            </h3>
            <div className="space-y-3">
              {[
                { icon: Calendar, text: "Tuesdays are your slowest days. Launch a 'Mid-week Treat' promo." },
                { icon: Tag, text: "Your 'Burger Bundle' has a 45% conversion rate. Promote it more!" },
                { icon: CheckCircle2, text: "Adding a 'Limited Time' tag increases clicks by 22%." },
              ].map((tip, i) => (
                <div key={i} className="flex gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                  <tip.icon className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">{tip.text}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-bold text-text-dark mb-3">Active Promotions</h3>
            <div className="space-y-3">
              {[
                { name: 'Lunch Special', status: 'Active', orders: 24 },
                { name: 'Weekend Feast', status: 'Paused', orders: 12 },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-g-faint rounded-xl border border-border-light">
                  <div>
                    <p className="text-xs font-bold text-text-dark">{p.name}</p>
                    <p className="text-[10px] text-text-muted">{p.orders} orders generated</p>
                  </div>
                  <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold', p.status === 'Active' ? 'bg-g-pale text-g-dark' : 'bg-gray-100 text-gray-500')}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 text-xs gap-1.5" onClick={() => router.push('/campaigns')}>
              View All Campaigns <ArrowRight className="w-3 h-3" />
            </Button>
          </Card>
        </div>
      </div>

      {/* ── Launch Modal ── */}
      <Modal open={!!modals.launchData} onClose={modals.closeLaunch} title="Launch Promotion" size="sm">
        {modals.launched ? (
          <SuccessState
            title="Promotion Launched!"
            message={`"${modals.launchData?.title}" is now live on all connected platforms.`}
            onDone={modals.closeLaunch}
            details={[
              { label: 'Promotion', value: modals.launchData?.title ?? '' },
              { label: 'Price', value: modals.launchData?.price ?? '' },
              { label: 'Platforms', value: 'Uber Eats, Deliveroo, Just Eat' },
            ]}
          />
        ) : (
          <div className="space-y-4">
            {modals.launchData && (
              <div className="flex items-center gap-4 p-3 bg-g-faint rounded-xl border border-border-light">
                <span className="text-3xl">{modals.launchData.emoji}</span>
                <div>
                  <p className="text-sm font-bold text-text-dark">{modals.launchData.title}</p>
                  <p className="text-xs text-text-muted">
                    <span className="font-bold text-g-dark">{modals.launchData.price}</span>
                    <span className="line-through ml-2">{modals.launchData.originalPrice}</span>
                  </p>
                </div>
              </div>
            )}
            <div className="p-3 bg-g-faint rounded-xl border border-border-light space-y-1">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Will go live on</p>
              <div className="flex gap-2 flex-wrap mt-1">
                {['Uber Eats', 'Deliveroo', 'Just Eat'].map(p => (
                  <span key={p} className="text-[10px] font-bold bg-white border border-border-light px-2 py-1 rounded-lg text-text-mid">{p}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={modals.closeLaunch}>Cancel</Button>
              <Button className="flex-1" onClick={() => {
                modals.confirmLaunch();
                addNotification({ type: 'success', title: 'Promotion launched', message: `"${modals.launchData?.title}" is now live on all platforms.` });
              }}>Confirm Launch</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── Edit Draft Modal ── */}
      <Modal open={!!modals.editData} onClose={modals.closeEdit} title={<span className="flex items-center gap-2"><Pencil className="w-4 h-4 text-g-dark" /> Edit Draft</span>} size="sm">
        {modals.editSaved ? (
          <SuccessState
            title="Draft Saved!"
            message="Your promo draft has been updated."
            onDone={modals.closeEdit}
            details={[
              { label: 'Title', value: modals.editTitle },
              { label: 'Price', value: modals.editPrice },
            ]}
          />
        ) : (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block">
                  <span className="block text-xs font-bold text-text-dark mb-1.5">Promo Title <span className="text-red-500">*</span></span>
                  <input
                    type="text"
                    value={modals.editTitle}
                    onChange={e => { modals.setEditTitle(e.target.value); setEditErrors(p => ({ ...p, title: '' })); }}
                    className={cn("w-full bg-g-faint border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 transition-all", editErrors.title ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-border-light focus:border-g-dark focus:ring-g-pale")}
                  />
                </label>
                {editErrors.title && <p className="text-[10px] text-red-500 font-medium">{editErrors.title}</p>}
              </div>
              <div className="space-y-1">
                <label className="block">
                  <span className="block text-xs font-bold text-text-dark mb-1.5">Promo Price <span className="text-red-500">*</span></span>
                  <input
                    type="text"
                    value={modals.editPrice}
                    onChange={e => { modals.setEditPrice(e.target.value); setEditErrors(p => ({ ...p, price: '' })); }}
                    placeholder="e.g. £8.99"
                    className={cn("w-full bg-g-faint border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 transition-all", editErrors.price ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-border-light focus:border-g-dark focus:ring-g-pale")}
                  />
                </label>
                {editErrors.price && <p className="text-[10px] text-red-500 font-medium">{editErrors.price}</p>}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={modals.closeEdit}>
                <X className="w-4 h-4" /> Cancel
              </Button>
              <Button className="flex-1 gap-1" onClick={() => {
                const errs: { title?: string; price?: string } = {};
                if (!modals.editTitle.trim() || modals.editTitle.trim().length < 3) errs.title = 'Title must be at least 3 characters';
                if (!PRICE_RE.test(modals.editPrice.trim())) errs.price = 'Enter a valid price (e.g. £8.99)';
                setEditErrors(errs);
                if (Object.keys(errs).length > 0) return;
                modals.confirmEdit();
                addNotification({ type: 'success', title: 'Draft saved', message: `Promo draft "${modals.editTitle}" has been updated.` });
              }}>
                <Check className="w-4 h-4" /> Save Draft
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </AppLayout>
  );
}
