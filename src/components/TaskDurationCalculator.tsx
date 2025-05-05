import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Timer, Calendar, RefreshCw, Euro } from 'lucide-react';
import ResultDisplay from './ResultDisplay';

type FrequencyType = 'day' | 'week' | 'month' | 'year';
type DurationType = 'seconds' | 'minutes' | 'hours' | 'days';
type TimeHorizon = '1' | '2' | '3' | '4' | '5';

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
      calculateTotalTime();
    }
  }, [frequency, frequencyType, duration, durationType, timeHorizon, salary, isCalculated]);

  const calculateTotalTime = () => {
    // Convert duration to minutes for consistent calculations
    let durationInMinutes = 0;
    
    switch (durationType) {
      case 'seconds':
        durationInMinutes = duration / 60;
        break;
      case 'minutes':
        durationInMinutes = duration;
        break;
      case 'hours':
        durationInMinutes = duration * 60;
        break;
      case 'days':
        durationInMinutes = duration * 24 * 60;
        break;
      default:
        durationInMinutes = duration;
    }
    
    // Calculate occurrences based on frequency type
    let occurrencesPerYear = 0;
    
    switch (frequencyType) {
      case 'day':
        occurrencesPerYear = frequency * 365;
        break;
      case 'week':
        occurrencesPerYear = frequency * 52;
        break;
      case 'month':
        occurrencesPerYear = frequency * 12;
        break;
      case 'year':
        occurrencesPerYear = frequency;
        break;
      default:
        occurrencesPerYear = 0;
    }
    
    // Calculate total minutes over the time horizon
    const years = parseInt(timeHorizon);
    const totalMinutes = durationInMinutes * occurrencesPerYear * years;
    
    // Calculate cost based on salary
    // Formula: (yearly salary / (260 working days * 8 hours * 60 minutes)) * total minutes
    const minuteRate = salary / (260 * 8 * 60);
    const cost = minuteRate * totalMinutes;
    
    setTotalTime(totalMinutes);
    setTotalCost(cost);
    formatTime(totalMinutes);
    setFormattedCost(cost.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }));
  };

  const formatTime = (totalMinutes: number) => {
    if (totalMinutes < 60) {
      // Less than an hour, display in minutes
      setFormattedTotal(totalMinutes.toFixed(0));
      setUnit('minutes');
    } else if (totalMinutes < 24 * 60) {
      // Less than a day, display in hours
      const hours = totalMinutes / 60;
      setFormattedTotal(hours.toFixed(1));
      setUnit('hours');
    } else if (totalMinutes < 7 * 24 * 60) {
      // Less than a week, display in days
      const days = totalMinutes / (24 * 60);
      setFormattedTotal(days.toFixed(1));
      setUnit('days');
    } else if (totalMinutes < 30 * 24 * 60) {
      // Less than a month, display in weeks
      const weeks = totalMinutes / (7 * 24 * 60);
      setFormattedTotal(weeks.toFixed(1));
      setUnit('weeks');
    } else if (totalMinutes < 365 * 24 * 60) {
      // Less than a year, display in months
      const months = totalMinutes / (30 * 24 * 60);
      setFormattedTotal(months.toFixed(1));
      setUnit('months');
    } else {
      // More than a year, display in years
      const years = totalMinutes / (365 * 24 * 60);
      setFormattedTotal(years.toFixed(1));
      setUnit('years');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculated(true);
    calculateTotalTime();
  };

  // Add function to reset all form fields
  const handleReset = () => {
    // Reset all form fields to their initial values
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
      <Card className="p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Task Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="taskName">Task Name (optional)</Label>
              <Input 
                id="taskName"
                placeholder="e.g., Morning Coffee, Social Media"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="frequency"
                    type="number"
                    min="1"
                    value={frequency}
                    onChange={(e) => setFrequency(parseInt(e.target.value) || 1)}
                    className="w-24"
                  />
                  <span className="text-gray-500">times per</span>
                  <Select value={frequencyType} onValueChange={(value) => setFrequencyType(value as FrequencyType)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="year">Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="duration"
                    type="number"
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                    className="w-24"
                  />
                  <Select value={durationType} onValueChange={(value) => setDurationType(value as DurationType)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select time unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seconds">Seconds</SelectItem>
                      <SelectItem value="minutes">Minutes</SelectItem>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeHorizon">Time Horizon</Label>
                <Select value={timeHorizon} onValueChange={(value) => setTimeHorizon(value as TimeHorizon)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time horizon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Year</SelectItem>
                    <SelectItem value="2">2 Years</SelectItem>
                    <SelectItem value="3">3 Years</SelectItem>
                    <SelectItem value="4">4 Years</SelectItem>
                    <SelectItem value="5">5 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Annual Gross Salary (€)</Label>
                <div className="flex items-center">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Euro className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input 
                      id="salary"
                      type="number"
                      min="0"
                      step="1000"
                      value={salary}
                      onChange={(e) => setSalary(parseInt(e.target.value) || 0)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                type="submit" 
                className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Calculate Total Time
              </Button>
              
              <Button 
                type="button"
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleReset}
              >
                <RefreshCw size={16} />
                Reset Form
              </Button>
            </div>
          </div>
        </form>
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
