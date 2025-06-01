import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';

interface CalendarViewProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  events: Array<{
    id: string;
    title: string;
    date: string;
    type: 'meeting' | 'follow-up' | 'deadline' | 'campaign';
    with?: string;
    description?: string;
  }>;
}

const CalendarView: React.FC<CalendarViewProps> = ({ selectedDate, onDateChange, events }) => {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const previousMonth = () => {
    onDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1));
  };

  const nextMonth = () => {
    onDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1));
  };

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={previousMonth}
          className="rounded p-1 text-slate-500 hover:bg-slate-100"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold text-slate-800">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={nextMonth}
          className="rounded p-1 text-slate-500 hover:bg-slate-100"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="rounded-lg border border-slate-200 bg-white">
        {/* Days of Week */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
          {daysOfWeek.map(day => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-slate-500"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {monthDays.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const isCurrentMonth = isSameMonth(day, selectedDate);
            const isCurrentDay = isToday(day);

            return (
              <div
                key={index}
                className={`min-h-[100px] border-b border-r border-slate-200 p-2 ${
                  !isCurrentMonth ? 'bg-slate-50' : ''
                }`}
              >
                <div className="mb-1 flex justify-between">
                  <span
                    className={`text-sm ${
                      isCurrentDay
                        ? 'rounded-full bg-primary-500 px-2 py-0.5 text-white'
                        : isCurrentMonth
                        ? 'text-slate-700'
                        : 'text-slate-400'
                    }`}
                  >
                    {format(day, 'd')}
                  </span>
                </div>

                {/* Events */}
                <div className="space-y-1">
                  {dayEvents.map(event => (
                    <div
                      key={event.id}
                      className={`rounded px-2 py-1 text-xs ${
                        event.type === 'meeting'
                          ? 'bg-blue-100 text-blue-700'
                          : event.type === 'follow-up'
                          ? 'bg-yellow-100 text-yellow-700'
                          : event.type === 'deadline'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;