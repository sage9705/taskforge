import React from 'react';
import { Todo } from '../../store/slices/todosSlice';

interface CalendarProps {
  todos: Todo[];
}

const Calendar: React.FC<CalendarProps> = ({ todos }) => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
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
          const hasTasks = todos.some(todo => {
            if (!todo.dueDate) return false;
            const todoDate = new Date(todo.dueDate);
            return todoDate.toDateString() === date.toDateString();
          });
          return (
            <div 
              key={day} 
              className={`text-center p-2 rounded-full ${
                hasTasks ? 'bg-blue-100' : ''
              } ${
                today.getDate() === day ? 'border-2 border-blue-500' : ''
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;