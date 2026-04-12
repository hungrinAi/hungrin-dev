'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Save, Check, Trash2 } from 'lucide-react';
import { SettingsShell } from '@/src/components/layout/SettingsShell';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';
import {
  useSaveFeedback,
  DeleteAccountModal,
  ChangePhotoModal,
  inputCls,
  labelCls,
  EMAIL_RE,
  PHONE_RE,
  ACCOUNT_PLATFORMS,
} from '@/src/features/settings';

export default function AccountProfile() {
  const [platforms, setPlatforms] = useState<Record<string, boolean>>(
    Object.fromEntries(ACCOUNT_PLATFORMS.map(p => [p.id, p.connected]))
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  // Controlled profile fields
  const [firstName, setFirstName] = useState('Sarah');
  const [lastName, setLastName] = useState('Jones');
  const [email, setEmail] = useState('sarah@burgershack.com');
  const [phone, setPhone] = useState('+44 7700 900123');
  const [role, setRole] = useState('Owner');
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});

  const profileSave = useSaveFeedback();
  const platformSave = useSaveFeedback();

  const togglePlatform = (id: string) =>
    setPlatforms(prev => ({ ...prev, [id]: !prev[id] }));

  const handleProfileSave = () => {
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = 'First name is required';
    if (!lastName.trim()) errs.lastName = 'Last name is required';
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!EMAIL_RE.test(email)) {
      errs.email = 'Enter a valid email address';
    }
    if (phone && !PHONE_RE.test(phone)) {
      errs.phone = 'Enter a valid phone number';
    }
    setProfileErrors(errs);
    if (Object.keys(errs).length > 0) return;
    profileSave.triggerSave();
  };

  const clearError = (key: string) =>
    setProfileErrors(p => ({ ...p, [key]: '' }));

  return (
    <SettingsShell active="Account">
        {/* Main content */}
        <div className="space-y-6">

          {/* Profile Card */}
          <Card className="p-6 space-y-5">
            <h3 className="text-sm font-bold text-text-dark border-b border-border-light pb-3">
              Profile Information
            </h3>

            {/* Avatar section */}
            <div className="flex items-center gap-5">
              <div className="relative group">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-border-light shadow-sm bg-[#0d3d2c]">
                  <Image src="/images/robot-thumbsup.jpeg" alt="Profile" width={80} height={80} className="w-full h-full object-cover" />
                </div>
                <button
                  onClick={() => setShowPhotoModal(true)}
                  className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>
              <div>
                <p className="text-sm font-bold text-text-dark">{firstName} {lastName}</p>
                <p className="text-xs text-text-muted mt-0.5">{email}</p>
                <button
                  onClick={() => setShowPhotoModal(true)}
                  className="mt-2 text-[10px] font-bold text-g-dark border border-g-dark/30 bg-g-pale rounded-lg px-3 py-1.5 hover:bg-g-dark hover:text-white transition-all flex items-center gap-1.5"
                >
                  <Camera className="w-3 h-3" /> Change Photo
                </button>
              </div>
            </div>

            {/* Form fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block">
                  <span className={labelCls}>First Name <span className="text-red-500">*</span></span>
                  <input
                    type="text"
                    value={firstName}
                    onChange={e => { setFirstName(e.target.value); clearError('firstName'); }}
                    className={cn(inputCls, profileErrors.firstName ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : '')}
                  />
                </label>
                {profileErrors.firstName && <p className="text-[10px] text-red-500 font-medium">{profileErrors.firstName}</p>}
              </div>
              <div className="space-y-1">
                <label className="block">
                  <span className={labelCls}>Last Name <span className="text-red-500">*</span></span>
                  <input
                    type="text"
                    value={lastName}
                    onChange={e => { setLastName(e.target.value); clearError('lastName'); }}
                    className={cn(inputCls, profileErrors.lastName ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : '')}
                  />
                </label>
                {profileErrors.lastName && <p className="text-[10px] text-red-500 font-medium">{profileErrors.lastName}</p>}
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="block">
                  <span className={labelCls}>Email Address <span className="text-red-500">*</span></span>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); clearError('email'); }}
                    className={cn(inputCls, profileErrors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : '')}
                  />
                </label>
                {profileErrors.email && <p className="text-[10px] text-red-500 font-medium">{profileErrors.email}</p>}
              </div>
              <div className="space-y-1">
                <label className="block">
                  <span className={labelCls}>Phone Number</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => { setPhone(e.target.value); clearError('phone'); }}
                    className={cn(inputCls, profileErrors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : '')}
                  />
                </label>
                {profileErrors.phone && <p className="text-[10px] text-red-500 font-medium">{profileErrors.phone}</p>}
              </div>
              <label className="block">
                <span className={labelCls}>Role</span>
                <input
                  type="text"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className={inputCls}
                />
              </label>
            </div>

            <Button className="gap-2" onClick={handleProfileSave}>
              {profileSave.saved
                ? <><Check className="w-4 h-4" /> Saved!</>
                : <><Save className="w-4 h-4" /> Save Changes</>
              }
            </Button>
          </Card>

          {/* Connected Platforms */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-text-dark border-b border-border-light pb-3">
              Connected Platforms
            </h3>
            <div className="space-y-3">
              {ACCOUNT_PLATFORMS.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-4 rounded-2xl border-2 border-border-light transition-all">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-black shrink-0", p.color)}>
                      {p.letter}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-dark">{p.name}</p>
                      <p className="text-xs text-text-muted">
                        {platforms[p.id] ? 'Connected · Syncing orders' : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {platforms[p.id] ? (
                      <>
                        <span className="text-[10px] font-bold bg-g-pale text-g-dark px-2 py-1 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> Active
                        </span>
                        <button
                          onClick={() => togglePlatform(p.id)}
                          className="text-[10px] font-bold text-text-muted border border-border-light px-2.5 py-1.5 rounded-lg hover:border-red-300 hover:text-red-500 transition-all"
                        >
                          Disconnect
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => togglePlatform(p.id)}
                        className="text-[10px] font-bold text-g-dark border border-g-dark/30 bg-g-pale px-2.5 py-1.5 rounded-lg hover:bg-g-dark hover:text-white transition-all"
                      >
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button className="gap-2" onClick={platformSave.triggerSave}>
              {platformSave.saved
                ? <><Check className="w-4 h-4" /> Saved!</>
                : <><Save className="w-4 h-4" /> Save Platforms</>
              }
            </Button>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 space-y-4 border-red-100">
            <h3 className="text-sm font-bold text-red-500 border-b border-red-100 pb-3">
              Danger Zone
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-dark">Delete Account</p>
                <p className="text-xs text-text-muted mt-0.5">Permanently remove your account and all data.</p>
              </div>
              <Button variant="danger" size="sm" className="gap-2 shrink-0" onClick={() => setShowDeleteModal(true)}>
                <Trash2 className="w-4 h-4" /> Delete Account
              </Button>
            </div>
          </Card>
        </div>

      {/* Modals */}
      <DeleteAccountModal open={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
      <ChangePhotoModal open={showPhotoModal} onClose={() => setShowPhotoModal(false)} />
    </SettingsShell>
  );
}
