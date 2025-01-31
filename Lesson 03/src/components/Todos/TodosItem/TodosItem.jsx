import React from "react";
import Button from "../../Button/Button";

export default function TodosItem({ task, handleStatusChange, handleDelete }) {
  const { id, title, status } = task;

  return (
    <div className="task-item">
      <h3>{title}</h3>
      <div className="buttons">
        {status === 0 && (
          <Button
            title="In Progress"
            handleClick={() => handleStatusChange(id, 1)}
          />
        )}
        {status === 1 && (
          <>
            <Button
              title="To Do"
              handleClick={() => handleStatusChange(id, 0)}
            />
            <Button
              title="Done"
              handleClick={() => handleStatusChange(id, 2)}
            />
          </>
        )}
        {status === 2 && (
          <Button
            title="To Archive"
            handleClick={() => handleDelete(id)}
          />
        )}
      </div>
    </div>
  );
}