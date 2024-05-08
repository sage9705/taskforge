import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  dueDate: string | null;
}

interface TodosState {
  items: Todo[];
  filter: 'all' | 'active' | 'completed';
  categories: string[];
}

const initialState: TodosState = {
  items: [],
  filter: 'all',
  categories: ['Personal', 'Work', 'Shopping', 'Other'],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string; category: string; dueDate: string | null }>) => {
      state.items.push({
        id: Date.now().toString(),
        text: action.payload.text,
        category: action.payload.category,
        completed: false,
        dueDate: action.payload.dueDate,
      });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.filter = action.payload;
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    updateTodoDueDate: (state, action: PayloadAction<{ id: string; dueDate: string | null }>) => {
      const todo = state.items.find(item => item.id === action.payload.id);
      if (todo) {
        todo.dueDate = action.payload.dueDate;
      }
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, setFilter, addCategory, updateTodoDueDate } = todosSlice.actions;
export default todosSlice.reducer;