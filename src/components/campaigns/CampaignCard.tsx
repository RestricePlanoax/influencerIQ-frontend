// src/components/campaigns/CampaignCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, DollarSign, Users, MoreVertical, Target } from 'lucide-react';
import { Campaign } from '../../types';
import Badge from '../common/Badge';
import { format } from 'date-fns';

interface CampaignCardProps {
  campaign: Campaign;
  onAction: (action: string, campaignId: number) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onAction }) => {
  // Safely pull values (fallback to 0 or empty array if they’re missing)
  const budgetValue = campaign.budget ?? 0;
  const creatorsList = Array.isArray(campaign.creators) ? campaign.creators : [];
  const objective = campaign.objective ?? '';
  const metricsViews = campaign.metrics?.views ?? 0;
  const metricsEngagement = campaign.metrics?.engagement ?? 0;

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

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="card flex flex-col">
      {/* Header: Status badge + menu button */}
      <div className="mb-4 flex items-center justify-between">
        {getStatusBadge()}
        <button
          className="rounded p-1 text-slate-500 hover:bg-slate-100"
          onClick={() => onAction('menu', campaign.id)}
        >
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Campaign Name */}
      <h3 className="mb-3 text-xl font-semibold text-slate-800">
        {campaign.name}
      </h3>

      {/* Details: Budget, Dates, Creators, Objective */}
      <div className="mb-4 space-y-2 text-sm text-slate-600">
        <div className="flex items-center">
          <DollarSign size={16} className="mr-2 text-slate-400" />
          Budget:&nbsp;${budgetValue.toLocaleString()}
        </div>
        <div className="flex items-center">
          <Calendar size={16} className="mr-2 text-slate-400" />
          {formatDate(campaign.startDate)} – {formatDate(campaign.endDate)}
        </div>
        <div className="flex items-center">
          <Users size={16} className="mr-2 text-slate-400" />
          {creatorsList.length}&nbsp;Creators
        </div>
        <div className="flex items-center">
          <Target size={16} className="mr-2 text-slate-400" />
          <span className="uppercase text-xs font-medium text-slate-500">
            Objective:
          </span>
          &nbsp;
          <Badge
            variant={
              objective === 'awareness'
                ? 'info'
                : objective === 'engagement'
                ? 'success'
                : 'warning'
            }
            label={
              objective.charAt(0).toUpperCase() + objective.slice(1)
            }
          />
        </div>
      </div>

      {/* Metrics */
      /* (If you don’t have conversions/roi in every campaign, you can hide those cards or default to 0.) */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-slate-50 p-2 text-center">
          <div className="text-sm font-medium text-slate-800">
            {metricsViews.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500">Views</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-2 text-center">
          <div className="text-sm font-medium text-slate-800">
            {(metricsEngagement * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-slate-500">Engagement</div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto flex space-x-2">
        <Link
          to={`/campaigns/${campaign.id}`}
          className="btn btn-outline flex-1 text-center"
        >
          View Details
        </Link>
        {campaign.status === 'draft' ? (
          <button
            className="btn btn-primary flex-1"
            onClick={() => onAction('edit', campaign.id)}
          >
            Edit
          </button>
        ) : (
          <button
            className={`btn flex-1 ${
              campaign.status === 'active' ? 'btn-outline' : 'btn-primary'
            }`}
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

export default CampaignCard;
