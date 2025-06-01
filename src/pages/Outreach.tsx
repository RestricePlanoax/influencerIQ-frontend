import React, { useState } from 'react';
import { Plus, Mail } from 'lucide-react';
import ContactList from '../components/outreach/ContactList';
import EmailComposer from '../components/outreach/EmailComposer';
import CommunicationLog from '../components/outreach/CommunicationLog';
import Inbox from '../components/outreach/Inbox';
import EmailTemplates from '../components/outreach/EmailTemplates';
import OutreachManagement from '../components/outreach/OutreachManagement';
import Calendar from '../components/outreach/Calendar';
import { mockOutreachContacts, mockEmailTemplates, mockCommunicationLogs } from '../mockData';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Outreach: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'creators' | 'inbox' | 'outreach' | 'templates' | 'calendar'>('inbox');
  const [contacts, setContacts] = useState(mockOutreachContacts);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [showEmailComposer, setShowEmailComposer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const selectedContact = selectedContactId 
    ? contacts.find(contact => contact.id === selectedContactId) 
    : undefined;
  
  const contactLogs = selectedContactId 
    ? mockCommunicationLogs.filter(log => log.creatorId === selectedContactId)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <h1 className="text-2xl font-bold text-slate-800">Creator Outreach & CRM</h1>
        <p className="text-sm text-slate-500">Manage your creator relationships and communications</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex overflow-x-auto">
          <button
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              activeTab === 'creators'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('creators')}
          >
            Creators
          </button>
          <button
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              activeTab === 'inbox'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('inbox')}
          >
            Inbox
          </button>
          <button
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              activeTab === 'outreach'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('outreach')}
          >
            Outreach
          </button>
          <button
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              activeTab === 'templates'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('templates')}
          >
            Templates
          </button>
          <button
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              activeTab === 'calendar'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('calendar')}
          >
            Calendar
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'creators' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ContactList 
              contacts={contacts} 
              onSelectContact={setSelectedContactId} 
              onAddContact={() => {}} 
              onSendEmail={() => setShowEmailComposer(true)}
            />
          </div>
          <div className="lg:col-span-2">
            {selectedContact ? (
              <CommunicationLog logs={contactLogs} />
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8">
                <div className="text-center">
                  <Mail size={48} className="mx-auto mb-4 text-slate-400" />
                  <h3 className="mb-2 text-lg font-medium text-slate-800">Select a Contact</h3>
                  <p className="text-slate-500">Choose a creator from the list to view communication history</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'inbox' && (
        <div className="h-[calc(100vh-16rem)] rounded-lg border border-slate-200 bg-white">
          <Inbox />
        </div>
      )}

      {activeTab === 'outreach' && (
        <OutreachManagement />
      )}

      {activeTab === 'templates' && (
        <EmailTemplates
          templates={mockEmailTemplates}
          onCreateTemplate={() => {}}
          onEditTemplate={() => {}}
          onDeleteTemplate={() => {}}
          onUseTemplate={() => {}}
        />
      )}

      {activeTab === 'calendar' && (
        <Calendar />
      )}

      {/* Email Composer Modal */}
      {showEmailComposer && (
        <EmailComposer 
          contact={selectedContact}
          templates={mockEmailTemplates}
          onClose={() => setShowEmailComposer(false)}
          onSend={() => {
            setShowEmailComposer(false);
            setSuccessMessage('Email sent successfully!');
            setTimeout(() => setSuccessMessage(null), 3000);
          }}
        />
      )}
    </div>
  );
};

export default Outreach;