import React, { ReactNode } from 'react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  icon: ReactNode;
  trend?: number;
  formatter?: (value: string | number) => string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ 
  title, 
  value, 
  previousValue,
  icon, 
  trend,
  formatter = (val) => String(val)
}) => {
  const formattedValue = formatter(value);
  const formattedPreviousValue = previousValue ? formatter(previousValue) : null;
  
  const trendIsPositive = trend !== undefined ? trend > 0 : undefined;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-primary-500">
          {icon}
        </div>
      </div>
      
      <div className="text-2xl font-bold text-slate-800">{formattedValue}</div>
      
      {trend !== undefined && (
        <div className="mt-2 flex items-center">
          <span 
            className={`text-sm font-medium ${
              trendIsPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trendIsPositive ? '+' : ''}{trend}%
          </span>
          <span className="ml-1 text-xs text-slate-500">vs. previous period</span>
        </div>
      )}
      
      {formattedPreviousValue && (
        <div className="mt-1 text-xs text-slate-500">
          Previous: {formattedPreviousValue}
        </div>
      )}
    </div>
  );
};

export default MetricsCard;