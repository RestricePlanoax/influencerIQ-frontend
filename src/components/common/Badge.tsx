import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  label: string;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'default', label }) => {
  const variantClasses: Record<BadgeVariant, string> = {
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    info: 'badge-info',
    default: 'bg-slate-100 text-slate-800'
  };

  return (
    <span className={`badge ${variantClasses[variant]}`}>
      {label}
    </span>
  );
};

export default Badge;