import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  error: string | null;
  theme: 'light' | 'dark';
}

const initialState: UIState = {
  error: null,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const { setError, setTheme } = uiSlice.actions;
export default uiSlice.reducer;