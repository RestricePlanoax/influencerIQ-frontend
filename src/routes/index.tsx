import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import CreatorDiscovery from '../pages/CreatorDiscovery';
import Campaigns from '../pages/Campaigns';
import CampaignDetail from '../pages/CampaignDetail';
import Outreach from '../pages/Outreach';
import Payments from '../pages/Payments';
import Analytics from '../pages/Analytics';
import Settings from '../pages/Settings';
import NotificationsPage from '../pages/NotificationPage';
import CreateCampaignPage from '../pages/CreateCampaignPage'; // ← import here
import CampaignWizard from '../components/campaigns/CampaignWizard/CampaignWizard';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'creators',
        element: <CreatorDiscovery />
      },
      {
        path: 'campaigns',
        element: <Campaigns />
      },
      {
        path: 'campaigns/new',            // ← add this
        element: <CampaignWizard onSubmit={(data) => {
          // You can POST `data` to your backend here, then navigate back…
          // e.g. fetch('http://localhost:5000/api/v1/campaigns', { method: 'POST', body: JSON.stringify(data) })…
          console.log('Submitting new campaign:', data);
        }} />
      },
      {
        path: 'campaigns/:id',
        element: <CampaignDetail />
      },
      {
        path: 'outreach',
        element: <Outreach />
      },
      {
        path: 'payments',
        element: <Payments />
      },
      {
        path: 'analytics',
        element: <Analytics />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'notifications',         // ← Add this route
        element: <NotificationsPage />
      }
    ]
  }
]);

export default router;