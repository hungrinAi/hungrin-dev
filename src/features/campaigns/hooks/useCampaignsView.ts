import { useState, useEffect } from 'react';
import { useNotifications } from '@/src/contexts/NotificationsContext';
import type { Campaign } from '../types';
import { PAGE_SIZE } from '../data/constants';

export function useCampaignsView(campaigns: Campaign[] | null) {
  const { addNotification } = useNotifications();
  const [localCampaigns, setLocalCampaigns] = useState<Campaign[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (campaigns) setLocalCampaigns(campaigns);
  }, [campaigns]);

  const handleCreated = (newCampaign: Campaign) => {
    setLocalCampaigns(prev => [newCampaign, ...prev]);
    addNotification({
      type: 'success',
      title: 'Campaign created',
      message: `"${newCampaign.name}" is now live and visible in your campaigns.`,
    });
  };

  const handleStatusChanged = (id: string, status: Campaign['status']) => {
    setLocalCampaigns(prev => prev.map(c => (c.id === id ? { ...c, status } : c)));
    const camp = localCampaigns.find(c => c.id === id);
    addNotification({
      type: status === 'Active' ? 'success' : 'warning',
      title: status === 'Active' ? 'Campaign resumed' : 'Campaign paused',
      message: `"${camp?.name}" has been ${status === 'Active' ? 'resumed' : 'paused'}.`,
    });
  };

  const handleDeleted = (id: string) => {
    const camp = localCampaigns.find(c => c.id === id);
    setLocalCampaigns(prev => prev.filter(c => c.id !== id));
    addNotification({
      type: 'warning',
      title: 'Campaign deleted',
      message: `"${camp?.name}" has been permanently removed.`,
    });
  };

  const filtered = localCampaigns.filter(c => {
    const matchesFilter = filter === 'All' || c.status === filter;
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const setFilterAndReset = (f: string) => { setFilter(f); setPage(1); };
  const setSearchAndReset = (s: string) => { setSearch(s); setPage(1); };

  return {
    localCampaigns,
    filter,
    search,
    page,
    filtered,
    paginated,
    totalPages,
    setFilter: setFilterAndReset,
    setSearch: setSearchAndReset,
    setPage,
    handleCreated,
    handleStatusChanged,
    handleDeleted,
  };
}
