import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo } from '../../store/slices/todosSlice';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
}

const TodoItem = ({ id, text, completed }: TodoItemProps) => {
  const dispatch = useDispatch();

  return (
    <li className="flex items-center justify-between py-2 border-b">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => dispatch(toggleTodo(id))}
          className="mr-2"
        />
        <span className={completed ? 'line-through text-gray-500' : ''}>{text}</span>
      </div>
      <button
        onClick={() => dispatch(removeTodo(id))}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;