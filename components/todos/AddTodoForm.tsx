import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, addCategory } from '../../store/slices/todosSlice';
import { RootState } from '../../store';

const AddTodoForm = () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Personal');
  const [newCategory, setNewCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.todos.categories);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo({ text: text.trim(), category, dueDate: dueDate || null }));
      setText('');
      setDueDate('');
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory.trim()));
      setNewCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
      />
      <div className="flex mb-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mr-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex mb-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mr-2"
        />
        <button
          type="button"
          onClick={handleAddCategory}
          className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Add Category
        </button>
      </div>
      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md transition duration-300"
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;