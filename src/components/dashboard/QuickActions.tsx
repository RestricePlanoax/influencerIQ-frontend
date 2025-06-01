// src/components/dashboard/QuickActions.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, MessageSquare } from 'lucide-react';

const QuickActions: React.FC = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link
          to="/campaigns/"
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
    </div>
  );
};

export default QuickActions;
