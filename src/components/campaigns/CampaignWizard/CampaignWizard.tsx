// src/components/campaigns/CampaignWizard/CampaignWizard.tsx
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Step1Basics from './Step1Basics';
import Step2Brief from './Step2Brief';
import Step3Creators from './Step3Creators';
import Step4Review from './Step4Review';
import { Campaign } from '../../types';

interface CampaignWizardProps {
  onSubmit: (campaignData: any) => void;
}

const CampaignWizard: React.FC<CampaignWizardProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState<Partial<Campaign>>({
    name: '',
    description: '',
    targetAudience: '',
    budget: '',
    budgetType: '',
    startDate: '',
    endDate: '',
    objectives: [],
    brief: {
      description: '',
      contentGuidelines: '',
      deliverables: [],
    },
    selectedCreators: [],
  });

  const updateCampaignData = (fields: Partial<Campaign>) => {
    setCampaignData((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => setCurrentStep((s) => Math.min(s + 1, 4));
  const handlePrevious = () => setCurrentStep((s) => Math.max(s - 1, 1));
  const handleSubmit = () => onSubmit(campaignData);

  const steps = [
    { number: 1, title: 'Campaign Basics', description: 'Define your campaign goals and timeline', completed: currentStep > 1 },
    { number: 2, title: 'Brief Generation', description: 'Create AI-powered campaign briefs', completed: currentStep > 2 },
    { number: 3, title: 'Creator Discovery', description: 'Find and select matching creators', completed: currentStep > 3 },
    { number: 4, title: 'Review & Launch', description: 'Finalize and launch your campaign', completed: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-8">
        <Link to="/campaigns" className="mb-4 flex items-center text-sm font-medium text-slate-600 hover:text-primary-600">
          <ArrowLeft size={16} className="mr-1" />
          Back to Campaigns
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">Create New Campaign</h1>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-between">
        {steps.map((step, idx) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step.completed
                    ? 'bg-primary-500 text-white'
                    : currentStep === step.number
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {step.completed ? '✓' : step.number}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-800">{step.title}</p>
                <p className="text-xs text-slate-500">{step.description}</p>
              </div>
            </div>
            {idx < steps.length - 1 && <div className="h-[2px] flex-1 bg-slate-200 mx-4" />}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        {currentStep === 1 && (
          <Step1Basics data={campaignData} updateData={updateCampaignData} onNext={handleNext} />
        )}
        {currentStep === 2 && (
          <Step2Brief data={campaignData} updateData={updateCampaignData} onNext={handleNext} onBack={handlePrevious} />
        )}
        {currentStep === 3 && (
          <Step3Creators data={campaignData} updateData={updateCampaignData} onNext={handleNext} onBack={handlePrevious} />
        )}
        {currentStep === 4 && (
          <Step4Review data={campaignData} onSubmit={handleSubmit} onBack={handlePrevious} />
        )}
      </div>
    </div>
  );
};

export default CampaignWizard;
