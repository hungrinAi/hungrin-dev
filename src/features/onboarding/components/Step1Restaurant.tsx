'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { RESTAURANT_TYPES, AVG_ORDERS } from '../data/constants';
import type { OnboardingForm } from '../types';

const fieldCls = (error?: string) =>
  cn(
    'w-full bg-[#f6fdf9] border rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 transition-all placeholder:text-gray-300',
    error
      ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
      : 'border-border-light focus:border-g-dark focus:ring-[#d1f0e4]',
  );

interface Step1Props {
  form: OnboardingForm;
  errors: Record<string, string>;
  onUpdate: <K extends keyof OnboardingForm>(key: K, value: OnboardingForm[K]) => void;
  onClearError: (key: string) => void;
}

export function Step1Restaurant({ form, errors, onUpdate, onClearError }: Step1Props) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-text-dark">Restaurant Details</h1>
        <p className="text-sm text-text-muted mt-1">Tell us a bit about your business.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-text-dark">Restaurant Name</label>
          <input
            type="text"
            placeholder="e.g. Burger Palace"
            value={form.restaurantName}
            onChange={e => {
              onUpdate('restaurantName', e.target.value);
              if (e.target.value.trim()) onClearError('restaurantName');
            }}
            className={fieldCls(errors.restaurantName)}
          />
          {errors.restaurantName && (
            <p className="text-[10px] font-bold text-red-500">{errors.restaurantName}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-text-dark">City / Postcode</label>
          <input
            type="text"
            placeholder="e.g. London E1 6RF"
            value={form.cityPostcode}
            onChange={e => {
              onUpdate('cityPostcode', e.target.value);
              if (e.target.value.trim()) onClearError('cityPostcode');
            }}
            className={fieldCls(errors.cityPostcode)}
          />
          {errors.cityPostcode && (
            <p className="text-[10px] font-bold text-red-500">{errors.cityPostcode}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-bold text-text-dark">Cuisine Type</label>
        <div className="flex flex-wrap gap-2">
          {RESTAURANT_TYPES.map(t => (
            <button
              key={t.label}
              type="button"
              onClick={() => { onUpdate('restaurantType', t.label); onClearError('restaurantType'); }}
              className={cn(
                'flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold border-2 transition-all',
                form.restaurantType === t.label
                  ? 'bg-g-dark text-white border-g-dark shadow-lg shadow-g-dark/20'
                  : 'bg-white text-text-mid border-border-light hover:border-g-dark/40 hover:text-g-dark',
              )}
            >
              <span>{t.emoji}</span> {t.label}
            </button>
          ))}
        </div>
        {errors.restaurantType && (
          <p className="text-[10px] font-bold text-red-500">{errors.restaurantType}</p>
        )}
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-bold text-text-dark">Average Orders Per Day</label>
        <div className="grid grid-cols-4 gap-2">
          {AVG_ORDERS.map(o => (
            <button
              key={o}
              type="button"
              onClick={() => { onUpdate('avgOrdersPerDay', o); onClearError('avgOrdersPerDay'); }}
              className={cn(
                'py-3 rounded-2xl text-xs font-bold border-2 transition-all text-center',
                form.avgOrdersPerDay === o
                  ? 'bg-g-dark text-white border-g-dark shadow-lg shadow-g-dark/20'
                  : 'bg-white text-text-mid border-border-light hover:border-g-dark/40 hover:text-g-dark',
              )}
            >
              {o}
            </button>
          ))}
        </div>
        {errors.avgOrdersPerDay && (
          <p className="text-[10px] font-bold text-red-500">{errors.avgOrdersPerDay}</p>
        )}
      </div>
    </div>
  );
}
