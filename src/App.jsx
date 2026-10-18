import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import "./App.css";

function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem("todos")) ?? [];
  } catch {
    return [];
  }
}

export default function App() {
  const [todos, setTodos] = useState(loadTodos);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) =>
    setTodos([{ id: crypto.randomUUID(), text, done: false }, ...todos]);

  const toggleTodo = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));

  const clearDone = () => setTodos(todos.filter((t) => !t.done));

  const visible = todos.filter((t) =>
    filter === "active" ? !t.done : filter === "completed" ? t.done : true
  );
  const remaining = todos.filter((t) => !t.done).length;

  return (
    <main className="app">
      <h1>Todo</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={visible} onToggle={toggleTodo} onDelete={deleteTodo} />
      <TodoFilter
        filter={filter}
        onChange={setFilter}
        remaining={remaining}
        onClearDone={clearDone}
        hasDone={todos.some((t) => t.done)}
      />
    </main>
  );
}