import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { TimeSpan } from '../../constants/types';

export interface TimeSpanState {
    value: TimeSpan;
}

const initialState: TimeSpanState = {
    value: 'season',
};

export const timeSpanSlice = createSlice({
    name: 'timeSpan',
    initialState,
    reducers: {
        setTimeSpan: (state, action: PayloadAction<TimeSpan>) => {
            state.value = action.payload;
        },
    },
});

export const { setTimeSpan } = timeSpanSlice.actions;

export const selectTimeSpan = (state: RootState) =>
    state?.timeSpan?.value ?? 'season';

export default timeSpanSlice.reducer;
