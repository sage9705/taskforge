import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../../store/slices/todosSlice';
import { RootState } from '../../store';

const TodoSort = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state: RootState) => state.todos.sortBy);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value as 'dueDate' | 'category' | 'status' | 'priority'));
  };

  return (
    <div className="mb-4">
      <label htmlFor="sort" className="mr-2">Sort by:</label>
      <select
        id="sort"
        value={sortBy}
        onChange={handleSortChange}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="dueDate">Due Date</option>
        <option value="category">Category</option>
        <option value="status">Status</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default TodoSort;