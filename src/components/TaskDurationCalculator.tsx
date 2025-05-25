import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import ResultDisplay from './ResultDisplay';
import TaskForm from './TaskForm';
import { DurationType, FrequencyType, TimeHorizon } from '@/types/calculator';
import { calculateTotalTime } from '@/services/calculationService';

const TaskDurationCalculator = () => {
  const [taskName, setTaskName] = useState<string>('');
  const [frequency, setFrequency] = useState<number>(1);
  const [frequencyType, setFrequencyType] = useState<FrequencyType>('day');
  const [duration, setDuration] = useState<number>(15);
  const [durationType, setDurationType] = useState<DurationType>('minutes');
  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>('5');
  const [salary, setSalary] = useState<number>(30000);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [formattedTotal, setFormattedTotal] = useState<string>('');
  const [formattedCost, setFormattedCost] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  useEffect(() => {
    if (isCalculated) {
      performCalculation();
    }
  }, [frequencyType, durationType, timeHorizon, isCalculated]);

  const performCalculation = () => {
    const result = calculateTotalTime({
      frequency,
      frequencyType,
      duration,
      durationType,
      timeHorizon,
      salary
    });
    
    setTotalTime(result.totalTime);
    setTotalCost(result.totalCost);
    setFormattedTotal(result.formattedTotal);
    setFormattedCost(result.formattedCost);
    setUnit(result.unit);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculated(true);
    performCalculation();
    
    // Limpiar los campos después del cálculo
    setFrequency(0);
    setDuration(0);
    setSalary(0);
  };

  const handleReset = () => {
    setTaskName('');
    setFrequency(1);
    setFrequencyType('day');
    setDuration(15);
    setDurationType('minutes');
    setTimeHorizon('5');
    setSalary(30000);
    setIsCalculated(false);
    setTotalTime(0);
    setTotalCost(0);
    setFormattedTotal('');
    setFormattedCost('');
    setUnit('');
  };

  return (
    <div className="grid gap-8 md:grid-cols-1">
      <Card className="p-6 shadow-md w-[96%] mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Información de la tarea</h2>
        <TaskForm
          taskName={taskName}
          setTaskName={setTaskName}
          frequency={frequency}
          setFrequency={setFrequency}
          frequencyType={frequencyType}
          setFrequencyType={setFrequencyType}
          duration={duration}
          setDuration={setDuration}
          durationType={durationType}
          setDurationType={setDurationType}
          timeHorizon={timeHorizon}
          setTimeHorizon={setTimeHorizon}
          salary={salary}
          setSalary={setSalary}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
        />
      </Card>

      {isCalculated && (
        <ResultDisplay 
          taskName={taskName}
          formattedTotal={formattedTotal}
          unit={unit}
          frequency={frequency}
          frequencyType={frequencyType}
          duration={duration}
          durationType={durationType}
          timeHorizon={timeHorizon}
          formattedCost={formattedCost}
        />
      )}
    </div>
  );
};

export default TaskDurationCalculator;
