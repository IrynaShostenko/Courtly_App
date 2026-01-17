import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CourtType, DurationMin } from '@/src/constants/bookingOptions';

export type BookingState = {
  courtType: CourtType | null;
  date: string | null;
  time: string | null;
  duration: DurationMin | null;
};

const initialState: BookingState = {
  courtType: null,
  date: null,
  time: null,
  duration: null,
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
  },
});

export const { setCourtType, setDate, setTime, setDuration, clearAll } =
  bookingSlice.actions;

export default bookingSlice.reducer;
