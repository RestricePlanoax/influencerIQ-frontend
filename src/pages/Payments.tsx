import React, { useState } from 'react';
import { DollarSign, FileText, Clock } from 'lucide-react';
import PaymentTable from '../components/payments/PaymentTable';
import MilestoneTable from '../components/payments/MilestoneTable';
import InvoiceGenerator from '../components/payments/InvoiceGenerator';
import { mockPayments, mockMilestones } from '../mockData';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Payments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'payments' | 'milestones' | 'invoices'>('payments');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showInvoiceGenerator, setShowInvoiceGenerator] = useState(false);
  
  const totalPending = mockPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const totalPaid = mockPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const handleTriggerPayment = (paymentId: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setSuccessMessage('Payment initiated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleTriggerMilestone = (milestoneId: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setSuccessMessage('Milestone payment triggered successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
      setIsLoading(false);
    }, 1000);
  };

  const handleGenerateInvoice = (invoiceData: any) => {
    setIsLoading(true);
    
    // Simulate API call to generate invoice
    setTimeout(() => {
      setShowInvoiceGenerator(false);
      setSuccessMessage('Invoice generated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Payments & Finances</h1>
        <div className="text-sm text-slate-500">
          All amounts in USD
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500">Pending Payments</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
              <Clock size={20} className="text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold text-slate-800">${totalPending.toLocaleString()}</span>
            <div className="mt-1 text-sm text-slate-500">
              Awaiting processing
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500">Total Paid</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <DollarSign size={20} className="text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold text-slate-800">${totalPaid.toLocaleString()}</span>
            <div className="mt-1 text-sm text-slate-500">
              Successfully processed
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500">Pending Invoices</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <FileText size={20} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold text-slate-800">12</span>
            <div className="mt-1 text-sm text-slate-500">
              Need generation
            </div>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="rounded-lg bg-green-100 p-4 text-green-700">
          {successMessage}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex">
          <button
            className={`flex items-center px-4 py-2 text-sm font-medium ${
              activeTab === 'payments'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('payments')}
          >
            <DollarSign size={16} className="mr-2" />
            Payments
          </button>
          <button
            className={`flex items-center px-4 py-2 text-sm font-medium ${
              activeTab === 'milestones'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('milestones')}
          >
            <Clock size={16} className="mr-2" />
            Milestones
          </button>
          <button
            className={`flex items-center px-4 py-2 text-sm font-medium ${
              activeTab === 'invoices'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('invoices')}
          >
            <FileText size={16} className="mr-2" />
            Invoices
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {isLoading ? (
        <div className="py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="rounded-xl bg-white p-6 shadow-sm">
          {activeTab === 'payments' && (
            <PaymentTable 
              payments={mockPayments} 
              onTriggerPayment={handleTriggerPayment} 
            />
          )}
          
          {activeTab === 'milestones' && (
            <MilestoneTable 
              milestones={mockMilestones} 
              onTriggerMilestone={handleTriggerMilestone} 
            />
          )}

          {activeTab === 'invoices' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">Invoices</h2>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowInvoiceGenerator(true)}
                >
                  Generate New Invoice
                </button>
              </div>

              <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Invoice ID
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
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {mockPayments.filter(p => p.status === 'paid').map(payment => (
                      <tr key={payment.id}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-800">
                          INV-{payment.id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-800">
                          {payment.creatorId}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-800">
                          ${payment.amount.toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                            Generated
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                          {new Date(payment.paymentDate || '').toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <button className="text-primary-600 hover:text-primary-900">
                            Download PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Invoice Generator Modal */}
      {showInvoiceGenerator && (
        <InvoiceGenerator
          onClose={() => setShowInvoiceGenerator(false)}
          onGenerate={handleGenerateInvoice}
        />
      )}
    </div>
  );
};

export default Payments;