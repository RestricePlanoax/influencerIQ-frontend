import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface BriefData {
  title: string;
  description: string;
  contentGuidelines: string;
  deliverables: {
    type: string;
    quantity: number;
  }[];
}

interface Step4Props {
  brief: BriefData;
  updateBrief: (brief: BriefData) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step4Brief: React.FC<Step4Props> = ({ brief, updateBrief, onNext, onBack }) => {
  const handleDeliverableChange = (index: number, field: 'type' | 'quantity', value: string | number) => {
    const updatedDeliverables = [...brief.deliverables];
    updatedDeliverables[index] = {
      ...updatedDeliverables[index],
      [field]: value
    };
    updateBrief({ ...brief, deliverables: updatedDeliverables });
  };

  const addDeliverable = () => {
    updateBrief({
      ...brief,
      deliverables: [...brief.deliverables, { type: '', quantity: 1 }]
    });
  };

  const removeDeliverable = (index: number) => {
    const updatedDeliverables = brief.deliverables.filter((_, i) => i !== index);
    updateBrief({ ...brief, deliverables: updatedDeliverables });
  };

  const isFormValid = () => {
    return (
      brief.title.trim() !== '' &&
      brief.description.trim() !== '' &&
      brief.deliverables.every(d => d.type.trim() !== '' && d.quantity > 0)
    );
  };

  const deliverableTypes = [
    'Instagram Post',
    'Instagram Story',
    'Instagram Reels',
    'TikTok Video',
    'YouTube Video',
    'YouTube Short',
    'Twitter Post',
    'Blog Post',
    'Facebook Post',
    'LinkedIn Post',
    'Pinterest Pin',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-800">Create Campaign Brief</h3>
      
      {/* Brief Title */}
      <div>
        <label htmlFor="brief-title" className="mb-1 block text-sm font-medium text-slate-700">
          Brief Title
        </label>
        <input
          id="brief-title"
          type="text"
          className="input"
          placeholder="Summer Collection Launch"
          value={brief.title}
          onChange={(e) => updateBrief({ ...brief, title: e.target.value })}
        />
      </div>
      
      {/* Brief Description */}
      <div>
        <label htmlFor="brief-description" className="mb-1 block text-sm font-medium text-slate-700">
          Campaign Description
        </label>
        <textarea
          id="brief-description"
          className="input min-h-[100px]"
          placeholder="Describe the campaign goals, theme, and key messages..."
          value={brief.description}
          onChange={(e) => updateBrief({ ...brief, description: e.target.value })}
        ></textarea>
      </div>
      
      {/* Content Guidelines */}
      <div>
        <label htmlFor="content-guidelines" className="mb-1 block text-sm font-medium text-slate-700">
          Content Guidelines
        </label>
        <textarea
          id="content-guidelines"
          className="input min-h-[100px]"
          placeholder="Specific instructions for creators (dos and don'ts, brand voice, etc.)"
          value={brief.contentGuidelines}
          onChange={(e) => updateBrief({ ...brief, contentGuidelines: e.target.value })}
        ></textarea>
      </div>
      
      {/* Deliverables */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">
            Deliverables
          </label>
          <button
            type="button"
            onClick={addDeliverable}
            className="flex items-center text-xs font-medium text-primary-600 hover:text-primary-700"
          >
            <Plus size={14} className="mr-1" />
            Add Deliverable
          </button>
        </div>
        
        <div className="space-y-3">
          {brief.deliverables.map((deliverable, index) => (
            <div key={index} className="flex items-center space-x-2">
              <select
                className="input flex-1"
                value={deliverable.type}
                onChange={(e) => handleDeliverableChange(index, 'type', e.target.value)}
              >
                <option value="">Select Type</option>
                {deliverableTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              
              <div className="w-24">
                <input
                  type="number"
                  min="1"
                  className="input w-full"
                  placeholder="Qty"
                  value={deliverable.quantity}
                  onChange={(e) => handleDeliverableChange(index, 'quantity', parseInt(e.target.value) || 1)}
                />
              </div>
              
              <button
                type="button"
                onClick={() => removeDeliverable(index)}
                className="rounded p-2 text-slate-400 hover:bg-slate-100 hover:text-red-500"
                disabled={brief.deliverables.length <= 1}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
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
          Next: Review
        </button>
      </div>
    </div>
  );
};

export default Step4Brief;