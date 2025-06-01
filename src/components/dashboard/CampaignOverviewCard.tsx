import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CampaignOverviewCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  link: string;
}

const CampaignOverviewCard: React.FC<CampaignOverviewCardProps> = ({
  title,
  count,
  icon,
  color,
  link
}) => {
  return (
    <div className="card flex flex-col">
      <div className="mb-3 flex items-center">
        <div className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full ${color}`}>
          {icon}
        </div>
        <h3 className="text-lg font-medium text-slate-800">{title}</h3>
      </div>
      
      <div className="mb-4 text-3xl font-bold text-slate-800">{count}</div>
      
      <Link 
        to={link} 
        className="mt-auto flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
      >
        View All
        <ArrowRight size={16} className="ml-1" />
      </Link>
    </div>
  );
};

export default CampaignOverviewCard;