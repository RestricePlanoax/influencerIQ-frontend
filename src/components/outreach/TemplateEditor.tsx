import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

interface TemplateEditorProps {
  template?: {
    id?: string;
    name: string;
    subject: string;
    body: string;
    category: string;
  };
  onClose: () => void;
  onSave: (template: any) => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({
  template,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    subject: template?.subject || '',
    body: template?.body || '',
    category: template?.category || 'outreach'
  });

  const [useAI, setUseAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...template,
      ...formData
    });
  };

  const handleGenerateTemplate = () => {
    // In a real app, this would call an AI service
    console.log('Generating template from prompt:', aiPrompt);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800">
            {template ? 'Edit Template' : 'Create New Template'}
          </h3>
          <button 
            onClick={onClose}
            className="rounded p-1 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* AI Assistant */}
        <div className="mb-6 rounded-lg bg-primary-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center">
              <Sparkles size={20} className="mr-2 text-primary-500" />
              <h4 className="font-medium text-primary-900">AI Template Generation</h4>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={useAI}
                onChange={(e) => setUseAI(e.target.checked)}
              />
              <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
              <span className="ml-2 text-sm font-medium text-primary-900">Use AI Assistant</span>
            </label>
          </div>

          {useAI && (
            <div className="space-y-3">
              <textarea
                className="input min-h-[100px] w-full bg-white"
                placeholder="Describe the type of email template you want to create..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
              <button
                className="btn btn-primary w-full"
                onClick={handleGenerateTemplate}
                disabled={!aiPrompt.trim()}
              >
                <Sparkles size={16} className="mr-2" />
                Generate Template
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Template Name
            </label>
            <input
              type="text"
              className="input"
              placeholder="e.g., Initial Outreach"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Category
            </label>
            <select
              className="input"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="outreach">Initial Outreach</option>
              <option value="follow-up">Follow-up</option>
              <option value="negotiation">Rate Negotiation</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Subject Line
            </label>
            <input
              type="text"
              className="input"
              placeholder="Partnership Opportunity with {{brand_name}}"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email Body
            </label>
            <div className="mb-2 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                onClick={() => setFormData({ ...formData, body: formData.body + '{{creator_name}}' })}
              >
                Creator Name
              </button>
              <button
                type="button"
                className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                onClick={() => setFormData({ ...formData, body: formData.body + '{{brand_name}}' })}
              >
                Brand Name
              </button>
              <button
                type="button"
                className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                onClick={() => setFormData({ ...formData, body: formData.body + '{{campaign_name}}' })}
              >
                Campaign Name
              </button>
            </div>
            <textarea
              className="input min-h-[200px]"
              placeholder="Write your email template..."
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemplateEditor;