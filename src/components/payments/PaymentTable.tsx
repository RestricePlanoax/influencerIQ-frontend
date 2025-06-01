import React, { useState } from 'react';
import { format } from 'date-fns';
import { Search, Download, CreditCard, Filter } from 'lucide-react';
import { Payment } from '../../types';
import Badge from '../common/Badge';

interface PaymentTableProps {
  payments: Payment[];
  onTriggerPayment: (paymentId: string) => void;
}

const PaymentTable: React.FC<PaymentTableProps> = ({ payments, onTriggerPayment }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  
  const filteredPayments = payments.filter(payment => {
    const matchesStatus = statusFilter === '' || payment.status === statusFilter;
    return matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning" label="Pending" />;
      case 'paid':
        return <Badge variant="success" label="Paid" />;
      case 'failed':
        return <Badge variant="error" label="Failed" />;
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
  
  const totalPending = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const totalPaid = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="mb-1 text-sm font-medium text-slate-500">Pending Payments</div>
          <div className="text-2xl font-bold text-slate-800">{formatCurrency(totalPending)}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="mb-1 text-sm font-medium text-slate-500">Total Paid</div>
          <div className="text-2xl font-bold text-slate-800">{formatCurrency(totalPaid)}</div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col space-y-3 md:flex-row md:items-center md:space-x-4 md:space-y-0">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={16} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search payments..."
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
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>
      
      {/* Payments Table */}
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Creator
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Campaign
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
            {filteredPayments.map(payment => (
              <tr key={payment.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-800">
                  {payment.creatorId}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                  {payment.campaignId}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-800">
                  {formatCurrency(payment.amount)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {getStatusBadge(payment.status)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                  {formatDate(payment.dueDate)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <div className="flex space-x-2">
                    {payment.status === 'pending' && (
                      <button 
                        className="rounded-lg bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700 hover:bg-primary-200"
                        onClick={() => onTriggerPayment(payment.id)}
                      >
                        Pay Now
                      </button>
                    )}
                    {payment.status === 'paid' && payment.invoiceUrl && (
                      <button className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-primary-500">
                        <Download size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredPayments.length === 0 && (
          <div className="py-8 text-center text-slate-500">
            No payments found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentTable;