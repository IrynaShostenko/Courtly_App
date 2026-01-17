export type CourtType = 'Indoor' | 'Outdoor';
export type DurationMin = 30 | 60 | 90 | 120;

type Option<T> = {
  label: string;
  value: T;
};

export const COURT_TYPES: readonly Option<CourtType>[] = [
  { label: 'INDOOR', value: 'Indoor' },
  { label: 'OUTDOOR', value: 'Outdoor' },
] as const;


export const DATES: readonly Option<string>[] = [
  { label: '2025-11-19', value: '2025-11-19' },
  { label: '2025-11-20', value: '2025-11-20' },
  { label: '2025-11-21', value: '2025-11-21' },
  { label: '2025-11-22', value: '2025-11-22' },
  { label: '2025-11-25', value: '2025-11-25' },
] as const;

export const TIMES: readonly Option<string>[] = [
  { label: '09:00', value: '09:00' },
  { label: '10:00', value: '10:00' },
  { label: '10:30', value: '10:30' },
  { label: '11:00', value: '11:00' },
  { label: '12:30', value: '12:30' },
  { label: '13:00', value: '13:00' },
  { label: '14:30', value: '14:30' },
  { label: '15:00', value: '15:00' },
  { label: '16:30', value: '16:30' },
  { label: '19:00', value: '19:00' },
] as const;

export const DURATIONS: readonly Option<DurationMin>[] = [
  { label: '30', value: 30 },
  { label: '60', value: 60 },
  { label: '90', value: 90 },
  { label: '120', value: 120 },
] as const;
