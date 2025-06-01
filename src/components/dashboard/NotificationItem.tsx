import React from 'react';
import { format } from 'date-fns';
import { FileText, CreditCard, CheckCircle, MessageSquare } from 'lucide-react';
import { Notification } from '../../types';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onMarkAsRead 
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'submission':
        return <FileText size={18} className="text-blue-500" />;
      case 'payment':
        return <CreditCard size={18} className="text-green-500" />;
      case 'approval':
        return <CheckCircle size={18} className="text-purple-500" />;
      case 'message':
        return <MessageSquare size={18} className="text-orange-500" />;
      default:
        return null;
    }
  };

  const formattedDate = format(new Date(notification.createdAt), 'MMM d, h:mm a');

  return (
    <div className={`flex rounded-lg p-3 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}>
      <div className="mr-3 mt-1">{getIcon()}</div>
      <div className="flex-1">
        <p className="text-sm text-slate-800">{notification.message}</p>
        <p className="mt-1 text-xs text-slate-500">{formattedDate}</p>
      </div>
      {!notification.read && (
        <button 
          onClick={() => onMarkAsRead(notification.id)}
          className="ml-2 self-start rounded px-2 py-1 text-xs font-medium text-primary-600 hover:bg-primary-50"
        >
          Mark as read
        </button>
      )}
    </div>
  );
};

export default NotificationItem;