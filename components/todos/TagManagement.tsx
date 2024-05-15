import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addTag, removeTag } from '../../store/slices/todosSlice';

const TagManagement: React.FC = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state: RootState) => state.todos.tags);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim()) {
      dispatch(addTag(newTag.trim()));
      setNewTag('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Manage Tags</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="New tag name"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mr-2"
        />
        <button
          onClick={handleAddTag}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Add Tag
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-sm flex items-center">
            {tag}
            <button
              onClick={() => dispatch(removeTag(tag))}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagManagement;