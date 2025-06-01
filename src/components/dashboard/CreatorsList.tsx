// src/components/dashboard/CreatorsList.tsx
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns'; // if you want any date formatting later
import { Creator } from '../../types'; // define the Creator interface in src/types.ts
import { Spinner } from '../common/Spinner'; // a simple loading spinner component (if you have one)

interface CreatorsResponse {
  creators: Creator[];
}

const INSTAGRAM_ICON_URL =
  'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80'; 
// (Use “https://unsplash.com/photos/icon-3XNkyD2aiII” as source; this direct URL is a placeholder.)

const YOUTUBE_ICON_URL =
  'https://cdn.pixabay.com/photo/2022/02/16/16/30/youtube-icon-7000471_1280.png';
// (Original from Pixabay: https://pixabay.com/illustrations/youtube-icon-youtube-youtube-logo-6953530/ )

const CreatorsList: React.FC = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCreators = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch('http://localhost:5000/api/v1/creators');
        if (!res.ok) {
          throw new Error(`Failed to fetch creators: ${res.statusText}`);
        }
        const data: CreatorsResponse = await res.json();
        setCreators(data.creators);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreators();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner /> {/* or any “Loading…” text */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Error loading creators: {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-slate-800">
        Creator Directory
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            {/* Top row: Profile Pic + Basic Info */}
            <div className="flex items-center space-x-4">
              <img
                src={creator.profilePic}
                alt={creator.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-slate-800">
                  {creator.name}
                </h3>
                <p className="text-sm text-slate-500">{creator.handle}</p>
              </div>
              {/* Platform Icon */}
              <img
                src={
                  creator.platform.toLowerCase() === 'instagram'
                    ? INSTAGRAM_ICON_URL
                    : creator.platform.toLowerCase() === 'youtube'
                    ? YOUTUBE_ICON_URL
                    : ''
                }
                alt={`${creator.platform} icon`}
                className="h-8 w-8 object-contain"
              />
            </div>

            {/* Middle row: Audience Size & Engagement */}
            <div className="mt-4 flex items-center justify-between text-sm text-slate-700">
              <div>
                <span className="font-medium">{creator.audienceSize.toLocaleString()}</span>{' '}
                followers
              </div>
              <div>
                <span className="font-medium">{creator.engagement.avgLikes.toLocaleString()}</span>{' '}
                likes
              </div>
            </div>

            {/* Bottom row: Authenticity Score & Past Collabs */}
            <div className="mt-4 space-y-2 text-sm">
              <div>
                <span className="font-medium">
                  Authenticity:
                </span>{' '}
                {(creator.authenticityScore * 100).toFixed(0)}%
              </div>
              <div>
                <span className="font-medium">Past Collabs:</span>{' '}
                {creator.pastCollaborations.slice(0, 3).join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorsList;
