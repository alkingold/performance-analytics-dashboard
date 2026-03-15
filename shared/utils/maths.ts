import { AxisDomain } from 'recharts/types/util/types';

export const minMaxRange: AxisDomain = ([min, max]: readonly [
  number,
  number,
]) => {
  const abs = Math.max(Math.abs(min), Math.abs(max));
  return [-abs, abs];
};

export const absMaxFromValues = (values: number[]): number => {
  if (!values.length) return 0;

  const min = Math.min(...values);
  const max = Math.max(...values);

  return Math.max(Math.abs(min), Math.abs(max));
};

export const buildSymmetricDomain = (values: number[]): [number, number] => {
  const absMax = absMaxFromValues(values);
  return [-absMax, absMax];
};

export const formatToKilo = (n: number): string => (n / 1000).toFixed(1);

export const formatToPercent = (n: number): string => (n * 100).toFixed(0);
