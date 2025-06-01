import React, { useState } from 'react';
import { Send, Phone, Settings, Sparkles } from 'lucide-react';
import VoiceCallModal from './VoiceCallModal';

interface ChatInterfaceProps {
  creator: {
    id: string;
    name: string;
    profilePic: string;
    status: string;
    campaign?: string;
  };
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant' | 'creator';
  timestamp: string;
}

interface QuickProposal {
  compensation: number;
  timeline: string;
  deliverables: string[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ creator }) => {
  const [showVoiceCall, setShowVoiceCall] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI negotiation assistant. I'll help facilitate the discussion between you and Sarah Johnson. What terms would you like to propose?",
      sender: 'assistant',
      timestamp: '6:09:13 PM'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [proposal, setProposal] = useState<QuickProposal>({
    compensation: 1500,
    timeline: '2 weeks',
    deliverables: ['1 Instagram post', '3 stories']
  });

  const aiSuggestions = [
    'Consider offering bonus for early delivery',
    'Include usage rights for 6 months',
    'Add performance incentives'
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleSendProposal = () => {
    const message: Message = {
      id: Date.now().toString(),
      text: `Proposal: $${proposal.compensation} for ${proposal.deliverables.join(', ')} within ${proposal.timeline}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, message]);
  };

  return (
    <div className="flex h-full flex-col rounded-lg border border-slate-200 bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-4">
        <div className="flex items-center">
          <div className="relative">
            <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
              <img
                src={creator.profilePic}
                alt={creator.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
              creator.status === 'active' ? 'bg-green-500' : 'bg-slate-400'
            }`}></div>
          </div>
          <div>
            <h3 className="font-medium text-slate-800">{creator.name}</h3>
            <div className="flex items-center">
              <span className={`mr-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                creator.status === 'negotiating' ? 'bg-blue-100 text-blue-700' :
                creator.status === 'active' ? 'bg-green-100 text-green-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {creator.status}
              </span>
              {creator.campaign && (
                <span className="text-xs text-slate-500">
                  Campaign: {creator.campaign}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowVoiceCall(true)}
            className="btn btn-outline flex items-center px-3 py-1"
          >
            <Phone size={16} className="mr-1" />
            Start Voice Call
          </button>
          <button className="rounded p-1 text-slate-500 hover:bg-slate-100">
            <Settings size={20} />
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

      {/* Quick Proposal */}
      <div className="border-t border-slate-200 p-4">
        <h4 className="mb-3 text-sm font-medium text-slate-700">Quick Proposal</h4>
        <div className="mb-4 grid grid-cols-3 gap-3">
          <div>
            <label className="mb-1 block text-xs text-slate-500">
              Compensation ($)
            </label>
            <input
              type="number"
              className="input text-sm"
              value={proposal.compensation}
              onChange={(e) => setProposal({ ...proposal, compensation: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-500">
              Timeline
            </label>
            <input
              type="text"
              className="input text-sm"
              value={proposal.timeline}
              onChange={(e) => setProposal({ ...proposal, timeline: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-500">
              Deliverables
            </label>
            <select
              className="input text-sm"
              value={proposal.deliverables.join(', ')}
              onChange={(e) => setProposal({ ...proposal, deliverables: e.target.value.split(', ') })}
            >
              <option value="1 Instagram post, 3 stories">1 Post + 3 Stories</option>
              <option value="2 Instagram posts, 5 stories">2 Posts + 5 Stories</option>
              <option value="3 Instagram posts, 2 reels">3 Posts + 2 Reels</option>
            </select>
          </div>
        </div>
        <button
          className="btn btn-primary w-full text-sm"
          onClick={handleSendProposal}
        >
          Send Proposal
        </button>

        {/* AI Suggestions */}
        <div className="mt-4">
          <h4 className="mb-2 flex items-center text-xs font-medium text-slate-700">
            <Sparkles size={14} className="mr-1 text-primary-500" />
            AI Suggestions
          </h4>
          <div className="flex flex-wrap gap-2">
            {aiSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="rounded-full bg-primary-50 px-3 py-1 text-xs text-primary-700"
              >
                💡 {suggestion}
              </div>
            ))}
          </div>
        </div>
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

      {/* Voice Call Modal */}
      {showVoiceCall && (
        <VoiceCallModal
          creator={creator}
          onClose={() => setShowVoiceCall(false)}
        />
      )}
    </div>
  );
};

export default ChatInterface;