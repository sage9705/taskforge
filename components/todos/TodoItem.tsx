import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo, updateTodo, setTodoPriority } from '../../store/slices/todosSlice';
import { motion } from 'framer-motion';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  dueDate: string | null;
  priority: 'low' | 'medium' | 'high';
}

const TodoItem = ({ id, text, completed, category, dueDate, priority }: TodoItemProps) => {
  const dispatch = useDispatch();

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTodo({ id, dueDate: e.target.value || null }));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTodoPriority({ id, priority: e.target.value as 'low' | 'medium' | 'high' }));
  };

  const priorityColors = {
    low: 'bg-green-200',
    medium: 'bg-yellow-200',
    high: 'bg-red-200'
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-between py-2 px-4 rounded-md shadow-sm mb-2 ${priorityColors[priority]}`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => dispatch(toggleTodo(id))}
          className="mr-2"
        />
        <span className={completed ? 'line-through text-gray-500' : ''}>{text}</span>
        <span className="ml-2 text-sm text-gray-500">({category})</span>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="date"
          value={dueDate || ''}
          onChange={handleDueDateChange}
          className="px-2 py-1 border border-gray-300 rounded-md text-sm"
        />
        <select
          value={priority}
          onChange={handlePriorityChange}
          className="px-2 py-1 border border-gray-300 rounded-md text-sm"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          onClick={() => dispatch(removeTodo(id))}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </motion.li>
  );
};

export default TodoItem;