// src/pages/NotificationsPage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockNotifications } from '../mockData';

export interface Notification {
  id: string;
  type: 
    | 'submission'
    | 'payment'
    | 'approval'
    | 'message'
    | 'signup'
    | 'budget'
    | 'reminder'
    | 'feedback'
    | 'profile'
    | 'status'
    | 'comment';
  message: string;
  read: boolean;
  createdAt: string;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // For now, load from mock data
    // In the future, replace with fetch('/api/v1/notifications')
    setNotifications(
      [...mockNotifications].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );
    setIsLoading(false);
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">All Notifications</h1>
        <Link
          to="/dashboard"
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Back to Dashboard
        </Link>
      </div>

      {isLoading && <p className="text-slate-500">Loading notifications…</p>}

      {!isLoading && notifications.length === 0 && (
        <p className="text-slate-500">No notifications.</p>
      )}

      {!isLoading && notifications.length > 0 && (
        <ul className="space-y-2">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`flex justify-between items-start rounded-lg border p-4 shadow-sm transition ${
                n.read ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <div>
                <p className="text-sm text-slate-800">{n.message}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {new Date(n.createdAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })}
                </p>
              </div>
              {!n.read && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  New
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPage;
