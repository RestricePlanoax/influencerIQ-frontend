import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PerformanceChartProps {
  title: string;
  data: {
    date: string;
    value: number;
  }[];
  color: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  title, 
  data, 
  color,
  valuePrefix = '',
  valueSuffix = ''
}) => {
  // Format dates for display
  const labels = data.map(item => {
    const date = new Date(item.date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });
  
  const values = data.map(item => item.value);
  
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        borderColor: color,
        backgroundColor: `${color}33`, // Add transparency
        tension: 0.3,
        fill: true,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `${valuePrefix}${context.parsed.y}${valueSuffix}`;
            }
            return label;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return `${valuePrefix}${value}${valueSuffix}`;
          }
        }
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <h3 className="mb-4 text-base font-medium text-slate-800">{title}</h3>
      <div className="h-64">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PerformanceChart;