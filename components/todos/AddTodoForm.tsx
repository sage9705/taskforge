import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/slices/todosSlice';

const AddTodoForm = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text.trim()));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="mt-2 bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md transition duration-300"
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;