import { useState } from 'react';
import type { OnboardingForm } from '../types';
import { STEPS } from '../data/constants';

const INITIAL_FORM: OnboardingForm = {
  restaurantName: '',
  cityPostcode: '',
  restaurantType: '',
  avgOrdersPerDay: '',
  platforms: [],
};

export function useOnboarding() {
  const [step, setStep] = useState(1);
  const [slide, setSlide] = useState(0);
  const [form, setForm] = useState<OnboardingForm>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const totalSteps = STEPS.length;
  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  const updateField = <K extends keyof OnboardingForm>(key: K, value: OnboardingForm[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const clearFieldError = (key: string) => {
    setFieldErrors(prev => ({ ...prev, [key]: '' }));
  };

  const togglePlatform = (id: string) => {
    setForm(prev => {
      const updated = prev.platforms.includes(id)
        ? prev.platforms.filter(x => x !== id)
        : [...prev.platforms, id];
      if (updated.length > 0) clearFieldError('platforms');
      return { ...prev, platforms: updated };
    });
  };

  const validateStep = (): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!form.restaurantName.trim()) errors.restaurantName = 'Restaurant name is required';
      if (!form.cityPostcode.trim()) errors.cityPostcode = 'City or postcode is required';
      if (!form.restaurantType) errors.restaurantType = 'Please select a cuisine type';
      if (!form.avgOrdersPerDay) errors.avgOrdersPerDay = 'Please select your average daily orders';
    }

    if (step === 2) {
      if (form.platforms.length === 0)
        errors.platforms = 'Please select at least one delivery platform';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinue = () => {
    if (validateStep()) setStep(s => s + 1);
  };

  const handleBack = () => {
    setFieldErrors({});
    setStep(s => s - 1);
  };

  const nextSlide = () => setSlide(s => (s + 1) % 4);

  return {
    step,
    slide,
    form,
    fieldErrors,
    progress,
    totalSteps,
    updateField,
    clearFieldError,
    togglePlatform,
    validateStep,
    handleContinue,
    handleBack,
    nextSlide,
    setSlide,
  };
}
