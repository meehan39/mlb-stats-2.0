import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { TimeSpan } from '../../constants/types';

// Define a type for the slice state
export interface TimeSpanState {
    value: TimeSpan;
}

// Define the initial state using that type
const initialState: TimeSpanState = {
    value: 'season',
};

export const timeSpanSlice = createSlice({
    name: 'timeSpan',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setTimeSpan: (state, action: PayloadAction<TimeSpan>) => {
            state.value = action.payload;
        },
    },
});

export const { setTimeSpan } = timeSpanSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTimeSpan = (state: RootState) => state.timeSpan.value;

export default timeSpanSlice.reducer;
