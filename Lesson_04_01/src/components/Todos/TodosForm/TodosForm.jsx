import React, { useState } from "react";

export default function TodosForm({ handleTaskCreate }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, status };
    handleTaskCreate(newTask);
    setTitle("");
    setStatus(0);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>Create Task</h2>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(Number(e.target.value))}>
        <option value={0}>To Do</option>
        <option value={1}>In Progress</option>
        <option value={2}>Done</option>
      </select>
      <button type="submit">Create</button>
    </form>
  );
}