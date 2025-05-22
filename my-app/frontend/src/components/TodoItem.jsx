import { useState } from "react";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const TodoItem = ({ todo, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditTitle(todo.title); // reset title on cancel
  };

  const handleSave = () => {
    if (editTitle.trim() === "") return; // ignore empty
    if (editTitle !== todo.title) {
      onEdit(todo.id, editTitle);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditTitle(todo.title);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-2 mb-2 rounded shadow">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, todo.completed)}
        />
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className="border p-1 rounded flex-grow"
          />
        ) : (
          <span className={todo.completed ? "line-through text-gray-400" : ""}>
            {todo.title}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {isEditing ? (
          <button onClick={handleSave} className="text-green-600 hover:text-green-800">
            <FaSave />
          </button>
        ) : (
          <button onClick={handleEditToggle} className="text-blue-600 hover:text-blue-800">
            <FaEdit />
          </button>
        )}
        <button onClick={() => onDelete(todo.id)} className="text-red-500 hover:text-red-700">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
