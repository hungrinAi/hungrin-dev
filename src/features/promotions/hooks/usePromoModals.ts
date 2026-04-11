import { useState } from 'react';
import type { PromoCardData } from '../types';

export function usePromoModals() {
  const [launchData, setLaunchData] = useState<PromoCardData | null>(null);
  const [launched, setLaunched] = useState(false);

  const [editData, setEditData] = useState<PromoCardData | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editSaved, setEditSaved] = useState(false);

  const openLaunch = (data: PromoCardData) => {
    setLaunched(false);
    setLaunchData(data);
  };
  const closeLaunch = () => setLaunchData(null);
  const confirmLaunch = () => setLaunched(true);

  const openEdit = (data: PromoCardData) => {
    setEditTitle(data.title);
    setEditPrice(data.price);
    setEditSaved(false);
    setEditData(data);
  };
  const closeEdit = () => setEditData(null);
  const confirmEdit = () => setEditSaved(true);

  return {
    launchData,
    launched,
    openLaunch,
    closeLaunch,
    confirmLaunch,
    editData,
    editTitle,
    setEditTitle,
    editPrice,
    setEditPrice,
    editSaved,
    openEdit,
    closeEdit,
    confirmEdit,
  };
}
