import { useEffect, useState } from "react";
import TodoItem from "../TodoItem";
import toast, { Toaster } from "react-hot-toast";

import { getTodos, addTodo, deleteTodo, summarizeTodos, updateTodo} from "../../api";

export default function TodoDashboard() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");


  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const handleAdd = async () => {
    if (!title) return;
    await addTodo(title);
    setTitle("");
    fetchTodos();
    toast.success("Task added!");
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
    toast.success("Task deleted!");
  };

 const handleToggle = async (id, completed) => {
  await updateTodo(id, !completed); 
  fetchTodos();
};

  const handleSummarize = async () => {
    try {
      await summarizeTodos();
      toast.success("The tasks have been summarized and sent to Haris's slack!");
    } catch {
      toast.error("Failed to send the summary to Haris's slack.");
    }
  };

  const handleEdit = async (id, newTitle) => {
  await updateTodo(id, undefined, newTitle);  // you'll need to update updateTodo to accept title param
  fetchTodos();
  toast.success("Task updated!");
};

  useEffect(() => {
    fetchTodos();
  }, []);

  const today = new Date();
  const day = today.toLocaleDateString("en-IN", { weekday: "long" });
  const date = today.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  useEffect(() => {
  console.log("Todos changed:", todos);
}, [todos]);
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-semibold text-white">✅ ULTIMATE TO-DO LIST</h1>
      <div className="ml-1 pt-1 text-lg text-gray-200">
        {day}, {date}
      </div>

      <div className="flex mb-4 mt-2">
        <input
          type="text"
          placeholder="New to-do"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow p-2 border rounded mr-2 bg-blue-200"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} onToggle={handleToggle} onEdit={handleEdit}/>
        ))}
      </div>

      <button
        onClick={handleSummarize}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded"
      >
        Summarize & Send to Slack
      </button>
    </>
  );
}
