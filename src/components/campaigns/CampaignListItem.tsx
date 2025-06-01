// src/components/campaigns/CampaignListItem.tsx

import React from 'react';
import { Calendar, DollarSign, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import { Campaign } from '../../types';

interface CampaignListItemProps {
  campaign: Campaign;
  onAction: (action: string, campaignId: number) => void;
}

const CampaignListItem: React.FC<CampaignListItemProps> = ({ campaign, onAction }) => {
  const getStatusBadge = () => {
    switch (campaign.status) {
      case 'active':
        return <Badge variant="success" label="Active" />;
      case 'draft':
        return <Badge variant="info" label="Draft" />;
      case 'completed':
        return <Badge variant="default" label="Completed" />;
      case 'paused':
        return <Badge variant="warning" label="Paused" />;
      case 'awaiting':
        return <Badge variant="info" label="Awaiting" />;
      default:
        return null;
    }
  };

  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return date;
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 hover:border-primary-200">
      <div className="flex flex-1 items-center space-x-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50">
          <Target className="h-6 w-6 text-primary-500" />
        </div>

        <div className="flex-1">
          <div className="flex items-center">
            <Link
              to={`/campaigns/${campaign.id}`}
              className="text-lg font-medium text-slate-800 hover:text-primary-600"
            >
              {campaign.name}
            </Link>
            <div className="ml-3">{getStatusBadge()}</div>
          </div>

          <div className="mt-1 grid grid-cols-3 gap-4 text-sm text-slate-500">
            <div className="flex items-center">
              <DollarSign size={16} className="mr-1 text-slate-400" />
              ${campaign.budget.toLocaleString()}
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-1 text-slate-400" />
              {formatDate(campaign.startDate)}
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-1 text-slate-400" />
              {campaign.creators.length} Creators
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Link to={`/campaigns/${campaign.id}`} className="btn btn-outline">
          View Details
        </Link>
        {campaign.status === 'draft' ? (
          <button
            className="btn btn-primary"
            onClick={() => onAction('edit', campaign.id)}
          >
            Edit
          </button>
        ) : (
          <button
            className={`btn ${campaign.status === 'active' ? 'btn-outline' : 'btn-primary'}`}
            onClick={() =>
              onAction(
                campaign.status === 'active' ? 'pause' : 'activate',
                campaign.id
              )
            }
          >
            {campaign.status === 'active' ? 'Pause' : 'Activate'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CampaignListItem;
