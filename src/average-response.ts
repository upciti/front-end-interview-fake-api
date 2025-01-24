import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsObject, ValidateNested } from 'class-validator';

export const dayOfWeekValues = [1, 2, 3, 4, 5, 6, 7] as const;
export type DayOfWeek = (typeof dayOfWeekValues)[number];

export const hourOfDayValues = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
] as const;
export type HourOfDay = (typeof hourOfDayValues)[number];

const hourOfDayProperties = hourOfDayValues.reduce<Record<string, any>>((acc, hour) => {
  acc[hour.toString(10)] = { type: 'number', additionalProperties: false };
  return acc;
}, {});

const dayOfWeekProperties = dayOfWeekValues.reduce<Record<string, any>>((acc, hour) => {
  acc[hour.toString(10)] = { type: 'number', additionalProperties: false };
  return acc;
}, {});

export class TimeValue {
  @ApiProperty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsDateString()
  time: string;
}

export class AverageResponse {
  @ApiProperty({
    description: 'The overall average value across all hours.',
  })
  @IsNumber()
  overallHourlyAverage: number;

  @ApiProperty({
    type: 'object',
    properties: hourOfDayProperties,
    additionalProperties: false,
    description: 'A dictionary mapping each hour (0-23) to its average value.',
  })
  @IsObject()
  hourlyAverages: Record<HourOfDay, number>;

  @ApiProperty({
    type: 'object',
    properties: dayOfWeekProperties,
    additionalProperties: false,
    description: 'A dictionary mapping each day of the week (1=Monday, 7=Sunday) to its average hourly value.',
  })
  @IsObject()
  hourlyAveragesByWeekday: Record<DayOfWeek, number>;

  @ApiProperty({
    description: 'The time and value of the hour with the highest average.',
  })
  @ValidateNested()
  hourWithHighestAverage: TimeValue;

  @ApiProperty({
    description: 'The time and value of the hour with the lowest average.',
  })
  @ValidateNested()
  hourWithLowestAverage: TimeValue;
}
