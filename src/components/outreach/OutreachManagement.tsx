import React, { useState } from 'react';
import { Plus, Filter, Send, Calendar, Users, BarChart2 } from 'lucide-react';
import { mockCreators } from '../../mockData';

interface Campaign {
  name: string;
  status: 'active' | 'draft';
  creators: number;
  sent: number;
  responses: number;
  budget: number;
  startDate: string;
}

const OutreachManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'targeting' | 'bulk' | 'analytics'>('campaigns');
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);

  const campaigns: Campaign[] = [
    {
      name: "Summer Fashion Campaign",
      status: "active",
      creators: 12,
      sent: 45,
      responses: 18,
      budget: 15000,
      startDate: "2024-06-01"
    },
    {
      name: "Tech Product Launch",
      status: "draft",
      creators: 8,
      sent: 0,
      responses: 0,
      budget: 8000,
      startDate: "2024-06-15"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Outreach Management</h2>
        <button className="btn btn-primary flex items-center">
          <Plus size={16} className="mr-1" />
          New Campaign
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'campaigns'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('campaigns')}
          >
            Campaigns
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'targeting'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('targeting')}
          >
            Creator Targeting
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'bulk'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('bulk')}
          >
            Bulk Messaging
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'analytics'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          {campaigns.map(campaign => (
            <div key={campaign.name} className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium text-slate-800">{campaign.name}</h3>
                    <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                      campaign.status === 'active' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-slate-500">
                    <div>
                      <span>Creators: </span>
                      <span className="font-medium text-slate-700">{campaign.creators}</span>
                    </div>
                    <div>
                      <span>Sent: </span>
                      <span className="font-medium text-slate-700">{campaign.sent}</span>
                    </div>
                    <div>
                      <span>Responses: </span>
                      <span className="font-medium text-slate-700">{campaign.responses}</span>
                    </div>
                    <div>
                      <span>Budget: </span>
                      <span className="font-medium text-slate-700">${campaign.budget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <button className="btn btn-outline">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'targeting' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center text-lg font-medium text-slate-800">
              <Filter size={20} className="mr-2" />
              Creator Targeting & Filtering
            </h3>
            <div className="text-sm text-slate-500">
              {selectedCreators.length} of {mockCreators.length} creators selected
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Niche</label>
              <input
                type="text"
                className="input"
                placeholder="e.g., Fashion, Tech"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Min Followers</label>
              <input
                type="number"
                className="input"
                placeholder="e.g., 10000"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Max Followers</label>
              <input
                type="number"
                className="input"
                placeholder="e.g., 100000"
              />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white">
            <div className="border-b border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <button className="text-sm font-medium text-primary-600">Select All</button>
                <span className="text-sm text-slate-500">5 creators found</span>
              </div>
            </div>
            <div className="divide-y divide-slate-200">
              {mockCreators.map(creator => (
                <div key={creator.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-primary-600"
                      checked={selectedCreators.includes(creator.id)}
                      onChange={() => {
                        if (selectedCreators.includes(creator.id)) {
                          setSelectedCreators(selectedCreators.filter(id => id !== creator.id));
                        } else {
                          setSelectedCreators([...selectedCreators, creator.id]);
                        }
                      }}
                    />
                    <div className="ml-3">
                      <div className="font-medium text-slate-800">{creator.name}</div>
                      <div className="text-sm text-slate-500">{creator.handle}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-slate-800">{creator.audienceSize.toLocaleString()} followers</div>
                    <div className="text-sm text-slate-500">{creator.platform}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bulk' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center text-lg font-medium text-slate-800">
              <Send size={20} className="mr-2" />
              Bulk Messaging
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Campaign Name</label>
              <input
                type="text"
                className="input"
                placeholder="Enter campaign name..."
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Email Template</label>
              <select className="input">
                <option value="">Choose a template</option>
              </select>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h4 className="mb-4 text-sm font-medium text-slate-700">Selected Creators (0)</h4>
            <div className="text-center text-sm text-slate-500">
              No creators selected. Use the Creator Targeting tab to select creators.
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button className="btn btn-outline">Schedule for Later</button>
            <button className="btn btn-primary flex items-center" disabled>
              <Send size={16} className="mr-1" />
              Send to 0 Creators
            </button>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-slate-500">Total Sent</h4>
                <Send size={20} className="text-blue-500" />
              </div>
              <div className="mt-2 text-2xl font-bold text-slate-800">1,247</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-slate-500">Response Rate</h4>
                <BarChart2 size={20} className="text-green-500" />
              </div>
              <div className="mt-2 text-2xl font-bold text-slate-800">24.3%</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-slate-500">Active Campaigns</h4>
                <Calendar size={20} className="text-purple-500" />
              </div>
              <div className="mt-2 text-2xl font-bold text-slate-800">8</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-slate-500">Conversions</h4>
                <Users size={20} className="text-orange-500" />
              </div>
              <div className="mt-2 text-2xl font-bold text-slate-800">156</div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="mb-4 text-lg font-medium text-slate-800">Campaign Performance</h3>
            <div className="space-y-4">
              {campaigns.map(campaign => (
                <div key={campaign.name} className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <h4 className="font-medium text-slate-800">{campaign.name}</h4>
                    <div className="mt-1 text-sm text-slate-500">
                      {campaign.sent} sent • {campaign.responses} responses
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-medium text-slate-800">
                      {((campaign.responses / campaign.sent) * 100 || 0).toFixed(1)}%
                    </div>
                    <div className="text-sm text-slate-500">Response Rate</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutreachManagement;