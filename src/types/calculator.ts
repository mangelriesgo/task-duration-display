
export type FrequencyType = 'day' | 'week' | 'month' | 'year';
export type DurationType = 'seconds' | 'minutes' | 'hours' | 'days';
export type TimeHorizon = '1' | '2' | '3' | '4' | '5';

export interface CalculationResult {
  totalTime: number;
  totalCost: number;
  formattedTotal: string;
  formattedCost: string;
  unit: string;
}

export interface CalculationParams {
  frequency: number;
  frequencyType: FrequencyType;
  duration: number;
  durationType: DurationType;
  timeHorizon: TimeHorizon;
  hourlyRate: number;
}
