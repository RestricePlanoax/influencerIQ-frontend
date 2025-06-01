import React from 'react';
import { ReactNode } from 'react';
import { ExternalLink, Check } from 'lucide-react';
import { Integration } from '../../types';
import { format } from 'date-fns';

interface IntegrationCardProps {
  integration: Integration;
  icon: ReactNode;
  onConfigure: (integrationId: string) => void;
  onToggle: (integrationId: string, newStatus: boolean) => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ 
  integration, 
  icon, 
  onConfigure, 
  onToggle 
}) => {
  const isConnected = integration.status === 'connected';
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
            {icon}
          </div>
          <div>
            <h3 className="font-medium text-slate-800">{integration.name}</h3>
            <p className="text-xs text-slate-500">{integration.type.charAt(0).toUpperCase() + integration.type.slice(1)} Integration</p>
          </div>
        </div>
        
        <label className="relative inline-flex cursor-pointer items-center">
          <input 
            type="checkbox" 
            className="peer sr-only" 
            checked={isConnected}
            onChange={() => onToggle(integration.id, !isConnected)}
          />
          <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
        </label>
      </div>
      
      <div className="mb-4 space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Status:</span>
          <span className={`font-medium ${isConnected ? 'text-green-600' : 'text-slate-500'}`}>
            {isConnected ? (
              <span className="flex items-center">
                <Check size={14} className="mr-1" />
                Connected
              </span>
            ) : 'Disconnected'}
          </span>
        </div>
        
        {isConnected && integration.lastSync && (
          <div className="flex justify-between">
            <span className="text-slate-500">Last Sync:</span>
            <span className="text-slate-700">{formatDate(integration.lastSync)}</span>
          </div>
        )}
      </div>
      
      <button 
        className="btn btn-outline w-full"
        onClick={() => onConfigure(integration.id)}
      >
        {isConnected ? 'Configure' : 'Connect'}
      </button>
    </div>
  );
};

export default IntegrationCard;