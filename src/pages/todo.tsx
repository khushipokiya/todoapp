import React, { useState } from 'react';
import { useGetTodosQuery, useUpdateTodoMutation, useDeleteTodoMutation, Todo } from '../store/slices/apiSlice';

const TodosPage = () => {
  const { data: todos = [] } = useGetTodosQuery();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [draggedTodo, setDraggedTodo] = useState<Todo | null>(null);

  const handleMoveTodo = async (todo: Todo, newStatus: Todo['status']) => {
    try {
      await updateTodo({ ...todo, status: newStatus }).unwrap();
    } catch (error) {
      console.error('Failed to update todo status:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id).unwrap();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const onDragStart = (todo: Todo) => {
    setDraggedTodo(todo);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDrop = async (status: Todo['status']) => {
    if (draggedTodo && draggedTodo.status !== status) {
      await handleMoveTodo(draggedTodo, status);
      setDraggedTodo(null);
    }
  };

  const columns = {
    todo: todos.filter(todo => todo.status === 'todo'),
    inProgress: todos.filter(todo => todo.status === 'inProgress'),
    done: todos.filter(todo => todo.status === 'done'),
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-semibold mb-6 text-gray-800">Todos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(columns).map(([status, todos]) => (
          <div
            key={status}
            onDragOver={onDragOver}
            onDrop={() => onDrop(status as Todo['status'])}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <h2 className="text-2xl font-medium text-gray-700 mb-4 capitalize">{status}</h2>
            {todos.length > 0 ? (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  draggable
                  onDragStart={() => onDragStart(todo)}
                  className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm"
                >
                  <span className="text-lg">{todo.text}</span>
                  {status !== 'done' && (
                    <div className="mt-2 flex space-x-2">
                      {status === 'todo' && (
                        <button
                          onClick={() => handleMoveTodo(todo, 'inProgress')}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-200"
                        >
                          Start
                        </button>
                      )}
                      {status === 'inProgress' && (
                        <>
                          <button
                            onClick={() => handleMoveTodo(todo, 'done')}
                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-200"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => handleDelete(todo.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No {status} todos</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodosPage;
