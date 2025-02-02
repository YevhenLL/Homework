import React, { useState, useEffect, useCallback } from "react";
import TodosForm from "./TodosForm/TodosForm";
import TodosLists from "./TodosLists/TodosLists";
import service from "../../services/todosAxios";
import "./style.sass";

export default function Todos() {
  const [tasks, setTasks] = useState([]);

  // Отримання задач з API
  const getTasks = useCallback(async () => {
    try {
      const response = await service.get();
      setTasks(response);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getTasks();
  }, [getTasks]); // Викликається лише при зміні getTasks

  // Додавання нової задачі
  const handleTaskCreate = useCallback(async (newTask) => {
    try {
      const response = await service.post(newTask);
      setTasks((prevTasks) => [...prevTasks, response]);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Зміна статусу задачі
  const handleStatusChange = useCallback(async (id, newStatus) => {
    try {
      await service.patch(id, { status: newStatus });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Видалення задачі
  const handleDelete = useCallback(async (id) => {
    try {
      await service.delete(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="todos-container">
      <TodosForm handleTaskCreate={handleTaskCreate} />
      <TodosLists
        tasks={tasks}
        handleStatusChange={handleStatusChange}
        handleDelete={handleDelete}
      />
    </div>
  );
}