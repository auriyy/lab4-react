import { useState } from "react";
import React from "react";

export default function TodoItem({ todo, toggleTodo, deleteTodo, editTodoTitle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.todo);

  const handleSave = () => {
    if (!editText.trim()) return;
    editTodoTitle(todo.id, editText);
    setIsEditing(false);
  };

return (
  <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
    <div className="flex items-center flex-1 gap-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="w-5 h-5 flex-shrink-0 accent-blue-500"
      />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            className="border px-2 py-1 rounded flex-1"
          />
        ) : (
          <span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.todo}</span>
        )}
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-400 text-white px-2 rounded hover:bg-yellow-500"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
