import React, { useState } from 'react';
import { Campaign } from '../../../types';
import CampaignHeader from './CampaignHeader';
import CampaignTabs from './CampaignTabs';
import OverviewTab from './OverviewTab';
import CreatorsTab from './CreatorsTab';
import ContentTab from './ContentTab';
import ContractsTab from './ContractsTab';
import NegotiationTab from './NegotiationTab';

interface CampaignDetailProps {
  campaign: Campaign;
  onUpdateCampaign: (updatedCampaign: Campaign) => void;
}

type TabType = 'overview' | 'creators' | 'content' | 'contracts' | 'negotiation';

const CampaignDetail: React.FC<CampaignDetailProps> = ({ campaign, onUpdateCampaign }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab campaign={campaign} />;
      case 'creators':
        return <CreatorsTab campaign={campaign} />;
      case 'content':
        return <ContentTab campaign={campaign} />;
      case 'contracts':
        return <ContractsTab campaign={campaign} />;
      case 'negotiation':
        return <NegotiationTab campaign={campaign} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <CampaignHeader 
        campaign={campaign} 
        onUpdateCampaign={onUpdateCampaign} 
      />
      
      <CampaignTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      <div className="rounded-2xl bg-white p-6 shadow-md">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CampaignDetail;