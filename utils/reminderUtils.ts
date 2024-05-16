import { Todo } from '../store/slices/todosSlice';

export const checkDueReminders = (todos: Todo[], reminderTime: number): Todo[] => {
  const now = new Date();
  const reminderThreshold = new Date(now.getTime() + reminderTime * 60 * 60 * 1000);

  return todos.filter(todo => {
    if (!todo.dueDate || todo.completed) return false;
    const dueDate = new Date(todo.dueDate);
    return dueDate > now && dueDate <= reminderThreshold;
  });
};