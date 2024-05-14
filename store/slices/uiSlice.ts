import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  darkMode: boolean;
  theme: 'light' | 'dark';
  error: string | null;
}

const initialState: UIState = {
  darkMode: false,
  theme: 'light',
  error: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      state.theme = state.darkMode ? 'dark' : 'light';
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { toggleDarkMode, setError, clearError } = uiSlice.actions;
export default uiSlice.reducer;