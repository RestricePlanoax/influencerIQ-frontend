// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  FileText,
  Target,
  Clock,
  Play,
  ArrowRight,
  Plus,
  Search,
  MessageSquare,
  Bell,
  Sparkles,
  BarChart2,
  Star,
  Zap,
} from 'lucide-react';
import QuickActions from '../components/dashboard/QuickActions';

import KpiCardsSection from '../components/dashboard/KpiCardsSection';
import CampaignOverviewCard from '../components/dashboard/CampaignOverviewCard';
import NotificationItem from '../components/dashboard/NotificationItem';
import { mockNotifications } from '../mockData';
const baseUrl = "https://influencer-iq-backend.vercel.app"|| "";

interface CampaignsOverview {
  active: number;
  draft: number;
  awaiting: number;
}

interface OverviewResponse {
  overview: CampaignsOverview;
}

interface AiInsight {
  key: 'performance' | 'creator' | 'recommendations';
  title: string;
  points: string[];
}

interface AiInsightsResponse {
  insights: AiInsight[];
}

const Dashboard: React.FC = () => {
  // Notifications state
  const [notifications, setNotifications] = useState( [...mockNotifications].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ));
  const [timeframe, setTimeframe] = useState('30d');

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev
        .map(n => (n.id === id ? { ...n, read: true } : n))
        .sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    );
    
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'submission':
        return <FileText size={16} className="text-blue-500" />;
      case 'payment':
        return <DollarSign size={16} className="text-green-500" />;
      case 'approval':
        return <Target size={16} className="text-purple-500" />;
      case 'message':
        return <MessageSquare size={16} className="text-orange-500" />;
      default:
        return <Bell size={16} className="text-slate-500" />;
    }
  };

  // Campaign Overview state
  const [campaignOverview, setCampaignOverview] = useState<CampaignsOverview | null>(null);
  const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(true);
  const [campaignsError, setCampaignsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaignOverview = async () => {
      setIsLoadingCampaigns(true);
      setCampaignsError(null);

      try {
        const res = await fetch(`${baseUrl}/v1/campaigns/overview`);
        if (!res.ok) {
          throw new Error(`Failed to fetch campaigns overview: ${res.statusText}`);
        }
        const data: OverviewResponse = await res.json();
        setCampaignOverview(data.overview);
      } catch (err: any) {
        console.error(err);
        setCampaignsError(err.message || 'Unknown error');
      } finally {
        setIsLoadingCampaigns(false);
      }
    };

    fetchCampaignOverview();
  }, []);

  // AI Insights state
  const [aiInsights, setAiInsights] = useState<AiInsight[]>([]);
  const [isLoadingAi, setIsLoadingAi] = useState(true);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAiInsights = async () => {
      setIsLoadingAi(true);
      setAiError(null);

      try {
        const res = await fetch(`${baseUrl}/v1/ai-insights`);
        if (!res.ok) {
          throw new Error(`Failed to fetch AI insights: ${res.statusText}`);
        }
        const data: AiInsightsResponse = await res.json();
        setAiInsights(data.insights);
      } catch (err: any) {
        console.error(err);
        setAiError(err.message || 'Unknown error');
      } finally {
        setIsLoadingAi(false);
      }
    };

    fetchAiInsights();
  }, []);

  // Pick icon for each AI insight card
  const getAiIcon = (key: AiInsight['key']) => {
    switch (key) {
      case 'performance':
        return <BarChart2 size={20} className="text-primary-600" />;
      case 'creator':
        return <Star size={20} className="text-primary-600" />;
      case 'recommendations':
        return <Zap size={20} className="text-primary-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-slate-800">
            Welcome back!
          </h1>
          <p className="text-slate-500">
            Here’s what’s happening with your campaigns today.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            className="input w-36"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="30d">Last 30 Days</option>
            <option value="mtd">Month to Date</option>
            <option value="qtd">Quarter to Date</option>
          </select>
        </div>
      </div>

      {/* ► KPI Cards (dynamic) */}
      <KpiCardsSection />

      {/* ► Campaign Overview (dynamic) */}
      <div>
        <h2 className="mb-6 text-xl font-semibold text-slate-800">
          Campaign Overview
        </h2>

        {campaignsError && (
          <p className="mb-4 text-red-500">Error: {campaignsError}</p>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoadingCampaigns
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-32 rounded-2xl bg-gray-200 p-6 animate-pulse"
                />
              ))
            : (
              <>
                <CampaignOverviewCard
                  title="Active Campaigns"
                  count={campaignOverview?.active ?? 0}
                  icon={<Play size={18} className="text-white" />}
                  color="bg-green-500 text-white"
                  link="/campaigns?status=active"
                />
                <CampaignOverviewCard
                  title="Draft Campaigns"
                  count={campaignOverview?.draft ?? 0}
                  icon={<FileText size={18} className="text-white" />}
                  color="bg-blue-500 text-white"
                  link="/campaigns?status=draft"
                />
                <CampaignOverviewCard
                  title="Awaiting Approval"
                  count={campaignOverview?.awaiting ?? 0}
                  icon={<Clock size={18} className="text-white" />}
                  color="bg-yellow-500 text-white"
                  link="/campaigns?status=awaiting"
                />
                <div className="rounded-2xl bg-primary-50 p-6 flex items-center justify-center">
                  <p className="text-primary-800 font-medium">
                    Total:{' '}
                    {(
                      (campaignOverview?.active ?? 0) +
                      (campaignOverview?.draft ?? 0) +
                      (campaignOverview?.awaiting ?? 0)
                    )}
                  </p>
                </div>
              </>
            )}
        </div>
      </div>

      {/* ► AI Insights (dynamic) */}
      <div>
        <h2 className="mb-6 text-xl font-semibold text-slate-800">
          AI Insights
        </h2>

        {aiError && <p className="mb-4 text-red-500">Error: {aiError}</p>}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {isLoadingAi
            ? Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-44 rounded-xl bg-gray-200 p-6 animate-pulse"
                />
              ))
            : (aiInsights ?? []).map((insight) => (
                <div
                  key={insight.key}
                  className="rounded-xl border border-primary-100 bg-primary-50 p-6"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                        {getAiIcon(insight.key)}
                      </div>
                      <h3 className="font-semibold text-primary-900">
                        {insight.title}
                      </h3>
                    </div>
                    <Sparkles size={20} className="text-primary-500" />
                  </div>
                  <div className="space-y-3 text-primary-700">
                    <ul className="list-inside list-disc space-y-2">
                      {(insight.points ?? []).map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* ► Quick Actions */}
      {/* <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            to="/campaigns/new"
            className="flex items-center rounded-lg border border-primary-100 bg-primary-50 p-4 transition-colors hover:bg-primary-100"
          >
            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
              <Plus size={20} className="text-primary-600" />
            </div>
            <div>
              <h4 className="font-medium text-primary-900">Start Campaign</h4>
              <p className="text-sm text-primary-700">Create a new campaign</p>
            </div>
          </Link>

          <Link
            to="/creators"
            className="flex items-center rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:bg-slate-50"
          >
            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
              <Search size={20} className="text-slate-600" />
            </div>
            <div>
              <h4 className="font-medium text-slate-800">Find Creators</h4>
              <p className="text-sm text-slate-600">Discover new talent</p>
            </div>
          </Link>

          <Link
            to="/outreach"
            className="flex items-center rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:bg-slate-50"
          >
            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
              <MessageSquare size={20} className="text-slate-600" />
            </div>
            <div>
              <h4 className="font-medium text-slate-800">Messages</h4>
              <p className="text-sm text-slate-600">Check your inbox</p>
            </div>
          </Link>
        </div>
      </div> */}
      <QuickActions />

      {/* ► Recent Activity / Notifications */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">
            Recent Activity
          </h2>
          <div className="flex items-center space-x-4">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Mark all as read
              </button>
            )}
            <Link
              to="/notifications"
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <Bell size={40} className="mb-3 text-slate-300" />
              <p className="text-center text-slate-500">
                No new notifications
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
