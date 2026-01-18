import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CourtType, DurationMin } from '@/src/constants/bookingOptions';

export type BookingDraft = {
  courtType: CourtType | null;
  date: string | null;   // ISO 'YYYY-MM-DD'
  time: string | null;   // 'HH:mm'
  duration: DurationMin | null;
};

export type BookingHistoryItem = {
  id: string;
  courtType: CourtType;
  date: string;     // 'YYYY-MM-DD'
  time: string;     // 'HH:mm'
  duration: DurationMin;
  createdAt: string; // ISO timestamp
  canceledAt?: string; // ISO timestamp
};

export type ConfirmedBooking = {
  courtType: CourtType;
  date: string;
  time: string;
  duration: DurationMin;
  createdAt: string; // ISO timestamp
};

export type BookingState = BookingDraft & {
  confirmedBooking: ConfirmedBooking | null;
  history: BookingHistoryItem[];
};

const initialState: BookingState = {
  courtType: null,
  date: null,
  time: null,
  duration: null,
  confirmedBooking: null,
  history: [],
};

// helper (для порівняння “майбутнє/минуле”)
function toStartMs(date: string, time: string) {
  // локальний час
  return new Date(`${date}T${time}:00`).getTime();
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setCourtType(state, action: PayloadAction<CourtType | null>) {
      state.courtType = action.payload;
    },
    setDate(state, action: PayloadAction<string | null>) {
      state.date = action.payload;
    },
    setTime(state, action: PayloadAction<string | null>) {
      state.time = action.payload;
    },
    setDuration(state, action: PayloadAction<DurationMin | null>) {
      state.duration = action.payload;
    },

    clearAll(state) {
      state.courtType = null;
      state.date = null;
      state.time = null;
      state.duration = null;
    },

    // ✅ підтвердження: записуємо last confirmed + додаємо в history
    confirmBooking(state) {
      if (!state.courtType || !state.date || !state.time || !state.duration) return;

      const nowIso = new Date().toISOString();
      const id = `${state.date}_${state.time}_${Math.random().toString(16).slice(2)}`;

      state.confirmedBooking = {
        courtType: state.courtType,
        date: state.date,
        time: state.time,
        duration: state.duration,
        createdAt: nowIso,
      };

      state.history.unshift({
        id,
        courtType: state.courtType,
        date: state.date,
        time: state.time,
        duration: state.duration,
        createdAt: nowIso,
      });
    },

    clearConfirmed(state) {
      state.confirmedBooking = null;
    },

    // ✅ NEW: скасування (тільки якщо бронювання в майбутньому)
    cancelBooking(state, action: PayloadAction<string>) {
      const id = action.payload;
      const item = state.history.find((b) => b.id === id);
      if (!item) return;
      if (item.canceledAt) return;

      const now = Date.now();
      const start = toStartMs(item.date, item.time);

      if (start <= now) return; // минуле/в процесі — не скасовуємо

      item.canceledAt = new Date().toISOString();
    },
  },
});

export const {
  setCourtType,
  setDate,
  setTime,
  setDuration,
  clearAll,
  confirmBooking,
  clearConfirmed,
  cancelBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
