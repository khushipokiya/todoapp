import { useGetTodosQuery, useUpdateTodoMutation, useDeleteTodoMutation, Todo } from '../store/slices/apiSlice';

const TodosPage = () => {
  const { data: todos = [] } = useGetTodosQuery();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  console.log("Fetched todos:", todos); // Check if data is being fetched correctly

  // Filter todos based on their status
  const inProgressTodos = todos.filter(todo => todo.status === 'inProgress');
  const doneTodos = todos.filter(todo => todo.status === 'done');

  // Handle todo completion
  const handleComplete = async (todo:Todo) => {
    try {
      await updateTodo({ ...todo, status: 'done' }).unwrap();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  // Handle todo deletion
  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id).unwrap();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-semibold mb-6 text-gray-800">Todos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


        {/* In Progress Todos */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-medium text-gray-700 mb-4">In Progress</h2>
          {inProgressTodos.length > 0 ? (
            inProgressTodos.map(todo => (
              <div key={todo.id} className="flex items-center justify-between mb-4 p-4 border border-gray-200 rounded-lg shadow-sm">
                <span className="text-lg">{todo.text}</span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleComplete(todo)}
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
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No in-progress todos</p>
          )}
        </div>

        {/* Done Todos */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-medium text-gray-700 mb-4">Done</h2>
          {doneTodos.length > 0 ? (
            doneTodos.map(todo => (
              <div key={todo.id} className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm">
                <span className="text-lg">{todo.text}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No completed todos</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodosPage;
