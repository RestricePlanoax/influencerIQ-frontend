import React from 'react';
import { Campaign } from '../../../types';
import { mockCreators } from '../../../mockData';
import { Instagram, Youtube, Twitter, MessageSquare, FileText } from 'lucide-react';
import Badge from '../../common/Badge';

interface CreatorsTabProps {
  campaign: Campaign;
}

const CreatorsTab: React.FC<CreatorsTabProps> = ({ campaign }) => {
  const campaignCreators = mockCreators.filter(creator => 
    campaign.creators.includes(creator.id)
  );

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return <Instagram size={16} className="text-pink-500" />;
      case 'YouTube':
        return <Youtube size={16} className="text-red-500" />;
      case 'TikTok':
        return (
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-black"
          >
            <path 
              d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" 
              fill="currentColor"
            />
          </svg>
        );
      case 'Twitter':
        return <Twitter size={16} className="text-blue-400" />;
      default:
        return null;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-800">Campaign Creators ({campaignCreators.length})</h3>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {campaignCreators.map(creator => (
          <div key={creator.id} className="rounded-lg border border-slate-200 p-4">
            {/* Creator Header */}
            <div className="mb-3 flex items-center">
              <div className="mr-3 h-12 w-12 overflow-hidden rounded-full">
                <img 
                  src={creator.profilePic} 
                  alt={creator.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-slate-800">{creator.name}</h4>
                <div className="flex items-center text-sm text-slate-500">
                  {getPlatformIcon(creator.platform)}
                  <span className="ml-1">{creator.handle}</span>
                </div>
              </div>
            </div>
            
            {/* Creator Stats */}
            <div className="mb-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-slate-50 p-2 text-center">
                <div className="text-sm font-medium text-slate-800">
                  {formatNumber(creator.audienceSize)}
                </div>
                <div className="text-xs text-slate-500">Followers</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2 text-center">
                <div className="text-sm font-medium text-slate-800">
                  {(creator.engagement.avgLikes / creator.audienceSize * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-slate-500">Engagement</div>
              </div>
            </div>
            
            {/* Creator Deliverables */}
            <div className="mb-3">
              <h5 className="mb-1 text-xs font-medium uppercase text-slate-500">Deliverables</h5>
              <div className="flex flex-wrap gap-1">
                {campaign.brief.deliverables.map((deliverable, index) => (
                  <Badge 
                    key={index} 
                    variant="info" 
                    label={`${deliverable.quantity}x ${deliverable.type}`} 
                  />
                ))}
              </div>
            </div>
            
            {/* Actions */}
            <div className="mt-4 flex space-x-2">
              <button className="btn btn-outline flex-1 flex items-center justify-center">
                <MessageSquare size={16} className="mr-1" />
                Message
              </button>
              <button className="btn btn-outline flex-1 flex items-center justify-center">
                <FileText size={16} className="mr-1" />
                Content
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add Creator Button */}
      <div className="mt-4 flex justify-center">
        <button className="btn btn-primary">
          Add More Creators
        </button>
      </div>
    </div>
  );
};

export default CreatorsTab;