import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo } from '../../store/slices/todosSlice';
import { motion } from 'framer-motion';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

const TodoItem = ({ id, text, completed, category }: TodoItemProps) => {
  const dispatch = useDispatch();

  return (
    <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between py-2 border-b"
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
      <button
        onClick={() => dispatch(removeTodo(id))}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </motion.li>
  );
};

export default TodoItem;