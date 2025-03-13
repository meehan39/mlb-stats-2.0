import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface SubheaderState {
  value: string | JSX.Element | null;
}

const initialState: SubheaderState = {
  value: null,
};

export const subheaderSlice = createSlice({
  name: 'subheader',
  initialState,
  reducers: {
    setSubheader: (
      state,
      action: PayloadAction<string | JSX.Element | null>,
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setSubheader } = subheaderSlice.actions;

export const selectSubheader = (state: RootState) => state?.subheader?.value;


export default subheaderSlice.reducer;
