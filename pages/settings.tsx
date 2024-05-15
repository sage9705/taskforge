import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setReminderTime, setDefaultPriority, setShowCompletedTodos } from '../store/slices/settingsSlice';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const { reminderTime, defaultPriority, showCompletedTodos } = useSelector((state: RootState) => state.settings);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="reminderTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Reminder Time (hours before due date)
          </label>
          <input
            type="number"
            id="reminderTime"
            value={reminderTime}
            onChange={(e) => dispatch(setReminderTime(parseInt(e.target.value)))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="defaultPriority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Default Priority
          </label>
          <select
            id="defaultPriority"
            value={defaultPriority}
            onChange={(e) => dispatch(setDefaultPriority(e.target.value as 'low' | 'medium' | 'high'))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showCompletedTodos}
              onChange={(e) => dispatch(setShowCompletedTodos(e.target.checked))}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show Completed Todos</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;