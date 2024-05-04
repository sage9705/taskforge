import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import todosReducer from './slices/todosSlice';
import uiReducer from './slices/uiSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer,
  ui: uiReducer,
});

export default rootReducer;