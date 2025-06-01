import React from 'react';
import { format } from 'date-fns';
import { Check, Calendar, DollarSign, Users, FileText } from 'lucide-react';
import { mockCreators } from '../../../mockData';

interface ReviewProps {
  data: any;
  onSubmit: () => void;
  onBack: () => void;
}

const Step5Review: React.FC<ReviewProps> = ({ data, onSubmit, onBack }) => {
  const selectedCreators = mockCreators.filter(creator => 
    data.creators.includes(creator.id)
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not set';
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-800">Review Campaign Details</h3>
      
      {/* Campaign Overview */}
      <div className="rounded-lg bg-slate-50 p-4">
        <h4 className="mb-3 flex items-center text-base font-medium text-slate-800">
          <FileText size={18} className="mr-2 text-primary-500" />
          Campaign Overview
        </h4>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-slate-500">Campaign Name:</span>
            <span className="text-sm font-medium text-slate-800">{data.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-slate-500">Objective:</span>
            <span className="text-sm font-medium text-slate-800">
              {data.objective.charAt(0).toUpperCase() + data.objective.slice(1)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-slate-500">Budget:</span>
            <span className="text-sm font-medium text-slate-800">
              ${data.budget.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-slate-500">Timeline:</span>
            <span className="text-sm font-medium text-slate-800">
              {formatDate(data.startDate)} - {formatDate(data.endDate)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Target Audience */}
      <div className="rounded-lg bg-slate-50 p-4">
        <h4 className="mb-3 flex items-center text-base font-medium text-slate-800">
          <Users size={18} className="mr-2 text-primary-500" />
          Target Audience
        </h4>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-slate-500">Location:</span>
            <span className="text-sm font-medium text-slate-800">
              {data.audience.location || 'Global'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-slate-500">Gender:</span>
            <span className="text-sm font-medium text-slate-800">
              {data.audience.gender || 'All Genders'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-slate-500">Age Range:</span>
            <span className="text-sm font-medium text-slate-800">
              {data.audience.ageRange[0]} - {data.audience.ageRange[1]}
            </span>
          </div>
        </div>
      </div>
      
      {/* Selected Creators */}
      <div className="rounded-lg bg-slate-50 p-4">
        <h4 className="mb-3 flex items-center text-base font-medium text-slate-800">
          <Users size={18} className="mr-2 text-primary-500" />
          Selected Creators ({selectedCreators.length})
        </h4>
        
        <div className="max-h-[150px] overflow-y-auto">
          {selectedCreators.map(creator => (
            <div key={creator.id} className="mb-2 flex items-center">
              <div className="mr-2 h-8 w-8 overflow-hidden rounded-full">
                <img 
                  src={creator.profilePic} 
                  alt={creator.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-800">{creator.name}</div>
                <div className="text-xs text-slate-500">{creator.handle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Brief Summary */}
      <div className="rounded-lg bg-slate-50 p-4">
        <h4 className="mb-3 flex items-center text-base font-medium text-slate-800">
          <FileText size={18} className="mr-2 text-primary-500" />
          Campaign Brief
        </h4>
        
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-slate-700">Title:</span>
            <p className="text-sm text-slate-800">{data.brief.title}</p>
          </div>
          
          <div>
            <span className="text-sm font-medium text-slate-700">Deliverables:</span>
            <ul className="ml-5 list-disc text-sm text-slate-800">
              {data.brief.deliverables.map((d: any, i: number) => (
                <li key={i}>
                  {d.quantity} x {d.type}
                </li>
              ))}
            </ul>
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
          className="btn btn-primary flex items-center"
          onClick={onSubmit}
        >
          <Check size={18} className="mr-2" />
          Create Campaign
        </button>
      </div>
    </div>
  );
};

export default Step5Review;