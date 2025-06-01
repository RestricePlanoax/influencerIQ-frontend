import React, { useState } from 'react';
import { Search, Phone, Settings, Sparkles } from 'lucide-react';
import VoiceCallModal from './VoiceCallModal';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'creator' | 'assistant';
  timestamp: string;
}

interface Conversation {
  id: string;
  creatorName: string;
  creatorStatus: string;
  campaign?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

const Inbox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [showVoiceCall, setShowVoiceCall] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [proposal, setProposal] = useState({
    compensation: 1500,
    timeline: '2 weeks',
    deliverables: ['1 Instagram post', '3 stories']
  });

  // Mock conversations data
  const conversations: Conversation[] = [
    {
      id: '1',
      creatorName: 'Sarah Johnson',
      creatorStatus: 'negotiating',
      campaign: 'Summer Fashion Campaign',
      lastMessage: "Thanks for the proposal! I'd like to discuss the terms.",
      timestamp: '2m ago',
      unreadCount: 2
    },
    {
      id: '2',
      creatorName: 'Mike Chen',
      creatorStatus: 'active',
      lastMessage: 'When do you need the content delivered?',
      timestamp: '1h ago',
      unreadCount: 0
    },
    {
      id: '3',
      creatorName: 'Emma Rodriguez',
      creatorStatus: 'active',
      lastMessage: "I accept the terms! Let's move forward.",
      timestamp: '3h ago',
      unreadCount: 1
    },
    {
      id: '4',
      creatorName: 'David Kim',
      creatorStatus: 'pending',
      lastMessage: 'Can we schedule a call to discuss this?',
      timestamp: '1d ago',
      unreadCount: 0
    }
  ];

  // Mock messages for the selected conversation
  const messages: Message[] = [
    {
      id: '1',
      text: "Hi! I'm your AI negotiation assistant. I'll help facilitate the discussion between you and Sarah Johnson. What terms would you like to propose?",
      sender: 'assistant',
      timestamp: '6:09:13 PM'
    },
    {
      id: '2',
      text: 'Hi Sarah! We have an exciting collaboration opportunity for our summer fashion campaign.',
      sender: 'user',
      timestamp: '10:30 AM'
    },
    {
      id: '3',
      text: 'That sounds interesting! Could you tell me more about the requirements?',
      sender: 'creator',
      timestamp: '10:32 AM'
    },
    {
      id: '4',
      text: "We're looking for 3 Instagram posts and 2 Stories featuring our new summer collection. Budget is $2,500.",
      sender: 'user',
      timestamp: '10:35 AM'
    },
    {
      id: '5',
      text: "Thanks for the proposal! I'd like to discuss the terms.",
      sender: 'creator',
      timestamp: '10:40 AM'
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
    setNewMessage('');
  };

  const handleSendProposal = () => {
    // Handle sending proposal
  };

  const selectedCreator = conversations.find(c => c.id === selectedConversation);

  const filteredConversations = conversations.filter(conversation =>
    conversation.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full">
      {/* Conversations List */}
      <div className="w-80 border-r border-slate-200">
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              className="input pl-10"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
        </div>

        <div className="divide-y divide-slate-200">
          {filteredConversations.map(conversation => (
            <div
              key={conversation.id}
              className={`cursor-pointer p-4 hover:bg-slate-50 ${
                selectedConversation === conversation.id ? 'bg-slate-50' : ''
              }`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-800">{conversation.creatorName}</h3>
                  <div className="flex items-center">
                    <span className={`mr-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      conversation.creatorStatus === 'negotiating' ? 'bg-blue-100 text-blue-700' :
                      conversation.creatorStatus === 'active' ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {conversation.creatorStatus}
                    </span>
                    {conversation.campaign && (
                      <span className="text-xs text-slate-500">
                        Campaign: {conversation.campaign}
                      </span>
                    )}
                  </div>
                </div>
                {conversation.unreadCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 line-clamp-1">{conversation.lastMessage}</p>
              <p className="mt-1 text-xs text-slate-400">{conversation.timestamp}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className="flex flex-1 flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-slate-200 p-4">
            <div>
              <h2 className="font-medium text-slate-800">
                Negotiation with {selectedCreator?.creatorName}
              </h2>
              <div className="flex items-center">
                <span className={`mr-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                  selectedCreator?.creatorStatus === 'negotiating'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {selectedCreator?.creatorStatus}
                </span>
                {selectedCreator?.campaign && (
                  <span className="text-xs text-slate-500">
                    Campaign: {selectedCreator.campaign}
                  </span>
                )}
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
              <button className="rounded p-2 text-slate-500 hover:bg-slate-100">
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
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-slate-900">No conversation selected</h3>
            <p className="mt-1 text-sm text-slate-500">Choose a conversation from the list to start chatting</p>
          </div>
        </div>
      )}

      {/* Voice Call Modal */}
      {showVoiceCall && selectedCreator && (
        <VoiceCallModal
          creator={{ name: selectedCreator.creatorName }}
          onClose={() => setShowVoiceCall(false)}
        />
      )}
    </div>
  );
};

export default Inbox;