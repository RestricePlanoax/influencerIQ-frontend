// components/dashboard/KpiCardsSection.tsx
import React, { useState, useEffect } from 'react';
import KpiCard from './KpiCard';
import { DollarSign, Users, TrendingUp, Target, FileText, Clock, ArrowRight, Plus, Search, MessageSquare, Bell, Sparkles, BarChart2, Star, Zap } from 'lucide-react';
const baseUrl = import.meta.env.VITE_API_URL || "";

export type MetricFromBE = {
  key: string;
  label: string;
  icon: string;        // e.g. "📊", "💰", etc.
  fontSize: string;    // e.g. "text-xl"
  description: string; // optional tooltip text
  format: 'integer' | 'currency' | 'percentage';
  value: number;
  // optional: if your BE ever returns a "trend" field, you can extend this type
  trend?: {
    value: number;
    isPositive: boolean;
  };
};

const KpiCardsSection: React.FC = () => {
  const [kpiMetrics, setKpiMetrics] = useState<MetricFromBE[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // same formatter logic as before
  const formatValue = (
    raw: number,
    format: 'integer' | 'currency' | 'percentage'
  ) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(raw);

      case 'percentage':
        // assume BE sent "68" to mean "68%"
        return `${raw}%`;

      case 'integer':
      default:
        return raw.toString();
    }
  };

  useEffect(() => {
    const fetchMetrics = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`${baseUrl}/api/v1/metrics/read`);
        if (!res.ok) {
          throw new Error(`Failed to fetch metrics: ${res.statusText}`);
        }
        const data: { totalCount: number; metrics: MetricFromBE[] } =
          await res.json();

        setKpiMetrics(data.metrics);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (error) {
    return (
      <div className="mb-4 text-red-500">
        Error loading metrics: {error}
      </div>
    );
  }
  

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Key Metrics
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? // show 4 skeleton/shimmer cards
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="h-28 rounded-lg bg-gray-200 p-4 shadow animate-pulse"
              />
            ))
          : // once loaded, map each metric to one <KpiCard />
            kpiMetrics.map((metric) => {
              // Build the “icon” node: either an emoji or string from BE
              let IconNode = (
                <span className={`${metric.fontSize} inline-block`}>
                  {metric.icon}
                </span>
              )
              const icons= metric.icon;
              if(icons==='Users')
              {
                IconNode = <span><Users size={20} className="text-blue-500" /></span>;
              }
              else if(icons==='DollarSign')
              {
                IconNode = <span> <DollarSign size={20} className="text-green-500" /></span>;
              }
              else if (icons==='TrendingUp')
              {
                IconNode = <span><TrendingUp size={20} className="text-purple-500" />
                </span>;

              }

              return (
                <KpiCard
                  key={metric.key}
                  title={metric.label}
                  value={metric.value}
                  icon={IconNode}
                  formatter={(val) => formatValue(val as number, metric.format)}
                  trend={metric.trend} // if your BE sends a `trend` object; otherwise omit
                />
              );
            })}
      </div>
    </div>
  );
};

export default KpiCardsSection;
