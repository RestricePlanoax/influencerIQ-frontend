// src/components/campaigns/CampaignWizard/Step1Basics.tsx

import React, { useState, useEffect } from 'react';
import { Campaign } from '../../../types';

interface Step1BasicsProps {
  data: Partial<Campaign>;
  updateData: (fields: Partial<Campaign>) => void;
  onNext: () => void;
}

const Step1Basics: React.FC<Step1BasicsProps> = ({ data, updateData, onNext }) => {
  // Local state for each field
  const [name, setName] = useState(data.name || '');
  const [description, setDescription] = useState(data.description || '');
  const [targetAudience, setTargetAudience] = useState(data.targetAudience || '');
  const [budget, setBudget] = useState(data.budget !== undefined ? String(data.budget) : '');
  const [budgetType, setBudgetType] = useState(data.budgetType || '');
  const [startDate, setStartDate] = useState(data.startDate || '');
  const [endDate, setEndDate] = useState(data.endDate || '');
  const [objectives, setObjectives] = useState<string[]>(data.objectives || []);

  // Controls whether “Next” is enabled
  const [canProceed, setCanProceed] = useState(false);

  // Whenever any local field changes, push up to parent and re-evaluate “Next” eligibility
  useEffect(() => {
    updateData({
      name,
      description,
      targetAudience,
      budget,
      budgetType,
      startDate,
      endDate,
      objectives,
    });

    // All required fields must be non-empty + at least one objective selected:
    const allFilled =
      name.trim() !== '' &&
      description.trim() !== '' &&
      targetAudience.trim() !== '' &&
      budget.trim() !== '' &&
      budgetType.trim() !== '' &&
      startDate.trim() !== '' &&
      endDate.trim() !== '' &&
      objectives.length > 0;

    setCanProceed(allFilled);
  }, [
    name,
    description,
    targetAudience,
    budget,
    budgetType,
    startDate,
    endDate,
    objectives,
    updateData,
  ]);

  // Toggle an objective in the array
  const handleObjectiveToggle = (obj: string) => {
    if (objectives.includes(obj)) {
      setObjectives(objectives.filter((o) => o !== obj));
    } else {
      setObjectives([...objectives, obj]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <h2 className="text-xl font-semibold text-slate-800">Campaign Basics</h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-slate-700">Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full input"
          placeholder="e.g. Spring Sale Campaign"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-slate-700">Description *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full input h-24 resize-none"
          placeholder="Summarize your campaign objective"
        />
      </div>

      {/* Target Audience */}
      <div>
        <label className="block text-sm font-medium text-slate-700">Target Audience *</label>
        <input
          type="text"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          className="mt-1 w-full input"
          placeholder="e.g. Women 25–34, fitness enthusiasts"
        />
      </div>

      {/* Budget & Type */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Budget ($) *</label>
          <input
            type="number"
            min="0"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-1 w-full input"
            placeholder="e.g. 1500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Budget Type *</label>
          <select
            value={budgetType}
            onChange={(e) => setBudgetType(e.target.value)}
            className="mt-1 w-full input"
          >
            <option value="">Select type</option>
            <option value="fixed">Fixed</option>
            <option value="daily">Daily</option>
          </select>
        </div>
      </div>

      {/* Start / End Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Start Date *</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 w-full input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">End Date *</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 w-full input"
          />
        </div>
      </div>

      {/* Objectives (at least one required) */}
      <div>
        <label className="block text-sm font-medium text-slate-700">Objectives *</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {['awareness', 'engagement', 'conversion', 'community-building'].map((obj) => (
            <button
              key={obj}
              type="button"
              onClick={() => handleObjectiveToggle(obj)}
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                objectives.includes(obj)
                  ? 'bg-primary-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {obj.charAt(0).toUpperCase() + obj.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          type="button"
          disabled={!canProceed}
          onClick={onNext}
          className={`btn btn-primary flex items-center ${
            !canProceed ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1Basics;
