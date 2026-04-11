'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Save, ToggleLeft, ToggleRight, Trash2, Check } from 'lucide-react';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';
import {
  useSettingsForm,
  DeleteAccountModal,
  SETTINGS_NAV,
  PLATFORM_LIST,
  NOTIFICATION_LIST,
} from '@/src/features/settings';

const inputCls = "w-full bg-g-faint border border-border-light rounded-xl px-4 py-2.5 text-sm outline-none focus:border-g-dark focus:ring-2 focus:ring-g-pale transition-all";
const labelCls = "block text-xs font-bold text-text-dark mb-1.5";

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="transition-all shrink-0">
      {on
        ? <ToggleRight className="w-8 h-8 text-g-dark" />
        : <ToggleLeft className="w-8 h-8 text-text-muted" />
      }
    </button>
  );
}

export default function Settings() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {
    profileName, setProfileName,
    profileEmail, setProfileEmail,
    profileErrors, clearProfileError,
    restaurantName, setRestaurantName,
    restaurantLocation, setRestaurantLocation,
    restaurantPlatforms, setRestaurantPlatforms,
    restaurantErrors, clearRestaurantError,
    notifs,
    platforms,
    toggleNotif,
    togglePlatform,
    currentPassword, setCurrentPassword,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    passwordErrors,
    clearPasswordError,
    profileSave,
    restaurantSave,
    integrationSave,
    passwordSave,
    handleProfileSave,
    handleRestaurantSave,
    handleIntegrationSave,
    handlePasswordSave,
  } = useSettingsForm();

  return (
    <AppLayout
      title="Settings"
      subtitle="Manage your account, restaurant profile, and platform integrations."
    >
      {/* Sub-navigation quick links */}
      <div className="flex flex-wrap gap-2">
        {SETTINGS_NAV.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-border-light rounded-xl text-xs font-bold text-text-mid hover:border-g-dark hover:text-g-dark hover:-translate-y-0.5 hover:shadow-md active:scale-95 transition-all shadow-sm"
          >
            <item.icon className="w-3.5 h-3.5" />
            {item.label}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Profile */}
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-text-dark border-b border-border-light pb-3">Profile</h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="block">
                <span className={labelCls}>Full Name <span className="text-red-500">*</span></span>
                <input
                  type="text"
                  value={profileName}
                  onChange={e => { setProfileName(e.target.value); clearProfileError('name'); }}
                  className={cn(inputCls, profileErrors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : '')}
                />
              </label>
              {profileErrors.name && <p className="text-[10px] text-red-500 font-medium">{profileErrors.name}</p>}
            </div>
            <div className="space-y-1">
              <label className="block">
                <span className={labelCls}>Email Address <span className="text-red-500">*</span></span>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={e => { setProfileEmail(e.target.value); clearProfileError('email'); }}
                  className={cn(inputCls, profileErrors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : '')}
                />
              </label>
              {profileErrors.email && <p className="text-[10px] text-red-500 font-medium">{profileErrors.email}</p>}
            </div>
          </div>
          <Button className="w-full gap-2" onClick={handleProfileSave}>
            {profileSave.saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
          </Button>
        </Card>

        {/* Restaurant Information */}
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-text-dark border-b border-border-light pb-3">Restaurant Information</h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="block">
                <span className={labelCls}>Restaurant Name <span className="text-red-500">*</span></span>
                <input
                  type="text"
                  value={restaurantName}
                  onChange={e => { setRestaurantName(e.target.value); clearRestaurantError('name'); }}
                  className={cn(inputCls, restaurantErrors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : '')}
                />
              </label>
              {restaurantErrors.name && <p className="text-[10px] text-red-500 font-medium">{restaurantErrors.name}</p>}
            </div>
            <div className="space-y-1">
              <label className="block">
                <span className={labelCls}>Restaurant Location <span className="text-red-500">*</span></span>
                <input
                  type="text"
                  value={restaurantLocation}
                  onChange={e => { setRestaurantLocation(e.target.value); clearRestaurantError('location'); }}
                  className={cn(inputCls, restaurantErrors.location ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : '')}
                />
              </label>
              {restaurantErrors.location && <p className="text-[10px] text-red-500 font-medium">{restaurantErrors.location}</p>}
            </div>
            <label className="block">
              <span className={labelCls}>Delivery Platforms</span>
              <input
                type="text"
                value={restaurantPlatforms}
                onChange={e => setRestaurantPlatforms(e.target.value)}
                className={inputCls}
                placeholder="e.g. Uber Eats, Deliveroo"
              />
            </label>
          </div>
          <Button className="w-full gap-2" onClick={handleRestaurantSave}>
            {restaurantSave.saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Update Restaurant</>}
          </Button>
        </Card>

        {/* Delivery Integrations */}
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-text-dark border-b border-border-light pb-3">Delivery Integrations</h3>
          <div className="space-y-3">
            {PLATFORM_LIST.map((p) => (
              <div key={p.key} className="flex items-center justify-between p-3 bg-g-faint rounded-xl border border-border-light">
                <div className="flex items-center gap-3">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black shrink-0", p.color)}>
                    {p.letter}
                  </div>
                  <p className="text-sm font-medium text-text-dark">{p.name}</p>
                </div>
                <Toggle on={platforms[p.key as keyof typeof platforms]} onToggle={() => togglePlatform(p.key as keyof typeof platforms)} />
              </div>
            ))}
          </div>
          <Button className="w-full gap-2" onClick={handleIntegrationSave}>
            {integrationSave.saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Integrations</>}
          </Button>
        </Card>

        {/* Notifications */}
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-text-dark border-b border-border-light pb-3">Notifications</h3>
          <div className="space-y-3">
            {NOTIFICATION_LIST.map((n) => (
              <div key={n.key} className="flex items-center justify-between p-3 bg-g-faint rounded-xl border border-border-light">
                <div className="flex-1 min-w-0 pr-3">
                  <p className="text-sm font-medium text-text-dark">{n.label}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">{n.desc}</p>
                </div>
                <Toggle on={notifs[n.key as keyof typeof notifs]} onToggle={() => toggleNotif(n.key as keyof typeof notifs)} />
              </div>
            ))}
          </div>
        </Card>
        {/* Password & Security */}
        <Card className="p-6 space-y-4 md:col-span-2">
          <h3 className="text-sm font-bold text-text-dark border-b border-border-light pb-3">Password &amp; Security</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block">
                <span className={labelCls}>Current Password</span>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={e => { setCurrentPassword(e.target.value); clearPasswordError('current'); }}
                  placeholder="••••••••"
                  className={cn(inputCls, passwordErrors.current ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : '')}
                />
              </label>
              {passwordErrors.current && <p className="text-[10px] text-red-500 font-medium">{passwordErrors.current}</p>}
            </div>
            <div className="space-y-1">
              <label className="block">
                <span className={labelCls}>New Password</span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => { setNewPassword(e.target.value); clearPasswordError('new'); }}
                  placeholder="••••••••"
                  className={cn(inputCls, passwordErrors.new ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : '')}
                />
              </label>
              {passwordErrors.new && <p className="text-[10px] text-red-500 font-medium">{passwordErrors.new}</p>}
            </div>
            <div className="space-y-1">
              <label className="block">
                <span className={labelCls}>Confirm New Password</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => { setConfirmPassword(e.target.value); clearPasswordError('confirm'); }}
                  placeholder="••••••••"
                  className={cn(inputCls, passwordErrors.confirm ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : '')}
                />
              </label>
              {passwordErrors.confirm && <p className="text-[10px] text-red-500 font-medium">{passwordErrors.confirm}</p>}
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <Button className="gap-2" onClick={handlePasswordSave}>
              {passwordSave.saved ? <><Check className="w-4 h-4" /> Updated!</> : <><Save className="w-4 h-4" /> Update Password</>}
            </Button>
            <Button variant="danger" size="sm" className="gap-2" onClick={() => setShowDeleteModal(true)}>
              <Trash2 className="w-4 h-4" /> Delete Account
            </Button>
          </div>
        </Card>
      </div>
      <DeleteAccountModal open={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
    </AppLayout>
  );
}