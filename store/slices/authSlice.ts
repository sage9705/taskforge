import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../store'; 
import { api } from '../../utils/api';

export interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    clearUser(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const login = (email: string, password: string): AppThunk => async (dispatch) => {
  try {
    const user = await api.users.verify(email, password);
    if (user) {
      dispatch(setUser({ id: user.id, email: user.email, username: user.username }));
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error: any) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const logout = (): AppThunk => (dispatch) => {
  dispatch(clearUser());
};

export const register = (email: string, username: string, password: string): AppThunk => async (dispatch) => {
  try {
    const user = await api.users.create(email, username, password);
    dispatch(setUser({ id: user.id, email: user.email, username: user.username }));
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export default authSlice.reducer;