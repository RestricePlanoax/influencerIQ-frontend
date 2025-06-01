import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface ScheduleProps {
  events: Array<{
    id: string;
    title: string;
    date: string;
    type: 'meeting' | 'follow-up' | 'deadline' | 'campaign';
    with?: string;
  }>;
}

const Schedule: React.FC<ScheduleProps> = ({ events }) => {
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-4">
      {sortedEvents.map(event => (
        <div
          key={event.id}
          className="flex items-start rounded-lg border border-slate-200 bg-white p-4"
        >
          <div className="mr-4 mt-1">
            <div className={`rounded-full p-2 ${
              event.type === 'meeting'
                ? 'bg-blue-100 text-blue-500'
                : event.type === 'follow-up'
                ? 'bg-yellow-100 text-yellow-500'
                : event.type === 'deadline'
                ? 'bg-red-100 text-red-500'
                : 'bg-green-100 text-green-500'
            }`}>
              <Calendar size={20} />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="mb-1 flex items-center">
              <h3 className="mr-2 font-medium text-slate-800">{event.title}</h3>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                event.type === 'meeting'
                  ? 'bg-blue-100 text-blue-700'
                  : event.type === 'follow-up'
                  ? 'bg-yellow-100 text-yellow-700'
                  : event.type === 'deadline'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {event.type}
              </span>
            </div>
            
            {event.with && (
              <p className="text-sm text-slate-500">With: {event.with}</p>
            )}
            
            <div className="mt-2 flex items-center text-sm text-slate-500">
              <Clock size={14} className="mr-1" />
              {format(new Date(event.date), 'MMM d, yyyy HH:mm')}
            </div>
          </div>
        </div>
      ))}

      {events.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center">
          <Calendar size={24} className="mx-auto mb-3 text-slate-400" />
          <h3 className="mb-1 text-lg font-medium text-slate-800">No Upcoming Events</h3>
          <p className="text-slate-500">
            Your schedule is clear. Click "New Event" to add something.
          </p>
        </div>
      )}
    </div>
  );
};

export default Schedule;