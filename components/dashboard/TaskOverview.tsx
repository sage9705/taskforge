import React from 'react';
import { Todo } from '../../store/slices/todosSlice';
import { motion } from 'framer-motion';

interface TaskOverviewProps {
  todos: Todo[];
}

const TaskOverview: React.FC<TaskOverviewProps> = ({ todos }) => {
  const urgentTasks = todos.filter(todo => todo.priority === 'high' && !todo.completed).length;
  const overdueTasks = todos.filter(todo => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < new Date();
  }).length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const totalTasks = todos.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
    >
      <h2 className="text-2xl font-semibold mb-4">Task Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
          <p className="text-lg font-semibold">{urgentTasks}</p>
          <p className="text-sm">Urgent</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
          <p className="text-lg font-semibold">{overdueTasks}</p>
          <p className="text-sm">Overdue</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <p className="text-lg font-semibold">{completedTasks}</p>
          <p className="text-sm">Completed</p>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
          <p className="text-lg font-semibold">{totalTasks}</p>
          <p className="text-sm">Total</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Completion Rate</h3>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <motion.div 
            className="bg-blue-500 rounded-full h-4"
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
        </div>
        <p className="text-sm mt-2">
          {completedTasks} of {totalTasks} tasks completed ({completionRate.toFixed(1)}%)
        </p>
      </div>
    </motion.div>
  );
};

export default TaskOverview;