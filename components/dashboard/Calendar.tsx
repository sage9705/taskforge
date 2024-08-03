import React from 'react';
import { Todo } from '../../store/slices/todosSlice';
import { motion } from 'framer-motion';

interface CalendarProps {
  todos: Todo[];
}

const Calendar: React.FC<CalendarProps> = ({ todos }) => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getTaskCount = (date: Date) => {
    return todos.filter(todo => {
      if (!todo.dueDate) return false;
      const todoDate = new Date(todo.dueDate);
      return todoDate.toDateString() === date.toDateString();
    }).length;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
    >
      <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold">{day}</div>
        ))}
        {Array(firstDayOfMonth).fill(null).map((_, i) => (
          <div key={`empty-${i}`}></div>
        ))}
        {days.map(day => {
          const date = new Date(today.getFullYear(), today.getMonth(), day);
          const taskCount = getTaskCount(date);
          return (
            <motion.div 
              key={day} 
              className={`text-center p-2 rounded-lg ${
                taskCount > 0 ? 'bg-blue-100 dark:bg-blue-900' : ''
              } ${
                today.getDate() === day ? 'border-2 border-blue-500' : ''
              }`}
              whileHover={{ scale: 1.1 }}
            >
              <span className="block">{day}</span>
              {taskCount > 0 && (
                <span className="text-xs font-semibold">{taskCount} task{taskCount > 1 ? 's' : ''}</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Calendar;