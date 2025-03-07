import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface SubheaderState {
  loading: boolean;
  value: string;
}

const initialState: SubheaderState = {
  loading: false,
  value: '',
};

export const subheaderSlice = createSlice({
  name: 'subheader',
    initialState,
    reducers: {
        setSubheader: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.value = action.payload;
        },
        setLoading: (state) => {
            state.loading = true;
        }
    },
});

export const { setSubheader, setLoading } = subheaderSlice.actions;

export const selectSubheader = (state: RootState) =>
    state?.subheader?.value;
export const selectSubheaderLoading = (state: RootState) =>
  state?.subheader?.loading;


export default subheaderSlice.reducer;
