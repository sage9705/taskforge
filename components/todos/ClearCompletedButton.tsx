import { useDispatch } from 'react-redux';
import { clearCompletedTodos } from '../../store/slices/todosSlice';

const ClearCompletedButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(clearCompletedTodos())}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
    >
      Clear Completed
    </button>
  );
};

export default ClearCompletedButton;