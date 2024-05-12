import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TodoList from '../components/todos/TodoList';
import AddTodoForm from '../components/todos/AddTodoForm';
import TodoFilter from '../components/todos/TodoFilter';
import TodoSort from '../components/todos/TodoSort';
import TodoSearch from '../components/todos/TodoSearch';
import Overview from '../components/dashboard/Overview';

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome, {user}!</h1>
      <Overview />
      <AddTodoForm />
      <TodoSearch />
      <div className="flex justify-between items-center mb-4">
        <TodoFilter />
        <TodoSort />
      </div>
      <TodoList />
    </div>
  );
};

export default Dashboard;