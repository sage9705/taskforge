import React from 'react';
import { Todo } from '../../store/slices/todosSlice';
import { motion } from 'framer-motion';

interface AnalyticsProps {
  todos: Todo[];
}

const Analytics: React.FC<AnalyticsProps> = ({ todos }) => {
  const categoryCounts = todos.reduce((acc, todo) => {
    acc[todo.category] = (acc[todo.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const priorityCounts = todos.reduce((acc, todo) => {
    acc[todo.priority] = (acc[todo.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalTasks = todos.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
    >
      <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          <div className="space-y-2">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <div key={category}>
                <div className="flex justify-between items-center mb-1">
                  <span>{category}</span>
                  <span>{((count / totalTasks) * 100).toFixed(1)}%</span>
                </div>
                <motion.div 
                  className="bg-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(count / totalTasks) * 100}%` }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Priorities</h3>
          <div className="space-y-2">
            {['high', 'medium', 'low'].map(priority => (
              <div key={priority}>
                <div className="flex justify-between items-center mb-1">
                  <span className="capitalize">{priority}</span>
                  <span>{((priorityCounts[priority] || 0) / totalTasks * 100).toFixed(1)}%</span>
                </div>
                <motion.div 
                  className={`h-2 rounded-full ${
                    priority === 'high' ? 'bg-red-500' :
                    priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${((priorityCounts[priority] || 0) / totalTasks) * 100}%` }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;