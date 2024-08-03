import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTodos, saveTodos } from "../../utils/todoStorage";
import { AppThunk } from "../index";

export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  dueDate: string | null;
  priority: "low" | "medium" | "high";
  tags: string[];
  subtasks: Subtask[];
}

interface TodosState {
  items: Todo[];
  filter: "all" | "active" | "completed";
  categories: string[];
  sortBy: "dueDate" | "category" | "status" | "priority";
  searchTerm: string;
  tags: string[];
}

const initialState: TodosState = {
  items: [],
  filter: "all",
  categories: ["Personal", "Work", "Shopping", "Other"],
  sortBy: "dueDate",
  searchTerm: "",
  tags: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<string>) => {
      if (!state.tags.includes(action.payload)) {
        state.tags.push(action.payload);
      }
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.tags = state.tags.filter((tag) => tag !== action.payload);
      state.items.forEach((todo) => {
        todo.tags = todo.tags.filter((tag) => tag !== action.payload);
      });
    },
    addTodoTag: (
      state,
      action: PayloadAction<{ todoId: string; tag: string }>
    ) => {
      const todo = state.items.find(
        (item) => item.id === action.payload.todoId
      );
      if (todo && !todo.tags.includes(action.payload.tag)) {
        todo.tags.push(action.payload.tag);
      }
    },
    removeTodoTag: (
      state,
      action: PayloadAction<{ todoId: string; tag: string }>
    ) => {
      const todo = state.items.find(
        (item) => item.id === action.payload.todoId
      );
      if (todo) {
        todo.tags = todo.tags.filter((tag) => tag !== action.payload.tag);
      }
    },
    addTodo: (state, action: PayloadAction<Omit<Todo, "id" | "completed">>) => {
      state.items.push({
        id: Date.now().toString(),
        completed: false,
        ...action.payload,
      });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateTodo: (
      state,
      action: PayloadAction<Partial<Todo> & { id: string }>
    ) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    setFilter: (
      state,
      action: PayloadAction<"all" | "active" | "completed">
    ) => {
      state.filter = action.payload;
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (cat) => cat !== action.payload
      );
      state.items = state.items.map((todo) =>
        todo.category === action.payload ? { ...todo, category: "Other" } : todo
      );
    },
    setSortBy: (
      state,
      action: PayloadAction<"dueDate" | "category" | "status" | "priority">
    ) => {
      state.sortBy = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    reorderTodos: (
      state,
      action: PayloadAction<{ startIndex: number; endIndex: number }>
    ) => {
      const { startIndex, endIndex } = action.payload;
      const [removed] = state.items.splice(startIndex, 1);
      state.items.splice(endIndex, 0, removed);
    },
    clearCompletedTodos: (state) => {
      state.items = state.items.filter((todo) => !todo.completed);
    },
    setTodoPriority: (
      state,
      action: PayloadAction<{ id: string; priority: "low" | "medium" | "high" }>
    ) => {
      const todo = state.items.find((item) => item.id === action.payload.id);
      if (todo) {
        todo.priority = action.payload.priority;
      }
    },
    addSubtask: (state, action: PayloadAction<{ todoId: string; subtaskText: string }>) => {
      const todo = state.items.find(item => item.id === action.payload.todoId);
      if (todo) {
        todo.subtasks.push({
          id: Date.now().toString(),
          text: action.payload.subtaskText,
          completed: false,
        });
      }
    },
    toggleSubtask: (state, action: PayloadAction<{ todoId: string; subtaskId: string }>) => {
      const todo = state.items.find(item => item.id === action.payload.todoId);
      if (todo) {
        const subtask = todo.subtasks.find(st => st.id === action.payload.subtaskId);
        if (subtask) {
          subtask.completed = !subtask.completed;
        }
      }
    },
    removeSubtask: (state, action: PayloadAction<{ todoId: string; subtaskId: string }>) => {
      const todo = state.items.find(item => item.id === action.payload.todoId);
      if (todo) {
        todo.subtasks = todo.subtasks.filter(st => st.id !== action.payload.subtaskId);
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
  setTodoPriority,
  addSubtask,
  toggleSubtask,
  removeSubtask,
  setTodos,
} = todosSlice.actions;

export const loadTodos = (userId: string): AppThunk => async (dispatch) => {
  try {
    const todos = await getTodos(userId);
    dispatch(setTodos(todos));
  } catch (error) {
    console.error("Failed to load todos:", error);
  }
};

export const saveTodosToStorage = (userId: string): AppThunk => async (_, getState) => {
  try {
    const { todos } = getState();
    await saveTodos(userId, todos.items);
  } catch (error) {
    console.error("Failed to save todos:", error);
  }
};

export default todosSlice.reducer;