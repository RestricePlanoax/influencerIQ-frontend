import React from 'react';
import { LayoutDashboard, Users, FileText, ScrollText, MessageSquare } from 'lucide-react';

type TabType = 'overview' | 'creators' | 'content' | 'contracts' | 'negotiation';

interface CampaignTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const CampaignTabs: React.FC<CampaignTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'creators', label: 'Creators', icon: <Users size={18} /> },
    { id: 'content', label: 'Content', icon: <FileText size={18} /> },
    { id: 'negotiation', label: 'Negotiation', icon: <MessageSquare size={18} /> },
    { id: 'contracts', label: 'Contracts', icon: <ScrollText size={18} /> },
  ];

  return (
    <div className="border-b border-slate-200">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center whitespace-nowrap px-4 py-3 text-sm font-medium ${
              activeTab === tab.id
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => onTabChange(tab.id as TabType)}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CampaignTabs;