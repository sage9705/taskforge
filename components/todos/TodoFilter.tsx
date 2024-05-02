import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/slices/todosSlice';
import { RootState } from '../../store';

const TodoFilter = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.todos.filter);

  return (
    <div className="flex justify-center space-x-4 my-4">
      <button
        className={`px-4 py-2 rounded ${currentFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-200'}`}
        onClick={() => dispatch(setFilter('all'))}
      >
        All
      </button>
      <button
        className={`px-4 py-2 rounded ${currentFilter === 'active' ? 'bg-primary text-white' : 'bg-gray-200'}`}
        onClick={() => dispatch(setFilter('active'))}
      >
        Active
      </button>
      <button
        className={`px-4 py-2 rounded ${currentFilter === 'completed' ? 'bg-primary text-white' : 'bg-gray-200'}`}
        onClick={() => dispatch(setFilter('completed'))}
      >
        Completed
      </button>
    </div>
  );
};

export default TodoFilter;