'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Logo } from '@/src/components/brand';
import { Button } from '@/src/components/ui/Button';
import { ROUTES, STORAGE_KEYS } from '@/src/lib/constants';
import {
  STEPS,
  useOnboarding,
  LeftPanel,
  StepBreadcrumb,
  Step1Restaurant,
  Step2Platforms,
  Step3Email,
  Step3Promo,
  Step4Live,
} from '@/src/features/onboarding';

export default function Onboarding() {
  const router = useRouter();
  const {
    step,
    slide,
    form,
    fieldErrors,
    progress,
    totalSteps,
    updateField,
    clearFieldError,
    togglePlatform,
    handleContinue,
    skipStep,
    handleBack,
    nextSlide,
    setSlide,
  } = useOnboarding();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      <LeftPanel slide={slide} onNext={nextSlide} onDotClick={setSlide} />

      {/* Right Panel */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-6 py-4 border-b border-border-light lg:px-10">
          {/* Logo — mobile only */}
          <div className="lg:hidden shrink-0">
            <Logo size={38} />
          </div>

          {/* Step counter — desktop only */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-text-muted">
            <span className="text-g-dark text-sm">Step {step}</span>
            <span>of {totalSteps}</span>
          </div>

          {/* Login link — pushed to right */}
          <Link
            href={ROUTES.LOGIN}
            className="ml-auto shrink-0 inline-flex items-center rounded-full border border-border-light bg-white px-4 py-2 text-xs font-bold text-text-dark shadow-sm transition-all hover:border-g-dark hover:text-g-dark whitespace-nowrap"
          >
            Already have an account?&nbsp;
            <span className="text-g-dark">Log in</span>
          </Link>
        </header>

        {/* Progress bar */}
        <div className="h-1 bg-border-light">
          <div
            className="h-full bg-gradient-to-r from-[#23664f] to-[#2d7a5f] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step breadcrumb */}
        <div className="px-6 lg:px-10 pt-6 pb-2">
          <StepBreadcrumb currentStep={step} />
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-10 py-6">
          <div className="max-w-xl">
            {step === 1 && (
              <Step1Restaurant
                form={form}
                errors={fieldErrors}
                onUpdate={updateField}
                onClearError={clearFieldError}
              />
            )}
            {step === 2 && (
              <Step2Platforms
                form={form}
                errors={fieldErrors}
                onTogglePlatform={togglePlatform}
              />
            )}
            {step === 3 && (
              <Step3Email
                form={form}
                errors={fieldErrors}
                onUpdate={updateField}
                onClearError={clearFieldError}
                onSkip={skipStep}
              />
            )}
            {step === 4 && (
              <Step3Promo
                form={form}
                onLaunch={handleContinue}
                onSkip={skipStep}
              />
            )}
            {step === 5 && <Step4Live />}
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="px-6 lg:px-10 py-5 border-t border-border-light bg-white flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm font-bold text-text-mid hover:text-g-dark transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <Link href={ROUTES.HOME} className="text-xs text-text-muted hover:text-g-dark transition-all">
              ← Back to home
            </Link>
          )}

          <div className="flex items-center gap-3">
            {step < totalSteps && (
              <span className="text-xs text-text-muted hidden sm:block">
                {totalSteps - step} step{totalSteps - step !== 1 ? 's' : ''} remaining
              </span>
            )}
            {step < totalSteps ? (
              <Button
                onClick={handleContinue}
                className="bg-gradient-to-r from-[#23664f] to-[#2d7a5f] text-white px-6"
              >
                Continue <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={() => router.push(ROUTES.DASHBOARD)}
                className="bg-gradient-to-r from-[#23664f] to-[#2d7a5f] text-white px-6"
              >
                Go to Dashboard <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
