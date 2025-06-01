import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Mail } from 'lucide-react';
import { OutreachContact } from '../../types';
import Badge from '../common/Badge';
import { format } from 'date-fns';

interface ContactListProps {
  contacts: OutreachContact[];
  onSelectContact: (contactId: string) => void;
  onAddContact: () => void;
  onSendEmail: (contactId: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ 
  contacts, 
  onSelectContact, 
  onAddContact,
  onSendEmail
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.platform.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === '' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'contacted':
        return <Badge variant="info" label="Contacted" />;
      case 'negotiating':
        return <Badge variant="warning" label="Negotiating" />;
      case 'active':
        return <Badge variant="success" label="Active" />;
      case 'inactive':
        return <Badge variant="default" label="Inactive" />;
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Creator Contacts</h3>
        <button 
          className="btn btn-primary flex items-center"
          onClick={onAddContact}
        >
          <Plus size={16} className="mr-1" />
          Add Contact
        </button>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col space-y-3 md:flex-row md:items-center md:space-x-4 md:space-y-0">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={16} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search contacts..."
            className="input pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-48">
          <select
            className="input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="contacted">Contacted</option>
            <option value="negotiating">Negotiating</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      
      {/* Contacts Table */}
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Platform
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Last Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {filteredContacts.map(contact => (
              <tr 
                key={contact.id} 
                className="cursor-pointer hover:bg-slate-50"
                onClick={() => onSelectContact(contact.id)}
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex flex-col">
                    <div className="font-medium text-slate-800">{contact.name}</div>
                    <div className="text-xs text-slate-500">{contact.email}</div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                  {contact.platform}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {getStatusBadge(contact.status)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                  {formatDate(contact.lastContact)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <div className="flex space-x-2">
                    <button 
                      className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-primary-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSendEmail(contact.id);
                      }}
                    >
                      <Mail size={18} />
                    </button>
                    <button 
                      className="rounded p-1 text-slate-500 hover:bg-slate-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredContacts.length === 0 && (
          <div className="py-8 text-center text-slate-500">
            No contacts found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;