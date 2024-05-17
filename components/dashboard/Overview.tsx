import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Overview: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.items);

  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const highPriorityTodos = todos.filter(todo => todo.priority === 'high').length;
  const upcomingTodos = todos.filter(todo => {
    if (!todo.dueDate) return false;
    const dueDate = new Date(todo.dueDate);
    const today = new Date();
    const threeDaysFromNow = new Date(today.setDate(today.getDate() + 3));
    return dueDate <= threeDaysFromNow;
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Total Todos</h3>
        <p className="text-3xl font-bold">{totalTodos}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Completed</h3>
        <p className="text-3xl font-bold">{completedTodos}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">High Priority</h3>
        <p className="text-3xl font-bold">{highPriorityTodos}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Due in 3 Days</h3>
        <p className="text-3xl font-bold">{upcomingTodos}</p>
      </div>
    </div>
  );
};

export default Overview;