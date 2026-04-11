import { useState } from 'react';
import { useNotifications } from '@/src/contexts/NotificationsContext';
import { useSaveFeedback } from './useSaveFeedback';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useSettingsForm() {
  const { addNotification } = useNotifications();

  // Profile fields (controlled)
  const [profileName, setProfileName] = useState('Sarah Jones');
  const [profileEmail, setProfileEmail] = useState('sarah@burgershack.com');
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});

  // Restaurant fields (controlled)
  const [restaurantName, setRestaurantName] = useState("Sarah's Burger Shack");
  const [restaurantLocation, setRestaurantLocation] = useState('London, UK');
  const [restaurantPlatforms, setRestaurantPlatforms] = useState('Uber Eats, Deliveroo');
  const [restaurantErrors, setRestaurantErrors] = useState<Record<string, string>>({});

  // Toggle states
  const [notifs, setNotifs] = useState({ email: true, promos: true, reports: true });
  const [platforms, setPlatforms] = useState({ deliveroo: true, uber: true, justeat: false });

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

  // Save feedback hooks
  const profileSave = useSaveFeedback();
  const restaurantSave = useSaveFeedback();
  const integrationSave = useSaveFeedback();
  const passwordSave = useSaveFeedback();

  const toggleNotif = (key: keyof typeof notifs) =>
    setNotifs(p => ({ ...p, [key]: !p[key] }));

  const togglePlatform = (key: keyof typeof platforms) =>
    setPlatforms(p => ({ ...p, [key]: !p[key] }));

  const handleProfileSave = () => {
    const errs: Record<string, string> = {};
    if (!profileName.trim()) errs.name = 'Full name is required';
    if (!profileEmail.trim()) {
      errs.email = 'Email address is required';
    } else if (!EMAIL_RE.test(profileEmail)) {
      errs.email = 'Enter a valid email address';
    }
    setProfileErrors(errs);
    if (Object.keys(errs).length > 0) return;
    profileSave.triggerSave();
    addNotification({ type: 'success', title: 'Profile updated', message: 'Your profile changes have been saved.' });
  };

  const handleRestaurantSave = () => {
    const errs: Record<string, string> = {};
    if (!restaurantName.trim()) errs.name = 'Restaurant name is required';
    if (!restaurantLocation.trim()) errs.location = 'Location is required';
    setRestaurantErrors(errs);
    if (Object.keys(errs).length > 0) return;
    restaurantSave.triggerSave();
    addNotification({ type: 'success', title: 'Restaurant updated', message: 'Restaurant information has been saved.' });
  };

  const handleIntegrationSave = () => {
    integrationSave.triggerSave();
    addNotification({ type: 'success', title: 'Integrations saved', message: 'Delivery platform settings have been updated.' });
  };

  const handlePasswordSave = () => {
    const errs: Record<string, string> = {};
    if (!currentPassword) errs.current = 'Current password is required';
    if (newPassword.length < 8) errs.new = 'Password must be at least 8 characters';
    if (newPassword !== confirmPassword) errs.confirm = 'Passwords do not match';
    setPasswordErrors(errs);
    if (Object.keys(errs).length > 0) return;

    passwordSave.triggerSave();
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    addNotification({ type: 'success', title: 'Password updated', message: 'Your password has been changed successfully.' });
  };

  const clearProfileError = (key: string) =>
    setProfileErrors(p => ({ ...p, [key]: '' }));

  const clearRestaurantError = (key: string) =>
    setRestaurantErrors(p => ({ ...p, [key]: '' }));

  const clearPasswordError = (key: string) =>
    setPasswordErrors(p => ({ ...p, [key]: '' }));

  return {
    // Profile
    profileName, setProfileName,
    profileEmail, setProfileEmail,
    profileErrors, clearProfileError,
    // Restaurant
    restaurantName, setRestaurantName,
    restaurantLocation, setRestaurantLocation,
    restaurantPlatforms, setRestaurantPlatforms,
    restaurantErrors, clearRestaurantError,
    // Toggles
    notifs,
    platforms,
    toggleNotif,
    togglePlatform,
    // Password
    currentPassword, setCurrentPassword,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    passwordErrors,
    clearPasswordError,
    // Save handlers
    profileSave,
    restaurantSave,
    integrationSave,
    passwordSave,
    handleProfileSave,
    handleRestaurantSave,
    handleIntegrationSave,
    handlePasswordSave,
  };
}
