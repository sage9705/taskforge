import React from 'react';
import { Todo } from '../../store/slices/todosSlice';

interface AnalyticsProps {
  todos: Todo[];
}

const Analytics: React.FC<AnalyticsProps> = ({ todos }) => {
  const categoryCounts = todos.reduce((acc, todo) => {
    acc[todo.category] = (acc[todo.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalTasks = todos.length;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
      <div className="space-y-4">
        {Object.entries(categoryCounts).map(([category, count]) => (
          <div key={category}>
            <div className="flex justify-between items-center mb-1">
              <span>{category}</span>
              <span>{((count / totalTasks) * 100).toFixed(1)}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 rounded-full h-2"
                style={{ width: `${(count / totalTasks) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;