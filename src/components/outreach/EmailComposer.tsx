import React, { useState } from 'react';
import { X, Send, Clock, Sparkles, Plus } from 'lucide-react';
import { OutreachContact, EmailTemplate } from '../../types';

interface EmailComposerProps {
  contact?: OutreachContact;
  templates: EmailTemplate[];
  onClose: () => void;
  onSend: (data: any) => void;
}

const EmailComposer: React.FC<EmailComposerProps> = ({ 
  contact, 
  templates, 
  onClose, 
  onSend 
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [scheduledDate, setScheduledDate] = useState<string>('');
  const [showSchedule, setShowSchedule] = useState<boolean>(false);
  const [showAiAssist, setShowAiAssist] = useState<boolean>(false);
  const [aiPrompt, setAiPrompt] = useState<string>('');
  
  const handleTemplateChange = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setSubject(template.subject);
      setBody(template.body);
    }
  };
  
  const handleSend = () => {
    onSend({
      recipientId: contact?.id,
      subject,
      body,
      scheduledDate: showSchedule ? scheduledDate : null
    });
  };
  
  const handleAiAssist = () => {
    // In a real app, this would call an AI service
    // For now, just generate some placeholder text
    const aiGeneratedText = `Hi ${contact?.name},\n\nI hope this email finds you well. I've been following your content on ${contact?.platform} and I'm impressed with your work.\n\nI'd like to discuss a potential collaboration opportunity for an upcoming campaign. Our brand values align well with your content, and I believe we could create something amazing together.\n\nWould you be interested in learning more?\n\nBest regards,\nSarah Johnson`;
    
    setBody(aiGeneratedText);
    setShowAiAssist(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800">
            {contact ? `Email to ${contact.name}` : 'New Email'}
          </h3>
          <button 
            onClick={onClose}
            className="rounded p-1 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Recipient */}
          {contact && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                To
              </label>
              <div className="flex items-center rounded-lg border border-slate-300 bg-slate-50 px-3 py-2">
                <span className="text-sm text-slate-800">{contact.name}</span>
                <span className="ml-2 text-sm text-slate-500">&lt;{contact.email}&gt;</span>
              </div>
            </div>
          )}
          
          {/* Template Selector */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Template
            </label>
            <select
              className="input"
              value={selectedTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
            >
              <option value="">Select a template</option>
              {templates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Subject */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Subject
            </label>
            <input
              type="text"
              className="input"
              placeholder="Email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          
          {/* Body */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              className="input min-h-[200px]"
              placeholder="Write your message here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          
          {/* Schedule Option */}
          <div>
            <div className="flex items-center">
              <button
                type="button"
                className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                onClick={() => setShowSchedule(!showSchedule)}
              >
                <Clock size={16} className="mr-1" />
                {showSchedule ? 'Cancel Scheduling' : 'Schedule for Later'}
              </button>
              
              <div className="mx-4 h-4 border-l border-slate-200"></div>
              
              <button
                type="button"
                className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                onClick={() => setShowAiAssist(!showAiAssist)}
              >
                <Sparkles size={16} className="mr-1" />
                {showAiAssist ? 'Hide AI Assist' : 'AI Writing Assist'}
              </button>
            </div>
            
            {showSchedule && (
              <div className="mt-3">
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Schedule Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="input"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
              </div>
            )}
            
            {showAiAssist && (
              <div className="mt-3 rounded-lg bg-primary-50 p-4">
                <div className="mb-2 flex items-center">
                  <Sparkles size={16} className="mr-2 text-primary-500" />
                  <h4 className="text-sm font-medium text-primary-700">AI Writing Assistant</h4>
                </div>
                <textarea
                  className="input mb-3 min-h-[100px] w-full"
                  placeholder="Describe what you want to say (e.g., 'Write a friendly outreach email to a fitness influencer for our summer campaign')"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                ></textarea>
                <button 
                  className="btn btn-primary w-full"
                  onClick={handleAiAssist}
                  disabled={!aiPrompt.trim()}
                >
                  Generate Email
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-3">
          <button 
            className="btn btn-outline"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="btn btn-primary flex items-center"
            onClick={handleSend}
            disabled={!subject.trim() || !body.trim()}
          >
            {showSchedule ? (
              <>
                <Clock size={16} className="mr-2" />
                Schedule
              </>
            ) : (
              <>
                <Send size={16} className="mr-2" />
                Send Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailComposer;