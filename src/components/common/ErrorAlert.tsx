import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  return (
    <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
      <div className="flex items-start">
        <div className="mr-3 flex-shrink-0">
          <AlertTriangle size={20} />
        </div>
        <div className="flex-1">
          <p className="font-medium">Error</p>
          <p className="mt-1 text-sm">{message}</p>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="ml-4 rounded p-1 text-red-500 hover:bg-red-200"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorAlert;