// src/pages/CreateCampaignPage.tsx

import React from 'react';
import CampaignWizard from '../components/campaigns/CampaignWizard/CampaignWizard';
const baseUrl = import.meta.env.VITE_API_URL || "";

const CreateCampaignPage: React.FC = () => {
  const handleSubmitCampaign = async (campaignData: any) => {
    try {
      const res = await fetch(`${baseUrl}/v1/campaigns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData),
      });
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      window.location.href = `/campaigns/${data.campaign.id}`;
    } catch (err) {
      console.error(err);
      alert('Failed to create campaign. Please check the console for details.');
    }
  };

  return <CampaignWizard onSubmit={handleSubmitCampaign} />;
};

export default CreateCampaignPage;
