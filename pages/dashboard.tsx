import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TodoList from '../components/todos/TodoList';
import AddTodoForm from '../components/todos/AddTodoForm';
import TodoFilter from '../components/todos/TodoFilter';
import TodoSort from '../components/todos/TodoSort';
import TodoSearch from '../components/todos/TodoSearch';
import ClearCompletedButton from '../components/todos/ClearCompletedButton';
import Statistics from '../components/dashboard/Statistics';
import CategoryManagement from '../components/todos/CategoryManagement';

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Statistics />
          <AddTodoForm />
          <TodoSearch />
          <div className="flex justify-between items-center mb-4">
            <TodoFilter />
            <TodoSort />
          </div>
          <TodoList />
          <div className="mt-4 flex justify-end">
            <ClearCompletedButton />
          </div>
        </div>
        <div>
          <CategoryManagement />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;