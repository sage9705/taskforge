import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Statistics = () => {
  const todos = useSelector((state: RootState) => state.todos.items);

  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  const categoryCounts = todos.reduce((acc, todo) => {
    acc[todo.category] = (acc[todo.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const priorityCounts = todos.reduce((acc, todo) => {
    acc[todo.priority] = (acc[todo.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Todo Status</h3>
          <p>Total: {totalTodos}</p>
          <p>Active: {activeTodos}</p>
          <p>Completed: {completedTodos}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Categories</h3>
          {Object.entries(categoryCounts).map(([category, count]) => (
            <p key={category}>{category}: {count}</p>
          ))}
        </div>
        <div>
          <h3 className="font-semibold mb-2">Priorities</h3>
          <p>Low: {priorityCounts.low || 0}</p>
          <p>Medium: {priorityCounts.medium || 0}</p>
          <p>High: {priorityCounts.high || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;