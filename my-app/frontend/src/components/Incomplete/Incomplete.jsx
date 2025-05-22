import React from "react";
import TodoItem from "../TodoItem";

export default function Inomplete({ todos, onDelete, onToggle }) {
  const incompletedTodos = todos.filter(todo => !todo.completed);

  if (incompletedTodos.length === 0) {
    return <p className="text-gray-400">No incomplete tasks yet.</p>;
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-blue-400 mb-2">Incomplete Tasks</h2>
      <div className="flex-1 overflow-y-auto pr-2">
      {incompletedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onToggle={onToggle} />
      ))}
      </div>
    </>
  );
}
