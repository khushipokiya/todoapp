import { useState } from 'react';
import { useAddTodoMutation } from '../store/slices/apiSlice';

const TodoForm = () => {
  const [text, setText] = useState('');
  const [status] = useState< 'todo' | 'inProgress' | 'done'>('todo'); 
  const [addTodo] = useAddTodoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim() === '') {
      return;
    }
    try {
      await addTodo({ text, status }).unwrap();
      setText('');
      console.log('Todo added successfully');
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border rounded p-2 mr-2"
        placeholder="Todo Name"
      />
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
