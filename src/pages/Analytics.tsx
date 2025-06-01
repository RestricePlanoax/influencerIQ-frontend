import React, { useState } from 'react';
import { BarChart2, TrendingUp, DollarSign, Eye, Heart, ShoppingCart, Download, Calendar, Filter, Sparkles, Star } from 'lucide-react';
import PerformanceChart from '../components/analytics/PerformanceChart';
import MetricsCard from '../components/analytics/MetricsCard';
import { mockAnalyticsData, mockCampaigns, mockCreators } from '../mockData';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Analytics: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<string>('14d');
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf'>('csv');
  
  const handleCampaignChange = (campaignId: string) => {
    setIsLoading(true);
    setSelectedCampaign(campaignId);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  
  const handleDateRangeChange = (range: string) => {
    setIsLoading(true);
    setDateRange(range);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  
  const handleExport = (format: 'csv' | 'pdf') => {
    setExportFormat(format);
    // In a real app, this would trigger a download
    console.log(`Exporting ${format} for campaign ${selectedCampaign}`);
  };
  
  // Calculate total metrics across all campaigns
  const totalViews = mockCampaigns
    .filter(c => c.metrics)
    .reduce((sum, campaign) => sum + (campaign.metrics?.views || 0), 0);
  
  const avgEngagement = mockCampaigns
    .filter(c => c.metrics)
    .reduce((sum, campaign, _, arr) => sum + (campaign.metrics?.engagement || 0) / arr.length, 0);
  
  const totalConversions = mockCampaigns
    .filter(c => c.metrics)
    .reduce((sum, campaign) => sum + (campaign.metrics?.conversions || 0), 0);
  
  const avgRoi = mockCampaigns
    .filter(c => c.metrics)
    .reduce((sum, campaign, _, arr) => sum + (campaign.metrics?.roi || 0) / arr.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Analytics & Reports</h1>
          <p className="text-slate-500">Track campaign performance and ROI</p>
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-3 md:space-y-0">
          <select 
            className="input w-full md:w-48"
            value={selectedCampaign}
            onChange={(e) => handleCampaignChange(e.target.value)}
          >
            <option value="all">All Campaigns</option>
            {mockCampaigns.map(campaign => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </option>
            ))}
          </select>
          
          <select
            className="input w-full md:w-36"
            value={dateRange}
            onChange={(e) => handleDateRangeChange(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="14d">Last 14 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <div className="flex space-x-2">
            <button 
              className={`btn flex-1 ${exportFormat === 'csv' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleExport('csv')}
            >
              <Download size={16} className="mr-1" />
              CSV
            </button>
            <button 
              className={`btn flex-1 ${exportFormat === 'pdf' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleExport('pdf')}
            >
              <Download size={16} className="mr-1" />
              PDF
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricsCard 
              title="Total Views" 
              value={totalViews} 
              previousValue={totalViews * 0.85}
              icon={<Eye size={20} />}
              trend={17.6}
              formatter={(val) => Number(val).toLocaleString()}
            />
            <MetricsCard 
              title="Engagement Rate" 
              value={avgEngagement} 
              previousValue={avgEngagement * 0.92}
              icon={<Heart size={20} />}
              trend={8.7}
              formatter={(val) => `${(Number(val) * 100).toFixed(1)}%`}
            />
            <MetricsCard 
              title="Conversions" 
              value={totalConversions} 
              previousValue={totalConversions * 0.78}
              icon={<ShoppingCart size={20} />}
              trend={28.2}
              formatter={(val) => Number(val).toLocaleString()}
            />
            <MetricsCard 
              title="ROI" 
              value={avgRoi} 
              previousValue={avgRoi * 0.95}
              icon={<DollarSign size={20} />}
              trend={5.3}
              formatter={(val) => `${Number(val).toFixed(1)}x`}
            />
          </div>
          
          {/* Performance Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <PerformanceChart 
              title="Views Over Time" 
              data={mockAnalyticsData.views} 
              color="rgb(99, 102, 241)"
            />
            <PerformanceChart 
              title="Engagement Rate" 
              data={mockAnalyticsData.engagement} 
              color="rgb(16, 185, 129)"
              valueSuffix="%"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <PerformanceChart 
              title="Conversions" 
              data={mockAnalyticsData.conversions} 
              color="rgb(249, 115, 22)"
            />
            <div className="rounded-lg border border-primary-100 bg-primary-50 p-6">
              <h3 className="mb-4 flex items-center text-lg font-semibold text-primary-800">
                <Sparkles size={20} className="mr-2 text-primary-600" />
                AI-Generated Insights
              </h3>
              
              <div className="space-y-4 text-primary-700">
                <p>
                  Your campaigns are performing 17.6% better than the previous period, with a significant increase in engagement rate.
                </p>
                
                <div>
                  <h4 className="mb-2 font-medium text-primary-800">Key Findings:</h4>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Video content is generating 2.3x higher engagement than static posts</li>
                    <li>Peak posting times: 12pm-2pm weekdays show highest engagement</li>
                    <li>Instagram Reels outperform other content types by 42%</li>
                    <li>User-generated content drives 35% more conversions</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="mb-2 font-medium text-primary-800">Recommendations:</h4>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Increase video content budget allocation by 20%</li>
                    <li>Add performance bonuses for creators achieving &gt;5% CTR</li>
                    <li>Consider adding 2-3 micro-influencers for niche targeting</li>
                    <li>Optimize posting schedule around peak engagement times</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Campaign Breakdown */}
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-800">Campaign Performance Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Campaign</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Engagement</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Conversions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">ROI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {mockCampaigns.filter(c => c.metrics).map(campaign => (
                    <tr key={campaign.id} className="hover:bg-slate-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="font-medium text-slate-800">{campaign.name}</div>
                        <div className="text-sm text-slate-500">{campaign.status}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="font-medium text-slate-800">{campaign.metrics?.views.toLocaleString()}</div>
                        <div className="text-sm text-green-600">↑ 12%</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="font-medium text-slate-800">{(campaign.metrics?.engagement! * 100).toFixed(1)}%</div>
                        <div className="text-sm text-green-600">↑ 5.3%</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="font-medium text-slate-800">{campaign.metrics?.conversions.toLocaleString()}</div>
                        <div className="text-sm text-green-600">↑ 28.2%</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="font-medium text-slate-800">{campaign.metrics?.roi.toFixed(1)}x</div>
                        <div className="text-sm text-green-600">↑ 15.4%</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Performing Creators */}
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center text-lg font-semibold text-slate-800">
                <Star size={20} className="mr-2 text-yellow-500" />
                Top Performing Creators
              </h3>
              <select className="input w-36 text-sm">
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="180d">Last 180 days</option>
              </select>
            </div>

            <div className="divide-y divide-slate-200">
              {mockCreators.slice(0, 4).map((creator, index) => (
                <div key={creator.id} className="flex items-center justify-between py-4">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-lg font-semibold text-primary-700">
                      {creator.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-slate-800">{creator.name}</div>
                      <div className="text-sm text-slate-500">{creator.handle}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <div className="text-sm font-medium text-slate-800">
                        {(creator.engagement.avgLikes / creator.audienceSize * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-slate-500">Engagement Rate</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-slate-800">
                        {(4.8 - index * 0.2).toFixed(1)}/5.0
                      </div>
                      <div className="text-xs text-slate-500">Performance Score</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg bg-primary-50 p-4">
              <h4 className="mb-2 flex items-center text-sm font-medium text-primary-900">
                <Sparkles size={16} className="mr-2 text-primary-600" />
                Creator Performance Insights
              </h4>
              <ul className="space-y-2 text-sm text-primary-700">
                <li>• Emma Rodriguez consistently achieves 156% above average engagement</li>
                <li>• Alex Chen's tech reviews drive 3.2x more conversions</li>
                <li>• Sofia Martinez's content has the highest viewer retention (89%)</li>
                <li>• Consider increasing budget allocation for top performers</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;