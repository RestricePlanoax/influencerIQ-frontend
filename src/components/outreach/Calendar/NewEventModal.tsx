import React, { useState } from 'react';
import { X, Calendar, Clock, Users, FileText } from 'lucide-react';

interface NewEventModalProps {
  onClose: () => void;
  onSave: (eventData: any) => void;
}

const NewEventModal: React.FC<NewEventModalProps> = ({ onClose, onSave }) => {
  const [eventData, setEventData] = useState({
    title: '',
    type: 'meeting',
    date: '',
    time: '',
    with: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...eventData,
      date: `${eventData.date}T${eventData.time}`
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800">New Event</h3>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Event Type
            </label>
            <select
              className="input"
              value={eventData.type}
              onChange={(e) => setEventData({ ...eventData, type: e.target.value })}
              required
            >
              <option value="meeting">Meeting</option>
              <option value="follow-up">Follow-up</option>
              <option value="deadline">Deadline</option>
              <option value="campaign">Campaign</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              type="text"
              className="input"
              placeholder="Event title"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="input pl-10"
                  value={eventData.date}
                  onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                  required
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  className="input pl-10"
                  value={eventData.time}
                  onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                  required
                />
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>
          </div>

          {(eventData.type === 'meeting' || eventData.type === 'follow-up') && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                With
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="input pl-10"
                  placeholder="Enter name"
                  value={eventData.with}
                  onChange={(e) => setEventData({ ...eventData, with: e.target.value })}
                />
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Description
            </label>
            <div className="relative">
              <textarea
                className="input min-h-[100px] pl-10"
                placeholder="Add description"
                value={eventData.description}
                onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              />
              <FileText className="absolute left-3 top-3 text-slate-400" size={16} />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEventModal;