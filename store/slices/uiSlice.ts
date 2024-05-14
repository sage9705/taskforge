import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  darkMode: boolean;
  theme: 'light' | 'dark';
}

const initialState: UIState = {
  darkMode: false,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      state.theme = state.darkMode ? 'dark' : 'light';
    },
  },
});

export const { toggleDarkMode } = uiSlice.actions;
export default uiSlice.reducer;