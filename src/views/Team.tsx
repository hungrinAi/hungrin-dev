'use client';

import React, { useState } from 'react';
import { Check, Crown, Mail, MoreVertical, Plus, Save, Shield, Trash2, UserCheck, X } from 'lucide-react';
import { SettingsShell } from '@/src/components/layout/SettingsShell';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';

type Role = 'owner' | 'manager' | 'staff';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'active' | 'invited';
  initials: string;
}

const ROLE_META: Record<Role, { label: string; icon: React.ElementType; color: string; desc: string }> = {
  owner: {
    label: 'Owner',
    icon: Crown,
    color: 'bg-amber-100 text-amber-700',
    desc: 'Full access to all settings, billing, and team management.',
  },
  manager: {
    label: 'Manager',
    icon: Shield,
    color: 'bg-blue-100 text-blue-700',
    desc: 'Can manage orders, promotions, and view analytics. Cannot change billing.',
  },
  staff: {
    label: 'Staff',
    icon: UserCheck,
    color: 'bg-g-pale text-g-dark',
    desc: 'Can view orders and mark them as completed. Read-only access elsewhere.',
  },
};

const INITIAL_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Sarah Jones', email: 'sarah@burgershack.com', role: 'owner', status: 'active', initials: 'SJ' },
  { id: '2', name: 'Marcus Reid', email: 'marcus@burgershack.com', role: 'manager', status: 'active', initials: 'MR' },
  { id: '3', name: 'Aisha Patel', email: 'aisha@burgershack.com', role: 'staff', status: 'invited', initials: 'AP' },
];

interface InviteModalProps {
  open: boolean;
  onClose: () => void;
  onInvite: (name: string, email: string, role: Role) => void;
}

function InviteModal({ open, onClose, onInvite }: InviteModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('staff');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!open) return null;

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onInvite(name.trim(), email.trim(), role);
    setName(''); setEmail(''); setRole('staff'); setErrors({});
    onClose();
  };

  const inputCls = 'mt-1 block w-full rounded-xl border border-border-light bg-white px-3 py-2.5 text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-g-dark/20 focus:border-g-dark transition-all';
  const labelCls = 'text-[10px] font-bold text-text-muted uppercase tracking-wider';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-text-dark">Invite Team Member</h3>
          <button onClick={onClose} className="text-text-muted hover:text-text-dark transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label><span className={labelCls}>Full Name <span className="text-red-500">*</span></span>
              <input type="text" value={name} onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }}
                placeholder="e.g. Marcus Reid" className={cn(inputCls, errors.name ? 'border-red-400' : '')} />
            </label>
            {errors.name && <p className="text-[10px] text-red-500 font-medium">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <label><span className={labelCls}>Email Address <span className="text-red-500">*</span></span>
              <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                placeholder="e.g. marcus@restaurant.com" className={cn(inputCls, errors.email ? 'border-red-400' : '')} />
            </label>
            {errors.email && <p className="text-[10px] text-red-500 font-medium">{errors.email}</p>}
          </div>

          <div>
            <span className={labelCls}>Role</span>
            <div className="mt-2 space-y-2">
              {(Object.entries(ROLE_META) as [Role, typeof ROLE_META[Role]][]).filter(([r]) => r !== 'owner').map(([r, meta]) => {
                const Icon = meta.icon;
                return (
                  <button key={r} onClick={() => setRole(r)}
                    className={cn('w-full flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all',
                      role === r ? 'border-g-dark bg-g-pale' : 'border-border-light hover:border-g-dark/30')}>
                    <span className={cn('mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0', meta.color)}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-text-dark">{meta.label}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">{meta.desc}</p>
                    </div>
                    {role === r && <Check className="w-4 h-4 text-g-dark ml-auto shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <Button onClick={handleSubmit} className="flex-1 gap-2">
            <Mail className="w-4 h-4" /> Send Invite
          </Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

interface RoleMenuProps {
  member: TeamMember;
  onChangeRole: (id: string, role: Role) => void;
  onRemove: (id: string) => void;
}

function MemberRow({ member, onChangeRole, onRemove }: RoleMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const meta = ROLE_META[member.role];
  const Icon = meta.icon;
  const isOwner = member.role === 'owner';

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl border-2 border-border-light hover:border-g-dark/20 transition-all">
      <div className="w-10 h-10 rounded-xl bg-g-dark text-white text-sm font-black flex items-center justify-center shrink-0">
        {member.initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-bold text-text-dark truncate">{member.name}</p>
          {member.status === 'invited' && (
            <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Invited</span>
          )}
        </div>
        <p className="text-xs text-text-muted truncate">{member.email}</p>
      </div>
      <span className={cn('hidden sm:flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-lg shrink-0', meta.color)}>
        <Icon className="w-3 h-3" /> {meta.label}
      </span>
      {!isOwner && (
        <div className="relative shrink-0">
          <button onClick={() => setMenuOpen(o => !o)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:bg-g-faint hover:text-text-dark transition-all">
            <MoreVertical className="w-4 h-4" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-9 z-20 bg-white border border-border-light rounded-xl shadow-lg py-1 w-44 text-sm">
                <p className="px-3 py-1.5 text-[9px] font-bold text-text-muted uppercase tracking-wider">Change Role</p>
                {(['manager', 'staff'] as Role[]).map(r => (
                  <button key={r} onClick={() => { onChangeRole(member.id, r); setMenuOpen(false); }}
                    className={cn('w-full flex items-center gap-2 px-3 py-2 text-xs font-medium hover:bg-g-faint transition-colors',
                      member.role === r ? 'text-g-dark font-bold' : 'text-text-mid')}>
                    {member.role === r && <Check className="w-3.5 h-3.5" />}
                    {member.role !== r && <span className="w-3.5" />}
                    {ROLE_META[r].label}
                  </button>
                ))}
                <div className="my-1 border-t border-border-light" />
                <button onClick={() => { onRemove(member.id); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" /> Remove Member
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [showInvite, setShowInvite] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleInvite = (name: string, email: string, role: Role) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    setMembers(prev => [...prev, {
      id: Date.now().toString(), name, email, role, status: 'invited', initials,
    }]);
  };

  const handleChangeRole = (id: string, role: Role) =>
    setMembers(prev => prev.map(m => m.id === id ? { ...m, role } : m));

  const handleRemove = (id: string) =>
    setMembers(prev => prev.filter(m => m.id !== id));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SettingsShell active="Team">
      <div className="space-y-6">

        {/* Header row */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-black text-text-dark">Team Members</h2>
              <p className="text-xs text-text-muted mt-1">
                Manage who has access to your restaurant dashboard and what they can do.
              </p>
            </div>
            <Button className="gap-2 shrink-0" onClick={() => setShowInvite(true)}>
              <Plus className="w-4 h-4" /> Invite Member
            </Button>
          </div>
        </Card>

        {/* Roles legend */}
        <Card className="p-6 space-y-3">
          <h3 className="text-sm font-bold text-text-dark border-b border-border-light pb-3">Role Permissions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(Object.entries(ROLE_META) as [Role, typeof ROLE_META[Role]][]).map(([r, meta]) => {
              const Icon = meta.icon;
              return (
                <div key={r} className="flex items-start gap-3 p-3 bg-g-faint rounded-xl border border-border-light">
                  <span className={cn('mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0', meta.color)}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-text-dark">{meta.label}</p>
                    <p className="text-[10px] text-text-muted mt-0.5 leading-relaxed">{meta.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Members list */}
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-text-dark border-b border-border-light pb-3">
            {members.length} {members.length === 1 ? 'Member' : 'Members'}
          </h3>
          <div className="space-y-3">
            {members.map(m => (
              <MemberRow key={m.id} member={m} onChangeRole={handleChangeRole} onRemove={handleRemove} />
            ))}
          </div>
          <Button className="gap-2" onClick={handleSave}>
            {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
          </Button>
        </Card>
      </div>

      <InviteModal open={showInvite} onClose={() => setShowInvite(false)} onInvite={handleInvite} />
    </SettingsShell>
  );
}
