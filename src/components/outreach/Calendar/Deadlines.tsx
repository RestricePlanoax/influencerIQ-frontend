import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface DeadlinesProps {
  deadlines: Array<{
    id: string;
    title: string;
    dueDate: string;
    type: 'deadline' | 'campaign';
    description?: string;
  }>;
}

const Deadlines: React.FC<DeadlinesProps> = ({ deadlines }) => {
  const sortedDeadlines = [...deadlines].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedDeadlines.map(deadline => (
        <div
          key={deadline.id}
          className="flex items-start rounded-lg border border-slate-200 bg-white p-4"
        >
          <div className="mr-4 mt-1">
            <div className={`rounded-full p-2 ${
              deadline.type === 'deadline'
                ? 'bg-red-100 text-red-500'
                : 'bg-green-100 text-green-500'
            }`}>
              <Clock size={20} />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="mb-1 flex items-center">
              <h3 className="mr-2 font-medium text-slate-800">{deadline.title}</h3>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                deadline.type === 'deadline'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {deadline.type}
              </span>
            </div>
            
            {deadline.description && (
              <p className="text-sm text-slate-500">{deadline.description}</p>
            )}
            
            <div className="mt-2 flex items-center text-sm text-slate-500">
              <Calendar size={14} className="mr-1" />
              Due: {format(new Date(deadline.dueDate), 'MMM d, yyyy HH:mm')}
            </div>
          </div>
        </div>
      ))}

      {deadlines.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center">
          <Clock size={24} className="mx-auto mb-3 text-slate-400" />
          <h3 className="mb-1 text-lg font-medium text-slate-800">No Active Deadlines</h3>
          <p className="text-slate-500">
            You're all caught up! No pending deadlines at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default Deadlines;