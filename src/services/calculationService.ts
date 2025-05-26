// Datos:
// 250 días laborables al año
// 8 horas laborables por día
// 20.8 dias laborables por mes
// 5 días laborables por semana
// 50 semanas laborables al año

import { CalculationParams, CalculationResult, DurationType, FrequencyType } from "@/types/calculator";

export const calculateTotalTime = (params: CalculationParams): CalculationResult => {
  const { frequency, frequencyType, duration, durationType, timeHorizon, hourlyRate } = params;
  
  // Convert duration to minutes for consistent calculations
  let durationInMinutes = convertToMinutes(duration, durationType);
  
  // Calculate occurrences based on frequency type
  const occurrencesPerYear = calculateOccurrencesPerYear(frequency, frequencyType);
  
  // Calculate total minutes over the time horizon
  const years = parseInt(timeHorizon);
  const totalMinutes = durationInMinutes * occurrencesPerYear * years;
  
  // Calculate cost based on hourly rate
  // Convert hourly rate to minute rate
  const minuteRate = hourlyRate / 60;
  const cost = totalMinutes * minuteRate;

  // Format time display
  const { formattedTotal, unit } = formatTime(totalMinutes);
  const formattedCost = cost.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
  
  return {
    totalTime: totalMinutes,
    totalCost: cost,
    formattedTotal,
    formattedCost,
    unit
  };
};

const convertToMinutes = (duration: number, durationType: DurationType): number => {
  switch (durationType) {
    case 'seconds':
      return duration / 60;
    case 'minutes':
      return duration;
    case 'hours':
      return duration * 60;
    case 'days':
      return duration * 24 * 60;
    default:
      return duration;
  }
};

const calculateOccurrencesPerYear = (frequency: number, frequencyType: FrequencyType): number => {
  switch (frequencyType) {
    case 'day':
      return frequency * 250; // Changed from 365 to 250 working days per year
    case 'week':
      return frequency * 50; // Changed from 52 to 50 (250 days / 5 days per week)
    case 'month':
      return frequency * 12;
    case 'year':
      return frequency;
    default:
      return 0;
  }
};

export const formatTime = (totalMinutes: number): { formattedTotal: string, unit: string } => {
  if (totalMinutes < 60) {
    // Less than an hour, display in minutes
    return { formattedTotal: totalMinutes.toFixed(0), unit: 'minutes' };
  } else if (totalMinutes < 8 * 60) {
    // Less than a day, display in hours
    const hours = totalMinutes / 60;
    return { formattedTotal: hours.toFixed(1), unit: 'hours' };
  } else if (totalMinutes < 7 * 8 * 60) {
    // Less than a week, display in days
    const days = totalMinutes / (8 * 60); // Converting to working days (8 hours per day)
    return { formattedTotal: days.toFixed(1), unit: 'days' };
  } else if (totalMinutes < 20.8 * 8 * 60) {
    // Less than a month, display in weeks
    const weeks = totalMinutes / (5 * 8 * 60);
    return { formattedTotal: weeks.toFixed(1), unit: 'weeks' };
  } else if (totalMinutes < 250 * 8 * 60) {
    // Less than a year, display in months
    const months = totalMinutes / (20.8 * 8 * 60);
    return { formattedTotal: months.toFixed(1), unit: 'months' };
  } else {
    // More than a year, display in years
    const years = totalMinutes / (250 * 8 * 60);
    return { formattedTotal: years.toFixed(1), unit: 'years' };
  }
};
