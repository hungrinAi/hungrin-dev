'use client';

import React from 'react';
import { PageLoading } from '@/src/components/ui/Loading';
import { Search, Filter, Plus, MoreHorizontal, Zap, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Pagination } from '@/src/components/ui/Pagination';
import { FilterTabs } from '@/src/components/ui/FilterTabs';
import { StatusBadge } from '@/src/components/ui/StatusBadge';
import {
  useCampaigns,
  useCampaignActions,
  useCampaignsView,
  NewCampaignModal,
  CampaignActionsMenu,
} from '@/src/features/campaigns';
import { cn } from '@/src/lib/utils';

export default function Campaigns() {
  const { data: campaigns, loading, error } = useCampaigns();
  const { modal, targetCampaign, openNew, openActions, close } = useCampaignActions();
  const {
    filter,
    search,
    page,
    filtered,
    paginated,
    totalPages,
    setFilter,
    setSearch,
    setPage,
    handleCreated,
    handleStatusChanged,
    handleDeleted,
  } = useCampaignsView(campaigns ?? null);

  if (loading) return <PageLoading message="Loading campaigns" />;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <AppLayout
      title="Campaigns"
      subtitle="Win back customers, increase orders, and drive revenue with targeted campaigns."
    >
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <FilterTabs
          options={['All', 'Active', 'Paused', 'Ended']}
          value={filter}
          onChange={setFilter}
        />
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="secondary" size="sm">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button size="sm" onClick={openNew}>
            <Plus className="w-4 h-4" /> New Campaign
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <Card className="overflow-hidden">
        <div className="p-5 border-b border-border-light flex items-center gap-4">
          <div className="flex-1 flex items-center gap-3 bg-g-faint border border-border-light rounded-xl px-4 py-2.5">
            <Search className="w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search campaigns…"
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
          <select className="bg-white border border-border-light rounded-xl px-4 py-2.5 text-sm outline-none">
            <option>All Types</option>
            <option>Food Promo</option>
            <option>Seasonal</option>
            <option>Loyalty</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-g-faint border-b border-border-light">
                <th className="px-3 md:px-6 py-3 md:py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Name</th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider hidden sm:table-cell">Orders</th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider hidden sm:table-cell">Revenue</th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider hidden md:table-cell">Date</th>
                <th className="px-3 md:px-6 py-3 md:py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-text-muted">
                    No campaigns match your filter.
                  </td>
                </tr>
              ) : paginated.map((c) => (
                <tr key={c.id} className="hover:bg-g-faint transition-colors cursor-pointer group">
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <div className="flex items-center gap-2 md:gap-4">
                      <div className="w-9 h-9 md:w-12 md:h-10 bg-g-pale rounded-lg flex items-center justify-center text-xl md:text-2xl shrink-0">{c.emoji}</div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-text-dark mb-0.5 truncate">{c.name}</p>
                        <p className="text-[10px] text-text-muted hidden sm:flex items-center gap-1"><Zap className="w-3 h-3 shrink-0" /> {c.meta}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-sm font-bold text-text-dark hidden sm:table-cell">{c.orders}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-sm font-bold text-text-dark hidden sm:table-cell">{c.revenue}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs text-text-muted leading-tight hidden md:table-cell">{c.startDate} –<br />{c.endDate}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-right">
                    <button
                      onClick={() => openActions(c)}
                      className="p-1.5 md:p-2 text-text-muted hover:text-g-dark hover:bg-g-pale rounded-lg transition-all"
                    >
                      <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-5 bg-g-faint border-t border-border-light">
          <Pagination
            page={page}
            total={totalPages}
            onChange={setPage}
            label={
              <>Page <strong className="text-text-dark">{page}</strong> of {totalPages}
              {filtered.length !== (paginated as unknown[]).length && <span className="ml-1">({filtered.length} results)</span>}</>
            }
          />
        </div>
      </Card>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-[#e8f8f0] via-[#d0eedd] to-[#c0e8d4] rounded-2xl border border-border-light p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 flex-1">
          <h3 className="text-xl font-bold text-text-dark mb-1">Create Targeted Campaigns</h3>
          <p className="text-sm text-text-mid mb-4 md:mb-6">Promote your <strong>best offers like a pro</strong></p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            {['Increase repeat orders', 'Fill slow times', 'Boost online reviews', 'Maximize revenue'].map(c => (
              <div key={c} className="flex items-center gap-2 text-sm text-text-mid font-medium">
                <CheckCircle2 className="w-4 h-4 text-g-dark shrink-0" /> {c}
              </div>
            ))}
          </div>
          <Button className="mt-6" onClick={openNew}>
            <Plus className="w-4 h-4" /> Create Campaign
          </Button>
        </div>
        <div className="w-24 h-24 md:w-32 md:h-32 animate-bob shrink-0 rounded-2xl overflow-hidden bg-white border border-border-light flex items-center justify-center mx-auto sm:mx-0">
          <Image src="/images/robot-thumbsup.jpeg" alt="" width={128} height={128} className="w-full h-full object-cover object-center" style={{ mixBlendMode: 'multiply' }} />
        </div>
      </div>

      {/* Modals */}
      <NewCampaignModal
        open={modal === 'new'}
        onClose={close}
        onCreated={(c) => { handleCreated(c); close(); }}
      />
      <CampaignActionsMenu
        open={modal === 'actions'}
        onClose={close}
        campaign={targetCampaign ?? undefined}
        onStatusChanged={(id, status) => { handleStatusChanged(id, status); close(); }}
        onDeleted={(id) => { handleDeleted(id); close(); }}
      />
    </AppLayout>
  );
}
