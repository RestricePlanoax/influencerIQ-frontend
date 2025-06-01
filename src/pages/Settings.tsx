import React, { useState } from 'react';
import { Plus, User, Instagram, Youtube, Twitter, CreditCard, Mail, Sparkles } from 'lucide-react';
import UserTable from '../components/settings/UserTable';
import IntegrationCard from '../components/settings/IntegrationCard';
import { mockUsers, mockIntegrations } from '../mockData';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  
  const handleEditUser = (userId: string) => {
    // Show edit user modal
    console.log('Edit user', userId);
  };
  
  const handleDeleteUser = (userId: string) => {
    // Show delete confirmation
    console.log('Delete user', userId);
  };
  
  const handleConfigureIntegration = (integrationId: string) => {
    setSelectedIntegration(integrationId);
    setShowIntegrationModal(true);
  };
  
  const handleToggleIntegration = (integrationId: string, newStatus: boolean) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSuccessMessage(`Integration ${newStatus ? 'connected' : 'disconnected'} successfully!`);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      
      setIsLoading(false);
    }, 1000);
  };
  
  const getIntegrationIcon = (integration: typeof mockIntegrations[0]) => {
    switch (integration.name) {
      case 'Instagram':
        return <Instagram size={20} className="text-pink-500" />;
      case 'YouTube':
        return <Youtube size={20} className="text-red-500" />;
      case 'TikTok':
        return (
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-black"
          >
            <path 
              d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" 
              fill="currentColor"
            />
          </svg>
        );
      case 'Twitter':
        return <Twitter size={20} className="text-blue-400" />;
      case 'Stripe':
        return <CreditCard size={20} className="text-purple-500" />;
      case 'SendGrid':
        return <Mail size={20} className="text-blue-500" />;
      case 'OpenAI':
        return <Sparkles size={20} className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
      
      {successMessage && (
        <div className="rounded-lg bg-green-100 p-4 text-green-700">
          {successMessage}
        </div>
      )}
      
      <div className="border-b border-slate-200">
        <div className="flex overflow-x-auto">
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'users'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('users')}
          >
            User Management
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'account'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('account')}
          >
            Account Settings
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'integrations'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('integrations')}
          >
            Integrations
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-6 shadow-md">
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold text-slate-800">User Management</h2>
                <button 
                  className="btn btn-primary flex items-center"
                  onClick={() => setShowUserModal(true)}
                >
                  <Plus size={16} className="mr-1" />
                  Add User
                </button>
              </div>
              
              <UserTable 
                users={mockUsers} 
                onEditUser={handleEditUser} 
                onDeleteUser={handleDeleteUser} 
              />
            </div>
          )}
          
          {activeTab === 'account' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-800">Account Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="input"
                    defaultValue="Acme Corporation"
                  />
                </div>
                
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Website
                  </label>
                  <input
                    type="text"
                    className="input"
                    defaultValue="https://acme.com"
                  />
                </div>
                
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    className="input"
                    defaultValue="contact@acme.com"
                  />
                </div>
                
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Company Logo
                  </label>
                  <div className="flex items-center">
                    <div className="mr-4 h-16 w-16 overflow-hidden rounded-lg bg-slate-100">
                      <img 
                        src="https://via.placeholder.com/150" 
                        alt="Company Logo" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button className="btn btn-outline">
                      Upload New Logo
                    </button>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-800">Integrations</h2>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockIntegrations.map(integration => (
                  <IntegrationCard 
                    key={integration.id} 
                    integration={integration} 
                    icon={getIntegrationIcon(integration)}
                    onConfigure={handleConfigureIntegration}
                    onToggle={handleToggleIntegration}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Add User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-xl font-bold text-slate-800">Add New User</h3>
            
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  className="input"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Role
                </label>
                <select className="input">
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Permissions
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="perm-campaigns"
                      className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="perm-campaigns" className="ml-2 text-sm text-slate-700">
                      Create Campaigns
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="perm-creators"
                      className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="perm-creators" className="ml-2 text-sm text-slate-700">
                      Manage Creators
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="perm-outreach"
                      className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="perm-outreach" className="ml-2 text-sm text-slate-700">
                      Manage Outreach
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="perm-finances"
                      className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="perm-finances" className="ml-2 text-sm text-slate-700">
                      View Finances
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="perm-users"
                      className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="perm-users" className="ml-2 text-sm text-slate-700">
                      Manage Users
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="btn btn-outline"
                onClick={() => setShowUserModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary">
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Integration Modal */}
      {showIntegrationModal && selectedIntegration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-xl font-bold text-slate-800">
              Configure Integration
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  API Key
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter API key"
                />
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  API Secret
                </label>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter API secret"
                />
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Webhook URL
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="input flex-1 rounded-r-none"
                    value="https://influenceiq.com/webhooks/123456"
                    readOnly
                  />
                  <button className="rounded-l-none rounded-r-lg border border-l-0 border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                    Copy
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="btn btn-outline"
                onClick={() => setShowIntegrationModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary">
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;