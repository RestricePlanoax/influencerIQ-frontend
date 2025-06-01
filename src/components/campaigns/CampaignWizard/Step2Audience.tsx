import React from 'react';
import { MapPin, Users } from 'lucide-react';

interface AudienceData {
  location: string;
  gender: string;
  ageRange: [number, number];
}

interface Step2Props {
  data: AudienceData;
  updateData: (data: AudienceData) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step2Audience: React.FC<Step2Props> = ({ data, updateData, onNext, onBack }) => {
  const handleAgeRangeChange = (index: number, value: number) => {
    const newAgeRange = [...data.ageRange] as [number, number];
    newAgeRange[index] = value;
    updateData({ ...data, ageRange: newAgeRange });
  };

  const isFormValid = () => {
    return true; // All fields are optional in this step
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-800">Define Target Audience</h3>
      
      {/* Location */}
      <div>
        <label htmlFor="location" className="mb-1 block text-sm font-medium text-slate-700">
          Target Location
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MapPin size={16} className="text-slate-400" />
          </div>
          <input
            id="location"
            type="text"
            className="input pl-10"
            placeholder="Country, region, or 'Global'"
            value={data.location}
            onChange={(e) => updateData({ ...data, location: e.target.value })}
          />
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Leave blank for global reach
        </p>
      </div>
      
      {/* Gender */}
      <div>
        <label htmlFor="gender" className="mb-1 block text-sm font-medium text-slate-700">
          Target Gender
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Users size={16} className="text-slate-400" />
          </div>
          <select
            id="gender"
            className="input pl-10"
            value={data.gender}
            onChange={(e) => updateData({ ...data, gender: e.target.value })}
          >
            <option value="">All Genders</option>
            <option value="female">Primarily Female</option>
            <option value="male">Primarily Male</option>
            <option value="balanced">Balanced</option>
          </select>
        </div>
      </div>
      
      {/* Age Range */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Target Age Range: {data.ageRange[0]} - {data.ageRange[1]}
        </label>
        <div className="space-y-4">
          <div>
            <span className="text-xs text-slate-500">Minimum Age</span>
            <input
              type="range"
              min="13"
              max="65"
              value={data.ageRange[0]}
              onChange={(e) => handleAgeRangeChange(0, parseInt(e.target.value))}
              className="mt-1 w-full"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>13</span>
              <span>65</span>
            </div>
          </div>
          
          <div>
            <span className="text-xs text-slate-500">Maximum Age</span>
            <input
              type="range"
              min="13"
              max="65"
              value={data.ageRange[1]}
              onChange={(e) => handleAgeRangeChange(1, parseInt(e.target.value))}
              className="mt-1 w-full"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>13</span>
              <span>65</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button
          className="btn btn-outline"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={onNext}
          disabled={!isFormValid()}
        >
          Next: Select Creators
        </button>
      </div>
    </div>
  );
};

export default Step2Audience;