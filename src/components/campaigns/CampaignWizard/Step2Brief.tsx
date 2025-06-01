// src/components/campaigns/CampaignWizard/Step2Brief.tsx
import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';

interface BriefFields {
  brandGuidelines: string;
  contentRequirements: string;
  callToAction: string;
  keyMessagePoints: string;
  requiredHashtags: string;
  requiredMentions: string;
  draftDeadline: string;
  finalDeadline: string;
}

interface Step2Props {
  data: {
    brief?: Partial<BriefFields>;
  };
  updateData: (payload: { brief: Partial<BriefFields> }) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step2Brief: React.FC<Step2Props> = ({ data, updateData, onNext, onBack }) => {
  // Track whether we're using AI to generate a brief
  const [useAI, setUseAI] = React.useState(true);
  const [aiPrompt, setAiPrompt] = React.useState('');

  // Helper to safely read from data.brief
  const _brandGuidelines = data.brief?.brandGuidelines ?? '';
  const _contentRequirements = data.brief?.contentRequirements ?? '';
  const _requiredHashtags = data.brief?.requiredHashtags ?? '';
  const _requiredMentions = data.brief?.requiredMentions ?? '';
  const _callToAction = data.brief?.callToAction ?? '';
  const _draftDeadline = data.brief?.draftDeadline ?? '';
  const _finalDeadline = data.brief?.finalDeadline ?? '';

  const updateBriefField = <K extends keyof BriefFields>(field: K, value: string) => {
    updateData({
      brief: {
        ...(data.brief ?? {}),
        [field]: value,
      },
    });
  };

  // Simulated “Generate via AI” button (no real network call here)
  const handleGenerateBrief = () => {
    console.log('AI prompt:', aiPrompt);
    // (if needed, you could inject a stubbed response into `updateData({ brief: { ... } })`)
  };

  // Our “Next” should only enable once the user has typed these minimum required fields:
  const isFormValid = () => {
    // Safe‐guard using the “_” prefixed variables
    return (
      _brandGuidelines.trim() !== '' &&
      _contentRequirements.trim() !== '' &&
      _draftDeadline !== '' &&
      _finalDeadline !== ''
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Brief Generation</h2>
        <p className="text-sm text-slate-500">Create AI-powered campaign briefs</p>
      </div>

      {/* ─── AI Toggle & Prompt ─────────────────────────────────────────────── */}
      <div className="rounded-lg bg-primary-50 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <Sparkles size={20} className="mr-2 text-primary-500" />
            <h3 className="text-sm font-medium text-primary-900">
              Campaign Brief Generation
            </h3>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={useAI}
              onChange={(e) => setUseAI(e.target.checked)}
            />
            <div className="
              peer h-6 w-11 rounded-full bg-slate-200 after:absolute 
              after:left-[2px] after:top-[2px] after:h-5 after:w-5 
              after:rounded-full after:border after:border-gray-300 
              after:bg-white after:transition-all after:content-[''] 
              peer-checked:bg-primary-500 peer-checked:after:translate-x-full 
              peer-checked:after:border-white peer-focus:outline-none
            "></div>
            <span className="ml-2 text-sm font-medium text-primary-900">
              Use AI Generation
            </span>
          </label>
        </div>

        {useAI && (
          <div className="space-y-3">
            <textarea
              className="input min-h-[100px] w-full bg-white"
              placeholder="Brief prompt for AI..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
            />
            <button
              className="btn btn-primary w-full"
              onClick={handleGenerateBrief}
              disabled={!aiPrompt.trim()}
            >
              <Sparkles size={16} className="mr-2" />
              Generate Brief
            </button>
          </div>
        )}
      </div>

      {/* ─── Manual Brief Fields ───────────────────────────────────────────────── */}
      <div className="space-y-4">
        {/* Brand Guidelines */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Brand Messaging Guidelines
          </label>
          <textarea
            className="input min-h-[100px]"
            placeholder="Define your brand voice..."
            value={_brandGuidelines}
            onChange={(e) => updateBriefField('brandGuidelines', e.target.value)}
          />
        </div>

        {/* Content Requirements */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Content Requirements
          </label>
          <textarea
            className="input min-h-[100px]"
            placeholder="Specify content format, style..."
            value={_contentRequirements}
            onChange={(e) => updateBriefField('contentRequirements', e.target.value)}
          />
        </div>

        {/* Required Hashtags & Mentions */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Required Hashtags
            </label>
            <input
              type="text"
              className="input"
              placeholder="#brandname"
              value={_requiredHashtags}
              onChange={(e) => updateBriefField('requiredHashtags', e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Required Mentions
            </label>
            <input
              type="text"
              className="input"
              placeholder="@brandname"
              value={_requiredMentions}
              onChange={(e) => updateBriefField('requiredMentions', e.target.value)}
            />
          </div>
        </div>

        {/* Call to Action */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Call to Action
          </label>
          <input
            type="text"
            className="input"
            placeholder="e.g. Visit our website"
            value={_callToAction}
            onChange={(e) => updateBriefField('callToAction', e.target.value)}
          />
        </div>

        {/* Draft & Final Deadlines */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Draft Deadline *
            </label>
            <div className="relative">
              <input
                type="date"
                className="input pl-10"
                value={_draftDeadline}
                onChange={(e) => updateBriefField('draftDeadline', e.target.value)}
              />
              <Calendar
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Final Deadline *
            </label>
            <div className="relative">
              <input
                type="date"
                className="input pl-10"
                min={_draftDeadline}
                value={_finalDeadline}
                onChange={(e) => updateBriefField('finalDeadline', e.target.value)}
              />
              <Calendar
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Navigation Buttons ───────────────────────────────────────────────── */}
      <div className="flex justify-between pt-6">
        <button className="btn btn-outline" onClick={onBack}>
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={onNext}
          disabled={!isFormValid()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2Brief;
