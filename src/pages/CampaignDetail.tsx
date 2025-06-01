// src/pages/CampaignDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CampaignDetail from '../components/campaigns/CampaignDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';
import { Campaign } from '../types';

const CampaignDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Invalid campaign ID');
      setIsLoading(false);
      return;
    }

    const fetchCampaign = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`http://localhost:5000/api/v1/campaigns/${id}`);
        if (res.status === 404) {
          setError('Campaign not found');
          setIsLoading(false);
          return;
        }
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const data: { campaign: Campaign } = await res.json();
        setCampaign(data.campaign);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleUpdateCampaign = (updatedCampaign: Campaign) => {
    setCampaign(updatedCampaign);
    // In real app, you would `PATCH /api/v1/campaigns/:id` here
  };

  return (
    <div className="space-y-6 p-6">
      <button
        className="flex items-center text-sm font-medium text-slate-600 hover:text-primary-600"
        onClick={() => navigate('/campaigns')}
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Campaigns
      </button>

      {isLoading ? (
        <div className="py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : error ? (
        <ErrorAlert message={error} onClose={() => navigate('/campaigns')} />
      ) : campaign ? (
        <CampaignDetail
          campaign={campaign}
          onUpdateCampaign={handleUpdateCampaign}
        />
      ) : null}
    </div>
  );
};

export default CampaignDetailPage;
