import React from "react";

export default function Button({ title, handleClick, type = "button" }) {
  return (
    <button type={type} onClick={handleClick} style={{ margin: "0.5em" }}>
      {title}
    </button>
  );
}