import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../store/slices/todosSlice';
import { RootState } from '../../store';

const TodoSearch = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.todos.searchTerm);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search todos..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};

export default TodoSearch;