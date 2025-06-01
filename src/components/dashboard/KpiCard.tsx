import React, { ReactNode } from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  formatter?: (value: string | number) => string;
}

const KpiCard: React.FC<KpiCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  formatter = (val) => String(val)
}) => {
  return (
    <div className="card flex flex-col justify-between">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-500">
          {icon}
        </div>
      </div>
      
      <div>
        <div className="text-2xl font-bold text-slate-800">{formatter(value)}</div>
        
        {trend && (
          <div className="mt-2 flex items-center">
            <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
            <span className="ml-1 text-xs text-slate-500">from last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KpiCard;