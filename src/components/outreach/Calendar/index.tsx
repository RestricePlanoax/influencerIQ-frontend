import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import CalendarView from './CalendarView';
import Schedule from './Schedule';
import Deadlines from './Deadlines';
import NewEventModal from './NewEventModal';

const Calendar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'schedule' | 'deadlines'>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNewEventModal, setShowNewEventModal] = useState(false);

  // Mock events data
  const events = [
    {
      id: '1',
      title: 'Call with Sarah Johnson',
      date: '2025-06-01T14:00:00',
      type: 'meeting' as const,
      with: 'Sarah Johnson',
      description: 'Discuss summer campaign collaboration'
    },
    {
      id: '2',
      title: 'Follow-up with Mike Chen',
      date: '2025-06-02T10:00:00',
      type: 'follow-up' as const,
      with: 'Mike Chen'
    },
    {
      id: '3',
      title: 'Campaign Content Deadline',
      date: '2025-06-04T23:59:00',
      type: 'deadline' as const,
      description: 'Final content submission for fashion campaign'
    },
    {
      id: '4',
      title: 'Campaign Launch',
      date: '2025-06-08T09:00:00',
      type: 'campaign' as const,
      description: 'Summer fashion campaign goes live'
    }
  ];

  const deadlines = events.filter(event => 
    event.type === 'deadline' || event.type === 'campaign'
  );

  const handleNewEvent = (eventData: any) => {
    console.log('New event:', eventData);
    setShowNewEventModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Calendar & Scheduling</h2>
        <button 
          className="btn btn-primary flex items-center"
          onClick={() => setShowNewEventModal(true)}
        >
          <Plus size={16} className="mr-1" />
          New Event
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'calendar'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('calendar')}
          >
            Calendar View
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'schedule'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('schedule')}
          >
            Schedule
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'deadlines'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('deadlines')}
          >
            Deadlines
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'calendar' && (
        <CalendarView
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          events={events}
        />
      )}

      {activeTab === 'schedule' && (
        <Schedule events={events} />
      )}

      {activeTab === 'deadlines' && (
        <Deadlines
          deadlines={deadlines.map(d => ({
            id: d.id,
            title: d.title,
            dueDate: d.date,
            type: d.type,
            description: d.description
          }))}
        />
      )}

      {/* New Event Modal */}
      {showNewEventModal && (
        <NewEventModal
          onClose={() => setShowNewEventModal(false)}
          onSave={handleNewEvent}
        />
      )}
    </div>
  );
};

export default Calendar;