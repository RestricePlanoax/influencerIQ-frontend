import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface CreatorFiltersProps {
  onApplyFilters: (filters: any) => void;
}

const CreatorFilters: React.FC<CreatorFiltersProps> = ({ onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    platforms: [] as string[],
    location: '',
    gender: '',
    ageRange: [16, 45],
    followerRange: [0, 1000000]
  });

  const handlePlatformChange = (platform: string) => {
    const updatedPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter(p => p !== platform)
      : [...filters.platforms, platform];
    
    setFilters({
      ...filters,
      platforms: updatedPlatforms
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleRangeChange = (name: string, index: number, value: number) => {
    if (name === 'ageRange') {
      const newAgeRange = [...filters.ageRange];
      newAgeRange[index] = value;
      setFilters({
        ...filters,
        ageRange: newAgeRange
      });
    } else if (name === 'followerRange') {
      const newFollowerRange = [...filters.followerRange];
      newFollowerRange[index] = value;
      setFilters({
        ...filters,
        followerRange: newFollowerRange
      });
    }
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  const handleResetFilters = () => {
    setFilters({
      platforms: [],
      location: '',
      gender: '',
      ageRange: [16, 45],
      followerRange: [0, 1000000]
    });
  };

  return (
    <div className="mb-6 rounded-2xl bg-white p-4 shadow-md">
      <div 
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Filter size={18} className="mr-2 text-primary-500" />
          <h3 className="text-lg font-medium text-slate-800">Filters</h3>
        </div>
        <button className="text-slate-500">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 space-y-6">
          {/* Platforms */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-slate-700">Platforms</h4>
            <div className="flex flex-wrap gap-2">
              {['Instagram', 'YouTube', 'TikTok', 'Twitter'].map(platform => (
                <label 
                  key={platform} 
                  className={`flex cursor-pointer items-center rounded-full px-3 py-1 text-sm ${
                    filters.platforms.includes(platform) 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={filters.platforms.includes(platform)}
                    onChange={() => handlePlatformChange(platform)}
                  />
                  {platform}
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-slate-700">Location</h4>
            <input
              type="text"
              name="location"
              placeholder="Country or region"
              className="input"
              value={filters.location}
              onChange={handleInputChange}
            />
          </div>

          {/* Gender */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-slate-700">Audience Gender</h4>
            <select
              name="gender"
              className="input"
              value={filters.gender}
              onChange={handleInputChange}
            >
              <option value="">All Genders</option>
              <option value="female">Primarily Female</option>
              <option value="male">Primarily Male</option>
              <option value="balanced">Balanced</option>
            </select>
          </div>

          {/* Age Range */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-slate-700">
              Audience Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}
            </h4>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="13"
                max="65"
                value={filters.ageRange[0]}
                onChange={(e) => handleRangeChange('ageRange', 0, parseInt(e.target.value))}
                className="w-full"
              />
              <input
                type="range"
                min="13"
                max="65"
                value={filters.ageRange[1]}
                onChange={(e) => handleRangeChange('ageRange', 1, parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Follower Range */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-slate-700">
              Follower Count: {filters.followerRange[0].toLocaleString()} - {filters.followerRange[1].toLocaleString()}
            </h4>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="10000000"
                step="10000"
                value={filters.followerRange[0]}
                onChange={(e) => handleRangeChange('followerRange', 0, parseInt(e.target.value))}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="10000000"
                step="10000"
                value={filters.followerRange[1]}
                onChange={(e) => handleRangeChange('followerRange', 1, parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <button 
              className="btn btn-outline flex-1"
              onClick={handleResetFilters}
            >
              Reset
            </button>
            <button 
              className="btn btn-primary flex-1"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorFilters;