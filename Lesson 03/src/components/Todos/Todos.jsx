import React, { useState, useEffect } from "react";
import "./style.sass";
import service from "../../services/todosAxios";
import TodosItem from "./TodosItem/TodosItem";

export default function Todos() {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await service.get();
      setTasks(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedTask = await service.patch(id, { status: newStatus });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await service.delete(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <TodosItem
          key={task.id}
          task={task}
          handleStatusChange={handleStatusChange}
          handleDelete={handleDelete}
        />
      ));
  };

  return (
    <div className="todos-container">
      <div className="column">
        <h2>To Do</h2>
        {renderTasks(0)}
      </div>
      <div className="column">
        <h2>In Progress</h2>
        {renderTasks(1)}
      </div>
      <div className="column">
        <h2>Done</h2>
        {renderTasks(2)}
      </div>
    </div>
  );
}