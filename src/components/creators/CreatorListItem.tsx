import React from 'react';
import { Heart, Instagram, Youtube, Twitter } from 'lucide-react';
import { Creator } from '../../types';
import Badge from '../common/Badge';

interface CreatorListItemProps {
  creator: Creator;
  onAddToList: (creatorId: string) => void;
}

const CreatorListItem: React.FC<CreatorListItemProps> = ({ creator, onAddToList }) => {
  const getPlatformIcon = () => {
    switch (creator.platform) {
      case 'Instagram':
        return <Instagram size={18} className="text-pink-500" />;
      case 'YouTube':
        return <Youtube size={18} className="text-red-500" />;
      case 'TikTok':
        return (
          <svg 
            width="18" 
            height="18" 
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
        return <Twitter size={18} className="text-blue-400" />;
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
    <div className="flex items-center justify-between p-4 hover:bg-slate-50">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
          <img 
            src={creator.profilePic} 
            alt={creator.name} 
            className="h-full w-full object-cover"
          />
        </div>
        
        <div>
          <div className="flex items-center">
            <h3 className="font-medium text-slate-800">{creator.name}</h3>
            <div className="ml-2 flex items-center text-sm text-slate-500">
              {getPlatformIcon()}
              <span className="ml-1">{creator.handle}</span>
            </div>
          </div>
          
          <div className="mt-1 flex items-center space-x-4 text-sm text-slate-600">
            <span>{formatNumber(creator.audienceSize)} followers</span>
            <span>{(creator.engagement.avgLikes / creator.audienceSize * 100).toFixed(1)}% engagement</span>
            <Badge 
              variant={creator.isAuthentic ? 'success' : 'warning'} 
              label={creator.isAuthentic ? 'Authentic' : 'Review'} 
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button className="btn btn-outline flex items-center">
          <Heart size={16} className="mr-1" />
          Save
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => onAddToList(creator.id)}
        >
          Add to List
        </button>
      </div>
    </div>
  );
};

export default CreatorListItem;