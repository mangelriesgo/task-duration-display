import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Timer, Calendar, Euro } from 'lucide-react';
import { FrequencyType, DurationType } from '@/types/calculator';

type ResultDisplayProps = {
  taskName: string;
  formattedTotal: string;
  unit: string;
  frequency: number;
  frequencyType: FrequencyType;
  duration: number;
  durationType: DurationType;
  timeHorizon: string;
  formattedCost: string;
};

const ResultDisplay = ({
  taskName,
  formattedTotal,
  unit,
  frequency,
  frequencyType,
  duration,
  durationType,
  timeHorizon,
  formattedCost
}: ResultDisplayProps) => {
  
  const getTaskDescription = () => {
    const taskText = taskName ? `"${taskName}"` : "esta tarea";
    return taskText;
  };

  const translateFrequencyType = (type: FrequencyType): string => {
    const translations = {
      'day': 'día',
      'week': 'semana',
      'month': 'mes',
      'year': 'año'
    };
    return translations[type] || type;
  };

  const translateDurationType = (type: DurationType): string => {
    const translations = {
      'seconds': 'segundos',
      'minutes': 'minutos', 
      'hours': 'horas',
      'days': 'días'
    };
    return translations[type] || type;
  };

  const getFrequencyText = () => {
    const translatedFrequency = translateFrequencyType(frequencyType);
    if (frequency === 1) {
      return `una vez cada ${translatedFrequency}`;
    }
    return `${frequency} veces cada ${translatedFrequency}`;
  };

  const getDurationText = () => {
    const translatedDuration = translateDurationType(durationType);
    if (duration === 1) {
      // Only remove 's' if the translation ends with 's'
      const singular = translatedDuration.endsWith('s') ? translatedDuration.slice(0, -1) : translatedDuration;
      return `1 ${singular}`;
    }
    return `${duration} ${translatedDuration}`;
  };

  const getTimeIcon = () => {
    switch (unit) {
      case 'minutes':
      case 'hours':
        return <Clock className="w-10 h-10 text-blue-500" />;
      case 'days':
      case 'weeks':
        return <Timer className="w-10 h-10 text-blue-500" />;
      case 'months':
      case 'years':
        return <Calendar className="w-10 h-10 text-blue-500" />;
      default:
        return <Clock className="w-10 h-10 text-blue-500" />;
    }
  };

  // Format numbers with dots for thousands
  const formatNumberWithDots = (numStr: string): string => {
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Format cost without decimals
  const formatCostWithoutDecimals = (costStr: string): string => {
    return costStr.replace(/,\d{2}/, '');
  };

  return (
    <Card className="p-6 shadow-md bg-gradient-to-br from-blue-50 to-teal-50 border-t-4 border-blue-500">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="p-3 bg-white rounded-full shadow-sm">
          {getTimeIcon()}
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Con una automatización, te ahorrarías</h2>
          
          <div className="mt-4 mb-2">
            <span className="text-4xl font-bold text-blue-700">{formatNumberWithDots(formattedTotal)} </span>
            <span className="text-2xl font-semibold text-blue-600">{unit} que equivalen a </span>
          </div>
          
          <div className="mb-4 flex items-center">
            <Euro className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-2xl font-bold text-green-700">{formatCostWithoutDecimals(formattedCost)}</span>
          </div>
          
          <p className="text-gray-700 mb-2">
            Has dedicado <span className="font-semibold">{formatNumberWithDots(formattedTotal)} {unit}</span> en {getTaskDescription()} a lo largo {timeHorizon} {parseInt(timeHorizon) === 1 ? 'año' : 'años'}.
          </p>
          
          <p className="text-gray-700 mb-2">
            El coste económico de esta tarea es <span className="font-semibold">{formatCostWithoutDecimals(formattedCost)}</span>.
          </p>
          
          <div className="text-gray-600 text-sm mt-4">
            <p>Basado en {getFrequencyText()} durante {getDurationText()}.</p>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-gray-800 font-medium">
              En NoCodeB2B, podemos ayudarte a conseguir estos ahorros, accede{' '}
              <a 
                href="https://www.nocodeb2b.es/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline font-semibold"
              >
                aquí
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResultDisplay;
