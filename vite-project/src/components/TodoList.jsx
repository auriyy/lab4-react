import React from "react";
import { useState } from "react";
import { useTodos } from "../hooks/useTodos";

export default function TodoList() {
  const { todos, isLoading, error, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [newTodo, setNewTodo] = useState("");

  const handleAdd = () => {
    if (!newTodo.trim()) return;
    addTodo(newTodo);
    setNewTodo("");
  };

  if (isLoading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-lg mx-auto mt-16 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mr-3 w-5 h-5 accent-blue-500"
              />
              <span className={todo.completed ? "line-through text-gray-400" : ""}>
                {todo.todo}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
