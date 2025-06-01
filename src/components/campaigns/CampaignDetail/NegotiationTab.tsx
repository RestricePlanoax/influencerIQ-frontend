import React, { useState } from 'react';
import { Send, Phone, Settings, Sparkles, X } from 'lucide-react';
import { Campaign } from '../../../types';
import VoiceCallModal from '../../outreach/VoiceCallModal';

interface NegotiationTabProps {
  campaign: Campaign;
}

interface QuickProposal {
  compensation: number;
  timeline: string;
  deliverables: string[];
}

const NegotiationTab: React.FC<NegotiationTabProps> = ({ campaign }) => {
  const [showVoiceCall, setShowVoiceCall] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [proposal, setProposal] = useState<QuickProposal>({
    compensation: 1500,
    timeline: '2 weeks',
    deliverables: ['1 Instagram post', '3 stories']
  });

  // Mock messages for demo
  const messages = [
    {
      id: '1',
      text: "Hi! I'm your AI negotiation assistant. I'll help facilitate the discussion between you and Sarah Johnson. What terms would you like to propose?",
      sender: 'assistant',
      timestamp: '6:09:13 PM'
    }
  ];

  const aiSuggestions = [
    'Consider offering bonus for early delivery',
    'Include usage rights for 6 months',
    'Add performance incentives'
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    // Handle sending message
    setNewMessage('');
  };

  const handleSendProposal = () => {
    // Handle sending proposal
    console.log('Sending proposal:', proposal);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      {/* Creator List */}
      <div className="lg:col-span-1">
        <div className="rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-4">
            <h3 className="text-sm font-medium text-slate-800">Creators</h3>
          </div>
          <div className="divide-y divide-slate-200">
            {campaign.creators.map(creatorId => (
              <div
                key={creatorId}
                className={`cursor-pointer p-4 hover:bg-slate-50 ${
                  selectedCreator === creatorId ? 'bg-slate-50' : ''
                }`}
                onClick={() => setSelectedCreator(creatorId)}
              >
                <div className="flex items-center">
                  <div className="mr-3 h-8 w-8 overflow-hidden rounded-full">
                    <img
                      src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="Creator"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">Sarah Johnson</h4>
                    <span className="text-xs text-slate-500">@sarahjohnson</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-2">
        <div className="flex h-[600px] flex-col rounded-lg border border-slate-200 bg-white">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-slate-200 p-4">
            <div>
              <h2 className="font-medium text-slate-800">Negotiation with Sarah Johnson</h2>
              <span className="text-xs text-slate-500">Campaign #{campaign.id}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowVoiceCall(true)}
                className="btn btn-outline flex items-center px-3 py-1"
              >
                <Phone size={16} className="mr-1" />
                Start Voice Call
              </button>
              <button
                className="rounded p-1 text-slate-500 hover:bg-slate-100"
                onClick={() => {}}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'assistant' && (
                  <div className="mr-2 h-8 w-8 rounded-full bg-primary-100 p-2">
                    <Sparkles size={16} className="text-primary-600" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-primary-500 text-white'
                      : message.sender === 'assistant'
                      ? 'bg-primary-50 text-slate-800'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`mt-1 text-xs ${
                    message.sender === 'user' ? 'text-primary-100' : 'text-slate-500'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="border-t border-slate-200 p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="input flex-1"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white hover:bg-primary-600"
                disabled={!newMessage.trim()}
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Quick Proposal */}
      <div className="lg:col-span-1">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="mb-4 text-lg font-medium text-slate-800">Quick Proposal</h3>
          
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Compensation ($)
              </label>
              <input
                type="number"
                className="input"
                value={proposal.compensation}
                onChange={(e) => setProposal({ ...proposal, compensation: parseInt(e.target.value) })}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Timeline
              </label>
              <input
                type="text"
                className="input"
                value={proposal.timeline}
                onChange={(e) => setProposal({ ...proposal, timeline: e.target.value })}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Deliverables
              </label>
              <textarea
                className="input min-h-[100px]"
                value={proposal.deliverables.join('\n')}
                onChange={(e) => setProposal({ ...proposal, deliverables: e.target.value.split('\n') })}
              />
            </div>

            <button
              className="btn btn-primary w-full"
              onClick={handleSendProposal}
            >
              Send Proposal
            </button>
          </div>

          {/* AI Suggestions */}
          <div className="mt-6">
            <h4 className="mb-2 flex items-center text-sm font-medium text-slate-700">
              <Sparkles size={16} className="mr-2 text-primary-500" />
              AI Suggestions
            </h4>
            <div className="space-y-2">
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-lg bg-primary-50 p-2 text-sm text-primary-700"
                >
                  <span className="mr-2">💡</span>
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Voice Call Modal */}
      {showVoiceCall && (
        <VoiceCallModal
          creator={{ name: 'Sarah Johnson' }}
          onClose={() => setShowVoiceCall(false)}
        />
      )}
    </div>
  );
};

export default NegotiationTab;