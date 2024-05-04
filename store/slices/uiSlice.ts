import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  error: string | null;
}

const initialState: UIState = {
  error: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setError } = uiSlice.actions;
export default uiSlice.reducer;