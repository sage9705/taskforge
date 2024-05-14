import { createSlice } from '@reduxjs/toolkit';

interface PomodoroState {
  isRunning: boolean;
  timeLeft: number;
  sessionType: 'work' | 'break';
}

const initialState: PomodoroState = {
  isRunning: false,
  timeLeft: 25 * 60, // 25 minutes
  sessionType: 'work',
};

const pomodoroSlice = createSlice({
  name: 'pomodoro',
  initialState,
  reducers: {
    startTimer: (state) => {
      if (state.timeLeft > 0) {
        state.isRunning = true;
        state.timeLeft -= 1;
      }
    },
    stopTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.isRunning = false;
      state.timeLeft = state.sessionType === 'work' ? 25 * 60 : 5 * 60;
      state.sessionType = state.sessionType === 'work' ? 'break' : 'work';
    },
  },
});

export const { startTimer, stopTimer, resetTimer } = pomodoroSlice.actions;
export default pomodoroSlice.reducer;