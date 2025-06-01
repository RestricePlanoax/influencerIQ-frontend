import React from 'react';
import { Heart, Instagram, Youtube, Twitter } from 'lucide-react';
import { Creator } from '../../types';
import Badge from '../common/Badge';

interface CreatorCardProps {
  creator: Creator;
  onAddToList: (creatorId: string) => void;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator, onAddToList }) => {
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
    <div className="card overflow-hidden">
      {/* Header with profile pic and platform */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3 h-12 w-12 overflow-hidden rounded-full">
            <img 
              src={creator.profilePic} 
              alt={creator.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">{creator.name}</h3>
            <div className="flex items-center text-sm text-slate-500">
              {getPlatformIcon()}
              <span className="ml-1">{creator.handle}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          {getPlatformIcon()}
          <span className="ml-1 font-medium text-slate-700">
            {formatNumber(creator.audienceSize)}
          </span>
        </div>
      </div>

      {/* Authenticity badge */}
      <div className="mt-4">
        {creator.isAuthentic ? (
          <Badge variant="success" label="Authentic Audience" />
        ) : (
          <Badge variant="warning" label="Authenticity Concerns" />
        )}
        <span className="ml-2 text-xs text-slate-500">
          Score: {(creator.authenticityScore * 100).toFixed(0)}%
        </span>
      </div>

      {/* Demographics */}
      <div className="mt-4">
        <h4 className="mb-2 text-xs font-medium uppercase text-slate-500">Demographics</h4>
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant="default" 
            label={`${creator.demographics.ageRange[0]}-${creator.demographics.ageRange[1]}`} 
          />
          <Badge 
            variant="default" 
            label={`${(creator.demographics.gender.female * 100).toFixed(0)}% F / ${(creator.demographics.gender.male * 100).toFixed(0)}% M`} 
          />
          <Badge variant="default" label={creator.demographics.location} />
        </div>
      </div>

      {/* Engagement */}
      <div className="mt-4">
        <h4 className="mb-2 text-xs font-medium uppercase text-slate-500">Engagement</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-slate-50 p-2 text-center">
            <div className="text-sm font-medium text-slate-800">
              {formatNumber(creator.engagement.avgLikes)}
            </div>
            <div className="text-xs text-slate-500">Avg. Likes</div>
          </div>
          <div className="rounded-lg bg-slate-50 p-2 text-center">
            <div className="text-sm font-medium text-slate-800">
              {formatNumber(creator.engagement.avgComments)}
            </div>
            <div className="text-xs text-slate-500">Avg. Comments</div>
          </div>
        </div>
      </div>

      {/* Past Collaborations */}
      {creator.pastCollaborations.length > 0 && (
        <div className="mt-4">
          <h4 className="mb-2 text-xs font-medium uppercase text-slate-500">Past Collaborations</h4>
          <div className="flex flex-wrap gap-1">
            {creator.pastCollaborations.map((brand, index) => (
              <Badge key={index} variant="info" label={brand} />
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-5 flex justify-between">
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

export default CreatorCard;