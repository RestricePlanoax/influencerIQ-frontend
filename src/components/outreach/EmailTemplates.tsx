import React, { useState } from 'react';
import { Plus, Edit2, Copy, Trash2, Tag } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
  usageCount: number;
  createdAt: string;
}

interface EmailTemplatesProps {
  templates: EmailTemplate[];
  onCreateTemplate: () => void;
  onEditTemplate: (template: EmailTemplate) => void;
  onDeleteTemplate: (templateId: string) => void;
  onUseTemplate: (template: EmailTemplate) => void;
}

const EmailTemplates: React.FC<EmailTemplatesProps> = ({
  templates,
  onCreateTemplate,
  onEditTemplate,
  onDeleteTemplate,
  onUseTemplate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(templates.map(t => t.category)));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Email Templates</h2>
        <button 
          className="btn btn-primary flex items-center"
          onClick={onCreateTemplate}
        >
          <Plus size={16} className="mr-1" />
          New Template
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col space-y-3 md:flex-row md:items-center md:space-x-4 md:space-y-0">
        <div className="relative flex-1">
          <input
            type="text"
            className="input pl-10"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        </div>
        
        <select
          className="input md:w-48"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map(template => (
          <div 
            key={template.id}
            className="rounded-lg border border-slate-200 bg-white p-4 hover:border-primary-200"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                template.category === 'outreach' ? 'bg-blue-100 text-blue-700' :
                template.category === 'follow-up' ? 'bg-green-100 text-green-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {template.category}
              </span>
              <div className="flex items-center space-x-2">
                <button 
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-primary-500"
                  onClick={() => onEditTemplate(template)}
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-primary-500"
                  onClick={() => onUseTemplate(template)}
                >
                  <Copy size={16} />
                </button>
                <button 
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-red-500"
                  onClick={() => onDeleteTemplate(template.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <h3 className="mb-1 font-medium text-slate-800">{template.name}</h3>
            <p className="mb-2 text-sm text-slate-600">{template.subject}</p>
            
            <div className="mb-3 h-20 overflow-hidden text-sm text-slate-500">
              {template.body}
            </div>
            
            <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
              <span>Used {template.usageCount} times</span>
              <span>Created {formatDate(template.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center">
          <Tag size={24} className="mx-auto mb-3 text-slate-400" />
          <h3 className="mb-1 text-lg font-medium text-slate-800">No Templates Found</h3>
          <p className="mb-4 text-slate-500">
            {searchQuery || categoryFilter
              ? "Try adjusting your search or filters"
              : "Create your first email template to get started"}
          </p>
          <button 
            className="btn btn-primary"
            onClick={onCreateTemplate}
          >
            Create Template
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailTemplates;