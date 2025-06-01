import React from 'react';
import { Sparkles } from 'lucide-react';
import { mockCreators } from '../../../mockData';

interface Step3Props {
  data: {
    selectedCreators: string[];
  };
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step3Creators: React.FC<Step3Props> = ({ data, updateData, onNext, onBack }) => {
  const toggleCreator = (creatorId: string) => {
    const newSelectedCreators = data.selectedCreators.includes(creatorId)
      ? data.selectedCreators.filter(id => id !== creatorId)
      : [...data.selectedCreators, creatorId];
    updateData({ selectedCreators: newSelectedCreators });
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
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Creator Discovery</h2>
        <p className="text-sm text-slate-500">Find and select matching creators</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-slate-800">AI-Matched Creators</h3>
          <div className="flex items-center rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            <Sparkles size={16} className="mr-1" />
            AI Recommended
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {mockCreators.map(creator => (
            <div
              key={creator.id}
              className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                data.selectedCreators.includes(creator.id)
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-slate-200 hover:border-primary-200 hover:bg-slate-50'
              }`}
              onClick={() => toggleCreator(creator.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
                    <img
                      src={creator.profilePic}
                      alt={creator.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">{creator.name}</h4>
                    <p className="text-sm text-slate-500">{creator.handle}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center space-x-4 text-sm text-slate-600">
                <span>{creator.platform}</span>
                <span>{formatNumber(creator.audienceSize)} followers</span>
                <span>{(creator.engagement.avgLikes / creator.audienceSize * 100).toFixed(1)}% engagement</span>
              </div>

              <div className="mt-2">
                <span className="inline-block rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                  {creator.demographics.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          className="btn btn-outline"
          onClick={onBack}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={onNext}
          disabled={data.selectedCreators.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3Creators;