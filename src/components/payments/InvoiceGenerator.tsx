import React, { useState } from 'react';
import { FileText, DollarSign, Calendar, User, Plus, Trash2 } from 'lucide-react';

interface InvoiceGeneratorProps {
  onClose: () => void;
  onGenerate: (invoiceData: any) => void;
}

const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({ onClose, onGenerate }) => {
  const [invoiceData, setInvoiceData] = useState({
    creatorId: '',
    campaignId: '',
    items: [{ description: '', quantity: 1, rate: 0 }],
    dueDate: '',
    notes: ''
  });

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', quantity: 1, rate: 0 }]
    });
  };

  const removeItem = (index: number) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.filter((_, i) => i !== index)
    });
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      ...invoiceData,
      subtotal: calculateSubtotal(),
      total: calculateTotal()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800">Generate New Invoice</h3>
          <button 
            onClick={onClose}
            className="rounded p-1 text-slate-500 hover:bg-slate-100"
          >
            <FileText size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Details */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Creator
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <select
                  className="input pl-10"
                  value={invoiceData.creatorId}
                  onChange={(e) => setInvoiceData({ ...invoiceData, creatorId: e.target.value })}
                  required
                >
                  <option value="">Select Creator</option>
                  <option value="creator1">Sarah Johnson</option>
                  <option value="creator2">Mike Chen</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Campaign
              </label>
              <select
                className="input"
                value={invoiceData.campaignId}
                onChange={(e) => setInvoiceData({ ...invoiceData, campaignId: e.target.value })}
                required
              >
                <option value="">Select Campaign</option>
                <option value="campaign1">Summer Fashion Launch</option>
                <option value="campaign2">Tech Product Review</option>
              </select>
            </div>
          </div>

          {/* Line Items */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                Invoice Items
              </label>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                <Plus size={16} className="mr-1" />
                Add Item
              </button>
            </div>

            <div className="space-y-3">
              {invoiceData.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    className="input flex-1"
                    placeholder="Item description"
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    className="input w-24"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                    required
                    min="1"
                  />
                  <div className="relative w-32">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="number"
                      className="input pl-8"
                      placeholder="Rate"
                      value={item.rate}
                      onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value))}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="w-24 text-right font-medium text-slate-800">
                    ${(item.quantity * item.rate).toFixed(2)}
                  </div>
                  {invoiceData.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex justify-between text-sm font-medium text-slate-700">
              <span>Subtotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="mt-2 flex justify-between text-base font-bold text-slate-800">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Due Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="date"
                  className="input pl-10"
                  value={invoiceData.dueDate}
                  onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Notes
              </label>
              <textarea
                className="input"
                placeholder="Additional notes or payment instructions..."
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
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
              Generate Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceGenerator;