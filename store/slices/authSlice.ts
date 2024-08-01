import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { createUser, verifyUser } from '../../utils/userStorage';

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; username: string } | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await createUser(username, password);
      return { id: user.id, username: user.username };
    } catch (error) {
      return rejectWithValue('Registration failed. Username may already exist.');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await verifyUser(username, password);
      if (user) {
        return { id: user.id, username: user.username };
      } else {
        return rejectWithValue('Invalid username or password');
      }
    } catch (error) {
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;