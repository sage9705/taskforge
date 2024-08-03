import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TodoList from '../components/todos/TodoList';
import AddTodoForm from '../components/todos/AddTodoForm';
import TaskOverview from '../components/dashboard/TaskOverview';
import Calendar from '../components/dashboard/Calendar';
import SearchBar from '../components/dashboard/SearchBar';
import Analytics from '../components/dashboard/Analytics';

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const todos = useSelector((state: RootState) => state.todos.items);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Welcome, {user?.username}!</h1>
        <SearchBar onSearch={setSearchTerm} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <TaskOverview todos={todos} />
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
            <AddTodoForm />
            <TodoList searchTerm={searchTerm} />
          </div>
        </div>
        <div className="space-y-8">
          <Calendar todos={todos} />
          <Analytics todos={todos} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;