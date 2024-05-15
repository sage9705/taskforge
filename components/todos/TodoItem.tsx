import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTodo, removeTodo, updateTodo, setTodoPriority, addSubtask, toggleSubtask, removeSubtask } from '../../store/slices/todosSlice';
import { motion } from 'framer-motion';
import { Subtask } from '../../store/slices/todosSlice';
import { RootState } from '../../store';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  dueDate: string | null;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  subtasks: Subtask[];
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, category, dueDate, priority, tags, subtasks }) => {
  const dispatch = useDispatch();
  const [newSubtask, setNewSubtask] = useState('');
  const allTags = useSelector((state: RootState) => state.todos.tags);

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      dispatch(addSubtask({ todoId: id, subtaskText: newSubtask.trim() }));
      setNewSubtask('');
    }
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTodo({ id, dueDate: e.target.value || null }));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTodoPriority({ id, priority: e.target.value as 'low' | 'medium' | 'high' }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tag = e.target.value;
    if (tag && !tags.includes(tag)) {
      dispatch(updateTodo({ id, tags: [...tags, tag] }));
    }
  };

  const handleRemoveTag = (tag: string) => {
    dispatch(updateTodo({ id, tags: tags.filter(t => t !== tag) }));
  };

  const priorityColors = {
    low: 'bg-green-200 dark:bg-green-800',
    medium: 'bg-yellow-200 dark:bg-yellow-800',
    high: 'bg-red-200 dark:bg-red-800'
  };

  return (
    <motion.div
      className={`p-4 rounded-lg shadow-md ${priorityColors[priority]}`}
      layout
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => dispatch(toggleTodo(id))}
            className="mr-2"
          />
          <span className={`text-lg ${completed ? 'line-through text-gray-500' : ''}`}>{text}</span>
        </div>
        <button
          onClick={() => dispatch(removeTodo(id))}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <input
          type="date"
          value={dueDate || ''}
          onChange={handleDueDateChange}
          className="px-2 py-1 border border-gray-300 rounded-md text-sm"
        />
        <select
          value={priority}
          onChange={handlePriorityChange}
          className="px-2 py-1 border border-gray-300 rounded-md text-sm"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        {tags.map(tag => (
          <span key={tag} className="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded-full text-xs flex items-center">
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="ml-1 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex items-center mb-2">
        <select
          onChange={handleTagChange}
          className="px-2 py-1 border border-gray-300 rounded-md text-sm mr-2"
        >
          <option value="">Add a tag</option>
          {allTags.filter(tag => !tags.includes(tag)).map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
        <span className="text-sm text-gray-500">{category}</span>
      </div>
      <div className="mt-2">
        <h4 className="font-semibold mb-1">Subtasks:</h4>
        <ul className="space-y-1">
          {subtasks.map(subtask => (
            <li key={subtask.id} className="flex items-center">
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => dispatch(toggleSubtask({ todoId: id, subtaskId: subtask.id }))}
                className="mr-2"
              />
              <span className={subtask.completed ? 'line-through' : ''}>{subtask.text}</span>
              <button
                onClick={() => dispatch(removeSubtask({ todoId: id, subtaskId: subtask.id }))}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
        <div className="flex mt-2">
          <input
            type="text"
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            placeholder="New subtask"
            className="flex-grow px-2 py-1 border border-gray-300 rounded-md text-sm mr-2"
          />
          <button
            onClick={handleAddSubtask}
            className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm"
          >
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoItem;