import React, { useState } from 'react';
import { format } from 'date-fns';
import { Search, Download, CreditCard, Filter, X } from 'lucide-react';
import { Payment } from '../../types';
import Badge from '../common/Badge';

interface PaymentTableProps {
  payments: Payment[];
  onTriggerPayment: (paymentId: string) => void;
}

const PaymentTable: React.FC<PaymentTableProps> = ({ payments, onTriggerPayment }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [selectedGateway, setSelectedGateway] = useState<'stripe' | 'razorpay'>('stripe');
  const [showSuccess, setShowSuccess] = useState(false);
  
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

  const handleInitiatePayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const handleProcessPayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setShowPaymentModal(false);
      setShowSuccess(true);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="rounded-lg bg-white p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-semibold text-slate-800">Payment Successful!</h2>
        <p className="mb-6 text-slate-600">
          Payment of {selectedPayment && formatCurrency(selectedPayment.amount)} has been processed successfully.
        </p>
        <div className="space-y-3">
          <div className="rounded-lg bg-slate-50 p-4">
            <h3 className="mb-2 text-sm font-medium text-slate-700">Transaction Details</h3>
            <p className="text-slate-600">
              Transaction ID: {Math.random().toString(36).substring(2, 15)}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <h3 className="mb-2 text-sm font-medium text-slate-700">Payment Method</h3>
            <p className="text-slate-600">
              {selectedGateway === 'stripe' ? 'Stripe' : 'Razorpay'}
            </p>
          </div>
        </div>
        <div className="mt-6 space-x-3">
          <button 
            className="btn btn-outline"
            onClick={() => {
              setShowSuccess(false);
              setSelectedPayment(null);
            }}
          >
            Back to Payments
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => window.open(selectedPayment?.invoiceUrl, '_blank')}
          >
            Download Invoice
          </button>
        </div>
      </div>
    );
  }

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
                        onClick={() => handleInitiatePayment(payment)}
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
      </div>

      {/* Payment Gateway Modal */}
      {showPaymentModal && selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">Process Payment</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="rounded p-1 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Amount to Pay
                </label>
                <div className="rounded-lg bg-slate-50 p-3 text-lg font-semibold text-slate-800">
                  {formatCurrency(selectedPayment.amount)}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Payment Gateway
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    className={`flex items-center justify-center rounded-lg border p-4 ${
                      selectedGateway === 'stripe'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-slate-200 hover:border-primary-200'
                    }`}
                    onClick={() => setSelectedGateway('stripe')}
                  >
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" 
                      alt="Stripe"
                      className="h-6"
                    />
                  </button>
                  <button
                    className={`flex items-center justify-center rounded-lg border p-4 ${
                      selectedGateway === 'razorpay'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-slate-200 hover:border-primary-200'
                    }`}
                    onClick={() => setSelectedGateway('razorpay')}
                  >
                    <img 
                      src="https://razorpay.com/assets/razorpay-logo.svg" 
                      alt="Razorpay"
                      className="h-6"
                    />
                  </button>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 p-4">
                <h4 className="mb-2 text-sm font-medium text-blue-800">Payment Details</h4>
                <div className="space-y-2 text-sm text-blue-600">
                  <div className="flex justify-between">
                    <span>Creator:</span>
                    <span className="font-medium">{selectedPayment.creatorId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Campaign:</span>
                    <span className="font-medium">{selectedPayment.campaignId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Due Date:</span>
                    <span className="font-medium">{formatDate(selectedPayment.dueDate)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="btn btn-outline"
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary flex items-center"
                onClick={handleProcessPayment}
              >
                <CreditCard size={16} className="mr-2" />
                Process Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentTable;