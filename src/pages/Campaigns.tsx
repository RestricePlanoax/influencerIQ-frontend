// src/pages/Campaigns.tsx
import React, { useState, useEffect } from 'react';
import { Plus, Filter, Search, LayoutGrid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import CampaignCard from '../components/campaigns/CampaignCard';
import CampaignListItem from '../components/campaigns/CampaignListItem';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Campaign } from '../types';
const baseUrl = import.meta.env.VITE_API_URL || "";

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${baseUrl}/api/v1/campaigns`);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setCampaigns(data.campaigns);
      } catch (err) {
        console.error(err);
        setCampaigns([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  // Apply search + status filters
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === '' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Called when user clicks "Pause" or "Activate"
  const handleCampaignAction = (action: string, campaignId: number) => {
    if (action === 'pause' || action === 'activate') {
      const newStatus = action === 'pause' ? 'paused' : 'active';
      fetch(`{baseUrl}/api/v1/campaigns/${campaignId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          // Update local state so UI refreshes immediately
          setCampaigns((prev) =>
            prev.map((c) =>
              c.id === campaignId ? { ...c, status: newStatus } : c
            )
          );
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header / New Campaign button */}
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <h1 className="text-2xl font-bold text-slate-800">Campaigns</h1>
        <Link
          to="/campaigns/new"
          className="btn btn-primary flex items-center"
        >
          <Plus size={16} className="mr-1" />
          New Campaign
        </Link>
      </div>

      {/* Search + Status filter + View toggle */}
      <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-x-4 md:space-y-0">
        <div className="flex flex-1 space-x-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search campaigns..."
              className="input pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="input w-48"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
            <option value="awaiting">Awaiting</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 rounded-lg border border-slate-200 bg-white p-1">
          <button
            className={`flex items-center rounded-md px-3 py-1.5 text-sm font-medium ${
              viewMode === 'grid'
                ? 'bg-primary-500 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid size={16} className="mr-1.5" />
            Grid
          </button>
          <button
            className={`flex items-center rounded-md px-3 py-1.5 text-sm font-medium ${
              viewMode === 'list'
                ? 'bg-primary-500 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            onClick={() => setViewMode('list')}
          >
            <List size={16} className="mr-1.5" />
            List
          </button>
        </div>
      </div>

      {/* Campaign list or loading / empty state */}
      {isLoading ? (
        <div className="py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : filteredCampaigns.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onAction={handleCampaignAction}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <CampaignListItem
                key={campaign.id}
                campaign={campaign}
                onAction={handleCampaignAction}
              />
            ))}
          </div>
        )
      ) : (
        <EmptyState
          title="No Campaigns Found"
          description={
            searchQuery || statusFilter
              ? 'Try adjusting your search or filters to find campaigns.'
              : 'Create your first campaign to get started.'
          }
          icon={<Filter size={24} />}
          action={{
            label: searchQuery || statusFilter ? 'Reset Filters' : 'Create Campaign',
            onClick: () => {
              if (searchQuery || statusFilter) {
                setSearchQuery('');
                setStatusFilter('');
              }
            },
          }}
        />
      )}
    </div>
  );
};

export default Campaigns;
