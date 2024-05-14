import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import { reorderTodos } from '../../store/slices/todosSlice';
import { motion, AnimatePresence } from 'framer-motion';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.items);
  const filter = useSelector((state: RootState) => state.todos.filter);
  const sortBy = useSelector((state: RootState) => state.todos.sortBy);
  const searchTerm = useSelector((state: RootState) => state.todos.searchTerm);
  const showCompletedTodos = useSelector((state: RootState) => state.settings.showCompletedTodos);


  const filteredAndSortedTodos = useMemo(() => {
    let result = todos.filter(todo => {
      if (!showCompletedTodos && todo.completed) {
        return false;
      }

      const matchesFilter = 
        filter === 'all' || 
        (filter === 'active' && !todo.completed) || 
        (filter === 'completed' && todo.completed);
      
      const matchesSearch = 
        todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesFilter && matchesSearch;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return (a.dueDate || '').localeCompare(b.dueDate || '');
        case 'category':
          return a.category.localeCompare(b.category);
        case 'status':
          return Number(b.completed) - Number(a.completed);
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        default:
          return 0;
      }
    });

    return result;
  }, [todos, filter, sortBy, searchTerm, showCompletedTodos]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    dispatch(reorderTodos({
      startIndex: result.source.index,
      endIndex: result.destination.index
    }));
  };

  if (filteredAndSortedTodos.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        No todos found. Try adjusting your filters or adding a new todo.
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todoList">
        {(provided: DroppableProvided) => (
          <ul 
            {...provided.droppableProps} 
            ref={provided.innerRef}
            className="space-y-2"
          >
            <AnimatePresence>
              {filteredAndSortedTodos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided: DraggableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <motion.li
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <TodoItem {...todo} />
                      </motion.li>
                    </div>
                  )}
                </Draggable>
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;