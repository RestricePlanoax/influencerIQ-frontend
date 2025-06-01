import React from 'react';
import { format } from 'date-fns';
import { Calendar, DollarSign, Edit, MoreVertical, Pause, Play } from 'lucide-react';
import { Campaign } from '../../../types';
import Badge from '../../common/Badge';

interface CampaignHeaderProps {
  campaign: Campaign;
  onUpdateCampaign: (updatedCampaign: Campaign) => void;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({ campaign, onUpdateCampaign }) => {
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
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  const toggleCampaignStatus = () => {
    const newStatus = campaign.status === 'active' ? 'paused' : 'active';
    onUpdateCampaign({ ...campaign, status: newStatus });
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        {/* Left: Campaign Info */}
        <div>
          <div className="mb-2 flex items-center">
            {getStatusBadge()}
            <h1 className="ml-3 text-2xl font-bold text-slate-800">{campaign.name}</h1>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
            <div className="flex items-center">
              <DollarSign size={16} className="mr-1 text-slate-400" />
              Budget: ${campaign.budget.toLocaleString()}
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-1 text-slate-400" />
              {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
            </div>
          </div>
        </div>
        
        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          {campaign.status !== 'completed' && (
            <>
              <button 
                className="btn btn-outline flex items-center"
                onClick={toggleCampaignStatus}
              >
                {campaign.status === 'active' ? (
                  <>
                    <Pause size={16} className="mr-1" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play size={16} className="mr-1" />
                    Activate
                  </>
                )}
              </button>
              
              <button className="btn btn-outline flex items-center">
                <Edit size={16} className="mr-1" />
                Edit
              </button>
            </>
          )}
          
          <button className="rounded p-2 text-slate-500 hover:bg-slate-100">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignHeader;