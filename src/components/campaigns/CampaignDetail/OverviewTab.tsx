// src/components/campaigns/CampaignDetail/OverviewTab.tsx

import React from 'react';
import { Campaign } from '../../../types';
import { BarChart2, Target, FileText } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface OverviewTabProps {
  campaign: Campaign;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ campaign }) => {
  // In a real app you’d fetch “views over time” and “engagement over time” data.
  // Here we’ll use a small mock for demonstration.
  const mockDates = ['01', '02', '03', '04', '05'];
  const viewsData = {
    labels: mockDates,
    datasets: [
      {
        label: 'Views',
        data: [1000, 2000, 1500, 3000, 2500],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.3,
      },
    ],
  };
  const engagementData = {
    labels: mockDates,
    datasets: [
      {
        label: 'Engagement Rate (%)',
        data: [10, 12, 8, 15, 13], // percentages
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    scales: { y: { beginAtZero: true } },
    maintainAspectRatio: false,
  };

  const { views, engagement, conversions, roi } = campaign.metrics;
  const brief = campaign.brief;

  return (
    <div className="space-y-6">
      {/* Campaign Brief */}
      <div className="rounded-lg border border-slate-200 p-4">
        <h3 className="mb-3 flex items-center text-lg font-semibold text-slate-800">
          <FileText size={20} className="mr-2 text-primary-500" />
          Campaign Brief
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium uppercase text-slate-500">
              Description
            </h4>
            <p className="mt-1 text-slate-700">
              {brief.description}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium uppercase text-slate-500">
              Content Guidelines
            </h4>
            <p className="mt-1 text-slate-700">
              {brief.contentGuidelines || 'None specified.'}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium uppercase text-slate-500">
              Deliverables
            </h4>
            {brief.deliverables.length > 0 ? (
              <ul className="mt-1 list-disc pl-5 text-slate-700">
                {brief.deliverables.map((d, idx) => (
                  <li key={idx}>
                    {d.quantity} × {d.type}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-slate-700">No deliverables listed.</p>
            )}
          </div>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="space-y-6">
        <h3 className="flex items-center text-lg font-semibold text-slate-800">
          <BarChart2 size={20} className="mr-2 text-primary-500" />
          Campaign Performance
        </h3>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="text-sm font-medium text-slate-500">Views</div>
            <div className="mt-1 text-2xl font-bold text-slate-800">
              {views.toLocaleString()}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="text-sm font-medium text-slate-500">
              Engagement Rate
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-800">
              {(engagement * 100).toFixed(1)}%
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="text-sm font-medium text-slate-500">Conversions</div>
            <div className="mt-1 text-2xl font-bold text-slate-800">
              {conversions.toLocaleString()}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="text-sm font-medium text-slate-500">ROI</div>
            <div className="mt-1 text-2xl font-bold text-slate-800">
              {roi.toFixed(1)}×
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <h4 className="mb-4 text-base font-medium text-slate-700">
              Views Over Time
            </h4>
            <div className="h-64">
              <Line data={viewsData} options={chartOptions} />
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h4 className="mb-4 text-base font-medium text-slate-700">
              Engagement Rate
            </h4>
            <div className="h-64">
              <Line data={engagementData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* AI-Generated Insights (optional) */}
      <div className="rounded-lg border border-primary-100 bg-primary-50 p-4">
        <h3 className="mb-3 flex items-center text-lg font-semibold text-primary-800">
          <Target size={20} className="mr-2 text-primary-500" />
          AI-Generated Insights
        </h3>
        <p className="mb-4 text-primary-700">
          {/* You can replace this static text with a real API call */}
          This campaign reached {views.toLocaleString()} views, with an average engagement rate of{' '}
          {(engagement * 100).toFixed(1)}%. Your top performing creator delivered {Math.round(
            views * 0.5
          ).toLocaleString()}{' '}
          views in the first week.
        </p>
        <h4 className="mb-2 text-sm font-medium text-primary-800">Recommendations:</h4>
        <ul className="list-disc pl-5 text-primary-700">
          <li className="mb-1">
            Consider adding 2 micro-influencers with 50K-100K followers to boost niche engagement.
          </li>
          <li className="mb-1">
            Publish posts on weekdays at 12pm-2pm based on engagement data.
          </li>
          <li>
            Increase video content which is showing 2.3x higher engagement than static posts.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OverviewTab;
