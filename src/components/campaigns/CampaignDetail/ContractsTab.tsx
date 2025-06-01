import React, { useState } from 'react';
import { Campaign } from '../../../types';
import { mockCreators, mockContracts } from '../../../mockData';
import { FileText, Download, Send, Eye, Plus } from 'lucide-react';
import Badge from '../../common/Badge';
import { format } from 'date-fns';

interface ContractsTabProps {
  campaign: Campaign;
}

const ContractsTab: React.FC<ContractsTabProps> = ({ campaign }) => {
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  
  const campaignContracts = mockContracts.filter(contract => 
    contract.campaignId === campaign.id
  );
  
  const getCreatorById = (creatorId: string) => {
    return mockCreators.find(creator => creator.id === creatorId);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="info" label="Draft" />;
      case 'sent':
        return <Badge variant="warning" label="Sent" />;
      case 'pending':
        return <Badge variant="warning" label="Pending Signature" />;
      case 'signed':
        return <Badge variant="success" label="Signed" />;
      case 'completed':
        return <Badge variant="default" label="Completed" />;
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Contracts</h3>
        <button 
          className="btn btn-primary flex items-center"
          onClick={() => setShowGenerateModal(true)}
        >
          <Plus size={16} className="mr-1" />
          Generate Contract
        </button>
      </div>
      
      {campaignContracts.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Creator
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {campaignContracts.map(contract => {
                const creator = getCreatorById(contract.creatorId);
                return (
                  <tr key={contract.id} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="mr-3 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                          <img 
                            src={creator?.profilePic} 
                            alt={creator?.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-slate-800">{creator?.name}</div>
                          <div className="text-xs text-slate-500">{creator?.handle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-800">
                      {formatCurrency(contract.amount)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {getStatusBadge(contract.status)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                      {formatDate(contract.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                      {formatDate(contract.updatedAt)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <div className="flex space-x-2">
                        {contract.pdfUrl && (
                          <button className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-primary-500">
                            <Eye size={18} />
                          </button>
                        )}
                        {contract.pdfUrl && (
                          <button className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-primary-500">
                            <Download size={18} />
                          </button>
                        )}
                        {contract.status === 'draft' && (
                          <button className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-primary-500">
                            <Send size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 p-8 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <FileText size={24} className="text-slate-400" />
          </div>
          <h4 className="mb-1 text-lg font-medium text-slate-800">No Contracts Yet</h4>
          <p className="mb-4 max-w-md text-slate-500">
            Generate contracts for creators to formalize your collaboration terms and deliverables.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowGenerateModal(true)}
          >
            Generate Your First Contract
          </button>
        </div>
      )}
      
      {/* Generate Contract Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-xl font-bold text-slate-800">Generate New Contract</h3>
            
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Select Creator
                </label>
                <select className="input">
                  <option value="">Choose a creator</option>
                  {campaign.creators.map(creatorId => {
                    const creator = getCreatorById(creatorId);
                    if (!creator) return null;
                    return (
                      <option key={creator.id} value={creator.id}>
                        {creator.name} ({creator.handle})
                      </option>
                    );
                  })}
                </select>
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Contract Amount
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-slate-500">$</span>
                  </div>
                  <input
                    type="number"
                    className="input pl-8"
                    placeholder="5000"
                  />
                </div>
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Deliverables
                </label>
                <div className="space-y-2">
                  {campaign.brief.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`deliverable-${index}`}
                        className="mr-2 h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor={`deliverable-${index}`} className="text-sm text-slate-700">
                        {deliverable.quantity} x {deliverable.type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Additional Terms
                </label>
                <textarea
                  className="input min-h-[100px]"
                  placeholder="Any additional terms or special requirements..."
                ></textarea>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="btn btn-outline"
                onClick={() => setShowGenerateModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary">
                Generate Contract
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractsTab;