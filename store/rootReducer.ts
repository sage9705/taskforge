import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import todosReducer from './slices/todosSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer,
});

export default rootReducer;