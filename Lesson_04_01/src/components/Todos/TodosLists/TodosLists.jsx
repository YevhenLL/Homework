import React from "react";
import TodosList from "../TodosList/TodosList";

function TodosLists({ tasks, handleStatusChange, handleDelete }) {
  const statuses = [
    { id: 0, title: "To Do" },
    { id: 4, title: "On Hold" },
    { id: 1, title: "In Progress" },
    { id: 2, title: "Done" },
  ];

  return (
    <div className="todos-lists-container">
      <div className="todos-lists">
        {statuses.map((status) => (
          <div key={status.id} className="column">
            <TodosList
              status={status}
              tasks={tasks.filter((task) => task.status === status.id)}
              handleStatusChange={handleStatusChange}
              handleDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(TodosLists); // Використовуємо React.memo