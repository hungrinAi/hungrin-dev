'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, Check, Camera } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ChangePhotoModalProps {
  open: boolean;
  onClose: () => void;
}

const PRESETS = [
  '/images/robot-thumbsup.jpeg',
  '/images/robot-happy.jpeg',
  '/images/robot-thinking.jpeg',
  '/images/robot-burger.jpeg',
];

export function ChangePhotoModal({ open, onClose }: ChangePhotoModalProps) {
  const [selected, setSelected] = useState('/images/robot-thumbsup.jpeg');
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <Modal open={open} onClose={() => { setSaved(false); onClose(); }} title="Change Profile Photo" size="sm">
      {saved ? (
        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-g-dark shadow-md">
            <Image src={selected} alt="Profile" width={64} height={64} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-bold text-text-dark flex items-center gap-1.5 justify-center">
              <Check className="w-4 h-4 text-g-dark" /> Photo Updated!
            </p>
            <p className="text-xs text-text-muted mt-1">Your profile photo has been saved.</p>
          </div>
          <Button className="w-full" onClick={() => { setSaved(false); onClose(); }}>Done</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Upload area */}
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full border-2 border-dashed border-border-light rounded-xl p-5 flex flex-col items-center gap-2 hover:border-g-dark hover:bg-g-faint transition-all text-center"
          >
            <Upload className="w-6 h-6 text-text-muted" />
            <p className="text-sm font-bold text-text-dark">Upload a photo</p>
            <p className="text-[10px] text-text-muted">JPG, PNG or WEBP · Max 5MB</p>
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" />

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-border-light" />
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">or choose avatar</span>
            <div className="flex-1 h-px bg-border-light" />
          </div>

          {/* Preset avatars */}
          <div className="grid grid-cols-4 gap-2">
            {PRESETS.map(src => (
              <button
                key={src}
                onClick={() => setSelected(src)}
                className={cn(
                  'relative rounded-xl overflow-hidden border-2 transition-all aspect-square',
                  selected === src ? 'border-g-dark shadow-md' : 'border-transparent hover:border-g-light'
                )}
              >
                <Image src={src} alt="" width={80} height={80} className="w-full h-full object-cover" />
                {selected === src && (
                  <div className="absolute inset-0 bg-g-dark/30 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button className="flex-1 gap-1.5" onClick={() => setSaved(true)}>
              <Camera className="w-4 h-4" /> Save Photo
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
