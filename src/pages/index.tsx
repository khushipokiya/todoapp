import Link from 'next/link';
import TodoForm from '../components/TodoForm';
import TodosPage from './todo';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Todo App</h1>
      <TodoForm />
      <div className="mt-4">
   <TodosPage/>
      </div>
    </div>
  );
};

export default Home;
