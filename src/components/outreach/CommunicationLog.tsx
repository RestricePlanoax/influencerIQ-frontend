import React from 'react';
import { format } from 'date-fns';
import { Mail, MessageSquare, Eye, Check } from 'lucide-react';
import { CommunicationLog } from '../../types';
import Badge from '../common/Badge';

interface CommunicationLogProps {
  logs: CommunicationLog[];
}

const CommunicationLogComponent: React.FC<CommunicationLogProps> = ({ logs }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge variant="info" label="Sent" />;
      case 'opened':
        return <Badge variant="success" label="Opened" />;
      case 'clicked':
        return <Badge variant="warning" label="Clicked" />;
      default:
        return null;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail size={16} className="text-blue-500" />;
      case 'message':
        return <MessageSquare size={16} className="text-green-500" />;
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800">Communication History</h3>
      
      {logs.length > 0 ? (
        <div className="space-y-4">
          {logs.map(log => (
            <div 
              key={log.id} 
              className="rounded-lg border border-slate-200 p-4 hover:border-primary-200 hover:bg-slate-50"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  {getTypeIcon(log.type)}
                  <span className="ml-2 font-medium text-slate-800">{log.subject}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(log.status)}
                  <span className="text-xs text-slate-500">{formatDate(log.date)}</span>
                </div>
              </div>
              
              <p className="mb-3 text-sm text-slate-700">
                {log.content.length > 150 
                  ? `${log.content.substring(0, 150)}...` 
                  : log.content
                }
              </p>
              
              <div className="flex justify-end space-x-2">
                <button className="flex items-center text-xs font-medium text-primary-600 hover:text-primary-700">
                  <Eye size={14} className="mr-1" />
                  View Full Message
                </button>
                {log.status === 'sent' && (
                  <button className="flex items-center text-xs font-medium text-primary-600 hover:text-primary-700">
                    <Check size={14} className="mr-1" />
                    Mark as Opened
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 mx-auto">
            <Mail size={24} className="text-slate-400" />
          </div>
          <h4 className="mb-1 text-lg font-medium text-slate-800">No Communication History</h4>
          <p className="text-slate-500">
            Start a conversation with this creator to build your relationship.
          </p>
        </div>
      )}
    </div>
  );
};

export default CommunicationLogComponent;