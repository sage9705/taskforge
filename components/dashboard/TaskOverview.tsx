import React from 'react';
import { Todo } from '../../store/slices/todosSlice';

interface TaskOverviewProps {
  todos: Todo[];
}

const TaskOverview: React.FC<TaskOverviewProps> = ({ todos }) => {
  const urgentTasks = todos.filter(todo => todo.priority === 'high').length;
  const overdueTasks = todos.filter(todo => new Date(todo.dueDate) < new Date()).length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const totalTasks = todos.length;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Task Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-red-100 p-4 rounded-lg">
          <p className="text-lg font-semibold">{urgentTasks}</p>
          <p className="text-sm">Urgent</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <p className="text-lg font-semibold">{overdueTasks}</p>
          <p className="text-sm">Overdue</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-lg font-semibold">{completedTasks}</p>
          <p className="text-sm">Completed</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="text-lg font-semibold">{totalTasks}</p>
          <p className="text-sm">Total</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="bg-gray-200 rounded-full h-4">
          <div 
            className="bg-blue-500 rounded-full h-4"
            style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm mt-2">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </div>
    </div>
  );
};

export default TaskOverview;