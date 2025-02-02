import React from "react";
import TodosItem from "../TodosItem/TodosItem";

function TodosList({ status, tasks, handleStatusChange, handleDelete }) {
  return (
    <div className="todos-list">
      <h2>{status.title}</h2>
      {tasks.map((task) => (
        <TodosItem
          key={task.id}
          task={task}
          handleStatusChange={handleStatusChange}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default React.memo(TodosList); // Використовуємо React.memo