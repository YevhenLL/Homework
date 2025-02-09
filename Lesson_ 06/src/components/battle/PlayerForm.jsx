import React from "react";
import Button from "../Button";

export default function PlayerForm({ player, onSubmit, error }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value.trim();
    onSubmit(username);
  };

  return (
    <div style={{ margin: "1em", textAlign: "center" }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}
      >
        <label>{player.label}</label>
        <input name="username" type="text" placeholder={player.placeholder} />
        <Button type="submit" title="Submit" />
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}