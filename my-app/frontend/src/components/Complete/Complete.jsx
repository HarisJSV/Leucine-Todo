import React from "react";
import TodoItem from "../TodoItem";

export default function Complete({ todos, onDelete, onToggle }) {
  const completedTodos = todos.filter(todo => todo.completed);

  if (completedTodos.length === 0) {
    return <p className="text-gray-400">No completed tasks yet.</p>;
  }

return (
  <>
    <h2 className="text-xl font-semibold text-blue-400 mb-2">Completed Tasks</h2>
    <div className="flex-1 overflow-y-auto pr-2">
      {completedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </div>
  </>
);
}
