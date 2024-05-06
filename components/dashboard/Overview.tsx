import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Overview = () => {
  const todos = useSelector((state: RootState) => state.todos.items);

  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-primary">{totalTodos}</p>
          <p className="text-gray-600">Total Todos</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-green-500">{completedTodos}</p>
          <p className="text-gray-600">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-yellow-500">{activeTodos}</p>
          <p className="text-gray-600">Active</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;