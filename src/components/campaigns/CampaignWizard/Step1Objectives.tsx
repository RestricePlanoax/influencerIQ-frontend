import React from 'react';
import { Calendar, DollarSign, Target } from 'lucide-react';

interface Step1Props {
  data: {
    name: string;
    objective: string;
    budget: number;
    startDate: string;
    endDate: string;
  };
  updateData: (data: Partial<Step1Props['data']>) => void;
  onNext: () => void;
}

const Step1Objectives: React.FC<Step1Props> = ({ data, updateData, onNext }) => {
  const objectives = [
    { value: 'awareness', label: 'Brand Awareness', description: 'Increase visibility and reach new audiences' },
    { value: 'engagement', label: 'Engagement', description: 'Drive likes, comments, and interactions' },
    { value: 'sales', label: 'Sales & Conversions', description: 'Generate leads and drive purchases' }
  ];

  const isFormValid = () => {
    return (
      data.name.trim() !== '' &&
      data.objective !== '' &&
      data.budget > 0 &&
      data.startDate !== '' &&
      data.endDate !== ''
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-800">Define Campaign Objectives & Budget</h3>
      
      {/* Campaign Name */}
      <div>
        <label htmlFor="campaign-name" className="mb-1 block text-sm font-medium text-slate-700">
          Campaign Name
        </label>
        <input
          id="campaign-name"
          type="text"
          className="input"
          placeholder="Summer Collection Launch"
          value={data.name}
          onChange={(e) => updateData({ name: e.target.value })}
        />
      </div>
      
      {/* Campaign Objective */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Campaign Objective
        </label>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {objectives.map((objective) => (
            <div
              key={objective.value}
              className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                data.objective === objective.value
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-slate-200 hover:border-primary-200 hover:bg-slate-50'
              }`}
              onClick={() => updateData({ objective: objective.value })}
            >
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <Target size={18} />
              </div>
              <h4 className="mb-1 font-medium text-slate-800">{objective.label}</h4>
              <p className="text-sm text-slate-500">{objective.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Budget */}
      <div>
        <label htmlFor="budget" className="mb-1 block text-sm font-medium text-slate-700">
          Campaign Budget
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <DollarSign size={16} className="text-slate-400" />
          </div>
          <input
            id="budget"
            type="number"
            min="0"
            step="100"
            className="input pl-10"
            placeholder="5000"
            value={data.budget || ''}
            onChange={(e) => updateData({ budget: parseInt(e.target.value) || 0 })}
          />
        </div>
      </div>
      
      {/* Date Range */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="start-date" className="mb-1 block text-sm font-medium text-slate-700">
            Start Date
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Calendar size={16} className="text-slate-400" />
            </div>
            <input
              id="start-date"
              type="date"
              className="input pl-10"
              value={data.startDate}
              onChange={(e) => updateData({ startDate: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label htmlFor="end-date" className="mb-1 block text-sm font-medium text-slate-700">
            End Date
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Calendar size={16} className="text-slate-400" />
            </div>
            <input
              id="end-date"
              type="date"
              className="input pl-10"
              value={data.endDate}
              onChange={(e) => updateData({ endDate: e.target.value })}
              min={data.startDate}
            />
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-end pt-4">
        <button
          className="btn btn-primary"
          onClick={onNext}
          disabled={!isFormValid()}
        >
          Next: Target Audience
        </button>
      </div>
    </div>
  );
};

export default Step1Objectives;