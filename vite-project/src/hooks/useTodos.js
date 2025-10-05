import { useState, useEffect } from "react";
import axios from "axios";

export function useTodos() {
  const [allTodos, setAllTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(6);
  const [totalTodos, setTotalTodos] = useState(0);

  useEffect(() => {
    async function fetchTodos() {
      setIsLoading(true);
      try {
        const skip = (currentPage - 1) * limitPerPage;
        const res = await axios.get(`https://dummyjson.com/todos?limit=${limitPerPage}&skip=${skip}`);
        setAllTodos(res.data.todos);
        setTodos(res.data.todos);
        setTotalTodos(res.data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTodos();
  }, [currentPage, limitPerPage]);

  useEffect(() => {
    if (!searchTerm.trim()) setTodos(allTodos);
    else setTodos(allTodos.filter(todo => todo.todo.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, allTodos]);

  const goToNextPage = () => {
    if (currentPage * limitPerPage < totalTodos) setCurrentPage(prev => prev + 1);
  };
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };
  const setLimit = (limit) => {
    setLimitPerPage(limit);
    setCurrentPage(1);
  };

  const addTodo = (text) => {
    const newTodo = { id: `local-${Date.now()}`, todo: text, completed: false };
    setTodos([newTodo, ...todos]);
    setAllTodos([newTodo, ...allTodos]);
  };

  const deleteTodo = async (id) => {
    try {
      if (typeof id === "number") await axios.delete(`https://dummyjson.com/todos/${id}`);
      setTodos(todos.filter(t => t.id !== id));
      setAllTodos(allTodos.filter(t => t.id !== id));
    } catch (err) { setError(err.message); }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    const updated = { completed: !todo.completed };
    try {
      if (typeof id === "number") await axios.put(`https://dummyjson.com/todos/${id}`, updated);
      setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
      setAllTodos(allTodos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    } catch (err) { setError(err.message); }
  };

  const editTodoTitle = async (id, newTitle) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    try {
      if (typeof id === "number") await axios.put(`https://dummyjson.com/todos/${id}`, { todo: newTitle });
      setTodos(todos.map(t => t.id === id ? { ...t, todo: newTitle } : t));
      setAllTodos(allTodos.map(t => t.id === id ? { ...t, todo: newTitle } : t));
    } catch (err) { setError(err.message); }
  };

  return {
    todos,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalTodos,
    limitPerPage,
    goToNextPage,
    goToPrevPage,
    setLimit,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodoTitle
  };
}
