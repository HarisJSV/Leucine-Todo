import { useState, useEffect } from 'react';
import { getTodos,deleteTodo,updateTodo } from "./api";
import toast, { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation/Navigation';
import Complete from './components/Complete/Complete';
import Incomplete from './components/Incomplete/Incomplete';
import TodoDashboard from './components/TodoDashboard/TodoDashboard';

function App() {
  const [todos, setTodos] = useState([]);
  const [active, setActive] = useState(1);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
    toast.success("Task deleted!");
  };

  const handleToggle = async (id, completed) => {
    await updateTodo(id, !completed);
    fetchTodos();
    toast.success(completed ? "Marked incomplete" : "Marked complete");
  };

  useEffect(() => {
    fetchTodos();
  }, [active]);

  const displayData = () => {
    switch (active) {
      case 1:
        return <TodoDashboard />;
      case 2:
        return <Complete todos={todos} onDelete={handleDelete} onToggle={handleToggle} />;
      case 3:
        return <Incomplete todos={todos} onDelete={handleDelete} onToggle={handleToggle} />;
      default:
        return <TodoDashboard />;
    }
  };

  return (
    <div className="h-screen bg-gray-100">
      <Toaster/>
      <div className="flex items-center justify-center h-[90%] mt-0">
        <div className="h-3/4 w-1/6 bg-blue-400 text-white p-4">
          <Navigation active={active} setActive={setActive} />
        </div>
        <div className="w-3/5 h-3/4 bg-blue-900 justify-center rounded-r-lg shadow-md p-4 flex flex-col">
          {displayData()}
        </div>
      </div>
    </div>
  );
}

export default App;
