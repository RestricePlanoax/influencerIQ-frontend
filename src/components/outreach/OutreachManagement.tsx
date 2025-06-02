import React, { useState } from 'react';
import { Plus, Filter, Send, Calendar, Users, BarChart2, Sparkles, CheckCircle, X } from 'lucide-react';
import { mockCreators, mockCampaigns, mockEmailTemplates } from '../../mockData';
import LoadingSpinner from '../common/LoadingSpinner';

const OutreachManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'targeting' | 'bulk' | 'analytics'>('bulk');
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [useAI, setUseAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleGenerateEmail = () => {
    setIsLoading(true);
    // Simulate AI email generation
    setTimeout(() => {
      setEmailContent(`Hi {creator_name},

I hope this email finds you well! I'm reaching out because we're looking for amazing creators like you to be part of our upcoming campaign.

Our {campaign_name} campaign aims to showcase authentic voices in the community, and your content perfectly aligns with our vision.

Key campaign details:
- Timeline: 4 weeks
- Deliverables: 2 posts, 3 stories
- Compensation: Based on your reach and engagement

Would you be interested in learning more about this opportunity?

Best regards,
{sender_name}`);
      setIsLoading(false);
    }, 1500);
  };

  const handleSendEmails = () => {
    setIsLoading(true);
    // Simulate sending emails
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
    }, 2000);
  };

  const handleDismissSuccess = () => {
    setShowSuccess(false);
    setSelectedCreators([]);
    setEmailContent('');
    setSelectedTemplate('');
    setAiPrompt('');
  };

  if (showSuccess) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-slate-800">Emails Sent Successfully!</h2>
          <p className="mb-6 text-slate-600">
            Your message has been sent to {selectedCreators.length} creators.
            <br />
            You'll be notified when they respond.
          </p>
          <div className="space-y-3">
            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="mb-2 text-sm font-medium text-slate-700">Campaign</h3>
              <p className="text-slate-600">
                {mockCampaigns.find(c => c.id === selectedCampaign)?.name}
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="mb-2 text-sm font-medium text-slate-700">Recipients</h3>
              <p className="text-slate-600">
                {selectedCreators.length} creators selected
              </p>
            </div>
          </div>
          <div className="mt-6 space-x-3">
            <button 
              className="btn btn-outline"
              onClick={handleDismissSuccess}
            >
              Send Another
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.href = '/outreach'}
            >
              View Inbox
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Bulk Messaging</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {/* Campaign Selection */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Campaign</label>
            <select 
              className="input"
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
            >
              <option value="">Select Campaign</option>
              {mockCampaigns.map(campaign => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </option>
              ))}
            </select>
          </div>

          {/* Email Content */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">Email Content</label>
              <div className="flex items-center space-x-4">
                <button
                  className={`text-sm font-medium ${
                    !selectedTemplate ? 'text-primary-600' : 'text-slate-500'
                  }`}
                  onClick={() => setSelectedTemplate('')}
                >
                  Write Manually
                </button>
                <button
                  className={`text-sm font-medium ${
                    selectedTemplate ? 'text-primary-600' : 'text-slate-500'
                  }`}
                  onClick={() => setSelectedTemplate(mockEmailTemplates[0].id)}
                >
                  Use Template
                </button>
              </div>
            </div>

            {selectedTemplate ? (
              <div>
                <select
                  className="input mb-4"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                >
                  <option value="">Select Template</option>
                  {mockEmailTemplates.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
                <textarea
                  className="input min-h-[200px]"
                  value={mockEmailTemplates.find(t => t.id === selectedTemplate)?.body || ''}
                  onChange={(e) => setEmailContent(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <div className="mb-4 rounded-lg bg-primary-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <Sparkles size={16} className="mr-2 text-primary-500" />
                      <h4 className="text-sm font-medium text-primary-900">AI Writing Assistant</h4>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={useAI}
                        onChange={(e) => setUseAI(e.target.checked)}
                      />
                      <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                    </label>
                  </div>
                  {useAI && (
                    <div className="space-y-3">
                      <textarea
                        className="input min-h-[100px] w-full"
                        placeholder="Describe the type of outreach email you want to create..."
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                      />
                      <button 
                        className="btn btn-primary w-full"
                        onClick={handleGenerateEmail}
                        disabled={!aiPrompt.trim()}
                      >
                        Generate Email
                      </button>
                    </div>
                  )}
                </div>
                <textarea
                  className="input min-h-[200px]"
                  placeholder="Write your email content here..."
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Creator Selection */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-700">Select Recipients</h3>
            <span className="text-sm text-slate-500">
              {selectedCreators.length} creators selected
            </span>
          </div>

          <div className="rounded-lg border border-slate-200">
            <div className="border-b border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <button 
                  className="text-sm font-medium text-primary-600"
                  onClick={() => setSelectedCreators(mockCreators.map(c => c.id))}
                >
                  Select All
                </button>
                <span className="text-sm text-slate-500">{mockCreators.length} creators found</span>
              </div>
            </div>
            <div className="divide-y divide-slate-200">
              {mockCreators.map(creator => (
                <div key={creator.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-primary-600"
                      checked={selectedCreators.includes(creator.id)}
                      onChange={() => {
                        if (selectedCreators.includes(creator.id)) {
                          setSelectedCreators(selectedCreators.filter(id => id !== creator.id));
                        } else {
                          setSelectedCreators([...selectedCreators, creator.id]);
                        }
                      }}
                    />
                    <div className="ml-3">
                      <div className="font-medium text-slate-800">{creator.name}</div>
                      <div className="text-sm text-slate-500">{creator.handle}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-slate-800">{creator.audienceSize.toLocaleString()} followers</div>
                    <div className="text-sm text-slate-500">{creator.platform}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4">
        <button className="btn btn-outline">
          Schedule for Later
        </button>
        <button 
          className="btn btn-primary flex items-center" 
          onClick={handleSendEmails}
          disabled={!selectedCampaign || selectedCreators.length === 0 || !emailContent.trim()}
        >
          <Send size={16} className="mr-1" />
          Send to {selectedCreators.length} Creators
        </button>
      </div>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-xl">
            <LoadingSpinner size="lg" />
            <p className="mt-2 text-center text-slate-800">
              {useAI ? 'Generating email content...' : 'Sending emails...'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default OutreachManagement;