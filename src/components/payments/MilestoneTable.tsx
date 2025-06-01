import React from 'react';
import { format } from 'date-fns';
import { Milestone } from '../../types';
import Badge from '../common/Badge';

interface MilestoneTableProps {
  milestones: Milestone[];
  onTriggerMilestone: (milestoneId: string) => void;
}

const MilestoneTable: React.FC<MilestoneTableProps> = ({ milestones, onTriggerMilestone }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'not_triggered':
        return <Badge variant="info" label="Not Triggered" />;
      case 'triggered':
        return <Badge variant="warning" label="Triggered" />;
      case 'paid':
        return <Badge variant="success" label="Paid" />;
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800">Payment Milestones</h3>
      
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Milestone
              </th>
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
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {milestones.map(milestone => (
              <tr key={milestone.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-800">
                  {milestone.title}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                  {milestone.creatorId}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-800">
                  {formatCurrency(milestone.amount)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {getStatusBadge(milestone.status)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                  {formatDate(milestone.dueDate)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {milestone.status === 'not_triggered' && (
                    <button 
                      className="rounded-lg bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700 hover:bg-primary-200"
                      onClick={() => onTriggerMilestone(milestone.id)}
                    >
                      Trigger Payment
                    </button>
                  )}
                  {milestone.status === 'triggered' && (
                    <span className="text-xs text-slate-500">Payment in process</span>
                  )}
                  {milestone.status === 'paid' && (
                    <span className="text-xs text-green-500">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {milestones.length === 0 && (
          <div className="py-8 text-center text-slate-500">
            No milestones found for this campaign.
          </div>
        )}
      </div>
    </div>
  );
};

export default MilestoneTable;