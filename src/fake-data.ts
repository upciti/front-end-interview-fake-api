import { faker } from '@faker-js/faker';
import { plainToInstance } from 'class-transformer';

import { AverageResponse, DayOfWeek, dayOfWeekValues, HourOfDay, hourOfDayValues } from './average-response';

const randomFloat = (min: number, max: number): number => faker.number.float({ min, max, fractionDigits: 3 });

const buildDateTimeString = (refDate: Date, weekday: number, hour: number): string => {
  const baseDate = new Date(refDate);
  baseDate.setDate(baseDate.getDate() + (weekday - 1));
  baseDate.setHours(hour);
  return baseDate.toISOString();
};

export const dayMultipliers: Record<DayOfWeek, number> = {
  1: randomFloat(0.9, 1.1),
  2: randomFloat(1.0, 1.2),
  3: randomFloat(0.9, 1.1),
  4: randomFloat(0.9, 1.1),
  5: randomFloat(1.2, 1.4),
  6: randomFloat(1.1, 1.3),
  7: randomFloat(0.7, 0.9),
};

export const hourMultipliers: Record<HourOfDay, number> = {} as Record<HourOfDay, number>;

for (const hour of hourOfDayValues) {
  let [min, max] = [0.4, 0.8]; // default range if you want a baseline

  if (hour < 6) {
    // Midnight to 5 AM
    [min, max] = [0.2, 0.4];
  } else if (hour < 10) {
    // 6 AM to 9 AM
    [min, max] = [0.6, 1.2];
  } else if (hour < 16) {
    // 10 AM to 3 PM
    [min, max] = [0.8, 1.2];
  } else if (hour < 20) {
    // 4 PM to 7 PM
    [min, max] = [1.2, 1.4];
  }
  // 8 PM to 11 PM => keep the default [0.4, 0.8] or adjust if you wish

  hourMultipliers[hour] = randomFloat(min, max);
}

type HourData = {
  value: number;
  weekday: DayOfWeek;
  hour: HourOfDay;
};

export const generateFakeAverageResponse = (): AverageResponse => {
  const globalMultiplier = randomFloat(0.5, 1.5);
  const weekData: HourData[] = [];

  for (const day of dayOfWeekValues) {
    for (const hour of hourOfDayValues) {
      const baseValue = randomFloat(10, 100);
      const value = baseValue * globalMultiplier * dayMultipliers[day] * hourMultipliers[hour];
      weekData.push({ value, weekday: day, hour });
    }
  }

  const totalValue = weekData.reduce((acc, data) => acc + data.value, 0);
  const overallCount = weekData.length;
  const overallHourlyAverage = totalValue / overallCount;

  const hourlySums = new Array(24).fill(0);
  const hourlyCounts = new Array(24).fill(0);

  weekData.forEach(data => {
    hourlySums[data.hour] += data.value;
    hourlyCounts[data.hour] += 1;
  });

  const hourlyAverages: Record<number, number> = {};
  for (let h = 0; h < 24; h++) {
    hourlyAverages[h] = hourlySums[h] / hourlyCounts[h];
  }

  const daySums: Record<DayOfWeek, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
  weekData.forEach(data => {
    daySums[data.weekday] += data.value;
  });

  const hourlyAveragesByWeekday: Record<DayOfWeek, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
  for (const d of dayOfWeekValues) {
    hourlyAveragesByWeekday[d] = daySums[d] / 24;
  }

  let hourWithHighest = weekData[0];
  let hourWithLowest = weekData[0];

  weekData.forEach(data => {
    if (data.value > hourWithHighest.value) hourWithHighest = data;
    if (data.value < hourWithLowest.value) hourWithLowest = data;
  });

  const refDate = faker.date.past();
  refDate.setHours(0, 0, 0, 0);
  const highestTime = buildDateTimeString(refDate, hourWithHighest.weekday, hourWithHighest.hour);
  const lowestTime = buildDateTimeString(refDate, hourWithLowest.weekday, hourWithLowest.hour);
  const parseFloatThreeDigits = (value: number): number => parseFloat(value.toFixed(3));

  return plainToInstance(AverageResponse, {
    overallHourlyAverage: parseFloatThreeDigits(overallHourlyAverage),
    hourlyAverages: hourOfDayValues.reduce(
      (acc, d) => {
        acc[d] = parseFloatThreeDigits(hourlyAverages[d]);
        return acc;
      },
      {} as Record<HourOfDay, number>,
    ),
    hourlyAveragesByWeekday: dayOfWeekValues.reduce(
      (acc, d) => {
        acc[d] = parseFloatThreeDigits(hourlyAveragesByWeekday[d]);
        return acc;
      },
      {} as Record<DayOfWeek, number>,
    ),
    hourWithHighestAverage: {
      value: parseFloatThreeDigits(hourWithHighest.value),
      time: highestTime,
    },
    hourWithLowestAverage: {
      value: parseFloatThreeDigits(hourWithLowest.value),
      time: lowestTime,
    },
  });
};
