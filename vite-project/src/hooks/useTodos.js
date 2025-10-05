import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTodos() {
      setIsLoading(true);
      try {
        const res = await axios.get("https://dummyjson.com/todos");
        setTodos(res.data.todos);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTodos();
  }, []);

  const addTodo = (text) => {
    const newTodo = { id: `local-${Date.now()}`, todo: text, completed: false };
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = async (id) => {
    try {
      if (typeof id === "number") {
        await axios.delete(`https://dummyjson.com/todos/${id}`);
      }
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const updated = { completed: !todo.completed };
      if (typeof id === "number") {
        await axios.put(`https://dummyjson.com/todos/${id}`, updated, {
          headers: { "Content-Type": "application/json" }
        });
      }

      setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    } catch (err) {
      setError(err.message);
    }
  };

  return { todos, isLoading, error, addTodo, deleteTodo, toggleTodo };
}
