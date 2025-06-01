import React, { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  description, 
  icon, 
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-8 text-center shadow-md">
      {icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          {icon}
        </div>
      )}
      <h3 className="mb-2 text-lg font-semibold text-slate-800">{title}</h3>
      <p className="mb-6 max-w-md text-slate-500">{description}</p>
      {action && (
        <button 
          onClick={action.onClick}
          className="btn btn-primary"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;