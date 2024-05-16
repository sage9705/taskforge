import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, addCategory } from '../../store/slices/todosSlice';
import { RootState } from '../../store';

const AddTodoForm: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.todos.categories);
  const tags = useSelector((state: RootState) => state.todos.tags);
  const defaultPriority = useSelector((state: RootState) => state.settings.defaultPriority);
  
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(defaultPriority);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo({
        text: text.trim(),
        category,
        dueDate: dueDate || null,
        priority,
        tags: selectedTags
      }));
      setText('');
      setDueDate('');
      setPriority(defaultPriority);
      setSelectedTags([]);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory.trim()));
      setCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
      />
      <div className="grid grid-cols-2 gap-2 mb-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(tag => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagToggle(tag)}
            className={`px-2 py-1 rounded-full text-xs ${
              selectedTags.includes(tag) 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleAddCategory}
          className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Add Category
        </button>
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;