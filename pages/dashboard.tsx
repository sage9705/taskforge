import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setSearchTerm, loadTodos, saveTodosToStorage } from '../store/slices/todosSlice';
import TodoList from '../components/todos/TodoList';
import AddTodoForm from '../components/todos/AddTodoForm';
import TaskOverview from '../components/dashboard/TaskOverview';
import Calendar from '../components/dashboard/Calendar';
import SearchBar from '../components/dashboard/SearchBar';
import Analytics from '../components/dashboard/Analytics';
import { motion } from 'framer-motion';
import withAuth from '@/components/withAuth';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const todos = useSelector((state: RootState) => state.todos.items);

  useEffect(() => {
    if (user) {
      dispatch(loadTodos(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      dispatch(saveTodosToStorage(user.id));
    }
  }, [dispatch, user, todos]);

  const handleSearch = (term: string) => {
    dispatch(setSearchTerm(term));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Welcome, {user?.username}!</h1>
        <SearchBar onSearch={handleSearch} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 space-y-8"
        >
          <TaskOverview todos={todos} />
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
            <AddTodoForm />
            <TodoList />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8"
        >
          <Calendar todos={todos} />
          <Analytics todos={todos} />
        </motion.div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);