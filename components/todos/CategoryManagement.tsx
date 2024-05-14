import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addCategory, removeCategory } from '../../store/slices/todosSlice';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.todos.categories);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory.trim()));
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (category: string) => {
    if (category !== 'Other') {
      dispatch(removeCategory(category));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mr-2"
        />
        <button
          onClick={handleAddCategory}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Add Category
        </button>
      </div>
      <ul>
        {categories.map(category => (
          <li key={category} className="flex justify-between items-center mb-2">
            <span>{category}</span>
            {category !== 'Other' && (
              <button
                onClick={() => handleRemoveCategory(category)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;