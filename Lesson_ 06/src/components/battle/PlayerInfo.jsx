import React from "react";
import Button from "../Button";

export default function PlayerInfo({ player, onReset, showReset = true, battleStarted = false }) {
  return (
    <div style={{ margin: "1em", textAlign: "center" }}>
      <img
        src={player.avatar_url}
        alt={player.login}
        style={{ width: "100px", borderRadius: "50%" }}
      />
      <p>{player.login}</p>
      
      {battleStarted && (
        <div>
          <p>Followers: {player.followers}</p>
          <p>Repositories stars: {player.stars}</p>
          <p>Total score: {player.followers + player.stars}</p>
        </div>
      )}
      
      {showReset && <Button title="Reset" handleClick={onReset} />}
    </div>
  );
}