import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './slices/authSlice';
import todosReducer from './slices/todosSlice';
import uiReducer from './slices/uiSlice';
import settingsReducer from './slices/settingsSlice';
import pomodoroReducer from './slices/pomodoroSlice';
import { loadState, saveState } from '../utils/localStorage';

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer,
  ui: uiReducer,
  settings: settingsReducer,
  pomodoro: pomodoroReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const preloadedState: Partial<RootState> | undefined = loadState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();