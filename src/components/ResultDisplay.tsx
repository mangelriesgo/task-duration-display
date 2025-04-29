
import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Timer, Calendar } from 'lucide-react';

type ResultDisplayProps = {
  taskName: string;
  formattedTotal: string;
  unit: string;
  frequency: number;
  frequencyType: 'day' | 'week' | 'month' | 'year';
  duration: number;
  durationType: 'seconds' | 'minutes' | 'hours' | 'days';
  timeHorizon: string;
};

const ResultDisplay = ({
  taskName,
  formattedTotal,
  unit,
  frequency,
  frequencyType,
  duration,
  durationType,
  timeHorizon
}: ResultDisplayProps) => {
  
  const getTaskDescription = () => {
    const taskText = taskName ? `"${taskName}"` : "this task";
    return taskText;
  };

  const getFrequencyText = () => {
    if (frequency === 1) {
      return `once per ${frequencyType}`;
    }
    return `${frequency} times per ${frequencyType}`;
  };

  const getDurationText = () => {
    if (duration === 1) {
      return `1 ${durationType.slice(0, -1)}`; // Remove 's' from the end
    }
    return `${duration} ${durationType}`;
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

  return (
    <Card className="p-6 shadow-md bg-gradient-to-br from-blue-50 to-teal-50 border-t-4 border-blue-500">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="p-3 bg-white rounded-full shadow-sm">
          {getTimeIcon()}
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Time Investment Results</h2>
          
          <div className="mt-4 mb-6">
            <span className="text-4xl font-bold text-blue-700">{formattedTotal} </span>
            <span className="text-2xl font-semibold text-blue-600">{unit}</span>
          </div>
          
          <p className="text-gray-700 mb-2">
            You spend <span className="font-semibold">{formattedTotal} {unit}</span> on {getTaskDescription()} over {timeHorizon} {parseInt(timeHorizon) === 1 ? 'year' : 'years'}.
          </p>
          
          <div className="text-gray-600 text-sm mt-4">
            <p>Based on {getFrequencyText()} for {getDurationText()}.</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResultDisplay;
