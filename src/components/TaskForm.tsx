
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Euro } from 'lucide-react';
import { DurationType, FrequencyType, TimeHorizon } from '@/types/calculator';

interface TaskFormProps {
  taskName: string;
  setTaskName: (value: string) => void;
  frequency: number;
  setFrequency: (value: number) => void;
  frequencyType: FrequencyType;
  setFrequencyType: (value: FrequencyType) => void;
  duration: number;
  setDuration: (value: number) => void;
  durationType: DurationType;
  setDurationType: (value: DurationType) => void;
  timeHorizon: TimeHorizon;
  setTimeHorizon: (value: TimeHorizon) => void;
  salary: number;
  setSalary: (value: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleReset: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  taskName,
  setTaskName,
  frequency,
  setFrequency,
  frequencyType,
  setFrequencyType,
  duration,
  setDuration,
  durationType,
  setDurationType,
  timeHorizon,
  setTimeHorizon,
  salary,
  setSalary,
  handleSubmit,
  handleReset
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="taskName">Task Name (optional)</Label>
          <Input 
            id="taskName"
            placeholder="e.g., Manual lead qualification, client onboarding, ..."
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
  );
};

export default TaskForm;
