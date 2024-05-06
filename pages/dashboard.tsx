import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TodoList from '../components/todos/TodoList';
import AddTodoForm from '../components/todos/AddTodoForm';
import TodoFilter from '../components/todos/TodoFilter';
import Overview from '../components/dashboard/Overview';

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome, {user}!</h1>
      <Overview />
      <AddTodoForm />
      <TodoFilter />
      <TodoList />
    </div>
  );
};

export default Dashboard;