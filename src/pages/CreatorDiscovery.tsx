// src/pages/CreatorDiscovery.tsx
import React, { useState, useEffect } from 'react';
import { Plus, List, LayoutGrid, Filter as FilterIcon } from 'lucide-react';
import CreatorSearch from '../components/creators/CreatorSearch';
import CreatorFilters from '../components/creators/CreatorFilters';
import CreatorCard from '../components/creators/CreatorCard';
import CreatorListItem from '../components/creators/CreatorListItem';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
const baseUrl = "https://influencer-iq-backend.vercel.app" || "";

interface Creator {
  id: string;
  name: string;
  profilePic: string;
  platform: string;
  handle: string;
  audienceSize: number;
  demographics: {
    ageRange: [number, number];
    gender: { female: number; male: number; other: number };
    location: string;
  };
  engagement: {
    avgLikes: number;
    avgComments: number;
    avgViews?: number;
  };
  pastCollaborations: string[];
  isAuthentic: boolean;
  authenticityScore: number;
}

interface Filters {
  platforms: string[];
  location: string;
  gender: string;
  ageRange: [number, number];
  followerRange: [number, number];
}

const CreatorDiscovery: React.FC = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showListModal, setShowListModal] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // ─── Initial load: fetch all creators ──────────────────────────────────────
  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${baseUrl}/v1/creators`);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json(); // { creators: [...] }
        setCreators(data.creators);
      } catch (err) {
        console.error(err);
        setCreators([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  // ─── Handle results from CreatorSearch (regular or AI) ────────────────────
  const handleSearchResults = (results: Creator[]) => {
    setCreators(results);
  };

  const handleAiSearchResults = (results: Creator[]) => {
    setCreators(results);
  };

  // ─── Handle filters: POST to /api/v1/creators/filter ─────────────────────
  const handleApplyFilters = async (filters: Filters) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}/v1/creators/filter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters),
      });
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json(); // { creators: [...] }
      setCreators(data.creators);
    } catch (err) {
      console.error(err);
      setCreators([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToList = (creatorId: string) => {
    setSelectedCreator(creatorId);
    setShowListModal(true);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-slate-800">Creator Discovery</h1>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <CreatorSearch
            onResults={handleSearchResults}
            onAiSearch={handleAiSearchResults}
          />
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <CreatorFilters onApplyFilters={handleApplyFilters} />
          </div>
        </div>
      </div>

      {/* View Toggle & Count */}
      <div className="flex items-center justify-between">
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
        <span className="text-sm text-slate-500">
          {creators.length} creators found
        </span>
      </div>

      {/* Creator List / Shimmer */}
      {isLoading ? (
        <div className={`grid grid-cols-1 gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : ''}`}>
          {Array.from({ length: viewMode === 'grid' ? 6 : 4 }).map((_, idx) => (
            <div
              key={idx}
              className={`animate-pulse rounded-lg bg-gray-200 p-6 ${
                viewMode === 'list' ? 'h-24' : 'h-72'
              }`}
            />
          ))}
        </div>
      ) : creators.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {creators.map((creator) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                onAddToList={handleAddToList}
              />
            ))}
          </div>
        ) : (
          <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
            {creators.map((creator) => (
              <CreatorListItem
                key={creator.id}
                creator={creator}
                onAddToList={handleAddToList}
              />
            ))}
          </div>
        )
      ) : (
        <EmptyState
          title="No Creators Found"
          description="Try adjusting your search or filters to find creators that match your criteria."
          icon={<FilterIcon size={24} />}
          action={{
            label: 'Reset Filters',
            onClick: () => {
              // Clear all filters by re-fetching entire list
              setIsLoading(true);
              fetch(`${baseUrl}/v1/creators`)
                .then((r) => r.json())
                .then((data) => setCreators(data.creators))
                .catch((e) => console.error(e))
                .finally(() => setIsLoading(false));
            },
          }}
        />
      )}

      {/* Add to List Modal */}
      {showListModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-xl font-bold text-slate-800">
              Add to Creator List
            </h3>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Select List
              </label>
              <select className="input w-full">
                <option value="">Choose a list</option>
                <option value="list1">Summer Campaign Creators</option>
                <option value="list2">Fitness Influencers</option>
                <option value="list3">Tech Reviewers</option>
              </select>
            </div>

            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-sm font-medium text-primary-600">
                  Create New List
                </span>
                <div className="ml-2 flex-1 border-t border-slate-200"></div>
              </div>

              <div className="mt-3 flex">
                <input
                  type="text"
                  placeholder="New list name"
                  className="input flex-1 rounded-r-none"
                />
                <button className="flex items-center rounded-l-none rounded-r-lg border border-l-0 border-primary-500 bg-primary-500 px-4 py-2 text-white hover:bg-primary-600">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                className="btn btn-outline"
                onClick={() => setShowListModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowListModal(false);
                  setSelectedCreator(null);
                }}
              >
                Add to List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorDiscovery;
