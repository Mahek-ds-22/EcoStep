import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartsProps {
  breakdown: {
    transport: number;
    diet: number;
    energy: number;
    habits: number;
  };
  language: 'en' | 'hi' | 'es';
}

const Charts: React.FC<ChartsProps> = ({ breakdown, language }) => {
  const labels = {
    en: ['Transport', 'Diet', 'Energy', 'Habits'],
    hi: ['परिवहन', 'आहार', 'ऊर्जा', 'आदतें'],
    es: ['Transporte', 'Dieta', 'Energía', 'Hábitos']
  };

  const pieData = {
    labels: labels[language],
    datasets: [
      {
        data: [breakdown.transport, breakdown.diet, breakdown.energy, breakdown.habits],
        backgroundColor: [
          '#3B82F6', // Blue
          '#10B981', // Green
          '#F59E0B', // Yellow
          '#8B5CF6', // Purple
        ],
        borderColor: [
          '#2563EB',
          '#059669',
          '#D97706',
          '#7C3AED',
        ],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  // Eco Gauge Component
  const EcoGauge = () => {
    const total = breakdown.transport + breakdown.diet + breakdown.energy + breakdown.habits;
    const percentage = (total / 40) * 100;
    
    const getGaugeColor = (percentage: number) => {
      if (percentage <= 25) return '#10B981'; // Green
      if (percentage <= 37.5) return '#F59E0B'; // Yellow
      if (percentage <= 50) return '#F97316'; // Orange
      if (percentage <= 62.5) return '#EF4444'; // Red
      return '#DC2626'; // Dark Red
    };

    const getGaugeLabel = (percentage: number) => {
      const labels = {
        en: ['Excellent', 'Good', 'Average', 'Needs Improvement', 'Poor'],
        hi: ['उत्कृष्ट', 'अच्छा', 'औसत', 'सुधार की आवश्यकता', 'खराब'],
        es: ['Excelente', 'Bueno', 'Promedio', 'Necesita Mejorar', 'Pobre']
      };
      
      if (percentage <= 25) return labels[language][0];
      if (percentage <= 37.5) return labels[language][1];
      if (percentage <= 50) return labels[language][2];
      if (percentage <= 62.5) return labels[language][3];
      return labels[language][4];
    };

    return (
      <div className="text-center">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          {language === 'en' && 'Eco Gauge'}
          {language === 'hi' && 'इको गेज'}
          {language === 'es' && 'Medidor Ecológico'}
        </h4>
        <div className="relative w-48 h-24 mx-auto">
          {/* Gauge Background */}
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            {/* Gauge Fill */}
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke={getGaugeColor(percentage)}
              strokeWidth="8"
              strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
            <div className="text-2xl font-bold" style={{ color: getGaugeColor(percentage) }}>
              {percentage.toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600">{getGaugeLabel(percentage)}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Pie Chart */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          {language === 'en' && 'Footprint Breakdown'}
          {language === 'hi' && 'फुटप्रिंट विभाजन'}
          {language === 'es' && 'Desglose de Huella'}
        </h4>
        <div className="h-64">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

      {/* Eco Gauge */}
      <div className="flex flex-col justify-center">
        <EcoGauge />
        
        {/* Category Scores */}
        <div className="mt-6 space-y-3">
          {Object.entries(breakdown).map(([category, value], index) => {
            const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
            const maxValue = 10; // Maximum possible score per category
            const percentage = (value / maxValue) * 100;
            
            return (
              <div key={category} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded ${colors[index]}`}></div>
                <span className="text-sm font-medium text-gray-700 w-20">
                  {labels[language][index]}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${colors[index]} transition-all duration-1000`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-gray-800 w-8">
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Charts;