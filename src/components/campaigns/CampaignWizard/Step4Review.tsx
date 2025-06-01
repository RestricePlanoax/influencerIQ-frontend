import React from 'react';
import { CheckCircle } from 'lucide-react';
import { mockCreators } from '../../../mockData';

interface Step4Props {
  data: {
    name: string;
    budget: string;
    startDate: string;
    endDate: string;
    objectives: string[];
    selectedCreators: string[];
  };
  onSubmit: () => void;
  onBack: () => void;
}

const Step4Review: React.FC<Step4Props> = ({ data, onSubmit, onBack }) => {
  const selectedCreatorDetails = mockCreators.filter(
    creator => data.selectedCreators.includes(creator.id)
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Review & Launch</h2>
        <p className="text-sm text-slate-500">Finalize and launch your campaign</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Campaign Details */}
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="mb-4 text-lg font-medium text-slate-800">Campaign Details</h3>
          
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-slate-500">Name:</span>
              <p className="text-slate-800">{data.name}</p>
            </div>
            
            <div>
              <span className="text-sm font-medium text-slate-500">Budget:</span>
              <p className="text-slate-800">${Number(data.budget).toLocaleString()}</p>
            </div>
            
            <div>
              <span className="text-sm font-medium text-slate-500">Duration:</span>
              <p className="text-slate-800">
                {formatDate(data.startDate)} - {formatDate(data.endDate)}
              </p>
            </div>
            
            <div>
              <span className="text-sm font-medium text-slate-500">Objectives:</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {data.objectives.map(objective => (
                  <span
                    key={objective}
                    className="rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700"
                  >
                    {objective}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Creators */}
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="mb-4 text-lg font-medium text-slate-800">Selected Creators</h3>
          
          {selectedCreatorDetails.length > 0 ? (
            <div className="space-y-4">
              {selectedCreatorDetails.map(creator => (
                <div key={creator.id} className="flex items-center">
                  <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
                    <img
                      src={creator.profilePic}
                      alt={creator.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{creator.name}</p>
                    <p className="text-sm text-slate-500">{creator.handle}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-slate-500">No creators selected</p>
          )}
        </div>
      </div>

      {/* Ready to Launch Message */}
      <div className="rounded-lg bg-green-50 p-4">
        <div className="flex items-center">
          <CheckCircle className="mr-2 text-green-500" size={20} />
          <h3 className="font-medium text-green-800">Ready to Launch</h3>
        </div>
        <p className="mt-1 text-sm text-green-700">
          Your campaign is configured and ready to be created.
        </p>
      
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
          className="btn btn-primary flex items-center"
          onClick={onSubmit}
        >
          <CheckCircle size={16} className="mr-2" />
          Create Campaign
        </button>
      </div>
    </div>
  );
};

export default Step4Review;