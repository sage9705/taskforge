import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  dueDate: string | null;
  priority: 'low' | 'medium' | 'high';
}

interface TodosState {
  items: Todo[];
  filter: 'all' | 'active' | 'completed';
  categories: string[];
  sortBy: 'dueDate' | 'category' | 'status' | 'priority';
  searchTerm: string;
}

const initialState: TodosState = {
  items: [],
  filter: 'all',
  categories: ['Personal', 'Work', 'Shopping', 'Other'],
  sortBy: 'dueDate',
  searchTerm: '',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, 'id' | 'completed'>>) => {
      state.items.push({
        id: Date.now().toString(),
        completed: false,
        ...action.payload,
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
    updateTodo: (state, action: PayloadAction<Partial<Todo> & { id: string }>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.filter = action.payload;
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(cat => cat !== action.payload);
      state.items = state.items.map(todo => 
        todo.category === action.payload ? { ...todo, category: 'Other' } : todo
      );
    },
    setSortBy: (state, action: PayloadAction<'dueDate' | 'category' | 'status' | 'priority'>) => {
      state.sortBy = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    reorderTodos: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
      const { startIndex, endIndex } = action.payload;
      const [removed] = state.items.splice(startIndex, 1);
      state.items.splice(endIndex, 0, removed);
    },
    clearCompletedTodos: (state) => {
      state.items = state.items.filter(todo => !todo.completed);
    },
    setTodoPriority: (state, action: PayloadAction<{ id: string; priority: 'low' | 'medium' | 'high' }>) => {
      const todo = state.items.find(item => item.id === action.payload.id);
      if (todo) {
        todo.priority = action.payload.priority;
      }
    },
  },
});

export const { 
  addTodo,
  toggleTodo,
  removeTodo,
  updateTodo,
  setFilter,
  addCategory,
  removeCategory,
  setSortBy,
  setSearchTerm,
  reorderTodos,
  clearCompletedTodos,
  setTodoPriority
} = todosSlice.actions;

export default todosSlice.reducer;