export type CourtType = 'Indoor' | 'Outdoor';

export const COURT_TYPES: { label: string; value: CourtType }[] = [
  { label: 'INDOOR', value: 'Indoor' },
  { label: 'OUTDOOR', value: 'Outdoor' },
];

export const DURATIONS: { label: string; value: number }[] = [
  { label: '30', value: 30 },
  { label: '60', value: 60 },
  { label: '90', value: 90 },
  { label: '120', value: 120 },
];

export const TIMES: { label: string; value: string }[] = [
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
];

export const DATES: { label: string; value: string }[] = [
  { label: '2025-11-25', value: '2025-11-25' },
  { label: '2025-11-26', value: '2025-11-26' },
  { label: '2025-11-27', value: '2025-11-27' },
];
