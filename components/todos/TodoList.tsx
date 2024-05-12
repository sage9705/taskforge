import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { reorderTodos } from '../../store/slices/todosSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.items);
  const filter = useSelector((state: RootState) => state.todos.filter);
  const sortBy = useSelector((state: RootState) => state.todos.sortBy);
  const searchTerm = useSelector((state: RootState) => state.todos.searchTerm);

  const filteredAndSearchedTodos = todos.filter(todo => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && !todo.completed) || 
      (filter === 'completed' && todo.completed);
    
    const matchesSearch = 
      todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const sortedTodos = [...filteredAndSearchedTodos].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return (a.dueDate || '').localeCompare(b.dueDate || '');
    } else if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    } else if (sortBy === 'status') {
      return Number(b.completed) - Number(a.completed);
    }
    return 0;
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    dispatch(reorderTodos({
      startIndex: result.source.index,
      endIndex: result.destination.index
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todoList">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className="mt-4">
            {sortedTodos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoItem {...todo} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;