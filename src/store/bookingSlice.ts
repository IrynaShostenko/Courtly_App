import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CourtType, DurationMin } from '@/src/constants/bookingOptions';

export type BookingDraft = {
  courtType: CourtType | null;
  date: string | null;   // ISO 'YYYY-MM-DD'
  time: string | null;   // 'HH:mm'
  duration: DurationMin | null;
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
};

const initialState: BookingState = {
  courtType: null,
  date: null,
  time: null,
  duration: null,
  confirmedBooking: null,
};

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

    // ✅ підтвердження бронювання (зберігаємо “останнє підтверджене”)
    confirmBooking(state) {
      if (!state.courtType || !state.date || !state.time || !state.duration) return;

      state.confirmedBooking = {
        courtType: state.courtType,
        date: state.date,
        time: state.time,
        duration: state.duration,
        createdAt: new Date().toISOString(),
      };
    },

    clearConfirmed(state) {
      state.confirmedBooking = null;
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
} = bookingSlice.actions;

export default bookingSlice.reducer;
