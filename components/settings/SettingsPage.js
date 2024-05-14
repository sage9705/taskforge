import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme, setReminderTime, setDefaultPriority, setShowCompletedTodos } from '../../store/slices/settingsSlice';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="mb-4">
        <label className="block mb-2">Theme</label>
        <select
          value={settings.theme}
          onChange={(e) => dispatch(setTheme(e.target.value))}
          className="w-full p-2 border rounded"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Reminder Time (hours before due date)</label>
        <input
          type="number"
          value={settings.reminderTime}
          onChange={(e) => dispatch(setReminderTime(Number(e.target.value)))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Default Priority</label>
        <select
          value={settings.defaultPriority}
          onChange={(e) => dispatch(setDefaultPriority(e.target.value))}
          className="w-full p-2 border rounded"
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
            checked={settings.showCompletedTodos}
            onChange={(e) => dispatch(setShowCompletedTodos(e.target.checked))}
            className="mr-2"
          />
          Show Completed Todos
        </label>
      </div>
    </div>
  );
};

export default SettingsPage;