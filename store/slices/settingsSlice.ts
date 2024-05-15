import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  reminderTime: number; // Hours before due date
  defaultPriority: 'low' | 'medium' | 'high';
  showCompletedTodos: boolean;
}

const initialState: SettingsState = {
  reminderTime: 24,
  defaultPriority: 'medium',
  showCompletedTodos: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setReminderTime: (state, action: PayloadAction<number>) => {
      state.reminderTime = action.payload;
    },
    setDefaultPriority: (state, action: PayloadAction<'low' | 'medium' | 'high'>) => {
      state.defaultPriority = action.payload;
    },
    setShowCompletedTodos: (state, action: PayloadAction<boolean>) => {
      state.showCompletedTodos = action.payload;
    },
  },
});

export const { setReminderTime, setDefaultPriority, setShowCompletedTodos } = settingsSlice.actions;
export default settingsSlice.reducer;